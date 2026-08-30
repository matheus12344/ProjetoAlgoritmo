import type { Metadata } from "next";

import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de cookies e armazenamento local do site profissional de André Fiker.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <PolicyPage
      title="Política de Cookies"
      summary="Cookies e armazenamentos opcionais ficam bloqueados até você escolher. Esta página descreve o que pode ser usado e como alterar a decisão."
    >
      <section>
        <h2 className="text-2xl font-semibold">Estado inicial</h2>
        <p className="mt-3 leading-relaxed">
          Na primeira visita, Google Analytics 4, Google Ads e Google Tag Manager não
          são carregados. O widget da Doctoralia também não é carregado. Nenhum
          identificador publicitário é capturado antes do consentimento correspondente.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Armazenamento essencial</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="py-3 pr-4">Nome</th>
                <th className="py-3 pr-4">Tipo</th>
                <th className="py-3 pr-4">Finalidade</th>
                <th className="py-3">Prazo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200 align-top dark:border-slate-800">
                <td className="py-3 pr-4"><code>andrefiker_consent_v1</code></td>
                <td className="py-3 pr-4">localStorage</td>
                <td className="py-3 pr-4">Guardar sua escolha de privacidade.</td>
                <td className="py-3">Até 180 dias ou até nova escolha.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Medição do site</h2>
        <p className="mt-3 leading-relaxed">
          Se autorizada, a tag do Google Analytics 4 pode criar cookies como
          <code> _ga</code> e <code>_ga_*</code> para distinguir visitas e produzir
          métricas agregadas. Esses cookies não são criados pelo site antes da sua
          escolha e são removidos dos domínios próprios conhecidos quando a
          autorização é revogada.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Medição de publicidade e referência AF</h2>
        <p className="mt-3 leading-relaxed">
          Se autorizada, a tag do Google Ads pode usar cookies <code>_gcl_*</code>
          para atribuição. A referência opaca <code>AF-XXXX-XXXX</code> pode ser
          guardada em <code>sessionStorage</code> sob o nome
          <code> andrefiker_ad_reference_v1</code>. Ela dura apenas a sessão do
          navegador e respeita a validade máxima de 90 dias informada pelo servidor.
          O identificador de clique original não é colocado na mensagem de WhatsApp.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Google Tag Manager e Doctoralia</h2>
        <p className="mt-3 leading-relaxed">
          O Google Tag Manager não é carregado nesta baseline. A Doctoralia aparece
          somente como link estático; seu script e widget não são carregados pelo
          site. Ao abrir um serviço externo, a política desse serviço passa a valer.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Como alterar ou revogar</h2>
        <p className="mt-3 leading-relaxed">
          Selecione “Gerenciar preferências” no rodapé ou no controle “Privacidade”
          exibido após sua escolha. Rejeitar as categorias opcionais impede novos
          eventos, remove a referência AF do navegador e tenta eliminar os cookies
          próprios conhecidos de Analytics e Ads.
        </p>
      </section>
    </PolicyPage>
  );
}
