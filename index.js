// Этот участок кода выводит адреса к файлам где находится данное слово

// const fs = require('fs');
// const path = require('path');

// const searchTerm = process.argv[2];
// const searchDirectory = process.argv[3];

// if (!searchTerm || !searchDirectory) {
//   console.log('Please provide both a search term and a directory path.');
//   process.exit(1);
// }

// function searchDirectoryRecursively(dir, searchTerm) {
//   const results = [];

//   const files = fs.readdirSync(dir);

//   for (const file of files) {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       results.push(...searchDirectoryRecursively(filePath, searchTerm));
//     } else if (stat.isFile()) {
//       const fileContents = fs.readFileSync(filePath, 'utf8');

//       if (fileContents.includes(searchTerm)) {
//         results.push(filePath);
//       }
//     }
//   }

//   return results;
// }

// const results = searchDirectoryRecursively(searchDirectory, searchTerm);

// // Save results to file
// fs.writeFileSync('content.txt', results.join('\n'));

// console.log(`Results for "${searchTerm}" in directory "${searchDirectory}" saved to file "content.txt".`);

const fs = require('fs');
const path = require('path');

const searchTerm = process.argv[2];
const searchDirectory = process.argv[3];

if (!searchTerm || !searchDirectory) {
  console.log('Please provide both a search term and a directory path.');
  process.exit(1);
}

function searchDirectoryRecursively(dir, searchTerm) {
  const results = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...searchDirectoryRecursively(filePath, searchTerm));
    } else if (stat.isFile()) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const lines = fileContents.split('\n');
      const lineNumbers = [];

      lines.forEach((line, index) => {
        if (line.includes(searchTerm)) {
          lineNumbers.push(index + 1);
        }
      });

      if (lineNumbers.length > 0) {
        results.push({
          filePath,
          lineNumbers
        });
      }
    }
  }

  return results;
}

const results = searchDirectoryRecursively(searchDirectory, searchTerm);

// Save results to file
fs.writeFileSync('content.json', JSON.stringify(results, null, 2));

// console.log(`Results for "${searchTerm}" in directory "${searchDirectory}" saved to file "content.txt".`);
console.log(`Проверь файлы. Всё готово`);
