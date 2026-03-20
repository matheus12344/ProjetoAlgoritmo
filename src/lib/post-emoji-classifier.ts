interface EmojiCategory {
  keywords: string[];
  emoji: string;
  category: string;
}

const categories: EmojiCategory[] = [
  {
    category: "Ansiedade e Estresse",
    keywords: ["ansiedade", "estresse", "preocupação", "medo", "pânico", "tensão", "nervos"],
    emoji: "😰"
  },
  {
    category: "Depressão",
    keywords: ["depressão", "tristeza", "melancolia", "desânimo", "solidão"],
    emoji: "💙"
  },
  {
    category: "Autoestima",
    keywords: ["autoestima", "confiança", "amor próprio", "autoimagem", "aceitação"],
    emoji: "✨"
  },
  {
    category: "Relacionamentos",
    keywords: ["relacionamento", "casal", "namoro", "casamento", "família", "amor"],
    emoji: "💑"
  },
  {
    category: "Mindfulness",
    keywords: ["mindfulness", "meditação", "atenção plena", "respiração", "zen", "calma"],
    emoji: "🧘"
  },
  {
    category: "Desenvolvimento Pessoal",
    keywords: ["desenvolvimento", "crescimento", "mudança", "hábitos", "metas"],
    emoji: "🌱"
  },
  {
    category: "Saúde Mental",
    keywords: ["saúde mental", "bem-estar", "psicológico", "mental", "terapia", "psicologia"],
    emoji: "🧠"
  },
  {
    category: "Sono e Descanso",
    keywords: ["sono", "dormir", "insônia", "descanso", "relaxamento"],
    emoji: "😴"
  },
  {
    category: "Trabalho e Carreira",
    keywords: ["trabalho", "carreira", "profissional", "emprego", "burnout"],
    emoji: "💼"
  },
  {
    category: "Comunicação",
    keywords: ["comunicação", "diálogo", "conversa", "expressão", "fala"],
    emoji: "💭"
  },
  {
    category: "Traumas",
    keywords: ["trauma", "superação", "abuso", "violência", "ptsd"],
    emoji: "🌅"
  },
  {
    category: "Estudos",
    keywords: ["estudo", "aprendizado", "escola", "universidade", "concentração"],
    emoji: "📚"
  }
];

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function classifyPostEmoji(title: string, content: string = ""): { emoji: string; category: string } {
  const normalizedTitle = normalizeText(title);
  const normalizedContent = normalizeText(content);
  const combinedText = `${normalizedTitle} ${normalizedContent}`;

  // Sistema de pontuação para cada categoria
  const scores = categories.map(category => {
    let score = 0;
    
    // Palavras-chave no título têm peso maior
    category.keywords.forEach(keyword => {
      const normalizedKeyword = normalizeText(keyword);
      if (normalizedTitle.includes(normalizedKeyword)) {
        score += 3;
      }
      if (normalizedContent.includes(normalizedKeyword)) {
        score += 1;
      }
    });

    return {
      category: category.category,
      emoji: category.emoji,
      score
    };
  });

  // Ordena por pontuação e pega o melhor match
  const bestMatch = scores.sort((a, b) => b.score - a.score)[0];

  // Se nenhuma categoria teve match significativo, retorna um emoji padrão
  if (bestMatch.score === 0) {
    return {
      emoji: "📝",
      category: "Geral"
    };
  }

  return {
    emoji: bestMatch.emoji,
    category: bestMatch.category
  };
}