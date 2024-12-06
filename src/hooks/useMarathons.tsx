import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMarathons, setMarathon } from '../api/database';
import { MarathonProps } from '../types/MarathonProps';

export default function useMarathons() {
  const queryClient = useQueryClient();

  const marathonsQuery = useQuery({
    queryKey: ['marathons'],
    queryFn: () => getMarathons()
  });

  const saveMarathon = useMutation({
    mutationFn: (race: MarathonProps) => setMarathon(race),
    onSuccess: () => {queryClient.invalidateQueries({queryKey:['marathons']})} 
  })

  return { marathonsQuery, saveMarathon };
}