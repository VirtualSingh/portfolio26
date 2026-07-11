export interface SkillCategory {
  name: string;
  proficiency: number;
  items: readonly SkillItem[];
}

export interface SkillItem {
  label: string;
  icon: string;
}