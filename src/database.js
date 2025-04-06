import Customer from './models/customer.js';
import AuctionItem from './models/auction-item.js';
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;
const dbstring = 'mongodb://127.0.0.1:27017/trademe'
process.stdout.write(`Connecting to MongoDB...   ${dbstring}`);  // clear current text
await mongoose.connect(dbstring, {});
process.stdout.cursorTo(0);  // move cursor to beginning of line
process.stdout.clearLine();  // clear current text
  

const addAuctionItem = (auctionItem) => {
  AuctionItem
    .create(auctionItem)
    .then((auctionItem) => {
      console.info(`Auction Item ${auctionItem.title} with reserve of $${auctionItem.reserve_price} created`);
      // mongoose.save(); 
      mongoose.connection.close();
  });
}

const addCustomer = (customer) => {
  Customer
    .create(customer)
    .then((customer) => {
      console.info(`Customer ${customer.firstname} ${customer.lastname} created`);
      // mongoose.save(); 
      mongoose.connection.close();
    });

}

const findAuctionItems = (keyword) => {
  const search = new RegExp(keyword, 'i');
  AuctionItem.find({ $or: [{ title: search }, { description: search }] })
    .then((items) => {
      console.info(items);
      console.info(`${items.length} matches found`);
      mongoose.connection.close(); 
    });  
}


const findCustomers = async (name) => {
  const search = new RegExp(name, 'i');
  await Customer.find({ $or: [{ firstname: search }, { lastname: search }] })
    .then((customers) => {
      console.info(customers);
      console.info(`${customers.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close(); 
      // process.exit(0);
    });
}
    
export { addCustomer, findCustomers, addAuctionItem, findAuctionItems, dbstring }