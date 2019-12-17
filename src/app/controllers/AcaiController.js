const express = require('express');
const Acai = require('../models/Acai');
const Additional = require('../models/Additional');
const InfoCup = require('../models/InfoCup');

const authMiddleware = require('../middlewares/auth');
const authorizationMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.use(authMiddleware, authorizationMiddleware);

//Listar todos os cadastros
router.get('/', async (req, res) => {
    try {
      const acais = await Acai.find().populate(['user', 'acais']);
  
      return res.send({ acais });
    } catch (err) {
      return res.status(400).send({ error: 'Error show acais' });
    }
});

//Exibir um cadastro por id
router.get('/:acaiId', async (req, res) => {
    try {
      const acai = await Acai.findById(req.params.acaiId).populate(['user', 'acais']);
  
      return res.send({ acai });
    } catch (err) {
      return res.status(400).send({ error: 'Error show acai per id' });
    }
});

//Criar novo cadastro
router.post('/', async (req, res) => {
  try {
    const { name_product, infocups } = req.body;

    const acai = await Acai.create({ name_product, user: req.userId });

    await Promise.all(infocups.map(async infocup => {
      const insertInfoCups = new InfoCup({ ...infocup, acai: acai._id });

      await insertInfoCups.save();

      acai.infocups.push(insertInfoCups);
    }));
    

    await acai.save();

    return res.send({ acai });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error creating new acai' });
  }
});

//Editar um cadastro
router.put('/:acaiId', async (req, res) => {
    try {
      const { name_product } = req.body;
  
      const acai = await Acai.findByIdAndUpdate(req.params.acaiId, req.additionalId,{
        name_product,
    
      }, { new: true, useFindAndModify: false });
   
      await acai.save();
  
      return res.send({ acai });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating acai' });
    }
});

//Remove um cadastro
router.delete('/:acaiId', async (req, res) => {
    try {
      await Acai.findByIdAndRemove(req.params.acaiId);
  
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Error deleting acai' });
    }
});

module.exports = app => app.use('/acais', router);