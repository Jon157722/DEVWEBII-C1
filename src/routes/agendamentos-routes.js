let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller');

router.post('/', pessoasController.adicionarPessoa);

router.get('/', pessoasController.listarPessoas);

router.get('/:id', pessoasController.listarPessoaPorId);

router.put('/:id', pessoasController.atualizarPessoa);

router.delete('/:id', pessoasController.removerPessoa);

module.exports = router;