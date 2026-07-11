export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'Angular' | 'JavaScript';
  techStack: readonly string[];
  live?: ProjectLink;
  repository?: ProjectLink;
  imagePath?: string;
  status?: 'Featured' | 'In Progress';
}