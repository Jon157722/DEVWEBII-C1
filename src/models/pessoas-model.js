const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
    nome_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    data_nascimento_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo_prioritario: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    },
    email_pessoa: {
        type: mongoose.Schema.Types.String,
        default: true
    }
});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}