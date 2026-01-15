import { useState, useRef, useMemo } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {

  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current++;
  console.log(`Welcomeコンポーネントがレンダリングされました: ${renderCount.current}`);

  // This calculation is memoized and will only run when 'count' changes,
  // even if the component re-renders due to other state changes.
  const expensiveValue = useMemo(() => {
    console.log("重い計算を実行中...");
    // Simulate some work
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += i;
    }
    return count * 2;
  }, [count]);

  const [count2, setCount2] = useState(0);
  
  // This calculation is NOT memoized and will run on every render
  console.log("メモ化されていない計算を実行中...");
  const expensiveValue2 = (() => {
      let result = 0;
      for (let i = 0; i < 1000000; i++) {
          result += i;
      }
      return count2 * 2;
  })();

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
              React Router コンパイラ プレイグラウンド
            </p>
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>レンダリング回数: {renderCount.current}</p>
            </div>
            
            {/* Memoization Demo Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-semibold mb-2">useMemo デモ</p>
              <p className="text-sm">カウント: {count}</p>
              <p className="text-sm">メモ化された値 (カウント * 2): {expensiveValue}</p>
              <button
                onClick={() => setCount((c) => c + 1)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                カウントを増やす
              </button>
              <p className="text-xs mt-2 text-gray-400">
                (コンソールを確認: 依存値は 'count' です。下の「カウント2を増やす」をクリックしてみてください - 'count' は変わらないため、このログは表示されません)
              </p>
            </div>

            {/* Non-Memoization Demo Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <p className="text-sm font-semibold mb-2">useMemo なし デモ</p>
              <p className="text-sm">カウント2: {count2}</p>
              <p className="text-sm">メモ化されていない値 (カウント2 * 2): {expensiveValue2}</p>
              <button
                onClick={() => setCount2((c) => c + 1)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                カウント2を増やす
              </button>
              <p className="text-xs mt-2 text-gray-400">
                (コンソールを確認: レンダリングのたびに実行されます。上の「カウントを増やす」をクリックしてみてください - 'count2' は変わっていませんが、このログは表示されます)
              </p>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
