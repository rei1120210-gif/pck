// EduSmart AI 家教輔導系統 交互控制邏輯

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

let radarChartInstance = null;
let quizState = {
  currentIndex: 0,
  answers: {}, // questionId: selectedOption
  submitted: {}, // questionId: boolean
  isFinished: false
};

let chatMessages = [
  {
    sender: "tutor",
    text: "政緯同學你好！我是你的 AI 資訊科技家教「小智老師」。我已經深度分析了你這次《數位科技概論》第 3 回硬體篇的試卷（得分 76 分）。你對周邊 I/O 與基礎五大單元掌握得很穩，失分的 6 題主要集中在「記憶體快取材質 (SRAM)」、「SSD 與 HDD 物理特性」、「單位數量級換算 (GHz)」以及「AMOLED 技術」。你可以點選下方的快捷提問，或是直接輸入你想問的問題，老師隨時為你詳細解說！",
    time: "剛剛"
  }
];

function initApp() {
  renderStudentHeader();
  setupNavigation();
  renderOverviewTab();
  renderWrongQuestionsTab();
  renderTutorTab();
  renderQuizTab();
  renderAllQuestionsTab();
  renderPaperTab();
  setupImageModal();
}

// 1. 頂部學生資訊
function renderStudentHeader() {
  const info = TUTOR_DATA.examInfo;
  document.getElementById("student-title").textContent = info.title;
  document.getElementById("student-subtitle").textContent = `${info.subtitle}（${info.scope}）`;
  document.getElementById("student-badge").innerHTML = `
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
      <i class="fa-solid fa-user-graduate mr-1.5"></i> ${info.studentClass} ｜ ${info.studentName} (${info.seatNumber}號)
    </span>
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
      <i class="fa-solid fa-award mr-1.5"></i> 實得：${info.totalScore} 分 (扣 24 分)
    </span>
    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
      <i class="fa-solid fa-bullseye mr-1.5"></i> 正確率：${info.accuracyRate}% (19/25 題)
    </span>
  `;
}

// 2. 導航選單切換
function setupNavigation() {
  const tabs = document.querySelectorAll(".nav-tab-btn");
  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      switchTab(target);
    });
  });
}

function switchTab(tabId) {
  // 更新導航按鈕狀態
  document.querySelectorAll(".nav-tab-btn").forEach(btn => {
    if (btn.dataset.tab === tabId) {
      btn.classList.add("active", "text-blue-600");
      btn.classList.remove("text-slate-600");
    } else {
      btn.classList.remove("active", "text-blue-600");
      btn.classList.add("text-slate-600");
    }
  });

  // 切換面板顯示
  document.querySelectorAll(".tab-pane").forEach(pane => {
    pane.classList.add("hidden");
  });
  const targetPane = document.getElementById(`pane-${tabId}`);
  if (targetPane) {
    targetPane.classList.remove("hidden");
  }

  // 若切換到學情診斷，繪製或重新調整圖表大小
  if (tabId === "overview") {
    setTimeout(renderRadarChart, 100);
  }
}

