var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


//GET USER'S SESSION BY DAY--@@@@@@@@@@@@@@@@@@@@@@@
router.get('/getByDay', (req, res) => {
  var id = req.body._id;
  var date = req.body.date;
  User
  .aggregate([
    { $match: {'_id' : mongoose.Types.ObjectId(id)}},
    {$project: {
      sessions: {$filter: {
          input: '$sessions',
          as: 'session',
          cond: {$eq: ['$$session.date', new  Date(date)]}
      }}
    }}
])
  .then(result => {
    if(!result){
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).json({
      request: {
        type: 'POST',
        description:'Showing sessions by day'
      },
      user: {
        _id: result[0]._id,
        sessions: result[0].sessions
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error : "Error searching for user: "+ req.body._id });
  });
});





//ADD NEW SESSION TO USER
router.post('/add', (req, res) => {
  var id = req.body._id;
  var hour_start = parseHours(req.body.t_start.slice(0,2));
  var mins_start = req.body.t_start.slice(3);

  var hour_end = parseHours(req.body.t_end.slice(0,2));
  var mins_end = (req.body.t_end.slice(3));

  console.log(mins_start,mins_end);

  var time_start = new Date();
  time_start.setHours(hour_start,mins_start);

  var time_end = new Date();
  time_end.setHours(hour_end,mins_end);

  var session = {
    date: new Date(req.body.date),
    finished: req.body.finished,
    t_start: time_start,
    t_end: time_end,
    tag: req.body.tag,
    note: req.body.note
  }
  User
  .findByIdAndUpdate(id, {$push: {sessions: session}})
  .then(result => {
    if(!result){
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({
      request: {
        type: 'POST',
        description:'Adding new session to user '+result._id
      },
      user: {
        _id: result._id,
        new_session: {
          date: session.date,
          finished: session.finished,
          t_start: session.t_start,
          t_end: session.t_end,
          tag: session.tag,
          note: session.note
        }
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

// //GET ALL USER'S SESSIONS--@@@@@@@@@@@@@@@@@@@@@@@
// router.get('/getAll/:id', (req, res) => {
//   User
//   .findById(req.params.id)
//   .then(result => {
//     if(!result){
//       return res.status(404).send({ message: 'User not found' })
//     }
//     res.status(200).json({
//       request: {
//         TYPE: 'GET',
//         DESCRIPTION:'Showing sessions'
//       },
//       user: {
//         _id: result._id,
//         sessions: result.sessions
//       }
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ error : "Error searching for user: "+ req.params.id });
//   });
// });

function parseHours(hour){
  var num_hour = parseInt(hour,10)
  num_hour= num_hour+2;
  return hour= Number(num_hour);
}

module.exports = router;
