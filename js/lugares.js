function LugarCard({ lugar }) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-lg">
      <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-3">
        <h3 className="text-xl font-black text-gray-950">{lugar.nombre}</h3>
        <span className="text-sm font-black text-green-800 bg-green-100 rounded-full px-3 py-1 h-fit w-fit">Gratis</span>
      </div>
      <p className="mt-3 text-gray-700 leading-6">{lugar.descripcion}</p>
      <p className="mt-4 font-bold text-purple-700">Horario: {lugar.horario}</p>
      <ul className="mt-4 space-y-2 text-gray-700 leading-6">
        {lugar.servicios.map((servicio) => <li key={servicio}>• {servicio}</li>)}
      </ul>
    </article>
  );
}

function LugaresContent() {
  const { data, cargando, error } = useApp();
  if (cargando) return <Loading />;
  if (error) return <ErrorBox mensaje={error} onRetry={() => location.reload()} />;

  return (
    <section className="page-shell fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl responsive-card">
        <p className="font-black text-purple-700">Espacios útiles</p>
        <h2 className="responsive-subtitle font-black text-gray-950">Lugares</h2>
        <p className="mt-2 text-gray-700 leading-6">Sitios recomendados para estudiar, recibir apoyo y trabajar en equipo.</p>
      </div>
      <div className="mt-8 responsive-grid">
        {data.lugares.map((lugar) => <LugarCard key={lugar.id} lugar={lugar} />)}
      </div>
    </section>
  );
}

function LugaresPage() {
  return <PageLayout><LugaresContent /></PageLayout>;
}

ReactDOM.render(<LugaresPage />, document.getElementById("root"));
