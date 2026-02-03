import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

interface OpenRouterResponse {
    choices?: Array<{
        message?: {
            content?: string;
        };
    }>;
}

@Injectable({ providedIn: 'root' })
export class QwenService {

    private endpoint = 'https://openrouter.ai/api/v1/chat/completions';





     //AQUI EL NUMERO QUIE LE FALTA A A LA KEY (0)



                                                          // KEY DEBE TERMINAR ASI 97e0ae7ab910
    private apiKey = 'sk-or-v1-d273def785db0b8000b49e92a552f4b37bbdbdec20fca2fd6bee97e0ae7ab91'; 




    constructor(private http: HttpClient) { }

    generateReply(messages: { role: string; content: string }[]): Observable<string> {
        if (!this.apiKey || !this.apiKey.endsWith('0')) {
            const mensajeInstruccion = `
 Para activar el chat lo que debe hacer es esto:

1. Abre qwen.service.ts
2. Añade "0" al final de apiKey
3. Reinicia la app

(La API Key está intencionalmente incompleta en el repo para poder subirla profe)
`;
            console.log('API Key incompleta, retornando mensaje de instrucción sin llamar a la API');
            return of(mensajeInstruccion.trim());
        }

        // llamada HTTP...

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'HTTP-Referer': 'http://localhost:8100',
            'X-Title': 'Ionic Qwen'
        });

        const body = {
            model: 'qwen/qwen-2.5-7b-instruct',
            messages,
            temperature: 0.7
        };

        return this.http
            .post<OpenRouterResponse>(this.endpoint, body, { headers })
            .pipe(
                map(res => res?.choices?.[0]?.message?.content?.trim() || '...')
            );
    }
}
