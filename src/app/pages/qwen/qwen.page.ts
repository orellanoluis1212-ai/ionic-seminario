import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { QwenService } from 'src/app/services/qwen.service';
import { RouterLink } from '@angular/router';


type ChatMsg = { from: 'user' | 'bot'; text: string };

type OpenRouterRole = 'user' | 'assistant';

interface OpenRouterMessage {
  role: OpenRouterRole;
  content: string;
}

@Component({
  selector: 'app-qwen',
  templateUrl: './qwen.page.html',
  styleUrls: ['./qwen.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink,]
})
export class QwenPage {

  input = '';
  sending = false;

  messages: ChatMsg[] = [
    { from: 'bot', text: 'Hola, soy tu asistente IA. ¿En qué te ayudo? ' }

  ];

  conversation: OpenRouterMessage[] = [
    { role: 'assistant', content: 'Hola, ¿en qué te puedo ayudar?' }
  ];

  constructor(private chat: QwenService) { }

  send() {
  const text = this.input.trim();
  if (!text || this.sending) return;

  this.sending = true;
  this.input = '';

  this.messages.push({ from: 'user', text });

  this.conversation.push({
    role: 'user',
    content: text
  });

  this.chat
    .generateReply(this.conversation)
    .pipe(finalize(() => (this.sending = false)))
    .subscribe({
      next: (reply) => {
        const safeReply = (reply ?? '').trim() || '...';
        this.messages.push({
          from: 'bot',
          text: safeReply
        });

        this.conversation.push({
          role: 'assistant',
          content: safeReply
        });
      },
      error: (err) => {
        console.error(err);
        console.error('STATUS:', err.status);
        console.error('FULL ERROR:', err);
        console.error('OPENROUTER MESSAGE:', err.error?.error?.message);
        const msg = 'ERROR llamando al CHAT API. Revisa la consola.';
        this.messages.push({ from: 'bot', text: msg });

        this.conversation.push({
          role: 'assistant',
          content: msg
        });
      }
    });
}


  trackByIndex(i: number) {
    return i;
  }
}
