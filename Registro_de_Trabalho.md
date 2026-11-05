# Registro de trabalho

Histórico das alterações feitas no material do curso **Licitações e Lei de Responsabilidade Fiscal**. Cada entrada registra o que mudou, em qual arquivo e por quê.

---

## 04/11/2026 — Revisão de estilo e diagramação da apostila do aluno

### Arquivos
- `apostila/Apostila_do_Aluno.html` (fonte, editada)
- `apostila/Apostila_do_Aluno.pdf` (gerado a partir do HTML com Edge headless)
- `apostila/Apostila_do_Aluno_v1.html` e `apostila/Apostila_do_Aluno_v1.pdf` (versão anterior, preservada)

### Objetivo
Eliminar as páginas com muito espaço em branco e uniformizar a redação da apostila.

### 1. Diagramação

O problema era a quebra de página ao final de cada capítulo, combinada com tabelas que não podiam ser divididas.

Mudanças aplicadas no `<style>` do HTML:

| Before | After | Efeito |
|---|---|---|
| `.section { break-before: page; }` | `.section { margin-top: 14pt; }` e `.newpage { break-before: page; }` | capítulos passam a correr em sequência |
| `table { ... break-inside: avoid; }` | `table { ... }` com `tr { break-inside: avoid; }` | tabelas longas podem se partir entre linhas |
| sem `thead` | `thead { display: table-header-group; }` e primeira linha de cada tabela promovida a `<thead>` | o cabeçalho se repete quando a tabela é quebrada |
| `h1` sem proteção | `h1 { break-after: avoid; }` | título não fica sozinho no fim da página |
| `h2` sem proteção | `h2 { break-inside: avoid; }` | subtítulo não é separado do texto que vem depois |
| `.cover { height: 262mm; }` | `.cover { height: 255mm; }` | capa sem transbordo |
| capítulo 1 com `newpage` | sem `newpage` | eliminada a página em branco que ficava entre a página "Como usar" e o capítulo 1 |

Medição de ocupação (percentual da altura útil da página com conteúdo, medida por rasterização em cinza a 30 dpi):

```
versão anterior (30 páginas):
01:71% 02:99% 03:0% 04:99% 05:90% 06:92% 07:94% 08:99% 09:98% 10:99%
11:93% 12:81% 13:93% 14:99% 15:88% 16:94% 17:99% 18:99% 19:92% 20:98%
21:99% 22:99% 23:99% 24:11%

versão final (23 páginas):
01:72% 02:99% 03:97% 04:94% 05:92% 06:94% 07:99% 08:98% 09:99% 10:93%
11:81% 12:93% 13:99% 14:88% 15:94% 16:99% 17:99% 18:92% 19:98% 20:99%
21:99% 22:99% 23:11%
```

- A página 3, antes em branco, deixou de existir.
- A página 23 com 11% é a última, com o espaço de anotações, e deve ficar assim.
- A página 11 com 81% é o fim de um capítulo, antes de uma tabela que não coube inteira.

### 2. Redação

Regras aplicadas em todo o texto:

- **Sem travessões.** O título passou a ser "Apostila do Aluno: Licitações e Lei de Responsabilidade Fiscal". Os horários usam "08h às 17h". As células de tabela que usavam "—" foram preenchidas com conteúdo ("Sem restrição", "Não impede licitar", "Sem duração fixada").
- **Sem adjetivações de valor.** Exemplos: "uma grande empresa" → "uma empresa"; "é muito mais vantajosa" → "é mais vantajosa"; "dois casos bem diferentes" → "dois casos diferentes"; "Ótimo para itens de consumo frequente" → "Serve para itens de consumo frequente"; "o método mais criticado pelos Tribunais de Contas" → "o método mais citado pelos Tribunais de Contas"; "7.4 Outras dispensas importantes" → "7.4 Outras dispensas previstas em lei".
- **Conectivos após o ponto final**, com variety e sem repetição: "Por isso", "Por outro lado", "Por essa razão", "Dessa forma", "Em seguida", "Ao final", "Nesse caso", "Na prática", "Por consequência", "Ademais", "Além disso", "Por fim". "Por isso" foi limitado a duas ocorrências no documento inteiro.

