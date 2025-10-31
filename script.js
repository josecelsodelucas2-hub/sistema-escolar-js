// ====== Estado ======
let alunos = []; // [{id, nome, notas: number[]}]
const STORAGE_KEY = "gestao_notas_alunos_v2";

// ====== Utilidades ======
const salvar = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
const carregar = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    alunos = raw ? JSON.parse(raw) : [];
  } catch {
    alunos = [];
  }
};

const media = (arr) => {
  if (!arr.length) return 0;
  let soma = 0;
  for (const n of arr) soma += n; // laço
  return soma / arr.length;
};

const situacaoPorMedia = (m) => (m >= 7 ? "Aprovado" : "Reprovado");

// ====== DOM helpers ======
const el = (sel) => document.querySelector(sel);
const tbody = () => el("#alunosTable tbody");
const alunoSelect = () => el("#alunoSelect");

// ====== Renderização ======
function renderSelect() {
  const sel = alunoSelect();
  sel.innerHTML = "";
  if (alunos.length === 0) {
    const op = document.createElement("option");
    op.value = "";
    op.textContent = "Cadastre um aluno";
    sel.appendChild(op);
    return;
  }
  alunos.forEach((a, i) => {
    const op = document.createElement("option");
    op.value = a.id;
    op.textContent = a.nome;
    if (i === 0 && !sel.value) op.selected = true;
    sel.appendChild(op);
  });
}

function renderTabela() {
  const corpo = tbody();
  corpo.innerHTML = "";

  alunos.forEach((aluno) => {
    const tr = document.createElement("tr");

    // Nome
    const tdNome = document.createElement("td");
    tdNome.textContent = aluno.nome;

    // Notas (chips removíveis)
    const tdNotas = document.createElement("td");
    if (aluno.notas.length === 0) {
      tdNotas.innerHTML = `<span class="hint">Sem notas</span>`;
    } else {
      aluno.notas.forEach((n, idx) => {
        const chip = document.createElement("span");
        chip.className = "nota-chip";
        chip.innerHTML = `${n.toFixed(2)} <button title="Remover nota" data-action="rm-nota" data-id="${aluno.id}" data-idx="${idx}">x</button>`;
        tdNotas.appendChild(chip);
      });
    }

    // Média
    const m = media(aluno.notas);
    const tdMedia = document.createElement("td");
    tdMedia.textContent = m.toFixed(2);

    // Situação
    const tdSit = document.createElement("td");
    const sit = situacaoPorMedia(m);
    tdSit.innerHTML =
      sit === "Aprovado"
        ? `<span class="badge ok">Aprovado</span>`
        : `<span class="badge fail">Reprovado</span>`;

    // Ações
    const tdAcoes = document.createElement("td");
    tdAcoes.innerHTML = `
      <button data-action="rm-aluno" data-id="${aluno.id}" class="danger">Remover</button>
    `;

    tr.append(tdNome, tdNotas, tdMedia, tdSit, tdAcoes);
    corpo.appendChild(tr);
  });
}

// ====== Relatório ======
function gerarRelatorio() {
  const box = el("#relatorio");
  if (alunos.length === 0) {
    box.innerHTML = `<p>Nenhum aluno cadastrado.</p>`;
    return;
  }

  // cálculos com laços e condições
  let totalNotas = 0;
  let qtdNotas = 0;
  let aprovados = 0;
  let reprovados = 0;
  let melhor = null; // {nome, media}
  let pior = null;

  for (const a of alunos) {
    const m = media(a.notas);
    if (m >= 7) aprovados++; else reprovados++;
    totalNotas += a.notas.reduce((acc, n) => acc + n, 0);
    qtdNotas += a.notas.length;

    if (melhor === null || m > melhor.media) melhor = { nome: a.nome, media: m };
    if (pior === null || m < pior.media) pior = { nome: a.nome, media: m };
  }

  const mediaGeral = qtdNotas ? totalNotas / qtdNotas : 0;

  box.innerHTML = `
    <div class="grid">
      <div class="metric"><b>Alunos</b>${alunos.length}</div>
      <div class="metric"><b>Aprovados</b>${aprovados}</div>
      <div class="metric"><b>Reprovados</b>${reprovados}</div>
      <div class="metric"><b>Média Geral das Notas</b>${mediaGeral.toFixed(2)}</div>
      <div class="metric"><b>Melhor Média</b>${melhor ? `${melhor.media.toFixed(2)} — ${melhor.nome}` : '—'}</div>
      <div class="metric"><b>Pior Média</b>${pior ? `${pior.media.toFixed(2)} — ${pior.nome}` : '—'}</div>
    </div>
  `;
}

// ====== Ações ======
function addAluno() {
  const nome = el("#nomeAluno").value.trim();
  if (!nome) {
    alert("Informe o nome do aluno.");
    return;
  }
  const novo = { id: crypto.randomUUID(), nome, notas: [] };
  alunos.push(novo);
  salvar();
  el("#nomeAluno").value = "";
  renderSelect();
  renderTabela();
}

function addNota() {
  const id = alunoSelect().value;
  const valor = Number(el("#notaInput").value);
  if (!id) {
    alert("Selecione um aluno.");
    return;
  }
  if (Number.isNaN(valor) || valor < 0 || valor > 10) {
    alert("Digite uma nota válida entre 0 e 10.");
    return;
  }
  const aluno = alunos.find(a => a.id === id);
  aluno.notas.push(Number(valor.toFixed(2)));
  salvar();
  el("#notaInput").value = "";
  renderTabela();
}

function removerAluno(id) {
  alunos = alunos.filter(a => a.id !== id);
  salvar();
  renderSelect();
  renderTabela();
  gerarRelatorio();
}

function removerNota(id, idx) {
  const a = alunos.find(x => x.id === id);
  if (!a) return;
  a.notas.splice(Number(idx), 1);
  salvar();
  renderTabela();
  gerarRelatorio();
}

// Exportar CSV
function exportarCSV() {
  if (alunos.length === 0) {
    alert("Nada para exportar.");
    return;
  }
  // Cabeçalho: Nome, Notas (separadas por |), Média, Situação
  const linhas = [["Nome","Notas","Média","Situação"]];
  for (const a of alunos) {
    const m = media(a.notas);
    linhas.push([a.nome, a.notas.join(" | "), m.toFixed(2), situacaoPorMedia(m)]);
  }
  const csv = linhas.map(l => l.map(c => `"${String(c).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "relatorio_notas.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Limpar todos os dados
function limparTudo() {
  if (!confirm("Tem certeza que deseja limpar todos os dados?")) return;
  alunos = [];
  salvar();
  renderSelect();
  renderTabela();
  el("#relatorio").innerHTML = `<p>Dados limpos.</p>`;
}

// ====== Inicialização ======
function bind() {
  el("#btnAddAluno").addEventListener("click", addAluno);
  el("#btnAddNota").addEventListener("click", addNota);
  el("#btnGerarRelatorio").addEventListener("click", gerarRelatorio);
  el("#btnExportarCSV").addEventListener("click", exportarCSV);
  el("#btnLimparTudo").addEventListener("click", limparTudo);

  // Delegação de eventos para remover aluno / nota
  el("#alunosTable").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;
    if (action === "rm-aluno") {
      removerAluno(btn.dataset.id);
    } else if (action === "rm-nota") {
      removerNota(btn.dataset.id, btn.dataset.idx);
    }
  });
}

(function start(){
  carregar();
  bind();
  renderSelect();
  renderTabela();
})();