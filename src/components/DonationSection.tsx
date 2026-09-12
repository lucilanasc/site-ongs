import { useState } from 'react';
import { Heart, Check, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const presetAmounts = [25, 50, 100, 250, 500, 1000];

const amountLabels: Record<number, string> = {
  25: 'R$ 25 — Uma refeição especial',
  50: 'R$ 50 — Vacina de um pet',
  100: 'R$ 100 — Castração',
  250: 'R$ 250 — Tratamento veterinário',
  500: 'R$ 500 — Resgate completo',
  1000: 'R$ 1.000 — Sustento de um mês',
};

export default function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleDonate = async () => {
    setError('');

    if (!finalAmount || finalAmount < 5) {
      setError('O valor mínimo para doação é R$ 5,00.');
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
      setTimeout(() => {
        setSuccess(false);
        setCustomAmount('');
        setDonorName('');
        setDonorEmail('');
      }, 4000);
    } catch (err) {
      setError('Não foi possível registrar sua doação. Tente novamente em instantes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="donate" className="section-padding bg-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700">
            <Heart className="h-4 w-4" fill="currentColor" />
            Área de Doação
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Faça sua doação
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Escolha um valor ou digite o quanto deseja doar. Sua contribuição
            salva vidas e transforma histórias.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-50 to-primary-50/30 p-6 card-shadow sm:p-10">
          <div className="mb-8">
            <label className="mb-4 block text-sm font-semibold text-neutral-700">
              Escolha um valor
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`relative rounded-2xl border-2 p-4 text-center transition-all duration-300 ${
                    selectedAmount === amount && !customAmount
                      ? 'border-primary-500 bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:bg-primary-50'
                  }`}
                >
                  <div className="text-2xl font-bold">R$ {amount}</div>
                  {selectedAmount === amount && !customAmount && (
                    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500 shadow-md">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Ou digite outro valor
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-neutral-400">
                R$
              </span>
              <input
                type="number"
                min="5"
                step="1"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="0,00"
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white py-4 pl-12 pr-4 text-lg font-semibold text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </div>
          </div>

          {finalAmount && finalAmount >= 5 && amountLabels[finalAmount] && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl bg-primary-50 p-4 animate-fade-in">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <p className="text-sm font-medium text-primary-700">
                {amountLabels[finalAmount]}
              </p>
            </div>
          )}

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-500">
                Seu nome (opcional)
              </label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Como devemos te chamar?"
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-500">
                E-mail (opcional)
              </label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-2xl border-2 border-neutral-200 bg-white px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100"
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl bg-error-50 p-4 text-sm font-medium text-error-600 animate-fade-in">
              {error}
            </div>
          )}

          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-secondary-50 p-8 text-center animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500 shadow-lg shadow-secondary-500/30">
                <Check className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-800">
                  Obrigado pela sua doação!
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Sua contribuição de {finalAmount && `R$ ${finalAmount.toFixed(2).replace('.', ',')}`} vai
                  ajudar a salvar muitas vidas.
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDonate}
              disabled={loading || !finalAmount || finalAmount < 5}
              className="btn-primary w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Heart className="h-5 w-5" fill="white" />
                  Doar {finalAmount && finalAmount >= 5 ? `R$ ${finalAmount.toFixed(2).replace('.', ',')}` : 'agora'}
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          )}

          <p className="mt-6 text-center text-xs text-neutral-400">
            Você também pode doar via Pix copiando nossa chave na seção acima.
            Toda doação é bem-vinda, desde R$ 5,00.
          </p>
        </div>
      </div>
    </section>
  );
}