Passagens reescritas, por capítulo:

| Onde | Antes | Depois (trecho) |
|---|---|---|
| Como usar | "As leis antigas só continuam regendo..." | "Por outro lado, as leis antigas só continuam regendo..." |
| Como usar | "Valores... Eles mudam todo ano: em 2027 haverá nova tabela." | "Como eles mudam todo ano, em 2027 haverá nova tabela." |
| Cap. 1 | "É como uma grande empresa... Ele cuida do dinheiro dos outros, e por isso só pode fazer..." | "Funciona como uma empresa... Como ele cuida do dinheiro dos outros, só pode fazer..." |
| Cap. 1 | "Todos seguem a Lei 14.133 e a LRF." | "Por isso, todos seguem a Lei 14.133 e a LRF." |
| Cap. 1 | "Já as entidades... ao lado: foram criadas pelo dono" | "Por outro lado, as entidades... ao lado, pois foram criadas pelo dono" |
| Cap. 2 | "Sem o gasto previsto na LOA, o governo não pode comprar." | "Como o gasto precisa estar previsto na LOA, o governo não pode comprar o que não está nela." |
| Cap. 2 | "Quando o bolo chega, você confere..." | "Em seguida, quando o bolo chega, você confere..." |
| Cap. 3 | "O governo não pode: o dinheiro é de todos. Então ele precisa..." | "Com o dinheiro público, não é assim: o dinheiro é de todos. Por isso, o governo precisa..." |
| Cap. 3 | "O TJ-MT declarou a lei inconstitucional... porque valores e modalidades são norma geral" | "Como valores e modalidades são norma geral, de competência da União, o TJ-MT declarou a lei inconstitucional..." |
| Cap. 5 | "A fase preparatória é exatamente isso para o governo... Quase todos os problemas... nascem aqui." | "A fase preparatória é isso no governo... Por essa razão, quase todos os problemas... nascem aqui." |
| Cap. 5 | "se todas as propostas vierem muito acima... Se o governo estimar mal..." | "se todas as propostas vierem acima dele... Por isso, erro na estimativa esvazia a licitação ou faz o governo pagar caro demais." |
| Cap. 9 | "Os recursos... são analisados juntos" | "Ademais, os recursos... são analisados juntos" |
| Cap. 9 | "Deve ser registrada... A empresa pode se reabilitar." | "Além disso, deve ser registrada... Por fim, a empresa pode se reabilitar." |
| Cap. 10 | "Vale para todos: Executivo, Legislativo..." | "Dessa forma, ela vale para todos: Executivo, Legislativo..." |

### 3. Verificação

- PDF regerado com Edge headless (`--print-to-pdf`, A4, margens de 15 mm).
- 23 páginas, sem página em branco.
- Comandos usados para medir a ocupação das páginas: `pdftoppm -r 30 -gray -png` e leitura das linhas com pixel abaixo de 235.

---

## 04/11/2026 — Apostila do aluno: versão 2

### Arquivos
- `apostila/Apostila_do_Aluno.html` (novo)
- `apostila/Apostila_do_Aluno.pdf` (novo)
- `apostila/Apostila_do_Aluno_v1.html` e `apostila/Apostila_do_Aluno_v1.pdf` (versão 1, 14 páginas, preservada)

### Estrutura
14 capítulos, na ordem abaixo, com a divisão em quadros coloridos explicada na página "Como usar":

| Cor | Quadro | Função |
|---|---|---|
| roxo | Em palavras simples | a ideia com comparações do dia a dia |
| azul-petróleo | O que diz a lei | a regra técnica com o número do artigo |
| azul | Exemplo | caso prático, em geral de MT |
| laranja | Cuidado | erros comuns e pegadinhas de prova |
| verde | Mato Grosso | regra específica do Estado |

Capítulos: 1. Administração Pública · 2. Orçamento público · 3. O que é licitação e por que existe · 4. Modalidades, critérios e agentes · 5. Fase preparatória · 6. Fase externa · 7. Contratação direta · 8. Contrato administrativo · 9. Recursos, sanções e crimes · 10. LRF · 11. Controle e transparência · 12. Mato Grosso: quadro-resumo · 13. Comparativo 8.666 × 14.133 e glossário · 14. Atividades, respostas e links.

