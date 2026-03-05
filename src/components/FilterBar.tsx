

interface Props {
    terms: string[];
    activeFilter: string;
    onFilterChange: (term: string) => void;
}

export const FilterBar: React.FC<Props> = ({ terms, activeFilter, onFilterChange }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
                onClick={() => onFilterChange('all')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 
          ${activeFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300'
                    }`}
            >
                すべて
            </button>

            {terms.map((term) => (
                <button
                    key={term}
                    onClick={() => onFilterChange(term)}
                    className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 
            ${activeFilter === term
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-blue-300'
                        }`}
                >
                    {term}ターム
                </button>
            ))}
        </div>
    );
};
