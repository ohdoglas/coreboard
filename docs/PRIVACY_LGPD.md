# PRIVACY_LGPD.md

## Politica publica da V1

Publico no site:

- nickname;
- avatar;
- turma;
- pontos;
- badges;
- conquistas;
- posicao nos rankings.

Privado ou opcional:

- nome completo;
- idade exata;
- ano de nascimento;
- dados disciplinares ou comportamentais sensiveis.

## Decisao de produto

Perfis publicos usam `nickname` quando existir. Se o nickname estiver vazio, o site exibe `fullName`.

## Regra de minimizacao

Nao adicionar novos campos pessoais ao dataset sem atualizar este documento, os schemas e a validacao.

## Area do professor

A rota `/professor/` nao deve ser usada para publicar dados sensiveis. Como o projeto roda em GitHub Pages, qualquer dado salvo em `data/` fica publico no site gerado. O token GitHub deve ser informado apenas no navegador do professor e nunca deve ser commitado.
