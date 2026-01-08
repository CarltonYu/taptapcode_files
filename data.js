// 游戏数据配置

// 境界配置
const REALMS = [
    // 练气期 (1%-15% 失败率) - 大境界: lianqi
    { id: 0, name: '练气一层', expRequired: 100, basePower: 10, failRate: 0.01, majorRealm: 'lianqi' },
    { id: 1, name: '练气二层', expRequired: 300, basePower: 25, failRate: 0.02, majorRealm: 'lianqi' },
    { id: 2, name: '练气三层', expRequired: 600, basePower: 50, failRate: 0.03, majorRealm: 'lianqi' },
    { id: 3, name: '练气四层', expRequired: 1000, basePower: 80, failRate: 0.05, majorRealm: 'lianqi' },
    { id: 4, name: '练气五层', expRequired: 1500, basePower: 120, failRate: 0.07, majorRealm: 'lianqi' },
    { id: 5, name: '练气六层', expRequired: 2200, basePower: 170, failRate: 0.09, majorRealm: 'lianqi' },
    { id: 6, name: '练气七层', expRequired: 3000, basePower: 230, failRate: 0.11, majorRealm: 'lianqi' },
    { id: 7, name: '练气八层', expRequired: 4000, basePower: 300, failRate: 0.13, majorRealm: 'lianqi' },
    { id: 8, name: '练气九层', expRequired: 5500, basePower: 400, failRate: 0.15, majorRealm: 'lianqi' },
    // 筑基期 (20%-35% 失败率) - 大境界: zhuji
    { id: 9, name: '筑基初期', expRequired: 8000, basePower: 600, failRate: 0.20, majorRealm: 'zhuji' },
    { id: 10, name: '筑基中期', expRequired: 12000, basePower: 900, failRate: 0.25, majorRealm: 'zhuji' },
    { id: 11, name: '筑基后期', expRequired: 18000, basePower: 1300, failRate: 0.30, majorRealm: 'zhuji' },
    { id: 12, name: '筑基圆满', expRequired: 25000, basePower: 1800, failRate: 0.35, majorRealm: 'zhuji' },
    // 金丹期 (35%-50% 失败率) - 大境界: jindan
    { id: 13, name: '金丹初期', expRequired: 40000, basePower: 3000, failRate: 0.35, majorRealm: 'jindan' },
    { id: 14, name: '金丹中期', expRequired: 60000, basePower: 5000, failRate: 0.40, majorRealm: 'jindan' },
    { id: 15, name: '金丹后期', expRequired: 90000, basePower: 8000, failRate: 0.45, majorRealm: 'jindan' },
    { id: 16, name: '金丹圆满', expRequired: 130000, basePower: 12000, failRate: 0.50, majorRealm: 'jindan' },
    // 元婴期 (50%-60% 失败率) - 大境界: yuanying
    { id: 17, name: '元婴初期', expRequired: 200000, basePower: 20000, failRate: 0.50, majorRealm: 'yuanying' },
    { id: 18, name: '元婴中期', expRequired: 300000, basePower: 35000, failRate: 0.53, majorRealm: 'yuanying' },
    { id: 19, name: '元婴后期', expRequired: 450000, basePower: 55000, failRate: 0.56, majorRealm: 'yuanying' },
    { id: 20, name: '元婴圆满', expRequired: 650000, basePower: 80000, failRate: 0.60, majorRealm: 'yuanying' },
    // 化神期 (55%-70% 失败率) - 大境界: huashen
    { id: 21, name: '化神初期', expRequired: 1000000, basePower: 150000, failRate: 0.55, majorRealm: 'huashen' },
    { id: 22, name: '化神中期', expRequired: 1500000, basePower: 250000, failRate: 0.60, majorRealm: 'huashen' },
    { id: 23, name: '化神后期', expRequired: 2200000, basePower: 400000, failRate: 0.65, majorRealm: 'huashen' },
    { id: 24, name: '化神圆满', expRequired: 3200000, basePower: 600000, failRate: 0.70, majorRealm: 'huashen' },
    // 渡劫期 & 大乘期
    { id: 25, name: '渡劫期', expRequired: 5000000, basePower: 1000000, failRate: 0.70, majorRealm: 'dujie' },
    { id: 26, name: '大乘期', expRequired: null, basePower: 2000000, failRate: 0, majorRealm: 'dacheng' }
];

