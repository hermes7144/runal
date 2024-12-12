import { MarathonProps } from '../types/MarathonProps';
import EventList from './EventList';
import NotificationButton from './NotificationButton';

import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp';

import dayjs from 'dayjs';
import { MarathonBadge } from './MarathonBadge';

export default function MarathonCard({ marathon }: { marathon: MarathonProps }) {
  return (
    <div className='flex sm:flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer relative sm:min-w-72' onClick={() => window.open(marathon.url)}>
      <MarathonBadge marathon={marathon} />
      <img src={marathon.image || 'default-event.svg'} alt={`${marathon.name} 이미지`} className='h-28 sm:h-48 object-cover rounded-l-lg sm:rounded-t-lg' />
      <div className='w-full flex items-center justify-between'>
        <div className='flex flex-col px-3 py-1 sm:p-4 w-full gap-1'>
          <h2 className='text-md sm:text-xl font-semibold text-gray-800'>{marathon.name}</h2>
          <div className='flex items-center text-gray-600'>
            <FaRegCalendarAlt className='w-5 h-5 mr-2' />
            {dayjs(marathon.date).format('YYYY년 MM월 DD일')}
          </div>
          <div className='flex items-center text-gray-600'>
            <IoLocationSharp className='w-5 h-5 mr-2' />
            {marathon.location}
          </div>
          <EventList events={marathon.events} />
        </div>
        <NotificationButton marathonId={marathon.id} marathonName={marathon.name} />
      </div>
    </div>
  );
}
