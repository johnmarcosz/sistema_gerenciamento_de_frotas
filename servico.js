
// INSTALAR: abre cmd como admin -> cd C:\Users\vidal\Downloads\sistema_gerenciamento_de_frotas -> node servico.js
// DESINSTALAR: abre cmd com admin -> C:\Users\vidal\Downloads\sistema_gerenciamento_de_frotas -> node servico_desinstalar.js

var Service = require('node-windows').Service;
var svc = new Service({
    name: 'Sistema Gerenciador de Frotas',
    description: 'Node.js server',
    script: 'C:\Users\vidal\Downloads\sistema_gerenciamento_de_frotas\index.js'
});

svc.on('install', function () {
    svc.start();
    console.log("Instalado com sucesso!")
});

svc.install();