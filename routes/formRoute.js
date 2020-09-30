const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

router.get('/', (req, res)=>{
    const getData = User.find().then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({message:err});
    })
});
router.post('/api', (req, res, next)=>{
    res.setHeader('Content-type', "application/json")
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        about :req.body.about
    });
    console.log(req.body);
    user.save().then(data=>{
        console.log("User is sucessfully added to the data base");
        res.json(data);
    }).catch(err=>{
        res.send("Some error occured")
    })
});

router.post('/:apiId', (req, res)=>{
    const apiID = User.findById(req.params.apiId).then(id=>{
        res.json(id);
    }).catch(err=>{
        res.json({message:'Not found'});
    })
});

router.delete('/:apiId', (req,res)=>{
    User.remove({_id:req.params.apiId}).then(data=>{
        res.json({meassge:data, info:"sucessfully delete the user"});
    }).catch(err=>{
        res.json({message:err});
    })
});

router.patch('/:apiId', (req, res)=>{
    User.updateOne({_id:req.params.apiId}, {$set:{name:req.body, phone:req.body.phone, email:req.body.email }}).then(updated=>{
        res.json(updated);
    }).catch(err=>{
        res.json({message:err});
    })
})
module.exports = router;
