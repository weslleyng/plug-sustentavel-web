import { Injectable } from '@angular/core';

/**
 * Centraliza a URL do WhatsApp da Plug.
 * Troque aqui o número ou a mensagem padrão.
 */
@Injectable({ providedIn: 'root' })
export class WaService {
  readonly phone = '5592982862240';
  readonly message = 'Olá, quero saber mais sobre a Plug Sustentável';

  get url(): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
  }
}
