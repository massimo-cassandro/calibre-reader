const config = {
  /*
    Configurazione per `update-version`
    Nessun parametro è obbligatorio
  */
  updateVersion: {
    twigVarsFile     : null,   // default null
    htmlFiles        : ['./dist/index.php'],
    skipDescrPrompt  : false,  // default false
    patchOnly        : false,  // default false
    defaultDescr     : 'Fix'    // default null
  },


};

export default config;
