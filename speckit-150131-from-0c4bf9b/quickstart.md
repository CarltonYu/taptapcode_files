# Quick Start: 扇形画廊组件

**Feature**: speckit-150131-from-0c4bf9b  
**Date**: 2026-01-04

## 基础用法

### 1. 添加到场景

1. 将 `FanGalleryView.prefab` 拖入 Canvas 下
2. 配置 `FanGalleryConfig` ScriptableObject（或使用默认配置）
3. 在代码中获取引用并设置数据

### 2. 设置数据

```csharp
// 获取组件引用
var gallery = GetComponent<FanGalleryView>();

// 准备数据
var items = new List<FanGalleryData>
{
    new FanGalleryData { id = "1", imageRef = "Icons/Item1", text = "物品1" },
    new FanGalleryData { id = "2", imageRef = "Icons/Item2", text = "物品2" },
    new FanGalleryData { id = "3", imageRef = "Icons/Item3", text = "物品3" },
    // ... 更多数据
};

// 设置数据
gallery.SetData(items);
```

### 3. 监听回调

```csharp
// 新Item进入视野时
gallery.OnItemEnterView += (data, index) =>
{
    Debug.Log($"Item entered: {data.text} at index {index}");
};

// Item离开视野时
gallery.OnItemExitView += (data, index) =>
{
    Debug.Log($"Item exited: {data.text}");
};

// 旋转角度变化时
gallery.OnRotationChanged += (angle) =>
{
    Debug.Log($"Current angle: {angle}");
};
```

## 配置参数

### 布局配置

```csharp
// 通过 ScriptableObject 配置
[CreateAssetMenu(fileName = "GalleryConfig", menuName = "UI/FanGalleryConfig")]
public class FanGalleryConfig : ScriptableObject
{
    [Header("布局")]
    public float radius = 300f;        // 扇形半径
    public float arcAngle = 120f;      // 可见弧度 (90-180)
    public float itemAngleSpan = 20f;  // 单Item角度
    
    [Header("阻尼")]
    public float friction = 3f;        // 摩擦力
    public float springStiffness = 100f;
    
    [Header("行为")]
    public bool isLoopMode = false;    // 循环模式
}
```

### 运行时修改

```csharp
// 切换循环模式
gallery.SetLoopMode(true);

// 程序控制旋转
gallery.RotateToIndex(5, animated: true);
gallery.RotateTo(90f, animated: false);
```

## 动态更新数据

```csharp
// 修改数据后刷新
items.Add(new FanGalleryData { id = "new", imageRef = "...", text = "新物品" });
gallery.RefreshData();

// 完全替换数据
gallery.SetData(newItems);
```

## 自定义 Item 样式

1. 复制 `FanGalleryItem.prefab` 
2. 修改 UI 布局（保留 Image 和 TMP_Text 组件）
3. 将新 Prefab 赋值给 `FanGalleryView.itemPrefab`

## 性能建议

1. **数据量**: 建议 ≤100 条，超过100条仍可工作但考虑分页
2. **图片尺寸**: 建议 ≤256x256，使用压缩格式
3. **预热**: 大量数据时调用 `pool.Prewarm(visibleCount + 2)`

## 常见问题

### Q: 如何获取当前选中的Item？

```csharp
int centerIndex = gallery.GetCurrentCenterIndex();
var data = items[centerIndex];
```

### Q: 如何禁用拖拽？

```csharp
gallery.enabled = false;  // 禁用整个组件
// 或
gallery.config.dragSensitivity = 0;  // 设置灵敏度为0
```

### Q: 图片加载失败怎么处理？

组件会自动重试3次，失败后显示 `config.placeholderSprite`。确保配置了占位图。

### Q: 如何实现点击Item？

在 `FanGalleryItem.prefab` 上添加 Button 组件或实现 `IPointerClickHandler`。

