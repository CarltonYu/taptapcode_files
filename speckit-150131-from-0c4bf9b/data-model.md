# Data Model: 扇形画廊组件

**Feature**: speckit-150131-from-0c4bf9b  
**Date**: 2026-01-04

## Entity Overview

```
                    ┌─────────────────┐
                    │ FanGalleryView  │
                    │   (主控制器)     │
                    └────────┬────────┘
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│FanGalleryLayout │  │FanGalleryDamping│  │FanGalleryItemPool│
│  (布局计算器)    │  │  (阻尼系统)     │  │  (对象池管理)    │
└─────────────────┘  └─────────────────┘  └────────┬────────┘
          │                                        │
          │                                        ▼
          │                              ┌─────────────────┐
          │                              │ FanGalleryItem  │
          └────────────────────────────▶ │  (显示实例)      │
           位置/旋转/Z-Order计算           │  + IsFocused    │
                                         └────────┬────────┘
                                                  │ 绑定
                                                  ▼
                                         ┌─────────────────┐
                                         │ FanGalleryData  │
                                         │   (数据源)       │
                                         └─────────────────┘
                                                  
┌─────────────────┐
│FanGalleryConfig │  ◀─── 被所有组件引用
│  (配置参数)      │
│  + 边界角度      │
│  + 起始方向      │
│  + 焦点配置      │
└─────────────────┘
```

## Entities

### FanGalleryData

表示传入 Gallery 的单条数据。

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | Yes | 数据唯一标识符 |
| imageRef | string | Yes | 图片资源路径/地址 |
| text | string | Yes | 显示文本 |
| userData | object | No | 业务自定义数据，回调时原样返回 |

**Validation Rules**:
- `id` 不能为空或重复
- `imageRef` 不能为空
- `text` 可为空字符串

**Example**:
```csharp
new FanGalleryData {
    id = "item_001",
    imageRef = "Icons/Sword",
    text = "长剑",
    userData = new { damage = 100 }
}
```

---

### FanGalleryConfig (ScriptableObject)

Gallery 的配置参数，支持编辑器调整。

| Field | Type | Default | Range | Description |
|-------|------|---------|-------|-------------|
| **布局参数** |
| radius | float | 300 | 100-1000 | 扇形半径（像素） |
| leftBoundaryAngle | float | -90 | -180~0 | 左边界角度（负值向左） |
| rightBoundaryAngle | float | 90 | 0~180 | 右边界角度（正值向右） |
| itemAngleSpan | float | 20 | 10-60 | 单个Item占用角度（度） |
| centerOffset | Vector2 | (0,0) | - | 圆心偏移 |
| **起始方向** |
| startFromLeft | bool | true | - | 数据从左侧开始排列（否则从右侧） |
| **焦点参数** |
| focusAngle | float | 0 | - | 焦点角度，此角度附近的Item显示在最上层 |
| focusThreshold | float | 10 | 1-30 | 焦点阈值角度，建议小于itemAngleSpan |
| **阻尼参数** |
| friction | float | 3.0 | 0-10 | 摩擦系数 |
| springStiffness | float | 100 | 10-500 | 边界弹簧刚度 |
| springDamping | float | 10 | 1-50 | 边界弹簧阻尼 |
| minVelocity | float | 0.1 | - | 停止速度阈值 |
| **行为参数** |
| isLoopMode | bool | false | - | 是否循环模式 |
| dragSensitivity | float | 1.0 | 0.1-3.0 | 拖拽灵敏度 |
| velocityMultiplier | float | 1.0 | 0.5-2.0 | 释放速度倍率 |
| **图片加载** |
| maxRetryCount | int | 3 | 1-5 | 最大重试次数 |
| retryBaseDelay | float | 0.5 | 0.1-2.0 | 重试基础延迟（秒） |
| loadTimeout | float | 10 | 5-30 | 加载超时（秒） |
| placeholderSprite | Sprite | null | - | 占位图/加载失败图 |

**计算属性**:
- `ArcAngle`: 可见弧度范围 = rightBoundaryAngle - leftBoundaryAngle
- `VisibleItemCount`: 可见Item数量 = Ceil(ArcAngle / itemAngleSpan)
- `RecommendedPoolSize`: 推荐对象池大小 = VisibleItemCount + 4

---

### FanGalleryItem (MonoBehaviour)

挂载在 Item Prefab 上的组件。

| Field | Type | Description |
|-------|------|-------------|
| slotElement | RectTransform | 槽位元素容器（背景/边框，始终保持扇形位置） |
| displayElement | RectTransform | 显示元素容器（可被拖拽抽取） |
| image | Image | UI Image 组件引用（在 displayElement 下） |
| text | TMP_Text | TextMeshPro 文本组件引用（在 displayElement 下） |
| canvasGroup | CanvasGroup | 用于透明度控制 |

**Item 层级结构**:
```
FanGalleryItem (RectTransform)
├── SlotElement (背景边框，始终在扇形位置)
│   └── SlotBackground (Image - 空位占位符样式)
└── DisplayElement (可拖拽的显示内容)
    ├── ContentImage (Image - 主图片)
    └── ContentText (TMP_Text - 文字)
```

