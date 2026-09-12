import { useState } from 'react';
import { Copy, Check, QrCode, Heart } from 'lucide-react';

const PIX_KEY = 'contato@projetoadotarmanaus.org.br';
const PIX_KEY_TYPE = 'E-mail';
const PIX_INSTITUTION = 'Projeto Adotar Manaus';
const PIX_CNPJ = '12.345.678/0001-90';

export default function PixSection() {
  const [copied, setCopied] = useState(false);

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      const textarea = document.createElement('textarea');
      textarea.value = PIX_KEY;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="pix" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/50">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl bg-white card-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
                <Heart className="h-4 w-4" fill="currentColor" />
                Doação via Pix
              </div>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-neutral-800 sm:text-4xl">
                Doe com um clique
              </h2>
              <p className="mb-8 text-base leading-relaxed text-neutral-500">
                Copie nossa chave Pix e faça sua doação agora mesmo. Cada
                contribuição ajuda a alimentar, vacinar e cuidar dos animais
                resgatados.
              </p>

              <div className="space-y-4">
                <div className="rounded-2xl border-2 border-dashed border-primary-200 bg-primary-50/50 p-5">
                  <div className="mb-2 text-sm font-medium text-neutral-500">
                    Chave Pix ({PIX_KEY_TYPE})
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <code className="truncate text-lg font-semibold text-neutral-800">
                      {PIX_KEY}
                    </code>
                    <button
                      onClick={copyPixKey}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        copied
                          ? 'bg-secondary-500 text-white'
                          : 'bg-primary-500 text-white hover:bg-primary-600 hover:scale-105'
                      }`}
                      aria-label="Copiar chave Pix"
                    >
                      {copied ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {copied && (
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-secondary-600 animate-fade-in">
                      <Check className="h-4 w-4" />
                      Chave copiada! Cole no app do seu banco para doar.
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <div className="mb-1 text-xs font-medium text-neutral-400">
                      Instituição
                    </div>
                    <div className="text-sm font-semibold text-neutral-700">
                      {PIX_INSTITUTION}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <div className="mb-1 text-xs font-medium text-neutral-400">
                      CNPJ
                    </div>
                    <div className="text-sm font-semibold text-neutral-700">
                      {PIX_CNPJ}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-700 p-8 sm:p-12">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white blur-2xl" />
                <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-accent-300 blur-3xl" />
              </div>
              <div className="relative z-10 text-center">
                <div className="mx-auto mb-6 flex h-48 w-48 items-center justify-center rounded-3xl bg-white p-4 shadow-2xl">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                    <QrCode className="h-16 w-16 text-neutral-800" />
                    <div className="text-xs font-medium text-neutral-400">
                      QR Code Pix
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  Escaneie o QR Code ou copie a chave
                </p>
                <p className="mt-1 text-lg font-bold text-white">
                  Aponte a câmera do seu banco
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
