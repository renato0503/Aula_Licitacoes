/**
 * Recebe as entregas das atividades do Encontro 2 e grava no Google Planilhas.
 * A página do formulário é atividades/encontro2.html.
 *
 * Como publicar:
 *  1. Em script.google.com, crie um projeto e cole este arquivo.
 *  2. Selecione a função "configurar", clique em Executar e autorize.
 *  3. Implantar > Nova implantação > App da Web.
 *     Executar como: Eu. Quem pode acessar: Qualquer pessoa.
 *  4. Copie a URL terminada em /exec para a constante ENDPOINT da página.
 *
 * Depois de alterar este código, publique em Implantar > Gerenciar implantações
 * > editar > Nova versão. Assim a URL continua a mesma.
 */

const PLANILHA_ID = '1JKyzoGyGuOVBllJCDDSpjdJ-tB3z3CFgtQDkE8Qa0To';
const NOME_ABA = 'Encontro 2 - Entregas';
const FUSO = 'America/Cuiaba';
const LIMITE_CARACTERES = 8000;

const CABECALHO_FIXO = ['Data/hora', 'Protocolo', 'ID do envio', 'Versão'];
const COL_PROTOCOLO = 2;
const COL_ID_ENVIO = 3;
const COL_EMAIL = 6;

// [nome do campo no formulário, título da coluna]. Nome e e-mail devem ser os primeiros.
const CAMPOS = [
  ['nome', 'Nome'],
  ['email', 'E-mail'],

  ['a1_problema', 'A1 - Problema a resolver'],
  ['a1_alternativas', 'A1 - Soluções alternativas'],
  ['a1_solucao', 'A1 - Solução escolhida e justificativa'],
  ['a1_elementos_etp', 'A1 - Elementos obrigatórios do ETP'],
  ['a1_parcelamento', 'A1 - Lote único ou parcelar'],
  ['a1_parcelamento_justificativa', 'A1 - Por quê (parcelamento)'],
  ['a1_fontes_precos', 'A1 - Fontes da pesquisa de preços'],
  ['a1_modalidade', 'A1 - Modalidade'],
  ['a1_criterio', 'A1 - Critério de julgamento'],
  ['a1_risco1', 'A1 - Risco 1'],
  ['a1_risco1_responsavel', 'A1 - Quem assume o risco 1'],
  ['a1_risco2', 'A1 - Risco 2'],
  ['a1_risco2_responsavel', 'A1 - Quem assume o risco 2'],
  ['a1_risco3', 'A1 - Risco 3'],
  ['a1_risco3_responsavel', 'A1 - Quem assume o risco 3'],
  ['a1_mitigacao', 'A1 - Como mitigar um dos riscos'],

  ['a2_link', 'A2 - Link do edital'],
  ['a2_orgao', 'A2 - Órgão'],
  ['a2_objeto', 'A2 - Objeto'],
  ['a2_modalidade', 'A2 - Modalidade'],
  ['a2_criterio', 'A2 - Critério de julgamento'],
  ['a2_elementos_edital', 'A2 - Elementos do edital (art. 25)'],
  ['a2_etp_tr', 'A2 - ETP e TR'],
  ['a2_hab_juridica', 'A2 - Habilitação jurídica'],
  ['a2_hab_tecnica', 'A2 - Habilitação técnica'],
  ['a2_hab_fiscal', 'A2 - Habilitação fiscal, social e trabalhista'],
  ['a2_hab_economica', 'A2 - Habilitação econômico-financeira'],
  ['a2_ponto', 'A2 - Ponto restritivo ou questionável'],
  ['a2_ponto_porque', 'A2 - Por quê (ponto questionável)'],
];

/** Execute uma vez pelo editor: autoriza o acesso e cria a aba de entregas. */
function configurar() {
  const aba = obterAba_();
  console.log('Aba pronta: ' + aba.getName());
}

