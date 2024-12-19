import React, { memo, useState } from 'react';
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
import { FaRegCalendarAlt } from '@react-icons/all-files/fa/FaRegCalendarAlt';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

const MemoizedFaRegCalendarAlt = memo(FaRegCalendarAlt);

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
    startDate: '',
    endDate: '',
    price: 0,
    url: '',
    status: 'upcoming',
    file: null as File | null,
    isClosed: false, // 모집 마감 여부
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const isMobile = window.innerWidth <= 768;

  // 폼 데이터 업데이트 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, files } = e.target;

    if (id === 'file') {
      setFormData((prev) => ({ ...prev, file: files?.[0] || null }));
    } else if (id === 'price') {
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, price: Number(value) }));
      }
    } else {
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
      author_id: user.uid,
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

  function CustomInput({ value, onClick }) {
    return (
      <div className='relative flex items-center w-full' onClick={onClick}>
        <input value={value} readOnly className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        <span className='absolute right-3 cursor-pointer' onClick={onClick}>
          <MemoizedFaRegCalendarAlt />
        </span>
      </div>
    );
  }

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-center text-xl font-bold mb-10'>대회 등록</h2>
      <form onSubmit={handleSubmit} className='space-y-2'>
        <div className='form-control'>
          <label className='label' htmlFor='name'>
            이름
          </label>
          <input type='text' id='name' value={formData.name} onChange={handleChange} required 
          className="input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='date'>
            일정
          </label>
          {isMobile ? (
            <input type='date' id='date' value={formData.date} onChange={handleChange} required className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
          ) : (
            <DatePicker selected={formData.date} onChange={(date) => setFormData({ ...formData, date: date })} dateFormat='yyyy-MM-dd' customInput={<CustomInput />} />
          )}
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='region'>
            지역
          </label>
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
        <div className='form-control'>
          <label className='label' htmlFor='location'>
            장소
          </label>
          <input type='text' id='location' value={formData.location} onChange={handleChange} required className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='customEvent'>
            이벤트 추가
          </label>
          <div className='flex items-center gap-2'>
            <input
              type='text'
              id='customEvent'
              value={formData.eventInput}
              onChange={(e) => setFormData((prev) => ({ ...prev, eventInput: e.target.value }))}
              onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
              placeholder='추가할 이벤트 입력 (예: 5km)'
              className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
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
        <ul className='flex mt-4 list-disc gap-1'>
          {formData.events.map((event, index) => (
            <li key={index} className='flex items-center bg-gray-100 rounded-full px-4 py-1'>
              <span className='mr-2'>{event}</span>
              <button type='button' onClick={() => handleRemoveEvent(index)} className='text-red-500 font-semibold text-sm'>
                ✕
              </button>
            </li>
          ))}
        </ul>
        <div className='form-control'>
          <label className='label'>모집기간</label>
          <div className=' flex items-center  gap-2'>
            {isMobile ? (
              <input type='date' id='startDate' value={formData.startDate} onChange={handleChange} required className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            ) : (
              <DatePicker
                className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                selected={formData.startDate}
                onChange={(startDate) => setFormData((prev) => ({ ...prev, startDate }))}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                dateFormat='yyyy-MM-dd'
                customInput={<CustomInput />}
              />
            )}
            <span className='px-2'>~</span>
            {isMobile ? (
              <input type='date' id='endDate' value={formData.endDate} onChange={handleChange} required className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' />
            ) : (
              <DatePicker
                className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500'
                selected={formData.endDate}
                onChange={(endDate) => setFormData((prev) => ({ ...prev, endDate }))}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate}
                dateFormat='yyyy-MM-dd'
                customInput={<CustomInput />}
              />
            )}
          </div>
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='price'>
            금액
          </label>
          <div className='flex items-center gap-2'>
            <input className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' type='price' id='price' value={formData.price} onChange={handleChange} />
            <span className='font-semibold flex-shrink-0'>원 ~</span>
          </div>
        </div>
        <div className='flex justify-between items-center gap-2 py-6 w-full'>
          <label className='label' htmlFor='isClosed'>
            모집 마감 여부
          </label>
          <input type='checkbox' id='isClosed' checked={formData.isClosed} onChange={() => setFormData((prev) => ({ ...prev, isClosed: !prev.isClosed }))} className='toggle toggle-primary' />
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='url'>
            URL
          </label>
          <input className='input input-bordered  w-full py-2 px-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500' type='text' id='url' value={formData.url} onChange={handleChange} required />
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='file'>
            이미지
          </label>
          <input className='file-input w-full max-w-xs' type='file' id='file' accept='image/*' onChange={handleChange} />
        </div>
        <button type='submit' className='btn btn-primary text-white p-2 rounded w-full' disabled={isSubmitting}>
          {isSubmitting ? <span className='loading loading-spinner text-white'></span> : '대회 등록'}
        </button>
      </form>
    </div>
  );
};

export default MarathonRegistration;
