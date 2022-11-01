const Router = require('express');
const router = new Router();

const userController = require('../controllers/user.controller');

router.post('/', userController.create)
router.get('/', userController.getAll)
router.put('/:id', userController.updateById)
router.delete('/:id', userController.deleteById)

module.exports = router;