const express = require('express');
const router = express.Router();

const {createGroup, getGroups, getSingleGroup, updateGroup, deleteGroup} = require('../controllers/groupController');


router.post('/group/new', createGroup);
router.get('/groups', getGroups);
router.get('/group/:id', getSingleGroup);
router.put('/group/:id', updateGroup);
router.delete('/group/:id', deleteGroup);

module.exports = router;