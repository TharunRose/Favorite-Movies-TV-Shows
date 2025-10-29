

import Home from './pages/Home';


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">Favorite Movies & TV Shows</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Home />
      </main>
    </div>
  );
}