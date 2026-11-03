import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export function useOpenMoh711MaternityLinelist(startDate: string, endDate: string, locationUuids: string) {
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
      navigate(`/moh-711-maternity-linelist?${params}`);
    },
    [navigate, startDate, endDate, locationUuids],
  );
}
