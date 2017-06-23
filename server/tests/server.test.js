const expect = require('expect');
const request = require('supertest');

//NOTICE THAT MOCHA DOES NOT WORK IN THE WAY THAT IT NEEDS TO BE REQUIRED
//NOTICE THAT SUPERTEST IS ASSIGNED TO REQUEST

////
// NOW WE NEED ACCESS TO EXPRESS 'APP' OBJECT & TODO MODEL
const {app} = require('../server');
const {Todo} = require('../models/Todo');