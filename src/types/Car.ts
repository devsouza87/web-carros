export type CreateCarProps = {
  make: string;
  model: string;
  version: string;
  name: string;
  year: string;
  km: string;
  price: string;
  city: string;
  state: string;
  telephone: string;
  description: string;
  images: CarImageProps[];
  owner: string | null | undefined;
  uid: string | undefined;
  createdAt: Date;
};

export interface CardProps {
  id: string;
  name: string;
  version: string;
  year: string;
  km: string;
  price: string;
  city: string;
  state: string;
  images: CarImageProps[] | string;
  isDashboard?: boolean;
  onDelete?: () => void;
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
