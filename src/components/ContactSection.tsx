import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Loader2, Check, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const contactInfo = [
  { icon: Mail, label: 'E-mail', value: 'contato@patinhasfelizes.org.br' },
  { icon: Phone, label: 'Telefone', value: '(11) 9 8888-7777' },
  { icon: MapPin, label: 'Endereço', value: 'Rua das Patinhas, 123 — São Paulo, SP' },
  { icon: MessageCircle, label: 'WhatsApp', value: '(11) 9 9999-0000' },
];

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
];

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, informe um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const { error: dbError } = await supabase.from('contact_messages').insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (dbError) throw dbError;

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Não foi possível enviar sua mensagem. Tente novamente em instantes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-neutral-50 to-secondary-50/30">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700">
            <Mail className="h-4 w-4" />
            Contato
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Fale com a gente
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Quer adotar, ser voluntário ou tirar dúvidas? Envie uma mensagem e
            responderemos o quanto antes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 rounded-2xl bg-white p-5 card-shadow transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100">
                    <info.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-neutral-400">
                      {info.label}
                    </div>
                    <div className="text-base font-semibold text-neutral-700">
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-neutral-500 card-shadow transition-all duration-300 hover:-translate-y-1 hover:bg-primary-500 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-white p-6 card-shadow sm:p-8"
            >
              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-neutral-500">
                  Nome
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-neutral-500">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-neutral-500">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Conte-nos como podemos ajudar..."
                  className="w-full resize-none rounded-2xl border-2 border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-neutral-800 outline-none transition-all duration-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100"
                />
              </div>

              {error && (
                <div className="mb-5 rounded-2xl bg-error-50 p-4 text-sm font-medium text-error-600 animate-fade-in">
                  {error}
                </div>
              )}

              {success ? (
                <div className="flex items-center justify-center gap-3 rounded-2xl bg-secondary-50 p-5 text-center animate-scale-in">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-500">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">
                      Mensagem enviada!
                    </div>
                    <div className="text-sm text-neutral-500">
                      Obrigado pelo contato. Responderemos em breve.
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Enviar mensagem
                    </>
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
