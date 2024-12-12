import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Dropdown from './Dropdown';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  const navigate = useNavigate();

  return (
    <header className='navbar flex justify-center items-center font-semibold bg-white fixed top-0 left-0 right-0 z-10 border-b border-gray-300 px-4'>
      <div className='container flex justify-between items-center max-w-screen-xl'>
        <div onClick={() => navigate('/')} className='flex items-center gap-1 text-primary'>
          <h1 className='text-4xl font-bold cursor-pointer'>RA</h1>
        </div>
        {/* <div onClick={() => navigate('/marathons')} className='cursor-pointer'>레이스</div> */}
        <nav className='flex items-center gap-4'>
          {isAuthLoading ? (
            <div>로딩중...</div> // 로딩 중일 때는 '로딩중...' 메시지를 출력
          ) : user ? (
            <Dropdown />        
          ) : (
            <div onClick={login} className='cursor-pointer'>로그인</div>
          )}
        </nav>
      </div>
    </header>
  );
}