// 3. 學情大數據總覽面板
function renderOverviewTab() {
  const info = TUTOR_DATA.examInfo;
  const analysis = TUTOR_DATA.radarAnalysis;

  // 渲染摘要卡片
  document.getElementById("overview-stats").innerHTML = `
    <div class="glass-card rounded-2xl p-6 glass-card-hover border-l-4 border-l-blue-600">
      <div class="text-sm font-medium text-slate-500 mb-1">本次實得成績</div>
      <div class="flex items-baseline space-x-2">
        <span class="text-4xl font-extrabold text-slate-800">${info.totalScore}</span>
        <span class="text-sm text-slate-500">/ 100 分</span>
      </div>
      <div class="mt-3 text-xs text-blue-600 font-medium flex items-center">
        <i class="fa-solid fa-circle-check mr-1.5"></i> 答對 ${info.correctCount} 題，答錯 ${info.wrongCount} 題
      </div>
    </div>

    <div class="glass-card rounded-2xl p-6 glass-card-hover border-l-4 border-l-rose-500">
      <div class="text-sm font-medium text-slate-500 mb-1">扣分核心盲區</div>
      <div class="flex items-baseline space-x-2">
        <span class="text-4xl font-extrabold text-rose-600">-24</span>
        <span class="text-sm text-slate-500">分</span>
      </div>
      <div class="mt-3 text-xs text-rose-500 font-medium flex items-center">
        <i class="fa-solid fa-triangle-exclamation mr-1.5"></i> 集中於記憶體與硬體規格識讀
      </div>
    </div>

    <div class="glass-card rounded-2xl p-6 glass-card-hover border-l-4 border-l-amber-500">
      <div class="text-sm font-medium text-slate-500 mb-1">靶向提分潛力</div>
      <div class="flex items-baseline space-x-2">
        <span class="text-4xl font-extrabold text-amber-600">+24</span>
        <span class="text-sm text-slate-500">分</span>
      </div>
      <div class="mt-3 text-xs text-amber-600 font-medium flex items-center">
        <i class="fa-solid fa-rocket mr-1.5"></i> 完成靶向測驗後預期直達 100 分
      </div>
    </div>

    <div class="glass-card rounded-2xl p-6 glass-card-hover border-l-4 border-l-emerald-500">
      <div class="text-sm font-medium text-slate-500 mb-1">優勢能力板塊</div>
      <div class="flex items-baseline space-x-2">
        <span class="text-4xl font-extrabold text-emerald-600">100%</span>
        <span class="text-sm text-slate-500">滿分</span>
      </div>
      <div class="mt-3 text-xs text-emerald-600 font-medium flex items-center">
        <i class="fa-solid fa-thumbs-up mr-1.5"></i> 周邊 I/O 與連接埠觀念極為清晰
      </div>
    </div>
  `;

  // 診斷評語
  document.getElementById("tutor-diagnostic-text").textContent = analysis.overallDiagnosis;
  document.getElementById("tutor-prescription").innerHTML = `
    <ul class="space-y-2 text-sm text-slate-700">
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-2 mt-0.5">1</span>
        <span><b>記憶體材質釐清</b>：掌握 SRAM（快取記憶體/極速/免刷新）與 DRAM（主記憶體/電容需充電刷新）的結構與定位差異。</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-2 mt-0.5">2</span>
        <span><b>固態硬碟本質理解</b>：牢記 SSD 是快閃記憶體晶片，因無機械讀寫頭且定址時間極短，零散檔案不影響速度，且有寫入壽命限制，<b>絕不需磁碟重組</b>！</span>
      </li>
      <li class="flex items-start">
        <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mr-2 mt-0.5">3</span>
        <span><b>科學記號數量級敏銳度</b>：GHz 的 G 是 $10^9$（十億），2.80GHz 代表每秒振盪 28 億次，注意中文「十億」與「億」的陷阱！</span>
      </li>
    </ul>
  `;

  // 渲染能力維度進度清單
  const categoryContainer = document.getElementById("category-breakdown-list");
  categoryContainer.innerHTML = analysis.categories.map(cat => {
    const colorClass = cat.accuracy >= 80 ? "bg-emerald-500" : cat.accuracy >= 65 ? "bg-blue-500" : "bg-rose-500";
    const textClass = cat.accuracy >= 80 ? "text-emerald-700" : cat.accuracy >= 65 ? "text-blue-700" : "text-rose-700";
    return `
      <div class="p-3 bg-slate-50 rounded-xl">
        <div class="flex justify-between items-center mb-1.5">
          <span class="text-sm font-semibold text-slate-800">${cat.name}</span>
          <span class="text-xs font-bold ${textClass}">${cat.correct}/${cat.total} 題 (${cat.accuracy}%)</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div class="${colorClass} h-2 rounded-full transition-all duration-500" style="width: ${cat.accuracy}%"></div>
        </div>
      </div>
    `;
  }).join("");

  renderRadarChart();
}

