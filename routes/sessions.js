var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');


// //GET USER'S SESSION BY DAY--@@@@@@@@@@@@@@@@@@@@@@@
// router.get('/getByDay', (req, res) => {
//   var id = req.body._id;
//   var start = req.body.t_start;
//   User
//   .findOne( {_id: id})
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
        ID: result._id,
        SESSIONS: result.sessions
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
  var session = {
    date: new Date(req.body.date),
    finished: true,
    t_start: req.body.t_start,
    t_end: req.body.t_end,
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
        type: 'GET',
        description:'Adding one session to user '+result._id
      },
      user: {
        ID: result._id,
        NEW_SESSION: {
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
