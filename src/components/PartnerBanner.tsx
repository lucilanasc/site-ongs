import { PawPrint } from 'lucide-react';

const partnerText = 'Nossos gatinhos também esperam por você: Visite a vitrine da Petz Amazonas, o CatCafé Miau Lovers ou venha nos conhecer diretamente no Acolhimento Pata Vida.';

export default function PartnerBanner() {
  return (
    <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-accent-600 px-5 py-4 sm:px-8 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
        <PawPrint className="h-6 w-6 shrink-0 text-white" />
        <p className="text-sm font-medium leading-relaxed text-white sm:text-base">
          {partnerText}
        </p>
      </div>
    </div>
  );
}
