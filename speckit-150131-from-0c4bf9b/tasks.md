# Tasks: 扇形画廊组件 (Fan-Shaped Gallery)

**Input**: Design documents from `/specs/speckit-150131-from-0c4bf9b/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: 未明确要求测试任务，本任务列表仅包含实现任务。

**Organization**: 任务按用户故事分组，支持独立实现和测试。

## Format: `[ID] [P?] [Story] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[Story]**: 所属用户故事（US1, US2, US3...）
- 包含确切文件路径

## Path Conventions

Unity 项目路径：`client/unity/xiuxian/Assets/`
- Scripts: `Scripts/UI/FanGallery/`
- Prefabs: `Prefabs/UI/FanGallery/`
- Resources: `Resources/FanGallery/`

---

## Phase 1: Setup (项目结构初始化)

**Purpose**: 创建目录结构和基础数据模型

- [x] T001 创建 FanGallery 模块目录结构 `client/unity/xiuxian/Assets/Scripts/UI/FanGallery/`
- [x] T002 [P] 创建数据模型类 `FanGalleryData.cs` in `Scripts/UI/FanGallery/FanGalleryData.cs`
- [x] T003 [P] 创建配置 ScriptableObject `FanGalleryConfig.cs` in `Scripts/UI/FanGallery/FanGalleryConfig.cs`
- [x] T004 创建默认配置资产 `FanGalleryConfig.asset` in `Resources/FanGallery/FanGalleryConfig.asset`

---

## Phase 2: Foundational (基础组件 - 阻塞性前置)

**Purpose**: 所有用户故事依赖的核心基础设施

**⚠️ CRITICAL**: 此阶段完成前，任何用户故事都无法开始

- [x] T005 [P] 实现布局计算器 `FanGalleryLayout.cs` in `Scripts/UI/FanGallery/FanGalleryLayout.cs`
  - CalculateItemPosition(angle)
  - CalculateItemRotation(angle)
  - GetVisibleIndexRange(currentAngle)
  - AngleToDataIndex / DataIndexToAngle
- [x] T006 [P] 实现对象池管理器 `FanGalleryItemPool.cs` in `Scripts/UI/FanGallery/FanGalleryItemPool.cs`
  - Get() / Return(item)
  - Clear() / Prewarm(count)
  - PoolSize / ActiveCount 属性
- [x] T007 创建 Item 基础组件 `FanGalleryItem.cs` in `Scripts/UI/FanGallery/FanGalleryItem.cs`
  - Image/Text/CanvasGroup 引用
  - DataIndex / IsLoading 状态
  - SetPosition / SetAlpha 方法
- [x] T008 创建 Item Prefab `FanGalleryItem.prefab` in `Prefabs/UI/FanGallery/FanGalleryItem.prefab`
  - SlotElement + DisplayElement 层级结构
  - Image/TextMeshPro/CanvasGroup 组件
  - FanGalleryItem 脚本正确绑定引用

**Checkpoint**: 基础设施就绪 - 用户故事实现可以开始

---

## Phase 3: User Story 1 - 展示数据列表 (Priority: P1) 🎯 MVP

**Goal**: 以扇形布局展示 Image+Text 组合的数据项

**Independent Test**: 传入测试数据数组，验证 Gallery 正确显示所有 Item 并按扇形排列

### Implementation for User Story 1

- [x] T009 [US1] 完善 FanGalleryItem 的 Bind/Unbind 方法 in `Scripts/UI/FanGallery/FanGalleryItem.cs`
  - Bind(data, index) - 绑定数据，显示占位图
  - Unbind() - 解除绑定，重置状态
- [x] T010 [US1] 实现图片异步加载逻辑 in `Scripts/UI/FanGallery/FanGalleryItem.cs`
  - 异步加载图片资源
  - 重试机制（最多3次，指数退避）
  - 超时后显示占位图
- [x] T011 [US1] 创建主控制器骨架 `FanGalleryView.cs` in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - config / itemPrefab / container 引用
  - 初始化 Layout / ItemPool
- [x] T012 [US1] 实现 SetData API in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 接收 IList<FanGalleryData>
  - 计算可见范围
  - 创建并定位可见 Item
- [x] T013 [US1] 实现 RefreshData 方法 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 数据变更后刷新显示
  - 平滑过渡处理
