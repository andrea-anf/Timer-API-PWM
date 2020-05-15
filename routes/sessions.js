var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


// //GET USER'S SESSION BY DAY--@@@@@@@@@@@@@@@@@@@@@@@
// router.get('/getByDay', (req, res) => {
//   var id = req.body._id;
//   var start = req.body.t_start;
//   User
// //   .aggregate([
// //     // Get just the docs that contain a shapes element where color is 'red'
// //     {$match: {'sessins.finished': true}},
// //     {$project: {
// //         sessions: {$filter: {
// //             input: '$sessions',
// //             as: 'session',
// //             cond: {$eq: ['$$sessions.', 'red']}
// //         }},
// //         _id: 0
// //     }}
// // ])
//   .findOne({_id:id}, {sessions: {$elemMatch: {finished: false}}})
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
//         ID: result._id,
//         SESSIONS: result.sessions
//       }
//     });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({ error : "Error searching for user: "+ req.body._id });
//   });
// });



//GET ALL USER'S SESSIONS--@@@@@@@@@@@@@@@@@@@@@@@
router.get('/getAll/:id', (req, res) => {
  User
  .findById(req.params.id)
  .then(result => {
    if(!result){
      return res.status(404).send({ message: 'User not found' })
    }
    res.status(200).json({
      request: {
        TYPE: 'GET',
        DESCRIPTION:'Showing sessions'
      },
      user: {
        _id: result._id,
        sessions: result.sessions
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ error : "Error searching for user: "+ req.params.id });
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
        description:'Adding one session to user '+result._id
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


  module.exports = router;

function parseHours(hour){
  var num_hour = parseInt(hour,10)
  num_hour= num_hour+2;
  return hour= Number(num_hour);
}
// SHOW user's sessions from date-x to date-y

// router.post('/sessions/from-to', (req, res, next) => {
//   var id = req.body._id;
//   var fromDate = req.body.from_date;
//   var toDate = req.body.to_date;
//   console.log("Trova da ",fromDate," A ",toDate);
  
// //{'sessions.date': {$gt: new Date(fromDate), $lt: new Date(toDate)}}
// // to search id && mins -- {$and:[{_id : id},{'sessions.mins': 40}]} --

// // {$match: {'sessions.mins':40}},
// // {$project: {sessions: {$filter: {
// //   input: '$sessions',
// //   as: 'mins',
// //   cond: {$ed: ['$$sessions.mins',40]}
// // }}} }

//   User
//   .find(
//     {
//       "$filter": {
//         input: 'sessions',
//         as: "session",
//         cond: {$gte:["$$session.mins", 40]}
//       }
//     }
//   )
//   .exec()
//   .then(docs => {
//     res.status(200).json({      
//       request: {
//       type: 'POST',
//       description:'Showing sessions'
//     },
//     id: docs._id,
//     name1: docs.name,
//     sessions: docs.sessions,
//     user: docs.map(doc => {
//       return{
//         id: doc._id,
//         sessions: doc.sessions,
//       }
//     }),
//   });
//   })
//   .catch(err => {
//     console.log(err);
//     res.status(500).json({
//       error : err
//     });
//   });
// });
