# Feature Specification: 扇形画廊组件 (Fan-Shaped Gallery)

**Feature Branch**: `speckit-150131-from-0c4bf9b`  
**Created**: 2026-01-04  
**Status**: Draft  
**Input**: Unity项目中实现一个扇形Gallery，包含Image+Text组合Item，支持Item复用、0-100+数据、旋转触发回调、阻尼效果配置

## Clarifications

### Session 2026-01-04

- Q: 旋转边界模式应该是有限边界、无限循环还是可配置？ → A: 可配置 - 提供开关让调用方选择循环或有限模式
- Q: 惯性滑动停止后是否需要吸附对齐到最近的Item？ → A: 自由停止 - Gallery停在任意位置，不做额外对齐
- Q: 扇形的可见弧度范围是多少？ → A: 90-180度，可配置，常见范围可展示3-7个Item
- Q: 动画进行中（惯性滑动）时数据更新如何处理？ → A: 平滑过渡 - 保持当前动画状态，在下一帧平滑应用数据变更
- Q: 图片资源加载失败时如何处理？ → A: 重试机制 - 自动重试加载，超时后显示占位图

### Session 2026-01-04 (Iteration 2)

- Q: 边界配置方式？ → A: 使用左边界角度+右边界角度替代arcAngle，更直观地定义扇形范围
- Q: 数据量少于可显示数量时的对齐方式？ → A: 添加`startFromLeft`配置，控制数据从左侧还是右侧开始排列
- Q: 焦点Item如何突出显示？ → A: 添加`focusAngle`焦点角度配置，在此角度附近的Item显示在最上层（Z-Order最高）
- Q: 焦点范围如何定义？ → A: 添加`focusThreshold`焦点阈值，在此范围内的Item获得焦点状态

### Session 2026-01-04 (Iteration 3)

- Q: 抽取后的数据源处理方式？ → A: 直接从原始数据源移除该项（Gallery修改调用方传入的IList）
- Q: 槽位元素的视觉样式？ → A: 由调用方通过配置自定义槽位元素的Prefab/样式
- Q: 抽取后显示元素的处理方式？ → A: 立即销毁，调用方通过回调获取数据后自行决定后续处理

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 展示数据列表 (Priority: P1)

用户需要在界面上以扇形布局展示一组数据项。每个数据项包含图片和文字，用户可以直观地浏览所有可用选项。

**Why this priority**: 这是核心功能，没有数据展示，其他功能（旋转、回调）都无法实现。

**Independent Test**: 可以通过传入测试数据数组，验证Gallery正确显示所有Item并按扇形排列。

**Acceptance Scenarios**:

1. **Given** 传入包含5条数据的列表, **When** Gallery初始化完成, **Then** 界面显示5个Item，每个Item包含对应的图片和文字
2. **Given** 传入空列表, **When** Gallery初始化完成, **Then** 界面不显示任何Item，组件状态正常
3. **Given** 传入100条数据, **When** Gallery初始化完成, **Then** 可见区域内的Item正确显示，界面保持流畅

---

### User Story 2 - 旋转浏览 (Priority: P1)

用户可以通过触摸/拖拽操作旋转扇形Gallery，浏览不在当前可见区域的数据项。

**Why this priority**: 旋转是Gallery的核心交互方式，与数据展示同等重要。

**Independent Test**: 可以通过拖拽操作验证Gallery能够平滑旋转，Item位置随之更新。

**Acceptance Scenarios**:

1. **Given** Gallery显示若干Item, **When** 用户向左拖拽, **Then** Gallery顺时针旋转，新的Item进入视野
2. **Given** Gallery显示若干Item, **When** 用户向右拖拽, **Then** Gallery逆时针旋转，不同的Item进入视野
3. **Given** Gallery正在旋转, **When** 用户再次触摸, **Then** 旋转立即停止，响应新的输入

---

### User Story 3 - 新Item出现回调 (Priority: P2)

当用户旋转Gallery导致新的Item进入可见区域时，系统需要触发回调函数通知业务逻辑层。

**Why this priority**: 回调功能允许业务逻辑响应用户浏览行为，但不影响基础的展示和旋转功能。

**Independent Test**: 可以通过注册回调函数，旋转Gallery，验证回调被正确触发并携带正确的Item信息。

**Acceptance Scenarios**:

1. **Given** 已注册新Item出现的回调函数, **When** 旋转Gallery使新Item进入可见区域, **Then** 回调函数被调用，参数包含新Item对应的数据
2. **Given** 已注册回调函数, **When** 旋转但没有新Item进入视野, **Then** 回调函数不被调用

---

### User Story 4 - 阻尼效果 (Priority: P2)

