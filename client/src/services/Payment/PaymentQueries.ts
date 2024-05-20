import { useQuery } from "@tanstack/react-query"
import PaymentService from "./PaymentService"
import { MembershipTypes } from "models/Payment"

export function useMembershipClientSecretQuery(
  membershipType?: MembershipTypes
) {
  return useQuery({
    queryKey: ["membershipClientSecret", membershipType],
    queryFn: () =>
      PaymentService.getMembershipPaymentClientSecret(membershipType),
    retry: 2,
    staleTime: 30000 // 30 Sec
  })
}
