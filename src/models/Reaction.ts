import { Schema, Document, ObjectId, Types } from 'mongoose';
import { format } from 'date-fns';


interface IReaction extends Document {
    reactionId: ObjectId;
    reactionBody: string;
    username: string;
        createdAt: Date;
    }
    
export const reactionSchema = new Schema<IReaction>({
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        },
        {
            toJSON: {
                virtuals: true,
                getters: true,
            },
            id: false,
        }
    );


 export default reactionSchema;       