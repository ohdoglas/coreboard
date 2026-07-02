import { classById } from './data';
import type { RankedClass, RankedStudent, SchoolClass, Student } from './types';

export function getLevel(points: number) {
  return Math.max(1, Math.floor(points / 100) + 1);
}

export function getNextLevelPoints(points: number) {
  return Math.ceil((points + 1) / 100) * 100;
}

export function rankStudents(students: Student[]): RankedStudent[] {
  return [...students]
    .filter((student) => student.isPublicProfile !== false)
    .sort((a, b) => b.pointsTotal - a.pointsTotal || b.aura - a.aura)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
      className: classById.get(student.classId)?.name ?? 'Turma nao informada',
      level: getLevel(student.pointsTotal),
      nextLevelPoints: getNextLevelPoints(student.pointsTotal)
    }));
}

export function getClassScore(schoolClass: SchoolClass, students: Student[]) {
  const classStudents = students.filter((student) => student.classId === schoolClass.id);
  const pointsTotal = classStudents.reduce((sum, student) => sum + student.pointsTotal, 0);
  const aura = classStudents.reduce((sum, student) => sum + student.aura, 0);
  const activeStudents = classStudents.length;
  const avgPointsPerStudent = activeStudents > 0 ? Math.round(pointsTotal / activeStudents) : 0;
  const normalizedScore = Math.round(avgPointsPerStudent * 0.8 + aura * 0.2);
  return { activeStudents, pointsTotal, aura, avgPointsPerStudent, normalizedScore };
}

export function rankClasses(schoolClasses: SchoolClass[], students: Student[]): RankedClass[] {
  return schoolClasses
    .map((schoolClass) => ({
      ...schoolClass,
      ...getClassScore(schoolClass, students)
    }))
    .sort((a, b) => b.normalizedScore - a.normalizedScore || b.pointsTotal - a.pointsTotal)
    .map((schoolClass, index) => ({
      ...schoolClass,
      rank: index + 1
    }));
}

export function getNeighbors(ranking: RankedStudent[], slug: string, radius = 1) {
  const index = ranking.findIndex((student) => student.slug === slug);
  if (index < 0) return [];
  return ranking.slice(Math.max(0, index - radius), index + radius + 1);
}
