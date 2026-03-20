import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseconnection";
import Container from "../../../components/container";
import PanelHeader from "../../../components/panelHeader";
import CarForm from "../../../components/carForm";
import type { CarProps } from "../../../types/CarProps";

export function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;

      const docRef = doc(db, "cars", id);
      try {
        const snapshot = await getDoc(docRef);
        if (!snapshot.exists()) {
          navigate("/dashboard");
          return;
        }

        setCar({
          id: snapshot.id,
          ...snapshot.data(),
        } as CarProps);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar carro:", error);
        navigate("/dashboard");
      }
    }

    loadCar();
  }, [id, navigate]);

  if (loading) {
    return (
      <Container>
        <div className="w-full h-screen flex items-center justify-center">
          <h1 className="text-xl font-bold">Carregando dados do veículo...</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <PanelHeader />
      <CarForm car={car as CarProps} />
    </Container>
  );
}