// 材料配置
const MATERIALS = {
    // ===== 草药类 =====
    lingcao: { id: 'lingcao', name: '灵草', icon: '🌿', desc: '最基础的炼丹材料', quality: 'common' },
    qingxincao: { id: 'qingxincao', name: '清心草', icon: '🌱', desc: '清心宁神的草药', quality: 'common' },
    huanglingcao: { id: 'huanglingcao', name: '黄灵草', icon: '🌾', desc: '蕴含土灵之力', quality: 'common' },
    huolingcao: { id: 'huolingcao', name: '火灵草', icon: '🌶️', desc: '蕴含火焰之力', quality: 'uncommon' },
    binglingcao: { id: 'binglingcao', name: '冰灵草', icon: '❄️', desc: '蕴含寒冰之力', quality: 'uncommon' },
    mulincao: { id: 'mulincao', name: '木灵草', icon: '🍀', desc: '蕴含木灵之力', quality: 'uncommon' },
    jinlingcao: { id: 'jinlingcao', name: '金灵草', icon: '✨', desc: '蕴含金灵之力', quality: 'uncommon' },
    shuiyuncao: { id: 'shuiyuncao', name: '水云草', icon: '💧', desc: '水属性灵草', quality: 'uncommon' },
    zicao: { id: 'zicao', name: '紫芝', icon: '🍄', desc: '珍贵的灵药', quality: 'rare' },
    xuelihua: { id: 'xuelihua', name: '雪梨花', icon: '🌸', desc: '千年寒冰中生长', quality: 'rare' },
    chiyanhua: { id: 'chiyanhua', name: '赤焰花', icon: '🌺', desc: '火山深处的灵花', quality: 'rare' },
    tianleimu: { id: 'tianleimu', name: '天雷木', icon: '🪵', desc: '被雷击过的神木', quality: 'rare' },
    jiuyelian: { id: 'jiuyelian', name: '九叶莲', icon: '🪷', desc: '极其罕见的仙草', quality: 'epic' },
    wannianginseng: { id: 'wannianginseng', name: '万年人参', icon: '🥕', desc: '万年灵气凝聚', quality: 'epic' },
    taisuishen: { id: 'taisuishen', name: '太岁神芝', icon: '🧬', desc: '不死灵药', quality: 'epic' },
    huntianlingzhi: { id: 'huntianlingzhi', name: '混天灵芝', icon: '🍄', desc: '混沌之气孕育', quality: 'legendary' },
    xianlinguo: { id: 'xianlinguo', name: '仙灵果', icon: '🍑', desc: '仙界圣果', quality: 'legendary' },

    // ===== 矿石类 =====
    lingshi: { id: 'lingshi', name: '灵石', icon: '💎', desc: '蕴含灵气的石头', quality: 'common' },
    tieshi: { id: 'tieshi', name: '玄铁', icon: '⚒️', desc: '炼器金属', quality: 'common' },
    tongkuang: { id: 'tongkuang', name: '灵铜矿', icon: '🪨', desc: '基础炼器材料', quality: 'common' },
    baiyinshi: { id: 'baiyinshi', name: '白银精', icon: '⚪', desc: '精炼的白银', quality: 'uncommon' },
    heijinshi: { id: 'heijinshi', name: '黑金石', icon: '⚫', desc: '坚硬的黑金', quality: 'uncommon' },
    yueshi: { id: 'yueshi', name: '月光石', icon: '🌙', desc: '吸收月华之力', quality: 'uncommon' },
    yanshi: { id: 'yanshi', name: '炎晶石', icon: '🔴', desc: '蕴含火焰的晶石', quality: 'uncommon' },
    jinjing: { id: 'jinjing', name: '金精', icon: '🌟', desc: '炼制高级法器', quality: 'rare' },
    hanjingshi: { id: 'hanjingshi', name: '寒晶石', icon: '🧊', desc: '极寒之地的晶石', quality: 'rare' },
    zimugang: { id: 'zimugang', name: '紫母钢', icon: '💜', desc: '紫金山的神钢', quality: 'rare' },
    tianyunjing: { id: 'tianyunjing', name: '天陨精', icon: '☄️', desc: '天外陨石精华', quality: 'rare' },
    leijing: { id: 'leijing', name: '雷晶', icon: '⚡', desc: '蕴含雷霆之力', quality: 'epic' },
    xiantianjing: { id: 'xiantianjing', name: '先天精金', icon: '💛', desc: '先天之气凝结', quality: 'epic' },
    hundunjing: { id: 'hundunjing', name: '混沌晶', icon: '🔮', desc: '混沌之力结晶', quality: 'epic' },
    hongmengjing: { id: 'hongmengjing', name: '鸿蒙晶', icon: '✴️', desc: '开天辟地之精华', quality: 'legendary' },

    // ===== 兽材类 =====
    shoupi: { id: 'shoupi', name: '兽皮', icon: '🦊', desc: '妖兽的皮毛', quality: 'common' },
    shouya: { id: 'shouya', name: '兽牙', icon: '🦷', desc: '妖兽的牙齿', quality: 'common' },
    shougu: { id: 'shougu', name: '兽骨', icon: '🦴', desc: '妖兽的骨骼', quality: 'common' },
    shouhe: { id: 'shouhe', name: '兽核', icon: '🔵', desc: '妖兽的核心', quality: 'uncommon' },
    shejing: { id: 'shejing', name: '蛇精血', icon: '🩸', desc: '毒蛇的精血', quality: 'uncommon' },
    langjin: { id: 'langjin', name: '狼筋', icon: '🐺', desc: '妖狼的筋脉', quality: 'uncommon' },
    hubao: { id: 'hubao', name: '虎豹筋', icon: '🐅', desc: '妖虎的筋骨', quality: 'uncommon' },
    yaodan: { id: 'yaodan', name: '妖丹', icon: '🟣', desc: '高级妖兽内丹', quality: 'rare' },
    yaoshouling: { id: 'yaoshouling', name: '妖兽灵血', icon: '💉', desc: '高阶妖兽精血', quality: 'rare' },
    jiaopi: { id: 'jiaopi', name: '蛟皮', icon: '🐊', desc: '蛟龙的皮甲', quality: 'rare' },
    fengyu: { id: 'fengyu', name: '凤羽', icon: '🪶', desc: '凤凰的羽毛', quality: 'rare' },
    longlin: { id: 'longlin', name: '龙鳞', icon: '🐉', desc: '真龙的鳞片', quality: 'epic' },
    longxue: { id: 'longxue', name: '龙血', icon: '❤️', desc: '真龙的精血', quality: 'epic' },
    fenghuangyu: { id: 'fenghuangyu', name: '凤凰羽', icon: '🔥', desc: '涅槃凤凰之羽', quality: 'epic' },
    qilinjia: { id: 'qilinjia', name: '麒麟甲', icon: '🦄', desc: '麒麟的鳞甲', quality: 'epic' },
    shenshoudan: { id: 'shenshoudan', name: '神兽丹', icon: '⭐', desc: '神兽的内丹', quality: 'legendary' },
    longjing: { id: 'longjing', name: '龙晶', icon: '💠', desc: '龙族至宝', quality: 'legendary' }
};

