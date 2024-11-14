import React, { useState } from 'react';
import { RaceProps } from '../types/RaceProps';
import { useNavigate } from 'react-router-dom';
import useRaces from '../hooks/useRaces';

const RaceRegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed' | 'full'>('upcoming');

  const {mutateRace} = useRaces();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const raceData : RaceProps = {
      name,
      date,
      location,
      category,
      description,
      status,
    };

    mutateRace.mutate(raceData)

    navigate(-1);

  };

  return (
    <div className="p-4">
      <h2>대회 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">대회 이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="date">대회 일정</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="location">대회 장소</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="category">대회 유형</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description">대회 설명</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="status">대회 상태</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'upcoming' | 'ongoing' | 'completed' | 'full')}
            className="border p-2 w-full"
          >
            <option value="upcoming">예정</option>
            <option value="ongoing">진행중</option>
            <option value="completed">완료</option>
            <option value="full">모집 완료</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          대회 등록
        </button>
      </form>
    </div>
  );
};

export default RaceRegistrationForm;
