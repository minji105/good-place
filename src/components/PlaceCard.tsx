import { BASE_URL } from '@/constants';
import { type PlaceItem } from '@/types';

export default function PlaceCard({ item }: { item: PlaceItem }) {
  return (
    <div className="aspect-[0.8]">
      <img
        className="h-full w-full object-cover"
        src={`${BASE_URL}/${item.image.src}`}
        alt={item.image.alt}
      />
      <p>{item.title}</p>
    </div>
  );
}