**State**:
| Property | Type | Description |
|----------|------|-------------|
| DataIndex | int | 当前绑定的数据索引，-1表示未绑定 |
| IsLoading | bool | 图片是否正在加载 |
| IsFocused | bool | 是否处于焦点状态 |
| IsDisplayDetached | bool | 显示元素是否已从Item脱离（拖拽中） |

**Methods**:
| Method | Description |
|--------|-------------|
| Bind(data, index) | 绑定数据并开始加载图片 |
| Unbind() | 解除绑定，重置状态 |
| SetPosition(position, rotation) | 设置扇形位置和旋转 |
| SetAlpha(alpha) | 设置透明度（用于边缘淡出） |
| SetSiblingIndex(index) | 设置Z-Order（层级排序） |
| SetFocused(focused) | 设置焦点状态 |
| DetachDisplay(canvas) | 将显示元素脱离Item，转到Canvas层级 |
| ReattachDisplay() | 将显示元素重新挂载回Item |
| GetSlotWorldRect() | 获取槽位元素的世界坐标矩形 |
| IsPointOverSlot(screenPoint) | 判断屏幕坐标是否在槽位范围内 |

**Virtual Methods**:
| Method | Description |
|--------|-------------|
| OnFocusChanged(focused) | 焦点状态变化时的回调，子类可重写以添加缩放等效果 |

---

### FanGalleryView (MonoBehaviour)

Gallery 主控制器。

| Field | Type | Description |
|-------|------|-------------|
| config | FanGalleryConfig | 配置引用 |
| itemPrefab | GameObject | Item 预制体 |
| container | RectTransform | Item 容器 |

**Events**:
| Event | Signature | Description |
|-------|-----------|-------------|
| OnItemEnterView | Action\<FanGalleryItem, FanGalleryData, int\> | 新Item进入可见区域时触发 |
| OnItemExitView | Action\<FanGalleryItem, FanGalleryData, int\> | Item离开可见区域时触发 |
| OnRotationChanged | Action\<float\> | 旋转角度变化时触发 |
| OnItemFocused | Action\<FanGalleryItem, FanGalleryData, int\> | Item获得焦点时触发 |
| OnItemUnfocused | Action\<FanGalleryItem, FanGalleryData, int\> | Item失去焦点时触发 |

**Public API**:
| Method | Description |
|--------|-------------|
| SetData(IList\<FanGalleryData\>) | 设置数据源 |
| RefreshData() | 刷新当前显示（数据变更后调用） |
| RotateTo(angle, animated) | 旋转到指定角度 |
| RotateToIndex(index, animated) | 旋转使指定索引Item到达焦点位置 |
| GetCurrentFocusIndex() | 获取当前焦点位置的Item索引 |
| SetLoopMode(bool) | 运行时切换循环模式 |

**Properties**:
| Property | Type | Description |
|----------|------|-------------|
| CurrentAngle | float | 当前旋转角度 |
| IsAnimating | bool | 是否正在动画中 |
| Config | FanGalleryConfig | 配置引用 |

---

### FanGalleryItemPool

对象池管理器（内部类）。

| Property | Type | Description |
|----------|------|-------------|
| PoolSize | int | 池容量 |
| ActiveCount | int | 当前激活数量 |

| Method | Description |
|--------|-------------|
| Get() | 从池获取Item，无可用则创建 |
| Return(item) | 归还Item到池 |
| Clear() | 清空池，销毁所有Item |
| Prewarm(count) | 预热，提前创建指定数量 |

---

### FanGalleryLayout

布局计算器（内部类）。

| Method | Description |
|--------|-------------|
| SetDataCount(count) | 设置数据总数（用于边界计算） |
| CalculateItemPosition(angle) | 根据角度计算Item位置 |
| CalculateItemRotation(angle) | 根据角度计算Item旋转 |
| GetVisibleIndexRange(currentAngle) | 获取当前可见的数据索引范围 |
| AngleToDataIndex(angle) | 角度转换为数据索引（考虑startFromLeft） |
| DataIndexToAngle(index) | 数据索引转换为角度（考虑startFromLeft） |
| NormalizeDataIndex(index) | 规范化索引（循环模式取模，有限模式钳制） |
| GetMinAngle() / GetMaxAngle() | 获取有效角度边界（考虑数据量少的情况） |
| CalculateDistanceFactor(itemAngle, currentAngle) | 计算Item相对焦点的距离因子（0-1） |
| IsItemInFocus(itemAngle, currentAngle) | 检查Item是否在焦点范围内 |
| CalculateZOrderPriority(itemAngle, currentAngle) | 计算Item的Z-Order优先级 |

---

### FanGalleryDamping

阻尼物理系统（内部类）。

| State | Type | Description |
|-------|------|-------------|
| CurrentAngle | float | 当前旋转角度 |
| Velocity | float | 当前角速度 |
| IsAnimating | bool | 是否正在动画中 |

