import { Component, OnInit } from '@angular/core';
import { DataService } from '../core/services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PersonalData } from '../core/models/personal-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = true;
  error = false;
  personalData : PersonalData | null = null;

  constructor(private dataService:DataService,private sanitizer: DomSanitizer) {  
  }
 
  ngOnInit() {
    this.isLoading = true;
    this.dataService.getPersonalData().subscribe({
      next: (data) => {
        this.personalData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = true;
        this.isLoading = false;
        console.error('Error loading personal data:', error);
      }
    });
  }

  getSafeIcon(icon: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }
}
