const router = require('express').Router();
const {Product, Category, Tag, ProductTag} = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const data = await Product.findAll({include: [{model: ProductTag, include: {model: Tag}}, {model: Category}]});
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const data = await Product.findOne({
      where: req.params,
      include: [{model: ProductTag, include: {model: Tag}}, {model: Category}],
    });
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      category_id: 1,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const {product_name, price, stock, tagIds, category_id} = req.body;
    const product = await Product.create({product_name, price, stock, tagIds, category_id});
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = tagIds.map((tag_id) => ({product_id: product.id, tag_id}));
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      return res.status(200).json([product, productTagIds]);
    }
    // if no product tags, just respond
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // update product data
    const [affectedCount] = await Product.update(req.body, {where: req.params});
    if (affectedCount < 1) return res.sendStatus(404);
    // find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({where: {product_id: req.params.id}});
    const productTagIds = productTags.map(({tag_id}) => tag_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => ({
        product_id: req.params.id,
        tag_id,
      }));
    // figure out which ones to remove
    const productTagsToRemove = productTags.filter(({tag_id}) => !req.body.tagIds.includes(tag_id)).map(({id}) => id);
    // run both actions
    await ProductTag.destroy({where: {id: productTagsToRemove}});
    const updatedProductTags = await ProductTag.bulkCreate(newProductTags);
    return res.json(updatedProductTags);
  } catch (err) {
    // console.log(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    await Product.destroy({where: req.params});
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
