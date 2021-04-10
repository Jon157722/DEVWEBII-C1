const pessoasModel = require('../models/pessoas-model');

exports.adicionarPessoa = (req, res) => {
    pessoasModel.find((err, pessoas) => {
        if (err) {
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas e portanto inserir a nova pessoa!"
            });
        }
        for (let i = 0; i < pessoas.length; i++) {

            if (req.body.email == pessoas[i].email) {
                res.json({
                    status: "erro",
                    message: `A pessoa ${req.body.nome} já está cadastrado com o e-mail ${req.body.email}`
                });
                return;
            }
        }
        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.body.nome;
        pessoa.cpf_pessoa = req.body.cpf;
        pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.email_pessoa = req.body.email_pessoa;
        pessoa.save((erro) => {
            if (erro) {
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir esta pessoa."
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

exports.listarPessoas = (req, res) => {
    pessoasModel.find(function (err, pessoas) {
        if (err) {
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas"
            });
        } else {
            res.json({
                status: "ok",
                pessoas: pessoas
            })
        }

    })
}

exports.listarPessoaPorId = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, function (err, pessoa) {
        if (err || !pessoa) {
            console.log(`Não foi possível recuperar a pessoa de ID: ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de ID: ${id_pessoa}`
            });
        } else {
            res.json({
                status: "ok",
                pessoa: pessoa
            })
        }

    });
}

exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (erro, pessoa) => {
        if (erro || !pessoa) {
            console.log("Não foi possível recuperar a pessoa!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de ID ${id_pessoa} para atualização`
            });
        } else {
            pessoa.nome_pessoa = req.body.nome;
            pessoa.cpf_pessoa = req.body.cpf;
            pessoa.data_nascimento_pessoa = req.body.data_nascimento_pessoa;
            pessoa.telefone_pessoa = req.body.telefone_pessoa;
            pessoa.grupo_prioritario = req.body.grupo_prioritario;
            pessoa.email_pessoa = req.body.email_pessoa;
            pessoa.save(err => {
                if (err) {
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar a pessoa"
                    });
                } else {
                    res.json({
                        status: "ok",
                        message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
                        novaPessoa: pessoa
                    })
                }
            });
        }
    })
}

exports.removerPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa
    }, (err) => {
        if (err) {
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar a pessoa"
            });
        } else {
            res.json({
                status: "ok",
                message: "Pessoa deletada com sucesso!"
            })
        }
    })

}