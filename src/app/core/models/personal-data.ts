import { AboutMe } from "./about-me";
import { Education } from "./education";
import { Experience } from "./experience";
import { Skill } from "./skill";
import { SoftSkill } from "./soft-skill";

export interface PersonalData {
    aboutMe : AboutMe;
    experiences: Experience[];
    skills: Skill[]; 
    education : Education[];
    softSkills : SoftSkill[];
    socialLinks : { icon: string, link: string }[];
}
