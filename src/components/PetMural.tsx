import { useEffect, useState } from 'react';
import { PawPrint, Search, X, Dog, Cat } from 'lucide-react';
import { supabase, type Pet } from '@/lib/supabase';

export default function PetMural() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) {
        console.error('Erro ao carregar pets:', error);
      } else if (data) {
        setPets(data as Pet[]);
      }
      setLoading(false);
    };
    fetchPets();
  }, []);

  const dogs = pets.filter((p) => p.species === 'Cachorro' || p.species === 'Cachorra');
  const cats = pets.filter((p) => p.species === 'Gato' || p.species === 'Gata');

  const renderPetGrid = (petList: Pet[], startIdx: number) => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {petList.map((pet, idx) => (
        <div
          key={pet.id}
          onClick={() => setSelectedPet(pet)}
          className="group cursor-pointer overflow-hidden rounded-3xl bg-neutral-100 card-shadow transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-scale-in"
          style={{ animationDelay: `${(startIdx + idx) * 0.05}s` }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src={pet.image_url}
              alt={pet.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-primary-500 px-3 py-1 text-xs font-semibold text-white">
                  {pet.species}
                </span>
                {pet.age && (
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-700">
                    {pet.age}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{pet.name}</h3>
              {pet.breed && <p className="text-sm text-white/80">{pet.breed}</p>}
            </div>
            <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
              <Search className="h-4 w-4 text-primary-500" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-neutral-100" />
      ))}
    </div>
  );

  return (
    <section id="pets" className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary-100 px-4 py-2 text-sm font-medium text-secondary-700">
            <PawPrint className="h-4 w-4" />
            Mural de Pets
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-800 sm:text-5xl">
            Conheça nossos amiguinhos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            Cada um deles tem uma história de superação. Que tal dar um lar
            para um deles?
          </p>
        </div>

        {/* Cães */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30">
              <Dog className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
                Cães para adoção
              </h3>
              <p className="text-sm text-neutral-500">
                {dogs.length} amiguinhos esperando um lar
              </p>
            </div>
          </div>
          {loading ? renderSkeleton() : dogs.length > 0
            ? renderPetGrid(dogs, 0)
            : (
              <div className="py-12 text-center text-neutral-400">
                <Dog className="mx-auto mb-3 h-10 w-10" />
                <p>Nenhum cãozinho disponível no momento.</p>
              </div>
            )}
        </div>

        {/* Gatos */}
        <div>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-400 to-secondary-600 shadow-lg shadow-secondary-500/30">
              <Cat className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 sm:text-3xl">
                Gatos para adoção
              </h3>
              <p className="text-sm text-neutral-500">
                {cats.length} amiguinhos esperando um lar
              </p>
            </div>
          </div>
          {loading ? renderSkeleton() : cats.length > 0
            ? renderPetGrid(cats, dogs.length)
            : (
              <div className="py-12 text-center text-neutral-400">
                <Cat className="mx-auto mb-3 h-10 w-10" />
                <p>Nenhum gatinho disponível no momento.</p>
              </div>
            )}
        </div>
      </div>

      {selectedPet && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedPet(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPet(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-lg transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={selectedPet.image_url}
                alt={selectedPet.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                  {selectedPet.species}
                </span>
                {selectedPet.breed && (
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                    {selectedPet.breed}
                  </span>
                )}
                {selectedPet.age && (
                  <span className="rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700">
                    {selectedPet.age}
                  </span>
                )}
              </div>
              <h3 className="mb-3 text-3xl font-bold text-neutral-800">{selectedPet.name}</h3>
              <p className="text-base leading-relaxed text-neutral-600">{selectedPet.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPet(null);
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary"
                >
                  <PawPrint className="h-5 w-5" />
                  Quero adotar
                </a>
                <a
                  href="#donate"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedPet(null);
                    document.querySelector('#donate')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-secondary"
                >
                  Ajudar com doação
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
