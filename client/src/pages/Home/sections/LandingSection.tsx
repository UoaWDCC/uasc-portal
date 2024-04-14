import UASCHeader from "assets/logos/UASCTextLogo.png"
import Button from "components/generic/FigmaButtons/FigmaButton"

const LandingSection = () => (
  <section>
    <div
      className="bg-home-ski-image relative
         -z-20 -mt-14 flex
         h-screen min-h-screen flex-col 
         items-center
         justify-center overflow-hidden bg-cover bg-top bg-no-repeat"
    >
      <div className="bg-gray-1 pointer-events-none absolute -z-20 h-screen w-full opacity-90" />
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex lg:w-1/2 ">
          <img src={UASCHeader} alt="" />
        </div>
        <h3 className="text-dark-blue-100 lg:w-1/3 ">
          We are UASC, The largest sports club on campus
        </h3>
        <h5 className="text-dark-blue-100 uppercase">
          Cheapest Membership on the mountain
        </h5>
        <Button>Sign up now!</Button>
      </div>

      <h5 className="text-dark-blue-100 absolute bottom-9 uppercase">
        Find out more
      </h5>
    </div>
  </section>
)

export default LandingSection
