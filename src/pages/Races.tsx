import React from 'react';
import useRaces from '../hooks/useRaces';
import { Link } from 'react-router-dom';

export default function Races() {
  const { racesQuery } = useRaces();
  const { data: races, isLoading, isError } = racesQuery;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header with Filters */}
      <header className="p-6 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">대회 목록</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">전체</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">마라톤</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">철인 3종</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">사이클</button>
            <select className="px-4 py-2 bg-blue-500 text-white rounded-md">
              <option>정렬: 인기순</option>
              <option>정렬: 최신순</option>
            </select>
          </div>
        </div>
      </header>

      {/* Race Events */}
      <main className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {races?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>

      {/* Load More Button */}
      <div className="text-center py-6">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">더보기</button>
      </div>

      {/* Add Event Link */}
      <div className="fixed bottom-4 right-4">
        <Link to='/races/regist'>
          <button className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300">
            추가하기
          </button>
        </Link>
      </div>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <img
        src={event.image || 'default-event.jpg'}
        alt={`${event.name} 이미지`}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h2>
      <p className="text-gray-600 mb-1">📅 일정: {event.date}</p>
      <p className="text-gray-600 mb-4">📍 장소: {event.location}</p>
      <div className="flex justify-between items-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">알림 신청</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">자세히 보기</button>
      </div>
    </div>
  );
}
