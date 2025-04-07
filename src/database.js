import Customer from './models/customer.js';
import AuctionItem from './models/auction-item.js';
import mongoose from 'mongoose';
import { loadOptions } from '@babel/core';

mongoose.Promise = global.Promise;
const dbstring = 'mongodb://127.0.0.1:27017/trademe'
process.stdout.write(`Connecting to MongoDB...   ${dbstring} (check db connection)`);  // clear current text
await mongoose.connect(dbstring, {});
process.stdout.cursorTo(0);  // move cursor to beginning of line
process.stdout.clearLine();  // clear current text

let itemCount = await AuctionItem.countDocuments({  });
  
const addAuctionItem = (auctionItem) => {

  if ( auctionItem.start_price > auctionItem.reserve_price ) {
    console.log(`Start price must be less than reserve price`);
    mongoose.connection.close();
    return;
  } else {
    console.info(`Auction Item ${itemCount} ${auctionItem.title} with reserve of $${auctionItem.reserve_price}, start bid $${auctionItem.start_price} created`);
  }
  AuctionItem
    .create(auctionItem)
    .then((auctionItem) => {
      itemCount++;
      console.info(`Auction Item ${itemCount} ${auctionItem.title} with reserve of $${auctionItem.reserve_price}, start bid $${auctionItem.start_price} created`);
      })
    .finally(() => {
      mongoose.connection.close();
  });
}

const addCustomer = (customer) => {
  Customer
    .create(customer)
    .then((customer) => {
      console.info(`Customer ${customer.firstname} ${customer.lastname} created`);
    })
    .finally(() => {
      mongoose.connection.close();
    });

}

const findAuctionItems = (keyword) => {
  const search = new RegExp(keyword, 'i');
  AuctionItem.find({ $or: [{ title: search }, { description: search }] })
    .then((items) => {
      console.info(items);
      console.info(`${items.length} matches found`);
    })
    .finally(() => {
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
    });
}


const updateAuctionItem = async (_id, item) => {
  await AuctionItem.findByIdAndUpdate(_id, item, {upsert: true})
    .then((item) => {
      console.log('Succesfully saved.');
    })
    .finally(() => {
      mongoose.connection.close(); 
    });
}

const deleteAuctionItem = async (_id) => {

  await AuctionItem
    .deleteOne({_id})  // Deletes the document, returns a promise
    .exec() 
    .then((_id) => {
      itemCount--;
      console.info(`Item ${_id} deleted.`);
    })
    .finally(() => {
      mongoose.connection.close(); 
    });
}


const deleteAllAuctionItems = async () => {
  await AuctionItem.deleteMany({})
    .then(() => {
      console.info(`All items deleted.`);
      itemCount = 0;
    })
    .finally(() => {
      mongoose.connection.close(); 
    });
}

const listAuctionItems = async () => {
  await AuctionItem.find()
    .then((items) => {
      items.forEach((item) => {
        console.info(`Item ${item._id} ${item.title.substring(0,20)} | ${item.description.substring(0, 20)} | reserve  $${item.reserve_price} | start $${item.start_price}`);
      });
      console.log(`${items.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close(); 
    });
}
const exportAuctionItems = async () => {
  let exported ;
  await AuctionItem.find()
    .then((items) => {
      exported = items;
      console.log(`${items.length} matches found`);
    })
    .finally(() => {
      mongoose.connection.close(); 
    });
  return exported;
}

const importAuctionItems = async (jsonfile) => {
  console.log(`jsonfile.length ${jsonfile.length}`);
  await AuctionItem.insertMany(jsonfile)
    .then(function (jsonfile) {
      console.log(`💾 Success adding ${jsonfile.length} documents in bulk`);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}

export { addCustomer, findCustomers, addAuctionItem, findAuctionItems, dbstring, itemCount, updateAuctionItem, deleteAuctionItem, listAuctionItems, deleteAllAuctionItems, exportAuctionItems, importAuctionItems }