Gallery旋转需要具有物理感的阻尼效果，包括惯性滑动、摩擦力减速、边界回弹，使交互体验更自然流畅。

**Why this priority**: 阻尼效果提升用户体验，但基础功能可以先使用线性旋转实现。

**Independent Test**: 可以通过快速拖拽后释放，观察Gallery是否继续滑动并逐渐减速停止。

**Acceptance Scenarios**:

1. **Given** 用户快速拖拽后释放, **When** 手指离开屏幕, **Then** Gallery继续按惯性滑动，速度逐渐降低直至停止
2. **Given** Gallery旋转到数据边界, **When** 继续向同方向旋转, **Then** 产生回弹效果，Gallery弹回有效范围
3. **Given** 配置了较高的阻力参数, **When** 用户拖拽释放, **Then** Gallery减速更快，滑动距离更短

---

### User Story 5 - 阻尼参数配置 (Priority: P3)

开发者需要能够配置阻尼效果的各项参数（惯性系数、摩擦力、回弹强度），以适应不同的使用场景。

**Why this priority**: 这是进阶功能，默认参数可以满足大多数场景需求。

**Independent Test**: 可以通过修改配置参数，验证阻尼行为的变化符合预期。

**Acceptance Scenarios**:

1. **Given** 配置惯性系数为0, **When** 用户拖拽释放, **Then** Gallery立即停止，无惯性滑动
2. **Given** 配置回弹强度为最大, **When** Gallery到达边界, **Then** 回弹动画更快更明显

---

### User Story 6 - Item 拖拽抽取交互 (Priority: P2)

用户可以从 Gallery 中将某个 Item 的"显示元素"拖拽抽取出来，留下"槽位元素"作为空位占位符。抽取后的显示元素可以跟随手指/鼠标移动，释放时根据位置决定是回到原位还是从 Gallery 中移除。

**Why this priority**: 这是交互增强功能，在基础功能完成后实现。

**Independent Test**: 可以通过长按 Item 并沿特定方向拖拽，验证显示元素被抽取、槽位元素显露、释放后的行为是否符合预期。

**Acceptance Scenarios**:

1. **Given** Gallery显示若干Item, **When** 用户点击Item外部区域并拖拽, **Then** Gallery执行旋转操作
2. **Given** 用户在Item上点击, **When** 按住超过0.5秒且移动距离很小, **Then** 整个操作被视为旋转Gallery
3. **Given** 用户在Item上点击并快速向Item正上方(±40°内)移动, **When** 移动距离足够, **Then** 显示元素跟随拖拽抽出，槽位元素显露，Gallery不旋转
4. **Given** 用户在Item上点击并向其他方向(超出±40°)移动, **When** 移动距离足够, **Then** Gallery执行旋转操作
5. **Given** 显示元素被抽出跟随手指移动, **When** 显示元素完全离开Item范围, **Then** 显示元素摆正方向，可在全屏幕范围内自由移动
6. **Given** 显示元素正在拖拽中, **When** 用户释放且显示元素仍在Item范围内, **Then** 显示元素用5帧动画回到原位
7. **Given** 显示元素正在拖拽中, **When** 用户释放且显示元素在Item范围外, **Then** 该Item数据从View中移除，触发OnItemExtracted回调，剩余Item用5帧动画重新排列

---

### Edge Cases

