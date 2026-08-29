import { program } from "../program-data";

/**
 * Texto do aviso de privacidade, separado da marcação para poder ser revisado e
 * editado sem mexer em componentes.
 *
 * Escrito em linguagem simples e descritiva: diz o que o sistema realmente faz.
 * Não afirma conformidade com nenhuma norma nem promete direitos além dos que
 * de fato são exercíveis pelos canais listados aqui.
 */
export const privacy = {
  title: "Aviso de privacidade",
  subtitle: `Lista de interesse do programa ${program.identity.shortName}`,
  updatedLabel: "Última atualização",
  updated: "1º de agosto de 2026",
  backLabel: "Voltar para a página do programa",
  backHref: "/estresse-reatividade",

  intro:
    "Este aviso explica o que acontece com os dados que você envia ao entrar na lista de interesse deste programa. Ele vale apenas para esta página e para o formulário de pré-inscrição.",

  sections: [
    {
      title: "Quais dados são coletados",
      body: "Somente dados de contato, informados por você no formulário:",
      list: [
        "nome;",
        "e-mail;",
        "WhatsApp (opcional — o formulário funciona sem ele);",
        "preferência de formato (online, presencial ou tanto faz);",
        "o registro de que você autorizou o contato, com data e hora;",
        "a data e hora do envio, e a data em que você for contatado.",
      ],
    },
    {
      title: "Quais dados nunca são coletados",
      body: "Este formulário não pergunta e não armazena informações clínicas ou de saúde. Não há campo de texto livre onde esse tipo de informação possa ser registrada. Especificamente, não coletamos:",
      list: [
        "sintomas, queixas ou relatos do que você está sentindo;",
        "diagnósticos;",
        "medicamentos;",
        "histórico de tratamento;",
        "situações de crise;",
        "qualquer narrativa pessoal ou clínica.",
      ],
      note: "Você não precisa explicar seu motivo para se interessar pelo programa, e pedimos que não escreva esse tipo de informação nos campos disponíveis.",
    },
    {
      title: "Para que os dados são usados",
      body: "Exclusivamente para entrar em contato com você sobre este programa — informar quando a primeira turma tiver data, formato, valor e condições definidos, e responder ao seu interesse.",
      note: "Os dados não são usados para lista de e-mails, newsletter, propaganda, envio automático de mensagens ou qualquer contato sobre outros assuntos. Não são vendidos nem compartilhados com terceiros para fins comerciais.",
    },
    {
      title: "Quem tem acesso",
      body: "Apenas André Fiker. Os registros ficam em um banco de dados privado, sem leitura pública: não é possível consultá-los pela internet nem a partir do navegador de quem visita o site. O contato é feito manualmente, um a um.",
    },
    {
      title: "Por quanto tempo os dados ficam guardados",
      body: "Até 24 meses após o último contato sobre o programa, ou até você pedir a exclusão — o que acontecer primeiro. Depois disso o registro é apagado.",
    },
    {
      title: "Como pedir acesso, correção ou exclusão",
      body: `Escreva para ${program.contact.email} pedindo para ver, corrigir ou apagar seus dados. Não é preciso justificar o pedido. A exclusão é feita manualmente e você recebe uma confirmação quando estiver concluída.`,
    },
    {
      title: "Contato pelo WhatsApp",
      body: "Se você preferir falar pelo WhatsApp, essa conversa acontece dentro do WhatsApp e é processada por ele, segundo as políticas do próprio aplicativo — este site não tem acesso a ela e não a armazena. Mensagens enviadas por lá ficam no aparelho e na conta de quem conversa.",
      note: "O botão de WhatsApp não envia nada para este site: ele apenas abre o aplicativo com uma mensagem já escrita, que você pode editar ou apagar antes de enviar.",
    },
    {
      title: "Pré-inscrição não é inscrição confirmada",
      body: "Entrar na lista de interesse significa pedir informações. Não reserva vaga, não confirma inscrição, não gera cobrança e não cria compromisso para nenhuma das partes. A inscrição só existirá quando as condições da turma estiverem definidas e você confirmar a participação.",
    },
    {
      title: "Este canal não é para urgências",
      body: `${program.safety.text} ${program.safety.cvv}. ${program.safety.emergency}.`,
    },
  ],

  controller: {
    title: "Responsável pelos dados",
    name: program.facilitator.name,
    role: `${program.footer.role} — ${program.footer.credentials}`,
    location: program.facilitator.location,
    email: program.contact.email,
  },
};
