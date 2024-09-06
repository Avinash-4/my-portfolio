import { RefObject } from "react";

export interface IPageRefs {
  introRef: RefObject<HTMLElement>;
  aboutRef: RefObject<HTMLElement>;
  careerRef: RefObject<HTMLElement>;
  skillsRef: RefObject<HTMLElement>;
  projectsRef: RefObject<HTMLElement>;
  contactRef: RefObject<HTMLElement>;
}

type PageKey = "about" | "career" | "skills" | "projects" | "contact";

type PageInfo = {
  title: string;
  description: string;
};

export interface IPageInfo extends Record<PageKey, PageInfo> {}

export interface ICareerItem {
  id: number;
  orgLogo: string;
  orgBGLogo: string;
  orgName: string;
  orgPosition: string;
  orgTenure: string;
  location: string;
}

export type ISkills = ISkill[];

export type ExperienceType = "relative" | "fixed";

export type ISkill = IRelativeSkill | IFixedSkill;
export interface IRelativeSkill {
  id: string;
  techName: string;
  icon: string;
  description: string;
  projectsCount: number;
  skillLevelPercentage: number;
  isActive: boolean;
  experienceType: "relative";
  startDate: string;
  displayOrder: number;
}

export interface IFixedSkill {
  id: string;
  techName: string;
  icon: string;
  description: string;
  projectsCount: number;
  skillLevelPercentage: number;
  isActive: boolean;
  experienceType: "fixed";
  startDate: string;
  endDate: string;
  displayOrder: number;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  projectLink: string;
  githubLink: string;
  image: string;
  logo: string;
  gif: string;
}

export interface IProjectDict {
  [key: string]: IProject;
}

export interface IContactLink {
  id: string;
  label: string;
  socialId: string;
  link: string;
  icon: string;
}
export interface ISocialLink {
  id: string;
  label: string;
  socialId: string;
  link: string;
  icon: string;
}
