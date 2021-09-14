const moment = require('moment');
const connection = require('./../infra/connection')
class Atendimento {
    add(atendimento, res) {
        const dataCriação = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const dataValida = moment(data).isSameOrAfter(dataCriação);
        const cliente = atendimento.cliente.length >= 5;

        const validation = [
            {
                name: 'data',
                validate: dataValida,
                message: "Data deve ser maior ou igual a data atual"
            }, 
            {
                name: 'Cliente',
                validate: cliente,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const errors = validation.filter(campo => campo.validate);
        const existsErrors = errors.length;

        if(existsErrors) {
            res.status(400).json(errors);
        } else {
            const atendimentoDatado = {...atendimento, dataCriação, data};
    
            const sql = 'insert into Atendimentos set ?' // oq passar será inserido na table
            
            connection.query(sql, atendimentoDatado,  (error, result)=> {
                if(error) {
                    res.status(400).json(error);
                } else res.status(201).json(atendimento);
            })
        }

    }

    list(res)  {
        const sql = "select * from Atendimentos";

        connection.query(sql, (error, results)=> {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        })
    }

    getById(id, res) {
        const sql = `select * from Atendimentos where id=${id}`;

        
        connection.query(sql, (error, results)=> {
            const atendimento = results[0]
            if(error) {
                res.status(404).json(error);
            } else {
                res.status(200).json(atendimento)
            }
        })
    }

    alter(id, values, res) {
        if(values.data) {
            values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = 'update Atendimentos set ? where id=?';

        connection.query(sql, [valores, id], (error, results) => {
            if(error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({...values, id});
            }
        })
    }

    delete(id, res) {
        const sql = 'delete from Atendimentos where id=?';

        connection.query(sql, id, (error, results)=> {
            if(error) {
                res.status(400).json(error);
            }else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento;