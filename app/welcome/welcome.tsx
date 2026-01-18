import { useState } from "react";

type Pokemon = {
  id: number;
  name: string;
  canEvolve: boolean;
};

const pokemons: Pokemon[] = [
  { id: 1, name: 'フシギダネ', canEvolve: true },
  { id: 2, name: 'フシギソウ', canEvolve: true },
  { id: 3, name: 'フシギバナ', canEvolve: false },
  { id: 4, name: 'ヒトカゲ', canEvolve: true },
  { id: 5, name: 'リザード', canEvolve: true },
  { id: 6, name: 'リザードン', canEvolve: false },
  { id: 25, name: 'ピカチュウ', canEvolve: true },
  { id: 26, name: 'ライチュウ', canEvolve: false },
];

function PokemonSummaries({ pokemons }: { pokemons: Pokemon[] }) {
  const evolvablePokemons = pokemons.filter(p => p.canEvolve);
  return <div>進化可能: {evolvablePokemons.length}</div>;
}

export function Welcome() {
  const [count, setCount] = useState(0);

  return (
    <main
      className="flex items-center justify-center pt-16 pb-4"
    >
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              React Router カウンター
            </p>
            <PokemonSummaries pokemons={pokemons} />
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-center">
              <p className="text-lg font-semibold">カウント: {count}</p>
              <div className="mt-3 flex justify-center gap-3">
                <button
                  onClick={() => setCount(c => c - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  -1
                </button>
                <button
                  onClick={() => setCount(c => c + 1)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  +1
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
