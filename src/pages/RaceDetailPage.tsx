import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRaces from '../hooks/useRaces';

const RaceDetailPage = () => {
  const { raceId } = useParams(); // URL에서 raceId 파라미터 가져오기
  const navigate = useNavigate();
  
  // 대회 데이터 가져오기 (useRaces 훅을 통해)
  const { raceQuery } = useRaces(raceId);
  const { data: race, error, isLoading } = raceQuery;

  const [statusText, setStatusText] = useState<string>('');

  // 대회 상태에 따른 텍스트 표시
  useEffect(() => {
    if (race?.status === 'upcoming') {
      setStatusText('모집 예정');
    } else if (race?.status === 'open') {
      setStatusText('모집 중');
    } else {
      setStatusText('모집 완료');
    }
  }, [race?.status]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading race details.</div>;

  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-10">대회 상세 페이지</h2>
      
      {race && (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">대회 이름: {race.name}</h3>
            <p><strong>일정:</strong> {race.date}</p>
            <p><strong>장소:</strong> {race.location}</p>
            <p><strong>거리:</strong> {race.distance}</p>
            <p><strong>URL:</strong> <a href={race.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{race.url}</a></p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold">모집 기간</h4>
            <p><strong>시작일:</strong> {race.registrationPeriod.startDate}</p>
            <p><strong>종료일:</strong> {race.registrationPeriod.endDate}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold">대회 상태</h4>
            <p>{statusText}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold">대회 이미지</h4>
            {race.imageUrl ? (
              <img src={race.imageUrl} alt={race.name} className="w-full h-auto" />
            ) : (
              <p>이미지가 없습니다.</p>
            )}
          </div>

          <div>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              뒤로 가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceDetailPage;