// 探索地区配置 - 每种材料都有专刷地图
const AREAS = [
    // ========== 练气期 (0-8) ==========
    // 草药专刷
    { id: 'lingcaoyuan', name: '灵草园', icon: '🌿', requiredRealm: 0, duration: 20,
      drops: [{ itemId: 'lingcao', chance: 0.9, min: 2, max: 4 }] },
    { id: 'qingxinlin', name: '清心林', icon: '🌱', requiredRealm: 1, duration: 25,
      drops: [{ itemId: 'qingxincao', chance: 0.9, min: 2, max: 4 }] },
    { id: 'huangtudi', name: '黄土地', icon: '🌾', requiredRealm: 2, duration: 25,
      drops: [{ itemId: 'huanglingcao', chance: 0.9, min: 2, max: 4 }] },
    
    // 矿石专刷
    { id: 'lingshikuang', name: '灵石矿', icon: '💎', requiredRealm: 0, duration: 20,
      drops: [{ itemId: 'lingshi', chance: 0.9, min: 2, max: 4 }] },
    { id: 'xuantiekuang', name: '玄铁矿', icon: '⚒️', requiredRealm: 2, duration: 25,
      drops: [{ itemId: 'tieshi', chance: 0.9, min: 2, max: 4 }] },
    { id: 'tongkuangdong', name: '铜矿洞', icon: '🪨', requiredRealm: 3, duration: 30,
      drops: [{ itemId: 'tongkuang', chance: 0.9, min: 2, max: 4 }] },
    
    // 兽材专刷
    { id: 'xiaoshoulin', name: '小兽林', icon: '🦊', requiredRealm: 1, duration: 25,
      drops: [{ itemId: 'shoupi', chance: 0.8, min: 2, max: 3 }, { itemId: 'shouya', chance: 0.6, min: 1, max: 2 }] },
    { id: 'gukudong', name: '骨窟洞', icon: '🦴', requiredRealm: 3, duration: 30,
      drops: [{ itemId: 'shougu', chance: 0.9, min: 2, max: 4 }] },
    
    // 综合地图
    { id: 'xinshoucun', name: '新手村', icon: '🏘️', requiredRealm: 0, duration: 30,
      drops: [
        { itemId: 'lingcao', chance: 0.5, min: 1, max: 2 },
        { itemId: 'lingshi', chance: 0.5, min: 1, max: 2 },
        { itemId: 'shoupi', chance: 0.3, min: 1, max: 1 }
      ] },
    { id: 'qingyunshan', name: '青云山', icon: '⛰️', requiredRealm: 4, duration: 40,
      drops: [
        { itemId: 'lingcao', chance: 0.4, min: 2, max: 3 },
        { itemId: 'tieshi', chance: 0.4, min: 1, max: 2 },
        { itemId: 'shouhe', chance: 0.2, min: 1, max: 1 }
      ] },

    // ========== 练气后期 (5-8) ==========
    // 五行草药
    { id: 'huoyangu', name: '火焰谷', icon: '🔥', requiredRealm: 5, duration: 40,
      drops: [{ itemId: 'huolingcao', chance: 0.85, min: 2, max: 4 }] },
    { id: 'bingfengya', name: '冰封崖', icon: '❄️', requiredRealm: 5, duration: 40,
      drops: [{ itemId: 'binglingcao', chance: 0.85, min: 2, max: 4 }] },
    { id: 'mulinsen', name: '木灵森', icon: '🍀', requiredRealm: 6, duration: 45,
      drops: [{ itemId: 'mulincao', chance: 0.85, min: 2, max: 4 }] },
    { id: 'jinguangdong', name: '金光洞', icon: '✨', requiredRealm: 6, duration: 45,
      drops: [{ itemId: 'jinlingcao', chance: 0.85, min: 2, max: 4 }] },
    { id: 'shuiyunze', name: '水云泽', icon: '💧', requiredRealm: 7, duration: 50,
      drops: [{ itemId: 'shuiyuncao', chance: 0.85, min: 2, max: 4 }] },
    
    // 矿石
    { id: 'baiyinkuang', name: '白银矿脉', icon: '⚪', requiredRealm: 6, duration: 45,
      drops: [{ itemId: 'baiyinshi', chance: 0.85, min: 2, max: 4 }] },
    { id: 'heijinkuang', name: '黑金矿脉', icon: '⚫', requiredRealm: 7, duration: 50,
      drops: [{ itemId: 'heijinshi', chance: 0.85, min: 2, max: 4 }] },
    { id: 'yueguangtan', name: '月光潭', icon: '🌙', requiredRealm: 7, duration: 50,
      drops: [{ itemId: 'yueshi', chance: 0.85, min: 2, max: 4 }] },
    { id: 'yanjingku', name: '炎晶窟', icon: '🔴', requiredRealm: 8, duration: 55,
      drops: [{ itemId: 'yanshi', chance: 0.85, min: 2, max: 4 }] },
    
    // 兽材
    { id: 'shouhelinyu', name: '兽核林域', icon: '🔵', requiredRealm: 5, duration: 40,
      drops: [{ itemId: 'shouhe', chance: 0.8, min: 1, max: 3 }] },
    { id: 'dushechi', name: '毒蛇池', icon: '🐍', requiredRealm: 6, duration: 45,
      drops: [{ itemId: 'shejing', chance: 0.85, min: 2, max: 3 }] },
    { id: 'canglanggu', name: '苍狼谷', icon: '🐺', requiredRealm: 7, duration: 50,
      drops: [{ itemId: 'langjin', chance: 0.85, min: 2, max: 3 }] },
    { id: 'hubaoshan', name: '虎豹山', icon: '🐅', requiredRealm: 8, duration: 55,
      drops: [{ itemId: 'hubao', chance: 0.85, min: 2, max: 3 }] },

    // ========== 筑基期 (9-12) ==========
    // 高级草药
    { id: 'zicaoling', name: '紫芝岭', icon: '🍄', requiredRealm: 9, duration: 70,
      drops: [{ itemId: 'zicao', chance: 0.75, min: 1, max: 3 }] },
    { id: 'xuelihuayuan', name: '雪梨花园', icon: '🌸', requiredRealm: 10, duration: 80,
      drops: [{ itemId: 'xuelihua', chance: 0.7, min: 1, max: 2 }] },
    { id: 'chiyanhuoshan', name: '赤焰火山', icon: '🌋', requiredRealm: 10, duration: 80,
      drops: [{ itemId: 'chiyanhua', chance: 0.7, min: 1, max: 2 }] },
    { id: 'tianleilin', name: '天雷林', icon: '🌲', requiredRealm: 11, duration: 90,
      drops: [{ itemId: 'tianleimu', chance: 0.65, min: 1, max: 2 }] },
    
    // 高级矿石
    { id: 'jinjingdong', name: '金精洞', icon: '🌟', requiredRealm: 9, duration: 70,
      drops: [{ itemId: 'jinjing', chance: 0.7, min: 1, max: 2 }] },
    { id: 'hanbingdong', name: '寒冰洞', icon: '🧊', requiredRealm: 10, duration: 80,
      drops: [{ itemId: 'hanjingshi', chance: 0.7, min: 1, max: 2 }] },
    { id: 'zimugangmai', name: '紫母钢脉', icon: '💜', requiredRealm: 11, duration: 90,
      drops: [{ itemId: 'zimugang', chance: 0.65, min: 1, max: 2 }] },
    { id: 'tianyunjie', name: '天陨界', icon: '☄️', requiredRealm: 12, duration: 100,
      drops: [{ itemId: 'tianyunjing', chance: 0.6, min: 1, max: 2 }] },
    
    // 高级兽材
    { id: 'yaodangu', name: '妖丹谷', icon: '🟣', requiredRealm: 9, duration: 75,
      drops: [{ itemId: 'yaodan', chance: 0.7, min: 1, max: 2 }] },
    { id: 'yaoshouling_area', name: '妖兽岭', icon: '👹', requiredRealm: 10, duration: 85,
      drops: [{ itemId: 'yaoshouling', chance: 0.65, min: 1, max: 2 }] },
    { id: 'jiaolongtan', name: '蛟龙潭', icon: '🐊', requiredRealm: 11, duration: 95,
      drops: [{ itemId: 'jiaopi', chance: 0.6, min: 1, max: 2 }] },
    { id: 'fengyulin', name: '凤羽林', icon: '🪶', requiredRealm: 12, duration: 100,
      drops: [{ itemId: 'fengyu', chance: 0.55, min: 1, max: 2 }] },

    // ========== 金丹期 (13-16) ==========
    // 仙级草药
    { id: 'jiuyelianchi', name: '九叶莲池', icon: '🪷', requiredRealm: 13, duration: 120,
      drops: [{ itemId: 'jiuyelian', chance: 0.5, min: 1, max: 2 }] },
    { id: 'wannianshendi', name: '万年参地', icon: '🥕', requiredRealm: 14, duration: 130,
      drops: [{ itemId: 'wannianginseng', chance: 0.45, min: 1, max: 1 }] },
    { id: 'taisuiku', name: '太岁窟', icon: '🧬', requiredRealm: 15, duration: 140,
      drops: [{ itemId: 'taisuishen', chance: 0.4, min: 1, max: 1 }] },
    
    // 仙级矿石
    { id: 'leitingfeng', name: '雷霆峰', icon: '⚡', requiredRealm: 13, duration: 120,
      drops: [{ itemId: 'leijing', chance: 0.5, min: 1, max: 2 }] },
    { id: 'xiantiankuang', name: '先天矿', icon: '💛', requiredRealm: 14, duration: 130,
      drops: [{ itemId: 'xiantianjing', chance: 0.45, min: 1, max: 1 }] },
    { id: 'hundunlie', name: '混沌裂', icon: '🔮', requiredRealm: 16, duration: 150,
      drops: [{ itemId: 'hundunjing', chance: 0.35, min: 1, max: 1 }] },
    
    // 仙级兽材
    { id: 'longyuan', name: '龙渊', icon: '🐉', requiredRealm: 13, duration: 120,
      drops: [{ itemId: 'longlin', chance: 0.45, min: 1, max: 1 }, { itemId: 'longxue', chance: 0.3, min: 1, max: 1 }] },
    { id: 'fenghuangchao', name: '凤凰巢', icon: '🔥', requiredRealm: 14, duration: 130,
      drops: [{ itemId: 'fenghuangyu', chance: 0.4, min: 1, max: 1 }] },
    { id: 'qilinling', name: '麒麟岭', icon: '🦄', requiredRealm: 15, duration: 140,
      drops: [{ itemId: 'qilinjia', chance: 0.35, min: 1, max: 1 }] },

    // ========== 元婴期 (17-20) ==========
    { id: 'longlinshen', name: '龙鳞深渊', icon: '🐲', requiredRealm: 17, duration: 180,
      drops: [{ itemId: 'longlin', chance: 0.6, min: 1, max: 2 }, { itemId: 'longxue', chance: 0.4, min: 1, max: 1 }] },
    { id: 'fenghuangniewu', name: '凤凰涅屋', icon: '🔥', requiredRealm: 18, duration: 200,
      drops: [{ itemId: 'fenghuangyu', chance: 0.55, min: 1, max: 2 }] },
    { id: 'qilinshenyu', name: '麒麟神域', icon: '🦄', requiredRealm: 19, duration: 220,
      drops: [{ itemId: 'qilinjia', chance: 0.5, min: 1, max: 2 }] },
    { id: 'shenshouchang', name: '神兽场', icon: '⭐', requiredRealm: 20, duration: 240,
      drops: [{ itemId: 'shenshoudan', chance: 0.4, min: 1, max: 1 }] },

    // ========== 化神期 (21-26) ==========
    { id: 'huntianyu', name: '混天域', icon: '🌀', requiredRealm: 21, duration: 300,
      drops: [{ itemId: 'huntianlingzhi', chance: 0.4, min: 1, max: 1 }, { itemId: 'hundunjing', chance: 0.5, min: 1, max: 2 }] },
    { id: 'xianlingdao', name: '仙灵岛', icon: '🍑', requiredRealm: 22, duration: 320,
      drops: [{ itemId: 'xianlinguo', chance: 0.35, min: 1, max: 1 }] },
    { id: 'hongmenghai', name: '鸿蒙海', icon: '✴️', requiredRealm: 23, duration: 360,
      drops: [{ itemId: 'hongmengjing', chance: 0.3, min: 1, max: 1 }] },
    { id: 'longjingku', name: '龙晶窟', icon: '💠', requiredRealm: 24, duration: 400,
      drops: [{ itemId: 'longjing', chance: 0.25, min: 1, max: 1 }] },
    { id: 'taixumijing', name: '太虚秘境', icon: '🌌', requiredRealm: 25, duration: 450,
      drops: [
        { itemId: 'hongmengjing', chance: 0.4, min: 1, max: 2 },
        { itemId: 'longjing', chance: 0.35, min: 1, max: 1 },
        { itemId: 'shenshoudan', chance: 0.3, min: 1, max: 1 }
      ] }
];

