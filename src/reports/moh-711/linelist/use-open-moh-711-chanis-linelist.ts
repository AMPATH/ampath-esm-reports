import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOpenMoh711ChanisLinelist(startDate: string, endDate: string, locationUuids: string) {
  const navigate = useNavigate();

  return useCallback(
    (indicator: string) => {
      const params = new URLSearchParams({
        startDate,
        endDate,
        locationUuids,
        indicator,
        from: 'moh-711',
      });
      navigate(`/moh-711-chanis-linelist?${params}`);
    },
    [navigate, startDate, endDate, locationUuids],
  );
}
