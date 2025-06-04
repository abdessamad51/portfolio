import { Component, OnInit,Input, SimpleChanges } from '@angular/core';
import { AboutMe } from 'src/app/core/models/about-me';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit { 
    @Input() aboutMe: AboutMe | null = null;
    isOpen: boolean = false;
    isLoading: boolean = true;

    
    ngOnInit() {
    }

   
    downloadCV(){
      const link = document.createElement('a');
      link.href = 'assets/files/abdessamad-rami.pdf'; // Path to your CV file
      link.download = 'abdesssamad_rami.pdf'; // Name of the downloaded file
      link.click();
    }


  toggleDetails() {
    this.isOpen = !this.isOpen;
    console.log(this.aboutMe);
  }
}
