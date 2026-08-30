# Fiker-Elite-V1 — site Phase 0 change log

**Worktree:** `C:\Users\andre\Documents\Codex\2026-08-30\fiker-elite-v1-site-phase0`  
**Branch:** `implementation/fiker-elite-v1-phase0-20260830`  
**Baseline recuperável:** `67c6e289ad3a94b8b672d5bf3336a940dd079283`  
**Execução:** 2026-08-30 14:06 BRT  
**Estado externo ao concluir este patch, antes do commit:** nenhum push, deploy ou alteração na produção. O commit/deployment resultante é registrado no change log operacional externo para não exigir um segundo deploy apenas para atualizar este arquivo.

## DONE

### P0 — posicionamento e conteúdo

| Objeto | Before | After | Motivo | Rollback | Verificação |
|---|---|---|---|---|---|
| LP: metadados e schema | Terapia Comportamental, TCC e ACT; preço na description | Terapia Comportamental + TCC, adultos, particular, Guarulhos, 50 minutos; sem ACT e sem preço promocional | Baseline canônico e compliance | Restaurar os arquivos da rota a partir de `67c6e289` | Build e busca estática |
| LP: hero | Terapia Comportamental; R$250 em destaque; alt com “especialista” | H1 “Terapia Comportamental e TCC para Adultos em Guarulhos”; logística de 50 minutos; CTA WhatsApp; trust strip factual | Alinhar promessa pública sem claim promocional | Reverter `LP-Hero.tsx` | Build e ESLint direto |
| LP: abordagem | “TCC e ACT”; preço e CTA com ACT | Terapia Comportamental + TCC; processo colaborativo; sessão de 50 minutos; sem preço no bloco | Remover ACT e neutralizar argumento comercial | Reverter `LP-TCC.tsx` | Busca estática sem ACT |
| LP: temas | Autoestima feminina, TDAH/TEA, lista diagnóstica e “evolução” | Temas adultos neutros: ansiedade/estresse, autocobrança, rotina, relacionamentos, transições e padrões | Evitar nicho público indevido e linguagem diagnóstica | Reverter `LP-Demands.tsx` | Busca estática |
| LP: diferenciais | Claims de mudança, resultado, autoridade e garantia | Formação, registro, duração, modalidade e abordagem em linguagem factual | Remover claims não necessários | Reverter `LP-Differences.tsx` | Busca estática |
| LP: preço | Hero, metadados, seção de abordagem e FAQ | Uma menção logística neutra somente no FAQ | Evitar preço como argumento persuasivo | Reverter os três componentes afetados | `rg` confirma uma única ocorrência na LP |
| LP: reviews | Testimonials, nota e avaliações como prova comercial | Testimonials removido da LP | Diretriz de publicidade profissional | Recolocar o componente no cliente da LP | Busca estática e build |
| Doctoralia na LP | Widget com script Docplanner e avaliações | Link estático “Ver perfil e disponibilidade no Doctoralia” | Evitar terceiro antes de consentimento e prova comercial | Reverter `DoctoraliaWidget.tsx` | Sem `platform.docplanner`/`data-zlw` |
| Filtro de serviço | Adultos/avaliação/laudos ausentes; somente aviso de emergência no rodapé | Bloco explícito: adultos; sem avaliação neuropsicológica, laudos ou urgência | Qualificação factual do atendimento | Remover o bloco em `LandingPageClient.tsx` | Build e inspeção do HTML gerado |
| Home: ACT e foco diagnóstico | Curso de ACT/ACP, claim “especialista” e destaque de neurodivergências/diagnósticos | ACT removida; formação descrita factualmente; áreas adultas neutras | Consistência da presença pública | Reverter `About.tsx`, `Hero.tsx`, `Services.tsx` e schema da home | Busca na copy renderizada; registros históricos tratados separadamente |
| Home: avaliações e claims comerciais | Cinco estrelas/nota 5,0 no hero; seção de avaliações; “especializados”, “eficazes”, “bem-estar” e “Mais procurado” | Estrelas, nota, Testimonials, links âncora e selo removidos; serviços descritos de modo factual | Remover prova comercial e claims não necessários sem redesign | Reverter `Hero.tsx`, `Services.tsx`, `page.tsx`, Header/Footer e sitemap | HTML local sem os textos; ESLint e build |
| Blog: dois artigos históricos de ACT | Artigos listados e recuperáveis por rota direta, `all=true`, ID, export e `/blog-creations` | Conteúdo preservado no repositório/base; `publishAt` do fallback movido para 2999 e IDs/slugs filtrados em todas as leituras sem autenticação | Despublicação reversível sem apagar ou reescrever histórico | Remover os registros de `EXPLICITLY_UNPUBLISHED_BLOG_POSTS` e restaurar as duas datas | Testes de cada endpoint; listagens/export sem posts; rotas slug/ID retornam 404 |

