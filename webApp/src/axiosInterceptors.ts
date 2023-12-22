// axiosConfig.ts
import axios from 'axios';
type Props = {
  setAlertMessage: (message: string) => void;
};
const setupAxiosInterceptors = ({ setAlertMessage }: Props) => {
  axios.interceptors.response.use(
    (response) => {
      // If the response is successful, return it
      return response;
    },
    (error) => {
      // If the response has a 401 or 403 status code, show an alert
      console.log('setupAxiosInterceptors - ERROR', error);
      if (error.response && error.response.status === 401) {
        setAlertMessage('Unauthorized. Authorization header is not provided.');
      }
      if (error.response.status === 403) {
        setAlertMessage('Invalid Authorization Token');
      }

      // Pass the error along
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;
