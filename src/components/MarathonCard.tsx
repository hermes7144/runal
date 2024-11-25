import { MarathonProps } from '../types/RaceProps';
import useAuthStore from '../store/authStore';
import { useEffect, useState } from 'react';
import { subscribeNotification, unsubscribeNotification } from '../api/database';
import UseToken from '../hooks/useToken';

export default function MarathonCard({ marathon}: {marathon:MarathonProps}) {
  const user = useAuthStore.getState().user ?? null;
  const { tokenQuery : {data: token } } = UseToken();
  const [isNotified , setIsNotified] = useState(false);


  useEffect(() => {
    if (token) {
      setIsNotified(marathon.tokens.includes(token));
    }
  }, [marathon, token])

  const handleNotificationToggle = async (e) => {
    e.stopPropagation();
    

    if (isNotified) {
      await unsubscribeNotification(marathon.id, token);
    } else {
      await subscribeNotification(marathon.id, token);
    }

    setIsNotified(!isNotified);  // 구독 상태 토글
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer" onClick={() => window.open(marathon.url)}>
      <img
        src={marathon.image || 'default-event.svg'}
        alt={`${marathon.name} 이미지`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div className='flex justify-between'>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{marathon.name}</h2>
        <div className="flex justify-between items-center">
        <button type='button' onClick={handleNotificationToggle}>
          {user && isNotified ? '구독':'구독아님'}
        </button>
      </div>
      </div>
      <p className="text-gray-600 mb-1">{marathon.date}</p>
      <p className="text-gray-600 mb-4"> 장소: {marathon.location}</p>

    </div>
  );
}
