
const router = require('express').Router();
const { Thought, Reaction} = require('../../models')

//TODO: ROUTE TO GET ALL THOUGHTS
router.get('/', async (req,res)=> {
   try {
    let thoughts = await Thought.find({})
    console.log(thoughts)
    res.status(200).json(thoughts)

    } catch (err) {
         console.log(err)
         res.status(500).json(err)
    }
})

//TODO: ROUTE TO CREATE A NEW THOUGHT
router.post('/', async (req,res)=> {
    try {
    let newThought = await Thought.create(req.body)
    console.log(newThought)
    res.status(201).json(newThought)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.get('/:thoughtId', async (req,res)=> {
    try {
    let thought = await Thought.findById(req.params.thoughtId)
    console.log(thought)
    res.status(200).json(thought)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
   
}
)



//TODO: ROUTE TO UPDATE A THOUGHT
router.put('/:thoughtId',  async (req,res)=> {
    try {
    let updatedThought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {thoughtText: req.body.thoughtText},
        {createdAt: req.body.createdAt},
       
    )
    console.log(updatedThought)
    res.status(200).json(updatedThought)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }



})

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete('/:thoughtId', async (req,res)=> {
    try {
    let deletedThought = await Thought.findOneAndDelete({
        where: {
            id: req.params.thoughtId
        }
    })
    console.log(deletedThought)
    res.status(200).json(deletedThought)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post('/:thoughtId/reactions', async (req,res)=> {
    try {
        let newReaction = await Reaction.create(req.body)
        let updatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: newReaction}},

        )
        console.log(updatedThought)
        res.status(200).json(updatedThought)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }


});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete('/:thoughtId/reactions/:reactionId', async (req,res)=> {
try {
    let deletedReaction = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {_id: req.params.reactionId}}},
        {new: true}
    )
    console.log(deletedReaction)
    res.status(200).json(deletedReaction)
} catch (err) {
    console.log(err)
    res.status(500).json(err)


}
})

module.exports = router;
