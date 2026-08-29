# Google Ads — conversões offline da terapia

Este fluxo mede duas ações reais sem enviar ao Google nome, telefone, e-mail,
mensagem do WhatsApp, diagnóstico ou motivo clínico:

- `Lead qualificado`
- `Sessão agendada`

## O que a página registra

Quando a visita chega com `gclid`, `gbraid` ou `wbraid`, o servidor grava apenas:

- tipo do identificador;
- identificador de clique, preservando maiúsculas e minúsculas;
- referência aleatória no formato `AF-XXXX-XXXX`;
- horário de captura e expiração.

A linha deixa de ser utilizável em 90 dias e é removida pela limpeza da próxima
captura. A tabela tem RLS habilitado, nenhuma política pública e acesso somente
pela chave de serviço no servidor. O navegador e o WhatsApp nunca recebem o
identificador original. A mensagem pré-preenchida do WhatsApp recebe somente a
referência aleatória.

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
6. Deixe `Ad User Data` e `Ad Personalization` vazios. Os termos da conta estão
   aceitos, mas isso não equivale a consentimento individual; este fluxo também
   não envia dados fornecidos pela pessoa.

Exemplo estrutural, com identificador fictício — nunca faça upload deste exemplo:

```csv
EAIaIQobChMIFICTICIO123,Lead qualificado,2026-08-29 18:30:00,,,,
EAIaIQobChMIFICTICIO123,Sessão agendada,2026-08-30 10:15:00,,,,
```

O modelo manual atual apresenta uma coluna `Google Click ID`. Para uma linha
capturada como `gbraid` ou `wbraid`, não cole o valor nessa coluna por suposição;
use o mapeamento correspondente no Google Ads Data Manager. A captura desses
identificadores já fica preservada para essa evolução.

## Enviar no Google Ads

1. Abra `Metas → Conversões → Uploads`.
2. Selecione `Novo upload`.
3. Em origem, selecione `Fazer upload de um arquivo`.
4. Escolha primeiro `Visualizar` e corrija qualquer erro.
5. Use `Aplicar` apenas para eventos reais e conferidos.
6. Revise o resultado do upload e o diagnóstico das duas ações.

O Google recomenda aguardar de 4 a 6 horas após criar uma nova ação antes do
primeiro upload, aceita GCLIDs por até 90 dias e recomenda uploads frequentes e
consistentes. Com a conta sem saldo, não há conversão real para importar agora;
o primeiro arquivo deve ser criado apenas quando uma referência real chegar.

## Limites deliberados

- Conversões otimizadas para leads permanecem desativadas.
- Nenhum dado pessoal ou clínico é enviado ao Google.
- Nenhum conteúdo do WhatsApp é lido pelo site.
- Nenhum upload vazio, fictício ou retroativo deve ser aplicado.
- O saldo da conta não faz parte deste fluxo.
