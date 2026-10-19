import type { NewCarDTO } from "../schemas/new-car";

export interface CarProps extends NewCarDTO {
  id: string;
  uid: string;
  images: CarImageProps[] | string;
  isDashboard?: boolean;
  onDelete?: () => void;
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}
