import { FiTrash2, FiUpload } from "react-icons/fi";
import type { ImageItemProps } from "../../pages/dashboard/new";
import {
  useContext,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";

type UploadCarProps = {
  carImages: ImageItemProps[];
  setCarImages: Dispatch<SetStateAction<ImageItemProps[]>>;
};

export const UploadCar = ({ carImages, setCarImages }: UploadCarProps) => {
  const { user } = useContext(AuthContext);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      if (
        image.type === "image/jpeg" ||
        image.type === "image/jpg" ||
        image.type === "image/png"
      ) {
        await handleUpload(image);
      } else {
        alert("Envie um arquivo JPG ou PNG");
      }
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;

    const currentUid = user.uid;
    const uidImage = uuidV4();

    const imageItem: ImageItemProps = {
      image,
      name: uidImage,
      uid: currentUid,
      previewUrl: URL.createObjectURL(image),
    };

    setCarImages((state) => [...state, imageItem]);
  }

  async function handleDeleteImage(image: ImageItemProps) {
    setCarImages((state) => state.filter((car) => car.name !== image.name));
  }

  return (
    <div className="w-full bg-white p-3 rounded-md flex flex-col sm:flex-row items-center gap-2 mb-2">
      <button
        type="button"
        className="border w-48 rounded-md flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48 relative overflow-hidden"
      >
        <div className="absolute cursor-pointer flex items-center justify-center pointer-events-none">
          <FiUpload size={28} color="#000" />
        </div>
        <div className="absolute inset-0 opacity-0 cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="w-full h-full cursor-pointer"
            onChange={handleFile}
          />
        </div>
      </button>

      {carImages.length > 0 && (
        <div className="w-full h-32 flex items-center justify-center gap-1 overflow-x-auto">
          {carImages.map((item) => (
            <div
              key={item.name}
              className="w-full h-32 flex items-center justify-center relative"
            >
              <button
                type="button"
                className="absolute z-10 cursor-pointer bg-black/50 p-2 rounded-full"
                onClick={() => handleDeleteImage(item)}
              >
                <FiTrash2 size={20} color="#fff" />
              </button>
              <img
                src={item.previewUrl}
                className="rounded-md w-full h-32 object-cover"
                alt="foto do carro"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
