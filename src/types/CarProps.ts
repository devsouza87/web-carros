export type CarProps = {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  city: string;
  state: string;
  phone: string;
  description: string;
  ownerId: string;
  images: CarImageProps[];
};

type CarImageProps = {
  name: string;
  uid: string;
  url: string;
};
