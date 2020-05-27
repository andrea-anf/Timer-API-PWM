var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

//CREATE NEW USER
router.post('/newUser', async (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId()
  });
  try {
    const newUser = await user.save()
    res.status(201).json({
      request: {
        type: 'POST',
        description: 'New user created'
      },
      user: {
        _id: newUser._id
      }
    })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


//DELETE ALL USER'S SESSIONS
router.delete('/:id', (req, res) => {
  User
    .findByIdAndUpdate(req.params.id, { $pull: { "sessions": {} } })
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).send({ message: 'User not found' })
      }
      res.status(200).json({
        request: {
          type: 'DELETE',
          description: "Deleting all user's sessions"
        },
        user: {
          _id: result._id,
          sessions: result.sessions
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
