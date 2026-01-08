# Implementation Plan: 扇形画廊组件 (Fan-Shaped Gallery)

**Branch**: `speckit-150131-from-0c4bf9b` | **Date**: 2026-01-04 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/speckit-150131-from-0c4bf9b/spec.md`

## Summary

实现一个高性能的扇形画廊UI组件，支持：
- **基础功能**: Image+Text 组合 Item 展示、对象池复用、拖拽旋转、惯性阻尼效果
- **回调通知**: Item 进入/离开视野、获得/失去焦点时的事件回调
- **拖拽抽取**: 从 Gallery 中拖拽抽取 Item 显示元素，支持回弹和移除动画
- **可配置性**: 边界模式（有限/循环）、阻尼参数、焦点角度、槽位样式

## Technical Context

| 属性 | 值 |
|------|-----|
| **Language/Version** | C# (Unity 2022.3 LTS+) |
| **Primary Dependencies** | Unity UI (uGUI), Unity EventSystem |
| **Storage** | N/A (内存中运行，不涉及持久化) |
| **Testing** | Unity Test Framework (PlayMode + EditMode) |
| **Target Platform** | PC (Windows/macOS), 兼容触屏设备 |
| **Project Type** | Unity Game Client (existing project) |
| **Performance Goals** | 60 fps (100个数据项时保持90%以上帧率) |
| **Constraints** | Item实例数量 ≤ 可见数量的1.5倍，内存占用最小化 |
| **Scale/Scope** | 0-100+ 数据项，3-7个同时可见 |

## Constitution Check

*GATE: 无 constitution.md 文件，跳过门禁检查*

✅ 无违规项，可继续执行

## Project Structure

### Documentation (this feature)

```text
specs/speckit-150131-from-0c4bf9b/
├── spec.md              # 功能规范 (已完成)
├── plan.md              # 本文件 - 技术实现计划
├── research.md          # Phase 0 - 技术研究 (已完成)
├── data-model.md        # Phase 1 - 数据模型设计 (已完成)
├── tasks.md             # 任务分解 (已完成)
├── quickstart.md        # 快速开始指南
└── checklists/
    └── requirements.md  # 需求检查清单
```

### Source Code (Unity Project)

```text
client/unity/xiuxian/Assets/
├── Scripts/
│   └── UI/
│       └── FanGallery/
│           ├── FanGalleryView.cs        # 主控制器 - 管理整体逻辑、事件回调
│           ├── FanGalleryItem.cs        # Item组件 - 显示元素+槽位元素结构
│           ├── FanGalleryItemPool.cs    # 对象池 - Item复用管理
│           ├── FanGalleryLayout.cs      # 布局计算 - 扇形位置/Z-Order计算
│           ├── FanGalleryDamping.cs     # 阻尼系统 - 惯性/摩擦/回弹
│           ├── FanGalleryDragHandler.cs # 拖拽处理 - 抽取交互状态机
│           ├── FanGalleryConfig.cs      # 配置数据 - ScriptableObject
│           └── FanGalleryData.cs        # 数据模型 - Item数据结构
├── Prefabs/
│   └── UI/
│       └── FanGallery/
│           ├── FanGalleryItem.prefab    # Item预制体 (含SlotElement+DisplayElement)
│           └── FanGalleryView.prefab    # Gallery整体预制体
└── Resources/
    └── FanGallery/
        └── DefaultConfig.asset          # 默认配置