- 数据列表为空时，Gallery显示为空状态，不会崩溃
- 数据列表只有1个Item时，Gallery正常显示，旋转行为优雅处理（无需旋转或有限旋转）
- 快速连续拖拽时，Gallery能正确响应，不会出现卡顿或错位
- 数据更新（增/删/改）时，Gallery能正确刷新显示；若在动画中更新，保持动画状态并平滑过渡
- 图片资源加载失败或超时时，Item显示占位图，不影响其他Item的正常显示
- 拖拽抽取时，如果用户在Item边界线上释放，系统应按"在Item范围内"处理
- 同一时间只能有一个Item处于抽取拖拽状态
- Gallery旋转过程中开始新的拖拽，旋转应立即停止

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统必须支持传入数组/列表形式的数据源，数据量范围为0到无上限（典型使用0-100个）
- **FR-002**: 每个Item必须显示为Image+Text的组合形式，能够展示数据结构中的指定字段
- **FR-003**: Item必须采用对象池复用机制，仅创建可见区域所需的Item实例
- **FR-004**: 系统必须支持扇形布局，Item沿圆弧排列，使用左/右边界角度定义可见范围（典型90-180度）
- **FR-005**: 用户必须能够通过拖拽操作旋转Gallery
- **FR-006**: 新Item进入可见区域时，系统必须触发回调函数并传递该Item的数据
- **FR-007**: 系统必须支持惯性滑动效果，释放后继续按当前速度滑动
- **FR-008**: 系统必须支持摩擦力减速效果，滑动速度随时间降低
- **FR-009**: 系统必须支持边界回弹效果，超出数据范围时产生弹性回弹（仅有限边界模式）
- **FR-010**: 阻尼相关参数（惯性系数、摩擦力、回弹强度、回弹时长）必须可配置
- **FR-011**: 系统必须支持可配置的旋转边界模式：有限边界（带回弹）或无限循环（数据首尾相连）
- **FR-012**: 图片加载失败时，系统必须自动重试加载；超时后显示预设的占位图，保持布局一致
- **FR-013**: 系统必须支持配置起始方向（`startFromLeft`），控制数据从左侧或右侧开始排列，以适配数据量少的情况
- **FR-014**: 系统必须支持焦点角度配置（`focusAngle`），在此角度附近的Item显示在所有Item最上方（Z-Order最高）
- **FR-015**: 系统必须支持焦点阈值配置（`focusThreshold`），定义焦点范围；Item进入/离开焦点范围时触发相应回调
- **FR-016**: Item必须分为"显示元素"和"槽位元素"两个独立的Transform层级；显示元素包含Image+Text，槽位元素作为占位背景
- **FR-017**: 系统必须支持从Item中拖拽抽取"显示元素"的交互；抽取判定基于按下时间（<0.5秒）和拖拽方向（相对Item朝向±40°内）
- **FR-018**: 显示元素被抽取后，必须跟随触点/鼠标移动；完全离开Item范围后摆正方向（世界坐标rotation=0）
- **FR-019**: 释放拖拽时，系统必须根据显示元素位置判断：在Item范围内则用5帧动画回到原位；在Item范围外则立即销毁该显示元素GameObject，从原始数据源移除该数据项，并触发`OnItemExtracted`回调
- **FR-020**: Item被移除后，剩余Item必须用5帧动画平滑移动到新的正确位置

### Key Entities

- **GalleryItem**: 表示Gallery中的单个展示单元，包含"显示元素"（DisplayElement）和"槽位元素"（SlotElement）两个子Transform；显示元素包含Image和Text，槽位元素样式由调用方通过配置自定义Prefab指定；普通状态下显示元素覆盖槽位元素
- **GalleryData**: 传入Gallery的数据结构，包含图片资源引用和文字内容
- **GalleryConfig**: 配置参数，包含：
  - 布局参数：半径、左/右边界角度、Item角度跨度、圆心偏移
  - 起始方向：从左开始或从右开始
  - 焦点参数：焦点角度、焦点阈值
  - 阻尼参数：摩擦力、弹簧刚度/阻尼、停止速度阈值
  - 行为参数：循环模式、拖拽灵敏度、速度倍率
  - 槽位样式：槽位元素Prefab引用（可选，用于自定义抽取时显露的空位样式）
- **ItemCallback**: Item可见性变化时的回调委托（进入视野/离开视野/获得焦点/失去焦点/被抽取移除）
- **DragState**: 拖拽状态机，包含：None（无拖拽）、Detecting（检测中，判断是旋转还是抽取）、Rotating（旋转Gallery）、Extracting（抽取显示元素）、Returning（回弹动画中）

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Gallery在包含100个数据项时，旋转操作帧率保持在目标帧率（不低于设备标准帧率的90%）
- **SC-002**: Item复用机制生效后，Gallery实际创建的Item实例数量不超过可见区域所需数量的1.5倍
- **SC-003**: 用户拖拽释放后，惯性滑动到完全停止的过程自然流畅，无明显卡顿或跳帧
- **SC-004**: 新Item回调触发准确率100%，不遗漏任何新进入视野的Item
- **SC-005**: 空数据和边界情况下，组件不产生异常，用户可以正常操作
- **SC-006**: 拖拽抽取的方向判定准确，用户按预期方向拖拽时能正确触发抽取而非旋转
- **SC-007**: 显示元素回弹/Item移除动画在5帧内完成，帧时间按60FPS计算约83ms
- **SC-008**: `OnItemExtracted`回调正确传递被抽取Item的数据，调用方可以使用该数据

## Assumptions

- 数据结构由调用方定义，Gallery通过配置指定Image和Text对应的字段
- 默认阻尼参数将提供开箱即用的良好体验，无需调整即可满足大多数场景
- 扇形布局通过左/右边界角度定义可见范围，支持半圆（-90°~90°）或四分之一圆（-45°~0°）等多种配置
- 焦点角度（focusAngle）用于定义"中心位置"，配合起始方向（startFromLeft）可适配不同UI布局需求
- 目标平台为PC，鼠标拖拽为主要交互方式（触屏设备使用相同的拖拽逻辑）
