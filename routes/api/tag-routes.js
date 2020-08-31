const router = require('express').Router();
const {Tag, Product, ProductTag} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({include: [{model: ProductTag, include: {model: Product}}]});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({where: req.params, include: [{model: ProductTag, include: {model: Product}}]});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const {tag_name} = req.body;
    const data = await Tag.create({tag_name});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const {tag_name} = req.body;
    const [affectedCount] = await Tag.update({tag_name}, {where: req.params});
    if (affectedCount > 0) return res.sendStatus(204);
    else return res.sendStatus(404);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const data = await Tag.destroy({where: req.params});
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
