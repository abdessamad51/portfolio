import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Skill } from 'src/app/core/models/skill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent{

  constructor(private sanitizer: DomSanitizer) {  
  }
  @Input() skills:Skill[] = [];
  expriences = []
  categories: string[] = ['Frontend', 'Backend', 'Tools'];

 

  getSkillsByCategory(category: string) {
    return this.skills.filter(skill => skill.category === category);
  }
  
  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
