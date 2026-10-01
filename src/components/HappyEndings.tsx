import { PawPrint } from 'lucide-react';

export default function HappyEndings() {
  return (
    <section id="historia" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700">
            <PawPrint className="h-4 w-4" />
            Nossa História
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Nossa História
          </h2>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-neutral-600">
          <p>
            A Pata Vida nasceu a partir do resgate do Chofer. A repercussão de sua
            história trouxe muitos pedidos de ajuda e, aos poucos, o que começou de
            forma voluntária e discreta se transformou em um trabalho contínuo de
            resgate, cuidado e adoção de animais.
          </p>
          <p>
            Hoje, acolhemos animais em situação de abandono, doença e
            vulnerabilidade, oferecendo cuidados e uma nova oportunidade de vida.
          </p>
          <p>
            Nem todos conseguem ser adotados. Muitos chegam debilitados ou precisam
            de cuidados permanentes e acabam permanecendo conosco. Por eles e por
            tantos outros que ainda precisam de ajuda, seguimos trabalhando todos
            os dias.
          </p>
          <p className="text-xl font-semibold text-primary-700">
            Porque toda vida merece cuidado, respeito e uma chance.
          </p>
        </div>
      </div>
    </section>
  );
}
