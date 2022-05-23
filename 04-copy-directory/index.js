const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const originDirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');
fs.access(copyDirPath, (data) => {
  if(data) {
    fsPromises.mkdir(copyDirPath);
    console.log('Files-copy created');
  }
  else{
    console.log('Files-copy already exist');
  }
})
async function copyDir(fromDir, toDir){
  const filesNames = await fsPromises.readdir(fromDir, { withFileTypes: true });
  await fsPromises.rm(toDir, { force: true, recursive: true });
  await fsPromises.mkdir(toDir, { recursive: true });
  for (let item of filesNames) {
    const currentItemPath = path.join(fromDir, item.name);
    const copyItemPath = path.join(toDir, item.name);
    if (item.isDirectory()) {
      await fsPromises.mkdir(copyItemPath, { recursive: true });
      await copyDir(currentItemPath, copyItemPath);
    } else if (item.isFile()) {
      await fsPromises.copyFile(currentItemPath, copyItemPath);
    }
  }
}
copyDir(originDirPath, copyDirPath);
