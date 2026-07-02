# ARCHITECTURE.md

## Stack

Astro + TypeScript, com dados JSON versionados e build estatico para GitHub Pages. A persistencia operacional do painel do professor usa GitHub API para commitar os arquivos em `data/`.

## Fluxo

1. editar arquivos em `data/`;
2. validar com `pnpm validate:data`;
3. rodar `pnpm build`;
4. publicar por GitHub Actions.

## Pastas

- `src/pages`: rotas estaticas.
- `src/components`: componentes reutilizaveis.
- `src/lib`: regras puras de dados, ranking e formatacao.
- `src/styles`: tokens e estilos globais.
- `data`: dataset versionado.
- `schemas`: JSON Schemas.
- `public`: assets estaticos.
- `docs`: documentacao operacional.

## GitHub Pages

O workflow define `BASE_PATH` como o nome do repositorio para que links e assets funcionem quando publicados em `https://usuario.github.io/repositorio/`.

## Dashboard do professor

A rota `/professor/` funciona como painel operacional estatico com persistencia via GitHub API.

Fluxo:

1. entrar no painel;
2. configurar owner, repositorio, branch e token GitHub com permissao de Contents read/write;
3. editar turmas, alunos, badges e conquistas;
4. clicar em `Salvar no GitHub`;
5. o painel commita `data/students.json`, `data/classes.json`, `data/badges.json` e `data/achievements.json`;
6. o workflow do GitHub Pages publica a nova build.

O token nunca deve ser colocado no codigo. Ele fica apenas no navegador do professor.
