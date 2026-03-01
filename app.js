// ========== Terminal Portfolio ==========
const output = document.getElementById('output');
const cmdInput = document.getElementById('cmdInput');
const terminalBody = document.getElementById('terminalBody');
const inputLine = document.getElementById('inputLine');

let isTyping = false;
let typeQueue = [];
const HISTORY = [];
let historyIdx = -1;

// ========== Command Definitions ==========
const COMMANDS = {
    help: () => [
        '',
        '<span class="c-yellow c-bold">Available Commands:</span>',
        '',
        '  <span class="c-green">about</span>      — 关于我',
        '  <span class="c-green">skills</span>     — 技术栈',
        '  <span class="c-green">exp</span>        — 工作经历',
        '  <span class="c-green">projects</span>   — 开源项目',
        '  <span class="c-green">contact</span>    — 联系方式',
        '  <span class="c-green">neofetch</span>   — 系统信息',
        '  <span class="c-green">clear</span>      — 清屏',
        '  <span class="c-green">help</span>       — 显示此帮助',
        '',
        '<span class="c-gray">Tip: 点击下方按钮或直接输入命令</span>',
        ''
    ],

    about: () => [
        '',
        '<span class="c-cyan c-bold">┌─── About Me ───────────────────────────────────┐</span>',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">│</span>  <span class="c-white c-bold">王超 (Wang Chao)</span>',
        '<span class="c-cyan">│</span>  <span class="c-green">AI Full-Stack Engineer</span>',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">│</span>  从 2015 年写下第一行 Java 到现在，经历了',
        '<span class="c-cyan">│</span>  传统 Web → 微服务 → 云原生 → AI 原生',
        '<span class="c-cyan">│</span>  的完整技术周期。',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">│</span>  我相信 <span class="c-yellow">AI 不应该停留在 Demo 阶段</span>。',
        '<span class="c-cyan">│</span>  我的工作是把 LLM、Agent、自动化这些能力，',
        '<span class="c-cyan">│</span>  打磨成真正能跑在生产环境里的产品。',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">│</span>  目前专注：<span class="c-green">MCP 生态</span> · <span class="c-green">多 Agent 协作</span> · <span class="c-green">AI 应用落地</span>',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">│</span>  技术之外，我是一个 5 岁孩子的父亲，',
        '<span class="c-cyan">│</span>  这让我更在意"把事情做对"而不是"把事情做快"。',
        '<span class="c-cyan">│</span>',
        '<span class="c-cyan">└────────────────────────────────────────────────┘</span>',
        ''
    ],

    skills: () => [
        '',
        '<span class="c-yellow c-bold">$ cat /etc/skills.conf</span>',
        '',
        '<span class="c-cyan c-bold">Languages</span>     Python · TypeScript · Java · JavaScript · SQL',
        '<span class="c-cyan c-bold">Frontend</span>      React · Vue · Next.js · Tailwind CSS',
        '<span class="c-cyan c-bold">Backend</span>       Node.js · Spring Boot · FastAPI · Express',
        '<span class="c-cyan c-bold">AI / LLM</span>      GPT · Claude · Gemini · DeepSeek · RAG · Fine-tuning',
        '<span class="c-cyan c-bold">Agent</span>         MCP · Multi-Agent · Tool Use · Autonomous Loop',
        '<span class="c-cyan c-bold">DevOps</span>        Docker · K8s · CI/CD · Linux · Nginx',
        '<span class="c-cyan c-bold">Database</span>      MySQL · PostgreSQL · Redis · MongoDB',
        '',
        '<span class="c-gray"># 11 years of shipping production code</span>',
        ''
    ],

    exp: () => [
        '',
        '<span class="c-yellow c-bold">$ git log --oneline --career</span>',
        '',
        '<span class="c-green">2024-now</span>  <span class="c-white c-bold">AI 全栈工程师 · 独立开发者</span>',
        '          专注 AI Agent 与 LLM 应用落地',
        '          构建多个开源项目：代码审查、Prompt 管理、多 Agent 协作',
        '          深度参与 MCP 生态建设',
        '          <span class="c-gray">Stack: AI Agent · MCP · LLM · Python · Open Source</span>',
        '',
        '<span class="c-green">2019-2024</span> <span class="c-white c-bold">高级全栈工程师 · 北京</span>',
        '          核心业务系统架构设计与开发',
        '          主导微服务拆分与云原生改造',
        '          带领团队完成多个大型项目交付，日均百万级请求',
        '          <span class="c-gray">Stack: Java · Spring Boot · React · Docker · K8s</span>',
        '',
        '<span class="c-green">2015-2019</span> <span class="c-white c-bold">全栈开发工程师 · 北京</span>',
        '          从零搭建多个 Web 应用',
        '          覆盖后端 API、前端 SPA、数据库设计、运维部署全流程',
        '          <span class="c-gray">Stack: Java · JavaScript · MySQL · Linux · CI/CD</span>',
        ''
    ],

    experience: () => COMMANDS.exp(),

    projects: () => [
        '',
        '<span class="c-yellow c-bold">$ ls ~/projects/</span>',
        '',
        '<span class="c-white c-bold">PromptVault</span>  <span class="c-gray">——</span> AI 生图 Prompt 视觉图库',
        '  自动采集 Civitai/PromptHero 热门 prompt，300+ 高质量内容',
        '  <span class="c-gray">Python · Web Scraping · GitHub Pages</span>',
        '  <span class="c-cyan">→ <a href="https://coldxiangyu163.github.io/prompt-vault/" target="_blank">https://coldxiangyu163.github.io/prompt-vault/</a></span>',
        '',
        '<span class="c-white c-bold">AI Git Review</span>  <span class="c-gray">——</span> AI 驱动的代码审查 CLI',
        '  git commit 前自动分析 staged diff，零成本双模型',
        '  <span class="c-gray">Node.js · LLM · CLI</span>',
        '  <span class="c-cyan">→ <a href="https://github.com/coldxiangyu163/ai-git-review" target="_blank">github.com/coldxiangyu163/ai-git-review</a></span>',
        '',
        '<span class="c-white c-bold">GEO Analyzer</span>  <span class="c-gray">——</span> AI 搜索引擎可见性分析',
        '  查询 ChatGPT/Perplexity/Gemini，分析 AI 搜索排名',
        '  <span class="c-gray">Python · GEO · AI Search</span>',
        '  <span class="c-cyan">→ <a href="https://github.com/coldxiangyu163/geo-analyzer" target="_blank">github.com/coldxiangyu163/geo-analyzer</a></span>',
        '',
        '<span class="c-white c-bold">Nanobot</span>  <span class="c-gray">——</span> 多 Agent 协作系统',
        '  支持任务分发、状态管理、异步执行，基于 MCP 协议',
        '  <span class="c-gray">Python · MCP · Multi-Agent</span>',
        '  <span class="c-cyan">→ <a href="https://github.com/coldxiangyu163" target="_blank">github.com/coldxiangyu163</a></span>',
        ''
    ],

    contact: () => [
        '',
        '<span class="c-yellow c-bold">$ cat ~/.contact</span>',
        '',
        '  <span class="c-cyan">GitHub</span>    <a href="https://github.com/coldxiangyu163" target="_blank">github.com/coldxiangyu163</a>',
        '  <span class="c-cyan">Email</span>     <a href="mailto:coldxiangyu@gmail.com">coldxiangyu@gmail.com</a>',
        '  <span class="c-cyan">X</span>         <a href="https://x.com/coldxiangyu" target="_blank">x.com/coldxiangyu</a>',
        '',
        '<span class="c-gray"># Feel free to reach out 🤝</span>',
        ''
    ],

    neofetch: () => [
        '',
        '<div class="neofetch"><div class="neofetch-logo"><span class="ascii-art">  ██╗    ██╗  ██████╗\n  ██║    ██║ ██╔════╝\n  ██║ █╗ ██║ ██║     \n  ██║███╗██║ ██║     \n  ╚███╔███╔╝ ╚██████╗\n   ╚══╝╚══╝   ╚═════╝</span></div><div class="neofetch-info"><span class="c-white c-bold">visitor@wangchao</span>\n<span class="c-white">─────────────────</span>\n<span class="c-cyan">OS:</span>      <span class="c-white">AI Engineer OS v11.0</span>\n<span class="c-cyan">Host:</span>    <span class="c-white">王超 (Wang Chao)</span>\n<span class="c-cyan">Kernel:</span>  <span class="c-white">Full-Stack v4.0-ai</span>\n<span class="c-cyan">Uptime:</span>  <span class="c-white">11 years</span>\n<span class="c-cyan">Shell:</span>   <span class="c-white">Python / TypeScript / Java</span>\n<span class="c-cyan">DE:</span>      <span class="c-white">AI Agent + MCP</span>\n<span class="c-cyan">WM:</span>      <span class="c-white">React + Next.js</span>\n<span class="c-cyan">Theme:</span>   <span class="c-white">Dark [always]</span>\n<span class="c-cyan">CPU:</span>     <span class="c-white">LLM-powered (GPT/Claude/Gemini)</span>\n<span class="c-cyan">GPU:</span>     <span class="c-white">Multi-Agent Orchestration</span>\n<span class="c-cyan">Memory:</span>  <span class="c-white">RAG + Vector DB</span>\n\n<span style="color:#ff4444">██</span><span style="color:#ff8800">██</span><span style="color:#ffdd00">██</span><span style="color:#00ff41">██</span><span style="color:#00d4ff">██</span><span style="color:#6666ff">██</span><span style="color:#ff79c6">██</span><span style="color:#ffffff">██</span></div></div>',
        ''
    ],

    clear: () => {
        output.innerHTML = '';
        return null;
    },

    whoami: () => [
        '',
        '<span class="c-green">wangchao</span> — AI Full-Stack Engineer, 11 years in production',
        ''
    ],

    echo: (args) => ['', args || '', ''],

    sudo: () => [
        '',
        '<span class="c-red">[sudo] password for visitor: ********</span>',
        '<span class="c-red">visitor is not in the sudoers file. This incident will be reported.</span>',
        '<span class="c-gray"># Nice try 😏</span>',
        ''
    ],

    rm: () => [
        '',
        '<span class="c-red">rm: permission denied — you can\'t delete my portfolio 😎</span>',
        ''
    ],

    ls: () => [
        '',
        '<span class="c-cyan">about/</span>  <span class="c-cyan">skills/</span>  <span class="c-cyan">experience/</span>  <span class="c-cyan">projects/</span>  <span class="c-green">README.md</span>  <span class="c-green">.contact</span>',
        '',
        '<span class="c-gray">Type a folder name to explore, or run \'help\' for commands</span>',
        ''
    ],

    cat: (args) => {
        if (args && args.includes('README')) {
            return COMMANDS.about();
        }
        if (args && args.includes('contact')) {
            return COMMANDS.contact();
        }
        return ['', `<span class="c-red">cat: ${args || '???'}: No such file</span>`, ''];
    },

    cd: () => ['', '<span class="c-gray">There\'s nowhere to go — you\'re already home 🏠</span>', ''],

    pwd: () => ['', '/home/wangchao/portfolio', ''],

    date: () => ['', new Date().toString(), ''],

    uname: () => ['', 'WangChao-OS 11.0.0 AI-Full-Stack aarch64', ''],
};

