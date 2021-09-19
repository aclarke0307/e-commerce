const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try{
    const d = await Category.findAll({
      include: [{model: Product}]
    })
    res.status(200).json(d);
  } catch (err){
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
    try {
      const d = await Category.findByPk(req.params.id, {
        include: [{model: Product}]
      })
      if(!d){
        res.status(404).json({message: 'Can not find category with this ID'});
      } else {
        res.status(200).json(d);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const d = await Category.create(req.body);
    res.status(200).json(d);
  }catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const d = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(!d[0]){
      res.status(404).json({message: 'can not find a category with this ID'});
    }else {
      res.status(200).json(d);
    }
  }catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const d = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!d){
      res.status(404).json({message: 'can not find a category with this ID'});
    } else {
      res.status(200).json(d);
    }
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
