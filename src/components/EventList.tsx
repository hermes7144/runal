import { memo } from 'react';

function EventList({ events, maxVisibleCount = 4 }) {
  const visibleEvents = events.slice(0, maxVisibleCount);
  const hiddenEvents = events.length > maxVisibleCount ? events.slice(maxVisibleCount) : [];

  return (
    <div className='flex gap-2'>
      {visibleEvents.map((event) => (
        <span
          key={event}
          className={`inline-flex items-center px-2 py-1 text-xs font-medium text-white rounded-full ${event === 'Full' ? 'bg-red-400' : event === 'Half' ? 'bg-orange-400' : 'bg-primary'}`}>
          {event}
        </span>
      ))}

      {hiddenEvents.length > 0 && <span>...</span>}
    </div>
  );
}

export default memo(EventList);