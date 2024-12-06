function EventList({ events, maxVisibleCount = 4 }) {
  const visibleEvents = events.slice(0, maxVisibleCount); // 최대 표시할 개수만큼 자르기
  const hiddenEvents = events.length > maxVisibleCount ? events.slice(maxVisibleCount) : []; // 숨겨진 이벤트들https://daisyui.com/

  return (
    <div className="flex gap-2">
      {visibleEvents.map((event, index) => (
        <span 
          key={index} 
          className="inline-flex items-center p-1 text-xs font-medium text-white bg-blue-500 rounded-full"
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