- [x] T014 [US1] 创建 Gallery Prefab `FanGalleryView.prefab` in `Prefabs/UI/FanGallery/FanGalleryView.prefab`
  - Container RectTransform
  - FanGalleryView 脚本
  - 配置和 ItemPrefab 正确引用
- [x] T015 [US1] 处理空数据和单 Item 边界情况 in `Scripts/UI/FanGallery/FanGalleryView.cs`

**Checkpoint**: 静态数据展示功能完整可测试

---

## Phase 4: User Story 2 - 旋转浏览 (Priority: P1)

**Goal**: 用户可通过拖拽操作旋转 Gallery 浏览数据项

**Independent Test**: 拖拽操作验证 Gallery 能够平滑旋转，Item 位置随之更新

### Implementation for User Story 2

- [x] T016 [US2] 实现拖拽输入处理 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - IBeginDragHandler - 记录起始位置
  - IDragHandler - 计算增量，更新角度
  - IEndDragHandler - 计算释放速度
- [x] T017 [US2] 实现旋转更新逻辑 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 角度变化时重新计算可见范围
  - 回收离开视野的 Item
  - 创建进入视野的 Item
- [x] T018 [US2] 实现 Item 动态复用 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 维护 activeItems 字典 (dataIndex → Item)
  - 高效的 Item 复用和回收
- [x] T019 [US2] 实现 RotateTo / RotateToIndex API in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 程序控制旋转到指定角度/索引
  - 支持动画/非动画模式
- [x] T020 [US2] 实现 GetCurrentCenterIndex 方法 in `Scripts/UI/FanGallery/FanGalleryView.cs`

**Checkpoint**: 基础旋转交互功能完整可测试

---

## Phase 5: User Story 3 - 新Item出现回调 (Priority: P2)

**Goal**: 新 Item 进入可见区域时触发回调通知业务层

**Independent Test**: 注册回调函数，旋转 Gallery，验证回调被正确触发并携带正确的 Item 信息

### Implementation for User Story 3

- [x] T021 [US3] 定义回调事件 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - OnItemEnterView: Action<FanGalleryData, int>
  - OnItemExitView: Action<FanGalleryData, int>
  - OnRotationChanged: Action<float>
- [x] T022 [US3] 实现可见性追踪逻辑 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 记录上一帧可见 Item 集合
  - 检测新进入/离开的 Item
  - 触发相应回调
- [x] T023 [US3] 集成回调到旋转更新流程 in `Scripts/UI/FanGallery/FanGalleryView.cs`

**Checkpoint**: 回调机制完整可测试

---

## Phase 6: User Story 4 - 阻尼效果 (Priority: P2)

**Goal**: Gallery 旋转具有惯性滑动、摩擦力减速、边界回弹效果

**Independent Test**: 快速拖拽后释放，观察 Gallery 继续滑动并逐渐减速停止

### Implementation for User Story 4

- [x] T024 [US4] 创建阻尼系统类 `FanGalleryDamping.cs` in `Scripts/UI/FanGallery/FanGalleryDamping.cs`
  - CurrentAngle / Velocity / IsAnimating 状态
  - StartDrag / UpdateDrag / EndDrag 方法
- [x] T025 [US4] 实现惯性滑动算法 in `Scripts/UI/FanGallery/FanGalleryDamping.cs`
  - velocity *= (1 - friction * deltaTime)
  - 低于 minVelocity 时停止
- [x] T026 [US4] 实现摩擦力减速 in `Scripts/UI/FanGallery/FanGalleryDamping.cs`
  - 从 config 读取 friction 参数
  - 平滑减速曲线
- [x] T027 [US4] 实现边界回弹效果 in `Scripts/UI/FanGallery/FanGalleryDamping.cs`
  - 弹簧力: force = -springK * (position - boundary)
  - 阻尼: damping force
  - 仅有限边界模式生效
- [x] T028 [US4] 集成阻尼系统到主控制器 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - Update 循环中调用 Damping.Update
  - 拖拽事件转发到 Damping
- [x] T029 [US4] 实现触摸中断惯性动画 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 用户再次触摸时立即停止

**Checkpoint**: 阻尼物理效果完整可测试

---

## Phase 7: User Story 5 - 阻尼参数配置 (Priority: P3)

**Goal**: 开发者可配置阻尼效果各项参数以适应不同场景

