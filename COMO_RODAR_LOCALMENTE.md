# Como rodar o projeto localmente

Este guia explica como abrir e continuar o projeto em outro computador.

## 1. Pre-requisitos

Instale:

- Git
- Node.js 22.13 ou superior
- pnpm

Para conferir:

```bash
git --version
node --version
pnpm --version
```

Se o `pnpm` nao estiver instalado:

```bash
npm install -g pnpm
```

No Windows PowerShell, se `pnpm` der erro de politica de execucao, use `pnpm.cmd`:

```powershell
pnpm.cmd --version
pnpm.cmd install
pnpm.cmd dev
```

## 2. Baixar o projeto

Se o projeto ja estiver no GitHub:

```bash
git clone URL_DO_REPOSITORIO
cd NOME_DA_PASTA
```

Se voce copiar a pasta manualmente para outro computador, entre nela pelo terminal:

```bash
cd CAMINHO/DA/PASTA/ALUNOS_DASHBOARD
```

## 3. Instalar dependencias

Na raiz do projeto, rode:

```bash
pnpm install
```

Se o pnpm pedir aprovacao de builds de dependencias:

```bash
pnpm approve-builds --all
pnpm install
```

## 4. Rodar localmente

```bash
pnpm dev
```

Abra no navegador:

```text
http://127.0.0.1:4321/
```

Rotas principais:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/ranking-alunos/`
- `http://127.0.0.1:4321/ranking-turmas/`
- `http://127.0.0.1:4321/busca/`
- `http://127.0.0.1:4321/professor/`

## 5. Painel do professor

Acesse:

```text
http://127.0.0.1:4321/professor/
```

Use as credenciais operacionais do projeto.

O painel permite editar dados no navegador e salvar diretamente no GitHub usando um token informado pelo professor.

Fluxo correto:

1. configurar owner, repositorio, branch e token no painel;
2. editar no painel;
3. clicar em `Salvar no GitHub`;
4. aguardar o GitHub Actions publicar a nova build.

## 6. Validar dados

Sempre que alterar arquivos em `data/`, rode:

```bash
pnpm validate:data
```

Esse comando verifica:

- ids duplicados;
- slugs duplicados;
- turma inexistente;
- badge inexistente;
- conquista inexistente;
- asset ausente em `public/`;
- temporada atual.

## 7. Gerar build de producao

Antes de publicar ou commitar uma entrega importante:

```bash
pnpm build
```

Esse comando roda:

- validacao dos dados;
- checagem do Astro/TypeScript;
- build estatico.

O resultado final fica em:

```text
dist/
```

## 8. Estrutura importante

```text
data/                 dados editaveis do sistema
schemas/              regras de validacao dos JSON
src/pages/            paginas e rotas do Astro
src/components/       componentes reutilizaveis
src/lib/              regras de ranking, dados e formatacao
src/styles/           CSS global e componentes
public/               avatares, badges e assets estaticos
docs/                 documentacao do projeto
.github/workflows/   validacao e deploy no GitHub Pages
```

## 9. Comandos mais usados

```bash
pnpm install
pnpm dev
pnpm validate:data
pnpm check
pnpm build
```

## 10. Problemas comuns

### Node antigo

Se aparecer erro dizendo que o Astro nao suporta sua versao do Node, instale Node.js 22.13 ou superior.

No Windows, uma forma simples e usar `winget`:

```powershell
winget install OpenJS.NodeJS.LTS
```

Feche e abra o PowerShell novamente, depois confira:

```powershell
node --version
```

O projeto deve usar Node `v22.13.0` ou superior.

### PowerShell bloqueando pnpm.ps1

Se aparecer este erro:

```text
pnpm.ps1 nao pode ser carregado porque a execucao de scripts foi desabilitada neste sistema
```

Use o executavel `.cmd`:

```powershell
pnpm.cmd --version
pnpm.cmd install
pnpm.cmd dev
```

Opcionalmente, voce pode liberar scripts apenas para o usuario atual:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Depois disso, feche e abra o PowerShell. Se nao quiser alterar politica do Windows, continue usando `pnpm.cmd`.

### Porta 4321 ocupada

Rode em outra porta:

```bash
pnpm dev -- --port 4322
```

Depois abra:

```text
http://127.0.0.1:4322/
```

### Erro de dependencias nativas no pnpm

Rode:

```bash
pnpm approve-builds --all
pnpm install
```

### Erro `packages field missing or empty`

Esse erro acontece em versoes novas do pnpm quando `pnpm-workspace.yaml` nao declara os pacotes do workspace.

O arquivo deve conter:

```yaml
packages:
  - .

onlyBuiltDependencies:
  - esbuild
  - sharp
```

### Dados quebrando o build

Rode:

```bash
pnpm validate:data
```

Leia a mensagem do terminal. Ela normalmente aponta o arquivo, o registro e o campo com problema.

## 11. Publicacao no GitHub Pages

O projeto ja possui workflows em `.github/workflows/`.

Depois que o repositorio estiver no GitHub:

1. envie para a branch `main`;
2. ative GitHub Pages usando GitHub Actions;
3. o workflow `deploy.yml` gera e publica o site.

## 12. Observacao sobre seguranca

O projeto foi pensado para GitHub Pages, que e hospedagem estatica. Portanto:

- nao existe backend local em producao;
- o painel do professor e uma ferramenta operacional de edicao/exportacao;
- dados sensiveis nao devem ser publicados;
- CRUD persistente com login seguro exige backend futuro.