```

**Structure Decision**: 采用 Unity 标准目录结构，将 FanGallery 作为独立模块放置在 `Scripts/UI/FanGallery/` 下，便于复用和维护。新增 `FanGalleryDragHandler.cs` 专门处理拖拽抽取交互逻辑。

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FanGalleryView                               │
│  (主控制器: 输入处理、状态管理、回调触发、数据源管理)                   │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ FanGallery   │  │ FanGallery   │  │ FanGallery   │               │
│  │ Layout       │  │ Damping      │  │ ItemPool     │               │
│  │ (位置计算)    │  │ (物理效果)    │  │ (对象复用)    │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                   FanGalleryDragHandler                   │       │
│  │  (拖拽抽取: 状态机、方向判定、回弹/移除动画)                 │       │
│  └──────────────────────────────────────────────────────────┘       │
├─────────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐       │
│  │                  FanGalleryItem × N                       │       │
│  │  ┌─────────────────┐  ┌─────────────────────────────┐    │       │
│  │  │  SlotElement    │  │      DisplayElement         │    │       │
│  │  │  (槽位/占位符)   │  │  (Image + Text, 可抽取)     │    │       │
│  │  └─────────────────┘  └─────────────────────────────┘    │       │
│  └──────────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────────┘
                              ▲
                              │ 数据绑定 (直接修改原始IList)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    IList<FanGalleryData>                             │
│  (外部传入的数据列表，抽取移除时直接修改)                              │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Design Decisions

| 决策点 | 选择 | 理由 |
|--------|------|------|
| UI系统 | Unity uGUI | 项目已使用uGUI，保持一致性 |
| 布局方式 | 基于角度的极坐标计算 | 扇形布局的自然表达方式 |
| 对象池 | 自定义实现 | 精确控制Item生命周期和数量 |
| 阻尼物理 | 自定义实现 | 避免引入物理引擎依赖，更精确控制 |
| 配置管理 | ScriptableObject | Unity标准做法，支持编辑器调整 |
| 图片加载 | 异步加载 + 重试 | 避免卡顿，提升用户体验 |
| 拖拽交互 | 多阶段状态机 | 清晰管理检测→旋转/抽取的复杂流程 |
| Item结构 | DisplayElement + SlotElement | 支持显示元素脱离并独立移动 |
| 抽取后数据处理 | 直接修改原始IList | 简化调用方代码，无需额外同步 |
| 槽位元素样式 | 调用方自定义Prefab | 最大灵活性，适配不同UI风格 |
| 抽取后显示元素 | 立即销毁 | 简化内存管理，调用方通过回调获取数据 |

## Implementation Phases

### Phase 1: 基础设施 (已完成 ✅)

- [x] FanGalleryData.cs - 数据模型
- [x] FanGalleryConfig.cs - 配置 ScriptableObject
- [x] FanGalleryLayout.cs - 布局计算器
- [x] FanGalleryItemPool.cs - 对象池管理

### Phase 2: 核心功能 (已完成 ✅)

- [x] FanGalleryItem.cs - Item组件（含槽位/显示元素结构）
- [x] FanGalleryView.cs - 主控制器
- [x] FanGalleryDamping.cs - 阻尼系统

### Phase 3: 交互增强 (已完成 ✅)

- [x] FanGalleryDragHandler.cs - 拖拽抽取处理器
- [x] 回调事件集成 (OnItemExtracted等)
- [x] 重排动画实现

### Phase 4: 收尾优化 (进行中)

- [ ] 创建 Item Prefab（需Unity编辑器）
- [ ] 创建 Gallery Prefab（需Unity编辑器）
- [ ] 创建默认配置 Asset
- [ ] 编辑器预览功能
- [ ] 性能优化和GC减少

## Component Responsibilities

| 组件 | 职责 |
|------|------|
| **FanGalleryView** | 主入口，管理数据源、协调子组件、触发回调事件 |
| **FanGalleryItem** | 单个Item的显示，管理DisplayElement/SlotElement层级 |
| **FanGalleryLayout** | 计算Item位置、旋转、Z-Order、可见范围 |
| **FanGalleryDamping** | 处理惯性滑动、摩擦减速、边界回弹 |
| **FanGalleryItemPool** | 管理Item实例的创建、复用、回收 |
| **FanGalleryDragHandler** | 处理拖拽抽取交互，管理状态机和动画 |
| **FanGalleryConfig** | 存储所有可配置参数（ScriptableObject） |
| **FanGalleryData** | 定义单条数据的结构 |

## Events & Callbacks

| 事件 | 触发时机 | 参数 |
|------|---------|------|
| OnItemEnterView | Item进入可见区域 | (FanGalleryItem, FanGalleryData, int) |
| OnItemExitView | Item离开可见区域 | (FanGalleryItem, FanGalleryData, int) |
| OnItemFocused | Item进入焦点区域 | (FanGalleryItem, FanGalleryData, int) |
| OnItemUnfocused | Item离开焦点区域 | (FanGalleryItem, FanGalleryData, int) |
| OnItemExtracted | Item被拖拽抽取移除 | (FanGalleryData, int) |
| OnRotationChanged | 旋转角度变化 | (float) |

## Configuration Parameters

| 类别 | 参数 | 类型 | 默认值 | 说明 |
|------|------|------|--------|------|
| **布局** | radius | float | 300 | 扇形半径（像素） |
| | leftBoundaryAngle | float | -90 | 左边界角度 |
| | rightBoundaryAngle | float | 90 | 右边界角度 |
| | itemAngleSpan | float | 20 | 单Item占用角度 |
| | centerOffset | Vector2 | (0,0) | 圆心偏移 |
| **方向** | startFromLeft | bool | true | 数据从左侧开始排列 |
| **焦点** | focusAngle | float | 0 | 焦点角度 |
| | focusThreshold | float | 10 | 焦点阈值 |
| **阻尼** | friction | float | 3.0 | 摩擦系数 |
| | springStiffness | float | 100 | 弹簧刚度 |
| | springDamping | float | 10 | 弹簧阻尼 |
| | minVelocity | float | 0.1 | 停止阈值 |
| **行为** | isLoopMode | bool | false | 循环模式 |
| | dragSensitivity | float | 1.0 | 拖拽灵敏度 |
| | velocityMultiplier | float | 1.0 | 速度倍率 |
| **抽取** | longPressDuration | float | 0.5 | 长按判定时间 |
| | extractAngleThreshold | float | 40 | 抽取方向阈值 |
| | animationFrames | int | 5 | 动画帧数 |
| **样式** | slotElementPrefab | GameObject | null | 槽位元素Prefab |
| | placeholderSprite | Sprite | null | 占位图 |

## Phase Outputs

- [research.md](./research.md) - 技术研究 (Phase 0) ✅
- [data-model.md](./data-model.md) - 数据模型 (Phase 1) ✅
- [tasks.md](./tasks.md) - 任务分解 ✅
- [quickstart.md](./quickstart.md) - 快速开始

## Risk & Mitigation

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| 大量数据时性能下降 | 中 | 对象池复用、仅渲染可见Item |
| 拖拽交互误判 | 中 | 明确的时间和角度阈值、用户可配置 |
| 图片加载阻塞 | 低 | 异步加载、占位图、重试机制 |
| 内存泄漏 | 低 | 严格的Item生命周期管理、显示元素及时销毁 |

## Next Steps

1. 在 Unity 编辑器中创建 Prefab 资源
2. 创建测试场景验证功能
3. 性能测试（100项数据）
4. 编写使用文档
