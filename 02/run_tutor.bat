@echo off
chcp 65001 >nul
title EduSmart AI 家教輔導系統

echo =======================================================
echo          EduSmart AI 智慧家教輔導系統 啟動精靈
echo =======================================================
echo.
echo 正在檢查 Python 環境...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] 偵測到 Python，正啟動本地 Web 服務並開啟瀏覽器...
    python start_server.py
) else (
    echo [INFO] 未偵測到 Python，將直接使用預設瀏覽器開啟 index.html...
    start "" "index.html"
)
pause