### P0 — privacidade e consentimento

| Objeto | Before | After | Motivo | Rollback | Verificação |
|---|---|---|---|---|---|
| GA4 e Google Ads | `gtag.js` carregado e configurado no layout antes de escolha | Consent defaults `denied`; tags carregadas somente após autorização da categoria | Consentimento real em basic mode | Restaurar scripts do layout e remover o manager | Unit tests, build e revisão estática |
| GA4 `page_view` | Config automática, com URL completa não sanitizada | `send_page_view: false`; evento manual somente após consentimento, com `origin + pathname` seguro, rota dinâmica agregada e título allowlisted | Impedir query, hash, click ID, slug ou tema sensível no Analytics | Reverter `page-view.ts` e a chamada do manager | Cinco testes cobrem config, consent gate e payload sanitizado |
| Preconnect externo | Conexões antecipadas a `fonts.googleapis.com` e `fonts.gstatic.com` | Preconnects removidos; `next/font` continua self-hosted | Não abrir conexão externa desnecessária antes da escolha | Recolocar os dois links do layout | HTML inicial local sem ambos os hosts |
| GTM | Container `GTM-M5PP34J` carregado na LP em paralelo ao `gtag` direto | GTM não é carregado nesta baseline, pendente auditoria do container | Evitar duplicação não comprovada | Recolocar script somente após auditoria e gate | Sem `gtm.js` na rota/build |
| Escolha do visitante | Sem banner ou revogação | Aceitar tudo, rejeitar opcionais, gerenciar Analytics/Ads separadamente e revogar depois | Controle explícito | Remover `ConsentManager` do layout | Build e ESLint direto |
| Armazenamento | Tags e AF podiam iniciar sem decisão | Apenas a preferência essencial usa `localStorage`; Analytics/Ads e AF respeitam a categoria | Minimização e separação de finalidades | Reverter `consent.ts` e manager | Novos testes de gate |
| Políticas | `/privacidade` e `/cookies` retornavam 404 | Rotas públicas, links na LP/home e botão de preferências | Transparência | Remover rotas e links | Build lista ambas como páginas estáticas |

### P1 — tracking AF e eventos

| Objeto | Before | After | Motivo | Rollback | Verificação |
|---|---|---|---|---|---|
| Captura AF | `captureAdClickReference()` no mount e no clique, sem gate | Captura, fetch e `sessionStorage` somente com consentimento de publicidade | Não tratar click ID antes de autorização | Reverter `contact-tracking.ts` e o effect da LP | Testes “blocked before consent” e “rejecting…” |
| Payload de contato | `landing_section` derivado de `window.location.hash`; labels livres | Somente canal, pathname e placement enumerado (`hero`, `approach`, `scheduling`, `final`, `sticky`, `nav`) | Evitar marcador clínico granular | Reverter metadata de eventos | Teste usa `#ansiedade` e prova ausência no payload |
| Referência opaca | AF preservada, mas sem gate | AF preservada após consentimento; gclid/gbraid/wbraid nunca entram no WhatsApp | Manter atribuição sem PII | Reverter gate mantendo API/migration | Teste confirma AF e exclui click ID |
| Google user data/personalization | Não declarado | `ad_user_data` e `ad_personalization` permanecem `denied`; enhanced conversions e signals desativados | Evitar PII e personalização em contexto de saúde | Ajustar somente após nova decisão documentada | Revisão do manager |

## SKIPPED

- Nenhum NAP foi inventado, completado ou normalizado.
- API, migration, tabela e documentação AF não foram removidas.
- Nenhum script de Doctoralia foi mantido, pois o link estático cumpre a função sem terceiro automático.
- Nenhuma dependência foi atualizada. `npm ci` restaurou exatamente o lockfile existente para permitir testes.
- Nenhuma alteração visual ampla ou redesign foi feito.