| Method | Description |
|--------|-------------|
| UpdateBoundaries() | 更新边界缓存（数据或循环模式变化时调用） |
| SetAngle(angle) | 直接设置角度 |
| AnimateTo(angle) | 动画到目标角度 |
| StartDrag() | 开始拖拽，停止动画 |
| UpdateDrag(delta) | 更新拖拽，累加角度（超出边界时橡皮筋效果） |
| EndDrag(velocity) | 结束拖拽，启动惯性 |
| Update(deltaTime) | 每帧更新，应用阻尼和边界回弹 |
| StopImmediately() | 立即停止所有动画 |

**边界行为**:
- 有限模式：边界基于数据量动态计算，确保第一个/最后一个Item可以到达焦点位置
- 超出边界时拖拽有橡皮筋效果，释放后弹回有效范围
- 循环模式：无边界限制

---

## State Transitions

### Item Lifecycle

```
[Pool/Inactive] ──Get()──▶ [Active/Unbound]
                                  │
                              Bind(data)
                                  ▼
                          [Active/Loading]
                                  │
                          Load Complete
                                  ▼
                          [Active/Ready]
                                  │
                              Unbind()
                                  ▼
                          [Active/Unbound]
                                  │
                             Return()
                                  ▼
                          [Pool/Inactive]
```

### Gallery State

```
[Idle] ──BeginDrag──▶ [Dragging] ──EndDrag──▶ [Animating]
   ▲                       │                       │
   │                   SetData()               Velocity→0
   │                       │                       │
   └───────────────────────┴───────────────────────┘
```

## Relationships

| From | To | Type | Description |
|------|----|------|-------------|
| FanGalleryView | FanGalleryConfig | 1:1 | 配置引用 |
| FanGalleryView | FanGalleryItemPool | 1:1 | 拥有池 |
| FanGalleryView | FanGalleryLayout | 1:1 | 拥有布局器 |
| FanGalleryView | FanGalleryDamping | 1:1 | 拥有阻尼系统 |
| FanGalleryView | FanGalleryItem | 1:N | 管理多个Item |
| FanGalleryItem | FanGalleryData | N:1 | 绑定数据 |
| FanGalleryItemPool | FanGalleryItem | 1:N | 池化管理 |

| FanGalleryView | FanGalleryDragHandler | 1:1 | 鎷ユ湁鎷栨嫿澶勭悊鍣?|

---

### FanGalleryDragHandler

鎷栨嫿浜や簰澶勭悊鍣紙鏂板锛夈€?
**Enums**:

```csharp
public enum DragState
{
    None,       // 鏃犳嫋鎷?    Detecting,  // 妫€娴嬩腑锛堝垽鏂槸鏃嬭浆杩樻槸鎶藉彇锛?    Rotating,   // 鏃嬭浆Gallery
    Extracting, // 鎶藉彇鏄剧ず鍏冪礌
    Returning   // 鍥炲脊鍔ㄧ敾涓?}
```

**State**:
| Property | Type | Description |
|----------|------|-------------|
| State | DragState | 褰撳墠鎷栨嫿鐘舵€?|
| TargetItem | FanGalleryItem | 褰撳墠鎷栨嫿鐨勭洰鏍嘔tem锛圗xtracting鏃舵湁鏁堬級 |
| StartPosition | Vector2 | 鎷栨嫿璧峰灞忓箷鍧愭爣 |
| StartTime | float | 鎷栨嫿寮€濮嬫椂闂?|

**Methods**:
| Method | Description |
|--------|-------------|
| OnPointerDown(eventData) | 澶勭悊鎸変笅浜嬩欢锛屽垽鏂槸鍚﹀湪Item涓?|
| OnDrag(eventData) | 澶勭悊鎷栨嫿浜嬩欢锛屾牴鎹姸鎬佹墽琛屼笉鍚岄€昏緫 |
| OnPointerUp(eventData) | 澶勭悊閲婃斁浜嬩欢锛屾墽琛屽洖寮规垨绉婚櫎 |
| GetItemAtPosition(screenPos) | 鑾峰彇鎸囧畾浣嶇疆鐨処tem |
| CalculateExtractDirection(item, dragVector) | 璁＄畻鎷栨嫿鏂瑰悜鏄惁涓烘娊鍙栨柟鍚?|
| StartExtraction(item) | 寮€濮嬫娊鍙栵紝鑴辩鏄剧ず鍏冪礌 |
| UpdateExtraction(screenPos) | 鏇存柊鎶藉彇浣嶇疆 |
| EndExtraction(isOutside) | 缁撴潫鎶藉彇锛屾墽琛屽洖寮规垨绉婚櫎 |

**Config**:
| Parameter | Default | Description |
|-----------|---------|-------------|
| longPressDuration | 0.5s | 闀挎寜鍒ゅ畾鏃堕棿 |
| minDragDistance | 10px | 鏈€灏忔嫋鎷借窛绂?|
| extractAngleThreshold | 40掳 | 鎶藉彇鏂瑰悜瑙掑害闃堝€?|
| returnFrames | 5 | 鍥炲脊鍔ㄧ敾甯ф暟 |
| rearrangeFrames | 5 | 閲嶆帓鍔ㄧ敾甯ф暟 |
