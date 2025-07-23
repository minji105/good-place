import { BASE_URL } from '@/constants';

export const fetchPlaces = async ({ endpoint }: { endpoint: string }) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }

  const data = await res.json();
  return data.places;
};
