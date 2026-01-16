import { useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

type User = {
  id: number;
  name: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Charlie", active: true },
];

function UserStats({ users }: { users: User[] }) {
  const activeUsers = users.filter((u) => u.active);
  return <div>Active: {activeUsers.length}</div>;
}

export function Welcome() {
  const [count, setCount] = useState(0);

  return (
    <main
      className="flex items-center justify-center pt-16 pb-4"
    >
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
              React Router カウンター
            </p>
            <UserStats users={users} />
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4 text-center">
              <p className="text-lg font-semibold">カウント: {count}</p>
              <div className="mt-3 flex justify-center gap-3">
                <button
                  onClick={() => setCount((c) => c - 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                >
                  -1
                </button>
                <button
                  onClick={() => setCount((c) => c + 1)}
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
