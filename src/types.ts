export interface Image {
  src: string;
  alt: string;
}

export interface PlaceItem {
  description: string;
  image: Image;
  lat: number;
  lon: number;
  title: string;
}
