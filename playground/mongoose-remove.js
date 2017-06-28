const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');

//result object's result property ok:1 for success and n: number of documents(records removed)
// Todo.remove({})
// .then(resultObject=>console.log(resultObject))
// .catch(errorObject=>console.log(errorObject));


// Todo.findByIdAndRemove('id string value')
// .then(deletedDocument=>console.log(deletedDocument))
// .catch(e=>console.log(e));


// Todo.findOneAndRemove({text:'here it is'})
// .then(document=>console.log(document))
// .catch(e=>console.log(e));