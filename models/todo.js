const mongoose = require('mongoose')

const ToDoSchema = mongoose.Schema({
    record : { type:String , required:true },
    date : { type:Date , default:Date.now }
})

const todoModel = mongoose.model( "ToDoModel", ToDoSchema )

module.exports = todoModel