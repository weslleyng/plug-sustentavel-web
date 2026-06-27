import { Component } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { ManifestoComponent } from '../../components/manifesto/manifesto.component';
import { ServicesComponent } from '../../components/services/services.component';
import { ProcessComponent } from '../../components/process/process.component';
import { ProjetosComponent } from '../../components/projetos/projetos.component';
import { ValueComponent } from '../../components/value/value.component';
import { VoicesComponent } from '../../components/voices/voices.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ClosingComponent } from '../../components/closing/closing.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavComponent,
    HeroComponent,
    ManifestoComponent,
    ServicesComponent,
    ProcessComponent,
    ProjetosComponent,
    ValueComponent,
    VoicesComponent,
    FaqComponent,
    ClosingComponent,
    FooterComponent,
  ],
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
