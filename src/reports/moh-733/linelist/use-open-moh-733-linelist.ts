import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOpenMoh733Linelist(startDate: string, endDate: string, locationUuids: string) {
  const navigate = useNavigate();

  return useCallback(
    (indicator: string) => {
      const params = new URLSearchParams({
        startDate,
        endDate,
        locationUuids,
        indicator,
      });
      navigate(`/moh-733-linelist?${params}`);
    },
    [navigate, startDate, endDate, locationUuids],
  );
}
