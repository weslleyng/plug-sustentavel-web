import { Injectable } from '@angular/core';

/**
 * Centraliza a URL do WhatsApp da Plug.
 * Troque aqui o número ou a mensagem padrão.
 */
@Injectable({ providedIn: 'root' })
export class WaService {
  readonly phone = '5592982862240';
  readonly message = 'Olá, quero saber mais sobre a Plug Sustentável';

  /** Builds a wa.me URL with a custom pre-filled message. */
  urlFor(message: string): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
  }

  get url(): string {
    return this.urlFor(this.message);
  }
}
