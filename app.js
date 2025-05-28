const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://barmanavyasree:cOPSGx2QR3O1K1qi@todo-app.93xehf2.mongodb.todo/");
const trySchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Task", trySchema);
const todo = new Item({ name: "java" });
app.get('/', (_, res) => {
    Item.find({})
        .then(foundItems => {
            res.render("list", { ejes: foundItems })
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("something went wrong");
        });

});
app.post('/', (req, res) => {
    const Itemname = req.body.ele1;
    const todo = new Item({ name: Itemname });
    todo.save();
    res.redirect("/");

});
app.post('/delete',async (req, res) => {
    const check = req.body.checkbox1;
    try {
        await Item.findByIdAndDelete(check);
        console.log("delete item with Id", check);
        res.redirect('/');
    }
    catch (err){
        console.error("error deleting item", err);
        res.status(500).send("error delting item");
    };
});
app.listen(port, () => {
    console.log('server is running at http://localhost:3000');
});
