export type RaceStatus = 'upcoming' | 'open' | 'close';

export interface RegistrationPeriod {
  startDate: string;  // 접수 시작일 (예: "2024-11-01")
  endDate: string;    // 접수 종료일 (예: "2024-11-15")
}

export interface RaceProps {
  id?: string;              // 대회 고유 ID
  name: string;            // 대회 이름
  date: string;            // 대회 일정 (예: "2024-11-30")
  location: string;        // 대회 장소 (예: "서울")
  category: string;        // 대회 유형 (예: "마라톤")
  distance:string;         // 10km, 5km 등
  status: RaceStatus; // 대회 모집 상태
  registrationPeriod: RegistrationPeriod; // 접수 기간
  url:string;
  image?: string;       // 대회 이미지 (선택 사항)
}