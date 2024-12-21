import { useState, useEffect } from 'react';
import { getMarathons, setMarathon } from '../api/database';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MarathonProps } from '../types/MarathonProps';

export default function useMarathons(status: string) {
  const queryClient = useQueryClient();
  
  const [marathons, setMarathons] = useState<MarathonProps[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 데이터가 더 있는지 여부

  const limit = 4; // 한 번에 가져올 데이터 개수

  const fetchMarathons = async (isInitial = false) => {
    if (isLoading || (!isInitial && !hasMore)) return;
  
    setIsLoading(true);
  
    try {
      const { marathons: newMarathons, lastVisible: newLastVisible } = await getMarathons(
        status,
        limit,
        isInitial ? undefined : lastVisible // 첫 호출일 때만 lastVisible을 생략
      );
  
      // 새로운 마라톤 목록 상태 업데이트
      setMarathons((prev) => (isInitial ? newMarathons : [...prev, ...newMarathons]));
  
      // 마지막으로 조회된 문서 상태 업데이트
      setLastVisible(newLastVisible);
  
      // 더 이상 조회할 데이터가 없을 경우 hasMore 상태 업데이트
      setHasMore(newMarathons.length === limit); // 데이터의 수가 limit과 같으면 더 있음
    } catch (error) {
      console.error('Error fetching marathons:', error);
    } finally {
      setIsLoading(false);
    }
  }; // 의존성 배열에 필요한 상태들 추가

  useEffect(() => {
    fetchMarathons(true); // 상태 변경 시 초기 로드
  }, [status]);

  

const saveMarathon = useMutation({
  mutationFn: (race: MarathonProps) => setMarathon(race),
  onSuccess: () => {queryClient.invalidateQueries({queryKey:['marathons']})} 
})

  return { marathons, isLoading, fetchMore: () => fetchMarathons(false), hasMore, saveMarathon};
}



