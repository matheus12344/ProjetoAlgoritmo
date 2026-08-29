"use client";

import Script from "next/script";

export function DoctoraliaWidget() {
  return (
    <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Avaliações e agendamento
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Veja as avaliações de pacientes e, se preferir, agende diretamente pela Doctoralia.
        </p>
        <div className="flex justify-center">
          <a
            id="zl-url"
            className="zl-url"
            href="https://www.doctoralia.com.br/andre-fiker/psicologo/guarulhos"
            rel="nofollow"
            data-zlw-doctor="andre-fiker"
            data-zlw-type="big_with_calendar"
            data-zlw-opinion="true"
            data-zlw-hide-branding="true"
            data-zlw-saas-only="true"
            data-zlw-a11y-title="Widget de marcação de consultas médicas"
          >
            Marque uma consulta
          </a>
        </div>
      </div>
      <Script id="zl-widget-s" src="https://platform.docplanner.com/js/widget.js" strategy="afterInteractive" />
    </section>
  );
}