**Independent Test**: 修改配置参数，验证阻尼行为变化符合预期

### Implementation for User Story 5

- [x] T030 [US5] 完善 FanGalleryConfig 阻尼参数 in `Scripts/UI/FanGallery/FanGalleryConfig.cs`
  - friction / springStiffness / springDamping
  - minVelocity / dragSensitivity / velocityMultiplier
  - 添加 Range 属性和 Tooltip
- [x] T031 [US5] 实现 SetLoopMode 运行时切换 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 循环/有限边界模式切换
  - 切换时平滑过渡
- [x] T032 [US5] 实现运行时参数热更新 in `Scripts/UI/FanGallery/FanGalleryDamping.cs`
  - 从 config 动态读取参数
  - 支持运行时调整

**Checkpoint**: 配置系统完整可测试

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 跨用户故事的改进和完善

- [x] T033 [P] 添加编辑器预览功能 in `Scripts/UI/FanGallery/Editor/FanGalleryViewEditor.cs`
  - FanGalleryViewEditor.cs - View编辑器，运行时控制和调试信息
  - FanGalleryConfigEditor.cs - Config编辑器，可视化布局预览
- [x] T034 [P] 实现边缘 Item 透明度渐变 in `Scripts/UI/FanGallery/FanGalleryItem.cs`
  - CalculateDistanceFactor 计算距离因子
  - SetAlpha 在 UpdateVisibleItems 中调用
- [x] T035 错误处理和日志完善 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 初始化时验证配置和Prefab
  - SetData/RemoveDataAt 添加边界检查和日志
  - FanGalleryItemPool 添加空值检查和异常处理
- [x] T036 性能优化 - 减少 GC 分配 in all FanGallery scripts
  - 复用 HashSet/List 缓存避免每帧分配
  - 使用静态比较器替代lambda
  - 缓存 corners 数组
- [x] T037 运行 quickstart.md 验证所有用例
  - FanGalleryTest.cs 增强测试功能
  - 快捷键测试：添加Item、循环模式、抽取功能、旋转控制
  - OnGUI 显示测试控制说明
  - *需要在Unity编辑器中运行实际验证*

---

## Phase 9: User Story 6 - Item 拖拽抽取交互 (Priority: P2) 🆕

**Goal**: 支持从 Gallery 中将 Item 的显示元素拖拽抽取出来

**Independent Test**: 长按 Item 并沿特定方向拖拽，验证显示元素被抽取、槽位元素显露、释放后行为符合预期

### Implementation for User Story 6

- [x] T038 [US6] 重构 FanGalleryItem 层级结构 in `Scripts/UI/FanGallery/FanGalleryItem.cs`
  - 添加 slotElement 和 displayElement 子 Transform
  - 将 Image/Text 移至 displayElement 下
  - 添加 IsDisplayDetached 状态
  - 实现 DetachDisplay / ReattachDisplay 方法
  - 实现 GetSlotScreenRect / IsPointOverSlot / GetItemUpDirection 方法
- [x] T039 [US6] 创建拖拽处理器 `FanGalleryDragHandler.cs` in `Scripts/UI/FanGallery/FanGalleryDragHandler.cs`
  - DragState 状态机实现（None/Detecting/Rotating/Extracting/Returning）
  - 长按检测逻辑（0.5秒阈值）
  - 拖拽方向判定（±40°角度）
  - GetItemAtPosition 查找方法
- [x] T040 [US6] 实现抽取交互逻辑 in `Scripts/UI/FanGallery/FanGalleryDragHandler.cs`
  - StartExtraction - 脱离显示元素到 Canvas 层级
  - UpdateExtraction - 跟随触点移动
  - 完全离开 Item 范围时摆正方向（Quaternion.identity）
- [x] T041 [US6] 实现回弹动画 in `Scripts/UI/FanGallery/FanGalleryDragHandler.cs`
  - 5帧线性插值动画（ReturnAnimation 协程）
  - 位置和旋转同时回弹
  - 动画结束后 ReattachDisplay
- [x] T042 [US6] 实现 Item 移除和重排 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - RemoveDataAt(index) 方法
  - RemoveAndRearrangeCoroutine - 5帧重排动画
  - 触发 OnItemExtracted 回调
