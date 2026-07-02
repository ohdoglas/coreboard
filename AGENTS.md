# AGENTS.md

## Visao geral

Este repositorio contem o coreboard, um dashboard escolar gamificado hospedado no GitHub Pages. O sistema e estatico, mas o painel do professor pode persistir dados diretamente no repositorio via GitHub API.

## Stack obrigatoria

- Astro + TypeScript
- Dados em JSON versionado
- JSON Schema + Ajv para validacao
- Deploy com GitHub Actions no GitHub Pages
- Sem backend, banco de dados, upload publico ou autenticacao nesta fase

## Restricoes arquiteturais

- O site deve funcionar como conteudo estatico.
- Nao usar recursos que exijam servidor Node em producao.
- Toda logica de ranking deve ser deterministica e reproduzivel por build.
- Toda alteracao em dados deve passar por validacao de schema antes do deploy.
- Rotas e assets devem funcionar quando publicados em subpasta do GitHub Pages.

## Regras de dados

- Alunos usam `id`, `slug`, `fullName`, `nickname`, `avatarPath`, `classId`, `pointsTotal`, `aura`, conquistas e badges.
- Turmas usam `id`, `slug`, `name`, `avatarPath`, pontos, conquistas, badges e stats.
- Badges, conquistas e eventos de pontos sao entidades separadas.
- Nao exibir nome completo ou idade publicamente por padrao.
- Preferir nickname quando existir; caso contrario exibir nome completo.

## Regras de UX

- Tema escuro com alto contraste.
- Fundo base: `#00060D`.
- Destaques: `#13DCF2`, `#29A678`, `#72F285`, `#AEF249`.
- Texto em superficies verdes ou lime deve ser escuro.
- Valorizar evolucao, constancia e colaboracao, nao apenas primeiro lugar.

## Comandos

```bash
pnpm install
pnpm validate:data
pnpm check
pnpm build
pnpm dev
```

## Definition of Done

Uma tarefa so esta pronta quando:

1. o codigo compila;
2. o build estatico funciona;
3. os dados passam na validacao;
4. a navegacao principal funciona;
5. a UI respeita contraste e paleta;
6. ranking, busca e perfil nao quebram.