Recursos acrescentados na v2:
- "Teste-se" ao fim de cada capítulo, com respostas no capítulo 14.
- Glossário do "licitês" (adjudicar, homologar, licitação deserta ou fracassada, sobrepreço, superfaturamento, inexequível, entre outros) e lista de siglas.
- Tabela com os valores e prazos mais usados, com a fonte de cada um.
- Cerca de 25 exemplos práticos, em boa parte de MT: lâmpada LED pelo ciclo de vida, estudo técnico dos computadores, fracionamento na compra de material de limpeza, emergência verdadeira e emergência fabricada, empate ficto de micro e pequena empresa com números, cálculo do limite de despesa com pessoal de uma prefeitura.

### Conferência de números
Confrontados com o texto em Planalto e Assembleia de MT, com busca na internet para o que não vinha desses repositórios.

Confirmado:
- valores de 2026 do Decreto 12.807/2025, que corrigiu os valores em 4,41% pelo IPCA-E (Planalto, Zênite);
- nenhuma lei nova alterou o texto da 14.133 em 2025 ou 2026, apenas os valores (ConLicitação);
- regras de micro e pequena empresa da LC 123: exclusividade até R$ 80 mil, cota de 25%, empate de 10% (5% no pregão) e 5 dias úteis para regularizar (TCU);
- valores antigos da 8.666: R$ 33 mil e R$ 17,6 mil, do Decreto 9.412/2018 (Agência Brasil).

Corrigido ou acrescentado:
- MT regulamentou a 14.133 pelo Decreto estadual 1.525/2022, a cargo da SEPLAG (LegisWeb);
- MT tem 142 municípios desde a criação de Boa Esperança do Norte (Poder360);
- os valores da 8.666 passaram a aparecer datados ("valores de 2018");
- incluído o Radar do TCE-MT, usado por órgãos estaduais como fonte de pesquisa de preços (SEMA-MT);
- o exemplo de contagem de prazo passou a seguir a regra do art. 183 (exclui o dia da publicação, inclui o último dia), em vez de citar um dia exato.

Não confirmado, e registrado como pendência:
- teto de gastos de MT: não há registro de prorrogação do regime depois de 2022 (Comsefaz). A apostila diz apenas que ele valeu por 5 exercícios a partir de 2018, sem afirmar que continua;
- IN SEGES/ME 65/2021: continua sendo usada em documentos de 2026, mas não foi localizado o texto consolidado com as alterações.

---

## 04/11/2026 — Guia de MT do professor

### Arquivo
- `Peculiaridades_MT.md`

### Mudanças
- **Decreto estadual 1.525/2022** (regulamentação da Lei 14.133 no Executivo de MT, a cargo da SEPLAG, já alterado pelo Decreto 779/2024) passou a constar na apostila e no guia. O decreto não está no repositório: a orientação é consultar o texto consolidado no IOMAT (iomat.mt.gov.br).
- **142 municípios** no item sobre o TCE-MT, no lugar de "todos os municípios".

---

## 05/11/2026 — Aprofundamento dos sábados (Encontros 1 e 3)

### Motivo
Os sábados têm 8h de aula, e o conteúdo estava em nível de visão geral. Entraram temas que a Lei 14.133 e a ementa cobrem e que não estavam no curso, e foram aprofundados temas que tinham um slide só.

### Arquivos
- `slides/Encontro1_Sab_07-11.md` e `slides/Encontro3_Sab_28-11.md` (reescritos, mantendo o conteúdo anterior)
- `Cronograma_Aulas.md` (novos horários dos dois sábados e legislação de referência)
- `apostila/Apostila_do_Aluno.html` e `.pdf` (de 23 para 30 páginas; PDF regerado com Edge headless e perfil temporário)

