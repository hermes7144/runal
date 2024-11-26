import { getMessaging, onMessage } from 'firebase/messaging';
import useAuthStore from '../store/authStore';
import Races from './Marathons';

export default function Index() {
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) return 'isLoading';

  return <>
  <Races/>
  </>;
}