// 丹药配置
const PILLS = {
    // 练气期 - 临时效果
    juqi: { id: 'juqi', name: '聚气丹', icon: '💊', desc: '修炼速度+50%，5分钟',
      effect: { type: 'speed_boost', value: 0.5, duration: 300 }, quality: 'common',
      materials: [{ itemId: 'lingcao', count: 3 }, { itemId: 'lingshi', count: 2 }] },
    qingxin: { id: 'qingxin', name: '清心丹', icon: '💙', desc: '修炼速度+70%，5分钟',
      effect: { type: 'speed_boost', value: 0.7, duration: 300 }, quality: 'common',
      materials: [{ itemId: 'qingxincao', count: 3 }, { itemId: 'lingshi', count: 2 }] },
    yangqi: { id: 'yangqi', name: '养气丹', icon: '💚', desc: '修炼速度+80%，5分钟',
      effect: { type: 'speed_boost', value: 0.8, duration: 300 }, quality: 'common',
      materials: [{ itemId: 'lingcao', count: 5 }, { itemId: 'huanglingcao', count: 3 }] },

    // 筑基期 - 筑基丹为永久效果（限用1次）
    zhuji: { id: 'zhuji', name: '筑基丹', icon: '💠', desc: '永久修炼速度+1（限用1次）',
      effect: { type: 'permanent_speed', value: 1, maxUses: 1 }, quality: 'uncommon',
      materials: [{ itemId: 'huolingcao', count: 2 }, { itemId: 'binglingcao', count: 2 }, { itemId: 'shouhe', count: 1 }] },
    wuling: { id: 'wuling', name: '五灵丹', icon: '🔘', desc: '修炼速度+100%，5分钟',
      effect: { type: 'speed_boost', value: 1.0, duration: 300 }, quality: 'uncommon',
      materials: [{ itemId: 'huolingcao', count: 1 }, { itemId: 'binglingcao', count: 1 }, { itemId: 'mulincao', count: 1 }, { itemId: 'jinlingcao', count: 1 }, { itemId: 'shuiyuncao', count: 1 }] },
    guiyuan: { id: 'guiyuan', name: '归元丹', icon: '🔵', desc: '修炼速度+120%，5分钟',
      effect: { type: 'speed_boost', value: 1.2, duration: 300 }, quality: 'uncommon',
      materials: [{ itemId: 'zicao', count: 1 }, { itemId: 'shouhe', count: 3 }, { itemId: 'baiyinshi', count: 2 }] },

    // 金丹期 - 破境丹为永久效果（限用1次）
    ningshen: { id: 'ningshen', name: '凝神丹', icon: '🔷', desc: '修炼速度+150%，5分钟',
      effect: { type: 'speed_boost', value: 1.5, duration: 300 }, quality: 'rare',
      materials: [{ itemId: 'zicao', count: 2 }, { itemId: 'yaodan', count: 1 }, { itemId: 'jinjing', count: 2 }] },
    pojing: { id: 'pojing', name: '破境丹', icon: '🌟', desc: '永久修炼速度+2（限用1次）',
      effect: { type: 'permanent_speed', value: 2, maxUses: 1 }, quality: 'rare',
      materials: [{ itemId: 'jiuyelian', count: 1 }, { itemId: 'yaodan', count: 2 }, { itemId: 'leijing', count: 1 }] },
    jindan: { id: 'jindan', name: '金丹', icon: '🟡', desc: '修炼速度+200%，5分钟',
      effect: { type: 'speed_boost', value: 2.0, duration: 300 }, quality: 'rare',
      materials: [{ itemId: 'chiyanhua', count: 1 }, { itemId: 'xuelihua', count: 1 }, { itemId: 'jinjing', count: 2 }] },

    // 元婴期 - 元婴丹为永久效果（限用1次）
    yuanying: { id: 'yuanying', name: '元婴丹', icon: '👶', desc: '永久修炼速度+3（限用1次）',
      effect: { type: 'permanent_speed', value: 3, maxUses: 1 }, quality: 'epic',
      materials: [{ itemId: 'wannianginseng', count: 1 }, { itemId: 'longxue', count: 1 }, { itemId: 'leijing', count: 2 }] },
    huashen: { id: 'huashen', name: '化神丹', icon: '👁️', desc: '修炼速度+250%，5分钟',
      effect: { type: 'speed_boost', value: 2.5, duration: 300 }, quality: 'epic',
      materials: [{ itemId: 'taisuishen', count: 1 }, { itemId: 'fenghuangyu', count: 1 }, { itemId: 'xiantianjing', count: 1 }] },
    jiuzhuan: { id: 'jiuzhuan', name: '九转玄丹', icon: '🔮', desc: '修炼速度+300%，5分钟',
      effect: { type: 'speed_boost', value: 3.0, duration: 300 }, quality: 'epic',
      materials: [{ itemId: 'jiuyelian', count: 2 }, { itemId: 'longlin', count: 1 }, { itemId: 'qilinjia', count: 1 }] },

    // 化神期 - 大罗仙丹为永久效果（限用1次）
    xiandan: { id: 'xiandan', name: '仙丹', icon: '⭐', desc: '修炼速度+400%，5分钟',
      effect: { type: 'speed_boost', value: 4.0, duration: 300 }, quality: 'legendary',
      materials: [{ itemId: 'xianlinguo', count: 1 }, { itemId: 'shenshoudan', count: 1 }, { itemId: 'hongmengjing', count: 1 }] },
    daluo: { id: 'daluo', name: '大罗仙丹', icon: '🌈', desc: '永久修炼速度+5（限用1次）',
      effect: { type: 'permanent_speed', value: 5, maxUses: 1 }, quality: 'legendary',
      materials: [{ itemId: 'huntianlingzhi', count: 2 }, { itemId: 'longjing', count: 1 }, { itemId: 'hongmengjing', count: 1 }] },

    // ===== 突破丹（降低突破失败率50%，5分钟，时间不叠加）=====
    // 练气突破丹 - 用于练气期
    lianqi_tupo: { id: 'lianqi_tupo', name: '练气突破丹', icon: '🔸', desc: '5分钟内突破失败率减半（练气期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'lianqi', duration: 300 }, quality: 'common',
      materials: [{ itemId: 'lingcao', count: 5 }, { itemId: 'lingshi', count: 5 }] },
    // 筑基突破丹 - 用于筑基期，材料为练气期材料
    zhuji_tupo: { id: 'zhuji_tupo', name: '筑基突破丹', icon: '🔹', desc: '5分钟内突破失败率减半（筑基期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'zhuji', duration: 300 }, quality: 'uncommon',
      materials: [{ itemId: 'huolingcao', count: 3 }, { itemId: 'binglingcao', count: 3 }, { itemId: 'shouhe', count: 2 }] },
    // 金丹突破丹 - 用于金丹期，材料为筑基期材料
    jindan_tupo: { id: 'jindan_tupo', name: '金丹突破丹', icon: '🔶', desc: '5分钟内突破失败率减半（金丹期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'jindan', duration: 300 }, quality: 'rare',
      materials: [{ itemId: 'zicao', count: 3 }, { itemId: 'yaodan', count: 2 }, { itemId: 'jinjing', count: 3 }] },
    // 元婴突破丹 - 用于元婴期，材料为金丹期材料
    yuanying_tupo: { id: 'yuanying_tupo', name: '元婴突破丹', icon: '🔷', desc: '5分钟内突破失败率减半（元婴期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'yuanying', duration: 300 }, quality: 'epic',
      materials: [{ itemId: 'jiuyelian', count: 2 }, { itemId: 'leijing', count: 3 }, { itemId: 'xiantianjing', count: 2 }] },
    // 化神突破丹 - 用于化神期，材料为元婴期材料
    huashen_tupo: { id: 'huashen_tupo', name: '化神突破丹', icon: '💠', desc: '5分钟内突破失败率减半（化神期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'huashen', duration: 300 }, quality: 'legendary',
      materials: [{ itemId: 'longlin', count: 2 }, { itemId: 'fenghuangyu', count: 2 }, { itemId: 'qilinjia', count: 2 }] },
    // 渡劫突破丹 - 用于渡劫期，材料为化神期材料
    dujie_tupo: { id: 'dujie_tupo', name: '渡劫突破丹', icon: '⚡', desc: '5分钟内突破失败率减半（渡劫期）',
      effect: { type: 'breakthrough_boost', majorRealm: 'dujie', duration: 300 }, quality: 'legendary',
      materials: [{ itemId: 'huntianlingzhi', count: 2 }, { itemId: 'hongmengjing', count: 2 }, { itemId: 'longjing', count: 1 }] }
};

