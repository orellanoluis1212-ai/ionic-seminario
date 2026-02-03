import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonText
 } from '@ionic/angular/standalone';

import { Registro, StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    RouterLink,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonText
  ]
})
export class ListadoUsuarioComponent  implements OnInit {
  registros: Registro[] = [];
  cargando = true;

  constructor(private storageSvc: StorageService) { }

  async ngOnInit() {
    await this.cargar();
  }
  async ionViewWillEnter() {
    await this.cargar();
  }

  async cargar(){
    this.cargando = true;
    this.registros = await this.storageSvc.getRegistros();
    this.cargando = false;
  }

  async borrarTodo(){
    this.cargando = true;
    await this.storageSvc.clearRegistros();
    await this.cargar();
  }
  confirmacion() {
  if (confirm('¿Seguro que deseas borrar todos los registros?')) {
    this.borrarTodo();
  }
}

}