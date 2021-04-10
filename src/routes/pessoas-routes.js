let router = require('express').Router();

const agendamentosController = require('../controllers/agendamento-controller');

router.post('/', agendamentosController.adicionarAgendamento);

router.get('/', agendamentosController.listarAgendamentos);

router.get('/:id', agendamentosController.listarAgendamentoPorId);

router.put('/:id', agendamentosController.atualizarAgendamento);

router.delete('/:id', agendamentosController.removerAgendamento);

module.exports = router;