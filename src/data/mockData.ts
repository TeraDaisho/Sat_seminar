export interface Lecture {
    title: string;
    term: string;
    category: string;
    imageAlt: string;
    description: string;
    date: string;
    target: string;
    capacity: string;
    location: string;
    cost: string;
    info: string;
}

export const mockLectures: Lecture[] = [
    {
        title: '体育の常識をアップデート！「ゆるい」のに「アツい」ニュースポーツ体験講座',
        term: 'A',
        category: '体験',
        imageAlt: 'ニュースポーツ体験',
        description: '普段体験しないようなニュースポーツを体育とは違う「遊び感覚」で体験できる90分',
        date: '2026/4/1',
        target: '運動が不得意な人、体育が好きな人、体を動かすのが好きな人、笑うのが好きな人',
        capacity: '15名',
        location: '体育館、グランド',
        cost: '無料',
        info: '特になし'
    },
    {
        title: '三日坊主、今日で卒業。行動科学で「勝手に続く自分」を作る！',
        term: 'A',
        category: '総合',
        imageAlt: '習慣化講座',
        description: '「目標が達成できないのは、やり方を知らないだけ」だと言われています。最新の脳科学と行動科学で「一生モノの武器」を手に入れませんか？',
        date: '2026/4/1',
        target: '定期テストでいつもよりすこし上の自分を目指したい、部活のパフォーマンスを上げたい人',
        capacity: '30名',
        location: '教室',
        cost: '無料',
        info: 'iPadを使用します。'
    },
    {
        title: '世界の美食に触れよう！',
        term: 'B',
        category: '教養',
        imageAlt: '世界の美食体験',
        description: '世界の伝統料理を作ってみます。美味しいかどうかはあなた次第！',
        date: '2026/4/8',
        target: '異文化に興味がある人',
        capacity: '15名',
        location: '調理室',
        cost: '700円',
        info: 'エプロン持参'
    },
    {
        title: '数学謎解き',
        term: 'C',
        category: '教養',
        imageAlt: '数学謎解き',
        description: 'パズル、推理、数学を使って謎解きをします。',
        date: '2026/4/15',
        target: '数学やパズル、謎解きが好きな人',
        capacity: '15名',
        location: '普通教室',
        cost: '無料',
        info: '筆記用具必須'
    },
    {
        title: '海釣り講座',
        term: 'A',
        category: '体験',
        imageAlt: '海釣り体験',
        description: '海釣りに関する様々な知識を学習します。さらに、釣り場の現状や釣り人のマナーも知ってもらいます。',
        date: '2026/4/1',
        target: '海釣りに興味関心のある生徒',
        capacity: '15名',
        location: '教室',
        cost: '無料',
        info: '特になし'
    },
    {
        title: 'AI×リアル脱出ゲーム制作',
        term: 'D',
        category: '総合',
        imageAlt: 'AI脱出ゲーム',
        description: '生成AIへの適切な指示出しを実践的に学ぶ。デジタルとリアルを融合させた制作。',
        date: '2026/4/22',
        target: '脱出ゲームや謎解きが大好きで、自分で作ってみたい人',
        capacity: '16名',
        location: 'パソコンルーム',
        cost: '無料',
        info: '特になし'
    }
];
