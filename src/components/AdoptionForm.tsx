import { useState } from 'react';
import { ArrowLeft, Send, Loader2, Check, PawPrint, X } from 'lucide-react';
import { supabase, type Pet } from '@/lib/supabase';

interface AdoptionFormProps {
  pet: Pet;
  onClose: () => void;
  onBack: () => void;
}

export default function AdoptionForm({ pet, onClose, onBack }: AdoptionFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [housing, setHousing] = useState('');
  const [hasOtherPets, setHasOtherPets] = useState('');
  const [otherPetsDetail, setOtherPetsDetail] = useState('');
  const [hasChildren, setHasChildren] = useState('');
  const [hasTime, setHasTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Por favor, preencha pelo menos nome, e-mail e telefone.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const { error: dbError } = await supabase.from('adoption_forms').insert({
        pet_id: pet.id,
        pet_name: pet.name,
        adopter_name: name.trim(),
        adopter_email: email.trim(),
        adopter_phone: phone.trim(),
        adopter_age: age || null,
        housing_type: housing || null,
        has_other_pets: hasOtherPets === 'sim',
        other_pets_detail: otherPetsDetail || null,
        has_children: hasChildren === 'sim',
        has_time: hasTime || null,
        reason: reason || null,
      });

      if (dbError) throw dbError;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (err) {
      setError('Não foi possível enviar seu pedido. Tente novamente em instantes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100';
  const labelClass = 'mb-2 block text-sm font-medium text-neutral-500';
  const chipClass = (active: boolean) =>
    `rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
      active ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
    }`;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-lg transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10 text-center animate-scale-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-500 shadow-lg shadow-secondary-500/30">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800">Pedido enviado!</h3>
            <p className="max-w-md text-base text-neutral-500">
              Recebemos seu pedido de adoção para <strong>{pet.name}</strong>.
              Entraremos em contato em breve pelo e-mail ou telefone informado.
              Obrigado por escolher adotar!
            </p>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 border-b border-neutral-100 bg-white px-6 py-5 sm:px-8">
              <button
                onClick={onBack}
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar para a ficha
              </button>
              <div className="flex items-center gap-2">
                <PawPrint className="h-5 w-5 text-secondary-500" />
                <h3 className="text-xl font-bold text-neutral-800">
                  Pedido de adoção — {pet.name}
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nome completo *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Seu nome" />
                </div>
                <div>
                  <label className={labelClass}>E-mail *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="seu@email.com" />
                </div>
                <div>
                  <label className={labelClass}>Telefone / WhatsApp *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="(92) 9XXXX-XXXX" />
                </div>
                <div>
                  <label className={labelClass}>Faixa etária</label>
                  <select value={age} onChange={(e) => setAge(e.target.value)} className={inputClass}>
                    <option value="">Selecione</option>
                    <option value="18-25">18 a 25 anos</option>
                    <option value="26-35">26 a 35 anos</option>
                    <option value="36-50">36 a 50 anos</option>
                    <option value="50+">Mais de 50 anos</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Tipo de moradia</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setHousing('Casa')} className={chipClass(housing === 'Casa')}>Casa</button>
                  <button type="button" onClick={() => setHousing('Apartamento')} className={chipClass(housing === 'Apartamento')}>Apartamento</button>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Tem outros animais em casa?</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setHasOtherPets('sim')} className={chipClass(hasOtherPets === 'sim')}>Sim</button>
                  <button type="button" onClick={() => setHasOtherPets('nao')} className={chipClass(hasOtherPets === 'nao')}>Não</button>
                </div>
              </div>

              {hasOtherPets === 'sim' && (
                <div className="mt-5">
                  <label className={labelClass}>Quais animais?</label>
                  <input type="text" value={otherPetsDetail} onChange={(e) => setOtherPetsDetail(e.target.value)} className={inputClass} placeholder="Ex: 1 gato e 1 cachorro" />
                </div>
              )}

              <div className="mt-5">
                <label className={labelClass}>Tem crianças em casa?</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setHasChildren('sim')} className={chipClass(hasChildren === 'sim')}>Sim</button>
                  <button type="button" onClick={() => setHasChildren('nao')} className={chipClass(hasChildren === 'nao')}>Não</button>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Tem tempo para dedicar ao pet?</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setHasTime('Sim')} className={chipClass(hasTime === 'Sim')}>Sim, tempo integral</button>
                  <button type="button" onClick={() => setHasTime('Parcial')} className={chipClass(hasTime === 'Parcial')}>Tempo parcial</button>
                  <button type="button" onClick={() => setHasTime('Nao')} className={chipClass(hasTime === 'Nao')}>Pouco tempo</button>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>Por que deseja adotar?</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Conte-nos seu motivo para adotar..." />
              </div>

              {error && (
                <div className="mt-5 rounded-2xl bg-error-50 p-4 text-sm font-medium text-error-600 animate-fade-in">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-adopt mt-6 w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Enviar pedido de adoção
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-neutral-400">
                Seus dados são confidenciais e usados apenas para o processo de adoção.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
