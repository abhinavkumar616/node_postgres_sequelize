const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require("./config/dbConnection"); // Import the Sequelize instance, not the entire db object
const customerRoutes = require("./routes/product");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define routes
app.use("/api", customerRoutes);

app.use("*",(req,res,next)=>{
    res.status(404).send({
        status:"Fail",
        message:"Route Not Found"
    })
})

// Sync database models
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
        // Start server
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

