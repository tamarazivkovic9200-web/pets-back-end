const express = require('express');
const router = express.Router();
const Pet = require('../models/pet.js');

// READ (INDEX) - GET /pets
router.get('/', async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.status(201).json(allPets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// CREATE (POST /pets)
router.post('/', async (req, res) => {
  try {
    const createdPet = await Pet.create(req.body);
    res.status(201).json(createdPet);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// READ - GET - /pets/:petId
router.get('/:petId', async (req, res) => {
  try {
    // Find one pet by its MongoDB _id
    const foundPet = await Pet.findById(req.params.petId);

    // If no pet found, return 404
    if (!foundPet) {
      return res.status(404).json({ err: 'Pet not found' });
    }

    // Success: return the found pet
    res.status(200).json(foundPet);
  } catch (err) {
    console.error(err);
    // If invalid ID format or server error
    res.status(500).json({ err: err.message });
  }
});

router.delete('/:petId', async (req, res) => {
  try {
    const { petId } = req.params;

    // Attempt to delete the pet by ID
    const deletedPet = await Pet.findByIdAndDelete(petId);

    // If no pet found, return 404
    if (!deletedPet) {
      return res.status(404).json({ err: 'Pet not found' });
    }

    // Success: return deleted pet object
    res.status(200).json(deletedPet);
  } catch (err) {
    console.error(err);
    // Server error
    res.status(500).json({ err: err.message });
  }
});

// UPDATE - PUT - /pets/:petId

router.put('/:petId', async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
      new: true,
    });
    if (!updatedPet) {
      res.status(404);
      throw new Error('Pet not found.');
    }
    res.status(200).json(updatedPet);
  } catch (err) {
    // Add code for errors
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

module.exports = router;