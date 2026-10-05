import { Container } from "../../components/container";

export const Home = () => {
  return (
    <Container>
      <section className="flex justify-center items-center gap-2 bg-white w-full max-w-3xl rounded-lg p-4 mx-auto mb-6">
        <input
          type="text"
          placeholder="Digite o nome do carro..."
          className="w-full border rounded-lg h-9 px-3 outline-none"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg">
          <img
            className="w-full rounded-lg mb-2 max-h-72"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202610/20261005/land-rover-discovery-sport-2.0-p250-turbo-flex-rdynamic-se-automatico-wmimagem10401883163.jpg?s=fill&w=552&h=414&q=60"
            alt="LAND ROVER DISCOVERY SPORT"
          />

          <h1 className="font-bold my-2 px-2">LAND ROVER DISCOVERY SPORT</h1>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">
              Ano: 2020/2021 | 6.390 km
            </span>
            <strong className="text-black font-medium text-xl">
              R$ 345.000,00
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">Cariacica - ES </span>
          </div>
        </section>
      </main>
    </Container>
  );
};