// ========== Print Lines ==========
function printLines(lines, callback) {
    if (!lines || lines.length === 0) {
        if (callback) callback();
        return;
    }

    isTyping = true;
    let i = 0;

    function nextLine() {
        if (i >= lines.length) {
            isTyping = false;
            scrollToBottom();
            if (callback) callback();
            processQueue();
            return;
        }

        const div = document.createElement('div');
        div.className = 'line';
        div.innerHTML = lines[i];
        output.appendChild(div);
        i++;
        scrollToBottom();
        setTimeout(nextLine, 25);
    }

    nextLine();
}

function printCmdEcho(cmd) {
    const div = document.createElement('div');
    div.className = 'line cmd-echo';
    div.innerHTML = '<span class="prompt-echo">visitor@wangchao:~$ </span>' + escapeHtml(cmd);
    output.appendChild(div);
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// ========== Queue System ==========
function processQueue() {
    if (typeQueue.length > 0 && !isTyping) {
        const next = typeQueue.shift();
        next();
    }
}

// ========== Execute Command ==========
function execCmd(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    HISTORY.unshift(trimmed);
    historyIdx = -1;

    printCmdEcho(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    const handler = COMMANDS[cmd];
    if (handler) {
        const result = handler(args);
        if (result) {
            printLines(result);
        }
    } else {
        printLines([
            '',
            `<span class="c-red">command not found: ${escapeHtml(cmd)}</span>`,
            '<span class="c-gray">Type \'help\' for available commands</span>',
            ''
        ]);
    }
}

// ========== Public API for Quick Buttons ==========
function runCmd(cmd) {
    if (isTyping) {
        typeQueue.push(() => runCmd(cmd));
        return;
    }
    cmdInput.value = '';
    execCmd(cmd);
    cmdInput.focus();
}

// ========== Input Handling ==========
cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const val = cmdInput.value;
        cmdInput.value = '';
        if (isTyping) {
            typeQueue.push(() => execCmd(val));
        } else {
            execCmd(val);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIdx < HISTORY.length - 1) {
            historyIdx++;
            cmdInput.value = HISTORY[historyIdx];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx > 0) {
            historyIdx--;
            cmdInput.value = HISTORY[historyIdx];
        } else {
            historyIdx = -1;
            cmdInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const val = cmdInput.value.toLowerCase();
        const match = Object.keys(COMMANDS).find(c => c.startsWith(val) && c !== val);
        if (match) cmdInput.value = match;
    } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        execCmd('clear');
    }
});

