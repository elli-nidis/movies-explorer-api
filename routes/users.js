// Файл маршрута users/me
const userRouter = require('express').Router();

const {
  getUserInfoValidator,
  editUserInfoValidator,
} = require('../middlewares/validation');

const { getUserInfo, editUserInfo } = require('../controllers/users');

userRouter.get('/users/me', getUserInfoValidator, getUserInfo);
userRouter.patch('/users/me', editUserInfoValidator, editUserInfo);

module.exports = userRouter;
