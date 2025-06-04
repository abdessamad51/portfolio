import { DataService } from 'src/app/core/services/data.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  submitted = false;
  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      this.dataService.sendEmail(this.contactForm.value).then(() => {
        alert('Email sent successfully!');
        this.contactForm.reset();
        this.submitted = false;
      }, (err) => {
        alert('Failed to send email. Error: ' + JSON.stringify(err));
      });
    }
  }
}
