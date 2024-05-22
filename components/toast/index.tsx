import {toast} from 'react-hot-toast'



const toastError = (message: string,) => {
  return toast.error(message, {
    duration: 1500,
    position: "top-center",
  });
};

const toastSuccess = (message: string) => {
  return toast.success(message, {
    duration: 1500,
    position: "top-center",
  });
};



  
export { toastError, toastSuccess };