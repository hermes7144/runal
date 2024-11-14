export interface RaceProps {
  id?: string;              // 대회 고유 ID
  name: string;            // 대회 이름
  date: string;            // 대회 일정 (예: "2024-11-30")
  location: string;        // 대회 장소 (예: "서울")
  category: string;        // 대회 유형 (예: "마라톤")
  description: string;     // 대회 설명
  status: 'upcoming' | 'ongoing' | 'completed' | 'full';  
  imageUrl?: string;       // 대회 이미지 (선택 사항)
}