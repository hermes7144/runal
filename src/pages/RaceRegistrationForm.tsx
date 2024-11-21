import React, { useState } from 'react';
import useRaces from '../hooks/useRaces';
import { RaceProps } from '../types/RaceProps';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/uploader';


const RaceRegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [URL, setURL] = useState('');
  const [file, setFile] = useState();
  const [status, setStatus] = useState<'upcoming' | 'ongoing' | 'completed' | 'full'>('upcoming');

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
  };

  const {mutateRace} = useRaces();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raceData : RaceProps = {
      name,
      date,
      location,
      distance,
      URL,
      status,
    };
   await uploadImage(file).then((image: string) =>
    mutateRace.mutate({...raceData, image})
  )
    navigate(-1);

  };

  return (
    <div className="p-4">
      <h2 className='text-center text-xl font-bold mb-10'>대회 등록</h2>  
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">이름</label>
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
          <label htmlFor="date">일정</label>
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
          <label htmlFor="location">장소</label>
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
          <label htmlFor="category">거리</label>
          <input
            type="text"
            id="distance"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="description">URL</label>
          <input
            type="text"
            id="URL"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>
        이미지
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />

        <div>
          <label htmlFor="status">대회 상태</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'upcoming' | 'ongoing' | 'completed' | 'full')}
            className="border p-2 w-full"
          >
            <option value="upcoming">모집 예정</option>
            <option value="ongoing">모집 중</option>
            <option value="full">모집 완료</option>
            <option value="completed">대회 완료</option>
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