// 装备配置
const EQUIPMENT = {
    // 练气期武器
    mujian: { id: 'mujian', name: '木剑', icon: '🗡️', slot: 'weapon', power: 20, quality: 'common',
      materials: [{ itemId: 'tieshi', count: 3 }, { itemId: 'lingshi', count: 2 }] },
    tiejian: { id: 'tiejian', name: '铁剑', icon: '⚔️', slot: 'weapon', power: 50, quality: 'common',
      materials: [{ itemId: 'tieshi', count: 6 }, { itemId: 'tongkuang', count: 3 }] },
    // 练气期护甲
    buyi: { id: 'buyi', name: '布衣', icon: '👕', slot: 'armor', power: 15, quality: 'common',
      materials: [{ itemId: 'shoupi', count: 3 }, { itemId: 'lingshi', count: 2 }] },
    pifu: { id: 'pifu', name: '皮甲', icon: '🦺', slot: 'armor', power: 40, quality: 'common',
      materials: [{ itemId: 'shoupi', count: 5 }, { itemId: 'shouya', count: 3 }] },
    // 练气期饰品
    yupei: { id: 'yupei', name: '玉佩', icon: '📿', slot: 'accessory', power: 10, quality: 'common',
      materials: [{ itemId: 'lingshi', count: 5 }] },

    // 筑基期武器
    xuantiejian: { id: 'xuantiejian', name: '玄铁剑', icon: '🔪', slot: 'weapon', power: 150, quality: 'uncommon',
      materials: [{ itemId: 'tieshi', count: 10 }, { itemId: 'heijinshi', count: 3 }, { itemId: 'shouhe', count: 2 }] },
    baiyinjian: { id: 'baiyinjian', name: '白银剑', icon: '⚪', slot: 'weapon', power: 250, quality: 'uncommon',
      materials: [{ itemId: 'baiyinshi', count: 5 }, { itemId: 'heijinshi', count: 3 }] },
    // 筑基期护甲
    shoukuijia: { id: 'shoukuijia', name: '兽魁甲', icon: '🛡️', slot: 'armor', power: 120, quality: 'uncommon',
      materials: [{ itemId: 'shoupi', count: 8 }, { itemId: 'shouhe', count: 3 }, { itemId: 'langjin', count: 2 }] },
    xuantiejia: { id: 'xuantiejia', name: '玄铁甲', icon: '🎽', slot: 'armor', power: 200, quality: 'uncommon',
      materials: [{ itemId: 'tieshi', count: 12 }, { itemId: 'heijinshi', count: 4 }] },
    // 筑基期饰品
    yueguanghuan: { id: 'yueguanghuan', name: '月光环', icon: '🌙', slot: 'accessory', power: 80, quality: 'uncommon',
      materials: [{ itemId: 'yueshi', count: 3 }, { itemId: 'baiyinshi', count: 2 }] },
    hujie: { id: 'hujie', name: '护身戒', icon: '💍', slot: 'accessory', power: 100, quality: 'uncommon',
      materials: [{ itemId: 'jinjing', count: 1 }, { itemId: 'shouhe', count: 2 }] },

    // 金丹期武器
    feijian: { id: 'feijian', name: '青锋飞剑', icon: '🔷', slot: 'weapon', power: 500, quality: 'rare',
      materials: [{ itemId: 'jinjing', count: 3 }, { itemId: 'yaodan', count: 2 }] },
    leihuojian: { id: 'leihuojian', name: '雷火剑', icon: '⚡', slot: 'weapon', power: 800, quality: 'rare',
      materials: [{ itemId: 'leijing', count: 1 }, { itemId: 'yanshi', count: 5 }, { itemId: 'tianyunjing', count: 2 }] },
    bingshuangjian: { id: 'bingshuangjian', name: '冰霜剑', icon: '❄️', slot: 'weapon', power: 800, quality: 'rare',
      materials: [{ itemId: 'hanjingshi', count: 3 }, { itemId: 'xuelihua', count: 2 }] },
    // 金丹期护甲
    jinsiyi: { id: 'jinsiyi', name: '金丝软甲', icon: '🥋', slot: 'armor', power: 400, quality: 'rare',
      materials: [{ itemId: 'jinjing', count: 4 }, { itemId: 'yaodan', count: 1 }] },
    jiaolongjia: { id: 'jiaolongjia', name: '蛟龙甲', icon: '🐊', slot: 'armor', power: 650, quality: 'rare',
      materials: [{ itemId: 'jiaopi', count: 3 }, { itemId: 'zimugang', count: 2 }] },
    // 金丹期饰品
    wuxinghuan: { id: 'wuxinghuan', name: '五行环', icon: '⭕', slot: 'accessory', power: 350, quality: 'rare',
      materials: [{ itemId: 'yanshi', count: 2 }, { itemId: 'hanjingshi', count: 2 }, { itemId: 'jinjing', count: 2 }] },

    // 元婴期武器
    leijian: { id: 'leijian', name: '紫雷神剑', icon: '💜', slot: 'weapon', power: 2000, quality: 'epic',
      materials: [{ itemId: 'leijing', count: 3 }, { itemId: 'zimugang', count: 4 }, { itemId: 'tianyunjing', count: 3 }] },
    longyuanjian: { id: 'longyuanjian', name: '龙渊剑', icon: '🐉', slot: 'weapon', power: 3500, quality: 'epic',
      materials: [{ itemId: 'longlin', count: 2 }, { itemId: 'longxue', count: 1 }, { itemId: 'xiantianjing', count: 2 }] },
    fenghuangjian: { id: 'fenghuangjian', name: '凤凰剑', icon: '🔥', slot: 'weapon', power: 3500, quality: 'epic',
      materials: [{ itemId: 'fenghuangyu', count: 2 }, { itemId: 'chiyanhua', count: 3 }, { itemId: 'xiantianjing', count: 2 }] },
    // 元婴期护甲
    longlinkai: { id: 'longlinkai', name: '龙鳞铠', icon: '🐲', slot: 'armor', power: 2500, quality: 'epic',
      materials: [{ itemId: 'longlin', count: 3 }, { itemId: 'jinjing', count: 5 }] },
    qilinzhuangjia: { id: 'qilinzhuangjia', name: '麒麟战甲', icon: '🦄', slot: 'armor', power: 3000, quality: 'epic',
      materials: [{ itemId: 'qilinjia', count: 3 }, { itemId: 'xiantianjing', count: 2 }] },
    // 元婴期饰品
    xianqihuan: { id: 'xianqihuan', name: '仙器手环', icon: '💫', slot: 'accessory', power: 1500, quality: 'epic',
      materials: [{ itemId: 'leijing', count: 2 }, { itemId: 'yaodan', count: 3 }] },

    // 化神期武器
    hundunjian: { id: 'hundunjian', name: '混沌神剑', icon: '🌀', slot: 'weapon', power: 10000, quality: 'legendary',
      materials: [{ itemId: 'hundunjing', count: 3 }, { itemId: 'longjing', count: 1 }, { itemId: 'shenshoudan', count: 1 }] },
    hongmengjian: { id: 'hongmengjian', name: '鸿蒙剑', icon: '✴️', slot: 'weapon', power: 20000, quality: 'legendary',
      materials: [{ itemId: 'hongmengjing', count: 3 }, { itemId: 'longjing', count: 2 }] },
    // 化神期护甲
    shenshengpao: { id: 'shenshengpao', name: '神圣袍', icon: '👘', slot: 'armor', power: 8000, quality: 'legendary',
      materials: [{ itemId: 'huntianlingzhi', count: 2 }, { itemId: 'fenghuangyu', count: 2 }, { itemId: 'hongmengjing', count: 1 }] },
    // 化神期饰品
    taixujie: { id: 'taixujie', name: '太虚戒', icon: '💎', slot: 'accessory', power: 5000, quality: 'legendary',
      materials: [{ itemId: 'hongmengjing', count: 2 }, { itemId: 'hundunjing', count: 2 }] }
};

