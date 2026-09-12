import { Heart, PawPrint } from 'lucide-react';

const footerLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Mural de Pets', href: '#pets' },
  { label: 'Chave Pix', href: '#pix' },
  { label: 'Doar', href: '#donate' },
  { label: 'Contato', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold text-white">
                Patinhas<span className="text-primary-400">Felizes</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Uma ONG dedicada ao resgate, cuidado e adoção responsável de
              animais abandonados. Cada doação salva uma vida.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-sm transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">
              Sobre nós
            </h4>
            <p className="text-sm leading-relaxed">
              CNPJ: 12.345.678/0001-90
              <br />
              contato@patinhasfelizes.org.br
              <br />
              São Paulo, SP
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-2 text-xs">
              <PawPrint className="h-3.5 w-3.5 text-primary-400" />
              Adoção responsável salva vidas
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-800 pt-8 text-center text-xs">
          <p>
            © {new Date().getFullYear()} Instituto Patinhas Felizes. Todos os
            direitos reservados. Feito com amor por quem ama animais.
          </p>
        </div>
      </div>
    </footer>
  );
}
