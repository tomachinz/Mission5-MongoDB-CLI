import Customer from './models/customer.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

try {
  const db = mongoose.connect('mongodb://localhost:27017/tomachibot', {
  // useMongoClient: true
});
} catch (e) {
  console.error('Error connecting to MongoDB', e);
  process.exit(1);
}



const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info(`Customer ${customer.firstname} ${customer.lastname} created`);
    debug.close();
  });
}

const findCustomer = (name) => {
  const search = new RegExp(name, 'i');
  Customer.find({ $or: [{firstname: search}, {lastname: search}] })
    .then((customer) => {
      console.info(customer);
      console.info(`${customer.length} matches found`);
      db.close();
  });
}
export { addCustomer, findCustomer }