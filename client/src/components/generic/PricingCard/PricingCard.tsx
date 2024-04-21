import tick from "assets/selectedtick.png"
interface IPricingCardDefault {
  title: string
  priceString: string
  extraInfo?: string
  selected?: boolean
}

interface IPricingCardHome extends Omit<IPricingCardDefault, "selected"> {
  discountedPriceString: string
}

// Public interface
export interface IPricingCard extends IPricingCardHome, IPricingCardDefault {
  variant?: "default" | "home"
}

const PricingCardDefault = ({
  title,
  priceString,
  extraInfo,
  selected = false
}: IPricingCardDefault) => {
  return (
    <div
      className={`${selected ? "bg-dark-blue-100" : "border-dark-blue-100 border bg-transparent"} mb-6 flex  justify-center rounded-md p-8`}
    >
      <div className="flex-col">
        <h3
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col`}
        >
          {title}
        </h3>
        <h1
          className={`${selected ? "text-white" : "text-dark-blue-100"} flex-col italic`}
        >
          {priceString}
        </h1>
        <small className="text-orange">{extraInfo}</small>
        {selected && (
          <img src={tick} className="ml-auto mr-auto mt-6 h-6 w-6" />
        )}
      </div>
    </div>
  )
}

const PricingCardHome = ({
  title,
  priceString,
  extraInfo,
  discountedPriceString
}: IPricingCardHome) => (
  <div
    className="border-light-blue-100 text-light-blue-100 bg-gray-1 flex 
   flex-col rounded-md border px-7 py-5"
  >
    <h3>{title}</h3>
    <div className="mt-6">
      <span className=" text-lg line-through">{priceString}</span>
      <h1 className="-mt-3 italic">{discountedPriceString}</h1>
    </div>
    <h5 className="text-orange mt-3 uppercase">{extraInfo}</h5>
  </div>
)

/**
 * Note if you are using the `home` variant the big price text is always
 * the `discountedPriceString` even if theres no discount
 */
const PricingCard = ({
  title,
  priceString,
  discountedPriceString,
  extraInfo,
  variant = "default",
  selected = false
}: IPricingCard) => {
  switch (variant) {
    case "default":
      return (
        <PricingCardDefault
          selected={selected}
          title={title}
          priceString={priceString}
          extraInfo={extraInfo}
        />
      )
    case "home":
      return (
        <PricingCardHome
          title={title}
          priceString={priceString}
          extraInfo={extraInfo}
          discountedPriceString={discountedPriceString}
        />
      )
  }
}

export default PricingCard
