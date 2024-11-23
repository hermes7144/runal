// components/Toast.tsx
import React, { useEffect } from 'react';
import { useToastStore } from '../../store/toastStore'; // Zustand에서 가져오기

const Toast = () => {
  const { showToast, message, hideToast } = useToastStore();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        hideToast(); // 3초 후에 Toast 숨기기
      }, 3000); // 3초
      return () => clearTimeout(timer); // 컴포넌트가 unmount될 때 타이머 제거
    }
  }, [showToast, hideToast]);

  if (!showToast) return null;

  return (
    <div className={`toast toast-center lg:toast-end transition-opacity duration-500 ease-out ${showToast ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className='bg-white text-gray-800 p-4 rounded-full lg:rounded-lg shadow-2xl max-w-sm w-full text-center relative'>
        <p>{message}</p>
        <button className='hidden lg:block absolute top-0 right-2 text-gray-800 hover:text-gray-500' onClick={hideToast}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
