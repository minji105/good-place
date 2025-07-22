import PlaceCard from '@/components/PlaceCard';
import { useEffect, useState } from 'react';
import { BASE_URL } from '@/constants';
import { type PlaceItem } from '@/types';

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
        const res = await fetch(`${BASE_URL}/${endpoint}`);
        const data = await res.json();
        setList(data.places);
        console.log('fetch data: ', data.places);
      } catch (error) {
        console.log('fetch error: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [endpoint]);

  if (loading) return <p>로딩 중...</p>;

  return (
    !loading && (
      <section className="p-8">
        <h2 className="mb-4 text-4xl">{title}</h2>

        {list.length ? (
          <div className="grid grid-cols-3 justify-center gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {list.map((item, index) => (
              <PlaceCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <div>목록이 비었습니다.</div>
        )}
      </section>
    )
  );
}
