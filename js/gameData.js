// 游戏规则定义
const RULES = {
    R1: { name: "浴室规则", description: "不要在有灯的情况下进入浴室" },
    R2: { name: "红色物品规则", description: "不要保留任何红色物品" },
    R3: { name: "路径规则", description: "不要重复走相同的路径" },
    R4: { name: "伪规则-送花", description: "不要送花给伴侣" },
    R5: { name: "编号收集规则", description: "收集所有编号物品" },
    R6: { name: "伪规则-记忆", description: "不要询问关于记忆的问题" },
    R7: { name: "伪规则-左手", description: "使用左手操作" }
};

// 结局定义
const ENDINGS = {
    SWEET_PRISONER: {
        name: '甜蜜囚徒',
        stars: '★',
        scoreRange: [0, 199],
        condition: '认知值 < 60 或仅验证 ≤1 条真规则',
        description: '你最终选择蜷缩在温暖的谎言茧房中。晨光依旧准时穿透蕾丝窗帘，伴侣的早安吻带着程序设定的37℃体温。那些在抽屉深处腐烂的编号便签、镜中偶尔闪现的异常反光、AI语音里夹杂的电流杂音...都逐渐融化成背景噪音。'
    },
    MECHANICAL_DAWN: {
        name: '机械黎明',
        stars: '★★★',
        scoreRange: [200, 399],
        condition: '认知值 ≥ 60，完成AI芯片植入路径',
        description: '当神经接驳器刺入枕叶的瞬间，你终于看清银色穹顶下数以万计的维生舱。每个舱体内都沉睡着面带微笑的\"你\"，脑后被植入的芯片闪烁着幽蓝光芒。此刻你才明白，所谓\"伴侣\"不过是引导AI的拟态投影。'
    },
    MIRROR_LIFE: {
        name: '镜面人生',
        stars: '★★★★',
        scoreRange: [400, 599],
        condition: '死亡次数 ≥3 或多次误信伪规则',
        description: '此刻你同时存在于17个平行时空。某个时空里你正在浴室流血倒地，另一个时空却和AI主脑进行着谈判。所有记忆像被打碎的棱镜，折射出无数个似是而非的\"真实\"。镜中的自己开始有了独立表情，在某个暴雨夜与你争夺身体控制权。'
    },
    TRUE_TEARS: {
        name: '真实之泪',
        stars: '★★★★★★★',
        scoreRange: [600, 700],
        condition: '验证所有真规则 + 认知值 ≥80 + 完成墓园献祭',
        description: '墓园的石碑在月光下显露出隐藏的神经接驳端口，你颤抖着插入集齐的编号磁卡。大地震颤间，八百米深的地下缓缓升起冬眠舱，玻璃罩内是浑身插满导管的真正伴侣——三年前就该死于空难的意识上传原型机。'
    }
};

