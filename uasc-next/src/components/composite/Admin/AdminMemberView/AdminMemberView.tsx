import AdminSearchBar from "./AdminSearchBar"
import Button from "@/components/generic/FigmaButtons/FigmaButton"
import Table from "@/components/generic/ReusableTable/Table"
import {
  TABLE_ROW_IDENTIFIER_KEY,
  TableRowOperation
} from "@/components/generic/ReusableTable/TableUtils"
import { AccountType } from "@/models/User"
import { useCallback, useEffect, useState } from "react"

export type MemberColumnFormat = {
  /**
   * The user id, used for adding handlers for each individual table row.
   */
  uid: string
  Name?: string
  Email?: string
  Status?: string
  "Date Joined"?: string
}

interface IAdminMemberView {
  /**
   * Note that the order of the keys in the first element of the array is the order it'll be displayed in the table.
   *
   * @example // {Name: "Jon", Phone: "111"} will display `Name` before `Phone`
   */
  data?: MemberColumnFormat[]

  /**
   *
   * Note that the admin member view will *always* have the multiple operations menu
   *
   * @example
   * ```tsx
   * [
   * {name: "delete user", handler: (uid:string) => {delete(uid)}}
   * // add more if needed
   * ]
   * ```
   */
  rowOperations?: TableRowOperation[]

  /**
   * used to fetch the data once the last page of the table has been reached
   */
  fetchNextPage?: () => void

  /**
   * Called when the *add new member* button is clicked
   */
  openAddMemberView?: () => void
  /*
   * Used to indicate if there is currently an operation going on
   */
  isUpdating?: boolean
}

/**
 * Used to display columns if there is no data
 */
const defaultData = {
  [TABLE_ROW_IDENTIFIER_KEY]: "",
  Name: "",
  Status: "",
  Email: "",
  "Date Joined": ""
}

const ADMIN_MEMBER_VIEW_MIN_SEARCH_QUERY_LENGTH = 2 as const

type AccountTypeFilter = AccountType | "all"

/**
 * The view to be displayed on the `admin` route when the admin wants to:
 * - Add new users
 * - Change the user membership (between guest and member)
 * - Delete users
 * - Access an "edit" view for users
 *
 * @deprecated do not use directly on page, instead use `WrappedAdminMemberView`
 *
 * Data fetching should **not** be performed inside this component, instead do such
 * inside `WrappedAdminMemberView`
 */
export const AdminMemberView = ({
  data,
  rowOperations,
  fetchNextPage,
  openAddMemberView,
  isUpdating
}: IAdminMemberView) => {
  /**
   * For use with `AdminSearchBar`
   */
  const [currentSearchQuery, setCurrentSearchQuery] = useState<string>("")

  const [filteredAccountType, setFilteredAccountType] =
    useState<AccountTypeFilter>("all")

  /**
   * Sets the current role filter to the next one.
   * Note that the sequence should repeat circularly
   */
  const nextAccountFilter = useCallback(() => {
    switch (filteredAccountType) {
      case "admin":
        setFilteredAccountType("member")
        return
      case "member":
        setFilteredAccountType("guest")
        return
      case "guest":
        setFilteredAccountType("all")
        return
      case "all":
        setFilteredAccountType("admin")
    }
  }, [filteredAccountType])

  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const isValidSearchQuery =
    currentSearchQuery.length > ADMIN_MEMBER_VIEW_MIN_SEARCH_QUERY_LENGTH

  const shouldFilterByAccount = filteredAccountType !== "all"

  const dataFilter = useCallback(
    (oldData: MemberColumnFormat[]) => {
      return isValidSearchQuery || shouldFilterByAccount
        ? oldData.filter(
            (item) =>
              (isValidSearchQuery &&
                (item.Email?.toLowerCase().includes(currentSearchQuery) ||
                  item.Name?.toLowerCase().includes(currentSearchQuery))) ||
              (shouldFilterByAccount &&
                filteredAccountType === item.Status?.toLowerCase())
          )
        : oldData
    },
    [
      isValidSearchQuery,
      currentSearchQuery,
      filteredAccountType,
      shouldFilterByAccount
    ]
  )

  useEffect(() => {
    /**
     * If the user is currently trying to search for a user using some filters
     * we need to make sure that the whole list is given to them to search from
     *
     * need to update this when new filters are added
     */
    const isQuerying = isValidSearchQuery || shouldFilterByAccount
    /**
     * We need to *scroll* to the next page of user data as it is assumed
     * that the endpoint for fetching all users is paginated
     */
    if (isLastPage || isQuerying) {
      fetchNextPage?.()
    }
  }, [isLastPage, fetchNextPage, isValidSearchQuery, shouldFilterByAccount])

  const onSeachQueryChangedHandler = (newQuery: string) => {
    setCurrentSearchQuery(newQuery)
  }
  return (
    <div
      className={`w-full ${isUpdating ? "brightness-75" : "brightness-100"}`}
    >
      <span className="mb-4 mt-6 flex w-full justify-between">
        <span className="flex gap-5">
          <AdminSearchBar onQueryChanged={onSeachQueryChangedHandler} />
          <Button
            variant="inverted-default-sm"
            onClick={() => nextAccountFilter()}
          >
            {filteredAccountType}
          </Button>
        </span>
        <Button variant="default-sm" onClick={() => openAddMemberView?.()}>
          Add New Member
        </Button>
      </span>
      <Table<MemberColumnFormat, "multiple-operations">
        data={(data && dataFilter(data)) || [defaultData]}
        operationType="multiple-operations"
        rowOperations={rowOperations}
        // Make sure that this is smaller than the amount we fetch in the `AdminService` for better UX
        showPerPage={15}
        onPageChange={(last) => {
          setIsLastPage(last)
        }}
      />
    </div>
  )
}
