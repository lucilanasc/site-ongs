import { useEffect, useState } from 'react';
import { Heart, Quote } from 'lucide-react';
import { supabase, type HappyEnding } from '@/lib/supabase';

export default function HappyEndings() {
  const [stories, setStories] = useState<HappyEnding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('happy_endings')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Erro ao carregar histórias:', error);
      } else if (data) {
        setStories(data as HappyEnding[]);
      }
      setLoading(false);
    };
    fetchStories();
  }, []);

  return (
    <section id="historia" className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-100 px-4 py-2 text-sm font-medium text-accent-700">
            <Heart className="h-4 w-4" fill="currentColor" />
            Finais Felizes
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Nossa História
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Cada adoção é uma vitória. Conheça algumas das histórias de amor e
            superação que a Pata Vida ajudou a escrever.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl bg-neutral-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story, idx) => (
              <div
                key={story.id}
                className="group overflow-hidden rounded-3xl bg-white card-shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-scale-in"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={story.image_url}
                    alt={story.pet_name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Heart className="h-3 w-3" fill="white" />
                      Adotado!
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-white">{story.pet_name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-neutral-600">{story.story}</p>
                  {story.adopter_message && (
                    <div className="mt-4 rounded-2xl bg-accent-50 p-4">
                      <Quote className="mb-2 h-4 w-4 text-accent-400" />
                      <p className="text-sm italic text-neutral-600">{story.adopter_message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="py-20 text-center text-neutral-400">
            <Heart className="mx-auto mb-4 h-12 w-12" />
            <p>Em breve, novas histórias de adoção por aqui.</p>
          </div>
        )}
      </div>
    </section>
  );
}
