---
name: vue-base-skill
description: Vue 基础组件父技能（规范层入口）。基于「一切皆容器」思想：容器原则——所有组件必须由 base-card 承载；提供通用基础规范、设计 Token 约定、零 HTML5 原生标签铁律，并索引 7 个同级组件技能（card / button / tag / status / table / form / dropdown）。Use when 处理 Vue 基础组件规范、容器原则、跨组件协同、base-card 根容器，或不确定该用哪个 vue-*-skill 时。触发词："vue base"、"vue 基础组件规范"、"容器原则"、"base-card"、"vue 组件规范"、"零 HTML5 标签"。
---

# vue-base-skill（Vue 基础组件父技能）

> **容器原则**：所有组件、表单、表格都必须嵌入 `<base-card>`。base-card 是根容器，无例外。
>
> **零 HTML5 标签原则**：所有 `.md` 文档中的实现代码，必须使用 `<div>` `<span>` `<p>` 等基础标签 + CSS3 样式实现，**严禁使用 `<button>` `<table>` `<input>` `<select>` `<textarea>` `<checkbox>` `<radio>` `<form>` `<option>` `<tr>` `<td>` `<th>` 等 HTML5 原生标签**。按钮用 `<base-button>`、标签用 `<base-status>`、选择器/输入框/复选框/单选框等全部用 `<div>` + CSS3 模拟。
>
> 命名与 uniapp-base-skill（uni-app 版，不在本仓库）对齐；本技能是规范层入口，各组件技能均为 `frontend/vue/` 下的同级独立技能。

## 组件技能地图

| 组件技能 | 职责 | 入口 |
|--------|------|------|
| **vue-card-skill** | base-card 根容器 | [SKILL.md](../vue-card-skill/SKILL.md) |
| **vue-button-skill** | base-button 按钮组件 | [SKILL.md](../vue-button-skill/SKILL.md) |
| **vue-tag-skill** | base-tag 标签组件 | [SKILL.md](../vue-tag-skill/SKILL.md) |
| **vue-status-skill** | base-status 状态/徽章组件 | [SKILL.md](../vue-status-skill/SKILL.md) |
| **vue-table-skill** | base-table 表格组件（23 形态） | [SKILL.md](../vue-table-skill/SKILL.md) |
| **vue-form-skill** | base-form 表单体系（8 组件：form / form-item / input / select / checkbox / radio / switch / datepicker） | [SKILL.md](../vue-form-skill/SKILL.md) |
| **vue-dropdown-skill** | base-dropdown 下拉/浮层组件（5 mode） | [SKILL.md](../vue-dropdown-skill/SKILL.md) |

> 规划中尚未实现的组件见 [references/roadmap.md](references/roadmap.md)，实现完成前不要当作可用技能。

## 设计 Token

所有子技能统一引用 [vue-theme-skill](../vue-theme-skill/) 提供的 CSS 变量：

| 类别 | 命名规范 | 示例 |
|------|----------|------|
| 颜色 | `--color-{name}` / `--color-{name}-{50~950}` | `--color-primary-500` |
| 间距 | `--space-{n}` | `--space-4`(16px) |
| 字号 | `--font-{size}` | `--font-base`(14px) |
| 行高 | `--height-{comp}-{size}` | `--height-button-md`(36px) |
| 圆角 | `--radius-{size}` | `--radius-lg`(8px) |

**禁止硬编码任何颜色 / 间距 / 字号 / 行高 / 圆角值。**

## 🚫 零 HTML5 标签铁律（.md 文档约束）

> **所有 `.md` 文档中的实现代码（`<template>` / `<script>` / `<style>` / 代码片段）必须使用 `<div>` `<span>` `<p>` 等基础标签 + CSS3 样式实现。**

### 严禁使用

| HTML5 标签 | 必须替换为 |
|-----------|-----------|
| `<button>` | `<base-button>` 组件 |
| `<input>` | `<div contenteditable>` + CSS3 自定义输入框 |
| `<select>` / `<option>` | `<div>` + CSS3 自定义下拉 |
| `<textarea>` | `<div contenteditable>` + CSS3 自定义 |
| `<table>` / `<tr>` / `<td>` / `<th>` | `<div>` + `display:flex/grid` 自定义表格 |
| `<checkbox>` / `<radio>` | `<div>` + CSS3 自定义复选/单选 |
| `<form>` | `<div>` + `@submit.prevent` 自定义表单 |
| `<a>` | `<div role="link">` 或 `<router-link>` |
| `<img>` | `<div>` + `background-image` |

### 唯一例外

✅ **Demo HTML 文件**（`demo-components/**/*.html`）允许使用 HTML5 标签 —— 这是给用户查看的运行示例，与生产组件实现隔离。

### 工具替代矩阵

| 场景 | HTML5 | 替换方案 |
|------|-------|----------|
| 按钮 | `<button>` | `<base-button>` |
| 标签 / 徽章 | `<span class="tag">` | `<base-status>` |
| 复选框 | `<input type="checkbox">` | `<span role="checkbox">` + CSS |
| 单选框 | `<input type="radio">` | `<span role="radio">` + CSS |
| 输入框 | `<input>` | `<div contenteditable>` + CSS |
| 下拉选择 | `<select>` | `<div>` + 自定义面板 |
| 表格 | `<table>` | `<div>` + flex/grid |
| 表单 | `<form>` | `<div>` + 事件 |

