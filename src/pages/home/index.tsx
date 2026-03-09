import Container from "../../components/container";

export function Home() {
  return (
    <Container>
      <section className="w-full max-w-3xl flex justify-center items-center gap-2 bg-white rounded-lg mx-auto p-4 mb-6">
        <input
          type="text"
          placeholder="Digite o nome do carro"
          className="w-full border rounded-lg h-9 px-3 outline-none"
        />
        <button className="bg-red-500 text-white text-lg font-medium h-9 px-8 rounded-lg">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center text-2xl mb-4">
        Carros novos e usados em todo o Brasil!
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg: lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg">
          <div className="w-full aspect-video rounded-t-lg overflow-hidden bg-gray-100 mb-1">
            <img
              src="https://www.estadao.com.br/resizer/v2/FVLLMAPV6RHNFKT7K7DJMF4NGQ.jpg?quality=80&auth=31fbe6ee49fca2de50cf1a504380bd6f08b0b269b819dcbe0f84ae5d8ddd1276&width=1262&height=710&focal=1083,503"
              alt=""
              className="w-full h-full object-contain transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>

          <h1 className="font-bold mb-2 px-2">BYD Dolphin</h1>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">
              Ano: 2024/2025 | 15.000 km
            </span>
            <strong className="text-black text-xl font-medium">
              R$ 90.000,00
            </strong>
          </div>

          <div className="w-full h-px bg-slate-300 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-shadow-zinc-700">Cariacica - ES</span>
          </div>
        </section>
      </main>
    </Container>
  );
}
