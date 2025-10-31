# Sistema Escolar JS

Aplicação web simples para **gestão de notas de vários alunos** usando **HTML, CSS e JavaScript**.  
Permite cadastrar alunos, adicionar/remover notas, calcular média automaticamente, exibir situação (Aprovado/Reprovado), gerar relatório e exportar CSV. Os dados persistem no navegador via `localStorage`.

## 🚀 Demo (GitHub Pages)
Depois de ativar o GitHub Pages neste repositório, seu projeto ficará disponível em:
```
https://SEU_USUARIO.github.io/sistema-escolar-js/
```
> Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

## ✨ Funcionalidades
- Cadastro de alunos
- Inserção e remoção de notas por aluno
- Cálculo automático da média por aluno
- Situação: **Aprovado** (≥ 7) | **Reprovado** (< 7)
- Relatório com totais, melhor e pior média, média geral
- Exportação em **CSV**
- Persistência com **localStorage**
- Interface responsiva e moderna

## 📁 Estrutura
```
sistema-escolar-js/
├── index.html     # Estrutura da página
├── style.css      # Estilos (dark moderno)
└── script.js      # Lógica (condicionais, laços e funções)
```

## 🧑‍💻 Como rodar localmente
1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador (duplo clique já funciona).
   - Dica: use uma extensão tipo **Open in Browser** no VS Code.

## ☁️ Publicar no GitHub Pages
1. Vá em **Settings → Pages**.
2. Em **Source**, escolha **Deploy from a branch**.
3. Selecione **Branch: main** e **/ (root)**. Salve.
4. Aguarde o link ser gerado (pode levar alguns segundos).

## 🧾 Comandos Git (passo a passo)
> Execute dentro da pasta do projeto:

```bash
# 1) inicializa o repositório
git init

# 2) adiciona tudo e cria o primeiro commit
git add .
git commit -m "feat: versão inicial do Sistema Escolar JS"

# 3) conecta ao GitHub
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/sistema-escolar-js.git

# 4) envia os arquivos
git push -u origin main
```

## 🧪 Checklist rápido
- [ ] Consigo cadastrar alunos
- [ ] Consigo adicionar/remover notas
- [ ] Média e situação atualizam corretamente
- [ ] Relatório é gerado
- [ ] Exportação CSV cria arquivo válido
- [ ] Dados persistem após recarregar a página

## 🛠️ Tecnologias
- HTML5
- CSS3
- JavaScript (ES6+)

## 📜 Licença
Este projeto está sob a licença MIT. Veja **LICENSE** para mais detalhes.