// 法宝配置
const TREASURES = {
    hudun: { id: 'hudun', name: '护身玉符', icon: '🛡️', slot: 'treasure', power: 50, quality: 'common', desc: '抵挡伤害' },
    chuwudai: { id: 'chuwudai', name: '储物袋', icon: '👜', slot: 'treasure', power: 30, quality: 'common', desc: '扩展背包' },
    feijianling: { id: 'feijianling', name: '飞剑令', icon: '🎯', slot: 'treasure', power: 200, quality: 'uncommon', desc: '召唤飞剑' },
    fenghuoling: { id: 'fenghuoling', name: '风火轮', icon: '☸️', slot: 'treasure', power: 300, quality: 'uncommon', desc: '加速移动' },
    qiankunding: { id: 'qiankunding', name: '乾坤鼎', icon: '🫖', slot: 'treasure', power: 600, quality: 'rare', desc: '炼丹神器' },
    zhenfayupan: { id: 'zhenfayupan', name: '阵法玉盘', icon: '🔯', slot: 'treasure', power: 800, quality: 'rare', desc: '布置阵法' },
    hunyuanzhong: { id: 'hunyuanzhong', name: '混元钟', icon: '🔔', slot: 'treasure', power: 2000, quality: 'epic', desc: '防御法宝' },
    jiumiaozhong: { id: 'jiumiaozhong', name: '九霄神塔', icon: '🗼', slot: 'treasure', power: 3000, quality: 'epic', desc: '攻防一体' },
    qixingpan: { id: 'qixingpan', name: '七星盘', icon: '✨', slot: 'treasure', power: 2500, quality: 'epic', desc: '占卜天机' },
    taijitu: { id: 'taijitu', name: '太极图', icon: '☯️', slot: 'treasure', power: 8000, quality: 'legendary', desc: '至高法宝' },
    fantianyinji: { id: 'fantianyinji', name: '翻天印', icon: '🔱', slot: 'treasure', power: 10000, quality: 'legendary', desc: '镇压万物' },
    huntianqi: { id: 'huntianqi', name: '混天绮', icon: '🎀', slot: 'treasure', power: 12000, quality: 'legendary', desc: '困敌无形' }
};

