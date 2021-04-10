const mongoose = require('mongoose');

const unidadeSchema = mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        default: true
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        default: true
    },
    latlong_unidade: {
        type: mongoose.Schema.Types.String,
        default: true
    }
});

let Unidade = module.exports = mongoose.model('unidade', unidadeSchema);

module.exports.get = function (callback, limit) {
    Unidade.find(callback).limit(limit);
}