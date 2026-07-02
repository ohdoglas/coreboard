# DATA_MODEL.md

## Entidades

- `Student`
- `SchoolClass`
- `Badge`
- `Achievement`
- `PointEvent`
- `Season`

## Invariantes

- `id` e `slug` de aluno devem ser unicos.
- `id` e `slug` de turma devem ser unicos.
- todo `classId` de aluno deve existir em `classes.json`.
- todo badge referenciado deve existir em `badges.json`.
- toda conquista referenciada deve existir em `achievements.json`.
- todo asset referenciado deve existir em `public/`.
- deve existir exatamente uma temporada atual.

## Student

- `id`: obrigatorio e unico.
- `slug`: obrigatorio e unico.
- `fullName`: obrigatorio.
- `nickname`: opcional.
- `avatarPath`: obrigatorio.
- `classId`: obrigatorio e deve existir em `classes.json`.
- `pointsTotal`: pontos normais do ranking.
- `aura`: pontos sociais do meme/aura.
- `badges`: ids de badges.
- `achievements`: ids de conquistas.

## Nivel

O nivel e derivado de `pointsTotal`. A cada 100 pontos o aluno sobe um nivel, com nivel minimo 1.
