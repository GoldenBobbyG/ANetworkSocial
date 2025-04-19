import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/aSocialNetworkDB')

.then(() => console.log('MongoDB connected with love'))


export default mongoose.connection;