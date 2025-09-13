import { toast } from 'react-toastify';

// Toast configuration
export const toastConfig = {
  position: 'top-center' as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Success toast
export const showSuccessToast = (message: string) => {
  toast.success(message, toastConfig);
};

// Error toast
export const showErrorToast = (message: string) => {
  toast.error(message, toastConfig);
};

// Info toast
export const showInfoToast = (message: string) => {
  toast.info(message, toastConfig);
};

// Warning toast
export const showWarningToast = (message: string) => {
  toast.warning(message, toastConfig);
};
