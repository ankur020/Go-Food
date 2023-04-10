const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ankur020:Ankur020@cluster0.7oeyplp.mongodb.net/GoFoodMern?retryWrites=true&w=majority";
const mongoDB = async () => {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("DB Connected");
      const fetched_data = mongoose.connection.db.collection("food_items");
      fetched_data
        .find({})
        .toArray()
        .then((data) => {
          //global.food_items = data;
          const foodCategory =
            mongoose.connection.db.collection("food_category");
          foodCategory
            .find({})
            .toArray()
            .then((catData) => {
              global.food_items = data;
              global.foodCategory = catData;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log("---error"), err;
        });
    })
    .catch((e) => console.log("----------------------Failed", e));
};

module.exports = mongoDB;