// Click anywhere to focus input
terminalBody.addEventListener('click', () => {
    cmdInput.focus();
});

// ========== Boot Sequence ==========
function boot() {
    const bootLines = [
        '<span class="c-dim">[    0.000000] Booting WangChao-OS v11.0...</span>',
        '<span class="c-dim">[    0.001337] Loading modules: python, typescript, java</span>',
        '<span class="c-dim">[    0.002000] Initializing AI subsystem... <span class="c-green">OK</span></span>',
        '<span class="c-dim">[    0.003000] Mounting /dev/experience (11 years)... <span class="c-green">OK</span></span>',
        '<span class="c-dim">[    0.004000] Starting MCP Agent service... <span class="c-green">OK</span></span>',
        '',
        '<span class="c-green c-bold"> __        __                    ____ _                 </span>',
        '<span class="c-green c-bold"> \\ \\      / /_ _ _ __   __ _   / ___| |__   __ _  ___  </span>',
        '<span class="c-green c-bold">  \\ \\ /\\ / / _` | \'_ \\ / _` | | |   | \'_ \\ / _` |/ _ \\ </span>',
        '<span class="c-green c-bold">   \\ V  V / (_| | | | | (_| | | |___| | | | (_| | (_) |</span>',
        '<span class="c-green c-bold">    \\_/\\_/ \\__,_|_| |_|\\__, |  \\____|_| |_|\\__,_|\\___/ </span>',
        '<span class="c-green c-bold">                       |___/                            </span>',
        '',
        '<span class="c-white">Welcome to my terminal portfolio.</span>',
        '<span class="c-gray">Type \'<span class="c-green">help</span>\' to see available commands.</span>',
        ''
    ];

    printLines(bootLines, () => {
        cmdInput.focus();
    });
}

boot();