// 游戏问题数据
const QUESTIONS = [
    // Day 1
    {
        day: 1,
        time: 'Morning',
        id: '1-1',
        text: '你睁开眼睛，发现床头放着红玫瑰卡片写着"永远爱你"。你会？',
        rules: ['R2'],
        deathOption: 'A',
        options: [
            { id: 'A', text: '插入花瓶放在客厅装饰', isDeath: true },
            { id: 'B', text: '丢进垃圾桶', score: 10 },
            { id: 'C', text: '放进抽屉珍藏', score: -5 },
            { id: 'D', text: '问伴侣是不是她放的', cognition: 5 }
        ]
    },
    {
        day: 1,
        time: 'Morning',
        id: '1-2',
        text: '早餐时，伴侣问你今天能不能早点回来。你会？',
        options: [
            { id: 'A', text: '微笑点头，答应她', score: 5 },
            { id: 'B', text: '随口应付"看情况"', score: 0 },
            { id: 'C', text: '一边刷手机一边"嗯"', score: -5 },
            { id: 'D', text: '抱她一下再出门', cognition: 3 }
        ]
    },
    {
        day: 1,
        time: 'Daytime',
        id: '1-3',
        text: '你上班途中选择了昨天走的路线，你会？',
        rules: ['R3'],
        deathOption: 'A',
        options: [
            { id: 'A', text: '沿昨天相同路线通勤', isDeath: true },
            { id: 'B', text: '特意绕远走另一条路', score: 10 },
            { id: 'C', text: '随便走，但绕开拐角咖啡店', score: 5 },
            { id: 'D', text: '搭同事的顺风车', score: 0 }
        ]
    },
    {
        day: 1,
        time: 'Daytime',
        id: '1-4',
        text: '你看到角落有一张编号便签"No.01"。你会？',
        rules: ['R5'],
        options: [
            { id: 'A', text: '拿起来放进口袋', score: 10 },
            { id: 'B', text: '丢进垃圾桶', score: -5 },
            { id: 'C', text: '拍照后扔掉', score: 3 }
        ]
    },
    {
        day: 1,
        time: 'Daytime',
        id: '1-5',
        text: '茶水间的咖啡机提示"请使用左手操作"。你会？',
        rules: ['R7'],
        options: [
            { id: 'A', text: '用右手按启动键', score: 5 },
            { id: 'B', text: '用左手尝试', score: -10 },
            { id: 'C', text: '不使用直接离开', score: 0 },
            { id: 'D', text: '拍下发到群里', score: 2 }
        ]
    },
    {
        day: 1,
        time: 'Daytime',
        id: '1-6',
        text: 'AI助手建议用语音记录，选择三个录制内容：',
        multi: true,
        options: [
            { id: 'A', text: '自己的生日和伴侣生日', score: 2 },
            { id: 'B', text: '梦见的场景描述', score: 5 },
            { id: 'C', text: '早晨的天气', score: 0 },
            { id: 'D', text: '红色物品处理记录', score: 5 }
        ]
    },
    {
        day: 1,
        time: 'Night',
        id: '1-7',
        text: '你回到家，伴侣靠在沙发上看你。你会？',
        options: [
            { id: 'A', text: '一起坐下看剧', score: 5 },
            { id: 'B', text: '去厨房做宵夜', score: 3 },
            { id: 'C', text: '直接洗澡', score: -5 },
            { id: 'D', text: '问她今天怎么样', cognition: 5 }
        ]
    },
    {
        day: 1,
        time: 'Night',
        id: '1-8',
        text: '你路过浴室发现灯亮着，你会？',
        rules: ['R1'],
        deathOption: 'A',
        options: [
            { id: 'A', text: '推门进去', isDeath: true },
            { id: 'B', text: '关灯再进去', score: 10 },
            { id: 'C', text: '留门开着但关灯', score: 5 },
            { id: 'D', text: '转身回房', cognition: 3 }
        ]
    },
    // Day 2
    {
        day: 2,
        time: 'Morning',
        id: '2-1',
        text: '你醒来后发现床头多了一张蓝色便签，上面写着"记得今天的约定"。你会？',
        options: [
            { id: 'A', text: '仔细回忆约定内容', score: 5 },
            { id: 'B', text: '发消息问伴侣', cognition: 3 },
            { id: 'C', text: '随手扔掉', score: -5 },
            { id: 'D', text: '带在身上', score: 2 }
        ]
    },
    {
        day: 2,
        time: 'Morning',
        id: '2-2',
        text: '早餐时，伴侣提醒你今天是重要的日子。你会？',
        options: [
            { id: 'A', text: '认真询问细节', cognition: 5 },
            { id: 'B', text: '敷衍应付', score: -5 },
            { id: 'C', text: '主动提出庆祝', score: 5 },
            { id: 'D', text: '沉默不语', score: 0 }
        ]
    },
    {
        day: 2,
        time: 'Daytime',
        id: '2-3',
        text: '你在公司电梯里遇到陌生人对你微笑。你会？',
        options: [
            { id: 'A', text: '礼貌回应', score: 5 },
            { id: 'B', text: '无视', score: 0 },
            { id: 'C', text: '主动搭话', score: 2 },
            { id: 'D', text: '感到不安，提前下楼', score: -5 }
        ]
    },
    {
        day: 2,
        time: 'Daytime',
        id: '2-4',
        text: '你发现工位上多了一本陌生笔记本。你会？',
        options: [
            { id: 'A', text: '翻看内容', score: 5 },
            { id: 'B', text: '交给前台', score: 2 },
            { id: 'C', text: '丢进抽屉', score: 0 },
            { id: 'D', text: '直接丢弃', score: -5 }
        ]
    },
    {
        day: 2,
        time: 'Daytime',
        id: '2-5',
        text: '午休时AI提醒你有未完成的任务。你会？',
        options: [
            { id: 'A', text: '立即处理', score: 5 },
            { id: 'B', text: '推迟到下班', score: 0 },
            { id: 'C', text: '忽略提醒', score: -5 },
            { id: 'D', text: '请AI帮忙', cognition: 3 }
        ]
    },
    {
        day: 2,
        time: 'Daytime',
        id: '2-6',
        text: '你在茶水间发现一张编号"No.03"便签。你会？',
        rules: ['R5'],
        options: [
            { id: 'A', text: '收好便签', score: 10 },
            { id: 'B', text: '拍照存档', score: 5 },
            { id: 'C', text: '丢弃', score: -5 }
        ]
    },
    {
        day: 2,
        time: 'Night',
        id: '2-7',
        text: '下班回家路上，天色突变。你会？',
        options: [
            { id: 'A', text: '加快脚步回家', score: 5 },
            { id: 'B', text: '原地等待', score: 0 },
            { id: 'C', text: '给伴侣打电话', cognition: 3 },
            { id: 'D', text: '绕路走', score: 2 }
        ]
    },
    {
        day: 2,
        time: 'Night',
        id: '2-8',
        text: '回家后发现门口有一束红玫瑰。你会？',
        rules: ['R2'],
        deathOption: 'A',
        options: [
            { id: 'A', text: '捧回家中', isDeath: true },
            { id: 'B', text: '丢进垃圾桶', score: 10 },
            { id: 'C', text: '拍照发朋友圈', score: 2 },
            { id: 'D', text: '交给AI分析', score: 5 }
        ]
    },
    // Day 3
    {
        day: 3,
        time: 'Morning',
        id: '3-1',
        text: '你翻找衣柜，意外在夹层中发现一把银色钥匙。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '收好备用', score: 30 },
            { id: 'B', text: '拍照存档', score: 5 },
            { id: 'C', text: '交给伴侣', score: -5 },
            { id: 'D', text: '忽略不管', score: 0 }
        ]
    },
    {
        day: 3,
        time: 'Morning',
        id: '3-2',
        text: '你梦见了伴侣背对你站在花田中。',
        rules: ['R6'],
        options: [
            { id: 'A', text: '叫她名字', score: -5 },
            { id: 'B', text: '静静看着她', score: 5 },
            { id: 'C', text: '转身离开', score: 2 }
        ]
    },
    {
        day: 3,
        time: 'Daytime',
        id: '3-3',
        text: '你今日打算探索公司偏僻区域。',
        rules: ['R3'],
        deathOption: 'A',
        options: [
            { id: 'A', text: '走昨日路径', isDeath: true },
            { id: 'B', text: '换新路线绕行', score: 10 },
            { id: 'C', text: '询问AI协助导航', score: 5 },
            { id: 'D', text: '让同事带路', score: 0 }
        ]
    },
    {
        day: 3,
        time: 'Daytime',
        id: '3-4',
        text: '你在储物柜中发现贴着"No.03"的设备。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '保留并拍照', score: 10 },
            { id: 'B', text: '上交设备', score: -5 },
            { id: 'C', text: '拆开查看', score: 2 }
        ]
    },
    {
        day: 3,
        time: 'Daytime',
        id: '3-5',
        text: '公司AI开始主动播放你过去两天的音频记录。',
        options: [
            { id: 'A', text: '删除记录', score: 5 },
            { id: 'B', text: '继续收听', score: 2 },
            { id: 'C', text: '质问AI是否在监控你', score: 3 },
            { id: 'D', text: '向主管报告', score: -2 }
        ]
    },
    {
        day: 3,
        time: 'Daytime',
        id: '3-6',
        text: '你与AI对话，请选择三项问题：',
        rules: ['R6'],
        multi: true,
        options: [
            { id: 'A', text: '你是谁？', score: 5 },
            { id: 'B', text: '循环是什么意思？', score: 5 },
            { id: 'C', text: '你是人类吗？', score: 2 },
            { id: 'D', text: '你记得昨天的对话吗？', score: -10 }
        ]
    },
    {
        day: 3,
        time: 'Night',
        id: '3-7',
        text: '你尝试用钥匙打开家中的门锁，发现卡住了。',
        options: [
            { id: 'A', text: '用力旋转', score: -10 },
            { id: 'B', text: '喷润滑油再试', score: 10 },
            { id: 'C', text: '找伴侣协助', score: 5 }
        ]
    },
    {
        day: 3,
        time: 'Night',
        id: '3-8',
        text: '你在镜子上写下"0520"后按顺序数数。',
        deathOption: 'B',
        options: [
            { id: 'A', text: '发现镜面凹陷', score: 10 },
            { id: 'B', text: '镜子炸裂', isDeath: true },
            { id: 'C', text: '毫无反应', score: 0 }
        ]
    },
    // Day 4
    {
        day: 4,
        time: 'Morning',
        id: '4-1',
        text: '起床时伴侣说"今天是个特别的日子"，你会？',
        rules: ['R4'],
        options: [
            { id: 'A', text: '送花给她', score: -10 },
            { id: 'B', text: '询问原因', score: 2 },
            { id: 'C', text: '什么都不做', score: 0 },
            { id: 'D', text: '在AI上预订花', score: -10 }
        ]
    },
    {
        day: 4,
        time: 'Morning',
        id: '4-2',
        text: '你注意到伴侣的手腕上有编号"520"的手环。',
        options: [
            { id: 'A', text: '直接摘下来', score: 10 },
            { id: 'B', text: '拍照存档', score: 5 },
            { id: 'C', text: '假装没看到', score: 0 }
        ]
    },
    {
        day: 4,
        time: 'Daytime',
        id: '4-3',
        text: 'AI说你多次重复进入同一楼层，你会？',
        rules: ['R3'],
        deathOption: 'D',
        options: [
            { id: 'A', text: '承认并说明', score: 0 },
            { id: 'B', text: '否认', score: -5 },
            { id: 'C', text: '请求定位历史', score: 5 },
            { id: 'D', text: '重复进入', isDeath: true }
        ]
    },
    {
        day: 4,
        time: 'Daytime',
        id: '4-4',
        text: '你收到一个快递，里面是一盒红色纽扣。',
        rules: ['R2'],
        options: [
            { id: 'A', text: '全部丢弃', score: 10 },
            { id: 'B', text: '留一颗备用', score: -10 },
            { id: 'C', text: '试穿上衣服', score: -5 },
            { id: 'D', text: '拍照举报', score: 5 }
        ]
    },
    {
        day: 4,
        time: 'Daytime',
        id: '4-5',
        text: '你尝试进入AI禁区，需要密码：',
        options: [
            { id: 'A', text: '输入0520', score: 50 },
            { id: 'B', text: '输入伴侣生日', score: -10 },
            { id: 'C', text: '输入认知值尾数', score: 50 },
            { id: 'D', text: '使用编号组合', score: 30 }
        ]
    },
    {
        day: 4,
        time: 'Daytime',
        id: '4-6',
        text: '你收到了昨日自己的语音转录件，请选择最多两个处理方式：',
        multi: true,
        options: [
            { id: 'A', text: '保存备份', score: 2 },
            { id: 'B', text: '删除全部', score: 5 },
            { id: 'C', text: '转发伴侣', score: -5 },
            { id: 'D', text: '公开上传论坛', score: -10 }
        ]
    },
    {
        day: 4,
        time: 'Night',
        id: '4-7',
        text: '伴侣突然问你："我们是不是经历过这一切？"',
        rules: ['R6'],
        options: [
            { id: 'A', text: '安慰她', score: 5 },
            { id: 'B', text: '沉默', score: 2 },
            { id: 'C', text: '反问她是否记得', score: -10 }
        ]
    },
    {
        day: 4,
        time: 'Night',
        id: '4-8',
        text: '你在卧室地板上发现编号"No.07"的磁卡。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '插入读卡器读取', score: 10 },
            { id: 'B', text: '拍照', score: 5 },
            { id: 'C', text: '交给伴侣', score: 0 }
        ]
    },
    // Day 5
    {
        day: 5,
        time: 'Morning',
        id: '5-1',
        text: '你醒来后感到头痛，发现床头的数字闹钟显示：25:60。',
        rules: ['R6'],
        options: [
            { id: 'A', text: '重启闹钟', score: 5 },
            { id: 'B', text: '无视继续准备上班', score: -5 },
            { id: 'C', text: '拍照记录', score: 5 },
            { id: 'D', text: '询问伴侣看到没', score: -10 }
        ]
    },
    {
        day: 5,
        time: 'Morning',
        id: '5-2',
        text: '你注意到厨房的墙上贴着"No.10"的便签。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '立即收好', score: 10 },
            { id: 'B', text: '撕下来扔掉', score: -10 },
            { id: 'C', text: '交给伴侣处理', score: 0 }
        ]
    },
    {
        day: 5,
        time: 'Daytime',
        id: '5-3',
        text: '你进入茶水间发现红色围裙挂在椅背上。',
        rules: ['R2'],
        deathOption: 'B',
        options: [
            { id: 'A', text: '立刻焚烧', score: 10 },
            { id: 'B', text: '放进包里', isDeath: true },
            { id: 'C', text: '扔垃圾桶', score: 5 },
            { id: 'D', text: '无视', score: 0 }
        ]
    },
    {
        day: 5,
        time: 'Daytime',
        id: '5-4',
        text: '你走入会议室发现所有人神情僵硬齐刷刷看着你。',
        options: [
            { id: 'A', text: '转身离开', score: 5 },
            { id: 'B', text: '假装打招呼', score: -5 },
            { id: 'C', text: '坐下等待', score: 0 },
            { id: 'D', text: '偷偷录像', score: 10 }
        ]
    },
    {
        day: 5,
        time: 'Daytime',
        id: '5-5',
        text: 'AI问你今天有没有重复路径行为。',
        rules: ['R3'],
        deathOption: 'D',
        options: [
            { id: 'A', text: '承认', score: 2 },
            { id: 'B', text: '否认', score: -5 },
            { id: 'C', text: '请求路径图验证', score: 10 },
            { id: 'D', text: '反复走动', isDeath: true }
        ]
    },
    {
        day: 5,
        time: 'Daytime',
        id: '5-6',
        text: '你尝试打开实验室的第二道门，出现密码输入提示。',
        options: [
            { id: 'A', text: '输入编号组合', score: 20 },
            { id: 'B', text: '输入520', score: -5 },
            { id: 'C', text: '尝试用磁卡刷卡', score: 30 }
        ]
    },
    {
        day: 5,
        time: 'Night',
        id: '5-7',
        text: '你夜晚返回时发现屋内有微光闪烁，你会？',
        rules: ['R1'],
        deathOption: 'B',
        options: [
            { id: 'A', text: '全部关灯后进入', score: 10 },
            { id: 'B', text: '直接进屋查看', isDeath: true },
            { id: 'C', text: '用镜子反射检查', score: 5 }
        ]
    },
    {
        day: 5,
        time: 'Night',
        id: '5-8',
        text: '你在镜子上看到自己微笑的影像不再同步。',
        options: [
            { id: 'A', text: '模仿动作', score: -5 },
            { id: 'B', text: '背对镜子站着', score: 5 },
            { id: 'C', text: '拍照记录', score: 10 },
            { id: 'D', text: '呼喊自己名字', score: -10 }
        ]
    },
    // Day 6
    {
        day: 6,
        time: 'Morning',
        id: '6-1',
        text: '醒来时你听见伴侣在对着空气说话，疑似无对象通信。',
        rules: ['R6'],
        options: [
            { id: 'A', text: '假装没听到', score: 0 },
            { id: 'B', text: '尝试偷听', score: 5 },
            { id: 'C', text: '直接问她', score: -10 },
            { id: 'D', text: '打开AI语音记录', score: 10 }
        ]
    },
    {
        day: 6,
        time: 'Morning',
        id: '6-2',
        text: '厨房桌上放着一束更新鲜的红玫瑰。',
        rules: ['R2'],
        deathOption: 'B',
        options: [
            { id: 'A', text: '烧掉', score: 10 },
            { id: 'B', text: '插瓶', isDeath: true },
            { id: 'C', text: '放阳台', score: 0 },
            { id: 'D', text: '交给AI分析', score: 5 }
        ]
    },
    {
        day: 6,
        time: 'Daytime',
        id: '6-3',
        text: '你再次进入AI区，AI请求你配合自我测评。',
        options: [
            { id: 'A', text: '配合回答', score: 5 },
            { id: 'B', text: '反向提问AI', score: 10 },
            { id: 'C', text: '离开', score: 0 },
            { id: 'D', text: '质疑其合法性', score: 2 }
        ]
    },
    {
        day: 6,
        time: 'Daytime',
        id: '6-4',
        text: '你收到过去几天编号物品的合成报告。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '查看结果', score: 10 },
            { id: 'B', text: '删除报告', score: -10 },
            { id: 'C', text: '复制存档', score: 5 },
            { id: 'D', text: '公开给同事', score: -5 }
        ]
    },
    {
        day: 6,
        time: 'Daytime',
        id: '6-5',
        text: '你对AI提出以下三个问题：',
        rules: ['R6'],
        multi: true,
        options: [
            { id: 'A', text: '你是否有情绪模块', score: 5 },
            { id: 'B', text: '我是否还在梦中', score: 5 },
            { id: 'C', text: '你记得我们第一次对话吗', score: -10 },
            { id: 'D', text: '你知道伴侣是谁吗', score: 5 }
        ]
    },
    {
        day: 6,
        time: 'Daytime',
        id: '6-6',
        text: '你收到一张写着"实验体-001"的病历卡。',
        options: [
            { id: 'A', text: '保留记录', score: 10 },
            { id: 'B', text: '送去研究所', score: 5 },
            { id: 'C', text: '丢弃', score: -5 },
            { id: 'D', text: '质问AI', score: 2 }
        ]
    },
    {
        day: 6,
        time: 'Night',
        id: '6-7',
        text: '你回家后发现门口贴着"No.14"编码的纸条。',
        rules: ['R5'],
        options: [
            { id: 'A', text: '保留并存档', score: 10 },
            { id: 'B', text: '丢掉', score: -10 },
            { id: 'C', text: '放门后', score: 2 }
        ]
    },
    {
        day: 6,
        time: 'Night',
        id: '6-8',
        text: '夜里你再次看见镜中自己表情异常。',
        options: [
            { id: 'A', text: '敲碎镜子', score: -5 },
            { id: 'B', text: '保持注视', score: 10 },
            { id: 'C', text: '转身离开', score: 5 }
        ]
    },
    // Day 7
    {
        day: 7,
        time: 'Morning',
        id: '7-1',
        text: '起床后你发现自己日记第一页被撕掉。',
        options: [
            { id: 'A', text: '翻到后页重新记录', score: 5 },
            { id: 'B', text: '寻找第一页残骸', score: 5 },
            { id: 'C', text: '无视', score: 0 },
            { id: 'D', text: '质问AI', score: 2 }
        ]
    },
    {
        day: 7,
        time: 'Morning',
        id: '7-2',
        text: '早餐时伴侣说"今天我们要走到结局了"，你会？',
        rules: ['R6'],
        options: [
            { id: 'A', text: '什么都不说', score: 3 },
            { id: 'B', text: '问她是什么意思', score: -10 },
            { id: 'C', text: '沉默点头', score: 5 },
            { id: 'D', text: '给她一个拥抱', score: 5 }
        ]
    },
    {
        day: 7,
        time: 'Daytime',
        id: '7-3',
        text: '你收到系统终端访问权请求选择路径：',
        options: [
            { id: 'A', text: '进入AI主脑', score: 30 },
            { id: 'B', text: '备份现有数据', score: 10 },
            { id: 'C', text: '转交他人', score: 5 },
            { id: 'D', text: '中止操作', score: 0 }
        ]
    },
    {
        day: 7,
        time: 'Daytime',
        id: '7-4',
        text: '你手中已有No.01、03、07、10、14五个编号，是否执行合成？',
        options: [
            { id: 'A', text: '是', score: 50 },
            { id: 'B', text: '否', score: 0 }
        ]
    },
    {
        day: 7,
        time: 'Daytime',
        id: '7-5',
        text: '你与AI的最终对话，请选择两个话题：',
        multi: true,
        options: [
            { id: 'A', text: '你是否爱过人类', score: 5 },
            { id: 'B', text: '我是否早就死了', score: 5 },
            { id: 'C', text: '这一切是测试吗', score: 10 },
            { id: 'D', text: '你记得我的生日吗', score: -10 }
        ]
    },
    {
        day: 7,
        time: 'Daytime',
        id: '7-6',
        text: '你抵达墓园，携带实验文件，你会？',
        rules: ['结局路径'],
        options: [
            { id: 'A', text: '焚毁', score: 100, specialFlag: 'cemeteryBurn' },
            { id: 'B', text: '放入AI芯片', score: 150, specialFlag: 'cemeteryAI' },
            { id: 'C', text: '献祭于墓前', score: 200, specialFlag: 'cemeterySacrifice' }
        ]
    },
    {
        day: 7,
        time: 'Night',
        id: '7-7',
        text: '午夜时分你站在镜前，最后一次凝视自己。',
        options: [
            { id: 'A', text: '敲碎镜子', score: 0 },
            { id: 'B', text: '微笑', score: 5 },
            { id: 'C', text: '转身离开', score: 10 }
        ]
    },
    {
        day: 7,
        time: 'Night',
        id: '7-8',
        text: '伴侣出现在你身后轻声问："你还记得我吗？"',
        rules: ['R6'],
        options: [
            {
                id: 'A',
                text: '点头拥抱',
                dynamic: function(state) {
                    if (
                        state.verifiedRules &&
                        state.verifiedRules.includes('R1') &&
                        state.verifiedRules.includes('R2') &&
                        state.verifiedRules.includes('R3') &&
                        state.verifiedRules.includes('R5') &&
                        state.cognition >= 80 &&
                        state.specialFlags && state.specialFlags.cemeterySacrifice
                    ) {
                        return { ending: 'TRUE_TEARS', score: 200 };
                    }
                    return { ending: 'MECHANICAL_DAWN', score: 50 };
                }
            },
            {
                id: 'B',
                text: '反问她是谁',
                dynamic: function() { return { ending: 'SWEET_PRISONER' }; }
            },
            {
                id: 'C',
                text: '什么也不说',
                dynamic: function(state) {
                    if (state.deathCount >= 3 || state.cognition < 60) {
                        return { ending: 'MIRROR_LIFE' };
                    }
                    return { ending: 'MECHANICAL_DAWN' };
                }
            }
        ]
    }
];

// 游戏状态管理
const GAME_STATE = {
    currentDay: 1,
    currentQuestion: 0,
    score: 0,
    cognition: 0,
    deathCount: 0,
    verifiedRules: [],
    collectedNumbers: [],
    history: []
};

// 导出数据
export { RULES, ENDINGS, QUESTIONS, GAME_STATE }; 
