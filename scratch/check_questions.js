const fs = require('fs');
const path = require('path');

const dirPath = path.join(process.cwd(), 'src/data');
const files = fs.readdirSync(dirPath);

for (const file of files) {
    if (file.endsWith('.json')) {
        const filePath = path.join(dirPath, file);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        let missingEn = 0;
        let missingHi = 0;
        let missingCorrect = 0;
        let missingTopic = 0;
        let missingOptions = 0;

        for (const q of data) {
            if (q.question_en === undefined) missingEn++;
            if (q.question_hi === undefined) missingHi++;
            if (q.correct_option === undefined) missingCorrect++;
            if (q.topic === undefined) missingTopic++;
            if (q.options === undefined) missingOptions++;
        }
        
        if (missingEn > 0 || missingHi > 0 || missingCorrect > 0 || missingTopic > 0 || missingOptions > 0) {
            console.log(`${file}: missingEn=${missingEn}, missingHi=${missingHi}, missingCorrect=${missingCorrect}, missingTopic=${missingTopic}, missingOptions=${missingOptions}`);
        }
    }
}
console.log('done checking');
