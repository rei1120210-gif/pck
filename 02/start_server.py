import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    Handler = http.server.SimpleHTTPRequestHandler
    
    print(f"=====================================================")
    print(f"  EduSmart AI 家教輔導系統 伺服器啟動中...")
    print(f"  網址：http://localhost:{PORT}")
    print(f"  即將自動為您開啟瀏覽器...")
    print(f"  若要停止伺服器，請按 Ctrl + C")
    print(f"=====================================================")
    
    webbrowser.open(f"http://localhost:{PORT}/index.html")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n伺服器已正常停止。")

if __name__ == "__main__":
    main()

