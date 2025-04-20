const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data');

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

contextBridge.exposeInMainWorld('api', {
  readData: (filename) => {
    const filePath = path.join(dataPath, filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf-8');
    }
    return null;
  },
  writeData: (filename, data) => {
    const filePath = path.join(dataPath, filename);
    fs.writeFileSync(filePath, data, 'utf-8');
  },
  // Additional APIs can be added here
});
