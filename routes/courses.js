const express = require('express');

const router = express.Router();

const courses = [
    {id:1, name:'course1'},
    {id:2, name:'course2'},
    {id:3, name:'course3'}
]


app.get('/', (req, res)=> {
    
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    console.log(result);
 if (req.body.name || req.body.name.length < 3) {
    res.status(400).send("Name is require and should be minimum 3 characters")
    return;
 }
});

app.post('/', (req, res)=> {

    const { error } = validateCourse(req.body);
    if (error) {
       return res.status(400).send("Name is require and should be minimum 3 characters");
        
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

app.put("/:id", (req, res)=> {
    //look up the course
    //if not found return error 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
     if (!course) return res.status(404).send('The course with the given ID was not found');
    

    //validate
    //if invalid, return 400 - bad request

    
    
    const { error } = validateCourse(req.body);
    if (error) 
     return res.status(400).send("Name is require and should be minimum 3 characters")
        
    
   
    
    //update the course
    //return the updated course*/
    course.name = req.body.name
    res.send(course)

})
function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
};

return Joi.validate(course, schema);
}

app.delete("/:id", (req,res) => {
    //look up the course
    // Not existing, return 404

    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('The course with the given ID was not found');

     //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return course
    res.send(course);
})







app.get('/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given ID was not found');
        res.send(course)
});

module.exports = router;