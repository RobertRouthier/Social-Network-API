const router = require("express").Router();
const { User } = require("../../models");

//TODO - ROUTE THAT GETS ALL THE USERS, include friends?
router.get("/", async (req, res) => {
  try {
    let users = await User.find({
      include: [
        {
          model: User,
          as: "friends",
        },
      ],
    })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT CREATES A NEW USER
router.post("/", async (req, res) => {
  try {
    let newUser = await User.create(req.body)
     console.log(newUser)
    res.status(201).json(newUser)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.get("/:userId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT UPDATES A SINGLE USER
router.put("/:userId", async (req, res) => {
  try {
    let updatedUser = await User.findOneAndUpdate(req.body);
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.delete("/:userId", async (req, res) => {
  try {
    let deletedUser = await User.findOneAndDelete({
      where: {
        id: req.params.userId,
      },

    });
    console.log(deletedUser);
    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT ADDS A FRIEND TO A USER
router.put("/:userId/friends/:friendId", async (req, res) => {
  try {
    let newFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
       { friends: req.params.friendId }
    )
    console.log( newFriend)
    res.status(200).json(newFriend)

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//TODO - ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    let deletedFriend = await User.findOneAndUpdate({_id: req.params.userId}, {$pull: {friends: req.params.friendId}}, {new: true})
    
    console.log("SUCESSFULLY DELETED FRIEND", deletedFriend);
    res.status(200).json(deletedFriend);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
