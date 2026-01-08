# Technical Research: 扇形画廊组件

**Feature**: speckit-150131-from-0c4bf9b  
**Date**: 2026-01-04

## Research Areas

### 1. 扇形布局算法

**Decision**: 使用极坐标系计算 Item 位置

**Rationale**: 
- 扇形是极坐标的自然表达
- 每个 Item 的位置由 (角度, 半径) 决定
- 角度随旋转值线性变化，计算简单高效

**算法核心**:
```
对于第 i 个 Item:
  angle_i = baseAngle + (i - centerIndex) * itemAngleSpan
  position_x = centerX + radius * cos(angle_i)
  position_y = centerY + radius * sin(angle_i)
  rotation_z = angle_i - 90° (使 Item 朝向圆心)
```

**Alternatives considered**:
- Bezier曲线布局: 复杂度高，非必要
- 直接Transform操作: 与极坐标等价，极坐标更直观

---

### 2. 对象池实现策略

**Decision**: 基于可见角度范围的动态池

**Rationale**:
- 可见 Item 数量 = arcAngle / itemAngleSpan + buffer
- buffer = 2 (左右各1个预加载)
- 池大小 = ceil(180° / 15°) + 2 = 14 个 Item 足够覆盖最大配置

**实现要点**:
- 维护 `activeItems` 字典: dataIndex → ItemInstance
- 当旋转导致 Item 离开可见区域，回收到池
- 当新 dataIndex 进入可见区域，从池获取或创建

**Alternatives considered**:
- Unity ObjectPool<T>: 可用但自定义更可控
- 预创建所有Item: 内存浪费，违反 SC-002

---

### 3. 阻尼物理模型

**Decision**: 速度衰减模型 + 弹簧回弹

**Rationale**:
- 惯性: `velocity *= (1 - friction * deltaTime)`
- 边界回弹: `force = -springK * (position - boundary)`
- 简单、可预测、易于配置

**参数设计**:
| 参数 | 默认值 | 范围 | 说明 |
|------|--------|------|------|
| friction | 3.0 | 0-10 | 摩擦系数，越大减速越快 |
| springK | 100.0 | 10-500 | 弹簧系数，越大回弹越快 |
| springDamping | 10.0 | 1-50 | 弹簧阻尼，防止震荡 |
| minVelocity | 0.1 | - | 速度阈值，低于此值停止 |

**Alternatives considered**:
- Unity Physics 2D: 过重，不适合UI
- DOTween: 需要额外依赖，自定义更灵活

---

### 4. 输入处理方案

**Decision**: 使用 Unity EventSystem + IDragHandler

**Rationale**:
- 与 uGUI 无缝集成
- 自动处理 PC 鼠标和触屏输入
- 支持多点触控（如需要）

**实现接口**:
- `IBeginDragHandler`: 记录起始位置，停止当前动画
- `IDragHandler`: 计算拖拽增量，更新旋转角度
- `IEndDragHandler`: 计算释放速度，启动惯性动画

**Alternatives considered**:
- Input System Actions: 更复杂，UI交互用EventSystem足够
- 直接读取Input.mousePosition: 不支持触屏，不推荐

---

### 5. 图片异步加载

**Decision**: 使用 Unity Addressables 或 Resources.LoadAsync

**Rationale**:
- 避免主线程阻塞
- 支持加载失败重试
- 可扩展支持远程资源

**加载流程**:
1. Item 获得新数据时，显示占位图
2. 异步请求图片资源
3. 加载成功: 替换占位图
4. 加载失败: 重试(最多3次)，超时后保持占位图

**重试策略**:
- 最大重试次数: 3
- 重试间隔: 0.5s, 1s, 2s (指数退避)
- 总超时: 10s

**Alternatives considered**:
- 同步加载: 会卡顿，不可接受
- 第三方库(UniTask等): 项目可能未引入，保持简单

---

### 6. 循环模式实现

**Decision**: 虚拟索引映射

**Rationale**:
- 有限模式: virtualIndex 直接对应 dataIndex，有边界
- 循环模式: dataIndex = virtualIndex % dataCount (处理负数)
- 统一的布局算法，仅索引映射不同

**边界处理**:
```
有限模式:
  if (virtualIndex < 0) clamp and bounce
  if (virtualIndex >= dataCount) clamp and bounce

循环模式:
  dataIndex = ((virtualIndex % dataCount) + dataCount) % dataCount
  (永远有效，无边界)
```

**Alternatives considered**:
- 两套独立实现: 代码重复，维护困难

---

---

### 7. Item 拖拽抽取交互

**Decision**: 多阶段状态机 + 角度判定

**Rationale**:
- 使用状态机管理复杂的交互流程
- 按下后先进入"检测中"状态，积累位移和时间数据
- 根据时间和角度判定最终行为

