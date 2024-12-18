import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';
import useMarathons from '../hooks/useMarathons';
import { uploadImage } from '../api/uploader';
import { sendNotification } from '../service/notificationService';
import { predefinedEvents, predefinedRegions } from '../constants/constants';
import { useToastStore } from '../store/toastStore';
import useAuthStore from '../store/authStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

const MarathonRegistration = () => {
  const user = useAuthStore.getState().user;
  const navigate = useNavigate();
  const { saveMarathon } = useMarathons();
  const { setToast } = useToastStore();

  // Form 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    region: '',
    location: '',
    events: [] as string[],
    eventInput: '',
    registrationPeriod: {
      startDate: '',
      endDate: '',
    },
    price: 0,
    url: '',
    status: 'upcoming',
    file: null as File | null,
    isClosed: false, // 모집 마감 여부
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  

  // 폼 데이터 업데이트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {    
    const { id, value, files } = e.target;
    
    if (id === 'file') {
      setFormData((prev) => ({ ...prev, file: files?.[0] || null }));

    } else if (id === 'price') {
      if (/^\d*$/.test(value)) {
        setFormData(prev => ({...prev, price: Number(value)}));
      }
    }  else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // 이벤트 추가 핸들러
  const handleAddEvent = () => {
    const eventInput = formData.eventInput.trim();
    if (!eventInput) return; // 빈 입력 방지
    if (formData.events.includes(eventInput)) {
      setToast('이미 추가된 이벤트입니다.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      events: [...prev.events, eventInput],
      eventInput: '', // 입력 필드 초기화
    }));
  };

  // 이벤트 삭제 핸들러
  const handleRemoveEvent = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index),
    }));
  };

  // 미리 정의된 이벤트 선택/해제
  const togglePredefinedEvent = (event: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(event) ? prev.events.filter((e) => e !== event) : [...prev.events, event],
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setisSubmitting(true);

    const { eventInput, file, ...raceData } = formData;

    const rearrangeEvents = (events) => {
      const full = events.filter((event) => event === 'Full');
      const half = events.filter((event) => event === 'Half');

      const kmEvents = events.filter((event) => event.includes('km')).sort((a, b) => parseInt(b) - parseInt(a)); // 내림차순 정렬

      const otherEvents = events.filter((event) => !event.includes('km') && event !== 'Full' && event !== 'Half');

      return [...full, ...half, ...kmEvents, ...otherEvents];
    };

    const newRace = {
      ...raceData,
      events: rearrangeEvents(raceData.events),
      review: 'approved', // 임시 승인 상태
      author_id: user.uid
    };

    try {
      const image = file ? await uploadImage(file) : '';
      saveMarathon.mutate({ ...newRace, image });
      sendNotification(newRace.name, image, newRace.region, newRace.events);
      setToast(`대회 등록이 완료되었습니다!`);
      navigate(-1);
    } catch (error) {
      setToast('대회 등록 중 오류가 발생했습니다.');
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <div className='p-4'>
      <h2 className='text-center text-xl font-bold mb-10'>대회 등록</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='name'>이름</label>
          <input type='text' id='name' value={formData.name} onChange={handleChange} required className='input input-bordered w-full' />
        </div>
        <div>
          <label htmlFor='date'>일정</label>
          <DatePicker
          id='date'
      selected={formData.date}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      className="input input-bordered w-full"
    />

        </div>
        <div>
          <label htmlFor='region'>지역</label>
          <div className='flex flex-wrap gap-2'>
            {predefinedRegions.map((region) => (
              <button
                key={region}
                type='button'
                onClick={() => setFormData((prev) => ({ ...prev, region }))}
                className={`btn ${formData.region === region ? 'btn-primary btn-sm' : 'btn-outline btn-sm'}`}>
                {region}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor='location'>장소</label>
          <input type='text' id='location' value={formData.location} onChange={handleChange} required className='input input-bordered w-full' />
        </div>
        <div>
          <label htmlFor='customEvent'>이벤트 추가</label>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              id='customEvent'
              value={formData.eventInput}
              onChange={(e) => setFormData((prev) => ({ ...prev, eventInput: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
              placeholder='추가할 이벤트 입력 혹은 버튼 클릭 (예: 5km)'
              className='input input-bordered w-full'
            />
            <button type='button' onClick={handleAddEvent} className='btn btn-primary'>
              추가
            </button>
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          {predefinedEvents.map((event) => (
            <button key={event} type='button' className={`btn ${formData.events.includes(event) ? 'btn-primary btn-sm' : 'btn-sm btn-outline'}`} onClick={() => togglePredefinedEvent(event)}>
              {event}
            </button>
          ))}
        </div>
        <ul className='mt-4 list-disc pl-6'>
          {formData.events.map((event, index) => (
            <li key={index} className='flex items-center bg-gray-100 rounded-full px-4 py-1'>
              <span className='mr-2'>{event}</span>
              <button type='button' onClick={() => handleRemoveEvent(index)} className='text-red-500'>
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div>
          <label htmlFor='registrationPeriod'>모집기간</label>
          <div className='flex gap-2 items-center'>
            <input
              type='date'
              id='startDate'
              value={formData.registrationPeriod.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationPeriod: {
                    ...prev.registrationPeriod,
                    startDate: e.target.value,
                  },
                }))
              }
              className='input input-bordered w-full'
            />
            ~
            <input
              type='date'
              id='endDate'
              value={formData.registrationPeriod.endDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationPeriod: {
                    ...prev.registrationPeriod,
                    endDate: e.target.value,
                  },
                }))
              }
              className='input input-bordered w-full'
            />
          </div>
        </div>
        <div>
          <label htmlFor='price'>금액</label>
          <div className='flex items-center gap-2'>
            <input className='input input-bordered w-full' type='price' id='price' value={formData.price} onChange={handleChange} />
            <span className='font-semibold flex-shrink-0'>원 ~</span>
          </div>
        </div>
        <div>
        <div className='flex justify-between gap-2 py-6'>
          <label htmlFor='isClosed' className=''>
            모집 마감 여부
          </label>
          <input type='checkbox' id='isClosed' checked={formData.isClosed} onChange={() => setFormData((prev) => ({ ...prev, isClosed: !prev.isClosed }))} className='toggle toggle-primary' />
        </div>
          <label htmlFor='url'>URL</label>
          <input className='input input-bordered w-full' type='text' id='url' value={formData.url} onChange={handleChange} required  />
        </div>
        <div>
          <label htmlFor='file'>이미지</label>
          <input type='file' id='file' accept='image/*' onChange={handleChange} />
        </div>
        <button type='submit' className='btn btn-primary text-white p-2 rounded w-full' disabled={isSubmitting}>
          {isSubmitting ? <span className="loading loading-spinner text-white"></span> : '대회 등록'}
        </button>
      </form>
    </div>
  );
};

export default MarathonRegistration;
