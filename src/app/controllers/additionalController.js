const express = require('express');
const Additional = require('../models/Additional');

const router = express.Router();

//Listar todos os cadastros
router.get('/', async (req, res) => {
    try {
      const additionals = await Additional.find().populate(['user', 'additionals']);
  
      return res.send({ additionals });
    } catch (err) {
      return res.status(400).send({ error: 'Error show additionals' });
    }
});

//Exibir um cadastro por id
router.get('/:additionalId', async (req, res) => {
    try {
      const additional = await Additional.findById(req.params.additionalId).populate(['user', 'additionals']);
  
      return res.send({ additional });
    } catch (err) {
      return res.status(400).send({ error: 'Error show additional per id' });
    }
});

//Criar novo cadastro
router.post('/', async (req, res) => {
    try {
      const { desc_additional, price_additional } = req.body;
  
      const additional = await Additional.create({ desc_additional, price_additional, user: req.userId });
  
      await additional.save();
  
      return res.send({ additional });
    } catch (err) {
      return res.status(400).send({ error: 'Error creating new additional' });
    }
});

//Editar um cadastro
router.put('/:additionalId', async (req, res) => {
    try {
      const { desc_additional, price_additional } = req.body;
  
      const additional = await Additional.findByIdAndUpdate(req.params.additionalId, {
        desc_additional,
        price_additional
      }, { new: true, useFindAndModify: false });
   
      await additional.save();
  
      return res.send({ additional });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating additional' });
    }
});

//Remove um cadastro
router.delete('/:additionalId', async (req, res) => {
    try {
      await Additional.findByIdAndRemove(req.params.additionalId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Error deleting additional' });
    }
});

module.exports = app => app.use('/additionals', router);