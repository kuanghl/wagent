# 代码示例目录（code-examples/）

> 本目录提供**完整可直接复制**的代码示例（React 18 + TS + Vite + Zustand + Ant Design 5）。
> 所有代码必须通过 `tsc --noEmit` 与 ESLint 严格检查。

---

## 目录索引

```
code-examples/
├── README.md                       # 本文件
├── types/
│   ├── api.ts                      # ApiResponse<T> / RequestError / 通用类型
│   └── user.ts                     # User / UserListParams 等业务类型
├── api/
│   └── modules/
│       └── user.ts                 # 用户业务 API（只封装 HTTP）
├── stores/
│   ├── userStore.ts                # 用户 Zustand store（含 token / profile）
│   └── appStore.ts                 # 全局 app 状态
├── components/
│   └── AppLayout.tsx               # 全局布局（侧边栏 + 顶部栏 + 内容区）
└── pages/
    ├── Login.tsx                   # 登录页（表单 + 校验 + 跳转）
    └── UserManagement.tsx          # 用户管理（列表 + 分页 + 搜索 + 增删）
```

---

## 与 `frontend-request-skill` 的对应关系

| react-generate-skill 文件 | 对应 frontend-request-skill 文件 | 说明 |
|------------------------|-------------------------------|------|
| `code-examples/pages/Login.tsx` | `references/auth-patterns.md` | 登录流程参考 |
| `code-examples/stores/userStore.ts` | `references/auth-patterns.md` | Zustand userStore（Pinia 方案的 React 等价物） |
| `src/api/request.ts`（按 `frontend-request-skill/references/request-impl.md` 复制） | `references/request-impl.md` | fetch 标准实现 |
| `src/services/auth.service.ts` | `references/auth-patterns.md` | Token 刷新队列 |
| `src/config/api.config.ts` | `references/frontend-spec.md` | BASE_URL 等配置 |

> `request.ts` / `auth.service.ts` / `utils/*` 不在本目录内，必须从
> **frontend-request-skill** 的 references 复制，禁止自行改写（见 SKILL.md §2.5 红线）。

---

## 使用方式

1. **第一次接入**：先按 `frontend-request-skill` 复制 `request.ts`、`auth.service.ts`、`utils/auth.ts`、`utils/error.ts`、`utils/toast.ts`、`config/*.config.ts`
2. **添加新页面**：参考 `pages/UserManagement.tsx` 的结构（loadData 显式传参 + finally 复位）
3. **添加新 store**：参考 `stores/userStore.ts` 的 `create<State>()((set) => ...)` 风格
4. **添加新类型**：参考 `types/user.ts` 的命名与结构
5. **添加新 API**：参考 `api/modules/user.ts`，只封装 HTTP，不写业务逻辑

---

## 严格红线

所有示例代码**强制遵守**：

1. ✅ 全部函数组件 + Hooks（不用 class 组件）
2. ✅ 全部 `.tsx` / `.ts`（不用 `.jsx`）
3. ✅ 不用 `any`，错误捕获用 `unknown`
4. ✅ 不用 `console.log`
5. ✅ 样式全部用 antd `theme.useToken()` 或 CSS 变量（不用裸色值）
6. ✅ 请求层走 `frontend-request-skill` 标准（不用 axios）
7. ✅ 鉴权走 `auth.service.ts`（不在组件里直接调 localStorage）
8. ✅ 401 统一由请求层处理（不在组件里写跳转）
