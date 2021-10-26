import express from 'express';

const router = express.Router();

router.route('/search').get((req, res) => {

    // Todo.find().then(todos => res.json(todos)).catch(err => res.status(400).json('Error: ' + err));

});
