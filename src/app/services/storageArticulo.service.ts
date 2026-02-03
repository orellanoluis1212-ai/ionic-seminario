import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class StorageArticuloService {

  private storageReady!: Storage;
  private STORAGE_KEY = 'lista_articulos';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this.storageReady = await this.storage.create();
  }

  async obtenerArticulos(): Promise<any[]> {
    return (await this.storageReady.get(this.STORAGE_KEY)) || [];
  }

  async guardarArticulo(articulo: any) {
    const lista = await this.obtenerArticulos();
    lista.push(articulo);
    await this.storageReady.set(this.STORAGE_KEY, lista);
  }

  async eliminarTodos() {
    await this.storageReady.remove(this.STORAGE_KEY);
  }
}
