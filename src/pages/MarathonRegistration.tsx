import React, { useState } from 'react';
import useMarathons from '../hooks/useMarathons';
import { MarathonProps, RaceStatus } from '../types/RaceProps';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/uploader';
import { sendNotification } from '../service/notificationService';
import { predefinedEvents, predefinedRegions } from '../constants/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko'; 

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');


const MarathonRegistration = () => {
  const today = dayjs();
  const nextWeek = today.add(7, 'day');
  const nextMonth = today.add(1, 'month');

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState(nextMonth.format('YYYY-MM-DD'));
  const [region, setRegion] = useState('');
  const [location, setLocation] = useState('');
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [file, setFile] = useState();
  const [status, setStatus] = useState<RaceStatus>('upcoming');
  const [registrationPeriod, setRegistrationPeriod] = useState({
    startDate: today.format('YYYY-MM-DD'),
    endDate: nextWeek.format('YYYY-MM-DD'),
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

  const toggleSelection = (
    item: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleAddEvent = () => {
    if (!event.trim()) return; // 빈 입력은 무시
    setEventList((prevList) => [...prevList, event]); // 거리 추가
    setEvent(''); // 입력 초기화
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddEvent();
    }
  };

  const handleRemoveDistance = (index: number) => {
    setEventList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const { saveMarathon } = useMarathons();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const raceData : MarathonProps = {
      name,
      date,
      region,
      location,
      event: eventList,
      registrationPeriod,
      url,
      status,
      tokens:[]
    };

  await uploadImage(file).then((image: string) => {
    saveMarathon.mutate({...raceData, image});
      sendNotification(name, region, eventList)
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
          <label htmlFor="location">지역</label>
          {/* TODO: Region 작업 */}
          <div className='flex flex-wrap gap-2'>
          {predefinedRegions.map((predefinedRegion) => (
            <button
              type='button'
              key={predefinedRegion}
              className={`btn ${predefinedRegion === region ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}`}
              onClick={() => setRegion(predefinedRegion)}>
              {predefinedRegion}
            </button>
          ))}
        </div>
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

        <div className="flex items-center gap-2">
        <input
          type="text"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="거리를 입력하세요 (예: 5km)"
          className="input input-bordered w-full"
        />
        <button type='button' onClick={handleAddEvent} className="btn btn-primary">
          추가
        </button>
      </div>
      <div className='flex flex-wrap gap-2'>
        {predefinedEvents.map((event) => (
          <button type='button' key={event} className={`btn ${eventList.includes(event) ? 'btn-primary btn-sm' : 'btn-sm btn-outline'}`} onClick={() => toggleSelection(event, setEventList)}>
            {event}
          </button>
        ))}
      </div>
      <ul className="mt-4 list-disc pl-6">
        {eventList.map((distance, index) => (
      <div
        key={index}
        className="flex items-center bg-gray-100 text-gray-800 rounded-full px-4 py-1 shadow-sm">
        <span className="mr-2">{distance}</span>
        <button
          type="button"
          onClick={() => handleRemoveDistance(index)}
          className="text-red-500 hover:text-red-700 focus:outline-none">
          ✕
        </button>
      </div>
    ))}
      </ul>

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

export default MarathonRegistration;

