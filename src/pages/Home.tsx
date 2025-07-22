import Section from '@/components/Section';

export default function Home() {
  return (
    <div>
      <Section title={'찜한 맛집'} endpoint={'users/places'} />
      <Section title={'맛집 목록'} endpoint={'places'} />
    </div>
  );
}
