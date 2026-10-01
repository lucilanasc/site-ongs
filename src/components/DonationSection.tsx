import { useState } from 'react';
import { Heart, Copy, Check, ShoppingBag, Bone, Cat, Leaf, Package, Loader2, X, QrCode } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const PIX_KEY = '92 984404552';
const PIX_KEY_TYPE = 'Telefone';
const PIX_INSTITUTION = 'Pata Vida';
const PIX_CONTACT = 'choferpetdog@hotmail.com';

const quickAmounts = [5, 10, 20, 50];

const foodItems = [
  { icon: Bone, label: 'Ração', desc: 'Ração seca para cães e gatos de todos os portes' },
  { icon: Cat, label: 'Sachês', desc: 'Comida úmida para gatos e cães especiais' },
  { icon: Leaf, label: 'Granulado Sanitário', desc: 'Higiene e conforto para nossos gatinhos' },
  { icon: Package, label: 'Outros itens', desc: 'Coleiras, roupinhas, camas, brinquedos e medicamentos' },
];

export default function DonationSection() {
  const [copied, setCopied] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

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

  const handleSelectAmount = (amount: number | null, custom?: string) => {
    if (custom !== undefined) {
      setCustomAmount(custom);
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
      setCustomAmount('');
    }
    setError('');
    if ((custom !== undefined && parseFloat(custom) >= 1) || (custom === undefined && amount && amount >= 1)) {
      setShowQR(true);
    }
  };

  const handleDonate = async () => {
    setError('');
    if (!finalAmount || finalAmount < 1) {
      setError('Por favor, escolha um valor para doar.');
      return;
    }
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('donations').insert({
        donor_name: donorName || null,
        email: donorEmail || null,
        amount: finalAmount,
        status: 'completed',
      });
      if (dbError) throw dbError;
      setSuccess(true);
      setShowQR(false);
      setTimeout(() => {
        setSuccess(false);
        setCustomAmount('');
        setSelectedAmount(null);
        setDonorName('');
        setDonorEmail('');
      }, 6000);
    } catch (err) {
      setError('Não foi possível registrar sua doação. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ajude" className="section-padding bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700">
            <Heart className="h-4 w-4" fill="currentColor" />
            Ajude & Doe
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Como você pode ajudar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Doe produtos, faça uma doação em dinheiro via Pix ou simplesmente
            ajude a divulgar nosso trabalho. Toda ajuda é bem-vinda!
          </p>
        </div>

        {/* Bloco Superior — BANCO DE RAÇÃO */}
        <div className="mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-secondary-50 to-secondary-100/50 p-6 card-shadow sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-lg shadow-secondary-500/30">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800">Banco de Ração</h3>
            <p className="mt-2 text-base text-neutral-500">
              Itens necessários neste momento para manter nossos amiguinhos cuidados
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {foodItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-100">
                  <item.icon className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-800">{item.label}</h4>
                  <p className="text-sm text-neutral-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.me/5592984404552?text=Ol%C3%A1!%20Gostaria%20de%20doar%20produtos%20para%20a%20Pata%20Vida."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-adopt mt-8 w-full text-lg"
          >
            <ShoppingBag className="h-5 w-5" />
            Quero doar produtos
          </a>
        </div>

        {/* Bloco Inferior — DOE QUALQUER VALOR (PIX) */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-accent-50 to-primary-50/30 p-6 card-shadow sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/30">
              <Heart className="h-8 w-8 text-white" fill="white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800">Doe qualquer valor</h3>
            <p className="mt-2 text-base text-neutral-500">
              Escolha um valor e escaneie o QR Code para pagar via Pix
            </p>
          </div>

          {/* Quick amounts */}
          <div className="mb-6">
            <label className="mb-3 block text-center text-sm font-semibold text-neutral-700">
              Escolha um valor rápido
            </label>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleSelectAmount(amount)}
                  className={`relative rounded-2xl border-2 px-6 py-3 text-lg font-bold transition-all duration-300 ${
                    selectedAmount === amount && !customAmount
                      ? 'border-accent-500 bg-accent-500 text-white shadow-lg shadow-accent-500/30'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-accent-300 hover:bg-accent-50'
                  }`}
                >
                  R$ {amount}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => handleSelectAmount(null, e.target.value)}
                  placeholder="Outro valor"
                  className="w-36 rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-lg font-bold text-neutral-800 outline-none transition-all duration-300 focus:border-accent-400 focus:ring-4 focus:ring-accent-100"
                />
              </div>
            </div>
          </div>

          {/* Donor info */}
          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-500">Seu nome (opcional)</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Como devemos te chamar?"
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-accent-400 focus:ring-4 focus:ring-accent-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-500">E-mail (opcional)</label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-accent-400 focus:ring-4 focus:ring-accent-100"
              />
            </div>
          </div>

          {error && (
            <div className="mb-5 rounded-2xl bg-error-50 p-4 text-sm font-medium text-error-600 animate-fade-in">
              {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-secondary-50 p-8 text-center animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500 shadow-lg shadow-secondary-500/30">
                <Check className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800">Obrigado pela sua doação!</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Sua contribuição de {finalAmount && `R$ ${finalAmount.toFixed(2).replace('.', ',')}`} vai salvar muitas vidas.
                </p>
              </div>
              <div className="mt-2 flex h-40 w-40 items-center justify-center rounded-2xl bg-white p-3 shadow-lg">
                <img src="/images/qrcode_pata_vida.jpeg" alt="QR Code Pix — Pata Vida" className="h-full w-full rounded-xl object-contain" />
              </div>
              <p className="text-xs font-medium text-neutral-500">Escaneie o QR Code acima para pagar via Pix</p>
            </div>
          ) : (
            <button
              onClick={() => {
                if (!finalAmount || finalAmount < 1) {
                  setError('Por favor, escolha um valor para doar.');
                  return;
                }
                setShowQR(true);
              }}
              disabled={loading}
              className="btn-donate w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <QrCode className="h-5 w-5" />
                  {finalAmount && finalAmount >= 1
                    ? `Doar R$ ${finalAmount.toFixed(2).replace('.', ',')}`
                    : 'Doar agora'}
                </>
              )}
            </button>
          )}

          <p className="mt-6 text-center text-xs text-neutral-400">
            Você também pode doar via Pix copiando a chave abaixo. Toda doação, desde R$ 1,00, faz a diferença.
          </p>

          {/* Pix key summary */}
          <div className="mt-4 rounded-2xl border-2 border-dashed border-accent-200 bg-accent-50/50 p-5">
            <div className="mb-2 text-sm font-medium text-neutral-500">
              Chave Pix ({PIX_KEY_TYPE})
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="truncate text-xl font-bold text-neutral-800">{PIX_KEY}</code>
              <button
                onClick={copyPixKey}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  copied ? 'bg-secondary-500 text-white' : 'bg-accent-500 text-white hover:bg-accent-600 hover:scale-105'
                }`}
                aria-label="Copiar chave Pix"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
            {copied && (
              <div className="mt-3 flex items-center gap-2 text-sm font-medium text-secondary-600 animate-fade-in">
                <Check className="h-4 w-4" />
                Chave copiada! Cole no app do seu banco.
              </div>
            )}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4">
                <div className="mb-1 text-xs font-medium text-neutral-400">Instituição</div>
                <div className="text-sm font-semibold text-neutral-700">{PIX_INSTITUTION}</div>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <div className="mb-1 text-xs font-medium text-neutral-400">Contato</div>
                <div className="text-sm font-semibold text-neutral-700">{PIX_CONTACT}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && finalAmount && finalAmount >= 1 && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowQR(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-scale-in sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg shadow-accent-500/30">
                <Heart className="h-7 w-7 text-white" fill="white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-800">Pague via Pix</h3>
              <p className="mt-1 text-sm text-neutral-500">
                Escaneie o QR Code com o app do seu banco
              </p>

              <div className="mx-auto my-6 flex h-56 w-56 items-center justify-center rounded-3xl bg-white p-4 shadow-xl ring-2 ring-accent-100">
                <img src="/images/qrcode_pata_vida.jpeg" alt="QR Code Pix — Pata Vida" className="h-full w-full rounded-2xl object-contain" />
              </div>

              <div className="mb-4 rounded-2xl bg-accent-50 px-5 py-3">
                <div className="text-xs font-medium text-neutral-400">Valor da doação</div>
                <div className="text-3xl font-extrabold text-accent-600">
                  R$ {finalAmount.toFixed(2).replace('.', ',')}
                </div>
              </div>

              <div className="mb-4 rounded-2xl border-2 border-dashed border-accent-200 bg-accent-50/50 p-4">
                <div className="mb-1 text-sm font-medium text-neutral-500">
                  Ou copie a chave Pix ({PIX_KEY_TYPE})
                </div>
                <div className="flex items-center justify-between gap-3">
                  <code className="truncate text-lg font-bold text-neutral-800">{PIX_KEY}</code>
                  <button
                    onClick={copyPixKey}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      copied ? 'bg-secondary-500 text-white' : 'bg-accent-500 text-white hover:bg-accent-600'
                    }`}
                    aria-label="Copiar chave Pix"
                  >
                    {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  </button>
                </div>
                {copied && (
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium text-secondary-600 animate-fade-in">
                    <Check className="h-4 w-4" />
                    Chave copiada!
                  </div>
                )}
              </div>

              <button
                onClick={handleDonate}
                disabled={loading}
                className="btn-donate w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Já paguei — confirmar doação
                    </>
                  )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
