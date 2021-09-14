const customExpress = require('./config/custom-express');
const connection =  require('./infra/connection');
const tables = requrie('./infra/tables.js');
connection.connect(error=> {
    if(error) console.log(error)
    else {
        
        tables.init(connection);
        const app = customExpress();

        app.listen(3000, () => console.log('servidor rodando na porta 3000'));
    }
});

//after npm i mysql