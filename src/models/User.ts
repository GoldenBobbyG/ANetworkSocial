import { Schema, model, Types } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                "Please enter a valid email address",
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },

        ],
    },
    {
        toJSON: {
            virtuals:true, 
        },
        id: false,
    }

);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

export const User = model<IUser>('User', userSchema);


export default User;
