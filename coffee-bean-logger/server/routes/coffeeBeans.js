const express = require('express');
const CoffeeBean = require('../models/CoffeeBean');
const auth = require('../middleware/auth');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const requireAuth = require('../middleware/auth');
router.use(requireAuth); // ⬅️ this must be above your routes

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // or wherever you want to store the files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

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
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { data } = req.body;
    const coffeeData = JSON.parse(data);

    coffeeData.userId = req.user._id;

    if (req.file) {
      coffeeData.imageUrl = `/uploads/${req.file.filename}`; // ✅ matches frontend
    }

    const newCoffeeBean = new CoffeeBean(coffeeData);
    await newCoffeeBean.save();

    res.status(201).json(newCoffeeBean);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save coffee bean', error });
  }
});



router.put('/:id', requireAuth, upload.single('image'), async (req, res) => {
  try {
    const { data } = req.body;
    const coffeeData = JSON.parse(data);
    const { id } = req.params;

    // Add userId for security
    coffeeData.userId = req.user._id;

    // Get existing bean so we can preserve imageUrl if needed
    const existingBean = await CoffeeBean.findOne({ _id: id, userId: req.user._id });
    if (!existingBean) {
      return res.status(404).json({ message: 'Coffee bean not found' });
    }

    // If new image is uploaded, set it. Otherwise, preserve existing.
    coffeeData.imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : existingBean.imageUrl;

    const updatedBean = await CoffeeBean.findByIdAndUpdate(id, coffeeData, {
      new: true,
      runValidators: true
    });

    res.json(updatedBean);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed', error: err.message });
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