import Customer from './models/customer.js';
import mongoose from 'mongoose';


mongoose.Promise = global.Promise;
try {
  // const db = mongoose.connect('mongodb+srv://zackdoor.soul', {
  // const db = mongoose.connect('mongodb://mongo.soul:27017', { //10.0.0.44
  // const db = mongoose.connect('mongodb://10.0.0.44:27017', { //10.0.0.44
  const db = mongoose.connect('mongodb://tom:2Fub@r@127.0.0.1:27017/mission5', {});
  // const db = mongoose.connect('mongodb://10.0.0.44', {});
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