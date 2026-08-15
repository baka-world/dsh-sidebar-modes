# dsh-sidebar-modes

DeepSeek Harness Web GUI 侧边栏模式插件：把会话 header 变成右侧边栏，支持紧凑模式与 56px 收起窄条，三态持久化，收/展动画右锚定、无漂移。

- 紧凑模式：压缩 header / dock / 输入框与行距，加宽正文列
- 右侧边栏：标题面包屑、权限状态、Session log、Chat / Trajectory 竖排
- 收起窄条：模式图标 + 圆形 Chat / Trajectory 图标，`«` / `»` 切换
- 双击标题进入开发者模式，显示两个常驻开关
- 状态经 `localStorage`（`dsh-ui-layout-plugin-v1`）持久化，切换会话不重置，冷挂载不重放动画

## 安装（web profile）

1. 克隆到本地：`git clone https://github.com/baka-world/dsh-sidebar-modes`
2. 在 `~/.dsh/profiles/web/package.json` 里加入：

```json
{
  "dependencies": {
    "dsh-sidebar-modes": "link:/绝对路径/dsh-sidebar-modes"
  },
  "dsh": {
    "profile": {
      "bundles": ["@deepseek-ai/dsh-base", "@deepseek-ai/dsh-web-app", "dsh-sidebar-modes"]
    }
  }
}
```

3. `cd ~/.dsh/profiles/web && pnpm install`
4. 重启 `dsh web`

## 使用

- header 右侧出现「紧凑模式 / 侧边栏 / »」三个按钮
- 点 `»` 收起为 56px 窄条，点 `«` 打开侧边栏
- 双击标题切换开发者模式（标题变蓝）

## License

MIT
