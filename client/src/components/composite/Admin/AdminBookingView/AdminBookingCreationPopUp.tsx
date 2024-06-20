import AdminSearchBar from "../AdminMemberView/AdminSearchBar"
import { CombinedUserData } from "models/User"
import Calendar from "components/generic/Calendar/Calendar"
import Button from "components/generic/FigmaButtons/FigmaButton"
import DateRangePicker from "components/generic/DateRangePicker/DateRangePicker"

interface IAdminBookingCreationPopUp {
  bookingCreationHandler?: () => void
  /**
   * Callback for when a 'close' event is triggered with the modal open
   */
  handleClose?: () => void
  users?: CombinedUserData[]
}

enum FlowStages {
  SELECT_USER = "select_user",
  VIEW_USER = "view_user",
  SELECT_DATES = "select_dates"
}

const Divider = () => {
  return (
    <div className="bg-gray-3 ml-auto hidden h-screen w-[1px] sm:block"></div>
  )
}

const AdminBookingCreationPopUp = ({
  handleClose
}: IAdminBookingCreationPopUp) => {
  return (
    <div className="flex w-full max-w-[900px] flex-col gap-7 sm:flex-row">
      <div className="flex w-full flex-col sm:basis-1/2">
        <p className="opacity-20">Select user</p>
        <AdminSearchBar />

        <p className="mt-8">Creating booking for:</p>
      </div>
      <Divider />
      <div className="flex sm:basis-1/2">
        <div className="w-full max-w-[380px]">
          <Calendar />
          <DateRangePicker />
          <Button>Add New Booking</Button>
        </div>
      </div>
    </div>
  )
}

export default AdminBookingCreationPopUp
