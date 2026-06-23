const fs = require('fs');
const path = require('path');
const servicesPath = path.join(__dirname, '../server/services.json');
const data = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

data.forEach(cat => {
  console.log(`\nCategory: ${cat.title} (slug: ${cat.slug})`);
  console.log('Services:');
  cat.services.forEach(s => {
    console.log(` - ${s.name} (slug: ${s.slug})`);
  });
});
