var Service = require('node-windows').Service;
var svc = new Service({
    name: 'Sistema Gerenciador de Frotas',
    description: 'Node.js server',
    script: 'C:\\Program Files\\Sgf\\index.js'
});

svc.on('uninstall', function () {
   console.log("Desinstalado com sucesso!")
});

svc.uninstall();