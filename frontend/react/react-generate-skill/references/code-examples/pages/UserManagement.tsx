// src/pages/UserManagement.tsx
// 用户管理页（表格 + 分页 + 搜索 + 新增 + 删除）

import { useEffect, useState } from 'react';
import { App, Button, Form, Input, Modal, Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { userApi } from '@/api/modules/user';
import { showError } from '@/utils/toast';
import type { User, UserListParams, UserCreateRequest } from '@/types/user';

interface UserFormValues {
  username: string;
  nickname: string;
  tenantId: number;
}

export function UserManagement() {
  const { message, modal } = App.useApp();
  const [form] = Form.useForm<UserFormValues>();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState<UserListParams>({ page: 1, pageSize: 10, keyword: '' });
  const [createOpen, setCreateOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  async function loadData(params: UserListParams = query): Promise<void> {
    setLoading(true);
    try {
      const res = await userApi.list(params);
      setTableData(res.data.items);
      setTotal(res.data.total);
    } catch (err: unknown) {
      showError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (): void => {
    const next = { ...query, page: 1 };
    setQuery(next);
    loadData(next);
  };

  const handlePageChange = (page: number, pageSize: number): void => {
    const next = { ...query, page, pageSize };
    setQuery(next);
    loadData(next);
  };

  const handleCreate = async (): Promise<void> => {
    let values: UserFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    const data: UserCreateRequest = {
      username: values.username,
      nickname: values.nickname,
      roles: ['user'],
      tenantId: values.tenantId,
    };
    setCreating(true);
    try {
      await userApi.create(data);
      message.success('创建成功');
      setCreateOpen(false);
      form.resetFields();
      await loadData();
    } catch (err: unknown) {
      showError(err);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = (row: User): void => {
    modal.confirm({
      title: '提示',
      content: `确定删除用户「${row.nickname}」？`,
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await userApi.remove(row.id);
          message.success('删除成功');
          await loadData();
        } catch (err: unknown) {
          showError(err);
        }
      },
    });
  };

  const columns: ColumnsType<User> = [
    { title: 'ID', dataIndex: 'id', width: 80 },
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickname' },
    {
      title: '角色',
      dataIndex: 'roles',
      render: (roles: string[]) => roles.map((role) => <Tag key={role}>{role}</Tag>),
    },
    { title: '创建时间', dataIndex: 'createdAt', width: 180 },
    {
      title: '操作',
      width: 120,
      render: (_, row) => (
        <Button type="link" danger onClick={() => handleDelete(row)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 16 }}>
        <Space>
          <Input
            placeholder="搜索用户名 / 昵称"
            allowClear
            style={{ width: 280 }}
            value={query.keyword}
            onChange={(e) => setQuery({ ...query, keyword: e.target.value })}
            onPressEnter={handleSearch}
          />
          <Button type="primary" onClick={handleSearch}>
            搜索
          </Button>
        </Space>
        <Button type="primary" onClick={() => setCreateOpen(true)}>
          新增用户
        </Button>
      </Space>

      <Table<User>
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
      <Pagination
        style={{ marginTop: 16, textAlign: 'right' }}
        current={query.page}
        pageSize={query.pageSize}
        total={total}
        showTotal={(value) => `共 ${value} 条`}
        onChange={handlePageChange}
      />

      <Modal
        title="新增用户"
        open={createOpen}
        onOk={handleCreate}
        onCancel={() => setCreateOpen(false)}
        confirmLoading={creating}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ tenantId: 1 }}
          preserve={false}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }, { min: 3, max: 32 }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
          </Form.Item>
          <Form.Item label="租户" name="tenantId" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
