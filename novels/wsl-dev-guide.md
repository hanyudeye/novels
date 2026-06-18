# WSL 2 开发环境指南

## 推荐：专注 WSL 2

### 理由
1. **工具链原生** - Linux 工具链（docker、git、npm、python、go、rust 等）在 WSL 里体验最好
2. **生产环境一致** - 服务器基本都是 Linux，开发环境贴近生产
3. **Windows 互通** - `\\wsl.localhost\Ubuntu\home\user` 直接访问文件，VS Code `Remote - WSL` 无缝连接
4. **避免双维护** - 不用同步配置、路径转换、权限问题

### 只需做这些
```bash
# 1. 安装 WSL 2 + Ubuntu
wsl --install -d Ubuntu

# 2. 全部开发在 ~/projects 里（不要放 /mnt/c/，IO 慢）
# 3. VS Code 装 Remote-WSL 扩展，`code .` 直接进容器化体验
# 4. Git/SSH/GnuPG 只在 WSL 配置，Windows 端不用动
# 5. 终端用 Windows Terminal，默认启动 Ubuntu profile
```

### 仅保留 Windows 原生的
- 浏览器测试
- GUI 调试（如需）
- `winget`/`scoop` 装少量 Windows-only 工具

---

## 如果必须原生 Windows
（如 .NET Framework、WinUI、硬件驱动开发）
- 用 `winget`/`scoop` 管理工具链
- Git 用 `Git for Windows`（带 bash）
- 终端用 Windows Terminal + PowerShell 7+
- 但 **不要** 同时维护两套完整环境

---

## 结论
90%+ 场景 **只用 WSL 2** 最省心。需要时再装 Windows 原生工具。