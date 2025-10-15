const mongoose = require("mongoose");

let mongoDbconnection = async function () {
  let url = process.env.DB_URL;
  console.log(url);
  mongoose.connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error('Mongo error', err));;
};

module.exports = mongoDbconnection