### 反例

```vue
<!-- ❌ 严禁：base-table.md 中不能出现这些标签 -->
<button class="btn" @click="onClick">点击</button>
<input type="checkbox" v-model="checked" />
<table>
  <tr><td>{{ value }}</td></tr>
</table>
<select v-model="value">
  <option value="1">选项</option>
</select>
```

### 正例

```vue
<!-- ✅ 正确：必须用 div/span + CSS3 + 业务组件 -->
<base-button type="primary" @click="onClick">点击</base-button>

<div
  class="base-table__checkbox"
  :class="{ 'is-checked': checked }"
  role="checkbox"
  :aria-checked="checked"
  tabindex="0"
  @click="checked ="
/>

<div class="base-table__row">
  <div class="base-table__cell">{{ value }}</div>
</div>

<div
  class="base-table__edit-select"
  tabindex="0"
  @click="toggleSelect"
>
  <span>{{ currentLabel }}</span>
  <span class="base-table__edit-select-arrow">▾</span>
</div>
```

### 审计要点

1. 所有 `base-*.md` 文件搜索 `<button>` `<input>` `<select>` `<table>` `<tr>` `<td>` `<th>` `<textarea>` `<checkbox>` `<radio>` `<form>` `<option>` 等标签
2. 实现代码（`<template>`、`<script>` 块）中只允许 `<div>` `<span>` `<p>` + 业务组件（`<base-button>` `<base-status>` 等）
3. 描述性文档（说明文、表格、引用块）允许出现标签名作为文字描述，但不允许在代码块内出现
4. 每次新增或修改 .md 文件必须执行审计命令：

```bash
grep -E '<(button|input|select|table|tr|td|th|textarea|form|option)' base-*.md
# 输出为空才算合规
```

## 容器原则（铁律）

> **任何业务组件、表单、表格都必须嵌入 `<base-card>`。无例外。**

```vue
<!-- ✅ 正确 -->
<base-card title="商品管理">
  <base-table :data="products" :columns="columns" />
</base-card>

<!-- ❌ 错误：游离的 base-table -->
<base-table :data="products" :columns="columns" />
```

理由：
1. 全局视觉一致性（间距、阴影、圆角）
2. 为 `header-right` / `footer` 插槽提供容器
3. 业务区块边界明确，便于布局与响应式

## 第三方组件库禁令

> **禁止使用任何第三方 Vue UI 库**（Element Plus / Naive UI / Ant Design Vue / Vuetify / PrimeVue 等）。

如需弹窗、Drawer、Tabs 等组件 → 在 `frontend/vue/` 下按同一规范新建独立组件技能（参考 vue-status-skill 结构），而非引入第三方。

## 命名对齐矩阵（与 uniapp-theme-skill / uniapp-base-skill 完全对齐）

```
vue-theme-skill      ←  uniapp-theme-skill
vue-base-skill       ←  uniapp-base-skill
vue-card-skill       ←  uniapp-card-skill
vue-button-skill     ←  (扩展，未来可独立)
vue-tag-skill        ←  (扩展，未来可独立)
vue-table-skill      ←  (扩展，未来可独立)
vue-status-skill     ←  (扩展，状态/标签/徽章)
```

跨技能命名严格保持一致：组件、Token、文件结构、容器原则。

## 目录结构

```
frontend/vue/
├── vue-base-skill/                # 本技能：规范层入口（容器原则 / Token 约定 / 零 HTML5 铁律 / base-card 根容器规格）
│   ├── SKILL.md
│   ├── README.md
│   ├── base-card.md               # 根容器规格（6 维度参数）
│   └── references/
│       ├── skill-matrix.md        # 技能协同矩阵
│       └── roadmap.md             # 规划中组件
├── vue-card-skill/                # base-card 布局 / base-wg-card 业务卡片
├── vue-button-skill/              # base-button
├── vue-tag-skill/                 # base-tag
├── vue-status-skill/              # base-status
├── vue-table-skill/               # base-table / base-loading / base-paginated
├── vue-form-skill/                # base-form 体系（8 组件）
├── vue-dropdown-skill/            # base-dropdown（5 mode 浮层）
└── vue-theme-skill/               # 设计 Token（所有组件技能的唯一 Token 来源）
```

## 如何使用

1. **需要 base-card 容器** → 进入 [vue-card-skill](../vue-card-skill/SKILL.md)
2. **需要按钮** → 进入 [vue-button-skill](../vue-button-skill/SKILL.md)
3. **需要标签** → 进入 [vue-tag-skill](../vue-tag-skill/SKILL.md)
4. **需要状态/徽章** → 进入 [vue-status-skill](../vue-status-skill/SKILL.md)
5. **需要表格** → 进入 [vue-table-skill](../vue-table-skill/SKILL.md)
6. **需要表单** → 进入 [vue-form-skill](../vue-form-skill/SKILL.md)
7. **需要下拉/气泡/选择器** → 进入 [vue-dropdown-skill](../vue-dropdown-skill/SKILL.md)
8. **跨技能协同疑问** → 查看 [references/skill-matrix.md](references/skill-matrix.md)
9. **规划中组件（upload / collapse / style 等）** → 查看 [references/roadmap.md](references/roadmap.md)
