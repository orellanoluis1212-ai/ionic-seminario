//USUARIOS
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";

export type Registro = {
    nombre: string;
    correo: string;
    pais: string;
    fechaNacimiento: string;
    genero: string;
    notificaciones: boolean;
    biografia: string;
    terminos: boolean;
    createdAt: string;
}

@Injectable({ providedIn: 'root'})
export class StorageService{
    private _storage?: Storage;
    private readonly KEY = 'registros';

    constructor(private storage: Storage){}

    async init(): Promise<void>{
        if (this._storage) return;
        this._storage = await this.storage.create();
    }

    async addRegistro(data: Omit<Registro, 'createdAt'>): Promise<void>{
        await this.init();
        const registros = (await this._storage!.get(this.KEY)) as Registro[] | null;

        const nuevo: Registro = {
            ...data,
            createdAt: new Date().toISOString()
        };

        const actualizados = registros ? [nuevo,...registros] : [nuevo];
        await this._storage?.set(this.KEY,actualizados)
    }

    async getRegistros(): Promise<Registro[]>{
        await this.init();
        return ((await this._storage!.get(this.KEY)) as Registro[] | null) ?? [];
    }

    async clearRegistros(): Promise<void>{
        await this.init();
        await this._storage!.remove(this.KEY);
    }
}