**状态机设计**:
```
[None] ──PointerDown(在Item上)──▶ [Detecting]
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        │                               │                               │
   时间>0.5秒              角度在±40°内且移动足够     角度超出±40°或移动少
   或移动少                       │                               │
        ▼                         ▼                               ▼
   [Rotating]               [Extracting]                    [Rotating]
        │                         │                               │
  PointerUp              PointerUp(在Item内)                PointerUp
        ▼                         ▼                               ▼
    [None]                  [Returning]                       [None]
      启动惯性                5帧回弹                          启动惯性
                                  │
                              动画完成
                                  ▼
                               [None]

                    PointerUp(在Item外)
                          │
                          ▼
                    移除Item数据
                    触发回调
                    其他Item 5帧动画重排
```

**角度判定算法**:
```csharp
// 计算拖拽方向相对于Item朝向的角度
Vector2 dragDirection = currentPos - startPos;
Vector2 itemUp = item.transform.up; // Item的"正上方"（相对于扇形朝向圆心）
float angle = Vector2.SignedAngle(itemUp, dragDirection.normalized);
bool isExtractDirection = Mathf.Abs(angle) <= 40f;
```

**时间阈值**:
| 参数 | 值 | 说明 |
|------|-----|------|
| longPressDuration | 0.5s | 超过此时间视为长按（旋转） |
| minDragDistance | 10px | 最小移动距离判定 |
| extractAngleThreshold | 40° | 抽取方向角度阈值 |
| returnFrames | 5 | 回弹动画帧数 |
| rearrangeFrames | 5 | 重排动画帧数 |

---

### 8. 显示元素与槽位元素分离

**Decision**: Item 内部分为两个子 Transform

**Rationale**:
- 显示元素（DisplayElement）：包含 Image + Text，可被拖拽抽出
- 槽位元素（SlotElement）：背景/边框，始终保持在扇形位置
- 普通状态下 DisplayElement 覆盖 SlotElement
- 抽取时 DisplayElement 脱离 Item 父级，转到全局 Canvas 层级

**层级结构**:
```
FanGalleryItem (RectTransform)
├── SlotElement (Image - 背景边框)
└── DisplayElement (Container)
    ├── ContentImage (Image)
    └── ContentText (TMP_Text)
```

**抽取过程**:
1. 开始抽取：DisplayElement.SetParent(Canvas.transform) 脱离 Item
2. 跟随移动：DisplayElement.position = 触点位置
3. 离开范围：DisplayElement.rotation = Quaternion.identity（摆正）
4. 释放判定：检查 DisplayElement 是否与原 Item 重叠

**碰撞检测**:
```csharp
// 使用 RectTransformUtility 判断位置
bool isOverItem = RectTransformUtility.RectangleContainsScreenPoint(
    itemRectTransform, 
    displayElement.position, 
    canvas.worldCamera
);
```

---

### 9. 动画系统设计

**Decision**: 基于帧数的线性插值动画

**Rationale**:
- 5帧约83ms（60FPS），足够快速且平滑
- 使用 Lerp 实现简单直接
- 不依赖外部动画库

**回弹动画**:
```csharp
IEnumerator ReturnToSlot(Transform displayElement, Vector3 targetPos, Quaternion targetRot)
{
    Vector3 startPos = displayElement.position;
    Quaternion startRot = displayElement.rotation;
    
    for (int i = 0; i < 5; i++)
    {
        float t = (i + 1) / 5f;
        displayElement.position = Vector3.Lerp(startPos, targetPos, t);
        displayElement.rotation = Quaternion.Lerp(startRot, targetRot, t);
        yield return null; // 等待下一帧
    }
    
    // 动画结束，重新挂载回 Item
    displayElement.SetParent(itemTransform);
}
```

**重排动画**:
```csharp
IEnumerator RearrangeItems(List<ItemMoveData> moves)
{
    for (int i = 0; i < 5; i++)
    {
        float t = (i + 1) / 5f;
        foreach (var move in moves)
        {
            move.item.SetPosition(
                Vector2.Lerp(move.from, move.to, t),
                Mathf.Lerp(move.fromRot, move.toRot, t)
            );
        }
        yield return null;
    }
}
```

---

## Summary

所有技术方案已确定，无需进一步澄清。关键决策:

1. **极坐标布局** - 自然表达扇形
2. **动态对象池** - 性能与内存平衡
3. **速度衰减物理** - 简单可控的阻尼效果
4. **EventSystem输入** - uGUI标准方案
5. **异步加载+重试** - 图片加载容错
6. **虚拟索引映射** - 统一有限/循环模式
7. **多阶段状态机** - 管理复杂的拖拽抽取交互
8. **显示/槽位分离** - Item内部双层结构实现抽取效果
9. **帧计数动画** - 简单高效的5帧动画系统

