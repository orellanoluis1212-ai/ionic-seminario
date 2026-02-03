import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonContent, IonTitle, IonToolbar, 
  IonButton, IonItem, IonLabel, IonText, 
  IonSelect, IonSelectOption, IonNote,
  IonInput, IonDatetime, IonCheckbox, IonTextarea, IonToggle, 
} from "@ionic/angular/standalone";
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StorageArticuloService } from 'src/app/services/storageArticulo.service';

@Component({
  standalone: true,
  selector: 'app-registro-articulo',
  templateUrl: './registro-articulo.page.html',
  styleUrls: ['./registro-articulo.page.scss'],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterModule,
    IonHeader, 
    IonContent, 
    IonTitle, 
    IonToolbar, 
    IonButton, 
    IonItem, 
    IonLabel,  
    IonText, 
    IonSelect, 
    IonSelectOption, 
    IonNote,
    IonInput, 
    IonDatetime, 
    IonCheckbox, 
    IonTextarea, IonToggle,
  ]
})
export class RegistroPage {

  enviado = false;

  categorias = [
    'Tecnología',
    'Ropa',
    'Alimentos',
    'Accesorios'
  ];

  formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    precio: [null, [Validators.required, Validators.min(1)]],
    categoria: ['', Validators.required],
    fechaIngreso: ['', Validators.required],
    disponible: [true],
    descripcion: [''],
    confirmar: [false, Validators.requiredTrue]
  });

  constructor(
    private fb: FormBuilder,
    private storageService: StorageArticuloService,
    private router: Router
  ) {}

  async registrar() {
    this.enviado = true;

    if (this.formulario.invalid) {
      return;
    }

    await this.storageService.guardarArticulo(this.formulario.value);
    this.formulario.reset();
    this.enviado = false;
    this.router.navigate(['/listado-articulo']);
  }
}
