const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
require("dotenv").config();

//set up express

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users',userRoutes)

const PORT = process.env.PORT || 5000;
console.log("starting server");
app.listen(PORT, () => { console.log(`server started on port : ${PORT}`) });

// set up mangoose

console.log("connecting to MongoDB");
mongoose.connect(process.env.MONGODB_URI,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true },
    (err) => {
        if (err)
            return console.error(err);
        console.log("mongoDB connection established")
    });
