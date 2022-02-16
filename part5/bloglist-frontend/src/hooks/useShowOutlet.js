import { useEffect, useState } from 'react'

// custom hook to decide whether or not to show the Outlet component
// based on the id provided.
export const useShowOutlet = (id) => {
  const [showOutlet, setShowOutlet] = useState(false)
  const [resourceId, setResourceId] = useState(null)
  useEffect(() => {
    if (id) {
      setShowOutlet(true)
      setResourceId(id)
    } else {
      setShowOutlet(false)
    }
  }, [id])

  return { showOutlet, setShowOutlet, resourceId }
}
