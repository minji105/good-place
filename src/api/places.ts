import { BASE_URL } from '@/constants';

export const fetchPlaces = async ({ endpoint }: { endpoint: string }) => {
  const res = await fetch(`${BASE_URL}/${endpoint}`);

  if (!res.ok) {
    switch (res.status) {
      case 404:
        throw new Error('요청하신 리소스를 찾을 수 없습니다. (404)');
      case 500:
        throw new Error(
          '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        );
      default:
        throw new Error(`요청 실패: ${res.status}`);
    }
  }

  const data = await res.json();
  return data.places;
};