function doGet() {
  return responder_({ ok: true, servico: 'Entregas do Encontro 2' });
}

function doPost(e) {
  let dados;
  try {
    dados = JSON.parse(e.postData.contents);
  } catch (erro) {
    return responder_({ ok: false, erro: 'Os dados enviados não puderam ser lidos.' });
  }

  const problemas = validar_(dados);
  if (problemas.length) {
    return responder_({ ok: false, erro: 'Revise os campos indicados.', campos: problemas });
  }

  const trava = LockService.getScriptLock();
  if (!trava.tryLock(30000)) {
    return responder_({ ok: false, erro: 'Muitos envios ao mesmo tempo. Tente novamente em instantes.' });
  }
  try {
    return responder_(gravar_(dados));
  } catch (erro) {
    console.error(erro);
    return responder_({ ok: false, erro: 'Não foi possível gravar sua entrega. Tente novamente.' });
  } finally {
    trava.releaseLock();
  }
}

function validar_(dados) {
  const problemas = [];
  if (!dados || typeof dados !== 'object') return ['Dados do formulário'];

  CAMPOS.forEach(function (campo) {
    const valor = dados[campo[0]];
    if (typeof valor !== 'string' || !valor.trim() || valor.length > LIMITE_CARACTERES) {
      problemas.push(campo[1]);
    }
  });
  if (typeof dados.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email.trim())) {
    problemas.push('E-mail (formato inválido)');
  }
  if (typeof dados.a2_link === 'string' && !/^https?:\/\/\S+$/i.test(dados.a2_link.trim())) {
    problemas.push('A2 - Link do edital (endereço inválido)');
  }
  if (typeof dados.envioId !== 'string' || !/^[a-z0-9]{8,64}$/i.test(dados.envioId)) {
    problemas.push('Identificador do envio');
  }
  return problemas;
}

function gravar_(dados) {
  const aba = obterAba_();
  const email = dados.email.trim().toLowerCase();
  const agora = new Date();
  let versao = 1;

  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha > 1) {
    const anteriores = aba.getRange(2, 1, ultimaLinha - 1, COL_EMAIL).getValues();
    for (let i = 0; i < anteriores.length; i++) {
      // O mesmo envio chegou de novo (ex.: a resposta anterior se perdeu na rede).
      if (anteriores[i][COL_ID_ENVIO - 1] === dados.envioId) {
        return { ok: true, protocolo: anteriores[i][COL_PROTOCOLO - 1], versao: anteriores[i][3], repetido: true };
      }
      if (String(anteriores[i][COL_EMAIL - 1]).trim().toLowerCase() === email) versao++;
    }
  }

  const protocolo = 'E2-' + Utilities.getUuid().slice(0, 8).toUpperCase();
  const dataHora = Utilities.formatDate(agora, FUSO, 'dd/MM/yyyy HH:mm:ss');
  const respostas = CAMPOS.map(function (campo) {
    return campo[0] === 'email' ? textoSeguro_(email) : textoSeguro_(dados[campo[0]].trim());
  });

  aba.appendRow([dataHora, protocolo, dados.envioId, versao].concat(respostas));
  return { ok: true, protocolo: protocolo, versao: versao, dataHora: dataHora };
}

function obterAba_() {
  const planilha = SpreadsheetApp.openById(PLANILHA_ID);
  let aba = planilha.getSheetByName(NOME_ABA);
  if (!aba) aba = planilha.insertSheet(NOME_ABA);

  if (aba.getLastRow() === 0) {
    const cabecalho = CABECALHO_FIXO.concat(CAMPOS.map(function (campo) { return campo[1]; }));
    aba.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]).setFontWeight('bold');
    aba.setFrozenRows(1);
    aba.hideColumns(COL_ID_ENVIO);
  }
  return aba;
}

// Respostas iniciadas por =, +, - ou @ seriam interpretadas como fórmula pela planilha.
function textoSeguro_(texto) {
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function responder_(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