### Encontro 1 (07/11): o que entrou
- Governo × administração; desconcentração × descentralização; consórcios públicos (Lei 11.107/2005; dispensa em dobro, art. 75, § 2º)
- Regime jurídico-administrativo; poderes administrativos; elementos do ato; anulação × revogação (Súmula 473 do STF; art. 71, §§ 2º e 3º)
- Agentes públicos; ordenador de despesa (DL 200, art. 80); responsabilidade do Estado (CF, art. 37, § 6º) e do agente (LINDB, art. 28; art. 10 da 14.133); esferas de responsabilização
- Orçamento: princípios, receitas correntes e de capital, classificação da despesa por natureza (Portaria STN/SOF 163/2001), créditos adicionais (Lei 4.320, arts. 40 a 46), mínimos de educação e saúde, contingenciamento, tipos de empenho (art. 60)
- Concessão comum × PPP; permissão
- Definições do art. 6º (comum × especial, obra × serviço de engenharia, sobrepreço × superfaturamento); governança (art. 11, parágrafo único)
- LINDB na prática; arts. 8º a 10; quem não pode participar (art. 14); consórcios e cooperativas (arts. 15 e 16)
- Concurso e leilão; regimes de execução (art. 46); procedimentos auxiliares (arts. 78 a 81, incluído o Sicx da Lei 15.266/2025); margem de preferência (art. 26)
- Atividades novas: classificar a despesa; caso "houve erro grosseiro?" (hipotético)

### Encontro 3 (28/11): o que entrou
- Orçamento sigiloso; inexequibilidade em obras (75% e garantia adicional abaixo de 85%) × bens e serviços
- Limites da habilitação (arts. 63, 64, 67 e 69) e Súmulas 247, 263, 272 e 289 do TCU
- Rito de concorrência com técnica e preço, leilão, concurso e diálogo competitivo; papéis no SRP
- Obras: SINAPI/SICRO, BDI, matriz de riscos (arts. 22 e 103), garantias e solidez
- PNCP ao vivo (15 min)
- Dispensa eletrônica (IN 67/2021 e IN 8/2023); Contrata+Brasil (IN 52/2025 e IN 460/2025); oficina de justificativa de contratação direta
- Subcontratação, recebimento, ordem cronológica, pagamento antecipado (arts. 122, 140 a 145); terceirização (art. 121; IN 176/2024); nulidades (arts. 147 a 150); meios alternativos (arts. 151 a 154)
- Dosimetria, processo sancionador, prescrição e reabilitação (arts. 156 a 163); Lei Anticorrupção e leniência (Lei MT 13.353/2026); improbidade após a Lei 14.230/2021; quadro "um fato, várias esferas"

### Caderno de legislação ampliado
- `Caderno_de_Legislacao.md`: incluídos os artigos novos dos dois sábados, com o texto extraído de `legislacao/`.
- Encontro 1: CF art. 37, § 6º; DL 200/67 art. 80; LINDB arts. 20, 21, 22, 24 e 28; Lei 4.320 arts. 11, 12, 40, 41 e 43; CF arts. 198, § 2º, e 212; LRF art. 9º; 14.133 arts. 9, 10, 14, 15, 16, 26, 30, 31, 32, 36, 37, 39, 46, 78 a 81 e 186; art. 6º (somente os incisos XII a XV, XXI, XXII, XXIX a XXXIII, LVI e LVII).
- Encontro 3: 14.133 arts. 22, 24, 63, 64, 67, 69, 121, 122, 140, 141, 143, 145, 147 a 154, 157 a 160 e 163; Lei 12.846 arts. 6º e 16; Lei 8.429 arts. 1º (§§ 1º a 3º e 8º), 10, 11 e 23.

### Slides: ajuste de transbordo de tela
- Todos os slides dos quatro encontros foram renderizados com Marp (imagens PNG) e medidos: 27 slides tinham conteúdo cortado na base da tela, entre eles vários que já vinham do material anterior.
- Correção: conteúdo dividido em dois slides (definições do art. 6º, princípios do art. 5º, LINDB, regimes de execução, prazos do art. 55) e textos enxugados nas tabelas.
- Para os slides que continuam densos, foi criada a classe CSS `compact` no front matter (fonte 24 px, tabelas 23 px), marcada slide a slide com `<!-- _class: compact -->`. Não há mais nenhum slide com corte.
- Contagem final: Encontro 1 com 93 slides, Encontro 2 com 24, Encontro 3 com 87 e Encontro 4 com 30.

