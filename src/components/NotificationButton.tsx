import { LuBellPlus, LuBellRing } from "react-icons/lu";
import { useState, useEffect } from 'react';
import { subscribeNotification, unsubscribeNotification } from '../api/database';
import { useToastStore } from '../store/toastStore';
import useAuthStore from '../store/authStore';

type NotificationButtonProps = {
  marathonId: string | undefined;
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
      setToast('알림이 취소되었습니다.');
    } else {
      await subscribeNotification(user.uid, marathonId);
      setToast('알림을 신청했습니다!');
    }

    setIsNotified(!isNotified);
  };

  return (
<button
  type="button"
  onClick={handleNotificationToggle}
  className="flex items-center justify-center p-3 md:hover:bg-gray-300 rounded-full absolute top-2 right-2">
  {user && (
    isNotified ? <LuBellRing size={20} /> : <LuBellPlus size={20} />
  )}
</button>
  );
};

export default NotificationButton;
