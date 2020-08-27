const router = require('express').Router();
const {Category, Product} = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({include: {model: Product}});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const data = await Category.findOne({where: req.params, include: {model: Product}});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const data = await Category.create(req.body);
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const data = await Category.update(req.body, {where: req.params});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const data = await Category.destroy({where: req.params});
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
