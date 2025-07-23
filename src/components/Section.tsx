import PlaceCard from '@/components/PlaceCard';
import { useEffect, useState } from 'react';
import { type PlaceItem } from '@/types';
import { fetchPlaces } from '@/api/places';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { sortPlacesByDistance } from '@/utils/loc';

type SectionProps = {
  title: string;
  endpoint: string;
};

export default function Section({ title, endpoint }: SectionProps) {
  const { location, error: locError } = useGeoLocation();
  const [list, setList] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDefaultSort, setIsDefaultSort] = useState<boolean>(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        setError('');
        const places = await fetchPlaces({ endpoint });
        setList(places);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [endpoint]);

  const renderList = isDefaultSort
    ? list
    : sortPlacesByDistance(list, location.lat, location.lon);

  return (
    <section className="p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-4xl">{title}</h2>
        <button
          className={`rounded-md p-3 ${isDefaultSort ? 'bg-gray-100' : 'bg-blue-800'} ${isDefaultSort ? 'text-black' : 'text-white'}`}
          onClick={() => setIsDefaultSort(prev => !prev)}
        >
          거리순
        </button>
      </div>

      {loading ? (
        <div className="bg-gray-100 p-8">
          <p>맛집을 불러오는 중입니다...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 p-8">{error}</div>
      ) : renderList.length ? (
        <div className="grid grid-cols-3 justify-center gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {renderList.map((item, index) => (
            <PlaceCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 p-8">
          <p>목록이 비었습니다.</p>
        </div>
      )}
    </section>
  );
}
