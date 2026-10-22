export type CreateCarProps = {
  make: string;
  model: string;
  version: string;
  name: string;
  year: string;
  km: number;
  price: number;
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
  km: number;
  price: number;
  city: string;
  state: string;
  images: CarImageProps[] | string;
  isDashboard?: boolean;
  onDelete?: () => void;
}

export interface CarProps {
  id: string;
  make: string;
  model: string;
  version: string;
  year: string;
  km: number;
  city: string;
  state: string;
  images: string;
  description: string;
  price: number;
  telephone: string;
  uid: string;
}

export interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
