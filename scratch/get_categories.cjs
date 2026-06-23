const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../src/data/services.ts');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g;
let match;
const categories = [];
while ((match = regex.exec(content)) !== null) {
  categories.push({ title: match[1], slug: match[2] });
}

console.log('Categories found:', JSON.stringify(categories, null, 2));
