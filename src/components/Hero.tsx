import { ArrowRight, Heart, PawPrint, Shield } from 'lucide-react';

const heroImageUrl = 'https://images.pexels.com/photos/30577798/pexels-photo-30577798.jpeg?auto=compress&cs=tinysrgb&h=900&w=1200';

const stats = [
  { icon: PawPrint, value: '180+', label: 'Animais resgatados' },
  { icon: Heart, value: '120+', label: 'Adoções realizadas' },
  { icon: Shield, value: '5 anos', label: 'De trabalho' },
];

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-2xl opacity-90">
        <div className="absolute right-0 top-0 h-full w-full overflow-hidden">
          <img
            src={heroImageUrl}
            alt="Cão resgatado recebendo carinho"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        </div>
      </div>

      <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-secondary-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8 md:px-12">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 animate-fade-in">
            <Heart className="h-4 w-4" fill="currentColor" />
            Juntos por uma vida melhor para os animais
          </div>

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-neutral-800 animate-fade-in-up sm:text-6xl lg:text-7xl">
            Cada patinha
            <br />
            merece um
            <span className="text-primary-500"> lar</span>
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-neutral-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Somos uma ONG dedicada ao resgate, cuidado e adoção responsável de
            animais abandonados. Ajude-nos a transformar vidas — uma doação,
            uma adoção, um gesto de amor.
          </p>

          <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a
              href="#donate"
              onClick={(e) => { e.preventDefault(); scrollTo('#donate'); }}
              className="btn-primary"
            >
              <Heart className="h-5 w-5" fill="white" />
              Doar agora
            </a>
            <a
              href="#pets"
              onClick={(e) => { e.preventDefault(); scrollTo('#pets'); }}
              className="btn-secondary"
            >
              Ver pets para adoção
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-16 flex flex-wrap gap-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md shadow-neutral-200/50">
                  <stat.icon className="h-5 w-5 text-primary-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-800">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            d="M0,40 C360,80 720,0 1080,30 C1260,45 1380,60 1440,50 L1440,80 L0,80 Z"
          />
        </svg>
      </div>
    </section>
  );
}
