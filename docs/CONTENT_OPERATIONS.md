# CONTENT_OPERATIONS.md

## Adicionar aluno

1. criar avatar em `public/avatars/alunos/`;
2. adicionar registro em `data/students.json`;
3. conferir `classId`, badges e conquistas;
4. rodar `pnpm validate:data`;
5. rodar `pnpm build`.

## Adicionar turma

1. criar avatar em `public/avatars/turmas/`;
2. adicionar registro em `data/classes.json`;
3. atualizar alunos com o novo `classId`;
4. rodar validacao e build.

## Adicionar badge

1. criar icone em `public/badges/`;
2. adicionar registro em `data/badges.json`;
3. associar o id a alunos ou turmas;
4. rodar validacao e build.

## Cuidados

- nao duplicar `id` ou `slug`;
- nao referenciar assets inexistentes;
- nao publicar nome completo por padrao;
- documentar novas regras em `docs/GAMIFICATION_RULES.md`.

## Usar o painel do professor

1. acessar `/professor/`;
2. entrar com as credenciais operacionais definidas para o projeto;
3. configurar owner, repositorio, branch e token GitHub;
4. editar turmas, alunos, pontos, aura, badges ou conquistas;
5. clicar em `Salvar no GitHub`;
6. aguardar o workflow do GitHub Pages publicar a nova build.

O painel usa armazenamento local do navegador como rascunho entre edicoes. Limpar dados do navegador remove o rascunho e a configuracao local do token.
