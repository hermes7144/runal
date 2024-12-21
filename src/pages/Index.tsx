import useAuthStore from '../store/authStore';
import Marathons from './Marathons';

export default function Index() {
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  if (isAuthLoading) return  (
    <div className='container mx-auto p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:min-w-[1280px] mb-16 lg:mb-0'>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );

  return <Marathons/>;
}
