export function DoctoraliaWidget() {
  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Perfil e agenda externa
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Se preferir consultar horários em uma plataforma externa, acesse o perfil profissional.
        </p>
        <div className="flex justify-center">
          <a
            className="inline-flex rounded-full border border-blue-600 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-800"
            href="https://www.doctoralia.com.br/andre-fiker/psicologo/guarulhos"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            Ver perfil e disponibilidade no Doctoralia
          </a>
        </div>
      </div>
    </section>
  );
}
