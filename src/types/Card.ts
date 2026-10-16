export interface CardProps {
  id: string;
  make: string;
  model: string;
  description: string;
  year: string;
  km: string;
  city: string;
  state: string;
  price: string | number;
  uid: string;
  images: CardImageProps[] | string;
  isDashboard?: boolean;
  onDelete?: () => void;
}

interface CardImageProps {
  name: string;
  uid: string;
  url: string;
}
