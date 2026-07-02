import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const readJson = (path) => JSON.parse(readFileSync(join(root, path), 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

const collections = [
  ['data/students.json', 'schemas/student.schema.json', 'students'],
  ['data/classes.json', 'schemas/class.schema.json', 'classes'],
  ['data/badges.json', 'schemas/badge.schema.json', 'badges'],
  ['data/achievements.json', 'schemas/achievement.schema.json', 'achievements'],
  ['data/point-events.json', 'schemas/point-event.schema.json', 'pointEvents'],
  ['data/seasons.json', 'schemas/season.schema.json', 'seasons']
];

let failed = false;
const loaded = {};

for (const [dataPath, schemaPath, key] of collections) {
  const data = readJson(dataPath);
  const schema = readJson(schemaPath);
  const validate = ajv.compile(schema);
  loaded[key] = data;

  data.forEach((item, index) => {
    if (!validate(item)) {
      failed = true;
      console.error(`Invalid ${dataPath}[${index}] (${item.id ?? 'sem id'}):`);
      console.error(validate.errors);
    }
  });
}

const uniqueBy = (items, field, label) => {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item[field])) {
      failed = true;
      console.error(`Duplicate ${label}.${field}: ${item[field]}`);
    }
    seen.add(item[field]);
  }
};

uniqueBy(loaded.students, 'id', 'student');
uniqueBy(loaded.students, 'slug', 'student');
uniqueBy(loaded.classes, 'id', 'class');
uniqueBy(loaded.classes, 'slug', 'class');
uniqueBy(loaded.badges, 'id', 'badge');
uniqueBy(loaded.achievements, 'id', 'achievement');

const classIds = new Set(loaded.classes.map((item) => item.id));
const badgeIds = new Set(loaded.badges.map((item) => item.id));
const achievementIds = new Set(loaded.achievements.map((item) => item.id));

const ensureAsset = (assetPath, owner) => {
  const relativePath = assetPath.replace(/^\//, '');
  if (!existsSync(join(root, 'public', relativePath))) {
    failed = true;
    console.error(`Missing asset for ${owner}: public/${relativePath}`);
  }
};

for (const student of loaded.students) {
  if (!classIds.has(student.classId)) {
    failed = true;
    console.error(`Student ${student.id} references missing classId ${student.classId}`);
  }
  student.badges.forEach((id) => {
    if (!badgeIds.has(id)) {
      failed = true;
      console.error(`Student ${student.id} references missing badge ${id}`);
    }
  });
  student.achievements.forEach((id) => {
    if (!achievementIds.has(id)) {
      failed = true;
      console.error(`Student ${student.id} references missing achievement ${id}`);
    }
  });
  ensureAsset(student.avatarPath, `student ${student.id}`);
}

for (const schoolClass of loaded.classes) {
  schoolClass.badges.forEach((id) => {
    if (!badgeIds.has(id)) {
      failed = true;
      console.error(`Class ${schoolClass.id} references missing badge ${id}`);
    }
  });
  schoolClass.achievements.forEach((id) => {
    if (!achievementIds.has(id)) {
      failed = true;
      console.error(`Class ${schoolClass.id} references missing achievement ${id}`);
    }
  });
  ensureAsset(schoolClass.avatarPath, `class ${schoolClass.id}`);
}

loaded.badges.forEach((badge) => ensureAsset(badge.iconPath, `badge ${badge.id}`));

const currentSeasons = loaded.seasons.filter((season) => season.isCurrent);
if (currentSeasons.length !== 1) {
  failed = true;
  console.error(`Expected exactly one current season, found ${currentSeasons.length}`);
}

if (failed) {
  process.exit(1);
}

console.log('Data validation passed.');
