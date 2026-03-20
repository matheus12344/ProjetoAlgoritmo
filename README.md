# André Fiker - Site Profissional

Site moderno e responsivo para o psicólogo clínico Dr. André Fiker, especialista em Terapia Comportamental.

## 🎯 Objetivo

Criar um site profissional, moderno e otimizado para conversão que posicione o Dr. André Fiker como referência em Terapia Comportamental em Guarulhos e atendimento online para todo o Brasil.

## 🚀 Tecnologias Utilizadas

- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Animações**: Framer Motion
- **Formulários**: React Hook Form + Zod
- **Notificações**: Sonner
- **SEO**: Schema Markup, Meta Tags Otimizadas

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   ├── sitemap.ts         # Sitemap para SEO
│   ├── robots.ts          # Robots.txt
│   └── globals.css        # Estilos globais
├── components/
│   ├── Header.tsx         # Navegação principal
│   ├── Hero.tsx           # Seção principal
│   ├── About.tsx          # Sobre o profissional
│   ├── Services.tsx       # Serviços oferecidos
│   ├── Testimonials.tsx   # Depoimentos
│   ├── FAQ.tsx            # Perguntas frequentes
│   ├── BlogPreview.tsx    # Preview do blog
│   └── Footer.tsx         # Rodapé
└── hooks/
    └── use-toast.ts       # Hook para notificações
```

## 🎨 Design e UX

### Cores da Marca
- **Azul Principal**: #0B3D91
- **Azul Escuro**: #0A2E7A
- **Verde WhatsApp**: #25D366
- **Cinza Claro**: Fundos e neutros

### Tipografia
- **Primária**: Inter (limpa e moderna)
- **Display**: Sora (títulos e destaques)

### Recursos de Design
- Layout responsivo (mobile-first)
- Cards com bordas arredondadas (2xl)
- Sombras suaves e transições
- Microanimações com Framer Motion
- Botão flutuante do WhatsApp

## 🔧 Funcionalidades

### ✅ Implementadas
- [x] Navegação responsiva com menu mobile
- [x] Hero section com CTA principal
- [x] Seção Sobre com formação e especializações
- [x] Serviços detalhados com cards interativos
- [x] Depoimentos com carrossel automático
- [x] FAQ com accordion animado
- [x] Preview do blog com newsletter
- [x] Formulário de contato funcional
- [x] Integração direta com WhatsApp
- [x] Botão flutuante de WhatsApp
- [x] Schema Markup completo
- [x] Meta tags otimizadas
- [x] Sitemap e robots.txt

### 📱 Responsividade
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🎯 SEO e Performance

### SEO Avançado
- Meta titles e descriptions otimizadas
- Open Graph e Twitter Cards
- JSON-LD Schema Markup (LocalBusiness + Person + Reviews)
- URLs amigáveis
- Imagens otimizadas com alt text
- Sitemap.xml automático
- Robots.txt configurado

### Performance
- Fontes com display: swap
- Lazy loading em imagens
- Código otimizado e minificado
- Componentes server/client otimizados

## 📞 Contato e Integrações

### WhatsApp
- Link direto com mensagem pré-definida
- Botão flutuante fixo
- Integração em múltiplos CTAs

### Formulário de Contato
- Validação com React Hook Form + Zod
- Feedback visual com Sonner
- Design responsivo

## 🚀 Deploy e Produção

O site está configurado para deploy em plataformas como:
- Vercel (recomendado)
- Netlify
- Hostinger

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SITE_URL=https://www.andrefiker.com.br
NEXT_PUBLIC_WHATSAPP_NUMBER=5511961820112
```

## 📊 Conteúdo do Site

### Página Principal
1. **Hero Section**: Apresentação principal com CTAs
2. **Sobre**: Biografia, formação e especializações
3. **Serviços**: Terapia Individual, de Casal, Online e Supervisão
4. **Depoimentos**: Avaliações 5 estrelas com carrossel
5. **FAQ**: Perguntas frequentes com accordion
6. **Blog Preview**: Artigos recentes e newsletter
7. **Contato**: Formulário e informações de contato

### Conteúdo Específico
- **Especialização**: Terapia Comportamental (TCC)
- **Localização**: Guarulhos/SP e online
- **Experiência**: 6+ anos, 1000+ atendimentos
- **Avaliações**: +50 avaliações 5 estrelas

## 🔄 Manutenção

### Atualizações Recomendadas
- Conteúdo do blog (semanal)
- Depoimentos (quando disponíveis)
- Informações de contato (se necessário)
- Artigos e recursos (mensal)

### Monitoramento
- Google Analytics 4
- Search Console
- Hotjar (heatmap opcional)

## 🛠️ Desenvolvimento

### Comandos Úteis
```bash
# Instalar dependências
npm install

# Rodar desenvolvimento
npm run dev

# Verificar código
npm run lint

# Build para produção
npm run build
```

### Estrutura de Componentes
- Componentes reutilizáveis com shadcn/ui
- Animações com Framer Motion
- TypeScript para type safety
- CSS com Tailwind

## 📈 Próximos Passos

### Futuras Implementações
- [ ] Sistema de agendamento online
- [ ] Integração com Google Meu Negócio
- [ ] Blog completo com CMS
- [ ] Área do paciente
- [ ] Pagamentos online
- [ ] Telemedicina integrada

### Otimizações
- [ ] PWA (Progressive Web App)
- [ ] Dark mode
- [ ] Mais animações e microinterações
- [ ] Testes A/B nos CTAs

## 👨‍⚕️ Sobre o Profissional

**Dr. André Fiker**
- Psicólogo Clínico (CRP 06/123456)
- Especialista em Terapia Comportamental
- Formação em Mindfulness (Oxford)
- +6 anos de experiência clínica
- Atendimento presencial e online

---

*Desenvolvido com ❤️ utilizando tecnologias modernas para proporcionar a melhor experiência aos pacientes.*
