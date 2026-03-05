import React, { useState } from 'react';
import type { Lecture } from '../data/mockData';

interface Props {
    lecture: Lecture;
}

const categoryColors: Record<string, string> = {
    '教養': 'bg-emerald-500',
    '体験': 'bg-orange-500',
    '進路': 'bg-blue-500',
    '総合': 'bg-purple-500',
    'default': 'bg-gray-500'
};

export const LectureCard: React.FC<Props> = ({ lecture }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTargetExpanded, setIsTargetExpanded] = useState(false);
    const catColor = categoryColors[lecture.category] || categoryColors['default'];

    return (
        <article className="group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            {/* Category Ribbon */}
            <div className={`absolute top-4 right-0 transform translate-x-1/4 -translate-y-1/4 rotate-45 text-white text-xs font-bold py-1 px-8 shadow-md z-10 ${catColor}`}>
                {lecture.category}
            </div>

            {/* Term Badge */}
            <div className="absolute top-4 left-4 z-10">
                <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                    {lecture.term}ターム
                </span>
            </div>

            <figure className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                    src={lecture.title.includes('数学') || lecture.title.includes('Math')
                        ? `https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400&h=300`
                        : `https://picsum.photos/seed/${encodeURIComponent(lecture.title)}/400/300`
                    }
                    alt={lecture.imageAlt || lecture.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </figure>

            <div className="flex flex-col flex-grow p-5">
                <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight line-clamp-2">
                    {lecture.title}
                </h3>

                <div className="mb-4 flex flex-col justify-start">
                    <p className={`text-sm text-slate-600 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {lecture.description}
                    </p>
                    {lecture.description.length > 50 && (
                        <button
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setIsExpanded(!isExpanded); }}
                            className="text-blue-600 text-sm font-semibold mt-2 hover:text-blue-800 transition-colors inline-block self-start"
                        >
                            {isExpanded ? '一部を表示 ▴' : '続きをよむ ▾'}
                        </button>
                    )}
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3 mt-auto">
                    <DetailRow icon="📅" label={lecture.date} />

                    <div className="flex flex-col">
                        <div className="flex items-start text-sm text-slate-600">
                            <span className="mr-2 text-base leading-none">🎯</span>
                            <div className="flex flex-col w-full">
                                <span className={`text-sm leading-relaxed ${!isTargetExpanded ? 'line-clamp-2' : ''}`}>
                                    {lecture.target || '全対象'}
                                </span>
                                {(lecture.target?.length > 40) && (
                                    <button
                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); setIsTargetExpanded(!isTargetExpanded); }}
                                        className="text-emerald-600 text-[11px] font-bold mt-1 hover:text-emerald-700 transition-colors inline-block self-start bg-emerald-50 px-2 py-0.5 rounded"
                                    >
                                        {isTargetExpanded ? '閉じる ▴' : '対象の詳細 ▾'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <DetailRow icon="👥" label={`定員: ${lecture.capacity}`} />
                    <DetailRow icon="📍" label={lecture.location} />
                    <DetailRow icon="💰" label={`費用: ${lecture.cost}`} />
                </div>
            </div>
        </article>
    );
};

const DetailRow = ({ icon, label }: { icon: string, label: string }) => (
    <div className="flex items-start text-sm text-slate-600">
        <span className="mr-2 text-base leading-none">{icon}</span>
        <span className="line-clamp-1">{label}</span>
    </div>
);
