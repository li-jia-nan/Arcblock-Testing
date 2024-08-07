import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { deserializer, serializer } from '../utils';

const router = Router();

const paths = ['./', 'mock-db.json'];

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

interface User {
  name: string;
  phone: number;
  email: string;
}

router.use('/data', (_, res) => {
  try {
    // 这里用 readFile 模拟 SQL 查询数据库
    const content = deserializer<User>(fs.readFileSync(path.join(__dirname, ...paths), 'utf8'));
    return res.json({ success: true, data: content });
  } catch (err) {
    return res.json({ success: false, message: `获取失败：${err.message}` });
  }
});

router.patch('/modify', (req, res) => {
  try {
    // 这里用 readFile 模拟 SQL 查询数据库
    const content = deserializer<User>(fs.readFileSync(path.join(__dirname, ...paths), 'utf8'));
    const newUser: User = {
      ...content,
      ...req.body,
    };
    fs.writeFileSync(path.join(__dirname, ...paths), serializer<User>(newUser));
    return res.json({ success: true, message: '修改成功', data: newUser });
  } catch (err) {
    return res.json({ success: false, message: `修改失败：${err.message}`, data: null });
  }
});

export default router;
