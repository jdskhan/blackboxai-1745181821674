const { contextBridge } = require('electron');

// Expose APIs to renderer process if needed in future
contextBridge.exposeInMainWorld('api', {
  // Placeholder for future APIs
});
