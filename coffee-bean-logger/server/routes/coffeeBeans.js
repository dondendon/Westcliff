const express = require('express');
const CoffeeBean = require('../models/CoffeeBean');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all coffee beans for user
router.get('/', auth, async (req, res) => {
  try {
    const { sort = '-createdAt', search, rating, brand } = req.query;
    
    // Build query
    let query = { userId: req.user._id };
    
    // Add search functionality
    if (search) {
      query.$or = [
        { brand: { $regex: search, $options: 'i' } },
        { origin: { $regex: search, $options: 'i' } },
        { flavorProfile: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Filter by rating
    if (rating) {
      query.rating = parseInt(rating);
    }
    
    // Filter by brand
    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    const coffeeBeans = await CoffeeBean.find(query)
      .sort(sort)
      .populate('userId', 'username');

    res.json(coffeeBeans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single coffee bean
router.get('/:id', auth, async (req, res) => {
  try {
    const coffeeBean = await CoffeeBean.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!coffeeBean) {
      return res.status(404).json({ message: 'Coffee bean not found' });
    }

    res.json(coffeeBean);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create coffee bean
router.post('/', auth, async (req, res) => {
  try {
    const coffeeBean = new CoffeeBean({
      ...req.body,
      userId: req.user._id
    });

    await coffeeBean.save();
    res.status(201).json(coffeeBean);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Update coffee bean
router.put('/:id', auth, async (req, res) => {
  try {
    const coffeeBean = await CoffeeBean.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!coffeeBean) {
      return res.status(404).json({ message: 'Coffee bean not found' });
    }

    res.json(coffeeBean);
  } catch (error) {
    res.status(400).json({ message: 'Update error', error: error.message });
  }
});

// Delete coffee bean
router.delete('/:id', auth, async (req, res) => {
  try {
    const coffeeBean = await CoffeeBean.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!coffeeBean) {
      return res.status(404).json({ message: 'Coffee bean not found' });
    }

    res.json({ message: 'Coffee bean deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;