let { Workout } = require('../models/');
const router = require('express').Router();
 
    // GET route /api/workouts
    router.get('/api/workouts', function(req, res) {
        // Returning the current list of workouts
        Workout.find({})
        .then((data)=> {
            data.forEach(workout => {
                let total = 0;
                workout.exercises.forEach(e=>{
                    total += e.duration;
                })
                workout.totalDuration = total;
            })
            res.json(data);
        })
        .catch((err)=> {
            res.json(err);
        });
    });


    router.put('/api/workouts/:id', function(req, res) {
        // Returning the current list of workouts
   Workout.findOneAndUpdate({
       _id: req.params.id
   },{
       $inc:{totalDuration:req.body.duration}, $push:{exercises:req.body}
   },{
       new:true
   }).then(data =>{
       console.log("putrout succes")
      res.json(data)
   }).catch((err) => {
       res.json(err);
   });

    });

    // PUT route /api/workouts
// router.put('/api/workouts/:id'), (req,res) => {
//     console.log("putrout called")
//    Workout.findOneAndUpdate({
//        _id: req.params.id
//    },{
//        $inc:{totalDuration:req.body.duration}, $push:{exercises:req.body}
//    },{
//        new:true
//    }).then(data =>{
//        console.log("putrout succes")
//       res.json(data)
//    }).catch((err) => {
//        res.json(err);
//    })
// };



    // POST route /api/workouts
    router.post('/api/workouts', (req, res) => {
        Workout.create(req.body)
        .then((data)=> {
            res.json(data)
        })
        .catch((err)=> {
            res.json(err); 
        });
    });

    // GET route /api/workouts/range
    router.get('/api/workouts/range', (req, res) => {
        // Returning the current list of workouts
        Workout.find({})
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.json(err);
        });
    });
     module.exports = router;