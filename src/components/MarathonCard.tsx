import { MarathonProps } from '../types/MarathonProps';
import EventList from './EventList';
import NotificationButton from './NotificationButton';

export default function MarathonCard({ marathon}: {marathon:MarathonProps}) {

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
        <NotificationButton marathonId={marathon.id} marathonName={marathon.name} />
      </div>
      </div>
      <p className="text-gray-600 mb-1">📆 {marathon.date}</p>
      <p className="text-gray-600 mb-4">📍 {marathon.location}</p>
      <EventList events={marathon.events}/>
    </div>
  );
}

