// 家教系統核心資料庫 - 數位科技概論（上）隨堂測驗卷 第 3 回
const TUTOR_DATA = {
  examInfo: {
    title: "數位科技概論（上）隨堂測驗卷 第 3 回",
    subtitle: "系統平台的組成架構—硬體",
    scope: "範圍：第 3 章",
    studentName: "李政緯",
    studentClass: "資科 一年仁班",
    seatNumber: "2",
    totalQuestions: 25,
    pointsPerQuestion: 4,
    totalScore: 76,
    maxScore: 100,
    correctCount: 19,
    wrongCount: 6,
    accuracyRate: 76,
    examImages: [
      {
        page: 1,
        title: "第 1 頁（第 1 ~ 13 題）",
        url: "899350674_1490948216259275_6363997134589521939_n.jpg",
        description: "包含五大單元概念、RAM/SRAM比較、MIPS指標、時脈與暫存器等"
      },
      {
        page: 2,
        title: "第 2 頁（第 14 ~ 25 題）",
        url: "901898433_1152997440553109_9218995532153585486_n.jpg",
        description: "包含輸出單元、CPU規格識別、SSD vs HDD、快取材質、AMOLED技術等"
      }
    ]
  },

  // 弱點維度雷達分析
  radarAnalysis: {
    categories: [
      { name: "電腦五大架構", total: 6, correct: 5, accuracy: 83.3, score: 83 },
      { name: "CPU效能與規格", total: 5, correct: 3, accuracy: 60.0, score: 60 },
      { name: "記憶體與快取階層", total: 6, correct: 4, accuracy: 66.7, score: 67 },
      { name: "次級儲存(SSD/HDD)", total: 3, correct: 2, accuracy: 66.7, score: 67 },
      { name: "周邊I/O與連接埠", total: 3, correct: 3, accuracy: 100.0, score: 100 },
      { name: "多媒體與顯示技術", total: 2, correct: 1, accuracy: 50.0, score: 50 }
    ],
    overallDiagnosis: "政緯同學在「周邊 I/O 與連接埠」以及「基本運算單元識別」表現優異（全對）。失分的核心瓶頸集中於三大板塊：① 記憶體材質階層（混淆了 SRAM、DRAM、ROM 與快取的對應關係）；② 儲存裝置特性（對 SSD 快閃記憶體與不需重組的物理特性生疏）；③ 規格單位的嚴謹換算（GHz 的 G 是十億而非億、MIPS 的 I 是 Instruction 指令）。",
    improvementPotential: "+24 分（透過本系統針對性觀念導正與 6 題靶向重測，可直達 100 分！）"
  },

  // 6大錯題深度診斷卡片
  wrongQuestionsAnalysis: [
    {
      id: 3,
      page: 1,
      title: "第 3 題：電腦硬體五大單元功能誤解",
      studentAns: "C",
      correctAns: "D",
      penalty: 4,
      topic: "電腦五大單元 — 記憶單元的真諦",
      teacherNote: "記憶是電腦存放程式與資料的地方",
      coreConcept: "范紐曼架構核心思想：內存程式概念（Stored-Program Concept）",
      whyWrong: "學生選擇了 (C)，誤以為算術邏輯單元(ALU)不承擔所有算術運算；而忽略了 (D) 選項中的絕對字眼『僅儲存輸入待處理之資料』！",
      deepExplanation: "記憶單元（內部記憶體）絕不『僅』儲存輸入的原始資料！它同時儲存：① 正在執行的應用程式指令代碼；② CPU 運算時的中間暫存變數；③ 準備輸出給輸出單元的結果資料。這是范紐曼（Von Neumann）最劃時代的貢獻——將程式指令與資料一同放在記憶單元中！",
      memoryTip: "💡 記憶口訣：『記憶單元像工作桌，程式、原料、半成品、完工品統統放桌上！』",
      actionGuidance: "只要看到選項出現『僅儲存輸入資料』，立刻辨識為錯誤陷阱！"
    },
    {
      id: 10,
      page: 1,
      title: "第 10 題：CPU 效能指標 MIPS 的英文縮寫",
      studentAns: "A",
      correctAns: "B",
      penalty: 4,
      topic: "CPU 效能衡量指標 — MIPS",
      teacherNote: "MIPS = Million Instructions Per Second",
      coreConcept: "MIPS 的 I 代表「Instruction（指令）」而非 Information（資訊）",
      whyWrong: "學生看到 I 直覺聯想到資訊科學的『Information』或輸入『Input』，掉入了生活化字彙的認知陷阱。",
      deepExplanation: "MIPS 代表 Million Instructions Per Second（每秒鐘可執行的百萬個指令數）。這是衡量處理器整數運算速率的經典標準。常考對比：\n• MFLOPS：Million Floating-point Operations Per Second（每秒百萬次浮點運算，專指小數/科學運算）\n• CPI：Cycles Per Instruction（每個指令平均消耗的時脈週期數）\n• 時脈週期 (Clock Cycle) 與 時脈頻率 (Clock Rate)。",
      memoryTip: "💡 記憶口訣：『MIPS 考指令（Instruction），FLOPS 考浮點（Floating-point）』！",
      actionGuidance: "看到 MIPS，在題目上直接寫下『百萬指令/秒』，鎖定 Instruction！"
    },
    {
      id: 15,
      page: 2,
      title: "第 15 題：CPU 規格 2.80GHz 的時脈單位換算",
      studentAns: "D",
      correctAns: "C",
      penalty: 4,
      topic: "硬體規格識讀與單位數量級換算",
      teacherNote: "G = 10^9 = 十億，2.80GHz = 每秒28億次",
      coreConcept: "十進位數量級前綴：K (千) $\\to$ M (百萬) $\\to$ G (十億) $\\to$ T (兆)",
      whyWrong: "學生知道 2.80GHz 與石英振盪器震盪次數有關，但看選 (D)『2.80億次』漏掉了十倍！2.80 GHz 是 28 億次，而不是 2.80 億次！",
      deepExplanation: "題目給出 Intel Core i7-1165G7 2.80GHz：\n1. Intel 是『製造廠商』，非產品型號（A錯）。\n2. Core i7-1165G7 是『CPU 型號』，非製造廠商（B錯）。\n3. 2.80 GHz：1 Hz = 每秒 1 次；1 GHz = 10^9 Hz = 10 億次 (1,000,000,000 次)。因此 2.80 GHz 代表每秒振盪 28 億次（即 2.80 × 10 億次），選項 D 寫『2.80 億次』少了一個 0！\n4. 選項 (C)『CPU 的時脈頻率為 2.80GHz』陳述完全正確且直接！",
      memoryTip: "💡 記憶口訣：『K千、M百萬、G十億、T萬億(兆)』，Giga 是十億，不是億！",
      actionGuidance: "做規格題時，先把正確敘述 (C) 標出來，遇到計算數量級時在旁邊寫下 10^9 仔細核對中文單位！"
    },
    {
      id: 16,
      page: 2,
      title: "第 16 題：固態硬碟 (SSD) 與機械硬碟 (HDD) 比較",
      studentAns: "A",
      correctAns: "D",
      penalty: 4,
      topic: "儲存裝置物理構造與維護常識",
      teacherNote: "SSD 採用快閃記憶體，壽命有限且無尋道時間，不須磁碟重組",
      coreConcept: "SSD 快閃記憶體晶片存取 vs HDD 磁頭馬達機械旋轉",
      whyWrong: "學生選了 (A)『HDD 中的儲存元件是採用快閃記憶體』，把 SSD 與 HDD 的媒介完全記反了！",
      deepExplanation: "對比分析：\n• SSD（固態硬碟）：採用快閃記憶體（NAND Flash），無機械運動、抗震、無旋轉尋軌延遲，但有寫入抹除壽命限制（P/E 次數）。零散檔案對 SSD 讀取速度幾乎無損，且重組會帶來龐大無效寫入加速損耗，因此『SSD 絕不需要磁碟重組』！（D正確）\n• HDD（傳統硬碟）：採用鋁/玻璃磁盤、精密馬達與機械讀寫頭。需要尋軌時間 (Seek Time) 與旋轉延遲 (Rotational Latency)，檔案零碎時需要磁碟重組以減少磁頭來回擺動。",
      memoryTip: "💡 記憶口訣：『SSD 固態像隨身碟用晶片，耐震免重組；HDD 機械有磁盤馬達，震動會壞軌！』",
      actionGuidance: "看到『快閃記憶體』配 HDD 直接打叉；看到『SSD 磁碟重組』直接判定為有害無益！"
    },
    {
      id: 17,
      page: 2,
      title: "第 17 題：快取記憶體 (Cache Memory) 的硬體材質",
      studentAns: "C",
      correctAns: "D",
      penalty: 4,
      topic: "記憶體階層與半導體材料特性",
      teacherNote: "SRAM 成本高、速度極快，專門用作快取記憶體",
      coreConcept: "SRAM 靜態隨機存取記憶體是快取記憶體的唯一首選材料",
      whyWrong: "學生選了 (C) ROM。ROM 是唯讀記憶體，用來燒錄韌體（如主機板 UEFI/BIOS），速度極慢且通常不能即時高速改寫，根本不可能拿來做快取！",
      deepExplanation: "快取記憶體 (Cache) 的使命是『解決 CPU 極致運算速度與主記憶體 (DRAM) 相對緩慢速度之間的巨大落差』。\n• SRAM（靜態 RAM）：利用雙穩態正反器電路（每 bit 需 4~6 個電晶體），不需週期性充電刷新，速度極快（奈秒級），但構造複雜、成本高、佔晶片面積，因此做成容量較小但極速的快取（L1/L2/L3 Cache）。\n• DRAM（動態 RAM）：利用單顆電晶體加微小電容，電容漏電必須每秒充電數百次（Refresh），速度較慢但便宜、積體度極高，適合做大容量的主記憶體。",
      memoryTip: "💡 記憶口訣：『SRAM 快速貴，Cache 當快取；DRAM 慢要充電，買來插主機板！』",
      actionGuidance: "在題目看到『快取記憶體 (Cache) 材質』，眼睛直接找 SRAM！"
    },
    {
      id: 22,
      page: 2,
      title: "第 22 題：AMOLED 螢幕技術材料",
      studentAns: "B",
      correctAns: "C",
      penalty: 4,
      topic: "顯示設備技術 — AMOLED 原理",
      teacherNote: "AMOLED = 主動矩陣有機發光二極體 (Organic Light-Emitting Diode)",
      coreConcept: "OLED / AMOLED 具備「有機材料自發光」特性，不需背光模組",
      whyWrong: "學生選了 (B) 液晶。液晶螢幕是 LCD（Liquid Crystal Display），學生混淆了 LCD 與 OLED 兩種截然不同的顯示原理！",
      deepExplanation: "拆解 AMOLED 英文名詞：\n• AM：Active Matrix（主動矩陣式驅動）\n• O：Organic（有機化合物）\n• LED：Light-Emitting Diode（發光二極體）\nAMOLED 最大特色就是每一個像素都是自發光的『有機發光二極體』，不需要像液晶 (LCD) 那樣在背後放一層厚重的 LED 背光板。當顯示純黑色時像素完全關閉不發光，因此黑色極純、對比度極高、色彩鮮豔且可彎曲！",
      memoryTip: "💡 記憶口訣：『OLED 的 O 是 Organic 有機，LED 是發光二極體；LCD 才是液晶！』",
      actionGuidance: "看到 AMOLED / OLED，找『有機發光二極體』，別被『液晶』騙去！"
    }
  ],

  // 全卷 25 題完整資料庫
  allQuestions: [
    {
      id: 1,
      page: 1,
      question: "隨機存取記憶體 (RAM) 區分為動態隨機存取記憶體 (DRAM) 及靜態隨機存取記憶體 (SRAM) 兩種，請問下列哪一項是SRAM優於DRAM的特點？",
      options: {
        A: "單位資料的存取速度較快",
        B: "單位面積所能儲存資料量較小",
        C: "需要持續充電更新 (refresh)，才能確保資料完整",
        D: "每單位資料的儲存成本較低"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "記憶體與快取階層",
      explanation: "SRAM（靜態RAM）存取速度遠快於DRAM，且不需要定期充電更新(Refresh)。B、D是SRAM的缺點（容量小、成本高），C是DRAM的缺點。"
    },
    {
      id: 2,
      page: 1,
      question: "傑克將iPhone手機拍攝的照片轉存到電腦中，並列印出來與朋友分享。請問列印設備在電腦的五大單元中，是歸屬為下列哪一種單元？",
      options: {
        A: "控制單元",
        B: "輸入單元",
        C: "輸出單元",
        D: "記憶單元"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "印表機將電腦處理後的照片實體呈現，屬於電腦五大單元中的「輸出單元 (Output Unit)」。"
    },
    {
      id: 3,
      page: 1,
      question: "下列對於電腦硬體五大單元的敘述何者有誤？",
      options: {
        A: "輸入單元：待處理的資料須經由此單元進入電腦",
        B: "輸出單元：處理完成之資料由此單元送出",
        C: "算術邏輯單元：所有的算術運算均在此單元完成",
        D: "記憶單元：僅儲存輸入待處理之資料"
      },
      studentAns: "C",
      correctAns: "D",
      isCorrect: false,
      category: "電腦五大架構",
      explanation: "錯誤的是 (D)。記憶單元（內部記憶體）依照范紐曼架構，不僅儲存輸入的原始資料，也儲存「程式指令」以及「處理後的中間結果與最終輸出資料」，絕非『僅』儲存輸入資料！"
    },
    {
      id: 4,
      page: 1,
      question: "電腦基本架構中有數個主要的組成單元(或部門)，其中負責存放電腦程式與資料的單元是：",
      options: {
        A: "算術與邏輯單元",
        B: "輸入單元",
        C: "記憶單元",
        D: "控制單元"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "負責存放電腦程式指令與運行資料的單元即為「記憶單元 (Memory Unit)」。"
    },
    {
      id: 5,
      page: 1,
      question: "在電腦的組成單元中，下列哪兩個單元合稱為中央處理單元？",
      options: {
        A: "輸入單元及控制單元",
        B: "控制單元及算術／邏輯單元",
        C: "輸入單元及輸出單元",
        D: "算術／邏輯單元及記憶單元"
      },
      studentAns: "B",
      correctAns: "B",
      isCorrect: true,
      category: "CPU效能與規格",
      explanation: "CPU（中央處理單元）主要由「控制單元 (CU)」與「算術邏輯單元 (ALU)」構成，並內建暫存器組與內部匯流排。"
    },
    {
      id: 6,
      page: 1,
      question: "請問所謂的I/O指的是",
      options: {
        A: "1跟0",
        B: "物聯網(IoT)",
        C: "輸入與輸出",
        D: "整合式辦公室系統 (integrated office system)"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "周邊I/O與連接埠",
      explanation: "I/O 即 Input / Output，中文翻譯為「輸入與輸出」。"
    },
    {
      id: 7,
      page: 1,
      question: "關於「熱插拔」的敘述，何者為真？",
      options: {
        A: "只能在開機的情況下插拔",
        B: "只能在關機的情況下插拔",
        C: "在關機及開機的情況下皆可插拔",
        D: "只有當主機溫度高於一定溫度時才可插拔"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "周邊I/O與連接埠",
      explanation: "熱插拔 (Hot Swapping) 代表在主機開機通電運行時即可直接拔插設備（如USB隨身碟），關機狀態當然也可以插拔，因此開機與關機皆可插拔。"
    },
    {
      id: 8,
      page: 1,
      question: "阿布想要為自己的筆記型電腦擴充2G的RAM，請問他應該將RAM安插在下列哪一種插槽？",
      options: {
        A: "記憶體插槽",
        B: "PCI-E插槽",
        C: "CPU插槽",
        D: "M.2插槽"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "記憶體與快取階層",
      explanation: "筆記型電腦的RAM（主記憶體）需插在主機板上的記憶體插槽（SO-DIMM 插槽）。"
    },
    {
      id: 9,
      page: 1,
      question: "微軟公司在台灣成立了亞洲第一座「雲端運算」中心，以整合電腦的運算資源，來提供給國內各項創新研究計畫使用。一般而言，研究計畫都需要大量的運算，包括計算、比對、配對等不同的處理，請問電腦中負責這些運算工作的是下列哪一個單元？",
      options: {
        A: "CU",
        B: "MU",
        C: "ALU",
        D: "OU"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "CPU效能與規格",
      explanation: "負責數值四則運算與邏輯比對/配對的單元是 ALU（Arithmetic Logic Unit，算術邏輯單元）。"
    },
    {
      id: 10,
      page: 1,
      question: "MIPS為一種衡量電腦CPU之測量指標，其中I代表：",
      options: {
        A: "資訊 (Information)",
        B: "指令 (Instruction)",
        C: "輸入 (Input)",
        D: "內部 (Internal)"
      },
      studentAns: "A",
      correctAns: "B",
      isCorrect: false,
      category: "CPU效能與規格",
      explanation: "錯誤的是 (A)。MIPS 的全稱是 Million Instructions Per Second（每秒執行百萬個指令數），因此 I 代表的是「Instruction（指令）」。"
    },
    {
      id: 11,
      page: 1,
      question: "在「星際迷航記」影集中，船長寇克領導眾船員一同探索宇宙，當遇上危機時，船長便會指揮船員完成各自的工作，並引導船員們脫離險境。請問若以船長扮演的角色來看，可比喻成電腦的哪一個單元最恰當？",
      options: {
        A: "輸入單元",
        B: "記憶單元",
        C: "輸出單元",
        D: "控制單元"
      },
      studentAns: "D",
      correctAns: "D",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "船長負責統籌決策與指揮協調所有成員，正如控制單元 (Control Unit, CU) 負責發出指令控制信號協調電腦各單元運作。"
    },
    {
      id: 12,
      page: 1,
      question: "志華購買了一台安插8GB記憶體的64位元電腦，下列有關該台電腦的敘述何者正確？",
      options: {
        A: "8GB指的是快取記憶體的容量",
        B: "一般用途暫存器的位元數為8GB",
        C: "CPU時脈頻率為64位元",
        D: "64位元指的是一般用途暫存器的位元數"
      },
      studentAns: "D",
      correctAns: "D",
      isCorrect: true,
      category: "CPU效能與規格",
      explanation: "64位元電腦指的是CPU內部一般用途暫存器 (Registers) 或內部資料匯流排一次能處理的二進位位元寬度為 64 bit。8GB 指的是主記憶體 (RAM) 容量。"
    },
    {
      id: 13,
      page: 1,
      question: "高雄六龜區為了成立社區數位機會中心 (digital opportunity center)，打算將原社區教室的電腦全數移轉至該中心。如果你是數位機會中心的電腦管理員，為了要提升這些電腦的執行效能，下列何者最不可能是你優先考慮要更換的設備或元件？",
      options: {
        A: "CPU",
        B: "主記憶體",
        C: "顯示卡",
        D: "鍵盤"
      },
      studentAns: "D",
      correctAns: "D",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "鍵盤僅屬於外接輸入設備，更換鍵盤無法提升電腦本身的運算與資料處理效能；而升級CPU、記憶體與顯卡能顯著提升效能。"
    },
    {
      id: 14,
      page: 2,
      question: "電腦的基本架構可分為五大單元，其中輸出單元 (output unit) 的功用為？",
      options: {
        A: "接收使用者所輸入的資料",
        B: "執行程式和處理資料",
        C: "進行算術運算與邏輯運算",
        D: "將資料輸出到顯示器或儲存媒體"
      },
      studentAns: "D",
      correctAns: "D",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "輸出單元的作用是將電腦運算處理完的結果傳遞出來，顯示於螢幕、印表機列印或寫入儲存媒體等。"
    },
    {
      id: 15,
      page: 2,
      question: "聯想推出搭載Intel Core i7-1165G7 2.80GHz CPU的「變形筆電」，這種筆電的螢幕可以360度翻轉，變身為平板電腦。請根據以上敘述判斷下列何者正確？",
      options: {
        A: "Intel為CPU的產品型號",
        B: "Core i7-1165G7為CPU的製造廠商",
        C: "CPU的時脈頻率為2.80GHz",
        D: "石英振盪器每秒振盪2.80億次"
      },
      studentAns: "D",
      correctAns: "C",
      isCorrect: false,
      category: "CPU效能與規格",
      explanation: "錯誤的是 (D)。2.80GHz 的 G 代表 10^9（十億），因此石英振盪器每秒振盪 28 億次，選項 D 寫 2.80 億次少了十倍！(A) Intel 是製造廠商；(B) Core i7-1165G7 是產品型號；故唯有 (C) 正確。"
    },
    {
      id: 16,
      page: 2,
      question: "有關固態硬碟 (solid state disk, SSD) 與傳統機械硬碟 (hard disk, HDD) 的敘述，下列何者正確？",
      options: {
        A: "HDD中的儲存元件是採用快閃記憶體",
        B: "SSD採用低噪音馬達驅動讀寫頭並具抗震特點",
        C: "HDD沒有旋轉及搜尋資料時間，僅須考量資料傳輸時間",
        D: "SSD在經過長時間及多次使用致使內部儲存資料零散，仍可不須進行磁碟重組"
      },
      studentAns: "A",
      correctAns: "D",
      isCorrect: false,
      category: "次級儲存(SSD/HDD)",
      explanation: "錯誤的是 (A)。SSD 才是採用快閃記憶體。SSD 是半導體晶片電子定址，沒有磁頭機械擺動與碟片旋轉時間，檔案碎片幾乎不影響讀取效能；且 SSD 有寫入壽命限制，磁碟重組會大量無謂寫入消耗壽命，因此 SSD 絕不需要磁碟重組（D正確）。"
    },
    {
      id: 17,
      page: 2,
      question: "為了減少對主記憶體的存取次數，以提升電腦整體執行速度，個人電腦的快取記憶體 (cache memory) 通常以下列何者為材質？",
      options: {
        A: "DRAM",
        B: "EPROM",
        C: "ROM",
        D: "SRAM"
      },
      studentAns: "C",
      correctAns: "D",
      isCorrect: false,
      category: "記憶體與快取階層",
      explanation: "快取記憶體 (Cache) 為了跟上 CPU 的極速運作，採用存取速度最快、不需充電刷新的靜態隨機存取記憶體 (SRAM)。ROM 是唯讀記憶體，速度極慢且不能高速隨意改寫，不可作為快取。"
    },
    {
      id: 18,
      page: 2,
      question: "加、減、乘、除是程式中常需進行的算術運算，請問在電腦中負責這些運算處理的是哪一個單元？",
      options: {
        A: "算術邏輯單元",
        B: "控制單元",
        C: "輸出單元",
        D: "輸入單元"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "電腦五大架構",
      explanation: "加減乘除為四則算術運算，統統由 CPU 內的「算術邏輯單元 (ALU)」執行。"
    },
    {
      id: 19,
      page: 2,
      question: "民眾只要持悠遊卡在台鐵剪票口刷卡，就可以進入月台搭車，且可隨時在全家超商等處利用儲值設備進行悠遊卡的加值。請問悠遊卡最可能是利用下列哪一種元件來儲存資料？",
      options: {
        A: "DRAM",
        B: "EEPROM",
        C: "PROM",
        D: "HDD"
      },
      studentAns: "B",
      correctAns: "B",
      isCorrect: true,
      category: "記憶體與快取階層",
      explanation: "悠遊卡為非接觸式 RFID 晶片卡，需要斷電後資料仍保存（非揮發性），且能透過電子訊號多次抹除並改寫金額，因此採用 EEPROM 或快閃記憶體技術。"
    },
    {
      id: 20,
      page: 2,
      question: "高雄在光華數位新天地買了一部桌上型電腦，此機配備了如選項中的四種記憶或儲存裝置，請問它們中何者之存取速度最快？",
      options: {
        A: "快取記憶體 (cache)",
        B: "輔助記憶體－固態硬碟 (SSD)",
        C: "主記憶體 (DRAM)",
        D: "輔助記憶體－硬碟 (HDD)"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "記憶體與快取階層",
      explanation: "電腦記憶體存取速度階層：暫存器 > 快取記憶體 (SRAM) > 主記憶體 (DRAM) > 固態硬碟 (SSD) > 機械硬碟 (HDD)。故快取記憶體最快。"
    },
    {
      id: 21,
      page: 2,
      question: "MacBook Air採用固態硬碟大幅降低機身的厚度，機身最薄處僅0.3公分，請問該筆電採用的固態硬碟與傳統硬碟，差異為何？",
      options: {
        A: "固態硬碟的體積較大",
        B: "傳統硬碟的耐震度較佳",
        C: "固態硬碟是使用快閃記憶體來作為儲存元件",
        D: "傳統硬碟的儲存容量通常較小"
      },
      studentAns: "C",
      correctAns: "C",
      isCorrect: true,
      category: "次級儲存(SSD/HDD)",
      explanation: "SSD 是使用半導體快閃記憶體（Flash Memory）作為儲存媒介，無碟片與馬達，故能做到超輕薄且耐震。"
    },
    {
      id: 22,
      page: 2,
      question: "三星公司推出的某款Android智慧型手機，宣稱採用AMOLED技術，可使螢幕色彩更加鮮豔，請問此款手機的螢幕最可能是採用下列哪一種材質所製成的？",
      options: {
        A: "陰極射線管",
        B: "液晶",
        C: "有機發光二極體",
        D: "電漿"
      },
      studentAns: "B",
      correctAns: "C",
      isCorrect: false,
      category: "多媒體與顯示技術",
      explanation: "錯誤的是 (B)。AMOLED 是 Active Matrix Organic Light-Emitting Diode 的縮寫，其中的 O 代表「Organic（有機）」，LED 代表「Light-Emitting Diode（發光二極體）」，中文即為「有機發光二極體」。液晶是 LCD。"
    },
    {
      id: 23,
      page: 2,
      question: "玟芳想要自己挑選一台印表機，如果她對列印品質的要求特別高，請問當她在購買時，應特別考量下列哪一項印表機的規格？",
      options: {
        A: "解析度",
        B: "外殼顏色",
        C: "尺寸大小",
        D: "重量"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "多媒體與顯示技術",
      explanation: "列印品質由「解析度」決定，單位通常為 dpi（dots per inch，每英吋點數），dpi 數值越高，列印出來的圖像線條越細緻逼真。"
    },
    {
      id: 24,
      page: 2,
      question: "裕書的筆記型電腦內建有Type C、HDMI、line out等連接埠，下列為他使用些連接埠的操作，請問何者不正確？",
      options: {
        A: "利用line out連接埠來上網",
        B: "利用Type C連接埠來為手機充電",
        C: "利用Type C連接埠將手機中的資料傳送至電腦",
        D: "利用HDMI連接埠將手機畫面傳送至電視播放"
      },
      studentAns: "A",
      correctAns: "A",
      isCorrect: true,
      category: "周邊I/O與連接埠",
      explanation: "line out 連接埠是音訊輸出孔（連接喇叭或耳機），無法傳輸網路數據來上網。上網須透過 RJ-45 網路線孔或 Wi-Fi 無線網路。"
    },
    {
      id: 25,
      page: 2,
      question: "史記：「秦始皇三十四年，丞相李斯上言儒生是古非今，反對批評朝政、法令，因此建議除了秦記、醫藥、卜筮、種樹等書外，一律燒毀」。請問，如果在秦朝即擁有現代的資訊科技，則可利用下列哪一種設備，將書籍內容數位化，以便備份起來？",
      options: {
        A: "印表機",
        B: "QLED液晶螢幕",
        C: "滑鼠",
        D: "掃描器"
      },
      studentAns: "D",
      correctAns: "D",
      isCorrect: true,
      category: "周邊I/O與連接埠",
      explanation: "掃描器 (Scanner) 是輸入設備，能把實體紙本書籍文件掃描轉成數位影像檔案保存。"
    }
  ],

  // 靶向強化測驗（針對6大錯題精心設計的模擬檢測題庫）
  remedialQuiz: [
    {
      id: 1,
      targetWrongId: 3,
      concept: "電腦五大單元 — 記憶單元的功能",
      question: "關於范紐曼（Von Neumann）架構中的「記憶單元（Memory Unit）」，下列敘述何者最完整正確？",
      options: {
        A: "僅能儲存由輸入設備送進來的原始未處理資料",
        B: "同時儲存「執行中的程式指令」與「運算所需的資料」",
        C: "只包含次級儲存體（如外接硬碟），不包含主記憶體與快取",
        D: "能直接取代算術邏輯單元(ALU)進行數值四則運算"
      },
      correctAns: "B",
      hint: "回想范紐曼架構最核心的『內存程式』概念：程式指令也是資料的一種！",
      explanation: "正解為 (B)。現代電腦最重要的特色就是「內存程式概念（Stored-Program Concept）」，將程式碼指令與資料一併存放於記憶單元中，CPU 再依序抓取解碼執行。(A) 的『僅』是典型考試陷阱！"
    },
    {
      id: 2,
      targetWrongId: 10,
      concept: "CPU 運算效能指標 — MIPS 與 FLOPS",
      question: "在衡量電腦或超級電腦的運算速度時，下列各項指標與意義的配對，何者完全正確？",
      options: {
        A: "MIPS：Million Information Per Second（每秒處理百萬筆資訊）",
        B: "MIPS：Million Instructions Per Second（每秒執行百萬個指令）",
        C: "FLOPS：File Loading Operations Per Second（每秒檔案讀取次數）",
        D: "CPI：Cycles Per Instruction，數值越高表示 CPU 執行指令越有效率"
      },
      correctAns: "B",
      hint: "MIPS 的 I 到底是指『指令 (Instruction)』還是『資訊 (Information)』？",
      explanation: "正解為 (B)。MIPS 是 Million Instructions Per Second（每秒執行百萬個指令）。FLOPS 是浮點運算次數 (Floating-point Operations Per Second)。CPI 是每個指令耗費週期，數值越低越快！"
    },
    {
      id: 3,
      targetWrongId: 15,
      concept: "時脈頻率數量級換算 (GHz / MHz)",
      question: "某台電競桌機搭載基準時脈頻率為 3.60 GHz 的高階處理器，請問這代表其內部石英振盪器每秒振盪大約幾次？",
      options: {
        A: "3.60 萬次 (3.6 × 10^4 次)",
        B: "3.60 百萬次 (3.6 × 10^6 次)",
        C: "3.60 億次 (3.6 × 10^8 次)",
        D: "36 億次 (3.6 × 10^9 次，即 3.60 十億次)"
      },
      correctAns: "D",
      hint: "Kilo = 千(10^3)，Mega = 百萬(10^6)，Giga = 十億(10^9)！注意『億』跟『十億』的差別！",
      explanation: "正解為 (D)。1 GHz = 10^9 Hz = 1,000,000,000 Hz（十億赫茲）。因此 3.60 GHz 代表每秒振盪 3.60 × 10^9 次 = 36 億次（3.60 十億次）。絕對不要被中文的『億』騙了！"
    },
    {
      id: 4,
      targetWrongId: 16,
      concept: "固態硬碟 SSD 特性與磁碟重組觀念",
      question: "小明為筆記型電腦換裝了 NVMe 固態硬碟 (SSD)，關於 SSD 的使用特點與保養觀念，下列敘述何者最正確？",
      options: {
        A: "SSD 內部儲存元件是快閃記憶體晶片，資料零散時不影響存取速度，且重組會消耗寫入壽命，故不須也不應重組",
        B: "SSD 採用高速馬達與微型磁頭，運轉中震動可能造成磁頭刮傷碟片",
        C: "SSD 長時間使用後必須每週執行一次磁碟重組，才能保持最高讀寫速度",
        D: "SSD 的資料存取延遲主要來自尋軌時間 (Seek Time) 與旋轉延遲"
      },
      correctAns: "A",
      hint: "固態硬碟有機械零件嗎？快閃記憶體有壽命限制嗎？磁碟重組的目的是什麼？",
      explanation: "正解為 (A)。SSD 採用 NAND Flash 快閃記憶體，透過晶片電路隨機定址，根本沒有機械臂尋軌與旋轉延遲，零散存取依然極快；且每次重組會大量擦寫 Flash，浪費有限的 P/E 次數，故 SSD 絕不須進行磁碟重組！"
    },
    {
      id: 5,
      targetWrongId: 17,
      concept: "快取記憶體 (Cache) 材質 — SRAM 特性",
      question: "電腦架構中為縮小 CPU 核心與主記憶體之間的運算速度鴻溝，設置了 L1/L2/L3 快取記憶體。快取記憶體普遍採用下列何種材質？",
      options: {
        A: "DRAM（動態隨機存取記憶體，需電容週期性充電刷新）",
        B: "SRAM（靜態隨機存取記憶體，速度極快、不需充電刷新）",
        C: "EEPROM（電子抹除式唯讀記憶體，主要用在悠遊卡與BIOS）",
        D: "Mask ROM（唯讀記憶體，出廠後即無法寫入）"
      },
      correctAns: "B",
      hint: "速度最快、構造複雜、成本較高、不需要持續充電刷新的 RAM 是哪一種？",
      explanation: "正解為 (B)。SRAM (Static RAM) 利用正反器儲存資料，只要通電就不需週期刷新，反應時間僅需數奈秒，速度最快，是快取記憶體唯一指定材質；DRAM 則用作大容量主記憶體。"
    },
    {
      id: 6,
      targetWrongId: 22,
      concept: "顯示器技術 — AMOLED / OLED 材質",
      question: "旗艦手機常配備的 AMOLED 螢幕，其名稱中的「OLED」代表什麼技術與發光特性？",
      options: {
        A: "液晶顯示技術，利用液晶分子扭轉偏光，需靠背光板發光",
        B: "有機發光二極體，具有自發光特性，不需背光模組即可呈現高對比與純黑",
        C: "陰極射線管技術，體積龐大且需要高壓電子槍",
        D: "量子點液晶技術，本質上仍然需要大面積冷陰極背光燈管"
      },
      correctAns: "B",
      hint: "OLED 的『O』是 Organic（有機），LED 是發光二極體。它是自發光還是要靠背光？",
      explanation: "正解為 (B)。OLED = Organic Light-Emitting Diode（有機發光二極體），每個像素都是能自己發光的有機薄膜材料，黑畫面時像素全關達到真正純黑，無需背光板，故機身更輕薄、對比極高！"
    }
  ],

  // 預設常見問題與家教對話知識庫
  tutorKnowledge: [
    {
      keywords: ["重組", "ssd", "硬碟", "固態硬碟", "壽命"],
      reply: "【小智老師解惑】這題是很多同學容易犯的直覺錯誤！\n\n傳統機械硬碟 (HDD) 是用磁頭在旋轉的磁盤上找資料，如果檔案碎成一片一片，磁頭就要來回跑（尋軌時間變長），所以需要『磁碟重組』把檔案排整齊。\n\n但 SSD（固態硬碟）完全沒有馬達或磁頭，它是像隨身碟一樣的『快閃記憶體 (Flash Memory)』晶片，用電子訊號直接定址，存取零碎檔案的速度跟連續檔案幾乎一樣快！更關鍵的是，快閃記憶體有『寫入抹除次數壽命（P/E Cycle）』，你對 SSD 做磁碟重組，等於在逼它無謂地瘋狂搬移寫入資料，大大加速硬碟老化！因此：『SSD 絕對不要做磁碟重組！』"
    },
    {
      keywords: ["sram", "dram", "快取", "主記憶體", "記憶體", "差別"],
      reply: "【小智老師解惑】SRAM 和 DRAM 的對決是統測與各類資訊考試的必考題！老師教你一秒分辨：\n\n1. **SRAM (Static RAM，靜態)**：\n   • 結構：正反器（4~6顆電晶體）\n   • 特性：不用充電更新、速度超級快！\n   • 缺點：貴、體積大、容量小\n   • 職位：**快取記憶體 (Cache)**\n\n2. **DRAM (Dynamic RAM，動態)**：\n   • 結構：1顆電晶體 + 1個小電容\n   • 特性：電容會漏電，必須一直『充電刷新 (Refresh)』！速度較慢\n   • 優點：便宜、積體度高、容量大\n   • 職位：**主記憶體 (RAM)**\n\n口訣記起來：『SRAM 快速貴當快取，DRAM 漏電刷新做主存』！"
    },
    {
      keywords: ["ghz", "單位", "時脈", "十億", "百萬", "15題", "換算"],
      reply: "【小智老師解惑】第15題被扣分真的很可惜！政緯你懂時脈原理，但栽在『中文數量級』的文字陷阱裡：\n\n請牢記四大天王前綴：\n• **K (Kilo)** = 10^3 = 一千\n• **M (Mega)** = 10^6 = 一百萬\n• **G (Giga)** = 10^9 = **十億**（不是一億喔！）\n• **T (Tera)** = 10^12 = 一兆\n\n所以題目說 2.80 GHz = 2.80 × 10^9 Hz = 每秒振盪 **28 億次**（或 2.80 個『十億次』）。選項寫『2.80 億次』差了足足十倍！下次回頭看題目，直覺選 (C)『時脈為2.80GHz』才是最保險正確的敘述！"
    },
    {
      keywords: ["mips", "cpu", "指標", "flops", "10題", "指令"],
      reply: "【小智老師解惑】第10題考的是 MIPS 縮寫：\n\n• **M** = Million (百萬)\n• **I** = **Instructions (指令)** $\\leftarrow$ 絕不是 Information (資訊) 或 Input！\n• **P** = Per (每)\n• **S** = Second (秒)\n\n整句就是『每秒執行幾百萬個指令』，專門用來測 CPU 的整數指令處理速度。\n\n補充必背兄弟檔：\n• **MFLOPS** = Million **Floating-point** Operations Per Second（每秒百萬次浮點/小數運算，測科學繪圖與AI運算）！"
    },
    {
      keywords: ["amoled", "oled", "lcd", "液晶", "螢幕", "22題"],
      reply: "【小智老師解惑】政緯在第22題選了『液晶』，這是最常見的混淆！\n\n• **LCD (Liquid Crystal Display)**：才是『液晶』！液晶本身不會發光，後面必須裝一整片 LED 背光燈板。\n• **AMOLED / OLED**：其中的 **O** 是 **Organic（有機）**，**LED** 是 **發光二極體**！\n\n它最厲害的地方在於『像素自發光』！顯示黑色時，紅綠藍發光二極體直接熄滅不亮，所以能展現最純粹的極致黑、對比度超高，而且少了背光板，螢幕可以做得很薄甚至能折疊彎曲！"
    },
    {
      keywords: ["五大單元", "記憶單元", "范紐曼", "3題", "儲存"],
      reply: "【小智老師解惑】第3題題目問『何者有誤』，選項 (D) 寫『僅儲存輸入待處理之資料』，錯在那個『僅』字！\n\n電腦的五大單元（輸入、輸出、控制CU、算術邏輯ALU、記憶MU）：\n記憶單元就像廚房的備料大理石台，廚師（CPU）切好的半成品要放、煮好的菜要放、甚至廚師手上的『食譜秘笈（程式碼指令）』也要攤在上面看！\n\n這就是電腦科學之父范紐曼提出的『內存程式概念（Stored-Program Concept）』：記憶體裡面裝著**程式碼指令**與**資料**，兩者兼備，絕不是只有輸入進來的生料！"
    }
  ]
};

