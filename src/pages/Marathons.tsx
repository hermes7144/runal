import React, { useEffect, useRef, useState } from 'react';
import useMarathons from '../hooks/useMarathons';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import MarathonCard from '../components/MarathonCard';
import { FaPlus } from 'react-icons/fa';
import useAuthStore from '../store/authStore';
dayjs.extend(isSameOrAfter);

export default function Marathons() {
  const { user } = useAuthStore.getState();

  const [status, setStatus] = useState('all');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [event, setEvent] = useState('');

  const { marathons, isLoading, fetchMore, hasMore } = useMarathons(status);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        fetchMore();
      }
    };

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.5,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loaderRef, fetchMore]);


  const filteredMarathons = marathons?.filter((marathon) => {
    const marathonDate = dayjs(marathon.date);
    const marathonYear = marathonDate.year();
    const marathonMonth = marathonDate.month() + 1;

    return (
      (event === '' || marathon.events.includes(event)) &&
      (year === '' || String(marathonYear) === year) &&
      (month === '' || String(marathonMonth) === month) &&
      (region === '' || marathon.region.includes(region))
    );
  });

  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  return (
    <div className='container min-h-[calc(100vh-64px)] flex flex-col'>
      {/* Header with Filters */}
      <header className='mt-2 px-3 py-3 bg-white shadow-md'>
        <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>
          <h1 className='text-2xl font-bold text-gray-800 mb-4 sm:mb-0'>마라톤</h1>
          <div className='flex flex-col sm:flex-row gap-4 w-full sm:w-auto'>
            {/* 카테고리 선택 */}
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-2'>모집 상태</label>
              <select
                className='select bg-gray-200 rounded-md'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value='all'>전체</option>
                <option value='open'>모집중/예정</option>
                <option value='close'>모집종료</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-2'>거리</label>
              <select className='select bg-gray-200 rounded-md' value={event} onChange={(e) => setEvent(e.target.value)}>
                <option value=''>전체</option>
                <option value='Full'>Full</option>
                <option value='Half'>Half</option>
                <option value='10km'>10km</option>
                <option value='5km'>5km</option>
              </select>
            </div>
            {/* 년/월 선택 */}
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-2'>연도</label>
              <select className='select  bg-gray-200 rounded-md' value={year} onChange={(e) => setYear(e.target.value)}>
                <option value=''>전체</option>
                <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}년</option>
                <option value={new Date().getFullYear()}>{new Date().getFullYear()}년</option>
                <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}년</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='text-gray-700 mb-2'>월</label>
              <select className='select bg-gray-200 rounded-md' value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value=''>전체</option>
                {months.map((month) => (
                  <option key={month} value={parseInt(month)}>{month}월</option>
                ))}
              </select>
            </div>
            <div className='flex flex-col'>
              <label className='text-gray-700 mb-2'>지역</label>
              <input type='text' placeholder='지역' className='input bg-gray-200 rounded-md' value={region} onChange={(e) => setRegion(e.target.value)} />
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:min-w-[1280px] mb-16 lg:mb-0'>
        {filteredMarathons?.map((marathon) => (
          <MarathonCard key={marathon.id} marathon={marathon} />
        ))}
        <div ref={loaderRef} className="text-center my-4">

          {isLoading && (
            <>
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      {user && <div className='fixed bottom-20 right-4'>
        <Link to='/marathons/new'>
          <button className="w-12 h-12 bg-primary text-white rounded-full shadow-xl flex justify-center items-center hover:bg-primary-dark hover:shadow-2xl transition-all">
            <FaPlus />
          </button>
        </Link>
      </div>}
    </div>
  );
}
