const {ipcRenderer} = require("electron");
const fs = require('fs-extra');
const path = require('path')
  
  window.ipcRenderer = ipcRenderer;
  window.fs = fs;
  window.path = path
  