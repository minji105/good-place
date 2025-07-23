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

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        setError('');
        const places = await fetchPlaces({ endpoint });
        setList(sortPlacesByDistance(places, location.lat, location.lon));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [endpoint]);

  let content;

  if (loading) {
    content = (
      <div className="bg-gray-100 p-8">
        <p>맛집을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    content = <div className="bg-red-100 p-8">{error}</div>;
  }

  if (list.length > 0) {
    content = (
      <div className="grid grid-cols-3 justify-center gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        {list.map((item, index) => (
          <PlaceCard key={index} item={item} />
        ))}
      </div>
    );
  }

  if (list.length === 0 && !loading && !error) {
    content = (
      <div className="bg-gray-100 p-8">
        <p>목록이 비었습니다.</p>
      </div>
    );
  }

  return (
    <section className="p-8">
      <h2 className="mb-4 text-4xl">{title}</h2>
      {content}
    </section>
  );
}
