import { login } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import Dropdown from './Dropdown';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const navigate = useNavigate();

  return (
    <header className='navbar flex justify-between font-semibold bg-white fixed top-0 left-0 right-0 z-10 border-b border-gray-300'>
      <div onClick={() => navigate('/')} className='flex items-center gap-1 text-brand'>
        <h1 className='tracking-tighter text-3xl font-semibold cursor-pointer'>러닝알리미</h1>
      </div>
      <div onClick={() => navigate('/marathons')}>레이스</div>
      <nav className='flex items-center gap-4'>
        {isLoading ? (
          <div>로딩중...</div> // 로딩 중일 때는 '로딩중...' 메시지를 출력
        ) : user ? (
          <Dropdown />        
          
        ) : (
          <div onClick={() => navigate('/login')}>로그인</div>

          
        )}
      </nav>
    </header>
  );
}
