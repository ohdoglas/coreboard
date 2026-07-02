# TEST_PLAN.md

## Validacao obrigatoria

- `pnpm validate:data`
- `pnpm check`
- `pnpm build`

## O que validar manualmente

- dashboard carrega metricas;
- ranking de alunos ordena corretamente;
- ranking de turmas usa score normalizado;
- busca filtra por nickname e turma;
- perfil do aluno exibe badges, conquistas, progresso e vizinhos;
- links e assets funcionam com `BASE_PATH`.
- painel do professor aceita login, edita rascunhos e salva JSON no GitHub via API.

## Futuras camadas de teste

- testes unitarios para ranking;
- teste de acessibilidade;
- smoke test com Playwright;
- regressao visual das telas principais.
