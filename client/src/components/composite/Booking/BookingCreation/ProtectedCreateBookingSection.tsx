"use client"

import { useAppData } from "@/store/Store"
import { SignUpNotif } from "@/components/generic/SignUpNotif/SignUpNotif"
import { useAvailableBookingsQuery } from "@/services/Booking/BookingQueries"
import { CreateBookingSection, ICreateBookingSection } from "./BookingCreation"
import { useContext, useEffect } from "react"
import { BookingContext } from "../BookingContext"

/**
 * @deprecated not for direct consumption on pages, use `BookingInformationAndCreation` instead
 */
export const ProtectedCreateBookingSection = ({
  lodgePrices
}: Pick<ICreateBookingSection, "lodgePrices">) => {
  const [{ currentUser, currentUserClaims }] = useAppData()

  const { data } = useAvailableBookingsQuery()

  const {
    handleBookingCreation,
    clientSecret,
    errorMessage,
    setAllergies,
    isPending
  } = useContext(BookingContext)

  useEffect(() => {
    if (errorMessage) alert(errorMessage)
  }, [errorMessage])

  if (!currentUserClaims?.member) {
    return <SignUpNotif signedIn={!!currentUser} />
  }

  return (
    <CreateBookingSection
      bookingSlots={data}
      handleBookingCreation={handleBookingCreation}
      handleAllergyChange={setAllergies}
      hasExistingSession={!!clientSecret}
      isPending={isPending}
      lodgePrices={lodgePrices}
    />
  )
}
