function EventoCard({ evento }) {
  const [imagenOk, setImagenOk] = React.useState(true);
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg flex flex-col">
      {imagenOk ? (
        <img src={evento.imagen} alt={evento.titulo} onError={() => setImagenOk(false)} className="w-full h-44 sm:h-52 object-cover" />
      ) : (
        <div className="h-44 sm:h-52 img-fallback flex items-center justify-center p-6 text-center">
          <p className="font-black text-gray-800">Imagen no disponible</p>
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block w-fit bg-amber-200 text-gray-950 px-3 py-1 rounded-full text-sm font-black">{evento.tipo}</span>
        <h3 className="mt-4 text-xl font-black text-gray-950">{evento.titulo}</h3>
        <p className="mt-2 text-gray-700 leading-6 flex-1">{evento.descripcion}</p>
        <p className="mt-4 text-sm font-bold text-purple-700">{evento.fecha}</p>
      </div>
    </article>
  );
}

function EventosContent() {
  const { data, cargando, error } = useApp();
  if (cargando) return <Loading />;
  if (error) return <ErrorBox mensaje={error} onRetry={() => location.reload()} />;

  return (
    <section className="page-shell fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl responsive-card">
        <p className="font-black text-purple-700">Actividades universitarias</p>
        <h2 className="responsive-subtitle font-black text-gray-950">Eventos</h2>
        <p className="mt-2 text-gray-700">Listado.</p>
      </div>
      <div className="mt-8 responsive-grid">
        {data.eventos.map((evento) => <EventoCard key={evento.id} evento={evento} />)}
      </div>
    </section>
  );
}

function EventosPage() {
  return <PageLayout><EventosContent /></PageLayout>;
}

ReactDOM.render(<EventosPage />, document.getElementById("root"));
