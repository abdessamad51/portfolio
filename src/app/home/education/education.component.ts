import { Component,Input } from '@angular/core';
import { Education } from 'src/app/core/models/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent{

  @Input() educations:Education[]  = [];
  
  test:{class:string,color:string}[] = [{
    class : 'firstbox' ,
    color : 'bg-pink'
  },{
    class : 'secondbox' ,
    color : 'bg-yellow'
  },{
    class : 'thirdbox' ,  
    color : 'bg-orange'
  }];

 

}
