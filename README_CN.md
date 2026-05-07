<div align="center">
<img width="1200" height="475" alt="宇多田光：蓝色光谱" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎵 宇多田光：蓝色光谱

一个致敬日本歌手宇多田光（Hikaru Utada）的交互式网络应用。通过沉浸式的视觉体验，探索她音乐中的情感世界。

## ✨ 功能特性

- **情感主题导航** - 按情感主题分类浏览歌曲
- **专辑时间线** - 跨越数十年互动浏览专辑
- **交互式播放列表** - 播放和分享您喜爱的歌曲
- **流畅动画效果** - 由 Framer Motion 驱动的优雅过渡
- **响应式设计** - 在桌面和移动设备上无缝运行
- **AI 增强功能** - 基于 Google Gemini API 的智能推荐

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装步骤

1. **克隆仓库并安装依赖：**
   ```bash
   git clone <repository-url>
   cd utadahikaru
   npm install
   ```

2. **配置 Gemini API：**
   ```bash
   cp .env.local.example .env.local
   ```
   在 `.env.local` 中添加你的 Gemini API 密钥：
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

3. **启动开发服务器：**
   ```bash
   npm run dev
   ```
   在浏览器中打开 http://localhost:3000

### 生产环境构建

```bash
npm run build
npm run preview  # 在本地预览生产构建
```

## 📦 技术栈

- **前端框架:** React 19 + TypeScript
- **构建工具:** Vite 6
- **样式框架:** Tailwind CSS 4
- **动画库:** Framer Motion
- **图标库:** Lucide React
- **AI 集成:** Google Generative AI SDK
- **后端服务:** Express.js

## 📁 项目结构

```
src/
├── App.tsx           # 主应用组件
├── main.tsx          # 应用入口
├── index.css         # 全局样式
├── assets/
│   └── images/       # 专辑封面和艺术作品
└── vite-env.d.ts     # Vite 类型定义
```

## 📝 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 在 3000 端口启动开发服务器 |
| `npm run build` | 创建生产环境构建 |
| `npm run preview` | 在本地预览生产构建 |
| `npm run lint` | 使用 TypeScript 进行类型检查 |
| `npm run clean` | 清理构建文件 |

## 🔗 相关链接

- **在线演示:** https://utadahikaru.vercel.app/

## 📄 许可证

本项目按原样提供。所有专辑图片和音乐信息仅供鉴赏和粉丝用途。