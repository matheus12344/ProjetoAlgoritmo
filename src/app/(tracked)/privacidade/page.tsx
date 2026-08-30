import type { Metadata } from "next";

import { PolicyPage } from "@/components/PolicyPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do site profissional de André Fiker.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Política de Privacidade"
      summary="Esta política explica quais dados técnicos podem ser tratados neste site, para quais finalidades e como você controla as medições opcionais."
    >
      <section>
        <h2 className="text-2xl font-semibold">Responsável e contato</h2>
        <p className="mt-3 leading-relaxed">
          O responsável por este site profissional é André Fiker, psicólogo, CRP
          06/115147. Dúvidas e solicitações sobre privacidade podem ser enviadas
          para <a className="text-blue-700 hover:underline dark:text-blue-300" href="mailto:contato@andrefiker.com.br">contato@andrefiker.com.br</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Dados tratados pelo site</h2>
        <div className="mt-3 space-y-3 leading-relaxed">
          <p>
            O site registra como dado essencial somente sua escolha de privacidade,
            para não solicitar a mesma decisão a cada visita.
          </p>
          <p>
            Com consentimento para medição do site, o Google Analytics 4 pode
            receber dados técnicos e agregados, como página acessada, tipo de
            dispositivo, navegador, origem aproximada da visita e cliques de
            contato.
          </p>
          <p>
            Com consentimento para medição de publicidade, o Google Ads pode medir
            um clique de contato. Quando a URL contém um identificador publicitário
            válido, como <code>gclid</code>, <code>gbraid</code> ou <code>wbraid</code>,
            o site pode associá-lo no servidor a uma referência aleatória no
            formato <code>AF-XXXX-XXXX</code>. Somente essa referência opaca pode ser
            acrescentada ao rascunho de WhatsApp.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">O que não é enviado às ferramentas de medição</h2>
        <p className="mt-3 leading-relaxed">
          O site não envia para Google Analytics ou Google Ads nome, telefone,
          e-mail, conteúdo de WhatsApp, diagnóstico, sintomas, narrativa clínica ou
          outros dados identificáveis de paciente ou lead. Evite incluir informações
          clínicas sensíveis em mensagens iniciais de contato.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Finalidades e escolha</h2>
        <p className="mt-3 leading-relaxed">
          As medições opcionais servem para compreender o funcionamento do site e
          atribuir, de forma agregada, contatos originados por anúncios. Elas se
          baseiam na sua escolha: as tags permanecem bloqueadas antes do
          consentimento, e o contato por WhatsApp ou telefone continua disponível
          se você rejeitar.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Serviços envolvidos</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
          <li>Google Analytics 4, apenas com consentimento de medição do site.</li>
          <li>Google Ads, apenas com consentimento de medição de publicidade.</li>
          <li>
            O Google Tag Manager não é carregado nesta versão do site; o container
            permanece desativado até auditoria específica.
          </li>
          <li>
            A infraestrutura do site e do banco de atribuição processa a referência
            AF e o identificador de clique somente para atribuição.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Retenção</h2>
        <p className="mt-3 leading-relaxed">
          A preferência de consentimento é mantida por até 180 dias. A referência
          AF usa armazenamento de sessão no navegador. O registro de atribuição no
          servidor tem expiração máxima de 90 dias. Dados mantidos pelos provedores
          externos seguem os prazos aplicáveis às configurações autorizadas e podem
          ser eliminados ou bloqueados após revogação, conforme a tecnologia permitir.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">WhatsApp e Doctoralia</h2>
        <p className="mt-3 leading-relaxed">
          WhatsApp e Doctoralia são serviços externos. Eles só recebem dados quando
          você decide abrir seus links e passam a aplicar seus próprios termos e
          políticas. O site não carrega automaticamente o widget da Doctoralia.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Seus controles e direitos</h2>
        <p className="mt-3 leading-relaxed">
          Use “Gerenciar preferências” para aceitar, rejeitar ou revogar as medições
          opcionais. Você também pode solicitar confirmação, acesso, correção ou
          exclusão de dados relacionados a este site pelo e-mail informado acima.
          A revogação impede novos eventos opcionais e remove os armazenamentos
          próprios conhecidos, sem afetar o atendimento.
        </p>
      </section>
    </PolicyPage>
  );
}
