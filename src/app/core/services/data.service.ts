import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,from} from 'rxjs';
import { map } from 'rxjs/operators'; 

import emailjs from 'emailjs-com';
import { Project } from '../models/project';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { PersonalData } from '../models/personal-data';
import { AboutMe } from '../models/about-me';
import { Experience } from '../models/experience';
import { Skill } from '../models/skill';
import { Education } from '../models/education';
import { SoftSkill } from '../models/soft-skill';
import { SocialLink } from '../models/social-link';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private firestore: Firestore) { }


  getPersonalData(): Observable<PersonalData | null> {
    return from(getDocs(collection(this.firestore, 'personal-data'))).pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null;
        }
        const doc = querySnapshot.docs[0]; // Assume single document
        const data = doc.data();

        // Validate required fields
        if (
          data['aboutMe'] &&
          Array.isArray(data['experiences']) &&
          Array.isArray(data['skills']) &&
          Array.isArray(data['education']) &&
          Array.isArray(data['softSkills'])
        ) {
          const personalData: PersonalData = {
            aboutMe: data['aboutMe'] as AboutMe,
            experiences: data['experiences'] as Experience[],
            skills: data['skills'] as Skill[],
            education: data['education'] as Education[],
            softSkills: data['softSkills'] as SoftSkill[],
            socialLinks: data['socialLinks']  as SocialLink[]
          };
          return personalData;
        }

        console.error('Invalid data structure in Firestore document:', doc.id, data);
        throw new Error('Firestore data does not match PersonalData interface');
    
      })
    );
  }

  getProjects(): Observable<any | null> {
    return from(getDocs(collection(this.firestore, 'projects'))).pipe(
      map(querySnapshot => {
        if (querySnapshot.empty) {
          return null;
        }
        const firstDoc = querySnapshot.docs[0];
        return { ...firstDoc.data() };
      })
    );
  }



  sendEmail(emailData: any){
    const serviceID = 'service_wjd1mra';
    const templateID = 'template_rjdmx0f';
    const publicKey = 'BkauPDpN-ToyYm6u7';

    return emailjs.send(serviceID, templateID, emailData, publicKey)
  } 
}
