# React 18 + TypeScript 编码约定

> 本文是 AGENTS.md 的扩展，聚焦 React 18 函数组件 + TypeScript 严格模式的具体写法。
> 与 `SKILL.md` 的 Red Lines 冲突时，以 Red Lines 为准。

---

## 1. 组件写法

### ✅ 标准模板

```tsx
// src/components/UserCard.tsx
import { useMemo } from 'react';
import type { User } from '@/types/user';
import { Card } from 'antd';

interface UserCardProps {
  user: User;
  compact?: boolean;
}

export function UserCard({ user, compact = false }: UserCardProps) {
  const displayName = useMemo(() => user.nickname || user.username, [user]);

  return (
    <Card size={compact ? 'small' : 'default'}>
      {displayName}
    </Card>
  );
}
```

- 只写**函数组件 + Hooks**，禁止 class 组件。
- 组件名 PascalCase，文件名与组件名一致（`UserCard.tsx`）。
- Props 用 `interface XxxProps` 显式声明，可空字段显式标注 `| null` 或 `?`。
- 纯展示组件不 import store；交互逻辑放页面或 hooks。

## 2. TypeScript 严格模式

- `strict: true` 全开，任何文件不得出现 `any`。
- 错误捕获一律 `catch (err: unknown)`，需要字段时用类型守卫：

```tsx
function isRequestError(err: unknown): err is { code: string | number; message: string } {
  return typeof err === 'object' && err !== null && 'code' in err && 'message' in err;
}
```

- 第三方返回值先定义 interface 再使用，不靠结构推断。

## 3. 目录分层

| 目录 | 职责 | 禁止 |
|------|------|------|
| `src/api/` | 只封装 HTTP 调用（`request.ts` + `modules/`） | 业务逻辑、错误提示 |
| `src/services/` | 业务收口（`auth.service.ts`） | 组件直连 API module |
| `src/stores/` | Zustand 全局状态 | 直接读写 localStorage（仅 userStore 收口 token） |
| `src/hooks/` | 可复用逻辑（`useAuth` 等） | 直接调 localStorage |
| `src/pages/` | 页面（路由级） | 拆出可复用 UI（≥3 次复用才进 components） |
| `src/components/` | 复用 ≥3 次的组件 | 手写 antd 已有组件 |
| `src/utils/` | 纯函数工具（`auth.ts` / `error.ts` / `toast.ts`） | 副作用逻辑 |

## 4. 请求与鉴权

- 只用 `@/api/request` 的 `get/post/put/del`，禁止 axios、禁止裸 `fetch`。
- 组件里**禁止**直接调 `localStorage`，token 读写一律走 `utils/auth.ts`（其底层收口在 `userStore`）。
- 组件里**禁止**写 401 跳转，统一由 `request.ts → auth.service.handleUnauthorized` 处理。
- 业务方法全部 `async/await + try/catch`，失败统一 `showError(err)`。

## 5. 样式

- 禁止裸色值：`style` 中用 antd `theme.useToken()` 或 CSS 变量 `var(--color-*)`。
- 优先 antd 组件与 `ConfigProvider` 主题 token，不手写已有组件。
- 少量自定义样式用 CSS Module 或内联 token，全局样式只进 `src/styles/globals.css`。

## 6. Hooks

- 自定义 hook 文件名 `useXxx.ts`，放 `src/hooks/`。
- 组件内只声明 useState/useEffect 等必要 hooks；跨页面复用的逻辑抽到 `src/hooks/`。
- 数据加载模式参考 `code-examples/pages/UserManagement.tsx` 的 `loadData(params)`：
  显式传参、`finally` 复位 loading。

## 7. 命名

- 变量/函数 camelCase，常量 UPPER_SNAKE_CASE，类型/组件 PascalCase。
- API module 统一 `xxxApi` 对象（`userApi.list / create / update / remove`）。

## 8. 反例（禁止出现）

| 反例 | 正确做法 |
|------|----------|
| `catch (err: any) { console.log(err) }` | `catch (err: unknown) { showError(err) }` |
| `localStorage.getItem('token')` 出现在组件里 | 走 `utils/auth.ts` → `userStore` |
| `import axios from 'axios'` | `@/api/request` |
| `style={{ color: '#1677ff' }}` | `themeToken.colorPrimary` 或 `var(--color-primary)` |
| 手写 `<table>` 渲染列表 | antd `Table` |
| 组件里 `if (code === 401) navigate('/login')` | 交给 `auth.service` 统一处理 |
