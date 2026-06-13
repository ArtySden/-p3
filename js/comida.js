function ComidaCard({ comida, onSeleccionar }) {
  return (
    <article className="card-hover bg-white border border-gray-200 rounded-3xl p-5 shadow-lg flex flex-col">
      <p className="text-sm font-black text-purple-700">{comida.categoria}</p>
      <h3 className="mt-1 text-xl font-black text-gray-950">{comida.nombre}</h3>
      <p className="mt-2 text-gray-700 leading-6 flex-1">{comida.descripcion}</p>
      <p className="mt-3 font-black text-amber-700">{comida.oferta}</p>
      <p className="mt-2 text-sm text-gray-500 leading-6">{comida.direccion}</p>
      <button onClick={() => onSeleccionar(comida)} className="focus-ring touch-target mt-5 bg-purple-700 hover:bg-purple-800 text-white px-5 py-3 rounded-xl font-black transition mobile-full sm:w-auto" aria-label={`Ver detalle de ${comida.nombre}`}>
        Ver detalle
      </button>
    </article>
  );
}

function ModalComida({ comida, onCerrar }) {
  if (!comida) return null;
  const mapa = `https://maps.google.com/maps?q=${comida.latitud},${comida.longitud}&z=16&output=embed`;

  return (
    <div className="fixed inset-0 bg-black/55 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 fade-in" role="dialog" aria-modal="true" aria-labelledby="tituloModalComida">
      <div className="modal-panel bg-white rounded-[32px] shadow-2xl p-4 sm:p-6 safe-bottom">
        <div className="flex justify-between gap-4 items-start">
          <div className="min-w-0">
            <p className="font-black text-purple-700">{comida.categoria}</p>
            <h2 id="tituloModalComida" className="text-2xl sm:text-3xl font-black text-gray-950 break-words">{comida.nombre}</h2>
            <p className="mt-2 text-gray-700 leading-6">{comida.descripcion}</p>
          </div>
          <button onClick={onCerrar} className="focus-ring touch-target shrink-0 bg-gray-200 hover:bg-gray-300 w-11 h-11 rounded-full font-black" aria-label="Cerrar detalle de comida">X</button>
        </div>
        <div className="mt-6 two-column-grid">
          <div className="space-y-4">
            {[["Oferta", comida.oferta], ["Dirección", comida.direccion], ["Horario", comida.horario], ["Referencia", comida.referencia], ["Teléfono", comida.telefono]].map(([titulo, valor]) => (
              <div key={titulo} className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <h3 className="font-black text-gray-950">{titulo}</h3>
                <p className="mt-1 text-gray-700 break-words">{valor}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow map-frame">
            <iframe title={`Mapa de ${comida.nombre}`} src={mapa} width="100%" height="100%" className="block min-h-[16rem] sm:min-h-[22.5rem]" style={{ border: 0 }} loading="lazy" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComidaContent() {
  const { data, cargando, error } = useApp();
  const [busqueda, setBusqueda] = React.useState("");
  const [seleccionada, setSeleccionada] = React.useState(null);

  if (cargando) return <Loading />;
  if (error) return <ErrorBox mensaje={error} onRetry={() => location.reload()} />;

  const comidas = data.comidas.filter((comida) => {
    const texto = `${comida.nombre} ${comida.descripcion} ${comida.oferta} ${comida.categoria} ${comida.direccion}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase().trim());
  });

  return (
    <section className="page-shell fade-in">
      <div className="bg-white rounded-[32px] shadow-2xl responsive-card">
        <p className="font-black text-purple-700">Buscador</p>
        <h2 className="responsive-subtitle font-black text-gray-950">Comida cerca del campus</h2>
        <p className="mt-2 text-gray-700 leading-6">Busca por nombre, categoría, oferta o dirección. Cada opción tiene detalle y mapa.</p>
        <label htmlFor="buscarComida" className="sr-only">Buscar comida</label>
        <input id="buscarComida" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="focus-ring mt-6 w-full border border-gray-300 rounded-2xl px-5 py-4" placeholder="Busca pizza, menú, café, sushi, pollo..." />
      </div>

      <div className="mt-8 responsive-grid">
        {comidas.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow text-center" role="status">
            <h3 className="text-xl font-black">No se encontró esa comida</h3>
            <p className="mt-2 text-gray-600">Prueba con pizza, café, menú, sushi, hamburguesa, pollo, chifa o postres.</p>
          </div>
        ) : comidas.map((comida) => <ComidaCard key={comida.id} comida={comida} onSeleccionar={setSeleccionada} />)}
      </div>
      <ModalComida comida={seleccionada} onCerrar={() => setSeleccionada(null)} />
    </section>
  );
}

function ComidaPage() {
  return <PageLayout><ComidaContent /></PageLayout>;
}

ReactDOM.render(<ComidaPage />, document.getElementById("root"));
