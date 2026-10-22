import { useEffect, useState } from "react";
import { Container } from "../../components/layout/container";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import type { CarProps } from "../../types/Car";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConnection";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatKm } from "../../utils/formatKm";
import { formatPhone } from "../../utils/formatPhone";

export const CarDetail = () => {
  const [slidePerView, setSlidePerView] = useState<number>(2);

  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.data()) {
        navigate("/");
      }

      setCar({
        id: snapshot.id,
        make: snapshot.data()?.make,
        model: snapshot.data()?.model,
        version: snapshot.data()?.version,
        year: snapshot.data()?.year,
        km: snapshot.data()?.km,
        city: snapshot.data()?.city,
        state: snapshot.data()?.state,
        images: snapshot.data()?.images,
        description: snapshot.data()?.description,
        price: snapshot.data()?.price,
        telephone: snapshot.data()?.telephone,
        uid: snapshot.data()?.uid,
      });
    }

    loadCar();
  }, [id]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidePerView(1);
      } else {
        setSlidePerView(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container>
      {car && (
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={slidePerView}
          pagination={{ clickable: true }}
          navigation
          style={
            {
              "--swiper-theme-color": "#ef4444",
            } as React.CSSProperties
          }
        >
          {car.images &&
            Array.isArray(car.images) &&
            car.images.map((image) => (
              <SwiperSlide key={image.name}>
                <img src={image.url} className="w-full h-96 object-cover" />
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full bg-white rounded-md p-6 my-4s">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between text-2xl font-bold">
            <h1 className="uppercase">
              {car.make} <span className="text-red-500">{car.model}</span>
            </h1>
            <h1>{formatCurrency(car.price)}</h1>
          </div>

          <p>{car.version}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade</p>
                <strong>{car.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car.year}</strong>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p>KM</p>
                <strong>{formatKm(car.km)}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição</strong>
          <p className="mb-4">{car.description}</p>

          <strong>Telefone/WhatsApp</strong>
          <p className="mb-6">{formatPhone(car.telephone)}</p>

          <a
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 h-10 text-xl font-medium rounded-md"
            href={`https://wa.me/5527999999999?text=Olá, vi esse ${car.make.toUpperCase()} ${car.model.toUpperCase()} no site Web Carros e fiquei interessado.`}
            target="_blank"
          >
            Conversar com o Vendedor
            <FaWhatsapp size={26} color="#fff" />
          </a>
        </main>
      )}
    </Container>
  );
};
