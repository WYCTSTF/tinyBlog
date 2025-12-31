1. 项目愿景 (Project Vision)

构建一个响应极快、视觉降噪、专注于技术沉淀的个人博客系统。核心理念是**“结构化速读”**。 后端采用 Bun + Elysia.js 以追求极致性能；前端注重交互细节，特别是可视化的标签网络和沉浸式的阅读体验。
2. 技术栈架构 (Tech Stack)

    Runtime: Bun (必须)
    Backend: Elysia.js (必须)
        作用：提供 API 接口（文章 CRUD、元数据获取、Tag 图谱数据计算）、处理静态资源服务。
    Frontend: React / Next.js (推荐，配合 Tailwind CSS)。
        建议使用 Elysia 的 Eden Treaty 实现前后端端到端的类型安全。
    Database: SQLite (推荐，Bun 原生支持非常好) 或单纯的 Markdown 文件系统 + Frontmatter 解析。
    Visualization: react-force-graph 或 D3.js (用于 3D 标签云)。

3. 功能模块详细规范
3.1 核心内容模块 (Content Modules)

系统需包含以下四个主要页签/区域：

    Blog (首页流):
        内容: 深度技术文章。
        排序: 按 updated_at (更新时间) 倒序。
        展示: 卡片式，包含封面、标题、TL;DR 摘要、元数据（热度/日期/分类）。
    TIL (Today I Learned) [新增]:
        定位: 碎片化知识管理，记录临时学到的新能力、新命令或代码片段。
        形态: 类似 Twitter/微博的时间轴样式，或者简单的卡片流。
        特点: 轻量级。不需要封面图，不需要复杂的排版，强调“短平快”的记录。
    Tech Wishlist (技术愿望单):
        内容: 一个清单，列出想玩但还没玩的技术/框架。
        形态: Checkbox 列表风格。支持状态标记（TODO / Doing / Done）。
    Presentation (演示归档):
        内容: 挂载过往的 PPT/Keynote。
        形态: 静态列表，点击可在线预览（PDF 嵌入）或下载。

3.2 交互式编辑器 (Markdown Editor)

    布局: 双栏设计（左侧编辑，右侧实时预览）。
    预览同步: 滚动同步。
    核心渲染能力:
        代码高亮: 支持行号、语言显示、复制按钮。
        数学公式: 完整的 LaTeX 支持 ($ 和 $$)。
        "Spoiler" 隐藏块 (关键交互):
            语法: 自定义语法（如 :::spoiler）或 HTML <details> 增强。
            视觉: 默认对内容应用高斯模糊 (Blur) 或遮罩层。
            交互: 点击后，遮罩层以 opacity 渐变消失（类似“刮刮乐”或取消遮罩的效果），不产生原本内容高度变化导致的页面跳动 (Layout Shift)。

3.3 首页侧边栏 (Sidebar)

侧边栏需包含以下组件，且需支持高度定制：

    High Frequency (高频访问):
        逻辑: 人工手动配置为主。
        实现: 后端读取一个 featured_config.json 或数据库中的权重字段。博主可以随意指定展示哪几篇“镇站之宝”，不受点击率算法控制。
    Blogroll (友情链接):
        展示: 简洁的列表，内嵌在侧边栏底部，无需独立页面。

3.4 3D 关联式标签云 (Interactive Tag Graph)

    位置: 首页顶部或侧栏显著位置（也可作为独立的 Tag 页面）。
    风格: 类似 Obsidian 的知识图谱或 3D 网状图。
    数据逻辑 (Graph Theory):
        节点 (Nodes): 每一个 Tag 是一个节点。
        边 (Edges): 如果文章 X 同时包含 Tag A 和 Tag B，则 A 与 B 之间产生一条连线。
        权重: 共现次数越多，连线越粗/越亮；文章数越多，节点越大。
    交互: 拖拽节点、缩放、点击节点筛选文章。

3.5 全局辅助

    返回顶部 (Back to Top): 页面右下角悬浮按钮，长页面自动显示。

4. 后端接口设计 (Elysia.js 示例)

Agent 在开发时需遵循类似的 API 结构：
TypeScript

// 示例：Elysia 伪代码
import { Elysia } from 'elysia'

new Elysia()
    // 获取文章列表 (Blog)
    .get('/posts', ({ query }) => { /* ... return list sorted by update_time */ })
    
    // 获取 TIL 列表
    .get('/tils', () => { /* ... return light-weight snippets */ })
    
    // 获取侧边栏配置 (手动控制的高频文章 + 友链)
    .get('/sidebar-config', () => { 
        return {
            featured: [/* IDs specified by user */],
            blogroll: [/* links */]
        }
    })
    
    // 获取标签图谱数据
    .get('/tag-graph', () => {
        // 计算逻辑：遍历所有文章，统计 Tag 共现关系
        // 返回格式需适配前端图形库: { nodes: [], links: [] }
    })
    .listen(3000)

5. Agent 执行指令 (Prompt)

    "请基于 Elysia.js (Backend) 和 React (Frontend) 为我初始化这个博客项目。

    第一步：

        搭建 Elysia 服务器，设计一个简单的数据结构来区分 Blog Post (长文) 和 TIL (短文)。
        实现一个能够计算 Tag 关联性（Co-occurrence）的算法接口，为前端的 3D 图谱做准备。

    第二步：

        完成前端编辑器组件：重点实现 Markdown 的实时预览，以及你如何通过 CSS 实现‘取消模糊遮罩’的 Spoiler 效果。

    注意： 侧边栏的‘高频访问’列表不要写死逻辑，我需要一个配置文件来手动控制它。"
