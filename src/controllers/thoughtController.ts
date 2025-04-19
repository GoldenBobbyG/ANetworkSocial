import { Request, Response } from 'express';
import { User, Thought } from '../models/index.js';

//Get all thoughts
// This controller retrieves all thoughts from the database and sends them as a JSON response.
export const thoughtController = async (req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
}

//Get a single thought by ID
// This controller retrieves a single thought by its ID from the database and sends it as a JSON response.
export const thoughtControllerById = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            // This will populate the thought's reactions
            .populate('reactions');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
// Create a new thought
// This controller creates a new thought in the database and associates it with a user.
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(
            req.body.userId,
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
}
// Update a thought
// This controller updates an existing thought in the database.
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
}
// Delete a thought
// This controller deletes a thought from the database and removes it from the associated user's thoughts.
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        // Remove the thought from the user's thoughts
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        res.json({ message: 'Thought successfully deleted' });
    } catch (error) {
        res.status(500).json(error);
    }
}
// Add a reaction
// This controller adds a reaction to a thought in the database.
export const addReaction = async (req: Request, res: Response) => { 
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
}
// Remove a reaction
// This controller removes a reaction from a thought in the database.
export const removeReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.json(thought);
    } catch (error) {
        res.status(400).json(error);
    }
}