### HTMLs de projeção
- Gerados os quatro arquivos HTML em `slides/`: `Encontro1_Sab_07-11.html`, `Encontro2_Dom_08-11.html`, `Encontro3_Sab_28-11.html` e `Encontro4_Dom_29-11.html`.
- Comando: `npx @marp-team/marp-cli --html --bespoke.osc=false --output slides/EncontroX.html slides/EncontroX.md`.
- `--bespoke.osc=false` remove a barra flutuante de navegação do Marp, que atrapalha na projeção. A navegação fica nas setas do teclado, Page Up/Page Down e tecla `F` para tela cheia.
- Os emojis (☕, ⚠️, ❓) vinham de um CDN e deixariam o arquivo dependente de internet. Os SVGs foram baixados e embutidos como `data:` URI, então os HTMLs funcionam offline.
- Sempre que um `.md` de `slides/` mudar, o HTML correspondente precisa ser gerado de novo.

### PDFs de projeção e de reserva
- Gerados também os quatro PDFs em `slides/`, com a mesma contagem de páginas dos slides (93, 24, 87 e 30).
- Comando: `npx @marp-team/marp-cli --pdf --browser edge --output slides/EncontroX.pdf slides/EncontroX.md`.
- O PDF embute os emojis e não depende de internet. Serve para projetar sem navegador e para impressão de reserva.
- O PDF é gerado do `.md`, e o HTML precisa do passo de embutir os emojis. Por isso os dois são gerados em momentos diferentes; ao alterar o conteúdo, refaça os dois.

### Conferências e correções feitas durante o trabalho
- Todos os artigos novos da 14.133, da Lei 4.320, da Lei 8.429, da Lei 12.846, da LINDB, das INs e das leis de MT foram conferidos nos textos de `legislacao/`.
- Obras e instalações é o elemento **51** (e não 44, que é o grupo de investimentos).
- A Lei MT 10.691/2018 trata do Programa de Integridade **Pública** (órgãos do Executivo), e não de exigência às empresas.
- Grande vulto federal citado com o valor de 2026 (R$ 261,97 mi), igual à apostila.
- Garantia adicional do art. 59, § 5º: citada sem cálculo numérico, porque há divergência sobre a base da diferença.

### Não conferido no repositório (fonte externa)
- Súmulas do TCU, Súmula 473 do STF, LC 141/2012, Leis 8.987/95, 11.079/04, 11.107/05 e 9.784/99, Portaria STN/SOF 163/2001, IN 52/2025 (texto original) e IN 67/2021. Os pontos citados são os dispositivos mais conhecidos dessas normas; vale conferir no texto oficial antes da aula.

---

## Arquivos do projeto

| Arquivo | Função |
|---|---|
| `Cronograma_Aulas.md` | cronograma dos 4 encontros, com as atividades de cada hora |
| `Ementa_Atualizada.md` | ementa e conteúdos programáticos já compatíveis com a 14.133 |
| `Caderno_de_Legislacao.md` | artigos-chave de cada encontro |
| `Peculiaridades_MT.md` | regras de Mato Grosso, organizadas por encontro |
| `apostila/Apostila_do_Aluno.html` | fonte da apostila do aluno |
| `apostila/Apostila_do_Aluno.pdf` | apostila do aluno, 30 páginas A4 |
| `apostila/Apostila_do_Aluno_v1.*` | versão anterior da apostila, preservada |
| `legislacao/` | textos das normas |
| `slides/` | material de projeção (fontes `.md` e HTMLs prontos para projetar) |
| `Registro_de_Trabalho.md` | este arquivo |

## Regras de redação adotadas no material

1. Sem travessões. Use vírgula, dois-pontos, parênteses ou frases separadas.
2. Sem adjetivos de valor. Descreva o fato em vez de qualificá-lo.
3. Conectivos após o ponto final, com variedade: não repetir o mesmo conectivo em trechos vizinhos.
4. Referência de lei sempre com o artigo, para conferência no material do aluno.
