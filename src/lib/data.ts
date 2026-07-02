import achievementsJson from '../../data/achievements.json';
import badgesJson from '../../data/badges.json';
import classesJson from '../../data/classes.json';
import pointEventsJson from '../../data/point-events.json';
import seasonsJson from '../../data/seasons.json';
import studentsJson from '../../data/students.json';
import type { Achievement, Badge, SchoolClass, Student } from './types';

export const students = studentsJson as Student[];
export const schoolClasses = classesJson as SchoolClass[];
export const badges = badgesJson as Badge[];
export const achievements = achievementsJson as Achievement[];
export const pointEvents = pointEventsJson;
export const seasons = seasonsJson;

export const currentSeason = seasons.find((season) => season.isCurrent);

export const classById = new Map(schoolClasses.map((schoolClass) => [schoolClass.id, schoolClass]));
export const badgeById = new Map(badges.map((badge) => [badge.id, badge]));
export const achievementById = new Map(achievements.map((achievement) => [achievement.id, achievement]));

export function getPublicName(student: Student) {
  return student.nickname?.trim() || student.fullName;
}

export function getStudentClass(student: Student) {
  return classById.get(student.classId);
}
