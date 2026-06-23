const fs = require('fs');
const content = fs.readFileSync('../src/data/services.ts', 'utf8');

// We want to find the top-level categories in servicesData
// Since the structure is:
// export const servicesData: ServiceCategory[] = [
//   {
//     title: "Startup",
//     slug: "startup",
//     description: "...",
//     services: [
//       ...
//     ]
//   }
// ]

// Let's parse it or extract using regex
const regex = /title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g;
let match;
const categories = [];
while ((match = regex.exec(content)) !== null) {
  categories.push({ title: match[1], slug: match[2] });
}

console.log('Categories found:', JSON.stringify(categories, null, 2));
