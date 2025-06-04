import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { LightboxModule } from 'ngx-lightbox';




@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    LightboxModule
  ],
  exports: [
    ProjectsComponent
  ],
})
export class ProjectsModule { }
