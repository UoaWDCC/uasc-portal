/**
 * Used for if there is a lazy load error due to a chunk not being found
 */
const RefreshNotification = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h2 className="text-dark-blue-100">
        A new version of the site is ready. Please refresh the page
      </h2>
    </div>
  )
}

export default RefreshNotification
