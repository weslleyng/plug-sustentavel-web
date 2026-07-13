import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { WaService } from '../../shared/wa.service';

interface ProjectImage {
  src: string; // optimized .webp for display
  thumb: string; // optimized -thumb.webp for the gallery strip
  alt: string;
}

interface Metric {
  value: string;
  label: string;
}

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: Metric[];
  images: ProjectImage[]; // first image is the primary one
}

const ASSET = '/assets/projetos';

// Builds the optimized webp paths produced by `npm run images` from a base path
// (e.g. 'camara/image1' -> src '…/camara/image1.webp', thumb '…/camara/image1-thumb.webp').
function img(path: string, alt: string): ProjectImage {
  return { src: `${ASSET}/${path}.webp`, thumb: `${ASSET}/${path}-thumb.webp`, alt };
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  templateUrl: './projetos.component.html',
  styleUrl: './projetos.component.css',
})
export class ProjetosComponent implements OnDestroy {
  protected readonly wa = inject(WaService);

  protected readonly projects: Project[] = [
    {
      id: 'fazendinha',
      tag: 'Indústria · Eficiência energética',
      title: 'Fazendinha',
      description:
        'Cabine de medição e proteção primária em 13,8 kV, usina solar de 226,98 kWp e banco de capacitores automático de 120 kvar. Modernização completa da alimentação das cargas industriais e administrativas.',
      metrics: [
        { value: '226,98 kWp', label: 'Potência instalada' },
        { value: '120 kvar', label: 'Correção de fator' },
        { value: 'R$ 20 mil/mês', label: 'Economia estimada' },
        { value: '4 anos', label: 'Payback' },
      ],
      images: [
        img(
          'projeto-fazendinha/projeto1',
          'Fazendinha — cabine de medição e usina solar em 13,8 kV',
        ),
        img(
          'projeto-fazendinha/projeto2',
          'Fazendinha — vista da instalação fotovoltaica industrial',
        ),
      ],
    },
    {
      id: 'comercial',
      tag: 'Comercial · Geração distribuída',
      title: 'Instalação Comercial',
      description:
        'Instalação de 200 módulos fotovoltaicos dimensionada para a demanda do estabelecimento, com retorno do investimento em apenas 30 meses.',
      metrics: [
        { value: '200 módulos', label: 'Sistema fotovoltaico' },
        { value: 'R$ 10 mil/mês', label: 'Geração estimada' },
        { value: '2,5 anos', label: 'Payback' },
      ],
      images: [
        img('industrial/image', 'Instalação comercial — 200 módulos fotovoltaicos'),
        img('industrial/image1', 'Instalação comercial — cobertura com módulos fotovoltaicos'),
      ],
    },
    {
      id: 'residencial-hibrido',
      tag: 'Residencial · Backup com baterias',
      title: 'Residencial Híbrido',
      description:
        'Sistema solar híbrido de 24,57 kWp com 10 kW de inversores autônomos e banco de baterias de 14,4 kWh. Mantém as cargas emergenciais por até 12 horas sem geração — e indefinidamente com o sol do dia. Dispensa gerador.',
      metrics: [
        { value: '24,57 kWp', label: 'Potência total' },
        { value: '14,4 kWh', label: 'Banco de baterias' },
        { value: '12 h', label: 'Autonomia sem sol' },
        { value: 'R$ 2.100/mês', label: 'Geração estimada' },
        { value: '4 anos', label: 'Payback' },
      ],
      images: [
        img('residencial/image1', 'Residencial híbrido — sistema solar com banco de baterias'),
        img('residencial/image2', 'Residencial híbrido — inversores e armazenamento de energia'),
      ],
    },
    {
      id: 'residencial-42',
      tag: 'Residencial · Alto consumo',
      title: 'Residencial 42 kWp',
      description:
        'Sistema residencial de 42,12 kWp dimensionado para alto consumo, com retorno do investimento em 30 meses.',
      metrics: [
        { value: '42,12 kWp', label: 'Potência total' },
        { value: 'R$ 3.500/mês', label: 'Geração estimada' },
        { value: '2,5 anos', label: 'Payback' },
      ],
      images: [
        img('residencial2/image1', 'Residencial de alto consumo — sistema solar de 42 kWp'),
        img('residencial2/image2', 'Residencial de alto consumo — módulos na cobertura'),
        img(
          'residencial2/image3',
          'Residencial de alto consumo — vista da instalação fotovoltaica',
        ),
      ],
    },
    {
      id: 'camara',
      tag: 'Poder público · Grande porte',
      title: 'Câmara Municipal de Manaus',
      description:
        'Usina de 1.428 módulos fotovoltaicos para o poder público, com 785,40 kWp de potência total e geração estimada de 77.500 kWh por mês.',
      metrics: [
        { value: '1.428 módulos', label: 'Sistema fotovoltaico' },
        { value: '785,40 kWp', label: 'Potência total' },
        { value: '77.500 kWh/mês', label: 'Geração estimada' },
      ],
      images: [
        img('camara/image1', 'Câmara Municipal de Manaus — usina solar de 785 kWp'),
        img('camara/image2', 'Câmara Municipal de Manaus — módulos fotovoltaicos instalados'),
        img('camara/image3', 'Câmara Municipal de Manaus — vista aérea da usina'),
        img('camara/image4', 'Câmara Municipal de Manaus — detalhe da instalação'),
      ],
    },
  ];

