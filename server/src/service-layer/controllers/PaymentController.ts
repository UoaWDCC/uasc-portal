import StripeService from "business-layer/services/StripeService"
import { AuthServiceClaims } from "business-layer/utils/AuthServiceClaims"
import {
  BOOKING_SLOTS_KEY,
  CHECKOUT_TYPE_KEY,
  CheckoutTypeValues
} from "business-layer/utils/StripeSessionMetadata"
import {
  MembershipTypeValues,
  MEMBERSHIP_TYPE_KEY,
  LODGE_PRICING_TYPE_KEY
} from "business-layer/utils/StripeProductMetadata"
import {
  firestoreTimestampToDate,
  timestampsInRange
} from "data-layer/adapters/DateUtils"
import BookingDataService from "data-layer/services/BookingDataService"
import BookingSlotService from "data-layer/services/BookingSlotsService"
import UserDataService from "data-layer/services/UserDataService"
import {
  UserPaymentRequestModel,
  SelfRequestModel,
  UserBookingRequestingModel
} from "service-layer/request-models/UserRequests"
import {
  BookingPaymentResponse,
  MembershipPaymentResponse,
  MembershipStripeProductResponse
} from "service-layer/response-models/PaymentResponse"
import Stripe from "stripe"
import {
  Controller,
  Post,
  Get,
  Route,
  Request,
  Security,
  Query,
  SuccessResponse,
  Body
} from "tsoa"
import BookingUtils from "business-layer/utils/BookingUtils"

@Route("payment")
export class PaymentController extends Controller {
  @Get("membership_prices")
  public async getMembershipPrices(): Promise<MembershipStripeProductResponse> {
    const stripeService = new StripeService()
    try {
      const membershipProducts =
        await stripeService.getActiveMembershipProducts()
      // Maps the products to the required response type MembershipStripeProductResponse in PaymentResponse

      const productsValues = membershipProducts.map((product) => {
        // Checks the membership type of the product
        const membershipType = product.metadata[
          MEMBERSHIP_TYPE_KEY
        ] as MembershipTypeValues

        let name: MembershipTypeValues

        switch (membershipType) {
          case MembershipTypeValues.UoaStudent: {
            name = MembershipTypeValues.UoaStudent
            break
          }
          case MembershipTypeValues.NonUoaStudent: {
            name = MembershipTypeValues.NonUoaStudent
            break
          }
          case MembershipTypeValues.ReturningMember: {
            name = MembershipTypeValues.ReturningMember
            break
          }
          case MembershipTypeValues.NewNonStudent: {
            name = MembershipTypeValues.NewNonStudent
            break
          }
        }

        return {
          productId: product.id,
          name,
          description: product.description,
          discount: product.metadata.discount === "true",
          displayPrice: (
            Number(
              (product.default_price as Stripe.Price).unit_amount_decimal
            ) / 100
          ).toString(),
          originalPrice: product.metadata.original_price
        }
      })

      return { data: productsValues }
    } catch (error) {
      console.error(error)
      this.setStatus(500)
      return { error: "Error fetching active Stripe products" }
    }
  }

  @SuccessResponse("200", "Session Fetched")
  @Security("jwt")
  @Get("checkout_status")
  public async getCheckoutSessionDetails(@Query() sessionId: string) {
    const stripeService = new StripeService()
    try {
      const session = await stripeService.getCheckoutSessionById(sessionId)
      const { status, customer_email, amount_total, metadata } = session

      return {
        status,
        customer_email,
        pricePaid: amount_total,
        metadata
      }
    } catch (e) {
      this.setStatus(500)
      return null
    }
  }

