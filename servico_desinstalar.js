var Service = require('node-windows').Service;
var svc = new Service({
    name: 'Sistema Gerenciador de Frotas',
    description: 'Node.js server',
    script: 'C:\\Users\vidal\\Downloads\\sistema_gerenciamento_de_frotas\\index.js'
});

svc.on('uninstall', function () {
   console.log("Desinstalado com sucesso!")
});

svc.uninstall();