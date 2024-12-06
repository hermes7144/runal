import useAuthStore from '../store/authStore';
import Races from './Marathons';

export default function Index() {
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  if (isAuthLoading) return 'isLoading';

  return <>
  <Races/>
  </>;
}
