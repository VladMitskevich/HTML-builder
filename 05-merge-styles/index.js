const fsPromises = require('fs/promises');
const path = require('path');
const pathToFile = path.join(__dirname, 'project-dist', 'bundle.css');
const pathFromDir = path.join(__dirname, 'styles');

let stylesArray = [];

(async function()  {
  const filesNames = await fsPromises.readdir(pathFromDir, { withFileTypes: true });
  for (let item of filesNames) {
    const pathToFile = path.join(pathFromDir, item.name);
    const fileType = path.extname(pathToFile);
    if (fileType === '.css') {
      const styles = await fsPromises.readFile(pathToFile, 'utf8');
      stylesArray.push(`${styles}\n`);
    }
  }
  await fsPromises.writeFile(pathToFile, stylesArray);
  console.log('Bundle.css created');
})();