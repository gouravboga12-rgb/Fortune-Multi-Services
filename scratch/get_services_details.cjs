const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../src/data/services.ts');
const content = fs.readFileSync(filePath, 'utf8');

// A quick extraction of categories and their service names
const regex = /title:\s*"([^"]+)",\s*slug:\s*"([^"]+)"/g;
let match;
const categories = [];

// Let's parse services.ts as JS by creating a simple node execution of it
// Wait, we can compile services.ts and run it, or just write a script to evaluate the exported data.
// Since package.json has 'type': 'module', we can write an ES Module script that imports services.ts!
// Let's do that in a separate script 'get_data.js' which uses ES imports.
