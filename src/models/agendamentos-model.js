const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    data_hora_agendamento: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    necessidades_especiais: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    observacoes_agendamento: {
        type: mongoose.Schema.Types.String,
        required: false
    }
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function (callback, limit) {
    Agendamento.find(callback).limit(limit);
}