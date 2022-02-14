import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

// custom hook to load resources from the back end and store it on Redux.
export const useLoadResource = (resource, status, fetchFn) => {
  const dispatch = useDispatch()
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFn())
    }
  }, [resource, dispatch])
}
