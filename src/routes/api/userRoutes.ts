import { Router } from 'express';
import { userController, createUser, userControllerById, updateUser, deleteUser, removeFriend,  addFriend   } from '../../controllers/userController.js';

const router = Router();

// GET all users
router.route('/').get(userController)
.post(createUser);

// GET a single user by ID
router.route('/:userId')
.get(userControllerById)
.put(updateUser)
.delete(deleteUser);

//userid /friends/:friendId

router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

export default router;