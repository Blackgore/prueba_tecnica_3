import {Router} from 'express';
import * as userController from './users.controller';
import {check} from 'express-validator';
import {validarCampos} from '../middleware/validar-campos';
const router = new Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserBy);
router.post('/', [
  check('name', 'user name is required').not().isEmpty(),
  check('username', 'user category is required').not().isEmpty(),
  check('password', 'user password is required').not().isEmpty(),
  validarCampos,
],
userController.createUser);

export default router;
