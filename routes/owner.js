const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Item = require("../models/item.js");
const validateItem = require('../utils/schemaValidator.js');

//To view owner's options
router.get('/' , (req , res)=>{
    res.render('owner/option.ejs');
});

//To view current items
router.get("/items" , wrapAsync(async(req , res ,next)=>{
    let items = await Item.find({});
    res.render('owner/viewItem.ejs' , {items});
}));

//To open form to add new item
router.get("/new" , (req , res)=>{
    res.render("owner/new.ejs");
});

//Post request to add new item
router.post("/add/new", validateItem , wrapAsync(async(req, res)=>{
    let item = new Item(req.body.item);
    await item.save();
    res.redirect("/owner/items")
}));

//To open edit form
router.get("/edit/:id" , wrapAsync(async(req , res)=>{
    let {id} = req.params;
    let item = await Item.findById(id);
    res.render("owner/edit.ejs" , {item})

    
    
}));

//To edit item
router.put("/edit/:id",validateItem ,wrapAsync(async(req , res)=>{
    let {id} = req.params;
    await Item.findByIdAndUpdate(id, req.body.item);
    req.flash("success" , "Item edited successfully!")
    res.redirect("/owner/items");
}));

//To delete item
router.delete("/delete/:id" , wrapAsync(async(req , res)=>{
    let {id} = req.params;
    await Item.findByIdAndDelete(id);
    req.flash("error" , "Item deleted successfully!")
    res.redirect("/owner/items");
}));

module.exports = router;