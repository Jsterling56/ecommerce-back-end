const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
    }else {
      res.status(200).json(tag);
    }
  } catch (error) {
    res.status(500).json(error);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (error){
    res.status(500).json(error);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowCount] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'Tag not found' });
    }else{
      res.status(200).json({ message: 'Tage updated' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }
    await tag.destroy();
    res.status(204).json({ message: 'Tag deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
  // delete on tag by its `id` value
});

module.exports = router;
