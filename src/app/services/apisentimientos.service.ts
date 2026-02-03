import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiSentimientosService {

  private apiUrl = '/api/api/v1/';

  constructor(private http: HttpClient) {}

  analizarTexto(texto: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      text: texto
    });
  }
}
