import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { Project } from '../core/models/project';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projects: any[] | null = null;
  
  constructor(
    private dataService: DataService,
    private lightbox: Lightbox,
    private lightboxConfig: LightboxConfig
  ) {
    // Configure lightbox defaults
    this.lightboxConfig.fadeDuration = 0.3;
    this.lightboxConfig.resizeDuration = 0.3;
    this.lightboxConfig.fitImageInViewPort = true;
    this.lightboxConfig.positionFromTop = 50;
    this.lightboxConfig.showImageNumberLabel = true;
    this.lightboxConfig.alwaysShowNavOnTouchDevices = true;
    this.lightboxConfig.wrapAround = true;
    this.lightboxConfig.disableKeyboardNav = false;
  }

  ngOnInit() {
    this.dataService.getProjects().subscribe((data: any) => {
      this.projects = data.projects || [];
      console.log('Projects loaded:', this.projects);
    });
  }

  openProject(projectId: number): void {
    const project = this.projects?.find((p) => p?.id === projectId);
    console.log('Opening project album:', project);
    
    if (project) {
      const album: { src: string; caption?: string; thumb: string }[] = [];

      if (project.images && project.images.length > 0) {
        project.images.forEach((img: { src: string; caption?: string }) => {
          album.push({
            src: img.src,
            caption: img.caption || project.title,
            thumb: img.src 
          });
        });
      }
      console.log('Opening project album:', album);

      this.lightbox.open(album, 0);
    }
  }

  closeLightbox(): void {
    this.lightbox.close();
  }
}
