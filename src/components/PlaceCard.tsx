import { BASE_URL } from '@/constants';

type Image = {
  src: string;
  alt: string;
};

type item = {
  description: string;
  image: Image;
  lat: number;
  lon: number;
  title: string;
};

export default function PlaceCard({ item }: { item: item }) {
  return (
    <div className="aspect-[0.8] bg-stone-200">
      <img
        className="h-full w-full object-cover"
        src={`${BASE_URL}/${item.image.src}`}
        alt={item.image.alt}
      />
    </div>
  );
}
