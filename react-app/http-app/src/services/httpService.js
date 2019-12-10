import Axios from "axios";
import { toast } from 'react-toastify'
import logger from './loggerService'

// Axios interceptor for catching errors
Axios.interceptors.response.use(null, error => {
  const expectedError = 
  error.response && error.response.status >= 400 &&
  error.response.status < 500;

  if (!expectedError) {
    logger.log(error)
    toast('An unexpected error occured')
  }
  return Promise.reject(error);
})
export default {
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete
}