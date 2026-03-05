const doGet = (e: any) => {
    const data = getLectures();
    return ContentService.createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
};

// Spreadsheet ID from Requirements: 1nfMyi5AgEjGpNVuazF74sZAvH_EWQQhVNY5rIqHeSPc
const SPREADSHEET_ID = '1nfMyi5AgEjGpNVuazF74sZAvH_EWQQhVNY5rIqHeSPc';

const getLectures = () => {
    try {
        const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('フォームの回答 2'); // adjust sheet name if needed
        if (!sheet) return [];

        // Column order assuming D=title, B=term, C=category, E=description, F=date, G=target, H=capacity, I=location, J=cost
        // Actually we will just fetch all values and map them based on headers on row 1
        const data = sheet.getDataRange().getValues();
        if (data.length <= 1) return [];

        const headers = data[0];
        const rows = data.slice(1);

        // Dynamic key mapping based on potential header names
        const getColIndex = (keys: string[]) => headers.findIndex(h => keys.some(k => String(h).includes(k)));

        const idxTitle = getColIndex(['講座名', 'タイトル', 'title']);
        const idxTerm = getColIndex(['ターム', 'term', '期']);
        const idxCategory = getColIndex(['カテゴリ', '分野', 'category']);
        const idxDesc = getColIndex(['内容', '説明', '詳細', 'description']);
        const idxDate = getColIndex(['開催日', '日程', 'date']);
        const idxTarget = getColIndex(['対象', 'target']);
        const idxCapacity = getColIndex(['定員', 'capacity', '人数']);
        const idxLocation = getColIndex(['場所', '教室', 'location']);
        const idxCost = getColIndex(['費用', '参加費', 'cost']);

        return rows.map(row => ({
            title: idxTitle >= 0 ? String(row[idxTitle] || '') : 'タイトル未定',
            term: idxTerm >= 0 ? String(row[idxTerm] || '') : 'A',
            category: idxCategory >= 0 ? String(row[idxCategory] || '') : 'その他',
            description: idxDesc >= 0 ? String(row[idxDesc] || '') : '',
            date: idxDate >= 0 ? String(row[idxDate] || '') : '未定',
            target: idxTarget >= 0 ? String(row[idxTarget] || '') : '全対象',
            capacity: idxCapacity >= 0 ? String(row[idxCapacity] || '') : '-',
            location: idxLocation >= 0 ? String(row[idxLocation] || '') : '未定',
            cost: idxCost >= 0 ? String(row[idxCost] || '') : '無料',
            imageAlt: '講座イメージ'
        })).filter(lec => lec.title !== '');

    } catch (e) {
        console.error(e);
        return [];
    }
};
