# Google Ads — conversões offline da terapia

> **Status: preparado, não operacional.** Nenhum upload offline foi executado ou
> autorizado. Este documento é um runbook futuro para o subconjunto de visitas
> que aceitou publicidade; não autoriza importar dados nem mudar conversões.

Este fluxo foi preparado para correlacionar duas ações reais sem enviar ao
Google nome, telefone, e-mail, mensagem do WhatsApp, diagnóstico ou motivo
clínico:

- `Lead qualificado`
- `Sessão agendada`

## O que a página registra

Quando a visita chega com `gclid`, `gbraid` ou `wbraid` **e a pessoa já concedeu
consentimento de publicidade**, o servidor pode gravar apenas:

- tipo do identificador;
- identificador de clique, preservando maiúsculas e minúsculas;
- referência aleatória no formato `AF-XXXX-XXXX`;
- horário de captura e expiração.

A linha deixa de ser utilizável em 90 dias e é removida pela limpeza da próxima
captura. A tabela tem RLS habilitado, nenhuma política pública e acesso somente
pela chave de serviço no servidor. A API nunca devolve o identificador original
ao código cliente ou ao WhatsApp. A URL de chegada pode conter esse identificador
por definição do clique do Google; a mensagem pré-preenchida recebe somente a
referência aleatória.

A captura começa no mesmo gesto que abre o WhatsApp. Uma janela vazia segura é
reservada imediatamente e só é direcionada depois que a rota responde. A rota
usa um único prazo total de 8 segundos para limpeza, consulta e gravação. Se a
captura falhar, devolver referência inválida ou perder o consentimento enquanto
estiver em curso, o contato continua sem referência AF e sem expor o click ID.

Sem decisão de consentimento, com publicidade rejeitada ou após revogação:

- o click ID não é lido pelo fluxo AF nem enviado à rota;
- nenhuma referência AF é criada ou reutilizada;
- o WhatsApp abre sem referência;
- não se deve reconstruir atribuição por telefone, nome, horário ou mensagem.

## Quando registrar cada evento

- `Lead qualificado`: use o horário em que o contato foi de fato qualificado.
- `Sessão agendada`: use o horário em que a sessão foi confirmada.

Não registre a justificativa, a queixa, o conteúdo da conversa ou qualquer nota
clínica. Se as duas ações acontecerem, são duas linhas separadas, com a mesma
identificação de clique e horários próprios.

## Resolver uma referência

No editor SQL privado do projeto Supabase `andrefiker-site`, consulte somente a
referência recebida:

```sql
select reference_code, click_id_type, click_id, captured_at, expires_at
from public.ad_click_references
where reference_code = 'AF-XXXX-XXXX'
  and expires_at > now();
```

O resultado deve ter exatamente uma linha. Se não houver resultado, não invente
um identificador e não tente associar o contato por nome ou telefone.

## Montar o arquivo

Use `docs/google-ads-offline-conversions-template.csv`, que reproduz os campos
do modelo oficial atual de conversões originadas de cliques.

1. Preserve a primeira linha: `Parameters:TimeZone=America/Sao_Paulo`.
2. Para `click_id_type = gclid`, copie o `click_id` sem alterar nenhuma letra.
3. Use exatamente `Lead qualificado` ou `Sessão agendada` em `Conversion Name`.
4. Use o horário real no formato `yyyy-MM-dd HH:mm:ss`.
5. Deixe valor e moeda vazios: as duas ações foram configuradas sem valor.
6. Não declare `Ad User Data` nem `Ad Personalization` como concedidos. A
   implementação atual mantém `ad_user_data = denied` e
   `ad_personalization = denied`; o consentimento de publicidade que permite a
   captura AF não autoriza inferir outro sinal. Antes de qualquer upload real,
   revalide o esquema vigente do Google e a decisão jurídico-operacional sobre
   esses campos. Até lá, o upload permanece bloqueado.

Exemplo estrutural, com identificador fictício — nunca faça upload deste exemplo:

```csv
EAIaIQobChMIFICTICIO123,Lead qualificado,2026-08-29 18:30:00,,,,
EAIaIQobChMIFICTICIO123,Sessão agendada,2026-08-30 10:15:00,,,,
```

O modelo manual atual apresenta uma coluna `Google Click ID`. Para uma linha
capturada como `gbraid` ou `wbraid`, não cole o valor nessa coluna por suposição;
use o mapeamento correspondente no Google Ads Data Manager. A captura desses
identificadores já fica preservada para essa evolução.

## Enviar no Google Ads — procedimento futuro, ainda bloqueado

Os passos abaixo servem apenas para uma futura execução autorizada. Não use
`Aplicar` enquanto a importação não tiver sido formalmente operacionalizada e
os campos de consentimento não tiverem sido validados.

1. Abra `Metas → Conversões → Uploads`.
2. Selecione `Novo upload`.
3. Em origem, selecione `Fazer upload de um arquivo`.
4. Escolha primeiro `Visualizar` e corrija qualquer erro.
5. Use `Aplicar` apenas para eventos reais e conferidos.
6. Revise o resultado do upload e o diagnóstico das duas ações.

O Google recomenda aguardar de 4 a 6 horas após criar uma nova ação antes do
primeiro upload, aceita GCLIDs por até 90 dias e recomenda uploads frequentes e
consistentes. Com a conta sem saldo, não há conversão real para importar agora.
Uma referência real é condição necessária, mas não suficiente: o primeiro
arquivo só pode ser criado depois da operacionalização explícita do processo.

## Limites deliberados

- Conversões otimizadas para leads permanecem desativadas.
- A atribuição é somente opt-in: rejeições e ausência de consentimento ficam
  deliberadamente sem AF e não devem ser estimadas ou completadas manualmente.
- O fluxo está preparado, mas a rotina de importação ainda não está operacional.
- Nenhum dado diretamente identificável ou clínico é enviado ao Google; o
  identificador de clique é pseudônimo e permanece sujeito a minimização,
  retenção e consentimento.
- Nenhum conteúdo do WhatsApp é lido pelo site.
- Nenhum upload vazio, fictício ou retroativo deve ser aplicado.
- O saldo da conta não faz parte deste fluxo.
