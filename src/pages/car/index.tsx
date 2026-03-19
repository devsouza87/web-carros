import { useEffect, useState } from "react";
import Container from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseconnection";

import { Swiper, SwiperSlide } from "swiper/react";

type CarProps = {
  id: string;
  make: string;
  model: string;
  year: string;
  mileage: string;
  price: string | number;
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

export function Car() {
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [sliderPreview, setSliderPreview] = useState(2);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/", { replace: true });
          return;
        }
        setCar({
          id: snapshot.id,
          ...snapshot.data(),
        } as CarProps);
      });
    }

    loadCar();
  }, [id]);

  useEffect(() => {
    function handleRecase() {
      if (window.innerWidth < 720) {
        setSliderPreview(1);
      } else {
        setSliderPreview(2);
      }
    }

    handleRecase();

    window.addEventListener("resize", handleRecase);

    return () => {
      window.removeEventListener("resize", handleRecase);
    };
  }, []);

  return (
    <>
      {car && (
        <Swiper
          slidesPerView={sliderPreview}
          pagination={{ clickable: true }}
          navigation
          style={{
            "--swiper-navigation-color": "#fb2c36",
            "--swiper-pagination-color": "#fb2c36",
            "--swiper-pagination-bullet-inactive-color": "#ff6467",
            "--swiper-pagination-bullet-inactive-opacity": "0.5",
          }}
        >
          {car?.images.map((image) => {
            return (
              <SwiperSlide key={image.name}>
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-96 object-cover"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      <Container>
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h1>{car?.make}</h1>
              <h2 className="font-bold text-3xl">{car?.model}</h2>
            </div>
            <span className="font-bold text-xl">R$ {car?.price}</span>
          </div>

          <div className="w-full flex gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>Km</p>
                <strong>{car?.mileage}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição</strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone/Whatsapp</strong>
          <p>{car?.phone}</p>

          <a
            href={`https://api.whatsapp.com/send?phone=${car?.phone}&text=Olá vi esse ${car?.make} no site Web Carros e fiquei interessado.`}
            target="_blank"
            className="w-full bg-green-500 text-white flex items-center justify-center gap-2 my-6 h-11 rounded-lg sm:text-xl font-medium cursor-pointer"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      </Container>
    </>
  );
}
