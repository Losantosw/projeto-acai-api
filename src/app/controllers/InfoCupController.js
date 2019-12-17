const express = require('express');
const InfoCup = require('../models/InfoCup');
const Additional = require('../models/Additional');
const Acai = require('../models/Acai');

const authMiddleware = require('../middlewares/auth');
const authorizationMiddleware = require('../middlewares/authorization');

const router = express.Router();

router.use(authMiddleware, authorizationMiddleware);

//Listar todos os infocups
router.get('/', async (req, res) => {
  try {
    const infocups = await InfoCup.find().populate(['acai', 'infocups']);

    return res.send({ infocups });
  } catch (err) {
    
    return res.status(400).send({ error: 'Error loading infocups' });
  }
});

//listar os infocups por id
router.get('/:infocupId', async (req, res) => {
  try {
    const infocup = await InfoCup.findById(req.params.infocupId).populate(['acai', 'infocups']);

    return res.send({ infocup });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading infocup' });
  }
});

//Cadastrar os infocups
router.post('/', async (req, res) => {
  try {
    const { size_cup, price_cup, additionals } = req.body;

    const infocup = await InfoCup.create({ size_cup, price_cup, user: req.userId });

    await Promise.all(additionals.map(async additional => {
      const insertAdditional = new Additional({ ...additional, infocup: infocup._id });

      await insertAdditional.save();

      infocup.additionals.push(insertAdditional);
    }));

    await infocup.save();

    return res.send({ infocup });
  } catch (err) {
    return res.status(400).send({ error: 'Error creating new infocup' });
  }
});

//Editar os infocups
router.put('/:infocupId', async (req, res) => {
  try {
    const { size_cup, price_cup, additionals } = req.body;

    const infocup = await InfoCup.findByIdAndUpdate(req.params.infocupId, {
      size_cup,
      price_cup
    }, { new: true, useFindAndModify: false });

    infocup.additionals = [];
    await Additional.remove({ infocup: infocup._id });

    await Promise.all(additionals.map(async additional => {
      const insertAdditional = new Additional({ ...additional, infocup: infocup._id });

      await insertAdditional.save();

      infocup.additionals.push(insertAdditional);
    }) 
    );

    await infocup.save();

    return res.send({ infocup });
  } catch (err) {
    console.log(err);
    return res.status(400).send({ error: 'Error updating infocup' });
  }
});

//Apagar os infocups
router.delete('/:infocupId', async (req, res) => {
  try {
    await InfoCup.findByIdAndRemove(req.params.infocupId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting infocup' });
  }
});

module.exports = app => app.use('/infocups', router);
