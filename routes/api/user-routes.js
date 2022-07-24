
const router = require('express').Router();
const {User} = require("../../models")

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get('/', (req,res)=> {
    User.findAll({
        include: [{model: User, as: "friends"}]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );

})

//TODO - ROUTE THAT CREATES A NEW USER
router.post('/', (req,res)=> {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );


});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get('/:userId', (req,res) => {
    User.findOne({
        where: {
            id: req.params.userId
        },
        include: [{model: User, as: "friends"}]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );


})

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put('/:userId', (req,res)=> {
    User.update(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        },
        {
            where: {
                id: req.params.userId
            }
        }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );

})

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete('/:userId', (req,res)=> {
    User.destroy({
        where: {
            id: req.params.userId
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );


});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put('/:userId/friends/:friendId', (req,res)=> {
    User.update(
        {
            friends: req.body.friends
        },
        {
            where: {
                id: req.params.userId
            }
        }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );


})

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete('/:userId/friends/:friendId', (req,res)=> {
    User.destroy({
        friends: {
            id: req.params.friendId

        },
        where: {
            id: req.params.userId
        }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }
    );
  
});

module.exports = router;
