import { useState, useEffect } from 'react';

type Location = {
  lat: number;
  lon: number;
};

export const useGeoLocation = () => {
  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      error => {
        setError(error.message);
      },
    );
  }, []);

  return { location, error };
};
