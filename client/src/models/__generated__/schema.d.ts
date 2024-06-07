/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/users/self": {
    get: operations["GetSelf"];
  };
  "/users/edit-self": {
    patch: operations["EditSelf"];
  };
  "/webhook": {
    post: operations["ReceiveWebhook"];
  };
  "/signup": {
    post: operations["Signup"];
  };
  "/payment/membership_prices": {
    get: operations["GetMembershipPrices"];
  };
  "/payment/checkout_status": {
    get: operations["GetCheckoutSessionDetails"];
  };
  "/payment/membership": {
    post: operations["GetMembershipPayment"];
  };
  "/bookings": {
    get: operations["GetAllBookings"];
  };
  "/bookings/available-dates": {
    post: operations["GetAvailableDates"];
  };
  "/admin/bookings/make-dates-available": {
    /** @description Booking Operations */
    post: operations["MakeDateAvailable"];
  };
  "/admin/bookings/make-dates-unavailable": {
    post: operations["MakeDateUnavailable"];
  };
  "/admin/users": {
    /** @description User Operations */
    get: operations["GetAllUsers"];
  };
  "/admin/users/create": {
    put: operations["CreateUser"];
  };
  "/admin/users/bulk-edit": {
    patch: operations["EditUsers"];
  };
  "/admin/users/promote": {
    put: operations["PromoteUser"];
  };
  "/admin/users/demote": {
    put: operations["DemoteUser"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * @description A Timestamp represents a point in time independent of any time zone or
     * calendar, represented as seconds and fractions of seconds at nanosecond
     * resolution in UTC Epoch time. It is encoded using the Proleptic Gregorian
     * Calendar which extends the Gregorian calendar backwards to year one. It is
     * encoded assuming all minutes are 60 seconds long, i.e. leap seconds are
     * "smeared" so that no leap second table is needed for interpretation. Range
     * is from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59.999999999Z.
     */
    "FirebaseFirestore.Timestamp": {
      /**
       * Format: double
       * @description The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
       */
      seconds: number;
      /**
       * Format: double
       * @description The non-negative fractions of a second at nanosecond resolution.
       */
      nanoseconds: number;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__": {
      date_of_birth?: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      gender?: string;
      emergency_contact?: string;
      first_name?: string;
      last_name?: string;
      dietary_requirements?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      returning?: boolean;
      university_year?: string;
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_Partial_UserAdditionalInfo_.stripe_id_": components["schemas"]["Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__"];
    EditSelfRequestBody: {
      updatedInformation: components["schemas"]["Omit_Partial_UserAdditionalInfo_.stripe_id_"];
    };
    UserSignupResponse: {
      error?: string;
      message?: string;
      jwtToken?: string;
      uid?: string;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__": {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding: boolean;
      does_racing: boolean;
      does_ski: boolean;
      gender: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      returning: boolean;
      university_year: string;
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_UserAdditionalInfo.stripe_id_": components["schemas"]["Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__"];
    UserSignupBody: {
      email: string;
      user: components["schemas"]["Omit_UserAdditionalInfo.stripe_id_"];
    };
    /** @enum {string} */
    MembershipTypeValues: "uoa_student" | "non_uoa_student" | "returning_member" | "new_non_student";
    MembershipStripeProductResponse: {
      error?: string;
      message?: string;
      data?: {
          originalPrice?: string;
          displayPrice: string;
          discount: boolean;
          description?: string;
          name: components["schemas"]["MembershipTypeValues"];
          productId: string;
        }[];
    };
    /** @enum {string} */
    "stripe.Stripe.Checkout.Session.Status": "complete" | "expired" | "open";
    /** @description Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. */
    "stripe.Stripe.Metadata": {
      [key: string]: string;
    };
    MembershipPaymentResponse: {
      error?: string;
      message?: string;
      stripeClientSecret?: string;
      membershipType?: components["schemas"]["MembershipTypeValues"];
    };
    UserPaymentRequestModel: {
      membershipType?: components["schemas"]["MembershipTypeValues"];
    };
    AllUserBookingSlotsResponse: {
      error?: string;
      message?: string;
      dates?: string[];
    };
    AvailableDates: {
      /** Format: double */
      availableSpaces: number;
      /** Format: double */
      maxBookings: number;
      date: components["schemas"]["FirebaseFirestore.Timestamp"];
      description?: string;
      id: string;
    };
    AvailableDatesResponse: {
      error?: string;
      message?: string;
      data?: components["schemas"]["AvailableDates"][];
    };
    AvailableDatesRequestModel: {
      startDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
      endDate?: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    BookingSlotUpdateResponse: {
      error?: string;
      message?: string;
      updatedBookingSlots?: {
          bookingSlotId: string;
          date: components["schemas"]["FirebaseFirestore.Timestamp"];
        }[];
    };
    MakeDatesAvailableRequestBody: {
      /** @description Firestore timestamp, ideally with the time information removed (set to midnight) */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, ideally with the time information removed (set to midnight) */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** Format: double */
      slots?: number;
    };
    /** @description From T, pick a set of properties whose keys are in the union K */
    "Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__": {
      /** @description Firestore timestamp, ideally with the time information removed (set to midnight) */
      startDate: components["schemas"]["FirebaseFirestore.Timestamp"];
      /** @description Firestore timestamp, ideally with the time information removed (set to midnight) */
      endDate: components["schemas"]["FirebaseFirestore.Timestamp"];
    };
    /** @description Construct a type with the properties of T except for those in type K. */
    "Omit_MakeDatesAvailableRequestBody.slots_": components["schemas"]["Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__"];
    UserAdditionalInfo: {
      date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding: boolean;
      does_racing: boolean;
      does_ski: boolean;
      gender: string;
      emergency_contact?: string;
      first_name: string;
      last_name: string;
      dietary_requirements: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      returning: boolean;
      university_year: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
    };
    /** @enum {string} */
    UserAccountTypes: "admin" | "member" | "guest";
    AllUsersResponse: {
      error?: string;
      message?: string;
      /**
       * @description Needed for firestore operations which do not support offset
       * based pagination
       */
      nextCursor?: string;
      data?: components["schemas"]["UserAdditionalInfo"][] & {
          /** @description What type of account the user has */
          membership: components["schemas"]["UserAccountTypes"];
          /** @description The email the user uses to log in */
          email: string;
          /** @description Formatted UTC date string of when the account was created */
          dateJoined: string;
          /** @description Firebase identifier of the user *data* based on the firestore document */
          uid: string;
        }[];
    };
    CreateUserRequestBody: {
      uid: string;
      user: components["schemas"]["UserAdditionalInfo"];
    };
    /** @description Make all properties in T optional */
    Partial_UserAdditionalInfo_: {
      date_of_birth?: components["schemas"]["FirebaseFirestore.Timestamp"];
      does_snowboarding?: boolean;
      does_racing?: boolean;
      does_ski?: boolean;
      gender?: string;
      emergency_contact?: string;
      first_name?: string;
      last_name?: string;
      dietary_requirements?: string;
      faculty?: string;
      university?: string;
      student_id?: string;
      returning?: boolean;
      university_year?: string;
      /** @description For identification DO NOT RETURN to users in exposed endpoints */
      stripe_id?: string;
    };
    EditUsersRequestBody: {
      users: {
          updatedInformation: components["schemas"]["Partial_UserAdditionalInfo_"];
          uid: string;
        }[];
    };
    PromoteUserRequestBody: {
      uid: string;
    };
    DemoteUserRequestBody: {
      uid: string;
    };
  };
  responses: {
  };
  parameters: {
  };
  requestBodies: {
  };
  headers: {
  };
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  GetSelf: {
    responses: {
      /** @description Fetched self data */
      200: {
        content: {
          "application/json": {
            stripe_id?: string;
            university_year: string;
            returning: boolean;
            student_id?: string;
            university?: string;
            faculty?: string;
            dietary_requirements: string;
            last_name: string;
            first_name: string;
            emergency_contact?: string;
            gender: string;
            does_ski: boolean;
            does_racing: boolean;
            does_snowboarding: boolean;
            date_of_birth: components["schemas"]["FirebaseFirestore.Timestamp"];
            uid: string;
          };
        };
      };
    };
  };
  EditSelf: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditSelfRequestBody"];
      };
    };
    responses: {
      /** @description Successful edit */
      200: {
        content: never;
      };
    };
  };
  ReceiveWebhook: {
    responses: {
      /** @description Webhook post received */
      200: {
        content: never;
      };
    };
  };
  Signup: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserSignupBody"];
      };
    };
    responses: {
      /** @description Signup successful */
      200: {
        content: {
          "application/json": components["schemas"]["UserSignupResponse"];
        };
      };
    };
  };
  GetMembershipPrices: {
    responses: {
      /** @description Ok */
      200: {
        content: {
          "application/json": components["schemas"]["MembershipStripeProductResponse"];
        };
      };
    };
  };
  GetCheckoutSessionDetails: {
    parameters: {
      query: {
        sessionId: string;
      };
    };
    responses: {
      /** @description Session Fetched */
      200: {
        content: {
          "application/json": {
            metadata: components["schemas"]["stripe.Stripe.Metadata"];
            /** Format: double */
            pricePaid: number;
            customer_email: string;
            status: components["schemas"]["stripe.Stripe.Checkout.Session.Status"];
          };
        };
      };
    };
  };
  GetMembershipPayment: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserPaymentRequestModel"];
      };
    };
    responses: {
      /** @description Session created */
      200: {
        content: {
          "application/json": components["schemas"]["MembershipPaymentResponse"];
        };
      };
    };
  };
  GetAllBookings: {
    responses: {
      /** @description Found bookings */
      200: {
        content: {
          "application/json": components["schemas"]["AllUserBookingSlotsResponse"];
        };
      };
    };
  };
  GetAvailableDates: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["AvailableDatesRequestModel"];
      };
    };
    responses: {
      /** @description Availabilities found */
      200: {
        content: {
          "application/json": components["schemas"]["AvailableDatesResponse"];
        };
      };
    };
  };
  /** @description Booking Operations */
  MakeDateAvailable: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["MakeDatesAvailableRequestBody"];
      };
    };
    responses: {
      /** @description Slot made available */
      201: {
        content: {
          "application/json": components["schemas"]["BookingSlotUpdateResponse"];
        };
      };
    };
  };
  MakeDateUnavailable: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Omit_MakeDatesAvailableRequestBody.slots_"];
      };
    };
    responses: {
      /** @description Slot made unavailable */
      201: {
        content: {
          "application/json": components["schemas"]["BookingSlotUpdateResponse"];
        };
      };
    };
  };
  /** @description User Operations */
  GetAllUsers: {
    parameters: {
      query?: {
        cursor?: string;
        toFetch?: number;
      };
    };
    responses: {
      /** @description Users found */
      200: {
        content: {
          "application/json": components["schemas"]["AllUsersResponse"];
        };
      };
    };
  };
  CreateUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateUserRequestBody"];
      };
    };
    responses: {
      /** @description Created */
      200: {
        content: never;
      };
    };
  };
  EditUsers: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["EditUsersRequestBody"];
      };
    };
    responses: {
      /** @description Edited */
      200: {
        content: never;
      };
    };
  };
  PromoteUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["PromoteUserRequestBody"];
      };
    };
    responses: {
      /** @description Promoted user */
      200: {
        content: never;
      };
    };
  };
  DemoteUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["DemoteUserRequestBody"];
      };
    };
    responses: {
      /** @description Demoted user */
      200: {
        content: never;
      };
    };
  };
}
