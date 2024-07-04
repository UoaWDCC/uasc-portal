import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Timestamp } from "firebase/firestore"
import AdminService from "./AdminService"

export const ALL_USERS_QUERY = "allUsers"
export const ALL_BOOKINGS_BETWEEN_RANGE_QUERY = "bookings-between-range"

export function useUsersQuery() {
  return useInfiniteQuery({
    queryKey: [ALL_USERS_QUERY],
    queryFn: AdminService.getUsers,
    retry: 1,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  })
}

export function useAdminBookingsQuery(
  startDate: Timestamp,
  endDate: Timestamp
) {
  return useQuery({
    queryKey: [ALL_BOOKINGS_BETWEEN_RANGE_QUERY, startDate, endDate],
    queryFn: () =>
      AdminService.getBookingsBetweenDateRange({
        startDate,
        endDate
      }),
    retry: 0,
    staleTime: 30000 // 30 sec
  })
}