  @SuccessResponse("200", "Session created")
  @Security("jwt")
  @Post("membership")
  public async getMembershipPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserPaymentRequestModel
  ): Promise<MembershipPaymentResponse> {
    try {
      const { uid, customClaims } = request.user
      if (customClaims && customClaims[AuthServiceClaims.MEMBER]) {
        // Can't pay for membership if already member
        this.setStatus(409)
        return { error: "Already a member" }
      }

      const stripeService = new StripeService()
      const userDataService = new UserDataService()

      const userData = await userDataService.getUserData(uid)

      /**
       * Generate customer id if required
       */
      const { newUser, stripeCustomerId } =
        await stripeService.createCustomerIfNotExist(
          request.user,
          userData,
          userDataService
        )
      if (!newUser) {
        /**
         * See if user already has active session
         */
        const activeSession = await stripeService.getActiveSessionForUser(
          stripeCustomerId,
          CheckoutTypeValues.MEMBERSHIP
        )
        if (activeSession) {
          const { client_secret, metadata } = activeSession
          this.setStatus(200)
          return {
            stripeClientSecret: client_secret,
            membershipType: metadata[
              MEMBERSHIP_TYPE_KEY
            ] as MembershipTypeValues,
            message: "Existing membership checkout session found"
          }
        }
        /**
         * See if user has pending payment or has recently paid -> if user didn't have a stripe id that means
         * they couldn't have a completed session
         */
        if (
          (await stripeService.hasRecentlyCompletedCheckoutSession(
            stripeCustomerId
          )) ||
          (await stripeService.hasProcessingPaymentIntent(stripeCustomerId))
        ) {
          this.setStatus(409)
          return {
            message: "Membership payment is still being processed"
          }
        }
      }

      /**
       * Check what price user is going to pay based on the details they filled in
       */
      const requiredMembership = requestBody.membershipType
      if (!requiredMembership) {
        this.setStatus(404)
        return {
          error:
            "No existing session could be found, and no new session could be created because membership type was not provided"
        }
      }
      /**
       * Get required product and generate client secret
       */
      const requiredMembershipProducts =
        await stripeService.getProductByMetadata(
          MEMBERSHIP_TYPE_KEY,
          requiredMembership
        )

      // We assume there will only be one active product at a time for memberships (needs to be communicated with admins)
      const requiredMembershipProduct = requiredMembershipProducts.find(
        (product) => product.active
      )

      // Note this will throw error if undefined (product wasn't found)
      const { default_price } = requiredMembershipProduct

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        // Note if the url changes workflows need to be updated to have the deployments work correctly
        `${process.env.FRONTEND_URL}/register/confirm?session_id={CHECKOUT_SESSION_ID}`,
        [
          {
            price: default_price as string,
            quantity: 1
          }
        ],
        // Set metadata to be found in webhook later
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.MEMBERSHIP,
          [MEMBERSHIP_TYPE_KEY]: requiredMembership
        },
        stripeCustomerId
      )
      this.setStatus(200)
      return {
        stripeClientSecret: clientSecret,
        membershipType: requiredMembership
      }
    } catch (error) {
      console.error(error)
      this.setStatus(500)
      return { error: "Something went wrong" }
    }
  }

  @SuccessResponse("200", "Created booking checkout session")
  @Security("jwt", ["member"])
  @Post("booking")
  public async getBookingPayment(
    @Request() request: SelfRequestModel,
    @Body() requestBody: UserBookingRequestingModel
  ): Promise<BookingPaymentResponse> {
    const { uid } = request.user

    // Create new Stripe checkout session
    const stripeService = new StripeService()
    const userDataService = new UserDataService()

    try {
      const userData = await userDataService.getUserData(uid)
      const { newUser, stripeCustomerId } =
        await stripeService.createCustomerIfNotExist(
          request.user,
          userData,
          userDataService
        )
      // If not a new Stripe customer, we want to check for pre-existing bookings
      if (!newUser) {
        const activeSession = await stripeService.getActiveSessionForUser(
          stripeCustomerId,
          CheckoutTypeValues.BOOKING
        )
        if (activeSession) {
          const THIRTY_MINUTES_MS = 1800000

          const sessionStartTime = new Date(
            activeSession.created * 1000 + THIRTY_MINUTES_MS
          ).toLocaleTimeString("en-NZ")

          this.setStatus(200)
          return {
            stripeClientSecret: activeSession.client_secret,
            message: `Existing booking checkout session found, you may start a new one after ${sessionStartTime} (NZST)`
          }
        }
      }

      const { startDate, endDate } = requestBody
      // The request start and end dates
      if (
        !startDate ||
        !endDate ||
        BookingUtils.hasInvalidStartAndEndDates(
          startDate,
          endDate,
          // Current timestamp
          new Date(),
          new Date()
        )
      ) {
        this.setStatus(400)
        return {
          error:
            "Invalid date, booking start date and end date must be in the range of today up to a year later. "
        }
      }

      const datesInBooking = timestampsInRange(startDate, endDate)

      const totalDays = datesInBooking.length

      const MAX_BOOKING_DAYS = 10
      // Validate number of dates to avoid kiddies from forging bookings
      if (totalDays > MAX_BOOKING_DAYS) {
        this.setStatus(400)
        return {
          error: "Invalid date range, booking must be a maximum of 10 days. "
        }
      }
      const bookingSlotService = new BookingSlotService()
      const bookingDataService = new BookingDataService()

      const bookingSlots =
        await bookingSlotService.getBookingSlotsBetweenDateRange(
          startDate,
          endDate
        )

      if (bookingSlots.length !== totalDays) {
        this.setStatus(423) // Resource busy
        return {
          error: "No booking slot available for one or more dates."
        }
      }

      const baseAvailabilities =
        await bookingDataService.getAvailabilityForUser(
          uid,
          datesInBooking,
          bookingSlots
        )
      if (baseAvailabilities.some((slot) => !slot)) {
        this.setStatus(409)
        return {
          error: "User has already booked a slot or there is no availability"
        }
      }

      const MINUTES_AGO = 30
      // Lets check for open sessions here:
      const openSessions = await stripeService.getRecentActiveSessions(
        CheckoutTypeValues.BOOKING,
        MINUTES_AGO,
        true
      )

      const currentlyInCheckoutSlotIds = openSessions.flatMap((session) =>
        JSON.parse(session.metadata[BOOKING_SLOTS_KEY])
      ) as Array<string>

      const slotOccurences = BookingUtils.getSlotOccurences(
        currentlyInCheckoutSlotIds
      )

      const outOfStockBecauseSessionActive = baseAvailabilities.some(
        (availability) =>
          availability.baseAvailability - slotOccurences.get(availability.id) <=
          0
      )

      if (outOfStockBecauseSessionActive) {
        this.setStatus(409)
        return {
          error:
            "Someone may currently have this item in cart, please try again later"
        }
      }

      // implement pricing logic
      const requiredBookingType =
        BookingUtils.getRequiredPricing(datesInBooking)

      const requiredBookingProducts = await stripeService.getProductByMetadata(
        LODGE_PRICING_TYPE_KEY,
        requiredBookingType
      )
      const requiredBookingProduct = requiredBookingProducts.find(
        (product) => product.active
      )
      const { default_price } = requiredBookingProduct

      const BOOKING_START_DATE = new Date(
        firestoreTimestampToDate(datesInBooking[0])
      )
        .toISOString()
        .split("T")[0] // this works because we assume every date is UTC midnight

      const BOOKING_END_DATE = new Date(
        firestoreTimestampToDate(datesInBooking[totalDays - 1])
      )
        .toISOString()
        .split("T")[0] // this works because we assume every date is UTC midnight

      const clientSecret = await stripeService.createCheckoutSession(
        uid,
        `${process.env.FRONTEND_URL}/bookings/success?session_id={CHECKOUT_SESSION_ID}&startDate=${BOOKING_START_DATE}&endDate=${BOOKING_END_DATE}`,
        [
          {
            price: default_price as string,
            quantity: totalDays
          }
        ],
        {
          [CHECKOUT_TYPE_KEY]: CheckoutTypeValues.BOOKING,
          [LODGE_PRICING_TYPE_KEY]: requiredBookingType,
          [BOOKING_SLOTS_KEY]: JSON.stringify(
            bookingSlots.map((slot) => slot.id)
          )
        },
        stripeCustomerId,
        undefined,
        {
          submit: {
            message: `By clicking Pay you agree to booking the nights from ${BOOKING_START_DATE} to ${BOOKING_END_DATE}`
          }
        }
      )
      this.setStatus(200)
      return {
        stripeClientSecret: clientSecret
      }
    } catch (e) {
      this.setStatus(500)
      console.error("Something went wrong when creating the booking session", e)
      return {
        error: "Something went wrong when creating the booking session"
      }
    }
  }
}
