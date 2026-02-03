import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { StorageArticuloService } from 'src/app/services/storageArticulo.service';

@Component({
  standalone: true,
  selector: 'app-listado',
  templateUrl: './listado-articulo.page.html',
  styleUrls: ['./listado-articulo.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ListadoPage {

  articulos: any[] = [];

  constructor(
    private storageArticuloService: StorageArticuloService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.cargar();
  }

  async cargar() {
    this.articulos = await this.storageArticuloService.obtenerArticulos();
  }

  async confirmarBorrado() {
    const alerta = await this.alertCtrl.create({
      header: 'Eliminar registros',
      message: '¿Desea borrar todos los artículos almacenados?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.storageArticuloService.eliminarTodos();
            this.articulos = [];
          }
        }
      ]
    });

    await alerta.present();
  }
}
