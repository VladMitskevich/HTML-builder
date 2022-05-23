const fs = require('fs/promises');
const path = require('path');

(async function() {
  const filesArr = await fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true });
  for (let file of filesArr) {
    if (file.isFile()) {
      const fullName = file.name;
      const name = fullName.split('.')[0];
      const filePath = path.join(__dirname, 'secret-folder', fullName);
      const fileType = path.extname(filePath).substring(1);
      const stats = await fs.stat(filePath);
      console.log(`${name} - ${fileType} - ${stats.size}b`);
    }
  }
})();