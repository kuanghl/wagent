# vue-base-skill

> Vue 基础组件父技能（规范层入口）。命名与 uniapp-base-skill（uni-app 版，不在本仓库）对齐。

## 容器原则（核心铁律）

> **所有组件必须由 base-card 包裹。无例外。**

## 🚫 零 HTML5 标签原则（.md 文档约束）

> **所有 `.md` 文档中的实现代码严禁使用 HTML5 原生标签**（`<button>` `<table>` `<input>` `<select>` `<textarea>` `<checkbox>` `<radio>` `<form>` `<tr>` `<td>` `<th>` `<option>` 等）。
>
> **必须**：
> - 按钮 → `<base-button>` 组件
> - 标签/徽章 → `<base-status>` 组件
> - 复选框/单选框 → `<div role="checkbox|radio">` + CSS3
> - 输入框 → `<div contenteditable>` + CSS3
> - 下拉选择 → `<div>` + 自定义面板 + CSS3
> - 表格 → `<div>` + flex/grid
>
> **唯一例外**：`demo-components/**/*.html` Demo 文件允许使用 HTML5 标签（用于用户查看运行效果）。
>
> 完整规范见 [SKILL.md](./SKILL.md) → 「🚫 零 HTML5 标签铁律」。

## 7 个组件技能（同级独立技能）

| 组件技能 | 内容 | 状态 |
|--------|------|------|
| [vue-card-skill](../vue-card-skill/SKILL.md) | base-card 容器 + 12 种卡片布局 | ✅ |
| [vue-button-skill](../vue-button-skill/SKILL.md) | 6 type × 5 variant × 3 size 按钮 | ✅ |
| [vue-tag-skill](../vue-tag-skill/SKILL.md) | 6 type × 3 variant 标签 | ✅ |
| [vue-status-skill](../vue-status-skill/SKILL.md) | 7 type × 5 variant × 3 size 状态/徽章 | ✅ |
| [vue-table-skill](../vue-table-skill/SKILL.md) | 23 种形态的通用表格 + 加载 + 分页 | ✅ |
| [vue-form-skill](../vue-form-skill/SKILL.md) | base-form 表单体系（8 组件）+ 校验引擎 | ✅ |
| [vue-dropdown-skill](../vue-dropdown-skill/SKILL.md) | base-dropdown 下拉/浮层（5 mode） | ✅ |

> 规划中组件（upload / collapse / style 等）见 [references/roadmap.md](references/roadmap.md)。

## 设计 Token

所有组件统一引用 [vue-theme-skill](../vue-theme-skill/)：
- `--color-*` / `--space-*` / `--font-*` / `--height-*` / `--radius-*` / `--weight-*` / `--leading-*`
- 命名严格对齐 uniapp-theme-skill

**禁止**：硬编码任何颜色、间距、字号、行高、圆角值。

## 第三方组件库

❌ 禁止使用 Element Plus / Naive UI / Ant Design Vue / Vuetify / PrimeVue 等。

## 快速上手

```vue
<template>
  <base-card title="商品管理">
    <template #header-right>
      <base-button type="primary" variant="solid">+ 新建</base-button>
    </template>

    <base-table
      :data="products"
      :columns="columns"
      variant="bordered"
      selectable
    />
  </base-card>
</template>
```

## 目录

```
frontend/vue/
├── vue-base-skill/         # 本技能：规范层入口（含零 HTML5 标签铁律）
│   ├── SKILL.md
│   ├── README.md
│   ├── base-card.md        # 根容器规格
│   └── references/
│       ├── skill-matrix.md
│       └── roadmap.md
├── vue-card-skill/
├── vue-button-skill/
├── vue-tag-skill/
├── vue-status-skill/       # 状态/徽章
├── vue-table-skill/        # 表格/分页/加载
├── vue-form-skill/         # 表单体系
├── vue-dropdown-skill/     # 下拉/浮层
└── vue-theme-skill/        # 设计 Token
```

## 相关技能

- [vue-theme-skill](../vue-theme-skill/SKILL.md) — 主题与设计 Token
- 
