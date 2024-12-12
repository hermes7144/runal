import { LuBellPlus, LuBellRing } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { subscribeNotification, unsubscribeNotification } from '../api/database';
import { useToastStore } from '../store/toastStore';
import useAuthStore from '../store/authStore';

type NotificationButtonProps = {
  marathonId: string;
  marathonName: string;
};

const NotificationButton = ({ marathonId, marathonName }: NotificationButtonProps) => {
  const { user } = useAuthStore.getState();
  const [isNotified, setIsNotified] = useState(false);
  const setToast = useToastStore((state) => state.setToast);

  useEffect(() => {
    if (user) {
      setIsNotified(user.marathons.includes(marathonId));
    }
  }, [user, marathonId]);

  const handleNotificationToggle = async (e) => {
    e.stopPropagation();
    if (!user) return;

    if (isNotified) {
      await unsubscribeNotification(user.uid, marathonId);
      setToast(marathonName + ' 알림이 취소되었습니다.');
    } else {
      await subscribeNotification(user.uid, marathonId);
      setToast(marathonName + ' 알림을 신청했습니다!');
    }

    setIsNotified(!isNotified);
  };

  return (
<button
  type="button"
  onClick={handleNotificationToggle}
  className="p-4 mr-2 flex items-center justify-center hover:bg-gray-300 hover:rounded-full"
>
  {user && isNotified ? <LuBellRing size={20} /> : <LuBellPlus size={20} />}
</button>
  );
};

export default NotificationButton;
