import { Component, inject } from '@angular/core';
import { WaService } from '../../shared/wa.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  protected readonly waHref = inject(WaService).urlFor(
    'Olá, quero começar um diagnóstico com a Plug Sustentável',
  );
}
