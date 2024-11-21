import React, { useState } from 'react';
import useRaces from '../hooks/useRaces';
import { Link } from 'react-router-dom';
import { RaceProps } from '../types/RaceProps';

export default function Races() {
  const [distance, setDistance] = useState('');
  const [location, setLocation] = useState(''); 
  const [year, setYear] = useState(new Date().getFullYear()); 
  const [month, setMonth] = useState('');

  const { racesQuery } = useRaces();
  const { data: races, isLoading, isError } = racesQuery;

  // 필터링된 대회 목록
  console.log(races);
  

  const filteredRaces = races?.filter((race: RaceProps) => {
    return (
      (distance === '' || race.distance === distance) &&  
      new Date(race.date).getFullYear() === year &&
      (month === '' || new Date(race.date).getMonth() + 1 === Number(month)) && 
      (location === '' || race.location.includes(location))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header with Filters */}
      <header className="p-6 bg-white shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row gap-20 items-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">마라톤 목록</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* 카테고리 선택 */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">거리</label>
              <select
                className="px-4 py-2 bg-gray-200 rounded-md"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              >
                <option value=''>전체</option>
                <option value="Full">Full</option>
                <option value="Half">Half</option>
                <option value="10km">10km</option>
                <option value="5km">5km</option>
              </select>
            </div>
            {/* 년/월 선택 */}
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">연도</label>
              <select
                className="px-4 py-2 bg-gray-200 rounded-md"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}년</option>
                <option value={new Date().getFullYear()}>{new Date().getFullYear()}년</option>
                <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}년</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">월</label>
              <select
                className="px-4 py-2 bg-gray-200 rounded-md"
                value={month}
                onChange={(e) => setMonth((e.target.value))}
              >
                  <option value=''>전체</option>
                  <option value={1}>1월</option>
                  <option value={2}>2월</option>
                  <option value={3}>3월</option>
                  <option value={4}>4월</option>
                  <option value={5}>5월</option>
                  <option value={6}>6월</option>
                  <option value={7}>7월</option>
                  <option value={8}>8월</option>
                  <option value={9}>9월</option>
                  <option value={10}>10월</option>
                  <option value={11}>11월</option>
                  <option value={12}>12월</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">장소</label>
              <input
                type="text"
                placeholder="장소"
                className="px-4 py-2 bg-gray-200 rounded-md"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Race Events */}
      <main className="container mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRaces?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>

      {/* Load More Button */}
      <div className="text-center py-6">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
          더보기
        </button>
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

function EventCard({ event }:RaceProps) {
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
      </div>
    </div>
  );
}
