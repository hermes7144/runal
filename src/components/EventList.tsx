function EventList({ events, maxVisibleCount = 4 }) {
  const visibleEvents = events.slice(0, maxVisibleCount); // 최대 표시할 개수만큼 자르기
  const hiddenEvents = events.length > maxVisibleCount ? events.slice(maxVisibleCount) : [];

  return (
    <div className="flex gap-2">
      {visibleEvents.map((event, index) => (
        <span 
          key={index} 
          className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-primary rounded-full"
        >
          {event}
        </span>
      ))}
      
      {/* 숨겨진 이벤트가 있을 경우 '더보기' 버튼 표시 */}
      {hiddenEvents.length > 0 && (
        <span>...</span>
      )}
    </div>
  );
}

export default EventList;