## BLOCKED / NEEDS VERIFICATION

1. **NAP canônico:** sala, CEP e telefone precisam ser confirmados contra GBP e Doctoralia. Os valores existentes no código foram preservados; o schema da LP não foi completado.
2. **GTM:** o conteúdo do container `GTM-M5PP34J` não foi auditado. Por segurança, ele permanece desativado no patch.
3. **Runtime em navegador limpo:** ainda precisa de evidência de requests/cookies/storage para visita inicial, Reject, Accept, mudança de categoria e revogação. Não foi usado click ID de teste em produção.
4. **TypeScript global do legado:** `npx tsc --noEmit` encontra erros preexistentes nas assinaturas das rotas antigas `/api/blogs/[id]`, em `About.tsx`, `DynamicBackground.tsx`, `FAQ.tsx`, `InteractiveParticles.tsx` e `ParticleBackground.tsx`. O `next.config.ts` já contém `ignoreBuildErrors: true`; o build de produção concluiu e não apareceu erro nos arquivos novos desta fase. Esses itens não foram ampliados para evitar refatoração fora do escopo.
5. **Lint script:** `npm run lint` falha porque Next 16 interpreta `next lint` como diretório. O ESLint foi executado diretamente sobre todos os arquivos alterados e passou.
6. **Dependências:** `npm ci` reporta 36 vulnerabilidades conhecidas no lockfile existente (1 baixa, 11 moderadas, 23 altas, 1 crítica). Nenhum `audit fix` foi executado, pois isso alteraria dependências fora do escopo.
7. **Histórico de blog e produção:** os dois artigos de ACT permanecem deliberadamente nos registros históricos; não foram apagados nem reescritos. O filtro por ID/slug os retira de todas as leituras sem autenticação após um futuro deploy, inclusive com Prisma, mas nenhuma linha da base de produção foi alterada nesta fase sem deploy.
8. **Administração do blog:** `/blog-creations` e endpoints de escrita do blog já existiam sem autenticação. Os dois posts despublicados agora são filtrados também dessa página e de seus feeds, mas implementar autenticação real para o gestor é um trabalho separado e continua BLOCKED; nenhuma autenticação improvisada foi adicionada.

## Test results

| Teste | Resultado |
|---|---|
| `npm test` | PASS — 65/65 |
| Novos testes de consentimento/AF/page view | PASS — sem fetch/storage/evento antes de consentir; reject impede eventos e reutilização; AF opaca preservada; page view sanitizado |
| Novos testes de publicação do blog | PASS — datas futuras ocultas; posts normais preservados; `all=true`/`blog-creations`, ID e export não expõem os dois registros |
| `npm run build` | PASS — 16/16 páginas; `/terapia-guarulhos`, `/privacidade` e `/cookies` prerenderizadas |
| Servidor local pós-build | PASS — APIs padrão/`all=true`/export excluem os dois posts, rotas slug e ID retornam 404 e `/blog-creations` não recebe os registros; HTML inicial sem Google tag/preconnect Google Fonts; home sem textos de avaliações |
| ESLint direto nos arquivos alterados | PASS — 0 erros |
| `git diff --check` | PASS — sem erro de whitespace |
| Busca estática ACT/ACP em copy pública | PASS — nenhuma copy renderizada; apenas dois slugs de bloqueio e os dois registros históricos preservados contêm ACT |
| Busca estática de claims proibidos na LP | PASS — 0 ocorrências |
| `npm run lint` | BLOCKED — script legado incompatível com Next 16 |
| `npx tsc --noEmit` | BLOCKED — erros legados; build configurado para ignorá-los |

## Rollback

- No momento da validação pré-commit, a produção continuava no deployment preservado do commit `67c6e289`; não havia mudança externa a reverter.
- O diff foi revisado e validado antes do commit; o hash e o deployment resultantes ficam no change log operacional externo.
- Após um eventual deploy, o rollback recomendado é promover novamente o deployment preservado de `67c6e289` ou reverter somente o commit de Phase 0.
- Não apagar a branch de recuperação nem o deployment live existente.
