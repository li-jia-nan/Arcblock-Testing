import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

const router = Router();

// 模拟用户数据
const user = {
  username: 'john_doe',
  phone: '123-456-7890',
  email: 'john.doe@example.com',
};

router.use('/user', middleware.user(), (req, res) => {
  return res.json(req.user || {});
});

router.get('/user', (_, res) => {
  return res.json(user);
});

router.post('/user', (req, res) => {
  const { username, phone, email } = req.body;
  if (username) {
    user.username = username;
  }
  if (phone) {
    user.phone = phone;
  }
  if (email) {
    user.email = email;
  }
  return res.json(user);
});

export default router;
