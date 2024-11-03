/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from './../../service-layer/controllers/UserController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StripeWebhook } from './../../service-layer/controllers/StripeWebhook';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserSignup } from './../../service-layer/controllers/SignupController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PaymentController } from './../../service-layer/controllers/PaymentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from './../../service-layer/controllers/EventController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookingController } from './../../service-layer/controllers/BookingController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AdminController } from './../../service-layer/controllers/AdminController';
import { expressAuthentication } from './../../business-layer/security/Authentication';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "FirebaseFirestore.Timestamp": {
        "dataType": "refObject",
        "properties": {
            "seconds": {"dataType":"double","required":true},
            "nanoseconds": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp"},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double"},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Partial_UserAdditionalInfo_.stripe_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Partial_UserAdditionalInfo_.Exclude_keyofPartial_UserAdditionalInfo_.stripe_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditSelfRequestBody": {
        "dataType": "refObject",
        "properties": {
            "updatedInformation": {"ref":"Omit_Partial_UserAdditionalInfo_.stripe_id_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignupResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "jwtToken": {"dataType":"string"},
            "uid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp","required":true},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double","required":true},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_UserAdditionalInfo.stripe_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_UserAdditionalInfo.Exclude_keyofUserAdditionalInfo.stripe_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignupBody": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "user": {"ref":"Omit_UserAdditionalInfo.stripe_id_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipTypeValues": {
        "dataType": "refEnum",
        "enums": ["uoa_student","non_uoa_student","returning_member","new_non_student"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipStripeProductResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"originalPrice":{"dataType":"string"},"displayPrice":{"dataType":"string","required":true},"discount":{"dataType":"boolean","required":true},"description":{"dataType":"string"},"name":{"ref":"MembershipTypeValues","required":true},"productId":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LodgePricingTypeValues": {
        "dataType": "refEnum",
        "enums": ["single_friday_or_saturday","normal"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LodgeStripeProductResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"originalPrice":{"dataType":"string"},"displayPrice":{"dataType":"string","required":true},"discount":{"dataType":"boolean","required":true},"description":{"dataType":"string"},"name":{"ref":"LodgePricingTypeValues","required":true},"productId":{"dataType":"string","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "stripe.Stripe.Checkout.Session.Status": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["complete"]},{"dataType":"enum","enums":["expired"]},{"dataType":"enum","enums":["open"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "stripe.Stripe.Metadata": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"string"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MembershipPaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "stripeClientSecret": {"dataType":"string"},
            "membershipType": {"ref":"MembershipTypeValues"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserPaymentRequestModel": {
        "dataType": "refObject",
        "properties": {
            "membershipType": {"ref":"MembershipTypeValues"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingPaymentResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "stripeClientSecret": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserBookingRequestingModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp"},
            "endDate": {"ref":"FirebaseFirestore.Timestamp"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Event": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "image_url": {"dataType":"string"},
            "location": {"dataType":"string"},
            "google_forms_link": {"dataType":"string"},
            "sign_up_start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "sign_up_end_date": {"ref":"FirebaseFirestore.Timestamp"},
            "physical_start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "physical_end_date": {"ref":"FirebaseFirestore.Timestamp"},
            "max_occupancy": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DocumentDataWithUid_Event_": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"Event"},{"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAllEventsResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "nextCursor": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"DocumentDataWithUid_Event_"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllUserBookingSlotsResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "dates": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDates": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"availableSpaces":{"dataType":"double","required":true},"maxBookings":{"dataType":"double","required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true},"description":{"dataType":"string"},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDatesResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refAlias","ref":"AvailableDates"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AvailableDatesRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp"},
            "endDate": {"ref":"FirebaseFirestore.Timestamp"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAccountTypes": {
        "dataType": "refEnum",
        "enums": ["admin","member","guest"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingIdandUserData": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "stripe_id": {"dataType":"string"},
            "uid": {"dataType":"string","required":true},
            "dateJoined": {"dataType":"string"},
            "email": {"dataType":"string","required":true},
            "membership": {"ref":"UserAccountTypes","required":true},
            "bookingId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsersByDateRangeResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"users":{"dataType":"array","array":{"dataType":"refObject","ref":"BookingIdandUserData"},"required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingsByDateRangeRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingSlotUpdateResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "updatedBookingSlots": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"bookingSlotId":{"dataType":"string","required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MakeDatesAvailableRequestBody": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "slots": {"dataType":"double","validators":{"maximum":{"errorMsg":"You have exceeded the maximum slots for bookings","value":32},"minimum":{"errorMsg":"must be positive","value":0}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"startDate":{"ref":"FirebaseFirestore.Timestamp","required":true},"endDate":{"ref":"FirebaseFirestore.Timestamp","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_MakeDatesAvailableRequestBody.slots_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_MakeDatesAvailableRequestBody.Exclude_keyofMakeDatesAvailableRequestBody.slots__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UIdssByDateRangeResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"users":{"dataType":"array","array":{"dataType":"string"},"required":true},"date":{"ref":"FirebaseFirestore.Timestamp","required":true}}}},
            "error": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookingsRequestModel": {
        "dataType": "refObject",
        "properties": {
            "startDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "endDate": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "userId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingDeleteResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "user_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DeleteBookingRequest": {
        "dataType": "refObject",
        "properties": {
            "bookingID": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CombinedUserData": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "stripe_id": {"dataType":"string"},
            "uid": {"dataType":"string","required":true},
            "dateJoined": {"dataType":"string"},
            "email": {"dataType":"string","required":true},
            "membership": {"ref":"UserAccountTypes","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AllUsersResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "nextCursor": {"dataType":"string"},
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"CombinedUserData"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetUserResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"ref":"CombinedUserData"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserAdditionalInfo": {
        "dataType": "refObject",
        "properties": {
            "date_of_birth": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "does_snowboarding": {"dataType":"boolean"},
            "does_racing": {"dataType":"boolean"},
            "does_ski": {"dataType":"boolean"},
            "phone_number": {"dataType":"double","required":true},
            "gender": {"dataType":"string"},
            "emergency_contact": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},
            "first_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your First Name"}}},
            "last_name": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},
            "dietary_requirements": {"dataType":"string","required":true,"validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},
            "ethnicity": {"dataType":"string"},
            "faculty": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},
            "university": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},
            "student_id": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},
            "university_year": {"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},
            "stripe_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
            "user": {"ref":"UserAdditionalInfo","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_UserAdditionalInfo_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"date_of_birth":{"ref":"FirebaseFirestore.Timestamp"},"does_snowboarding":{"dataType":"boolean"},"does_racing":{"dataType":"boolean"},"does_ski":{"dataType":"boolean"},"phone_number":{"dataType":"double"},"gender":{"dataType":"string"},"emergency_contact":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter a name"}}},"first_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your First Name"}}},"last_name":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your Second Name"}}},"dietary_requirements":{"dataType":"string","validators":{"isString":{"errorMsg":"Please write your dietary requirements"}}},"ethnicity":{"dataType":"string"},"faculty":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your faculty"}}},"university":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your university"}}},"student_id":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your student ID"}}},"university_year":{"dataType":"string","validators":{"isString":{"errorMsg":"Please enter your year of study"}}},"stripe_id":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EditUsersRequestBody": {
        "dataType": "refObject",
        "properties": {
            "users": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"updatedInformation":{"ref":"Partial_UserAdditionalInfo_","required":true},"uid":{"dataType":"string","required":true}}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PromoteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DemoteUserRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddCouponRequestBody": {
        "dataType": "refObject",
        "properties": {
            "uid": {"dataType":"string","required":true},
            "quantity": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingAddedEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["added_user_to_booking"],"required":true},
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingDeletedEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["removed_user_from_booking"],"required":true},
            "uid": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingAvailabilityChangeEvent": {
        "dataType": "refObject",
        "properties": {
            "timestamp": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "start_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "end_date": {"ref":"FirebaseFirestore.Timestamp","required":true},
            "event_type": {"dataType":"enum","enums":["changed_date_availability"],"required":true},
            "change": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BookingHistoryEvent": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"BookingAddedEvent"},{"ref":"BookingDeletedEvent"},{"ref":"BookingAvailabilityChangeEvent"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FetchLatestBookingHistoryEventResponse": {
        "dataType": "refObject",
        "properties": {
            "nextCursor": {"dataType":"string"},
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "historyEvents": {"dataType":"array","array":{"dataType":"refAlias","ref":"BookingHistoryEvent"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateEventBody": {
        "dataType": "refObject",
        "properties": {
            "data": {"ref":"Event","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Partial_Event_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"title":{"dataType":"string"},"description":{"dataType":"string"},"image_url":{"dataType":"string"},"location":{"dataType":"string"},"google_forms_link":{"dataType":"string"},"sign_up_start_date":{"ref":"FirebaseFirestore.Timestamp"},"sign_up_end_date":{"ref":"FirebaseFirestore.Timestamp"},"physical_start_date":{"ref":"FirebaseFirestore.Timestamp"},"physical_end_date":{"ref":"FirebaseFirestore.Timestamp"},"max_occupancy":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetEventResponse": {
        "dataType": "refObject",
        "properties": {
            "error": {"dataType":"string"},
            "message": {"dataType":"string"},
            "data": {"ref":"Event"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/users/self',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.getSelf)),

            function UsersController_getSelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersController();

              templateService.apiHandler({
                methodName: 'getSelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/users/edit-self',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.editSelf)),

            function UsersController_editSelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"EditSelfRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersController();

              templateService.apiHandler({
                methodName: 'editSelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/users/delete-user',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(UsersController)),
            ...(fetchMiddlewares<RequestHandler>(UsersController.prototype.deleteUser)),

            function UsersController_deleteUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteUserRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersController();

              templateService.apiHandler({
                methodName: 'deleteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/webhook',
            ...(fetchMiddlewares<RequestHandler>(StripeWebhook)),
            ...(fetchMiddlewares<RequestHandler>(StripeWebhook.prototype.receiveWebhook)),

            function StripeWebhook_receiveWebhook(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new StripeWebhook();

              templateService.apiHandler({
                methodName: 'receiveWebhook',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/signup',
            ...(fetchMiddlewares<RequestHandler>(UserSignup)),
            ...(fetchMiddlewares<RequestHandler>(UserSignup.prototype.signup)),

            function UserSignup_signup(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserSignupBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UserSignup();

              templateService.apiHandler({
                methodName: 'signup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/payment/membership_prices',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getMembershipPrices)),

            function PaymentController_getMembershipPrices(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentController();

              templateService.apiHandler({
                methodName: 'getMembershipPrices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/payment/lodge_prices',
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getLodgePrices)),

            function PaymentController_getLodgePrices(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentController();

              templateService.apiHandler({
                methodName: 'getLodgePrices',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/payment/checkout_status',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getCheckoutSessionDetails)),

            function PaymentController_getCheckoutSessionDetails(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    sessionId: {"in":"query","name":"sessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentController();

              templateService.apiHandler({
                methodName: 'getCheckoutSessionDetails',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payment/membership',
            authenticateMiddleware([{"jwt":[]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getMembershipPayment)),

            function PaymentController_getMembershipPayment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserPaymentRequestModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentController();

              templateService.apiHandler({
                methodName: 'getMembershipPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/payment/booking',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(PaymentController)),
            ...(fetchMiddlewares<RequestHandler>(PaymentController.prototype.getBookingPayment)),

            function PaymentController_getBookingPayment(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"UserBookingRequestingModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new PaymentController();

              templateService.apiHandler({
                methodName: 'getBookingPayment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/events',
            ...(fetchMiddlewares<RequestHandler>(EventController)),
            ...(fetchMiddlewares<RequestHandler>(EventController.prototype.getAllEvents)),

            function EventController_getAllEvents(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    limit: {"default":20,"in":"query","name":"limit","dataType":"double"},
                    cursor: {"in":"query","name":"cursor","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new EventController();

              templateService.apiHandler({
                methodName: 'getAllEvents',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/bookings',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.getAllBookings)),

            function BookingController_getAllBookings(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookingController();

              templateService.apiHandler({
                methodName: 'getAllBookings',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/bookings/available-dates',
            authenticateMiddleware([{"jwt":["member"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.getAvailableDates)),

            function BookingController_getAvailableDates(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AvailableDatesRequestModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookingController();

              templateService.apiHandler({
                methodName: 'getAvailableDates',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/bookings/fetch-users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(BookingController)),
            ...(fetchMiddlewares<RequestHandler>(BookingController.prototype.fetchUsersByBookingDateRange)),

            function BookingController_fetchUsersByBookingDateRange(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"BookingsByDateRangeRequestModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookingController();

              templateService.apiHandler({
                methodName: 'fetchUsersByBookingDateRange',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/bookings/make-dates-available',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.makeDateAvailable)),

            function AdminController_makeDateAvailable(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"MakeDatesAvailableRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'makeDateAvailable',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/bookings/make-dates-unavailable',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.makeDateUnavailable)),

            function AdminController_makeDateUnavailable(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Omit_MakeDatesAvailableRequestBody.slots_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'makeDateUnavailable',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/bookings/create',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createBookings)),

            function AdminController_createBookings(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateBookingsRequestModel"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'createBookings',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/bookings/delete',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.removeBooking)),

            function AdminController_removeBooking(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DeleteBookingRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'removeBooking',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/admin/users',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getAllUsers)),

            function AdminController_getAllUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    cursor: {"in":"query","name":"cursor","dataType":"string"},
                    toFetch: {"in":"query","name":"toFetch","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/admin/users/:uid',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getUser)),

            function AdminController_getUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    uid: {"in":"path","name":"uid","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'getUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/admin/users/create',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createUser)),

            function AdminController_createUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateUserRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/admin/users/bulk-edit',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.editUsers)),

            function AdminController_editUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"EditUsersRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'editUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/admin/users/promote',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.promoteUser)),

            function AdminController_promoteUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"PromoteUserRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'promoteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/admin/users/demote',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.demoteUser)),

            function AdminController_demoteUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"DemoteUserRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'demoteUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/admin/users/demote-all',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.demoteAllUsers)),

            function AdminController_demoteAllUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'demoteAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/users/add-coupon',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.addCoupon)),

            function AdminController_addCoupon(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"AddCouponRequestBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'addCoupon',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/admin/bookings/history',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getLatestHistory)),

            function AdminController_getLatestHistory(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    limit: {"in":"query","name":"limit","required":true,"dataType":"double"},
                    cursor: {"in":"query","name":"cursor","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'getLatestHistory',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/admin/events',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.createNewEvent)),

            function AdminController_createNewEvent(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    body: {"in":"body","name":"body","required":true,"ref":"CreateEventBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'createNewEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.editEvent)),

            function AdminController_editEvent(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
                    requestBody: {"in":"body","name":"requestBody","required":true,"ref":"Partial_Event_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'editEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.deleteEvent)),

            function AdminController_deleteEvent(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'deleteEvent',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/admin/events/:id',
            authenticateMiddleware([{"jwt":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(AdminController)),
            ...(fetchMiddlewares<RequestHandler>(AdminController.prototype.getEventById)),

            function AdminController_getEventById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new AdminController();

              templateService.apiHandler({
                methodName: 'getEventById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
