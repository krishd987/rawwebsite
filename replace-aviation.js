const fs = require('fs');
const path = require('path');

const targetDir = process.cwd();

// Files and directories to ignore
const ignoreList = ['node_modules', '.next', '.git'];

function walkAndReplace(dir) {
  let changedFilesCount = 0;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    // Skip ignored directories
    if (ignoreList.includes(file)) {
      continue;
    }
    
    // Skip binaries and generated files
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.ico') || file.endsWith('.map') || file.endsWith('.jpeg')) {
        continue;
    }

    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      changedFilesCount += walkAndReplace(filePath);
    } else if (stat.isFile()) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      let newContent = content;
      let hasChanges = false;

      // Replace Aviation Wing -> Aviation Wing
      if (newContent.includes('Aviation Wing')) {
        newContent = newContent.replace(/Aviation Wing/g, 'Aviation Wing');
        hasChanges = true;
      }
      
      if (newContent.includes('AVIATION WING')) {
        newContent = newContent.replace(/AVIATION WING/g, 'AVIATION WING');
        hasChanges = true;
      }

      if (hasChanges) {
        console.log(`Updated file: ${filePath}`);
        fs.writeFileSync(filePath, newContent, 'utf8');
        changedFilesCount++;
      }
    }
  }
  
  return changedFilesCount;
}

console.log(`Starting scan for Automation -> Aviation in ${targetDir}...`);
const totalChanged = walkAndReplace(targetDir);
console.log(`\nScan complete! Changed ${totalChanged} files.`);
