{
    -- 源材料（拖拽的卡牌）
    source = { name = "物品名" },     -- 按名称匹配
    -- 或
    source = { tag = "标签名" },      -- 按标签匹配
    
    -- 目标材料（被拖到的卡牌）
    target = { name = "物品名" },
    -- 或
    target = { tag = "标签名" },
    
    -- 产出物品名称
    result = "产出物品名",
    
    -- 交互显示名称
    interactName = "打磨",
    
    -- 时间消耗（刻）
    keCost = 4,
    
    -- 体力消耗
    strengthCost = 6,
    
    -- 消耗规则: "source" | "target" | "both" | "none"
    consume = "source",
    
    -- 可选：产出数量（默认1）
    resultCount = 1,
    
    -- 可选：描述
    description = "配方说明",
}