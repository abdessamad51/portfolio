import { Component,Renderer2  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  title = 'portfolio';

   constructor(private renderer: Renderer2) {}

  
  toggleMenu(){ 
    const body = document.body;
    if (body.classList.contains('port_menu_open')) {
      this.renderer.removeClass(body, 'port_menu_open');
    } else {
      this.renderer.addClass(body, 'port_menu_open');
    }
  }
}
