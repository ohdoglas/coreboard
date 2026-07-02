export type Student = {
  id: string;
  slug: string;
  fullName: string;
  nickname?: string;
  avatarPath: string;
  classId: string;
  isPublicProfile?: boolean;
  pointsTotal: number;
  aura: number;
  achievements: string[];
  badges: string[];
};

export type SchoolClass = {
  id: string;
  slug: string;
  name: string;
  avatarPath: string;
};

export type Badge = {
  id: string;
  name: string;
  category: string;
  description: string;
  iconPath: string;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  points: number;
  aura: number;
  type: 'individual' | 'class' | 'mixed';
};

export type RankedStudent = Student & {
  rank: number;
  className: string;
  level: number;
  nextLevelPoints: number;
};

export type RankedClass = SchoolClass & {
  rank: number;
  activeStudents: number;
  pointsTotal: number;
  aura: number;
  avgPointsPerStudent: number;
  normalizedScore: number;
};