- [x] T043 [US6] 集成拖拽系统到主控制器 in `Scripts/UI/FanGallery/FanGalleryView.cs`
  - 实现 IPointerDownHandler/IPointerUpHandler 接口
  - OnDrag 中协调 DragHandler 和旋转
  - 确保旋转和抽取互斥（检查 IsExtracting/IsReturning）
- [x] T044 [US6] 更新 Item Prefab 层级结构 in `Prefabs/UI/FanGallery/FanGalleryItem.prefab`
  - Slot 子物体（背景）
  - Display 子物体（Image + Text）
  - FanGalleryItem 正确绑定 _slotElement 和 _displayElement

**Checkpoint**: 拖拽抽取交互功能完整 ✅

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ─────────────────────────────────────────────────┐
      │                                                          │
      ▼                                                          │
Phase 2 (Foundational) ─── BLOCKS ALL USER STORIES ───┐          │
      │                                               │          │
      ▼                                               ▼          │
┌─────────────────────────────────────────────────────────┐      │
│  User Stories (可并行或按优先级顺序)                      │      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐            │      │
│  │ US1 (P1)  │  │ US2 (P1)  │  │ US3 (P2)  │            │      │
│  │ 数据展示   │──▶│ 旋转浏览   │──▶│ 回调通知   │            │      │
│  └───────────┘  └───────────┘  └───────────┘            │      │
│        │              │              │                   │      │
│        ▼              ▼              ▼                   │      │
│  ┌───────────┐  ┌───────────┐                           │      │
│  │ US4 (P2)  │  │ US5 (P3)  │                           │      │
│  │ 阻尼效果   │──▶│ 参数配置   │                           │      │
│  └───────────┘  └───────────┘                           │      │
└─────────────────────────────────────────────────────────┘      │
      │                                                          │
      ▼                                                          │
Phase 8 (Polish) ◀───────────────────────────────────────────────┘
```

### User Story Dependencies

| Story | 依赖 | 可并行 |
|-------|------|--------|
| US1 (数据展示) | Phase 2 完成 | 是 (MVP) |
| US2 (旋转浏览) | US1 完成 | 否 |
| US3 (回调通知) | US2 完成 | 否 |
| US4 (阻尼效果) | US2 完成 | 可与 US3 并行 |
| US5 (参数配置) | US4 完成 | 否 |
| US6 (拖拽抽取) | US2 完成 | 可与 US3/US4/US5 并行 |

### Parallel Opportunities

**Phase 1 并行**:
```
T002 (FanGalleryData.cs) ║ T003 (FanGalleryConfig.cs)
```

**Phase 2 并行**:
```
T005 (Layout) ║ T006 (ItemPool) ║ T007 (Item基础)
```

**US3 + US4 可并行** (均依赖 US2):
```
US3 (回调通知) ║ US4 (阻尼效果)
```

---

## Implementation Strategy

### MVP First (仅 User Story 1 + 2)

1. ✅ Complete Phase 1: Setup
2. ✅ Complete Phase 2: Foundational
3. ✅ Complete Phase 3: US1 - 数据展示
4. ✅ Complete Phase 4: US2 - 旋转浏览
5. **STOP and VALIDATE**: 测试静态展示 + 基础旋转
6. Deploy/Demo 基础功能

### Incremental Delivery

| 阶段 | 交付物 | 可演示功能 |
|------|--------|-----------|
| MVP | US1 + US2 | 扇形展示 + 拖拽旋转 |
| +US3 | 回调通知 | 业务层可响应浏览行为 |
| +US4 | 阻尼效果 | 惯性滑动，自然停止 |
| +US5 | 参数配置 | 可调节物理感 |
| Final | Polish | 生产就绪 |

---

## Summary

| 统计项 | 数值 |
|--------|------|
| **总任务数** | 44 |
| **Setup 任务** | 4 |
| **Foundational 任务** | 4 |
| **US1 任务** | 7 |
| **US2 任务** | 5 |
| **US3 任务** | 3 |
| **US4 任务** | 6 |
| **US5 任务** | 3 |
| **US6 任务 (新增)** | 7 |
| **Polish 任务** | 5 |
| **可并行机会** | 8 组 |

## Notes

- [P] 任务 = 不同文件，无依赖，可并行
- [Story] 标签对应 spec.md 中的用户故事
- 每个用户故事可独立完成和测试
- 每个任务完成后提交代码
- 在任意 Checkpoint 可停止验证当前功能

