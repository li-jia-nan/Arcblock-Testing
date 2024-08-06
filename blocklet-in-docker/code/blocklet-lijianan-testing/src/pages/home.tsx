import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, Input, message } from 'antd';
import { EditOutlined, GithubOutlined, SaveOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import UserServer from '../server';
import type { User } from '../server';
import styles from './index.module.scss';

enum Mode {
  View = '展示模式',
  Edit = '编辑模式',
}

function Home() {
  const [mode, setMode] = React.useState<Mode>(Mode.View);

  const { data: userInfo } = useQuery({
    queryKey: ['getInfo'],
    queryFn: UserServer.getInfo,
  });

  const { mutate: modifyInfo } = useMutation({
    mutationKey: ['modifyInfo'],
    mutationFn: UserServer.modifyInfo,
    onSuccess: () => {
      setMode(Mode.View);
      message.success('保存成功');
    },
    onError: (err) => {
      setMode(Mode.View);
      if (err instanceof Error) {
        message.warning(`保存失败：${err.message}`);
      }
    },
  });

  const [form] = Form.useForm();

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Welcome to Profile</h1>
      <Form<User>
        layout="vertical"
        onFinish={modifyInfo}
        name="user"
        variant={mode === Mode.View ? 'borderless' : 'filled'}
        form={form}>
        <Form.Item<User>
          rules={[{ required: true, message: '请输入用户名' }]}
          name="name"
          label={<span>用户名</span>}>
          <Input
            className={clsx(styles.input, mode === Mode.View && styles.readOnly)}
            readOnly={mode === Mode.View}
            allowClear
            placeholder="请输入用户名"
            value={userInfo?.data.name}
          />
        </Form.Item>
        <Form.Item<User>
          rules={[{ required: true, message: '请输入电话' }]}
          name="phone"
          label={<span>电话</span>}>
          <Input
            className={clsx(styles.input, mode === Mode.View && styles.readOnly)}
            readOnly={mode === Mode.View}
            allowClear
            placeholder="请输入电话"
            value={userInfo?.data.name}
          />
        </Form.Item>
        <Form.Item<User>
          rules={[{ required: true, message: '请输入邮箱' }]}
          name="email"
          label={<span>邮箱</span>}>
          <Input
            className={clsx(styles.input, mode === Mode.View && styles.readOnly)}
            readOnly={mode === Mode.View}
            allowClear
            placeholder="请输入邮箱"
            value={userInfo?.data.name}
          />
        </Form.Item>
        <div className={styles.btnGroup}>
          {mode === Mode.View && (
            <Button
              className={styles.editBtn}
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setMode(Mode.Edit)}>
              编辑
            </Button>
          )}
          {mode === Mode.Edit && (
            <Button
              className={styles.saveBtn}
              type="primary"
              icon={<SaveOutlined />}
              htmlType="submit">
              保存
            </Button>
          )}
          <Button className={styles.linkBtn} type="default" icon={<GithubOutlined />}>
            GitHub
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Home;
