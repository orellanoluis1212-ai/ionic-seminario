import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder,ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { IonHeader,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
  IonSelectOption,IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText } from '@ionic/angular/standalone';
import {Router, RouterLink } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss'],
  imports: [IonHeader,CommonModule,ReactiveFormsModule,IonToolbar,IonTitle,IonContent,IonList,IonItem,IonLabel,IonInput,IonSelect,
    IonSelectOption,IonDatetime,IonRadio,IonRadioGroup,IonToggle,IonTextarea,IonCheckbox,IonButton,IonText,RouterLink,
  ]
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  enviado = false;
  guardadoOK = false;
  

  constructor(private fb: FormBuilder, private storageSvc: StorageService, private router: Router) { 
    this.registroForm = this.fb.group({
      nombre: ['',[Validators.required,Validators.minLength(3)]],
      correo: ['',[Validators.required,Validators.email]],
      pais: [null,[Validators.required]],
      fechaNacimiento: [null,[Validators.required]],
      genero: [null,[Validators.required]],
      notificaciones: [true],
      biografia: ['', [Validators.maxLength(200)]],
      terminos: [false, [Validators.requiredTrue]]
    })
  }

  get f(){
    return this.registroForm.controls;
  }

  async onSubmit() {
    this.enviado = true;
    this.guardadoOK = false;
    
    if(this.registroForm.invalid){
      this.registroForm.markAllAsTouched();
      return;
    }
    
    await this.storageSvc.addRegistro(this.registroForm.value);
    this.guardadoOK = true;
    this.router.navigate(['/listado-usuario'])
  }
}
