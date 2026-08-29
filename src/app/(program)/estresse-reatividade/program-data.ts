export type CurriculumWeek = {
  title: string;
  description: string;
};

export type Faq = {
  question: string;
  answer: string;
};

// Edite aqui todos os textos e detalhes operacionais do programa.
export const program = {
  identity: {
    shortName: "Estresse & Reatividade",
    title: "Programa de 8 semanas para aprender a lidar com estresse e reatividade",
    heroTitle: "Aprenda a lidar melhor com estresse e reatividade",
    heroSubtitle:
      "Um programa prático de oito semanas para reconhecer respostas automáticas, criar uma pausa e agir com mais clareza em situações difíceis.",
    methodology:
      "Baseado em práticas de mindfulness e princípios da psicologia comportamental.",
  },
  navigation: {
    ariaLabel: "Navegação principal",
    homeAriaLabel: "Voltar ao início",
    openMenuLabel: "Abrir menu",
    closeMenuLabel: "Fechar menu",
    items: [
      ["O programa", "o-programa"],
      ["Como funciona", "como-funciona"],
      ["Para quem é", "para-quem-e"],
      ["Facilitador", "facilitador"],
      ["Dúvidas", "duvidas"],
    ] as const,
    interestCta: "Quero saber quando abrir",
  },
  hero: {
    interestCta: "Entrar na lista de interesse",
    explanationCta: "Entender como funciona",
  },
  // Canal direto de contato. Deliberadamente independente do formulário e do
  // banco de dados: é um link wa.me puro, sem JavaScript e sem parâmetros de
  // rastreamento, então continua funcionando mesmo se o backend estiver fora do ar.
  whatsapp: {
    // Formato internacional, somente dígitos — exigido pelo wa.me.
    number: "5511961820112",
    display: "(11) 96182-0112",
    // Pede informação. Não afirma inscrição, vaga nem participação confirmada.
    message:
      "Olá, André. Vi a página do programa de 8 semanas sobre estresse e reatividade e gostaria de receber mais informações sobre como participar.",
    heroCta: "Falar no WhatsApp",
    interestCta: "Prefiro falar no WhatsApp",
    ariaLabel:
      "Abrir conversa no WhatsApp para pedir informações sobre o programa",
  },
  // Distinção explícita entre demonstrar interesse e ter uma vaga. Enquanto
  // datas, valor e capacidade não existirem, nada aqui pode sugerir a segunda.
  preRegistration: {
    label: "Pré-inscrição",
    title: "Pré-inscrição não é inscrição confirmada",
    explanation:
      "Entrar na lista de interesse ou enviar mensagem significa pedir informações. Não reserva vaga, não confirma inscrição e não gera cobrança nem compromisso.",
    confirmation:
      "A inscrição só existirá quando datas, valor, formato e condições estiverem definidos e você confirmar a participação.",
    pending:
      "Data de início, valor, duração dos encontros, tamanho do grupo e local ainda estão sendo definidos.",
  },
  // Sinalização calma: a página fala de estresse, então parte de quem lê pode
  // estar em sofrimento agudo. Este canal responde em dias ou semanas.
  safety: {
    title: "Este não é um canal de urgência",
    text:
      "A lista de interesse e o WhatsApp deste programa são usados apenas para informações sobre a turma, com resposta em alguns dias. Se você estiver passando por uma crise ou pensando em se machucar, procure ajuda imediata:",
    cvv: "CVV — 188 (ligação gratuita, 24 horas)",
    emergency: "SAMU 192 · Emergência 190 · ou o pronto-socorro mais próximo",
  },
  process: {
    ariaLabel: "Situação, percepção, pausa, resposta",
    lead: "O que acontece quando há mais espaço para escolher",
    steps: ["Situação", "Percepção", "Pausa", "Resposta"],
    note:
      "Não é sobre ficar imune ao que acontece. É sobre não precisar agir no primeiro impulso.",
  },
  recognition: {
    eyebrow: "O programa",
    title: "Quando o estresse começa a decidir por você",
    introduction:
      "Sob pressão, a distância entre sentir e agir pode ficar curta demais. A pessoa responde, se fecha, acelera, se irrita — e só percebe depois.",
    clarification:
      "Ter essas reações não significa falta de caráter ou fraqueza. Sob estresse, respostas automáticas podem ganhar força e reduzir o espaço para escolha.",
  },
  everyday: [
    "responder no impulso e se arrepender depois",
    "interpretar situações ambíguas como ataques ou provocações",
    "perceber que o corpo já está tenso antes de entender o motivo",
    "ficar preso em pensamentos, preocupação ou irritação",
    "reagir de maneira mais intensa do que gostaria",
    "saber racionalmente o que fazer, mas não conseguir acessar isso no momento",
    "levar o estresse de uma área da vida para outras relações",
  ],
  repertoire: {
    title: "Entre sentir e agir, existe um repertório que pode ser treinado",
    lead:
      "Você não precisa esperar a emoção desaparecer para escolher o que fazer. O treinamento começa por reconhecer sinais internos, interromper respostas automáticas e ampliar as opções disponíveis.",
    explanation:
      "Não se trata de esconder emoções ou fingir tranquilidade. Trata-se de evitar que toda emoção se transforme imediatamente em ação.",
    ariaLabel: "Perceber, nomear, pausar, escolher, responder",
    steps: ["Perceber", "Nomear", "Pausar", "Escolher", "Responder"],
  },
  practiceSection: {
    title: "O que você vai praticar",
    introduction:
      "O programa oferece condições para praticar habilidades aplicáveis ao cotidiano, no seu ritmo e sem a promessa de que todos terão o mesmo resultado.",
  },
  practices: [
    "reconhecer sinais iniciais de estresse",
    "perceber pensamentos sem tratá-los imediatamente como fatos",
    "identificar padrões de reatividade",
    "permanecer presente em situações desconfortáveis",
    "criar uma pausa antes de agir",
    "responder de maneira mais coerente com seus objetivos e valores",
  ],
  structure: {
    eyebrow: "Estrutura",
    title: "Como funcionam as oito semanas",
    lead:
      "Uma proposta gradual: explicações breves, práticas guiadas e espaço para olhar com honestidade para o que funciona — e para o que é difícil.",
    features: [
      "explicações breves",
      "práticas guiadas",
      "exercícios de observação",
      "discussão das dificuldades",
      "pequenas práticas entre encontros",
      "material de apoio",
    ],
  },
  logistics: [
    ["Duração", "8 semanas"],
    ["Encontros", "1 encontro semanal"],
    // "A definir" é o sentinela usado pela página para marcar visualmente o que
    // ainda não foi decidido. Nada aqui pode ser preenchido com estimativa.
    ["Duração de cada encontro", "A definir"],
    ["Formato", "A definir"],
    ["Tamanho do grupo", "A definir"],
    ["Início previsto", "A definir"],
    ["Investimento", "A definir"],
    ["Local ou plataforma", "A definir"],
  ] as [string, string][],
  curriculumSection: {
    title: "Percurso preliminar das oito semanas",
    introduction:
      "O conteúdo abaixo é uma proposta inicial e poderá ser ajustado antes da abertura da primeira turma.",
    weekLabel: "Semana",
  },
  curriculum: [
    {
      title: "Piloto automático e reatividade",
      description: "Reconhecer como respostas automáticas aparecem no cotidiano.",
    },
    {
      title: "Sinais de estresse no corpo",
      description: "Perceber tensão, aceleração, urgência e outros sinais precoces.",
    },
    {
      title: "Treinamento da atenção",
      description: "Praticar retornar ao que está acontecendo no presente.",
    },
    {
      title: "Pensamentos não são ordens",
      description:
        "Observar interpretações e pensamentos sem precisar obedecê-los.",
    },
    {
      title: "A pausa antes da resposta",
      description: "Criar alternativas entre impulso e comportamento.",
    },
    {
      title: "Emoções difíceis",
      description:
        "Aprender a permanecer em contato com desconforto sem reagir automaticamente.",
    },
    {
      title: "Reatividade nas relações",
      description:
        "Perceber padrões de defesa, conflito e comunicação sob estresse.",
    },
    {
      title: "Continuidade e plano pessoal",
      description:
        "Consolidar práticas e definir como continuar depois do programa.",
    },
  ] satisfies CurriculumWeek[],
  audience: {
    title: "Este programa pode fazer sentido para você se…",
    note:
      "O compromisso esperado não é “fazer tudo certo”. É comparecer, experimentar e observar o que muda quando há um pouco mais de espaço.",
  },
  forWhom: [
    "você sente que reage no impulso",
    "o estresse tem afetado suas relações ou decisões",
    "você percebe dificuldade em desacelerar",
    "você quer desenvolver mais consciência sobre seus padrões",
    "você procura uma abordagem prática, estruturada e gradual",
    "você tem disponibilidade para participar dos encontros e realizar pequenas práticas durante a semana",
  ],
  boundaries: {
    title: "O que este programa não é",
  },
  notFor: [
    "não é uma promessa de eliminar estresse ou emoções difíceis",
    "não é um curso religioso ou espiritual",
    "não exige experiência prévia com meditação",
    "não é um espaço para exposição obrigatória da vida pessoal",
    "não substitui avaliação médica, atendimento de urgência ou acompanhamento individual quando necessário",
    "não é indicado como único recurso para situações de crise aguda",
  ],
  mindfulness: {
    title: "Por que mindfulness?",
    diagramWords: ["atenção", "observação"],
    lead:
      "Neste programa, mindfulness é utilizado como um conjunto de práticas de atenção e observação.",
    explanation:
      "O objetivo não é esvaziar a mente, atingir um estado especial ou permanecer calmo o tempo inteiro. O treino ajuda a perceber pensamentos, emoções e impulsos com mais clareza antes de responder.",
    methodology: "A proposta também é informada pela psicologia comportamental.",
  },
  facilitatorSection: {
    title: "Quem facilita o programa",
    photoAriaLabel: "Espaço reservado para foto profissional de André Fiker",
  },
  facilitator: {
    name: "André Fiker",
    credentials: "Psicólogo — CRP 06/115147",
    focus: "Atendimento clínico de adultos",
    location: "Guarulhos — SP",
    description:
      "O programa será conduzido por André Fiker, psicólogo clínico, com experiência no acompanhamento de adultos e trabalho voltado à compreensão de padrões de comportamento, emoções e relações.",
    // Opcional. Se for null, a seção do facilitador é renderizada só com o
    // texto, em largura total — melhor do que exibir uma moldura vazia.
    photo: "/images/andre-fiker-profissional.jpg" as string | null,
    photoAlt: "André Fiker, psicólogo clínico",
  },
  faqSection: {
    eyebrow: "Perguntas frequentes",
    title: "Dúvidas comuns",
  },
  faqs: [
    {
      question: "Preciso saber meditar?",
      answer:
        "Não. As práticas serão apresentadas de forma gradual, sem exigir experiência prévia.",
    },
    {
      question: "O programa é terapia em grupo?",
      answer:
        "Não. Trata-se de um programa psicoeducativo, com práticas e discussões orientadas. Ele não substitui psicoterapia individual quando esta for necessária.",
    },
    {
      question: "Vou precisar falar sobre minha vida pessoal?",
      answer:
        "Não há exposição obrigatória. Você decide o que deseja compartilhar, dentro dos combinados de convivência do grupo.",
    },
    {
      question: "E se eu tiver dificuldade nas práticas?",
      answer:
        "Dificuldades fazem parte do treino e poderão ser discutidas nos encontros. As práticas serão adaptadas ao nível introdutório do grupo.",
    },
    {
      question: "Quanto tempo preciso praticar durante a semana?",
      answer:
        "A expectativa de prática entre os encontros será informada junto com as demais informações da turma. A proposta é que seja compatível com uma rotina de trabalho.",
    },
    {
      question: "O programa é religioso?",
      answer:
        "Não. Mindfulness será usado como prática de atenção e observação, sem orientação religiosa ou espiritual.",
    },
    {
      question: "Posso participar se já faço psicoterapia?",
      answer:
        "Em geral, sim. Se fizer sentido para você, converse também com seu psicólogo ou psicóloga.",
    },
    {
      question: "Os encontros serão gravados?",
      answer:
        "A política de gravação ainda está sendo definida e será informada antes da abertura das inscrições.",
    },
    {
      question: "Como funciona a privacidade do grupo?",
      answer:
        "Os combinados de confidencialidade serão apresentados e acordados no primeiro encontro. O que for compartilhado no grupo não deve sair dele.",
    },
    {
      question: "O que acontece se eu faltar?",
      answer:
        "A política de faltas e o acesso ao material de apoio serão informados antes da abertura das inscrições.",
    },
    {
      question: "Quando começa a próxima turma?",
      answer: "A primeira turma ainda está em planejamento. Entrar na lista de interesse é a forma de ser avisado assim que a data for definida.",
    },
    {
      question: "Qual será o investimento?",
      answer:
        "O valor e as formas de pagamento serão divulgados antes da abertura das inscrições, junto com as demais informações da turma.",
    },
  ] satisfies Faq[],
  interest: {
    eyebrow: "Lista de interesse",
    title: "Receba as informações da primeira turma",
    description:
      "Deixe apenas seus dados de contato e a preferência de formato. Você não precisa explicar questões pessoais ou clínicas.",
    note: "Primeira turma em planejamento.",
    // Duas rotas equivalentes para a mesma coisa: pedir informação.
    choice: "Você pode preencher o formulário ou falar diretamente no WhatsApp.",
    // Usados quando o formulário não está no ar. Precisam existir em separado:
    // as frases acima prometem um formulário, e prometer um campo que não está
    // na tela é pior do que não dizer nada.
    descriptionClosed:
      "Quando a primeira turma tiver data definida, a pré-inscrição será aberta aqui. Você não precisa explicar questões pessoais ou clínicas para pedir informações.",
    choiceClosed: "Por enquanto, o contato é direto pelo WhatsApp.",
    or: "ou",
  },
  form: {
    // Estado público padrão, usado sempre que o modo ao vivo não está ligado.
    //
    // A alternativa seria exibir o formulário desativado, mas um formulário que
    // aceita o que a pessoa digita e não faz nada com aquilo é pior do que não
    // ter formulário: consome o esforço de quem preencheu e devolve nada. Aqui
    // a página assume que a pré-inscrição ainda não abriu e encaminha para o
    // único canal que de fato funciona.
    closed: {
      title: "A pré-inscrição ainda não está aberta",
      explanation:
        "O formulário será liberado junto com as informações da primeira turma. Até lá, o WhatsApp é a forma de pedir informações e ser avisado quando a data for definida.",
      cta: "Falar no WhatsApp",
      privacyNote: "Esta página não coleta nem armazena nenhum dado seu.",
    },
    // Mostrado no modo demo, em que nada sai do navegador.
    prototypeNote: "Protótipo: este formulário não envia nem armazena informações.",
    // Substitui o aviso acima quando o modo ao vivo está ligado. As duas frases
    // não podem aparecer juntas: no modo ao vivo a primeira seria falsa.
    liveNote:
      "Seus dados de contato serão enviados e armazenados apenas para avisar sobre a primeira turma.",
    fields: {
      name: "Nome",
      email: "E-mail",
      whatsapp: "WhatsApp",
      optional: "(opcional)",
      format: "Formato de preferência",
    },
    // `value` é o token gravado no banco; `label` é o texto exibido.
    formatOptions: [
      { value: "online", label: "Online" },
      { value: "presencial", label: "Presencial" },
      { value: "tanto_faz", label: "Tanto faz" },
    ],
    permission: "Autorizo o contato sobre este programa.",
    validationError:
      "Preencha os campos obrigatórios e autorize o contato para continuar.",
    submit: "Quero receber as informações",
    submitting: "Enviando…",
    submitError:
      "Não foi possível enviar agora. Tente novamente em alguns instantes.",
    successTitle: "Obrigado.",
    successMessage:
      "Seu interesse foi registrado nesta demonstração. Nenhuma informação foi enviada para um servidor.",
    // Recibo do modo ao vivo: confirma o que de fato aconteceu, sem prometer
    // data, local, vaga ou resultado.
    liveSuccessTitle: "Pré-inscrição recebida.",
    liveSuccessMessage:
      "Recebemos seus dados de contato e entraremos em contato quando as informações da primeira turma estiverem definidas. Isso não reserva vaga nem confirma inscrição.",
    // Mostrado sempre — as duas modalidades coletam os mesmos campos, e a
    // pessoa deve saber o que acontece com eles antes de digitar.
    privacyNote: "Seus dados são usados apenas para falar sobre este programa.",
    privacyLink: "Ler o aviso de privacidade",
    privacyHref: "/estresse-reatividade/privacidade",
    // Campo oculto anti-robô. Nunca é exibido a uma pessoa.
    honeypotLabel: "Deixe este campo em branco",
    reset: "Voltar ao formulário",
  },
  finalCta: {
    lead: "Um passo de cada vez.",
    title:
      "Você não precisa controlar tudo o que sente para escolher melhor como agir.",
    button: "Quero receber as informações",
  },
  footer: {
    note:
      "Este site apresenta um programa psicoeducativo em desenvolvimento. As informações poderão ser atualizadas antes da abertura das inscrições.",
    role: "Psicólogo",
    credentials: "CRP 06/115147",
    legalAriaLabel: "Links legais",
    privacy: "Aviso de privacidade",
    privacyHref: "/estresse-reatividade/privacidade",
  },
  contact: {
    email: "contato@andrefiker.com.br",
    whatsapp: "(11) 96182-0112",
  },
};

/**
 * Link direto do WhatsApp, montado uma única vez a partir da configuração acima.
 *
 * É apenas uma string em `href`: funciona sem JavaScript, sem hidratação e sem
 * o backend. Nenhum parâmetro de rastreamento é acrescentado — só o número e o
 * texto da mensagem.
 */
export const whatsappHref = `https://wa.me/${program.whatsapp.number}?text=${encodeURIComponent(
  program.whatsapp.message,
)}`;

/**
 * Whether the pre-registration form is rendered at all.
 *
 * Mirrors the check inside InterestForm on purpose, so the copy around the form
 * cannot promise a field that is not on screen. Read at build time, like the
 * variable itself.
 */
export const waitlistFormOpen =
  process.env.NEXT_PUBLIC_PROGRAM_WAITLIST_MODE === "live" ||
  process.env.NEXT_PUBLIC_PROGRAM_WAITLIST_MODE === "demo";

export type ProgramNavigation = typeof program.navigation;
export type InterestFormCopy = typeof program.form;