// 副本配置
const DUNGEONS = [
    // 练气期
    { id: 'd1', name: '小妖林', icon: '🌲', requiredRealm: 2, requiredPower: 50,
      rewards: [{ type: 'treasure', itemId: 'hudun', chance: 0.2 }, { type: 'material', itemId: 'shouhe', min: 1, max: 2, chance: 0.8 }] },
    { id: 'd2', name: '妖兽林', icon: '🌳', requiredRealm: 4, requiredPower: 120,
      rewards: [{ type: 'treasure', itemId: 'chuwudai', chance: 0.2 }, { type: 'material', itemId: 'shouhe', min: 2, max: 3, chance: 0.8 }] },
    { id: 'd3', name: '石林矿洞', icon: '⛏️', requiredRealm: 6, requiredPower: 250,
      rewards: [{ type: 'material', itemId: 'heijinshi', min: 2, max: 4, chance: 0.7 }, { type: 'material', itemId: 'baiyinshi', min: 1, max: 3, chance: 0.6 }] },
    { id: 'd4', name: '妖王巢穴', icon: '👹', requiredRealm: 8, requiredPower: 450,
      rewards: [{ type: 'treasure', itemId: 'feijianling', chance: 0.15 }, { type: 'material', itemId: 'yaodan', min: 1, max: 2, chance: 0.6 }] },

    // 筑基期
    { id: 'd5', name: '魔窟外围', icon: '🕳️', requiredRealm: 9, requiredPower: 700,
      rewards: [{ type: 'treasure', itemId: 'feijianling', chance: 0.18 }, { type: 'material', itemId: 'yaodan', min: 1, max: 2, chance: 0.7 }] },
    { id: 'd6', name: '魔窟深处', icon: '👿', requiredRealm: 10, requiredPower: 1100,
      rewards: [{ type: 'treasure', itemId: 'fenghuoling', chance: 0.15 }, { type: 'material', itemId: 'zimugang', min: 1, max: 1, chance: 0.3 }] },
    { id: 'd7', name: '冰火岛', icon: '🌋', requiredRealm: 11, requiredPower: 1600,
      rewards: [{ type: 'material', itemId: 'chiyanhua', min: 1, max: 1, chance: 0.4 }, { type: 'material', itemId: 'xuelihua', min: 1, max: 1, chance: 0.4 }] },
    { id: 'd8', name: '魔王殿', icon: '👺', requiredRealm: 12, requiredPower: 2200,
      rewards: [{ type: 'treasure', itemId: 'qiankunding', chance: 0.12 }, { type: 'material', itemId: 'leijing', min: 1, max: 1, chance: 0.35 }] },

    // 金丹期
    { id: 'd9', name: '上古遗迹', icon: '🏛️', requiredRealm: 13, requiredPower: 3500,
      rewards: [{ type: 'treasure', itemId: 'qiankunding', chance: 0.15 }, { type: 'material', itemId: 'jiuyelian', min: 1, max: 1, chance: 0.25 }] },
    { id: 'd10', name: '神木林', icon: '🌲', requiredRealm: 14, requiredPower: 5500,
      rewards: [{ type: 'treasure', itemId: 'zhenfayupan', chance: 0.12 }, { type: 'material', itemId: 'wannianginseng', min: 1, max: 1, chance: 0.2 }] },
    { id: 'd11', name: '雷神殿', icon: '⚡', requiredRealm: 15, requiredPower: 9000,
      rewards: [{ type: 'material', itemId: 'leijing', min: 2, max: 3, chance: 0.6 }, { type: 'material', itemId: 'xiantianjing', min: 1, max: 1, chance: 0.25 }] },
    { id: 'd12', name: '妖皇墓', icon: '💀', requiredRealm: 16, requiredPower: 14000,
      rewards: [{ type: 'treasure', itemId: 'hunyuanzhong', chance: 0.1 }, { type: 'material', itemId: 'longlin', min: 1, max: 1, chance: 0.15 }] },

    // 元婴期
    { id: 'd13', name: '龙窟', icon: '🐲', requiredRealm: 17, requiredPower: 25000,
      rewards: [{ type: 'treasure', itemId: 'hunyuanzhong', chance: 0.12 }, { type: 'material', itemId: 'longlin', min: 1, max: 2, chance: 0.5 }] },
    { id: 'd14', name: '凤凰岭', icon: '🔥', requiredRealm: 18, requiredPower: 42000,
      rewards: [{ type: 'treasure', itemId: 'jiumiaozhong', chance: 0.1 }, { type: 'material', itemId: 'fenghuangyu', min: 1, max: 1, chance: 0.35 }] },
    { id: 'd15', name: '万兽渊', icon: '🦁', requiredRealm: 19, requiredPower: 65000,
      rewards: [{ type: 'treasure', itemId: 'qixingpan', chance: 0.1 }, { type: 'material', itemId: 'qilinjia', min: 1, max: 1, chance: 0.3 }] },
    { id: 'd16', name: '神魔界', icon: '😈', requiredRealm: 20, requiredPower: 100000,
      rewards: [{ type: 'material', itemId: 'hundunjing', min: 1, max: 1, chance: 0.2 }, { type: 'material', itemId: 'shenshoudan', min: 1, max: 1, chance: 0.15 }] },

    // 化神期
    { id: 'd17', name: '混天域', icon: '🌀', requiredRealm: 21, requiredPower: 180000,
      rewards: [{ type: 'treasure', itemId: 'taijitu', chance: 0.08 }, { type: 'material', itemId: 'hundunjing', min: 1, max: 2, chance: 0.5 }] },
    { id: 'd18', name: '九天仙宫', icon: '☁️', requiredRealm: 23, requiredPower: 350000,
      rewards: [{ type: 'treasure', itemId: 'fantianyinji', chance: 0.06 }, { type: 'material', itemId: 'xianlinguo', min: 1, max: 1, chance: 0.3 }] },
    { id: 'd19', name: '太虚神殿', icon: '🌌', requiredRealm: 25, requiredPower: 700000,
      rewards: [{ type: 'treasure', itemId: 'huntianqi', chance: 0.05 }, { type: 'material', itemId: 'hongmengjing', min: 1, max: 2, chance: 0.4 }] },
    { id: 'd20', name: '鸿蒙秘境', icon: '✴️', requiredRealm: 26, requiredPower: 1500000,
      rewards: [{ type: 'treasure', itemId: 'huntianqi', chance: 0.1 }, { type: 'material', itemId: 'longjing', min: 1, max: 2, chance: 0.4 }] }
];

// 品质配置
const QUALITY_COLORS = { common: '#a0a0a0', uncommon: '#4caf50', rare: '#2196f3', epic: '#9c27b0', legendary: '#ffd700' };
const QUALITY_NAMES = { common: '凡品', uncommon: '灵品', rare: '玄品', epic: '仙品', legendary: '神品' };
