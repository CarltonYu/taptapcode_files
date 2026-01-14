-- ============================================
-- 生物处理交互配方表（高级境界）
-- 筑基境、金丹境、元婴境
-- ============================================
-- source: 源材料（拖拽的卡牌，通常是工具/武器）
-- target: 目标材料（被拖到的卡牌，通常是被操作的物品）
-- ============================================

return {

-- ============================================
-- 三、筑基境灵兽处理配方
-- ============================================

-- -------------------- 玄冰蟾 --------------------
{ source = { tag = "武器" }, target = { name = "活的玄冰蟾" }, result = "死的玄冰蟾", interactName = "击杀", keCost = 5, strengthCost = 24, consume = "target", sharpnessRequired = 22 },
{ source = { tag = "剥皮工具" }, target = { name = "死的玄冰蟾" }, result = "剥皮的玄冰蟾", extras = { "冰蟾皮" }, interactName = "剥皮", keCost = 8, strengthCost = 25, consume = "target", sharpnessRequired = 22 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的玄冰蟾" }, result = "冰蟾肉", extras = { "冰蟾骨", "冰蟾毒" }, interactName = "分解", keCost = 8, strengthCost = 25, consume = "target", sharpnessRequired = 22 },

-- -------------------- 雪貂 --------------------
{ source = { tag = "武器" }, target = { name = "活的雪貂" }, result = "死的雪貂", interactName = "击杀", keCost = 5, strengthCost = 23, consume = "target", sharpnessRequired = 21 },
{ source = { tag = "剥皮工具" }, target = { name = "死的雪貂" }, result = "剥皮的雪貂", extras = { "雪貂皮" }, interactName = "剥皮", keCost = 8, strengthCost = 24, consume = "target", sharpnessRequired = 21 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的雪貂" }, result = "雪貂肉", extras = { "雪貂骨" }, interactName = "分解", keCost = 8, strengthCost = 24, consume = "target", sharpnessRequired = 21 },

-- -------------------- 冰魄熊 --------------------
{ source = { tag = "武器" }, target = { name = "活的冰魄熊" }, result = "死的冰魄熊", interactName = "击杀", keCost = 6, strengthCost = 30, consume = "target", sharpnessRequired = 28 },
{ source = { tag = "剥皮工具" }, target = { name = "死的冰魄熊" }, result = "剥皮的冰魄熊", extras = { "冰熊皮" }, interactName = "剥皮", keCost = 10, strengthCost = 31, consume = "target", sharpnessRequired = 28 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的冰魄熊" }, result = "冰熊肉", extras = { "冰熊骨", "熊胆", "冰髓" }, interactName = "分解", keCost = 10, strengthCost = 31, consume = "target", sharpnessRequired = 28 },

-- -------------------- 云鹤 --------------------
{ source = { tag = "武器" }, target = { name = "活的云鹤" }, result = "死的云鹤", interactName = "击杀", keCost = 5, strengthCost = 25, consume = "target", sharpnessRequired = 23 },
{ source = { tag = "剥皮工具" }, target = { name = "死的云鹤" }, result = "剥皮的云鹤", extras = { "鹤羽" }, interactName = "剥皮", keCost = 8, strengthCost = 26, consume = "target", sharpnessRequired = 23 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的云鹤" }, result = "鹤肉", extras = { "鹤骨", "鹤顶红" }, interactName = "分解", keCost = 8, strengthCost = 26, consume = "target", sharpnessRequired = 23 },

-- -------------------- 紫电貂 --------------------
{ source = { tag = "武器" }, target = { name = "活的紫电貂" }, result = "死的紫电貂", interactName = "击杀", keCost = 6, strengthCost = 28, consume = "target", sharpnessRequired = 26 },
{ source = { tag = "剥皮工具" }, target = { name = "死的紫电貂" }, result = "剥皮的紫电貂", extras = { "紫貂皮" }, interactName = "剥皮", keCost = 9, strengthCost = 29, consume = "target", sharpnessRequired = 26 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的紫电貂" }, result = "紫貂肉", extras = { "紫貂骨", "雷髓" }, interactName = "分解", keCost = 9, strengthCost = 29, consume = "target", sharpnessRequired = 26 },

-- -------------------- 青鸾 --------------------
{ source = { tag = "武器" }, target = { name = "活的青鸾" }, result = "死的青鸾", interactName = "击杀", keCost = 7, strengthCost = 32, consume = "target", sharpnessRequired = 30 },
{ source = { tag = "剥皮工具" }, target = { name = "死的青鸾" }, result = "剥皮的青鸾", extras = { "青鸾羽" }, interactName = "剥皮", keCost = 10, strengthCost = 33, consume = "target", sharpnessRequired = 30 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的青鸾" }, result = "青鸾肉", extras = { "鸾骨" }, interactName = "分解", keCost = 10, strengthCost = 33, consume = "target", sharpnessRequired = 30 },

-- -------------------- 土行孙 --------------------
{ source = { tag = "武器" }, target = { name = "活的土行孙" }, result = "死的土行孙", interactName = "击杀", keCost = 6, strengthCost = 29, consume = "target", sharpnessRequired = 27 },
{ source = { tag = "剥皮工具" }, target = { name = "死的土行孙" }, result = "剥皮的土行孙", extras = { "穿山甲鳞" }, interactName = "剥皮", keCost = 9, strengthCost = 30, consume = "target", sharpnessRequired = 27 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的土行孙" }, result = "土灵肉", extras = { "土灵骨", "土灵核" }, interactName = "分解", keCost = 9, strengthCost = 30, consume = "target", sharpnessRequired = 27 },

-- -------------------- 岩甲犀 --------------------
{ source = { tag = "武器" }, target = { name = "活的岩甲犀" }, result = "死的岩甲犀", interactName = "击杀", keCost = 7, strengthCost = 34, consume = "target", sharpnessRequired = 32 },
{ source = { tag = "剥皮工具" }, target = { name = "死的岩甲犀" }, result = "剥皮的岩甲犀", extras = { "岩甲" }, interactName = "剥皮", keCost = 11, strengthCost = 35, consume = "target", sharpnessRequired = 32 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的岩甲犀" }, result = "犀肉", extras = { "犀骨", "岩犀角" }, interactName = "分解", keCost = 11, strengthCost = 35, consume = "target", sharpnessRequired = 32 },

-- -------------------- 地龙 --------------------
{ source = { tag = "武器" }, target = { name = "活的地龙" }, result = "死的地龙", interactName = "击杀", keCost = 8, strengthCost = 37, consume = "target", sharpnessRequired = 35 },
{ source = { tag = "剥皮工具" }, target = { name = "死的地龙" }, result = "剥皮的地龙", extras = { "地龙皮" }, interactName = "剥皮", keCost = 12, strengthCost = 38, consume = "target", sharpnessRequired = 35 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的地龙" }, result = "地龙肉", extras = { "地龙骨", "龙筋" }, interactName = "分解", keCost = 12, strengthCost = 38, consume = "target", sharpnessRequired = 35 },

-- ============================================
-- 四、金丹境妖兽处理配方（产出妖丹）
-- ============================================

-- -------------------- 冥海蛟 --------------------
{ source = { tag = "武器" }, target = { name = "活的冥海蛟" }, result = "死的冥海蛟", interactName = "击杀", keCost = 10, strengthCost = 42, consume = "target", sharpnessRequired = 40 },
{ source = { tag = "剥皮工具" }, target = { name = "死的冥海蛟" }, result = "剥皮的冥海蛟", extras = { "蛟皮" }, interactName = "剥皮", keCost = 14, strengthCost = 43, consume = "target", sharpnessRequired = 40 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的冥海蛟" }, result = "蛟肉", extras = { "蛟骨", "蛟筋", "蛟丹" }, interactName = "分解", keCost = 14, strengthCost = 43, consume = "target", sharpnessRequired = 40 },

-- -------------------- 幽冥鲸 --------------------
{ source = { tag = "武器" }, target = { name = "活的幽冥鲸" }, result = "死的幽冥鲸", interactName = "击杀", keCost = 10, strengthCost = 44, consume = "target", sharpnessRequired = 42 },
{ source = { tag = "剥皮工具" }, target = { name = "死的幽冥鲸" }, result = "剥皮的幽冥鲸", extras = { "鲸皮" }, interactName = "剥皮", keCost = 15, strengthCost = 45, consume = "target", sharpnessRequired = 42 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的幽冥鲸" }, result = "鲸肉", extras = { "鲸骨", "鲸油", "鲸须", "鲸丹" }, interactName = "分解", keCost = 15, strengthCost = 45, consume = "target", sharpnessRequired = 42 },

-- -------------------- 玄龟 --------------------
{ source = { tag = "武器" }, target = { name = "活的玄龟" }, result = "死的玄龟", interactName = "击杀", keCost = 12, strengthCost = 52, consume = "target", sharpnessRequired = 50 },
{ source = { tag = "剥皮工具" }, target = { name = "死的玄龟" }, result = "剥皮的玄龟", extras = { "玄龟甲" }, interactName = "剥皮", keCost = 18, strengthCost = 53, consume = "target", sharpnessRequired = 50 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的玄龟" }, result = "玄龟肉", extras = { "龟骨", "龟丹" }, interactName = "分解", keCost = 18, strengthCost = 53, consume = "target", sharpnessRequired = 50 },

-- -------------------- 三足金乌 --------------------
{ source = { tag = "武器" }, target = { name = "活的三足金乌" }, result = "死的三足金乌", interactName = "击杀", keCost = 11, strengthCost = 47, consume = "target", sharpnessRequired = 45 },
{ source = { tag = "剥皮工具" }, target = { name = "死的三足金乌" }, result = "剥皮的三足金乌", extras = { "金乌羽" }, interactName = "剥皮", keCost = 16, strengthCost = 48, consume = "target", sharpnessRequired = 45 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的三足金乌" }, result = "金乌肉", extras = { "金乌骨", "金乌丹" }, interactName = "分解", keCost = 16, strengthCost = 48, consume = "target", sharpnessRequired = 45 },

-- -------------------- 火麒麟幼崽 --------------------
{ source = { tag = "武器" }, target = { name = "活的火麒麟幼崽" }, result = "死的火麒麟幼崽", interactName = "击杀", keCost = 12, strengthCost = 50, consume = "target", sharpnessRequired = 48 },
{ source = { tag = "剥皮工具" }, target = { name = "死的火麒麟幼崽" }, result = "剥皮的火麒麟幼崽", extras = { "麒麟鳞" }, interactName = "剥皮", keCost = 17, strengthCost = 51, consume = "target", sharpnessRequired = 48 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的火麒麟幼崽" }, result = "麒麟肉", extras = { "麒麟骨", "麒麟丹" }, interactName = "分解", keCost = 17, strengthCost = 51, consume = "target", sharpnessRequired = 48 },

-- -------------------- 焚天火凤 --------------------
{ source = { tag = "武器" }, target = { name = "活的焚天火凤" }, result = "死的焚天火凤", interactName = "击杀", keCost = 13, strengthCost = 54, consume = "target", sharpnessRequired = 52 },
{ source = { tag = "剥皮工具" }, target = { name = "死的焚天火凤" }, result = "剥皮的焚天火凤", extras = { "凤羽" }, interactName = "剥皮", keCost = 18, strengthCost = 55, consume = "target", sharpnessRequired = 52 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的焚天火凤" }, result = "凤肉", extras = { "凤骨", "凤凰涅槃石", "凤丹" }, interactName = "分解", keCost = 18, strengthCost = 55, consume = "target", sharpnessRequired = 52 },

-- -------------------- 剑齿虎 --------------------
{ source = { tag = "武器" }, target = { name = "活的剑齿虎" }, result = "死的剑齿虎", interactName = "击杀", keCost = 11, strengthCost = 46, consume = "target", sharpnessRequired = 44 },
{ source = { tag = "剥皮工具" }, target = { name = "死的剑齿虎" }, result = "剥皮的剑齿虎", extras = { "剑虎皮" }, interactName = "剥皮", keCost = 15, strengthCost = 47, consume = "target", sharpnessRequired = 44 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的剑齿虎" }, result = "剑虎肉", extras = { "剑虎骨", "剑齿", "虎魄", "剑虎丹" }, interactName = "分解", keCost = 15, strengthCost = 47, consume = "target", sharpnessRequired = 44 },

-- -------------------- 金翅大鹏 --------------------
{ source = { tag = "武器" }, target = { name = "活的金翅大鹏" }, result = "死的金翅大鹏", interactName = "击杀", keCost = 11, strengthCost = 48, consume = "target", sharpnessRequired = 46 },
{ source = { tag = "剥皮工具" }, target = { name = "死的金翅大鹏" }, result = "剥皮的金翅大鹏", extras = { "大鹏翎" }, interactName = "剥皮", keCost = 16, strengthCost = 49, consume = "target", sharpnessRequired = 46 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的金翅大鹏" }, result = "大鹏肉", extras = { "大鹏骨", "鹏丹" }, interactName = "分解", keCost = 16, strengthCost = 49, consume = "target", sharpnessRequired = 46 },

-- ============================================
-- 五、元婴境妖兽处理配方（产出妖丹）
-- ============================================

-- -------------------- 墨龙 --------------------
{ source = { tag = "武器" }, target = { name = "活的墨龙" }, result = "死的墨龙", interactName = "击杀", keCost = 16, strengthCost = 67, consume = "target", sharpnessRequired = 65 },
{ source = { tag = "剥皮工具" }, target = { name = "死的墨龙" }, result = "剥皮的墨龙", extras = { "墨龙鳞" }, interactName = "剥皮", keCost = 22, strengthCost = 68, consume = "target", sharpnessRequired = 65 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的墨龙" }, result = "墨龙肉", extras = { "墨龙骨", "墨龙筋", "墨龙丹" }, interactName = "分解", keCost = 22, strengthCost = 68, consume = "target", sharpnessRequired = 65 },

-- -------------------- 九尾天狐 --------------------
{ source = { tag = "武器" }, target = { name = "活的九尾天狐" }, result = "死的九尾天狐", interactName = "击杀", keCost = 15, strengthCost = 62, consume = "target", sharpnessRequired = 60 },
{ source = { tag = "剥皮工具" }, target = { name = "死的九尾天狐" }, result = "剥皮的九尾天狐", extras = { "天狐皮" }, interactName = "剥皮", keCost = 20, strengthCost = 63, consume = "target", sharpnessRequired = 60 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的九尾天狐" }, result = "天狐肉", extras = { "天狐骨", "狐尾", "天狐丹" }, interactName = "分解", keCost = 20, strengthCost = 63, consume = "target", sharpnessRequired = 60 },

-- -------------------- 应龙 --------------------
{ source = { tag = "武器" }, target = { name = "活的应龙" }, result = "死的应龙", interactName = "击杀", keCost = 18, strengthCost = 72, consume = "target", sharpnessRequired = 70 },
{ source = { tag = "剥皮工具" }, target = { name = "死的应龙" }, result = "剥皮的应龙", extras = { "应龙鳞" }, interactName = "剥皮", keCost = 24, strengthCost = 73, consume = "target", sharpnessRequired = 70 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的应龙" }, result = "应龙肉", extras = { "应龙骨", "龙筋", "应龙丹" }, interactName = "分解", keCost = 24, strengthCost = 73, consume = "target", sharpnessRequired = 70 },

-- -------------------- 玄武 --------------------
{ source = { tag = "武器" }, target = { name = "活的玄武" }, result = "死的玄武", interactName = "击杀", keCost = 17, strengthCost = 70, consume = "target", sharpnessRequired = 68 },
{ source = { tag = "剥皮工具" }, target = { name = "死的玄武" }, result = "剥皮的玄武", extras = { "玄武甲" }, interactName = "剥皮", keCost = 23, strengthCost = 71, consume = "target", sharpnessRequired = 68 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的玄武" }, result = "玄武肉", extras = { "玄武骨", "玄武丹" }, interactName = "分解", keCost = 23, strengthCost = 71, consume = "target", sharpnessRequired = 68 },

-- -------------------- 朱雀 --------------------
{ source = { tag = "武器" }, target = { name = "活的朱雀" }, result = "死的朱雀", interactName = "击杀", keCost = 17, strengthCost = 68, consume = "target", sharpnessRequired = 66 },
{ source = { tag = "剥皮工具" }, target = { name = "死的朱雀" }, result = "剥皮的朱雀", extras = { "朱雀羽" }, interactName = "剥皮", keCost = 22, strengthCost = 69, consume = "target", sharpnessRequired = 66 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的朱雀" }, result = "朱雀肉", extras = { "朱雀骨", "朱雀心", "朱雀丹" }, interactName = "分解", keCost = 22, strengthCost = 69, consume = "target", sharpnessRequired = 66 },

-- -------------------- 白泽 --------------------
{ source = { tag = "武器" }, target = { name = "活的白泽" }, result = "死的白泽", interactName = "击杀", keCost = 16, strengthCost = 66, consume = "target", sharpnessRequired = 64 },
{ source = { tag = "剥皮工具" }, target = { name = "死的白泽" }, result = "剥皮的白泽", extras = { "白泽皮" }, interactName = "剥皮", keCost = 21, strengthCost = 67, consume = "target", sharpnessRequired = 64 },
{ source = { tag = "剥皮工具" }, target = { name = "剥皮的白泽" }, result = "白泽肉", extras = { "白泽骨", "白泽角", "白泽丹" }, interactName = "分解", keCost = 21, strengthCost = 67, consume = "target", sharpnessRequired = 64 },

-- ============================================
-- 六、筑基境材料加工配方（一对一）
-- ============================================

-- -------------------- 研磨类 --------------------
{ source = { tag = "研磨工具" }, target = { name = "筑基药草" }, result = "筑基灵药粉", interactName = "研磨", keCost = 6, strengthCost = 8, consume = "target", sharpnessRequired = 24 },
{ source = { tag = "研磨工具" }, target = { name = "灵兽骨" }, result = "灵骨粉", interactName = "研磨", keCost = 8, strengthCost = 10, consume = "target", sharpnessRequired = 22 },
{ source = { tag = "研磨工具" }, target = { name = "玄冰石" }, result = "玄冰粉", interactName = "研磨", keCost = 7, strengthCost = 9, consume = "target", sharpnessRequired = 21 },
{ source = { tag = "研磨工具" }, target = { name = "水灵晶" }, result = "水灵粉", interactName = "研磨", keCost = 8, strengthCost = 10, consume = "target", sharpnessRequired = 23 },
{ source = { tag = "研磨工具" }, target = { name = "玄黄石" }, result = "玄黄粉", interactName = "研磨", keCost = 8, strengthCost = 10, consume = "target", sharpnessRequired = 26 },
{ source = { tag = "研磨工具" }, target = { name = "土灵晶" }, result = "土灵粉", interactName = "研磨", keCost = 9, strengthCost = 11, consume = "target", sharpnessRequired = 27 },
{ source = { tag = "研磨工具" }, target = { name = "息壤" }, result = "息壤粉", interactName = "研磨", keCost = 10, strengthCost = 12, consume = "target", sharpnessRequired = 30 },

-- -------------------- 晶石加工类 --------------------
{ source = { tag = "加工工具" }, target = { name = "玄冰石" }, result = "玄冰片", interactName = "切割", keCost = 7, strengthCost = 9, consume = "target", sharpnessRequired = 21 },
{ source = { tag = "加工工具" }, target = { name = "云母矿" }, result = "云母片", interactName = "切割", keCost = 8, strengthCost = 10, consume = "target", sharpnessRequired = 24 },

-- -------------------- 伐木类 --------------------
{ source = { tag = "伐木工具" }, target = { name = "玄冰树" }, result = "玄冰木", extras = { "冰晶叶", "冰晶叶" }, interactName = "砍伐", keCost = 10, strengthCost = 14, consume = "target", sharpnessRequired = 22 },
{ source = { tag = "伐木工具" }, target = { name = "雷击木" }, result = "雷木板", extras = { "雷木枝", "雷木枝" }, interactName = "砍伐", keCost = 12, strengthCost = 16, consume = "target", sharpnessRequired = 25 },
{ source = { tag = "伐木工具" }, target = { name = "玄黄古树" }, result = "玄黄木", extras = { "玄黄叶" }, interactName = "砍伐", keCost = 14, strengthCost = 18, consume = "target", sharpnessRequired = 28 },

-- -------------------- 采矿类 --------------------
{ source = { tag = "采集工具" }, target = { name = "玄冰岩" }, result = "玄冰石", extras = { "玄冰碎片" }, interactName = "采掘", keCost = 10, strengthCost = 13, consume = "target", sharpnessRequired = 21 },
{ source = { tag = "采集工具" }, target = { name = "寒铁矿脉" }, result = "寒铁矿", extras = { "寒铁矿" }, interactName = "采矿", keCost = 11, strengthCost = 14, consume = "target", sharpnessRequired = 22 },
{ source = { tag = "采集工具" }, target = { name = "水灵晶矿" }, result = "水灵晶", interactName = "采矿", keCost = 12, strengthCost = 15, consume = "target", sharpnessRequired = 23 },
{ source = { tag = "采集工具" }, target = { name = "紫金矿脉" }, result = "紫金矿", extras = { "紫金矿" }, interactName = "采矿", keCost = 14, strengthCost = 18, consume = "target", sharpnessRequired = 28 },
{ source = { tag = "采集工具" }, target = { name = "云母矿" }, result = "云母矿", extras = { "云母片" }, interactName = "采矿", keCost = 12, strengthCost = 15, consume = "target", sharpnessRequired = 24 },
{ source = { tag = "采集工具" }, target = { name = "玄黄石矿" }, result = "玄黄石", extras = { "玄黄石" }, interactName = "采矿", keCost = 13, strengthCost = 17, consume = "target", sharpnessRequired = 26 },
{ source = { tag = "采集工具" }, target = { name = "土灵晶矿" }, result = "土灵晶", interactName = "采矿", keCost = 14, strengthCost = 18, consume = "target", sharpnessRequired = 27 },
{ source = { tag = "采集工具" }, target = { name = "息壤矿点" }, result = "息壤", interactName = "采矿", keCost = 16, strengthCost = 20, consume = "target", sharpnessRequired = 30 },
{ source = { tag = "采集工具" }, target = { name = "玄铁矿脉" }, result = "玄铁矿", extras = { "玄铁矿" }, interactName = "采矿", keCost = 18, strengthCost = 22, consume = "target", sharpnessRequired = 32 },

-- ============================================
-- 七、金丹境材料加工配方（一对一）
-- ============================================

-- -------------------- 研磨类 --------------------
{ source = { tag = "研磨工具" }, target = { name = "金丹药草" }, result = "金丹灵药粉", interactName = "研磨", keCost = 10, strengthCost = 14, consume = "target", sharpnessRequired = 40 },
{ source = { tag = "研磨工具" }, target = { name = "妖兽骨·金丹级" }, result = "金丹妖骨粉", interactName = "研磨", keCost = 12, strengthCost = 16, consume = "target", sharpnessRequired = 38 },
{ source = { tag = "研磨工具" }, target = { name = "冥石" }, result = "冥石粉", interactName = "研磨", keCost = 10, strengthCost = 14, consume = "target", sharpnessRequired = 36 },
{ source = { tag = "研磨工具" }, target = { name = "深海灵晶" }, result = "深海晶粉", interactName = "研磨", keCost = 12, strengthCost = 16, consume = "target", sharpnessRequired = 40 },
{ source = { tag = "研磨工具" }, target = { name = "火精石" }, result = "火精粉", interactName = "研磨", keCost = 13, strengthCost = 17, consume = "target", sharpnessRequired = 42 },
{ source = { tag = "研磨工具" }, target = { name = "太阳石" }, result = "太阳石粉", interactName = "研磨", keCost = 15, strengthCost = 19, consume = "target", sharpnessRequired = 48 },
{ source = { tag = "研磨工具" }, target = { name = "低阶妖丹" }, result = "妖丹粉", interactName = "研磨", keCost = 12, strengthCost = 16, consume = "target", sharpnessRequired = 35 },

-- -------------------- 采矿类 --------------------
{ source = { tag = "采集工具" }, target = { name = "冥石矿" }, result = "冥石", extras = { "冥石" }, interactName = "采矿", keCost = 14, strengthCost = 18, consume = "target", sharpnessRequired = 36 },
{ source = { tag = "采集工具" }, target = { name = "深海灵铁矿" }, result = "深海灵铁", extras = { "深海灵铁" }, interactName = "采矿", keCost = 16, strengthCost = 20, consume = "target", sharpnessRequired = 38 },
{ source = { tag = "采集工具" }, target = { name = "深海灵晶矿" }, result = "深海灵晶", interactName = "采矿", keCost = 18, strengthCost = 22, consume = "target", sharpnessRequired = 40 },
{ source = { tag = "采集工具" }, target = { name = "火精矿脉" }, result = "火精石", extras = { "火精石" }, interactName = "采矿", keCost = 18, strengthCost = 22, consume = "target", sharpnessRequired = 42 },
{ source = { tag = "采集工具" }, target = { name = "赤金矿脉" }, result = "赤金矿", extras = { "赤金矿" }, interactName = "采矿", keCost = 20, strengthCost = 24, consume = "target", sharpnessRequired = 45 },
{ source = { tag = "采集工具" }, target = { name = "太阳石矿" }, result = "太阳石", interactName = "采矿", keCost = 22, strengthCost = 26, consume = "target", sharpnessRequired = 48 },
{ source = { tag = "采集工具" }, target = { name = "万年玄铁矿" }, result = "万年玄铁", extras = { "万年玄铁" }, interactName = "采矿", keCost = 24, strengthCost = 28, consume = "target", sharpnessRequired = 50 },
{ source = { tag = "采集工具" }, target = { name = "秘银矿脉" }, result = "秘银矿", extras = { "秘银矿" }, interactName = "采矿", keCost = 26, strengthCost = 30, consume = "target", sharpnessRequired = 52 },
{ source = { tag = "采集工具" }, target = { name = "陨铁矿" }, result = "陨铁", interactName = "采矿", keCost = 30, strengthCost = 35, consume = "target", sharpnessRequired = 55 },

}
