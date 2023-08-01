const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Player = require('../Model/Schema') // Update the path to your Player schema
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'your-secret-key';

router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;
    const existingPlayer = await Player.findOne({ username });
    if (existingPlayer) {
      return res.status(409).json({ error: 'User already exists' });
    }
    const player = new Player({
      firstname,
      lastname,
      username,
      password,
    });
    await player.save();

    res.status(201).json({ message: 'Player registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const player = await Player.findOne({ username }); // Updated to use Player model
    if (!player) {
      return res.status(401).json({ error: 'Invalid credentials' }); // Updated the error response message
    }
    const isPasswordValid = await bcrypt.compare(password, player.password); // Updated to use Player model
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' }); // Updated the error response message
    }
    const token = jwt.sign({ userId: player._id }, jwtSecret);
    res.status(201).json({message:"Login sucessfull",token})
    
   
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
