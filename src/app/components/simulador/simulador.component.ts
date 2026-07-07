import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaService } from '../../shared/wa.service';

interface Faixa {
  readonly id: string;
  readonly label: string;
  readonly economiaLabel: string;
}

interface Tipo {
  readonly id: string;
  readonly label: string;
  readonly paybackLabel: string;
}

interface Fase {
  readonly id: string;
  readonly label: string;
}

/** Faixas de conta de luz — economia ancorada em ~90% de cobertura do teto da faixa. */
const FAIXAS: readonly Faixa[] = [
  { id: 'ate-1k', label: 'Até R$ 1.000', economiaLabel: 'até R$ 900/mês' },
  { id: '1k-5k', label: 'R$ 1.000 – R$ 5.000', economiaLabel: 'até R$ 4.500/mês' },
  { id: '5k-15k', label: 'R$ 5.000 – R$ 15.000', economiaLabel: 'até R$ 13.500/mês' },
  { id: '15k-50k', label: 'R$ 15.000 – R$ 50.000', economiaLabel: 'até R$ 45.000/mês' },
  { id: 'acima-50k', label: 'Acima de R$ 50.000', economiaLabel: 'até 95% da conta' },
];

/** Payback ancorado nos cases reais publicados na página (projetos.component.ts). */
const TIPOS: readonly Tipo[] = [
  { id: 'residencial', label: 'Residencial', paybackLabel: '2,5 a 4 anos' },
  { id: 'comercio', label: 'Comércio / Escritório', paybackLabel: '2,5 a 4 anos' },
  { id: 'industria', label: 'Indústria / Galpão', paybackLabel: '3 a 5 anos' },
  { id: 'rural', label: 'Rural / Agronegócio', paybackLabel: '3 a 5 anos' },
  { id: 'publico', label: 'Poder público', paybackLabel: 'projeto sob consulta' },
];

const FASES: readonly Fase[] = [
  { id: 'agora', label: 'Quero contratar agora' },
  { id: 'orcando', label: 'Estou orçando / comparando' },
  { id: 'pesquisando', label: 'Só pesquisando' },
];

interface Estimativa {
  readonly economiaLabel: string;
  readonly paybackLabel: string;
  readonly reducao: string;
}

@Component({
  selector: 'app-simulador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './simulador.component.html',
  styleUrl: './simulador.component.css',
})
export class SimuladorComponent {
  protected readonly wa = inject(WaService);

  protected readonly faixas = FAIXAS;
  protected readonly tipos = TIPOS;
  protected readonly fases = FASES;

  protected readonly step = signal<1 | 2>(1);

  protected readonly conta = signal<Faixa | null>(null);
  protected readonly tipo = signal<Tipo | null>(null);
  protected readonly fase = signal<Fase | null>(null);

  protected readonly nome = signal('');
  protected readonly whatsapp = signal('');
  protected readonly email = signal('');
  protected readonly empresa = signal('');
  protected readonly submetido = signal(false);

  protected readonly estimativa = computed<Estimativa | null>(() => {
    const conta = this.conta();
    const tipo = this.tipo();
    if (!conta || !tipo) {
      return null;
    }
    return {
      economiaLabel: conta.economiaLabel,
      paybackLabel: tipo.paybackLabel,
      reducao: 'até 95%',
    };
  });

  protected readonly podeAvancar = computed(() => this.conta() !== null && this.tipo() !== null);

  protected readonly nomeValido = computed(() => this.nome().trim().length > 1);
  protected readonly whatsappValido = computed(
    () => this.whatsapp().replace(/\D/g, '').length >= 10,
  );
  protected readonly podeEnviar = computed(() => this.nomeValido() && this.whatsappValido());

  protected selecionarConta(faixa: Faixa): void {
    this.conta.set(faixa);
  }

  protected selecionarTipo(tipo: Tipo): void {
    this.tipo.set(tipo);
  }

  protected selecionarFase(fase: Fase): void {
    this.fase.set(fase);
  }

  protected avancar(): void {
    if (this.podeAvancar()) {
      this.step.set(2);
      this.moverFoco('sim-result');
    }
  }

  protected voltar(): void {
    this.step.set(1);
    this.moverFoco('sim-step1');
  }

  /** Moves focus to the freshly mounted step so keyboard/SR users are not dropped to <body>. */
  private moverFoco(id: string): void {
    setTimeout(() => document.getElementById(id)?.focus(), 0);
  }

  protected enviar(): void {
    this.submetido.set(true);
    if (!this.podeEnviar()) {
      return;
    }
    window.open(this.wa.urlFor(this.montarMensagem()), '_blank', 'noopener');
  }

  /** Builds the pre-filled WhatsApp message the lead taps to send to Plug. */
  private montarMensagem(): string {
    const estimativa = this.estimativa();
    const linhas: string[] = [
      'Olá! Fiz a simulação no site e quero meu estudo detalhado.',
      '',
      `Nome: ${this.nome().trim()}`,
      `WhatsApp: ${this.whatsapp().trim()}`,
    ];
    if (this.empresa().trim()) {
      linhas.push(`Empresa: ${this.empresa().trim()}`);
    }
    if (this.email().trim()) {
      linhas.push(`E-mail: ${this.email().trim()}`);
    }
    linhas.push(
      '',
      `Conta de luz: ${this.conta()?.label ?? '—'}`,
      `Tipo: ${this.tipo()?.label ?? '—'}`,
      `Fase: ${this.fase()?.label ?? '—'}`,
    );
    if (estimativa) {
      linhas.push(
        '',
        'Estimativa do site:',
        `- Economia: ${estimativa.economiaLabel}`,
        `- Payback: ${estimativa.paybackLabel}`,
        `- Redução: ${estimativa.reducao}`,
      );
    }
    return linhas.join('\n');
  }
}
