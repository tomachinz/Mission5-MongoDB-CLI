import mongoose from 'mongoose';

const trademeSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    start_price: { type: String  },
    reserve_price: { type: String },
    breadcrumb: { type: String },
});
trademeSchema.statics.add = function (trademe) {
    return this.create(trademe);
};
trademeSchema.statics.getAll = function () {
    return this.find();
};
export default mongoose.model('TradeMe', trademeSchema);