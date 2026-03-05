import { useState, useEffect } from 'react';
import { LectureCard } from './components/LectureCard';
import { FilterBar } from './components/FilterBar';
import { mockLectures, type Lecture } from './data/mockData';

declare global {
  interface Window {
    google?: any;
  }
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        // You must deploy GAS and replace this ID if changed.
        const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbxu1tSfOspb1dr8eUBGNiPU7dVmG7v_VAZItTZfen0ismJOy0USBe9AFZ7KCFnTYlbr/exec';
        const response = await fetch(GAS_WEBAPP_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLectures(data || []);
      } catch (err) {
        console.error('Failed to fetch from GAS WebApp:', err);
        // Fallback to mock data on failure, useful for development or if the API takes too long
        setLectures(mockLectures);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const terms = Array.from(new Set(lectures.map(l => l.term))).sort();

  const filteredLectures = lectures.filter((lecture: Lecture) =>
    activeFilter === 'all' || lecture.term === activeFilter
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="relative text-white overflow-hidden py-24 mb-16 shadow-xl" style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 30%, #0284c7 60%, #0369a1 100%)' }}>
        {/* 雲をイメージした白い装飾オブジェクト */}
        <div className="absolute inset-0 z-0">
          {/* 雲シェイプ */}
          <div className="absolute top-8 left-[8%] w-32 h-16 bg-white/15 rounded-full blur-sm"></div>
          <div className="absolute top-6 left-[12%] w-20 h-12 bg-white/15 rounded-full blur-sm"></div>

          <div className="absolute bottom-16 right-[10%] w-40 h-18 bg-white/12 rounded-full blur-sm"></div>
          <div className="absolute bottom-12 right-[15%] w-24 h-14 bg-white/12 rounded-full blur-sm"></div>

          <div className="absolute top-1/3 right-[5%] w-28 h-14 bg-white/10 rounded-full blur-sm animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute top-1/3 right-[8%] w-16 h-10 bg-white/10 rounded-full blur-sm animate-pulse" style={{ animationDuration: '6s' }}></div>

          <div className="absolute top-16 left-[45%] w-20 h-10 bg-white/8 rounded-full blur-sm"></div>

          <div className="absolute bottom-8 left-[25%] w-24 h-12 bg-white/10 rounded-full blur-sm animate-pulse" style={{ animationDuration: '8s' }}></div>

          {/* 光のグロー */}
          <div className="absolute -top-20 right-1/4 w-[30rem] h-[30rem] bg-sky-300/15 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            <ruby className="inline-flex flex-col items-center">
              <span className="text-7xl font-black text-white pb-2">
                <span className="text-emerald-300">🌱</span> 土曜ゼミ
              </span>
              <rt className="text-xl font-medium tracking-[0.3em] text-sky-100 uppercase opacity-80 mt-2">どゼミ</rt>
            </ruby>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/90 mt-8 max-w-2xl mx-auto leading-relaxed">
            土曜日の主体的な学びで、<br className="md:hidden" />新しい自分を見つけよう！
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 tracking-tight">開講講座一覧</h2>
          <p className="text-slate-500">興味のあるタームを選択して、講座を探してみましょう。</p>
        </div>

        <FilterBar
          terms={terms}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLectures.length > 0 ? (
              filteredLectures.map((lecture, index) => (
                <div
                  key={`${lecture.title}-${index}`}
                  className="animate-in fade-in slide-in-from-bottom-8 duration-500 fill-mode-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LectureCard lecture={lecture} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 text-lg">
                該当する講座が見つかりませんでした。
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <p className="text-sm tracking-widest font-medium uppercase opacity-60">© 2026 Daisho Gakuen</p>
      </footer>
    </div>
  );
}

export default App;
