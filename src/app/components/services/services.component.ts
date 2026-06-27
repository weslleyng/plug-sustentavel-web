import { Component, inject } from '@angular/core';
import { WaService } from '../../shared/wa.service';

@Component({
  selector: 'app-services',
  standalone: true,
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  protected readonly wa = inject(WaService);
}
