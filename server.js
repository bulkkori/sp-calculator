const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(__dirname));

// 루트 경로로 접속시 iPhone16Pro.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'iPhone16Pro.html'));
});

// 서버 시작
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
}); 