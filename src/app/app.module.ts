import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ContactModule,
    CoreModule,
      ProjectsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
