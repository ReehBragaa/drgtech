const fs = require('fs');
const path = 'data/dataset.json';
let content = fs.readFileSync(path, 'utf-8');

// 1. Replace BitDrive with BitLocker To Go
if (content.includes('BitDrive')) {
  content = content.replace(/BitDrive/g, 'BitLocker To Go');
  console.log('BitDrive corrigido para BitLocker To Go no dataset.json');
}

fs.writeFileSync(path, content, 'utf-8');
console.log('dataset.json atualizado.');
