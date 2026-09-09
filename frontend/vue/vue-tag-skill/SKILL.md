---
name: vue-tag-skill
description: Vue 标签组件技能。base-tag：用于状态标记、分类标签、计数指示器。6 type × 3 variant，零第三方组件库，必须嵌入 base-card 容器。触发词："做一个标签"、"状态标签"、"分类标签"、"徽标"、"NEW 标签"、"HOT 标签"、"计数标签"、"订单状态"、"可关闭标签"、"带图标的标签"、"base-tag"。
---

# vue-tag-skill

> Vue 标签组件技能。基于 Vue主题-skill 的 Token 实现，零第三方组件库。

## 核心组件

| 组件 | 说明 |
|------|------|
| **base-tag** | 通用标签（6 type × 3 variant） |

## Props 矩阵

| 维度 | 可选值 |
|------|--------|
| `type` | default / primary / success / warning / danger / info |
| `variant` | light（默认）/ outline / solid |
| `closable` | boolean（显示关闭 ×） |
| `size` | sm / md |

## 文件结构

```
vue-tag-skill/
├── SKILL.md
├── README.md
├── base-tag.md
└── demo-components/
    └── base-tag/
        ├── README.md
        ├── html/01-types.html
        └── html/02-usecases.html
```

## 容器原则

> 标签通常出现在表格 / 列表的单元格内，必须确保外层有 `<base-card>` 容器。

```vue
<base-card title="商品详情">
  <div class="demo-row">
    <base-tag type="danger" variant="solid">NEW</base-tag>
    <base-tag>限时折扣</base-tag>
    <base-tag type="success">现货</base-tag>
  </div>
</base-card>
```

## 设计 Token

```css
.base-tag {
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-xs);
  background: var(--color-bg-secondary);
  color: var(--color-text-secondary);
}
.base-tag--type-success {
  background: var(--color-success-light);
  color: var(--color-success-dark);
}
```

**禁止硬编码任何颜色 / 间距 / 字号 / 圆角值。**

## 第三方组件库

❌ 禁止 Element Plus / Naive UI / Ant Design Vue / Vuetify / PrimeVue。