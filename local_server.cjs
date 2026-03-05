const express = require('express');
const path = require('path');
const mockLectures = [
    { term: 'A', title: 'Python基礎プログラミング', category: '進路', description: '初心者向けのPython講座です。変数、制御構文から簡単なデータ処理までを学びます。', date: '5月10日', target: '全学年', capacity: '20名', location: 'コンピュータ室', cost: '無料' },
    { term: 'A', title: 'デッサン入門', category: '体験', description: 'モノの形を正確に捉えるための基本的なデッサン技法を学びます。', date: '5月17日', target: '美術興味者', capacity: '15名', location: '美術室', cost: '画用紙代500円' }
];

const app = express();
const port = 3000;

// GAS-fakes emulation
const google = {
    script: {
        run: {
            withSuccessHandler: function (callback) {
                return {
                    getLectures: function () {
                        setTimeout(() => callback(mockLectures), 500); // simulate network latency
                    }
                };
            }
        }
    }
};

// Render the main HTML page
app.get('/', (req, res) => {
    console.log('[local_server] Serving index.html');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Serve frontend build output
app.use(express.static('dist'));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`[local_server] GAS Backend Mock running at http://localhost:${port}`);
});
