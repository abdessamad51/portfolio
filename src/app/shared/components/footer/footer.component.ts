import { Component, OnInit } from '@angular/core';
import { AboutMe } from 'src/app/core/models/about-me';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit{

  aboutMe:AboutMe | null = null;
   constructor(private dataService:DataService) {
         
    }
    
    ngOnInit() {
      // this.dataService.getAboutMe().subscribe((data:AboutMe) => {
      //   this.aboutMe = data;
      // });
    }
}
