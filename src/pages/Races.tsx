import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

export default function Races() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const db = getDatabase();
      const snapshot = await get(ref(db, 'races'));

      if (snapshot.exists()) {
        setEvents(Object.values(snapshot.val()));
      } else {
        setEvents([]);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);

  if (isLoading) return <p>로딩중...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header with Filters */}
      <header className="p-6 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">대회 목록</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded">전체</button>
            <button className="px-4 py-2 bg-gray-200 rounded">마라톤</button>
            <button className="px-4 py-2 bg-gray-200 rounded">철인 3종</button>
            <button className="px-4 py-2 bg-gray-200 rounded">사이클</button>
            <select className="px-4 py-2 bg-gray-200 rounded">
              <option>정렬: 인기순</option>
              <option>정렬: 최신순</option>
            </select>
          </div>
        </div>
      </header>

      {/* Event Cards */}
      <main className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>

      {/* Load More Button */}
      <div className="text-center py-6">
        <button className="px-6 py-2 bg-gray-300 rounded">더보기</button>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img
        src={event.image || 'default-event.jpg'}
        alt={`${event.name} 이미지`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-1">📅 일정: {event.date}</p>
      <p className="text-gray-600 mb-4">📍 장소: {event.location}</p>
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">알림 신청</button>
        <button className="px-4 py-2 bg-gray-200 rounded">자세히 보기</button>
      </div>
    </div>
  );
}
