import { MembershipTypes } from "models/Payment"
import fetchClient from "services/OpenApiFetchClient"

const PaymentService = {
  getMembershipPaymentClientSecret: async function (
    membershipType?: MembershipTypes
  ) {
    const { data } = await fetchClient.POST("/payment/membership", {
      body: {
        membershipType
      }
    })
    if (!data) {
      throw new Error("An error occured")
    }
    return data
  }
} as const

export default PaymentService
