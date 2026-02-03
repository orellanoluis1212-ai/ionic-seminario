import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar, IonButton } from "@ionic/angular/standalone";
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonHeader, IonContent, IonTitle, IonToolbar, IonButton, RouterLink],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
