import useAuthStore from '../../store/authStore';
import { logout } from '../../api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dropdown() {
  const user = useAuthStore((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSetting = () => {
    setIsOpen(false);
    navigate('/notification');
  };
  const handleLogout = () => {
    logout();
  };  

  return (
    <div className='dropdown dropdown-end'>
      <div tabIndex={0} role='button' className='avatar' onClick={() => setIsOpen(true)}>
        <div className='w-8 rounded-full'>
          <img src={user.photoURL} alt={user.displayName} />
        </div>
      </div>
      {isOpen && (
        <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
          <li>
            <a onClick={handleSetting}>설정</a>
          </li>
          <li>
            <a onClick={handleLogout}>로그아웃</a>
          </li>
        </ul>
      )}
    </div>
  );
}
