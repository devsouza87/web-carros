import { useContext } from "react";
import Container from "../../components/container";
import { AuthContext } from "../../contexts/AuthContext";
import PanelHeader from "../../components/panelHeader";

export function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <PanelHeader />
      <h1>Página Dashboard</h1>
      <p>{user?.name}</p>
    </Container>
  );
}
