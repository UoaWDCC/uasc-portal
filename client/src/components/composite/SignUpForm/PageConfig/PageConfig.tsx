import { PageProps } from "components/generic/PaginatedForm/PaginatedForm"
import {
  PersonalSectionFirst,
  PersonalSectionSecond
} from "../Sections/PersonalSection"
import { ContactSection } from "../Sections/ContactSection"
import { AdditionalSection } from "../Sections/AdditionalSection"
import ConfirmationSection from "../Sections/ConfirmationSection"
import SuccessSection from "../Sections/SuccessSection"

import {
  ACCOUNT_SETUP_ROUTE,
  ADDITIONAL_ROUTE,
  CONTACT_ROUTE,
  PAGES,
  PAYMENT_INFORMATION_ROUTE,
  PAYMENT_ROUTE,
  PERSONAL_ROUTE_1,
  PERSONAL_ROUTE_2,
  SUCCESS_ROUTE,
  RouteNames
} from "../utils/RouteNames"
import {
  PaymentInformationSection,
  PaymentSection
} from "../Sections/PaymentSection"
import TestIcon from "assets/icons/snowboarder.svg?react"
import { UseMutateFunction } from "@tanstack/react-query"
import { signInWithCustomToken } from "firebase/auth"
import { auth } from "firebase"
import AccountSetupSection from "../Sections/AccountSetupSection"

type FormSubmissionMutationFunction = UseMutateFunction<
  | {
      error?: string | undefined
      message?: string | undefined
      jwtToken?: string | undefined
      uid?: string | undefined
    }
  | undefined,
  Error,
  void,
  unknown
>

export const PAGINATED_FORM_PAGES = (
  navigateFn: (route: RouteNames | "/profile" | number) => void,
  signUpFn: FormSubmissionMutationFunction,
  validateFormFn: (pageToValidate: PAGES, navigateFn: () => void) => void,
  disableSubmit: boolean,
  isSignedIn: boolean = false
): PageProps[] => [
  {
    index: PAGES.PersonalFirst,
    title: "Personal details",
    onNext: () => {
      validateFormFn(PAGES.PersonalFirst, () => navigateFn(PERSONAL_ROUTE_2))
    }
  },
  {
    index: PAGES.PersonalSecond,
    title: "Personal details",
    onBack: () => navigateFn(PERSONAL_ROUTE_1),
    onNext: () => {
      validateFormFn(PAGES.PersonalSecond, () => navigateFn(CONTACT_ROUTE))
    }
  },
  {
    index: PAGES.Contact,
    title: "Contact details",
    onBack: () => navigateFn(PERSONAL_ROUTE_2),
    onNext: () => {
      validateFormFn(PAGES.Contact, () => navigateFn(ADDITIONAL_ROUTE))
    }
  },
  {
    index: PAGES.Additional,
    title: "Additional info",
    nextButtonText: "Sign Up",
    onBack: () => navigateFn(CONTACT_ROUTE),
    onNext: () => {
      validateFormFn(PAGES.Additional, () =>
        signUpFn(undefined, {
          async onSuccess(data) {
            // console.log(data)
            if (data?.jwtToken) {
              await signInWithCustomToken(auth, data.jwtToken)
            }
          },
          onError(error) {
            console.error("Error signing up " + error)
          }
        })
      )
    },
    nextDisabled: disableSubmit
  },
  {
    index: PAGES.PaymentInfo,
    title: "Payment Information",
    onNext: () => navigateFn(PAYMENT_ROUTE)
  },
  {
    index: PAGES.Payment,
    title: "Payment",
    nextButtonText: " ",
    onBack: () => navigateFn(PAYMENT_INFORMATION_ROUTE)
  },
  {
    index: PAGES.Confirm,
    title: "Confirm",
    onNext: () => navigateFn(ACCOUNT_SETUP_ROUTE),
    nextDisabled: !isSignedIn,
    backDisabled: !isSignedIn
  },
  {
    index: PAGES.AccountSetup,
    title: "Account",
    // goes back to one page earlier in history, otherwise does nothing
    onBack: () => navigateFn(-1),
    // after setting up the account, the next button is enabled and shows the success section
    onNext: () => navigateFn(SUCCESS_ROUTE)
  },
  {
    index: PAGES.Success,
    title: "Success",
    onBack: () => navigateFn(ACCOUNT_SETUP_ROUTE),
    onNext: () => navigateFn("/profile")
  }
]

/**
 * Make sure these are in order
 */
export const PAGE_CONTENT = [
  <PersonalSectionFirst key="personal-first" />,
  <PersonalSectionSecond key="personal-second" />,
  <ContactSection key="contact" />,
  <AdditionalSection key="additional" />,
  <PaymentInformationSection key="payment-info" />,
  <PaymentSection key="payment" />,
  <ConfirmationSection
    key="confirm"
    subHeader="Thank you!"
    textTop="Your application has been received, and you’ll be sent a confirmation email soon."
    textBottom="In the meantime, please set up your login details."
    SvgIcon={TestIcon}
  />,
  <AccountSetupSection key="account" />,
  <SuccessSection key="Success" />
]

/**
 * With the index, if each `step` has multiple stages we need to set the index of the step
 * to the first `page` of that `step`
 */
export const STEPPER_PROPS = [
  // Hacky solution, need to revisit props for stepper
  { name: "Personal", index: PAGES.PersonalFirst },
  { name: "Contact", index: PAGES.Contact },
  { name: "Additional", index: PAGES.Additional },
  { name: "Payment", index: PAGES.PaymentInfo },
  { name: "Confirm", index: PAGES.Confirm },
  { name: "Account", index: PAGES.AccountSetup }
]
