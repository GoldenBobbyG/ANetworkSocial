import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

//Get all users
export const userController = async (_req: Request, res: Response) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get a single user by ID
export const userControllerById = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId})
        .select('-__v')
        // This will populate the user's friends and thoughts
        .populate('friends')
        .populate('thoughts');

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID'});
        }
        res.json(user);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}

 // Create a new user       
    export const createUser = async (req: Request, res: Response) => {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // Update a user
    export const updateUser = async (req: Request, res: Response) => {
        try {
            console.log('Request body:', req.body);
            
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    // Delete a user

    export const deleteUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            // Delete the user's thoughts
        await Thought.deleteMany({ username: User });
        res.json({ message: 'User and thoughts deleted!' });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Add a friend
    export const addFriend = async (req: Request, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this ID'});
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }

    }
    // Remove a friend
    export const removeFriend = async (req: Request, res: Response) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ 'message': 'No user found with this ID'});
            }
            res.json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    
    