  // Track with clones on both ends for a seamless infinite loop:
  // [lastClone, ...projects, firstClone]
  protected readonly slides: Project[] = [
    this.projects[this.projects.length - 1],
    ...this.projects,
    this.projects[0],
  ];

  protected readonly index = signal(1); // 0 and length+1 are clones
  protected readonly animate = signal(false);
  protected readonly offset = signal(0); // translateX in px
  protected readonly selected = signal<Record<string, number>>({});

  private readonly viewport = viewChild<ElementRef<HTMLElement>>('viewport');
  private readonly trackEl = viewChild<ElementRef<HTMLElement>>('track');

  private timer: ReturnType<typeof setInterval> | null = null;
  private settleTimer: ReturnType<typeof setTimeout> | null = null;
  private transitioning = false;
  private io: IntersectionObserver | null = null;
  private inView = true;
  private reduced = false;
  private dragging = false;
  private startX = 0;

  constructor() {
    afterNextRender(() => {
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.recompute();
      requestAnimationFrame(() => this.animate.set(true));
      window.addEventListener('resize', this.onResize, { passive: true });
      document.addEventListener('visibilitychange', this.onVisibility);
      const vp = this.viewport()?.nativeElement;
      if (vp) {
        this.io = new IntersectionObserver(
          ([entry]) => {
            this.inView = entry.isIntersecting;
            this.inView ? this.start() : this.stop();
          },
          { threshold: 0.25 },
        );
        this.io.observe(vp);
      } else {
        this.start();
      }
    });
  }

  ngOnDestroy(): void {
    this.stop();
    if (this.settleTimer !== null) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
    this.io?.disconnect();
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('visibilitychange', this.onVisibility);
    }
  }

  protected isClone(i: number): boolean {
    return i === 0 || i === this.slides.length - 1;
  }

  protected currentImage(p: Project): number {
    return this.selected()[p.id] ?? 0;
  }

  protected pickImage(id: string, i: number): void {
    this.selected.update((map) => ({ ...map, [id]: i }));
    this.stop();
  }

  protected next(): void {
    this.go(this.index() + 1);
  }

  protected prev(): void {
    this.go(this.index() - 1);
  }

  protected goTo(dot: number): void {
    this.go(dot + 1);
  }

  protected activeDot(): number {
    const n = this.projects.length;
    return (((this.index() - 1) % n) + n) % n;
  }

  // Real 1-based position for a slide index in the cloned track ("2 de 5").
  protected slideLabel(i: number): string {
    const n = this.projects.length;
    return `${((i - 1 + n) % n) + 1} de ${n}`;
  }

  protected onTransitionEnd(e: TransitionEvent): void {
    // Child transitions (thumbs) bubble up here; only the track's own slide counts.
    if (e.target !== this.trackEl()?.nativeElement || e.propertyName !== 'transform') return;
    this.settle();
  }

  protected start(): void {
    if (this.reduced || this.timer !== null || !this.inView || document.hidden) return;
    this.timer = setInterval(() => this.next(), 5000);
  }

  protected stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  protected onPointerDown(e: PointerEvent): void {
    this.dragging = true;
    this.startX = e.clientX;
    this.stop();
  }

  protected onPointerUp(e: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    const dx = e.clientX - this.startX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? this.next() : this.prev();
    }
    this.start();
  }

  protected onPointerCancel(): void {
    this.dragging = false;
    this.start();
  }

  private go(i: number): void {
    if (this.transitioning) return;
    this.transitioning = true;
    this.animate.set(true);
    this.index.set(i);
    this.recompute();
    // transitionend can be missed (hidden tab) or never fire (reduced motion).
    this.settleTimer = setTimeout(() => this.settle(), this.reduced ? 0 : 700);
  }

  // Unlocks navigation and snaps from a clone back to its real slide.
  private settle(): void {
    if (this.settleTimer !== null) {
      clearTimeout(this.settleTimer);
      this.settleTimer = null;
    }
    this.transitioning = false;
    const n = this.projects.length;
    if (this.index() === 0) {
      this.jumpTo(n);
    } else if (this.index() === n + 1) {
      this.jumpTo(1);
    }
  }

  private jumpTo(i: number): void {
    this.animate.set(false);
    this.index.set(i);
    this.recompute();
  }

  private readonly onResize = (): void => {
    this.animate.set(false);
    this.recompute();
  };

  private readonly onVisibility = (): void => {
    document.hidden ? this.stop() : this.start();
  };

  private recompute(): void {
    const vp = this.viewport()?.nativeElement;
    const track = this.trackEl()?.nativeElement;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!vp || !track || !first) return;
    const slideW = first.getBoundingClientRect().width;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const center = vp.clientWidth / 2 - slideW / 2;
    this.offset.set(center - this.index() * (slideW + gap));
  }
}