function renderRadarChart() {
  const ctx = document.getElementById("radarChartCanvas");
  if (!ctx) return;

  const categories = TUTOR_DATA.radarAnalysis.categories;
  const labels = categories.map(c => c.name);
  const scores = categories.map(c => c.score);

  if (radarChartInstance) {
    radarChartInstance.destroy();
  }

  radarChartInstance = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [{
        label: "學生掌握度 (%)",
        data: scores,
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        borderColor: "rgba(37, 99, 235, 1)",
        pointBackgroundColor: "rgba(37, 99, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(37, 99, 235, 1)",
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: "#e2e8f0" },
          grid: { color: "#e2e8f0" },
          suggestedMin: 30,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            font: { size: 10 }
          },
          pointLabels: {
            font: { size: 12, weight: "bold" },
            color: "#334155"
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// 4. 錯題深度精解面板
function renderWrongQuestionsTab() {
  const container = document.getElementById("wrong-questions-container");
  const list = TUTOR_DATA.wrongQuestionsAnalysis;

  container.innerHTML = list.map(q => {
    return `
      <div class="glass-card rounded-2xl p-6 transition-all duration-300 border border-slate-200/80 shadow-sm hover:shadow-md">
        <!-- 標題與元資訊 -->
        <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div class="flex items-center space-x-3">
            <span class="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-black flex items-center justify-center text-lg shadow-inner">
              ${q.id}
            </span>
            <div>
              <h3 class="text-base font-bold text-slate-800">${q.title}</h3>
              <p class="text-xs text-slate-500">考卷第 ${q.page} 頁 ｜ 核心主題：${q.topic} ｜ 扣分：-${q.penalty} 分</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
              學生作答：(${q.studentAns})
            </span>
            <span class="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              正解：(${q.correctAns})
            </span>
            <button onclick="askTutorAboutQuestion(${q.id})" class="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center transition">
              <i class="fa-solid fa-headset mr-1.5"></i> 家教解惑
            </button>
          </div>
        </div>

        <!-- 老師手寫紅筆註記 -->
        <div class="mt-4 p-3 rounded-xl teacher-red-mark text-xs font-medium flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <i class="fa-solid fa-pencil text-rose-500"></i>
            <span><b>試卷紅筆原註記：</b>「${q.teacherNote}」</span>
          </div>
          <span class="text-[11px] text-rose-400 font-normal">老師手寫評語</span>
        </div>

        <!-- 錯誤診斷與剖析 -->
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h4 class="font-bold text-slate-700 mb-1 flex items-center text-rose-600">
              <i class="fa-solid fa-triangle-exclamation mr-1.5"></i> 為什麼會選錯？（盲區剖析）
            </h4>
            <p class="text-slate-600 leading-relaxed">${q.whyWrong}</p>
          </div>
          <div class="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <h4 class="font-bold text-blue-900 mb-1 flex items-center">
              <i class="fa-solid fa-lightbulb text-amber-500 mr-1.5"></i> 正確核心架構
            </h4>
            <p class="text-slate-700 leading-relaxed">${q.coreConcept}</p>
          </div>
        </div>

        <!-- 深入詳解 -->
        <div class="mt-4 p-4 bg-white rounded-xl border border-slate-200 text-xs">
          <div class="font-bold text-slate-800 mb-2 flex items-center">
            <i class="fa-solid fa-book-open-reader text-blue-600 mr-1.5"></i> 家教名師深度解析：
          </div>
          <p class="text-slate-700 leading-relaxed whitespace-pre-line">${q.deepExplanation}</p>
        </div>

        <!-- 口訣與應試動作 -->
        <div class="mt-4 flex flex-wrap items-center justify-between gap-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/70 rounded-xl text-xs">
          <div class="font-bold text-amber-900">${q.memoryTip}</div>
          <div class="text-slate-600 text-[11px]">🎯 應考行動：${q.actionGuidance}</div>
        </div>
      </div>
    `;
  }).join("");
}

// 5. 互動式 AI 家教面板
function renderTutorTab() {
  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById("chat-messages-container");
  container.innerHTML = chatMessages.map((msg, index) => {
    const isTutor = msg.sender === "tutor";
    return `
      <div class="flex items-start space-x-3 ${isTutor ? '' : 'flex-row-reverse space-x-reverse'} chat-bubble mb-4">
        <div class="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm shadow-sm ${isTutor ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white'}">
          ${isTutor ? '<i class="fa-solid fa-robot"></i>' : '<i class="fa-solid fa-user"></i>'}
        </div>
        <div class="max-w-[80%] ${isTutor ? 'bg-white text-slate-800 border border-slate-200' : 'bg-blue-600 text-white'} rounded-2xl p-4 shadow-sm text-sm">
          <div class="flex items-center justify-between mb-1.5 pb-1 border-b ${isTutor ? 'border-slate-100' : 'border-blue-500'}">
            <span class="text-xs font-semibold ${isTutor ? 'text-blue-600' : 'text-blue-100'}">
              ${isTutor ? 'AI 資訊家教 小智老師' : '李政緯 同學'}
            </span>
            <div class="flex items-center space-x-2">
              <span class="text-[10px] ${isTutor ? 'text-slate-400' : 'text-blue-200'}">${msg.time}</span>
              ${isTutor ? `
                <button onclick="speakText('${escapeHtml(msg.text)}')" class="text-slate-400 hover:text-blue-600 transition" title="語音朗讀">
                  <i class="fa-solid fa-volume-high text-xs"></i>
                </button>
              ` : ''}
            </div>
          </div>
          <div class="whitespace-pre-line leading-relaxed text-xs sm:text-sm">
            ${msg.text}
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.scrollTop = container.scrollHeight;
}

function handleUserSend() {
  const input = document.getElementById("tutor-user-input");
  const text = input.value.trim();
  if (!text) return;

  // 加入使用者訊息
  chatMessages.push({
    sender: "user",
    text: text,
    time: getCurrentTime()
  });
  input.value = "";
  renderChatMessages();

  // 模擬家教思考與回覆
  showTutorTypingIndicator();

  setTimeout(() => {
    removeTutorTypingIndicator();
    const replyText = generateTutorReply(text);
    chatMessages.push({
      sender: "tutor",
      text: replyText,
      time: getCurrentTime()
    });
    renderChatMessages();
  }, 600);
}

function askTutorDirect(promptText) {
  document.getElementById("tutor-user-input").value = promptText;
  handleUserSend();
}

function askTutorAboutQuestion(qid) {
  switchTab("tutor");
  const q = TUTOR_DATA.wrongQuestionsAnalysis.find(item => item.id === qid);
  if (q) {
    const prompt = `老師您好，我這次第 ${q.id} 題（${q.topic}）答錯了，我寫 (${q.studentAns}) 但答案是 (${q.correctAns})，可以再為我深入講講這題的核心觀念嗎？`;
    askTutorDirect(prompt);
  }
}

function generateTutorReply(userInput) {
  const query = userInput.toLowerCase();

  // 尋找知識庫關鍵字匹配
  for (const item of TUTOR_DATA.tutorKnowledge) {
    if (item.keywords.some(k => query.includes(k))) {
      return item.reply;
    }
  }

  // 特殊匹配
  if (query.includes("滿分") || query.includes("加強") || query.includes("複習") || query.includes("及格")) {
    return "【小智老師提分建議】政緯，你目前的 76 分底子很好，代表你並不是電腦架構一竅不通，而是細節觀念有「三個陷阱」需要掃除：\n1. 專有名詞縮寫（MIPS 的 I 是指令 Instruction）\n2. 單位量級換算（GHz 是十億次，小心被億騙）\n3. 記憶體材質職能分工（SRAM 當快取、DRAM 做主存、SSD 是快閃晶片不可重組）\n\n建議你現在直接切換到「🎯 靶向強化測驗」，動手練習老師幫你出的 6 道變形模擬題，做完我們就能掌握這 24 分！";
  }

  // 通用蘇格拉底啟發式回答
  return `【小智老師啟發】你問到了很棒的關鍵點！在電腦硬體架構中，所有設計都在權衡「速度、容量、成本、壽命」四個面向：\n\n• 愈靠近 CPU 的（暫存器、SRAM 快取），速度愈極致，但成本愈高、容量最小。\n• 離 CPU 稍遠的主記憶體（DRAM），需要靠電容充電刷新，雖然速度稍慢但便宜大碗。\n• 外接儲存（SSD、HDD）斷電依然能保存資料，SSD 靠電子晶片隨機讀取所以快且耐震，但也因為晶片氧化有寫入次數上限。\n\n你對哪一個部分的運作機制想了解更多呢？隨時問老師！`;
}

function showTutorTypingIndicator() {
  const container = document.getElementById("chat-messages-container");
  const indicator = document.createElement("div");
  indicator.id = "tutor-typing-indicator";
  indicator.className = "flex items-center space-x-2 text-xs text-slate-400 p-2";
  indicator.innerHTML = `
    <div class="w-2 h-2 rounded-full bg-blue-500 animate-ping"></div>
    <span>小智老師正在為您編寫詳解...</span>
  `;
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

function removeTutorTypingIndicator() {
  const ind = document.getElementById("tutor-typing-indicator");
  if (ind) ind.remove();
}

// 6. 靶向強化過關測驗面板
function renderQuizTab() {
  const container = document.getElementById("quiz-step-container");
  const quizList = TUTOR_DATA.remedialQuiz;
  const current = quizList[quizState.currentIndex];

  if (quizState.isFinished) {
    renderQuizResult();
    return;
  }

  const selectedOpt = quizState.answers[current.id];
  const isSubmitted = quizState.submitted[current.id];

  container.innerHTML = `
    <div class="glass-card rounded-2xl p-6 border border-slate-200">
      <!-- 進度與對應錯題資訊 -->
      <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
            第 ${quizState.currentIndex + 1} / ${quizList.length} 題
          </span>
          <span class="text-xs text-slate-500 ml-2">對應原試卷第 ${current.targetWrongId} 題弱點突破</span>
        </div>
        <div class="text-xs font-semibold text-slate-600">
          核心觀念：<span class="text-blue-700">${current.concept}</span>
        </div>
      </div>

      <!-- 進度條 -->
      <div class="w-full bg-slate-100 rounded-full h-2 mb-6 overflow-hidden">
        <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: ${((quizState.currentIndex + 1) / quizList.length) * 100}%"></div>
      </div>

      <!-- 題目內容 -->
      <h3 class="text-base sm:text-lg font-bold text-slate-800 mb-6 leading-relaxed">
        ${current.question}
      </h3>

      <!-- 選項列表 -->
      <div class="space-y-3 mb-6">
        ${Object.entries(current.options).map(([optKey, optText]) => {
          let optClass = "border-slate-200 bg-white hover:bg-slate-50 text-slate-700";
          let badgeClass = "bg-slate-100 text-slate-700";

          if (isSubmitted) {
            if (optKey === current.correctAns) {
              optClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-2 ring-emerald-500";
              badgeClass = "bg-emerald-600 text-white";
            } else if (optKey === selectedOpt) {
              optClass = "border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-500";
              badgeClass = "bg-rose-600 text-white";
            } else {
              optClass = "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
            }
          } else if (selectedOpt === optKey) {
            optClass = "border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-2 ring-blue-600";
            badgeClass = "bg-blue-600 text-white";
          }

          return `
            <div onclick="selectQuizOption('${optKey}')" class="flex items-center p-4 rounded-xl border cursor-pointer transition ${optClass}">
              <span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm mr-3.5 flex-shrink-0 ${badgeClass}">
                ${optKey}
              </span>
              <span class="text-sm leading-relaxed">${optText}</span>
            </div>
          `;
        }).join("")}
      </div>

      <!-- 提問引導與解析 (作答後顯示) -->
      ${isSubmitted ? `
        <div class="p-4 rounded-xl ${selectedOpt === current.correctAns ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'} mb-6 text-xs sm:text-sm">
          <div class="font-bold flex items-center mb-1 ${selectedOpt === current.correctAns ? 'text-emerald-800' : 'text-rose-800'}">
            <i class="fa-solid ${selectedOpt === current.correctAns ? 'fa-circle-check text-emerald-600' : 'fa-circle-xmark text-rose-600'} mr-2 text-base"></i>
            ${selectedOpt === current.correctAns ? '回答正確！觀念突破成功！' : `回答錯誤！正確答案是 (${current.correctAns})`}
          </div>
          <p class="text-slate-700 leading-relaxed mt-2 whitespace-pre-line">${current.explanation}</p>
        </div>
      ` : `
        <div class="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 mb-6 flex items-center">
          <i class="fa-solid fa-lightbulb text-amber-500 mr-2 text-sm"></i>
          <span><b>家教思考引導：</b>${current.hint}</span>
        </div>
      `}

      <!-- 控制按鈕 -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-100">
        <button onclick="prevQuizQuestion()" class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition ${quizState.currentIndex === 0 ? 'opacity-40 cursor-not-allowed' : ''}">
          <i class="fa-solid fa-arrow-left mr-1"></i> 上一題
        </button>

        ${!isSubmitted ? `
          <button onclick="submitQuizCurrent()" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition ${!selectedOpt ? 'opacity-50 cursor-not-allowed' : ''}">
            核對答案
          </button>
        ` : `
          <button onclick="nextQuizQuestion()" class="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition">
            ${quizState.currentIndex === quizList.length - 1 ? '查看強化結算報告 <i class="fa-solid fa-flag-checkered ml-1"></i>' : '下一題 <i class="fa-solid fa-arrow-right ml-1"></i>'}
          </button>
        `}
      </div>
    </div>
  `;
}

function selectQuizOption(optKey) {
  const current = TUTOR_DATA.remedialQuiz[quizState.currentIndex];
  if (quizState.submitted[current.id]) return; // 已提交不可改
  quizState.answers[current.id] = optKey;
  renderQuizTab();
}

function submitQuizCurrent() {
  const current = TUTOR_DATA.remedialQuiz[quizState.currentIndex];
  if (!quizState.answers[current.id]) {
    alert("請先選擇一個答案！");
    return;
  }
  quizState.submitted[current.id] = true;
  renderQuizTab();
}

function nextQuizQuestion() {
  const quizList = TUTOR_DATA.remedialQuiz;
  if (quizState.currentIndex < quizList.length - 1) {
    quizState.currentIndex++;
    renderQuizTab();
  } else {
    quizState.isFinished = true;
    renderQuizResult();
  }
}

function prevQuizQuestion() {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex--;
    renderQuizTab();
  }
}

function renderQuizResult() {
  const quizList = TUTOR_DATA.remedialQuiz;
  let correctCount = 0;
  quizList.forEach(q => {
    if (quizState.answers[q.id] === q.correctAns) {
      correctCount++;
    }
  });

  const accuracy = Math.round((correctCount / quizList.length) * 100);
  const potentialScore = 76 + Math.round((correctCount / quizList.length) * 24);

  // 滿分灑花
  if (correctCount >= 5 && typeof confetti === "function") {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  const container = document.getElementById("quiz-step-container");
  container.innerHTML = `
    <div class="glass-card rounded-2xl p-8 border border-slate-200 text-center max-w-xl mx-auto">
      <div class="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">
        <i class="fa-solid fa-award"></i>
      </div>
      <h3 class="text-2xl font-black text-slate-800 mb-2">靶向強化測驗完成！</h3>
      <p class="text-sm text-slate-500 mb-6">6 大易錯題型針對性補救訓練結算</p>

      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="p-4 bg-blue-50 rounded-2xl">
          <div class="text-xs text-blue-600 font-semibold mb-1">靶向題正答率</div>
          <div class="text-3xl font-black text-blue-800">${correctCount} / ${quizList.length}</div>
          <div class="text-[11px] text-blue-500 mt-1">${accuracy}% 盲區掃除</div>
        </div>
        <div class="p-4 bg-emerald-50 rounded-2xl">
          <div class="text-xs text-emerald-600 font-semibold mb-1">預估新實力成績</div>
          <div class="text-3xl font-black text-emerald-800">${potentialScore} 分</div>
          <div class="text-[11px] text-emerald-600 font-bold mt-1">+${potentialScore - 76} 分顯著突破！</div>
        </div>
      </div>

      <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left text-xs text-slate-700 mb-6 space-y-2">
        <div class="font-bold text-slate-900 flex items-center">
          <i class="fa-solid fa-clipboard-check text-emerald-600 mr-2"></i> 家教總結：
        </div>
        <p>政緯同學，你在這次補救強化中已經徹底搞清楚了：① 范紐曼內存程式概念；② MIPS 代表 Instruction 指令；③ 2.80GHz 代表每秒 28 億次震盪；④ SSD 採用快閃記憶體且無尋道時間故不須重組；⑤ SRAM 是唯一快取指定材質；⑥ AMOLED 是有機自發光！</p>
      </div>

      <div class="flex items-center justify-center space-x-4">
        <button onclick="restartQuiz()" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
          <i class="fa-solid fa-rotate-left mr-1.5"></i> 重新測驗
        </button>
        <button onclick="switchTab('overview')" class="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition">
          <i class="fa-solid fa-chart-pie mr-1.5"></i> 查看最新學情診斷
        </button>
      </div>
    </div>
  `;
}

function restartQuiz() {
  quizState = {
    currentIndex: 0,
    answers: {},
    submitted: {},
    isFinished: false
  };
  renderQuizTab();
}

// 7. 全卷 25 題題庫面板
let currentFilter = "all";

function renderAllQuestionsTab() {
  const container = document.getElementById("all-questions-container");
  const questions = TUTOR_DATA.allQuestions;

  const filtered = questions.filter(q => {
    if (currentFilter === "wrong") return !q.isCorrect;
    if (currentFilter === "correct") return q.isCorrect;
    return true;
  });

  // 篩選標籤按鈕
  document.getElementById("question-filters").innerHTML = `
    <button onclick="filterQuestions('all')" class="px-4 py-2 rounded-xl text-xs font-bold transition ${currentFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}">
      全部試題 (25)
    </button>
    <button onclick="filterQuestions('wrong')" class="px-4 py-2 rounded-xl text-xs font-bold transition ${currentFilter === 'wrong' ? 'bg-rose-600 text-white shadow-sm' : 'bg-white text-rose-600 hover:bg-rose-50 border border-rose-200'}">
      <i class="fa-solid fa-circle-xmark mr-1"></i> 僅看錯題 (6)
    </button>
    <button onclick="filterQuestions('correct')" class="px-4 py-2 rounded-xl text-xs font-bold transition ${currentFilter === 'correct' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'}">
      <i class="fa-solid fa-circle-check mr-1"></i> 僅看答對 (19)
    </button>
  `;

  container.innerHTML = filtered.map(q => {
    return `
      <div class="glass-card rounded-2xl p-5 border border-slate-200 transition">
        <div class="flex items-start justify-between gap-4 mb-3">
          <div class="flex items-center space-x-3">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${q.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}">
              ${q.id}
            </span>
            <div>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 mr-2">
                第 ${q.page} 頁
              </span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                ${q.category}
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="speakText('${escapeHtml(q.question)}')" class="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition" title="朗讀題目">
              <i class="fa-solid fa-volume-high text-xs"></i>
            </button>
            <span class="px-2.5 py-1 rounded-md text-xs font-bold ${q.isCorrect ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}">
              學生：${q.studentAns} ｜ 正解：${q.correctAns}
            </span>
          </div>
        </div>

        <p class="text-sm font-semibold text-slate-800 mb-4 leading-relaxed">
          ${q.question}
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-4">
          ${Object.entries(q.options).map(([k, val]) => {
            let itemClass = "bg-slate-50 border-slate-200 text-slate-700";
            if (k === q.correctAns) itemClass = "bg-emerald-50 border-emerald-300 text-emerald-900 font-bold";
            else if (k === q.studentAns && !q.isCorrect) itemClass = "bg-rose-50 border-rose-300 text-rose-900 line-through";
            return `
              <div class="p-2.5 rounded-lg border flex items-center space-x-2 ${itemClass}">
                <span class="font-bold w-5">${k}.</span>
                <span>${val}</span>
              </div>
            `;
          }).join("")}
        </div>

        <div class="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 leading-relaxed">
          <span class="font-bold text-blue-800 mr-1"><i class="fa-solid fa-book-open mr-1"></i>解析：</span>
          ${q.explanation}
        </div>
      </div>
    `;
  }).join("");
}

function filterQuestions(type) {
  currentFilter = type;
  renderAllQuestionsTab();
}

// 8. 原卷照片對照面板
function renderPaperTab() {
  const container = document.getElementById("paper-images-container");
  const images = TUTOR_DATA.examInfo.examImages;

  container.innerHTML = images.map(img => {
    return `
      <div class="glass-card rounded-2xl overflow-hidden border border-slate-200">
        <div class="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 class="font-bold text-slate-800 text-sm">${img.title}</h4>
            <p class="text-xs text-slate-500">${img.description}</p>
          </div>
          <button onclick="openImageModal('${img.url}', '${img.title}')" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center transition shadow-sm">
            <i class="fa-solid fa-magnifying-glass-plus mr-1.5"></i> 全螢幕高清檢視
          </button>
        </div>
        <div class="p-4 bg-slate-900/5 flex justify-center image-zoom-container" onclick="openImageModal('${img.url}', '${img.title}')">
          <img src="${img.url}" alt="${img.title}" class="max-h-[550px] w-auto object-contain rounded-lg shadow-sm border border-slate-200" />
        </div>
      </div>
    `;
  }).join("");
}

// 9. 圖片燈箱 Modal
function setupImageModal() {
  const modal = document.getElementById("image-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeImageModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeImageModal();
    });
  }
}

function openImageModal(url, title) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-img-title");
  modalImg.src = url;
  modalTitle.textContent = title;
  modal.classList.remove("hidden");
}

function closeImageModal() {
  const modal = document.getElementById("image-modal");
  modal.classList.add("hidden");
}

// 10. Web Speech API 語音朗讀
function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("您的瀏覽器暫不支援語音合成朗讀功能。");
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-TW";
  utterance.rate = 1.0;
  window.speechSynthesis.speak(utterance);
}

// 工具函數
function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function escapeHtml(string) {
  if (!string) return "";
  return string
    .replace(/&/g, "&amp;")
    .replace(/'/g, "\\'")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

