import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { readUserFromLocalStorage, selectUserToken } from '../reducers/userSlice'

// custom hook to check if the user is properly logged in
export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector(selectUserToken)
  useEffect(() => {
    const checkUser = async () => {
      dispatch(readUserFromLocalStorage())
      if (!token) {
        navigate('/login')
      } else {
        navigate('/blogs')
      }
    }
    checkUser()
  }, [token])
}
