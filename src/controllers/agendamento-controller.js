const agendamentosModel = require('../models/agendamentos-model');
const pessoasModel = require('../models/pessoas-model');
const unidades = require('../models/unidades-model');

exports.adicionarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;
    agendamentosModel.find((err, agendamentos) => {
        if (err) {
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos e portanto inserir o novo agendamento!"
            });
        }
        for (let i = 0; i < agendamentos.length; i++) {

            if (req.body.id_agendamento == agendamentos[i].id_agendamento) {
                res.json({
                    status: "erro",
                    message: `O agendamento ${req.body.nome} já está cadastrado com o e-mail ${req.body.email}`
                });
                return;
            }
        }
        let agendamento = new agendamentosModel();
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidades_especiais = req.body.necessidades_especiais;
        agendamento.bservacoes_agendamento = req.body.bservacoes_agendamento;
        agendamento.save((erro) => {
            if (erro) {
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir este agendamento."
                });
            } else {
                res.send({
                    status: "ok",
                    message: `O(a) ${req.body.nome} foi inserido(a) com sucesso!`
                });
            }
        })
    });
}

exports.listarAgendamentos = (req, res) => {
    agendamentosModel.find(function (err, agendamentos) {
        if (err) {
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos"
            });
        } else {
            res.json({
                status: "ok",
                agendamentos: agendamentos
            })
        }

    })
}

exports.listarAgendamentoPorId = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosModel.findById(id_agendamento, function (err, agendamento) {
        if (err || !agendamento) {
            console.log(`Não foi possível recuperar o agendamento de ID: ${id_agendamento}`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de ID: ${id_agendamento}`
            });
        } else {
            res.json({
                status: "ok",
                agendamento: agendamento
            })
        }

    });
}

exports.atualizarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosModel.findById(id_agendamento, (erro, agendamento) => {
        if (erro || !agendamento) {
            console.log("Não foi possível recuperar o agendamento!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de ID ${id_agendamento} para atualização`
            });
        } else {
            agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
            agendamento.necessidades_especiais = req.body.necessidades_especiais;
            agendamento.observacoes_agendamento = req.body.observacoes_agendamento;
            agendamento.save(err => {
                if (err) {
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar o agendamento"
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: `Agendamento ${agendamento.nome} atualizado com sucesso!`,
                        novoAgendamento: agendamento
                    })
                }
            });
        }
    })
}

exports.removerAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentosModel.remove({
        _id: id_agendamento
    }, (err) => {
        if (err) {
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar o agendamento"
            });
        } else {
            res.json({
                status: "ok",
                message: "Agendamento deletado com sucesso!"
            })
        }
    })

}