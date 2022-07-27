
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {
    try {
        User.findAll({
            include: [{
                model: User,
                as: "friends"
            }]
        })
        .then(users => {
            res.status(200).json(users)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', (req,res)=> {
   try {
       User.create(req.body)
       .then(user => {
           res.status(201).json(user)
       }).catch(err => {
           console.log(err)
           res.status(500).json(err)
       }
       )
   }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {
    try {
        User.findById(req.params.userId, {
            include: [{
                model: User,
                as: "friends"
            }]
        })
        .then(user => {
            res.status(200).json(user)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        }
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', (req,res)=> {
   try {
       User.update(req.body, {
           where: {
               id: req.params.userId
           }
       })
       .then(user => {
           res.status(200).json(user)
       }).catch(err => {
           console.log(err)
           res.status(500).json(err)
       }
       )
   }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {
    try {
        User.destroy({
            where: {
                id: req.params.userId
            }
        })
        .then(user => {
            res.status(200).json(user)
        }).catch(err => {
            console.log(err)
            res.status(500).json(err)
        }
        )
    }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }


});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', (req,res)=> {
    try {
        User.findById(req.params.userId)
        .then(user => {
            user.addFriend(req.params.friendId)
            .then(() => res.json(user))
        }
        )
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req,res)=> {
    try {
        User.findById(req.params.userId)
        .then(user => {
            user.removeFriend(req.params.friendId)
            .then(() => res.json(user))
        }
        )
        console.log('SUCESSFULLY DELETED FRIEND')
        res.status(200).json('SUCESSFULLY DELETED FRIEND')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

  
});

module.exports = router;
