import xlsx from 'xlsx';

const workbook = xlsx.readFile('/Users/marcoscarvalho/Library/CloudStorage/Dropbox/_antigravity/void system v1.0/loveable/novo_relatrio_04-02-2026.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

console.log("Headers:", data[0]);
console.log("Row 1:", data[1]);
console.log("Row 2:", data[2]);
console.log("Total Rows:", data.length);
