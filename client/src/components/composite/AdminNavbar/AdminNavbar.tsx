import { WrappedTab } from "../Navbar/utils/WrappedTab"

const Exit = () => {
  return <h5 className="text-red uppercase">exit</h5>
}

const AdminNavbar = () => {
  return (
    <div className=" relative flex h-[46px] w-full items-center overflow-hidden border">
      <div className="flex gap-4 pl-12 pt-[13px] ">
        <WrappedTab to="/members">members</WrappedTab>
        <WrappedTab to="/bookings">bookings</WrappedTab>
        <WrappedTab to="/payments">payments</WrappedTab>
      </div>
      <div className="absolute right-0 pr-12">
        <Exit />
      </div>
    </div>
  )
}

export default AdminNavbar
