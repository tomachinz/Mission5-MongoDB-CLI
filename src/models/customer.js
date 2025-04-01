import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

export default mongoose.model('Customer', customerSchema);