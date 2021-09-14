class Tables {
    init(connection) {
        this.connection = connection;
        this.criarAtendimento();
    }

    criarAtendimento() {
        const sql = `create table if not exists Atendimentos (id int not null auto_increment,
             client varchar(50) not null,
              pet varchar(20), 
              service varchar(20) not null, 
              status varchar(20) not null,
               observables text, primary key(id))`;

        this.connection.query(sql, (error)=> {
            if(error)console.log(error);
            else console.log("Success!")
        })
    }

}

module.exports = Tables;