import PlaceCard from '@/components/PlaceCard';

type SectionProps = {
  title: string;
};

export default function Section({ title }: SectionProps) {
  return (
    <section>
      <h2>{title}</h2>

      <div className="flex gap-8">
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
        <PlaceCard />
      </div>
    </section>
  );
}
