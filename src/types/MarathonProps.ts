
export interface MarathonProps {
  id?: string;              // 대회 고유 ID
  name: string;            // 대회 이름
  date: string;            // 대회 일정 (예: "2024-11-30")
  region: string;
  location: string;        // 대회 장소 (예: "서울")
  events: string[];        // 대회 유형 (예: "10km, 5km 등")
  price:number;
  startDate: string;  // 접수 시작일 (예: "2024-11-01")
  endDate: string;    // 접수 종료일 (예: "2024-11-15")
  url:string;
  image?: string;       // 대회 이미지 (선택 사항)
  review: string;
  isClosed: boolean;
}