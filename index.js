
const debug = require('debug') ('app.db');
const config = require('config');
const Joi = require('joi');
const express = require("express");

const helmet = require('helmet');
const morgan = require('morgan');
const courses = require('./routes/courses');
const homePage = require('./routes/homepage');
const app = express();

app.set('view Engine', 'pug');
app.set('views', './views'); //optional


//configuration

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
/*console.log('Mail Password: ' + config.get('mail.password'));*/
/*
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);*/

const logger = require('./middleware/logger');
const authentication = require('./authentication');
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', homePage)

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debugger('Morgan enabled...');
}

//Db work...
dbDebugger('connected to the database...')


app.use(logger);

app.use(authentication);







app.listen(3000, ()=> console.log(`Listening on port ${port} ....`));