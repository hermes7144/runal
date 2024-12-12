import { memo } from 'react';
import dayjs from 'dayjs';
import { MarathonProps } from '../types/MarathonProps';
import EventList from './EventList';
import NotificationButton from './NotificationButton';
import { MarathonBadge } from './MarathonBadge';

import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
import { IoLocationSharp } from '@react-icons/all-files/io5/IoLocationSharp';
import { FaWonSign } from '@react-icons/all-files/fa/FaWonSign';

const MemoizedFaRegCalendarAlt = memo(FaRegCalendarAlt);
const MemoizedIoLocationSharp = memo(IoLocationSharp);
const MemoizedFaWonSign = memo(FaWonSign);

function MarathonCard({ marathon }: { marathon: MarathonProps }) {
  return (
    <div className='flex sm:flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer relative' onClick={() => window.open(marathon.url)}>
      <MarathonBadge marathon={marathon} />
      <img src={marathon.image || 'default-event.svg'} alt={`${marathon.name} 이미지`} className='h-28 sm:h-48 object-cover rounded-l-lg sm:rounded-l-none sm:rounded-t-lg' />
      <div className='w-full flex items-center justify-between relative'>
        <NotificationButton marathonId={marathon.id} marathonName={marathon.name} />

        <div className='flex flex-col p-2 sm:p-4 w-full gap-1 text-sm sm:text-lg'>
          <div className='flex justify-between items-center'>
            <h2 className=' font-semibold text-gray-800'>{marathon.name}</h2>
          </div>
          <div className='flex items-center text-gray-600'>
            <MemoizedFaRegCalendarAlt className='w-5 h-5 flex-shrink-0  mr-1' />
            {dayjs(marathon.date).format('YYYY년 MM월 DD일 dddd')}
          </div>
          <div className='flex items-center text-gray-600'>
            <MemoizedIoLocationSharp className='w-5 h-5 flex-shrink-0 mr-1' />
            <span className='truncate w-44 sm:w-full'>
            {marathon.region}, {marathon.location}
            </span>
          </div>
          <div className='flex items-center text-gray-600'>
            <MemoizedFaWonSign className='w-5 h-5 flex-shrink-0 mr-1' />
            {marathon.price.toLocaleString()}원 ~
          </div>
          <EventList events={marathon.events} />
        </div>
      </div>
    </div>
  );
}

export default memo(MarathonCard);