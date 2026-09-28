import { PawPrint, Heart, ArrowRight, MapPin } from 'lucide-react';
import { supabase, type Pet } from '@/lib/supabase';
import { useEffect, useState } from 'react';

const choferImage = '/images/chofer.jpeg';

export default function Hero() {
  const [chofer, setChofer] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchChofer = async () => {
      const { data } = await supabase
        .from('pets')
        .select('*')
        .eq('is_featured', true)
        .maybeSingle();
      if (data) setChofer(data as Pet);
    };
    fetchChofer();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-accent-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700 animate-fade-in">
              <PawPrint className="h-4 w-4" />
              Pata Vida
            </div>

            <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-neutral-800 animate-fade-in-up sm:text-6xl lg:text-7xl">
              Cada patinha
              <br />
              merece um
              <span className="text-primary-500"> lar</span>
            </h1>

            <p className="mb-10 max-w-lg text-lg leading-relaxed text-neutral-600 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Somos a Pata Vida, uma ONG dedicada ao resgate, cuidado e adoção
              responsável de animais abandonados em Manaus. Ajude-nos a
              transformar vidas.
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <a
                href="#pets"
                onClick={(e) => { e.preventDefault(); scrollTo('#pets'); }}
                className="btn-adopt"
              >
                <PawPrint className="h-5 w-5" />
                Quero Adotar
              </a>
              <a
                href="#ajude"
                onClick={(e) => { e.preventDefault(); scrollTo('#ajude'); }}
                className="btn-donate"
              >
                <Heart className="h-5 w-5" fill="white" />
                Quero Doar
              </a>
            </div>

            <div className="mt-12 flex items-center gap-3 text-sm text-neutral-500 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <MapPin className="h-4 w-4 text-primary-400" />
              <span>Manaus, Amazonas — Brasil</span>
            </div>
          </div>

          {/* Chofer mascot feature */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.15s' }}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-primary-500/20">
              <img
                src={choferImage}
                alt="Chofer — Mascote da Pata Vida"
                className="h-[420px] w-full object-cover object-center sm:h-[500px]"
              />
            </div>

            {/* Caption card below the photo — nothing over the face */}
            <div className="mt-5 rounded-[1.5rem] bg-white/90 p-6 shadow-lg shadow-primary-500/10 backdrop-blur-sm">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <PawPrint className="h-3.5 w-3.5" />
                Mascote & Fundador
              </div>
              <h2 className="text-3xl font-extrabold text-neutral-800 sm:text-4xl">
                CHOFER
              </h2>
              <p className="mt-2 text-sm text-neutral-600 sm:text-base">
                Mascote, fundador e embaixador da Pata Vida
              </p>
              {chofer?.story && (
                <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-3">
                  {chofer.story}
                </p>
              )}
              <button
                onClick={() => scrollTo('#pets')}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
              >
                Conheça o Chofer e outros amiguinhos
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="absolute -right-4 top-0 hidden h-24 w-24 rounded-full bg-accent-400/30 blur-2xl sm:block" />
            <div className="absolute -bottom-4 -left-4 hidden h-32 w-32 rounded-full bg-secondary-400/30 blur-2xl sm:block" />
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
