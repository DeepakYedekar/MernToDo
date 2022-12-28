const Item = require('../DB/item');

const GetItems = (req, res) => {
    try { 
        Item.find()
            .sort({ date: -1 })
            .then((items) => res.json(items)).catch(err => res.send(err));
    } catch (err) {
        res.status(404).send('error from server');
    }
};


const CreateItem = (req, res) => {
    try {
          const new_item = new Item({
            name: req.body.name
          });
          new_item.save().then((item) => res.json(item)).catch(err=>res.send(err))
    } catch (err) {
        res.status(404).send("error from server");
    }
};

const DeleteItem = (req, res) => {
    try {
    Item.findById(req.params.id)
      .then((item) => item.remove().then(() => res.json({ success: true })))
      .catch((err) => res.status(404).json({ success: false }));
    } catch (err) {
        res.status(404).send("error from server");
    }
};

module.exports = {
    GetItems,
    CreateItem,
    DeleteItem
}