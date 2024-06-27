import { useAppData } from "store/Store"
import { useNavigate } from "react-router-dom"
import ProfileInformationPanel from "components/generic/ProfileInformationPanel/ProfileInformationPanel"
import { Footer } from "components/generic/Footer/Footer"
import ResponsiveBackgroundImage from "components/generic/ResponsiveBackgroundImage/ResponsiveBackground"
import { useForceRefreshToken } from "hooks/useRefreshedToken"

const SignOutButton = () => {
  const navigate = useNavigate()
  const handleOnclick = () => {
    navigate("/login")
  }

  useForceRefreshToken()

  return (
    <div
      className="border-red space-x-4; disabled:bg-gray-3 text-red hover:bg-red
    flex flex-col items-center rounded-md border bg-white px-8 py-2 font-sans font-bold 
   hover:text-white enabled:border"
    >
      <button className="uppercase" onClick={handleOnclick}>
        sign out
      </button>
    </div>
  )
}

const determineUserSkiSnowboardStatus = (status: {
  Ski?: boolean | undefined
  Snowboard?: boolean | undefined
}) => {
  if (status.Ski && status.Snowboard) {
    return "Both"
  } else if (status.Ski) {
    return "Skiier"
  } else if (status.Snowboard) {
    return "Snowboarder"
  } else {
    return "New"
  }
}

const Field = ({
  subtitle,
  description
}: {
  subtitle: string
  description?: string
}) => {
  return (
    <>
      <div>
        <p className="pb-1 text-base font-normal leading-tight text-stone-300">
          {subtitle}
        </p>
        <p className="text-black/opacity-20 pb-1 text-base font-normal leading-tight">
          {description}
        </p>
      </div>
    </>
  )
}
export default function Profile() {
  const [{ currentUserData }] = useAppData()
  const [{ currentUser }] = useAppData()

  function toDateTime(secs?: number) {
    const t = new Date() // Epoch
    t.setSeconds(secs!)
    const f = t.toDateString()
    return f
  }

  return (
    <div className="relative min-h-screen">
      <ResponsiveBackgroundImage>
        <div className="pb-[15%]">
          <div className="grid-cols grid w-full ">
            <div className="grid grid-cols-5 gap-3 pb-4">
              <h2 className="text-dark-blue-100 left-0 top-0 col-span-4 grid pl-4 italic">{`${currentUserData?.first_name} ${currentUserData?.last_name}`}</h2>
              <div className="col-span-1 ml-[-40px] flex items-center justify-end text-nowrap">
                <SignOutButton />
              </div>
            </div>

            <div className="grid w-full gap-4">
              <ProfileInformationPanel
                title="Personal details"
                onEdit={() => {}}
              >
                <div className="flex w-full flex-col gap-4">
                  <div className="grid grid-cols-4">
                    <Field
                      subtitle="Name"
                      description={`${currentUserData?.first_name} ${currentUserData?.last_name}`}
                    />
                    <Field
                      subtitle="Gender"
                      description={`${currentUserData?.gender}`}
                    />
                    <Field
                      subtitle="Student ID"
                      description={`${currentUserData?.student_id}`}
                    />
                    <Field
                      subtitle="Date of birth"
                      description={`${toDateTime(currentUserData?.date_of_birth.seconds)}`}
                    />
                  </div>
                  <div className="grid grid-cols-4 text-nowrap">
                    <Field
                      subtitle="Email"
                      description={`${currentUser?.email}`}
                    />
                    <Field subtitle="Phone number" description="021 123 1234" />
                    <Field
                      subtitle="Emergency contact info"
                      description={`${currentUserData?.emergency_contact}`}
                    />
                  </div>
                </div>
              </ProfileInformationPanel>
              <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-2">
                <ProfileInformationPanel title="Membership" onEdit={() => {}}>
                  <Field
                    subtitle="Membership type"
                    description={"UoA Student"} // value not yet set
                  />
                  <Field
                    subtitle="Valid til"
                    description="9/12/24" // value not yet set
                  />
                </ProfileInformationPanel>
                <ProfileInformationPanel
                  title="Additional details"
                  onEdit={() => {}}
                >
                  <Field
                    subtitle="Dietary requirements"
                    description={`${currentUserData?.dietary_requirements}`}
                  />
                  <Field
                    subtitle="Skiier/Snowboarder"
                    description={determineUserSkiSnowboardStatus({
                      Ski: currentUserData?.does_ski,
                      Snowboard: currentUserData?.does_snowboarding
                    })}
                  />
                </ProfileInformationPanel>
                <ProfileInformationPanel title="Current bookings">
                  <div className="border border-black p-4">
                    Calender component waiting to be implemented
                  </div>
                </ProfileInformationPanel>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveBackgroundImage>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
