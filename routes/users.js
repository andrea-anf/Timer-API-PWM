var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


//DELETE ALL USER'S SESSIONS
router.delete('/:id', (req, res) => {
  User
  .findByIdAndUpdate(req.params.id, {$pull: {"sessions": {}}})
  .exec()
  .then(result => {
    if(!result){
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).json({
      request: {
        TYPE: 'DELETE',
        DESCRIPTION: 'All sessions deleted'
      },
      user: {
        ID: result._id,
        SESSIONS: result.sessions
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
  });
});


//CREATE NEW USER
router.post('/newUser', async (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId()
  });
  
  try {
    const newUser = await user.save()
    res.status(201).json({
      request:{
        TYPE: 'POST',
        DESCRIPTION: 'New user created'
      },
      user: {
        ID: newUser._id
      }
      })
  } catch (err) {
    res.status(400).json({message: err.message})
  }
})


module.exports = router;
