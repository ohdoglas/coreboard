# coreboard

Dashboard escolar gamificado para alunos, turmas, pontos, aura, badges e conquistas.

## Stack

- Astro + TypeScript
- JSON versionado em `data/`
- JSON Schema + Ajv para validar os dados
- GitHub Actions + GitHub Pages
- Painel do professor com persistencia via GitHub API

## Comandos

```bash
pnpm install
pnpm validate:data
pnpm dev
pnpm build
```

## Rotas

- `/` dashboard central
- `/ranking-alunos/` ranking de alunos
- `/ranking-turmas/` ranking de turmas
- `/busca/` busca local por aluno
- `/professor/` painel do professor
- `/alunos/[slug]/` perfil publico do aluno

## Operacao

O painel do professor edita os dados e salva diretamente no GitHub usando um token informado no navegador. O token nao deve ser commitado.
