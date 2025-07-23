import PlaceCard from '@/components/PlaceCard';
import { useEffect, useState } from 'react';
import { type PlaceItem } from '@/types';
import { fetchPlaces } from '@/api/places';

type SectionProps = {
  title: string;
  endpoint: string;
};

export default function Section({ title, endpoint }: SectionProps) {
  const [list, setList] = useState<PlaceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const places = await fetchPlaces({ endpoint });
        setList(places);
      } catch (error) {
        console.log('fetch error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [endpoint]);

  return (
    <section className="p-8">
      <h2 className="mb-4 text-4xl">{title}</h2>

      {loading ? (
        <div className="bg-gray-100 p-8">
          <p>맛집을 불러오는 중입니다...</p>
        </div>
      ) : (
        <>
          {list.length ? (
            <div className="grid grid-cols-3 justify-center gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {list.map((item, index) => (
                <PlaceCard key={index} item={item} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 p-8">목록이 비었습니다.</div>
          )}
        </>
      )}
    </section>
  );
}
