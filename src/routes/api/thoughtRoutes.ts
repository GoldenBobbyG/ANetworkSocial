import { Router } from 'express';
import { thoughtController, createThought, removeReaction, thoughtControllerById, updateThought, deleteThought, addReaction } from '../../controllers/thoughtController';

const router = Router();

// GET all thoughts
router.route('/')
.get(thoughtController)
.post(createThought);

//api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(thoughtControllerById)
.put(updateThought)
.delete(deleteThought);

// api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions')
.post(addReaction)

// .delete(removeReaction);
router.route('/:thoughtId/reactions/:reactionId')
 .delete(removeReaction);

 export default router;