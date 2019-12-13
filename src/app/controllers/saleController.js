const express = require('express');
const Sale = require('../models/Sale');
const Acai = require('../models/Acai');
const Additional = require('../models/Additional');

const router = express.Router();

//Listar todos os cadastros
router.get('/', async (req, res) => {
    try {
      const sales = await Sale.find().populate(['user', 'sales']);
  
      return res.send({ sales });
    } catch (err) {
      return res.status(400).send({ error: 'Error show sales' });
    }
});

//Exibir um cadastro por id
router.get('/:saleId', async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.saleId).populate(['user', 'sales']);
  
      return res.send({ sale });
    } catch (err) {
      return res.status(400).send({ error: 'Error show sale per id' });
    }
});

//Cadastrar nova venda
router.post('/', async (req, res) => {
    try {
      const { qtd_acai, qtd_additional, final_price, acais, additionals } = req.body;
  
      const sale = await Sale.create({ qtd_acai, qtd_additional, final_price, user: req.userId });
  
      await Promise.all(acais.map(async acai => {
        const saleAcai = new Acai({ ...acai, sale: sale._id });
  
        await saleAcai.save();
  
        sale.acais.push(saleAcai);
      }));

      await Promise.all(additionals.map(async additional => {
        const saleAdditional = new Additional({ ...additional, sale: sale._id });
  
        await saleAdditional.save();
  
        sale.additionals.push(saleAdditional);
      }));

      //CODE HERE #############################################################
  
      await sale.save();
  
      return res.send({ sale });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: 'Error creating new sale' });
    }
});

//Editar venda
router.put('/:saleId', async (req, res) => {
    try {
      const { qtd_acai, qtd_additional, final_price, acais, additionals } = req.body;
  
      const sale = await Sale.findByIdAndUpdate(req.params.saleId, {
        qtd_acai,
        qtd_additional,
        final_price
      }, { new: true });
  
      sale.acais = [];
      sale.additionals = [];
      await Acai.remove({ sale: sale._id });
      await Additional.remove({ sale: sale._id });
  
      await Promise.all(acais.map(async acai => {
        const saleAcai = new Acai({ ...acai, sale: sale._id });
  
        await saleAcai.save();
  
        sale.acais.push(saleAcai);
      }));

      await Promise.all(additionals.map(async additional => {
        const saleAdditional = new Additional({ ...additional, sale: sale._id });
  
        await saleAdditional.save();
  
        sale.additionals.push(saleAdditional);
      }));
  
      await sale.save();
  
      return res.send({ sale });
    } catch (err) {
      return res.status(400).send({ error: 'Error updating sale' });
    }
});


//Apagar venda
router.delete('/:saleId', async (req, res) => {
  try {
    await Sale.findByIdAndRemove(req.params.saleId);
  
    return res.send();
  } catch (err) {
      return res.status(400).send({ error: 'Error deleting sale' });
  }
});
  


module.exports = app => app.use('/sales', router);