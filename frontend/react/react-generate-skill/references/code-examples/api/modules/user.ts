// src/api/modules/user.ts
// 用户业务 API（只负责 HTTP 调用，不写业务逻辑、不处理错误提示）

import { get, post, put, del } from '@/api/request';
import type { User, UserListParams, UserListResponse, UserCreateRequest, UserUpdateRequest } from '@/types/user';

export const userApi = {
  list: (params: UserListParams) =>
    get<UserListResponse>('/users', params),

  create: (data: UserCreateRequest) =>
    post<User>('/users', data),

  update: (id: number, data: UserUpdateRequest) =>
    put<User>(`/users/${id}`, data),

  remove: (id: number) =>
    del<null>(`/users/${id}`),
};
