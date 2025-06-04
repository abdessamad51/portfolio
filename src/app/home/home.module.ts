import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { RouterModule } from '@angular/router'; 



@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ],
})
export class HomeModule { }
