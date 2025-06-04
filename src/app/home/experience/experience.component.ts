import { Component,Input} from '@angular/core';
import { Experience } from 'src/app/core/models/experience';
// import { Exprience } from 'src/app/core/models/exprience';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent{
  @Input() experiences:Experience[] = [];
  readMoreText:boolean = false;

  readMore(paragraph: HTMLParagraphElement,event? : Event) {
    const button = event?.target as HTMLElement;
    if(button.textContent == "Read More") {
      button.textContent = "Show less";
      paragraph.style.display = 'block'
    } else {
      button.textContent = "Read More";
      paragraph.style.display = 'none'
    }
  }
}
