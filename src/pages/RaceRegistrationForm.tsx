import React, { useState } from 'react';
import useRaces from '../hooks/useRaces';
import { RaceProps, RaceStatus } from '../types/RaceProps';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/uploader';
import { fetchAllTokens } from '../api/database';


const RaceRegistrationForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState();
  const [status, setStatus] = useState<RaceStatus>('upcoming');
  const [registrationPeriod, setRegistrationPeriod] = useState({
    startDate: "",
    endDate: "",
  });
  const handleChange = (e) => {
    const { name, files } = e.target;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
  };

  const handleRegistrationPeriod = (e) => {
    const { id, value } = e.target;
    setRegistrationPeriod((prev) => ({
      ...prev,
      [id]: value, // id를 키로 사용하여 startDate 또는 endDate를 업데이트
    }));
  }

  const {mutateRace} = useRaces();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raceData : RaceProps = {
      category:'marathon',
      name,
      date,
      location,
      distance,
      registrationPeriod,
      url,
      status,
    };

  await uploadImage(file).then((image: string) => {
      mutateRace.mutate({...raceData, image});
      sendNotification(name, date + location)
    }
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
          <label htmlFor="date">모집기간</label>
          <input
            type="date"
            id="startDate"
            value={registrationPeriod.startDate}
            onChange={handleRegistrationPeriod}
            required
            className="border p-2 w-full"
          />~
          <input
            type="date"
            id="endDate"
            value={registrationPeriod.endDate}
            onChange={handleRegistrationPeriod}
            required
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description">URL</label>
          <input
            type="text"
            id="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
            onChange={(e) => setStatus(e.target.value as RaceStatus)}
            className="border p-2 w-full"
          >
            <option value="upcoming">모집 예정</option>
            <option value="open">모집 중</option>
            <option value="close">모집 완료</option>
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

async function sendNotification(title, body) {
  const tokens = await fetchAllTokens();
  
  // const addr = 'http://localhost:8888/.netlify/functions/sendNotification';
  const addr = 'https://fcm-server.netlify.app/.netlify/functions/sendNotification';

  await fetch(addr, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      tokens: tokens,
      title,
      body
      }),
  });
}
