export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  created_at: string;
  topics: string[];
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: "ai-ml" | "programming" | "tools";
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa?: string;
  coursework: string[];
  achievements: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skillsLearned: string[];
}

export interface ResearchInterest {
  title: string;
  description: string;
  keyConcepts: string[];
  glowingIcon: string;
}

export interface LeadershipItem {
  role: string;
  organization: string;
  period: string;
  description: string[];
  highlights: string[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface GitHubStats {
  repoCount: number;
  totalStars: number;
  languages: { name: string; percentage: number; color: string }[];
  contributionsCount: number;
  activityStreak: number;
}
