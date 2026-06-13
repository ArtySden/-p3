function HomeContent() {
  const { usuario, setUsuario } = useApp();
  const [nombre, setNombre] = React.useState(usuario || "");
  const [mensaje, setMensaje] = React.useState("");

  const secciones = [
    { titulo: "Tareas", texto: "Registra cursos, fechas, documentos y estados.", href: "tareas.html" },
    { titulo: "Comida", texto: "Busca lugares económicos y revisa su mapa.", href: "comida.html" },
    { titulo: "Eventos", texto: "Consulta actividades académicas, sociales y deportivas.", href: "eventos.html" },
    { titulo: "Lugares", texto: "Encuentra espacios útiles dentro o cerca del campus.", href: "lugares.html" },
    { titulo: "Tips", texto: "Mejora productividad, memoria y bienestar.", href: "tips.html" },
    { titulo: "Contacto", texto: "Envía tus consultas.", href: "contactanos.html" }
  ];

  function guardarUsuario(evento) {
    evento.preventDefault();
    if (!validarTexto(nombre, 3)) {
      setMensaje("Escribe un nombre de usuario válido de al menos 3 caracteres.");
      return;
    }
    setUsuario(nombre);
    setMensaje("Usuario guardado correctamente.");
  }

  return (
    <section className="page-shell fade-in">
      <div className="hero-grid">
        <div className="bg-white rounded-[32px] shadow-2xl responsive-card slide-up">
          <p className="font-black text-purple-700">Proyecto universitario</p>
          <h2 className="mt-3 responsive-title font-black text-gray-950">
            Tu vida universitaria organizada en un solo sitio.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-gray-700 leading-7">
            UniGo! Una excelente página para ti.
          </p>

          <form onSubmit={guardarUsuario} className="mt-8 bg-purple-50 border border-purple-200 rounded-3xl p-4 sm:p-5" noValidate>
            <label htmlFor="usuario" className="block font-bold text-gray-900">Nombre de usuario</label>
            <div className="mt-3 flex gap-3 mobile-stack sm:flex-row">
              <input
                id="usuario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="focus-ring min-w-0 flex-1 border border-purple-300 rounded-xl px-4 py-3 outline-none"
                placeholder="Ejemplo: estudiante01"
                aria-describedby="mensajeUsuario"
              />
              <button className="focus-ring touch-target bg-purple-700 hover:bg-purple-800 text-white rounded-xl px-6 py-3 font-black transition mobile-full sm:w-auto">
                Guardar
              </button>
            </div>
            {mensaje && <p id="mensajeUsuario" className="mt-3 text-sm font-semibold text-purple-900" aria-live="polite">{mensaje}</p>}
          </form>
        </div>

        <div className="bg-gray-950 text-white rounded-[32px] shadow-2xl responsive-card slide-up">
          <h3 className="text-2xl sm:text-3xl font-black">Funcionalidades principales</h3>
          <ul className="mt-5 space-y-3 text-gray-100 leading-7">
            <li>• Guarda todos tus trabajos subidos.</li>
            <li>• Cualquier dato se almacena.</li>
            <li>• Tiene formularios.</li>
            <li>• Diseño adaptable para celular, tablet y laptop.</li>
            <li>• Accesible y con navegación tranquila.</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 responsive-grid">
        {secciones.map((seccion) => (
          <a key={seccion.href} href={seccion.href} className="card-hover focus-ring block bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-lg">
            <h3 className="text-xl font-black text-gray-950">{seccion.titulo}</h3>
            <p className="mt-2 text-gray-700 leading-6">{seccion.texto}</p>
            <span className="inline-flex mt-4 min-h-11 items-center font-black text-purple-700">Entrar →</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  return <PageLayout><HomeContent /></PageLayout>;
}

ReactDOM.render(<HomePage />, document.getElementById("root"));
