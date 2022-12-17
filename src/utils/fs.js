const fs = window.require('fs-extra');

 const fsUtils = {
   readJson: async (name,callback) => {
     if (!name) {
       return;
     }

    await fs.readJSON(`${process.cwd()}/src/common/${name}`,(err,data)=>{
        callback(data)
    });
   },

   writeJson: async (name, data, callback) => {
    if (!name) {
      return;
    }

   await fs.writeJSON(`${process.cwd()}/src/common/${name}`,data,(err,res)=>{
    if(callback){
      callback()
    }
   });
   },
 };
 
 export default fsUtils;
 