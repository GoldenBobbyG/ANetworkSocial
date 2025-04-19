import { Schema, Document, model } from 'mongoose';
import { reactionSchema } from './Reaction';
// Define the IThought interface
export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: any[];
}

// Define the thought schema
// This schema defines the structure of a thought document in the database.
// It includes the thought text, creation date, username of the user who created it,
// and an array of reactions.
const thoughtSchema = new Schema<IThought>({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});


// Create a virtual property to get the count of reactions
// This virtual property calculates the number of reactions for a thought.
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

export const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;