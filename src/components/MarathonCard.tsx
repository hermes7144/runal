import { MarathonProps } from '../types/RaceProps';
import useAuthStore from '../store/authStore';
import { useEffect, useState } from 'react';
import { subscribeNotification, unsubscribeNotification } from '../api/database';
import { LuBellPlus, LuBellRing } from "react-icons/lu";

export default function MarathonCard({ marathon}: {marathon:MarathonProps}) {
  const { user } = useAuthStore.getState();
  const [isNotified , setIsNotified] = useState(false);


  useEffect(() => {
    if (user) {
      setIsNotified(user.marathons.includes(marathon.id));
    }
  }, [marathon, user])

  const handleNotificationToggle = async (e) => {
    e.stopPropagation();
    if (!user) return;
    
    if (isNotified) {
      await unsubscribeNotification(user.uid, marathon.id);
    } else {
      await subscribeNotification(user.uid, marathon.id);
    }
    
    setIsNotified(!isNotified);
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
          {user && isNotified ?  <LuBellRing size={20} /> :<LuBellPlus size={20} />}
        </button>
      </div>
      </div>
      <p className="text-gray-600 mb-1">📆 {marathon.date}</p>
      <p className="text-gray-600 mb-4">📍 {marathon.location}</p>

    </div>
  );
}

