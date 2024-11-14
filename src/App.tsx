import { Outlet } from 'react-router-dom';
import Navbar from './common/Navbar';
import { useEffect } from 'react';
import { initializeAuthListener } from './store/authStore';

function App() {

    // Firebase 상태 변경 리스너 초기화
    useEffect(() => {
      initializeAuthListener();
    }, []); 

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;

