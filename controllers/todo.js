let tasks=[{item:'Gym'},{item:'Read'},{item:'Leetcode'},{item:'Web development'},{item:'Cook dinner'},{item:'Write recommendation letter'}];

//used in the post section
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//connecting to mangoDB via mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://todo:todo@todo.de06c.mongodb.net/?retryWrites=true&w=majority&appName=todo', {
    useNewUrlParser: true,     // Ensures proper parsing of connection string
    useUnifiedTopology: true, // Enables the new MongoDB driver connection engine
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully!');
});

mongoose.connection.on('error', (err) => {
    console.error('Failed to connect to MongoDB:', err);
});

let todoSchema =  new mongoose.Schema({
    item:String
});

let Todo = mongoose.model('Todo',todoSchema);





module.exports = (app)=>{
app.get('/todo',(req,res)=>{
    Todo.find({})
        .then((tasks)=>{
            res.render('index',{task:tasks});
        })
        .catch(()=>{});
});

app.post('/todo',urlencodedParser,(req,res)=>{
    let task= new Todo(req.body);
    task.save()
        .then(() => {
            Todo.find({})
            .then((tasks)=>{
                res.json(tasks);
            })
        })
        .catch((err) => {
            console.error('Error saving item:', err);
        });  
        tasks.push(task);
    
});

app.delete('/todo/:item',(req,res)=>{
    let task = req.params.item.replace(/\-/g, ' ');
    Todo.deleteOne({ item: task})
        .then(() =>{
            Todo.find({})
            .then((tasks)=>{
                res.json(tasks);
            })
        })
        .catch((err) => console.error('Error deleting item:', err));
});
};