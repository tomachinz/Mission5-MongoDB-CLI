import mongoose from 'mongoose';
// Develop a command-line interface (CLI) tool to seed data into your local MongoDB database or delete data from it.  Ensure that this tool is source-controlled and includes the seed data.  Team members should be able to seed data by cloning the repository.  Add sample data for a few auction items with the following 4 fields: title, description, start_price, reserve_price.

const auctionItemSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    reserve_price: { type: Number, required: true, min: 1, max: 1000000 },
    start_price: { type: Number, min: 1, max: 10000, required: (reserve_price, start_price) => { return (reserve_price > start_price) } },
});

export default mongoose.model('AuctionItem', auctionItemSchema);