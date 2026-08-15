/**
 * dsh-sidebar-modes browser half: hand-written module-table bundle (no build
 * step), following the dsh-notify pattern. The plugin body below is the
 * audited dynamic-plugin source (repo: .playwright-mcp/fixed-plugin.js);
 * the only adaptation is the styles shim replacing the dynamic runner's
 * styles.insert symbol.
 */
window.__ModuleLoader__.load({
  id: 'dsh-sidebar-modes',
  factory: (require) => {
    var module = { exports: {} }
    var exports = module.exports
    const React = require('react')
    const styles = {
      insert(css) {
        const tag = document.createElement('style')
        tag.dataset.dyn = 'dsh-sidebar-modes'
        tag.textContent = css
        document.head.append(tag)
        return () => { tag.remove() }
      },
    }
    const plugin = (function () {
return {
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    // Shared layout state: one closure object survives header remounts
    // (session switches), and localStorage restores it after a page reload.
    const LAYOUT_KEY = 'dsh-ui-layout-plugin-v1'
    const layout = { compact: true, sidebar: true, rail: false }
    if (typeof localStorage !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem(LAYOUT_KEY))
        if (saved !== null && typeof saved === 'object') {
          layout.compact = saved.compact !== false
          layout.sidebar = saved.sidebar !== false
          layout.rail = saved.rail === true
        }
      } catch {
        // Corrupt persistence only falls back to defaults; in-memory state is unaffected.
      }
    }
    const saveLayout = () => {
      if (typeof localStorage === 'undefined') return
      try {
        localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout))
      } catch {
        // Quota or private-mode failure keeps the in-memory state working for this page.
      }
    }
    const enc = (s) => s.replace(/%/g, '%25').replace(/ /g, '%20').replace(/#/g, '%23').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/"/g, '%22')
    const chatSvg = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'><rect x='2' y='2.8' width='12' height='9' rx='4.5' stroke='COLOR' stroke-width='1.3'/><path d='M6 11.8v2.4l4-2.4' stroke='COLOR' stroke-width='1.3' stroke-linejoin='round'/></svg>"
    const trajSvg = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'><path d='M3 12l3.6-3.6 2.8 2.2 3.6-5.4' stroke='COLOR' stroke-width='1.3' stroke-linecap='round' stroke-linejoin='round'/><circle cx='3' cy='12' r='1.2' fill='COLOR'/><circle cx='13' cy='5.2' r='1.2' fill='COLOR'/></svg>"
    const uri = (svg, color) => 'url("data:image/svg+xml,' + enc(svg.split('COLOR').join(color)) + '")'
    const chatI = uri(chatSvg, '#8a8f98')
    const chatA = uri(chatSvg, '#ffffff')
    const trajI = uri(trajSvg, '#8a8f98')
    const trajA = uri(trajSvg, '#ffffff')
    const badgeSvg = "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'><mask id='mask0_agent_preset_16' maskUnits='userSpaceOnUse' x='0' y='0' width='16' height='16'><rect width='16' height='16' fill='white'/><circle cx='7.9995' cy='3.28319' r='1.712' fill='black'/><circle cx='3.51122' cy='11.3855' r='1.712' fill='black'/><circle cx='12.4878' cy='11.3855' r='1.712' fill='black'/></mask><path mask='url(#mask0_agent_preset_16)' d='M12.2881 11.0425C12.6002 11.3723 13.0413 11.5786 13.5312 11.5786L13.5342 11.5776C13.1476 12.3233 12.6119 12.9785 11.9639 13.5005C10.9327 14.3309 9.6199 14.8286 8.19336 14.8286C7.29864 14.8285 6.45056 14.6313 5.6875 14.2808C6.08309 14.0281 6.36707 13.6189 6.45215 13.1392C6.99022 13.3561 7.57767 13.476 8.19336 13.4761C9.30019 13.4761 10.3157 13.0915 11.1152 12.4478C11.5935 12.0626 11.9924 11.5848 12.2881 11.0425ZM4.14746 4.36475C4.25569 4.83228 4.55488 5.2247 4.95898 5.4585C4.07956 6.30639 3.53144 7.49605 3.53125 8.81396C3.53125 9.69534 3.77613 10.5202 4.20117 11.2231C3.74959 11.3817 3.38395 11.7232 3.19531 12.1597C2.5541 11.2032 2.17969 10.052 2.17969 8.81396C2.17989 7.05087 2.93868 5.4646 4.14746 4.36475ZM8.19336 2.80029C8.85717 2.80029 9.49784 2.90834 10.0967 3.10791C12.3237 3.85044 13.9725 5.86061 14.1846 8.28369C13.9832 8.20048 13.7627 8.15382 13.5312 8.15381C13.2802 8.15381 13.042 8.20907 12.8271 8.30615C12.6281 6.47264 11.3666 4.95616 9.66895 4.39014C9.2063 4.236 8.70989 4.15186 8.19336 4.15186C7.96112 4.15189 7.7329 4.16981 7.50977 4.20264C7.51947 4.12886 7.52637 4.05348 7.52637 3.97705C7.52628 3.56604 7.3811 3.18914 7.13965 2.89404C7.48183 2.83352 7.83381 2.80033 8.19336 2.80029Z' fill='COLOR'/><path d='M9.1123 3.28271C9.11205 2.66858 8.61322 2.17041 7.99902 2.17041C7.38504 2.17067 6.88697 2.66874 6.88672 3.28271C6.88672 3.89691 7.38489 4.39574 7.99902 4.396C8.61338 4.396 9.1123 3.89707 9.1123 3.28271ZM10.3115 3.28271C10.3115 4.55981 9.27612 5.59521 7.99902 5.59521C6.72214 5.59496 5.6875 4.55965 5.6875 3.28271C5.68776 2.00599 6.7223 0.971447 7.99902 0.971191C9.27596 0.971191 10.3113 2.00584 10.3115 3.28271Z' fill='COLOR'/><path d='M4.62402 11.385C4.62377 10.7709 4.12494 10.2727 3.51074 10.2727C2.89676 10.273 2.39869 10.771 2.39844 11.385C2.39844 11.9992 2.89661 12.498 3.51074 12.4983C4.1251 12.4983 4.62402 11.9994 4.62402 11.385ZM5.82324 11.385C5.82324 12.6621 4.78784 13.6975 3.51074 13.6975C2.23386 13.6973 1.19922 12.6619 1.19922 11.385C1.19947 10.1083 2.23402 9.07374 3.51074 9.07349C4.78768 9.07349 5.82299 10.1081 5.82324 11.385Z' fill='COLOR'/><path d='M13.6006 11.385C13.6003 10.7709 13.1015 10.2727 12.4873 10.2727C11.8733 10.273 11.3753 10.771 11.375 11.385C11.375 11.9992 11.8732 12.498 12.4873 12.4983C13.1017 12.4983 13.6006 11.9994 13.6006 11.385ZM14.7998 11.385C14.7998 12.6621 13.7644 13.6975 12.4873 13.6975C11.2104 13.6973 10.1758 12.6619 10.1758 11.385C10.176 10.1083 11.2106 9.07374 12.4873 9.07349C13.7642 9.07349 14.7995 10.1081 14.7998 11.385Z' fill='COLOR'/></svg>"
    const badgeI = uri(badgeSvg, '#8a8f98')
    ctx.effect(() => styles.insert(
      // Two-phase collapse: the expanded layout holds and fades in place while
      // the track shrinks (0-50% = 150ms), the rail layout swaps in while fully
      // transparent (50%), then the rail enters with a mirrored left-sidebar
      // rail-in (translateX(-49px) + fade, 150ms). Every horizontal anchor is
      // pinned to the fixed right edge, so nothing tracks the moving track.
      '@keyframes dsh-tablist-collapse{0%{opacity:1;top:var(--dsh-tablist-top,180px);right:12px;left:auto;width:216px;align-items:stretch;gap:4px;padding-left:4px;transform:none;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}49.99%{opacity:0;top:var(--dsh-tablist-top,180px);right:12px;left:auto;width:216px;align-items:stretch;gap:4px;padding-left:4px;transform:none}50%{opacity:0;top:66px;right:0;left:auto;width:56px;align-items:center;gap:12px;padding-left:0;transform:translateX(-49px);animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}100%{opacity:1;top:66px;right:0;left:auto;width:56px;align-items:center;gap:12px;padding-left:0;transform:none}}' +
      '@keyframes dsh-tablist-expand{0%{opacity:0}100%{opacity:1}}' +
      '@keyframes dsh-tab-collapse{0%,49.99%{width:auto;height:auto;padding:6px 8px;border-radius:8px;font-size:13px;justify-content:flex-start;gap:6px;text-align:left}50%,100%{width:36px;height:36px;padding:0;border-radius:50%;font-size:0;justify-content:center;gap:0;text-align:center}}' +
      '@keyframes dsh-tab-expand{0%,100%{width:auto;height:auto;padding:6px 8px;border-radius:8px;font-size:13px;justify-content:flex-start;gap:6px;text-align:left}}' +
      '@keyframes dsh-icon-collapse{0%,49.99%{width:14px;height:14px}50%,100%{width:16px;height:16px}}' +
      '@keyframes dsh-icon-expand{0%,100%{width:14px;height:14px}}' +
      '@keyframes dsh-indicator-collapse{0%{opacity:1;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}50%,100%{opacity:0}}' +
      '@keyframes dsh-indicator-expand{0%{opacity:0;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}100%{opacity:1}}' +
      '@keyframes dsh-mode-icon-collapse{0%,49.99%{opacity:0;position:absolute;height:0;margin-bottom:0}50%{opacity:0;position:relative;height:16px;margin-bottom:4px;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}100%{opacity:.75;position:relative;height:16px;margin-bottom:4px}}' +
      "@keyframes dsh-toggle-glyph-collapse{0%,49.99%{content:'»';font-size:12px}50%,100%{content:'«';font-size:16px}}" +
      "@keyframes dsh-toggle-glyph-expand{0%,100%{content:'»';font-size:12px}}" +
      "@keyframes dsh-toggle-collapse{0%{opacity:1;top:12px;right:12px;left:auto;width:auto;height:28px;padding:0 12px;transform:none;border-radius:999px;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}49.99%{opacity:0;top:12px;right:12px;left:auto;width:auto;height:28px;padding:0 12px;transform:none;border-radius:999px}50%{opacity:0;top:14px;right:10px;left:auto;width:36px;height:36px;padding:0;transform:translateX(-49px);border-radius:50%;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}100%{opacity:1;top:14px;right:10px;left:auto;width:36px;height:36px;padding:0;transform:none;border-radius:50%}}" +
      "@keyframes dsh-toggle-expand{0%{opacity:0;top:12px;right:12px;left:auto;width:auto;height:28px;padding:0 12px;transform:none;border-radius:999px;animation-timing-function:var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}100%{opacity:1;top:12px;right:12px;left:auto;width:auto;height:28px;padding:0 12px;transform:none;border-radius:999px}}" +
      '.ui-mode-btn{flex:none;white-space:nowrap;height:28px;padding:0 12px;border:none;border-radius:999px;background:transparent;color:var(--dsw-alias-label-secondary,#8a8f98);font-family:Inter,var(--dsw-font-family,system-ui);font-size:12px;line-height:28px;cursor:pointer;transition:background .15s}' +
      '.ui-mode-btn:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}' +
      ".ui-mode-btn[data-compact='on'],.ui-mode-btn[data-sidebar='on']{color:var(--dsw-alias-brand-primary,#4d6bfe);background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}" +
      '.ui-mode-btn + .ui-mode-btn{margin-left:8px}' +
      '.ui-mode-btn[data-rail]{display:none}' +
      "[data-phase]:has([data-sidebar='on']) .ui-mode-btn[data-rail]{display:inline-flex;align-items:center;justify-content:center;position:absolute;top:12px;right:12px;left:auto;margin:0;z-index:10;overflow:hidden;color:transparent!important;font-size:0!important;animation:dsh-toggle-expand 200ms both}" +
      "[data-phase]:has([data-sidebar='on']) .ui-mode-btn[data-rail]::before{content:'»';color:var(--dsw-alias-label-primary,#262626);font-size:12px;line-height:1.3;animation:dsh-toggle-glyph-expand 200ms both}" +
      "[data-phase]:has([data-compact='on']) [data-slot='conversation.session.header'] header{padding:4px 28px 0 20px}" +
      "[data-phase]:has([data-compact='on']) [data-slot='conversation.session.header'] header > div:first-child{min-height:20px}" +
      "[data-phase]:has([data-compact='on']):not(:has([data-sidebar='on'])) [role='tablist']{gap:24px;margin-top:2px}" +
      "[data-phase]:has([data-compact='on']):not(:has([data-sidebar='on'])) [role='tab']{padding-bottom:6px}" +
      "[data-phase]:has([data-compact='on']) [data-conversation-scroll]{--dsh-chat-content-width:860px;--dsh-composer-card-max-width:calc(860px + 32px)}" +
      "[data-phase]:has([data-compact='on']) [data-chat-flow-key]{margin-bottom:-8px;line-height:24px}" +
      "[data-phase]:has([data-compact='on']) [data-chat-flow-key] p,[data-phase]:has([data-compact='on']) [data-chat-flow-key] li,[data-phase]:has([data-compact='on']) [data-chat-flow-key] blockquote{line-height:24px}" +
      "[data-phase]:has([data-compact='on']) [data-composer-seat]{--dsh-composer-text-max-height:96px}" +
      "[data-phase]:has([data-compact='on']) [data-composer-seat] > div{--dsh-composer-stack-gap:2px}" +
      "[data-phase]:has([data-compact='on']) [data-composer-card]{padding-top:4px;gap:4px;font-size:14px}" +
      "[data-phase]:has([data-compact='on']) [data-queue-dock] button{height:24px;padding:2px 12px}" +
      "[data-phase]:has([data-compact='on']) [data-queue-dock] ul > li{height:24px}" +
      "[data-phase]:has([data-compact='on']) [data-goal-bar]{height:24px;padding:2px 5px 2px 12px}" +
      "[data-phase]:has([data-compact='on']) .ui-demo-row{height:24px}" +
      "[data-phase]:has([data-compact='on']) .ui-demo-note{display:none}" +
      "[data-phase]:has([data-sidebar='on']){flex-direction:row}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header{order:2;flex:0 0 220px;display:flex;flex-direction:column;align-items:flex-end;padding:6px 12px 12px;border-bottom:none;border-left:1px solid var(--dsw-alias-border-l1,rgba(128,128,128,.2));background:var(--dsw-specific-sidebar-fill,rgba(128,128,128,.05));overflow-y:auto;overflow-x:hidden;transition:flex-basis 300ms var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1))}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header::after{display:none}" +
      "[data-phase]:has([data-sidebar='on']) > [data-conversation-scroll]{order:1;min-width:0}" +
      "[data-phase]:has([data-sidebar='on']) [data-composer-card]{box-shadow:none}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav{margin-right:44px;white-space:normal;overflow:visible;flex-direction:column;align-items:flex-start;gap:0}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav,[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child > div:last-child,[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:not(.ui-mode-btn),[data-phase]:has([data-sidebar='on']) .ui-mode-btn:not([data-rail]){opacity:1;visibility:visible;max-height:200px;transition:opacity 200ms var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1)),visibility 0s,max-height 0s}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child{width:220px;min-width:220px;min-height:0;flex-direction:column;align-items:stretch;gap:16px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child > div:first-child{flex-direction:column;align-items:stretch;gap:12px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child > div:first-child > div:nth-child(2){position:static;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px 8px;padding-top:0;border-top:none}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:first-child{align-self:center;min-width:0;font-size:13px;line-height:28px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:first-child svg{flex:none;margin-right:2px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:nth-child(2){justify-self:end}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:nth-child(2) button{height:28px;align-items:center;gap:6px;line-height:20px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:nth-child(3){grid-column:1/-1;justify-self:start;margin:0}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:nth-child(3) button{height:28px;align-items:center;gap:6px;line-height:20px;color:var(--dsw-alias-label-secondary,#8a8f98)}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:nth-child(3) [data-state='ongoing']{color:var(--dsw-alias-brand-primary,#4d6bfe)}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > .ui-mode-btn:not([data-rail]){grid-row:4;justify-self:start;margin:10px 0 0;padding:0 10px}" +
      "[data-phase]:has([data-sidebar='on']) .ui-mode-btn[data-sidebar]:not([data-rail]){grid-column:2;margin-left:-4px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > .ui-mode-btn[data-compact]{position:relative}" + "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > .ui-mode-btn[data-compact]::before{content:'显示';position:absolute;left:0;top:-24px;color:var(--dsw-alias-label-caption,#8a8f98);font-size:11px;font-weight:500;line-height:16px;letter-spacing:.02em;pointer-events:none}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav > span{display:inline-flex;white-space:normal;max-width:100%;font-size:14px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-primary,#262626)}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav > span:not(:last-child){font-size:12px;line-height:18px;font-weight:400;color:var(--dsw-alias-label-secondary,#8a8f98)}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav > span:not(:last-child)::after{content:'›';margin:0 6px;color:var(--dsw-alias-label-caption,#8a8f98);font-size:11px}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav > span:last-child button{max-width:100%;max-height:40px;font-size:14px;line-height:20px;font-weight:500;color:var(--dsw-alias-label-primary,#262626);white-space:normal;overflow:hidden;text-overflow:ellipsis}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header nav > span:not(:last-child) button{max-width:100%;max-height:36px;font-size:12px;line-height:18px;font-weight:400;color:var(--dsw-alias-label-secondary,#8a8f98);white-space:normal;overflow:hidden;text-overflow:ellipsis}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child > div:last-child{position:relative;display:flex;flex-direction:row;align-items:center;gap:10px;margin-left:0;padding-top:8px;max-width:100%;min-width:0}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header'] header > div:first-child > div:last-child::before{content:'Session log';position:static;flex:none;color:var(--dsw-alias-label-caption,#8a8f98);font-size:11px;font-weight:500;line-height:16px;letter-spacing:.02em;pointer-events:none}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.utilities'] > button{width:28px;min-width:28px;height:28px;min-height:28px;padding:0;justify-content:center;gap:0;color:var(--dsw-alias-label-secondary,#8a8f98);font-size:0}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.utilities'] > button span{display:none}" +
      "[data-phase]:has([data-sidebar='on']) [role='tablist']{--dsh-tablist-top:180px;position:absolute;top:var(--dsh-tablist-top,180px);right:12px;left:auto;width:216px;display:flex;flex-direction:column;align-items:stretch;gap:4px;padding-left:4px;animation:dsh-tablist-expand 200ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-dev='on']) [role='tablist']{--dsh-tablist-top:240px}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab']{display:inline-flex;align-items:center;justify-content:flex-start;gap:6px;width:auto;height:auto;padding:6px 8px;border-radius:8px;text-align:left;font-size:13px;line-height:20px;white-space:nowrap;color:var(--dsw-alias-label-secondary,#8a8f98);animation:dsh-tab-expand 200ms both}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab']::before{content:\"\";flex:none;width:14px;height:14px;background:center/contain no-repeat " + chatI + ";animation:dsh-icon-expand 200ms both;transition:background 0s linear 120ms}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab']:nth-child(2)::before{background:center/contain no-repeat " + trajI + "}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab']:hover{color:var(--dsw-alias-label-primary,#262626);background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab']::after{top:50%;bottom:auto;right:auto;left:-4px;width:2px;height:16px;border-radius:2px;transform:translateY(-50%);animation:dsh-indicator-expand 200ms both}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab'][aria-selected='true']{color:var(--dsw-alias-label-primary,#262626);background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12));font-weight:500;transition:background-color 0s linear 120ms,color 0s linear 120ms}" +
      "[data-phase]:has([data-sidebar='on']) [role='tab'][aria-selected='true']::after{background:var(--dsw-alias-brand-primary,#4d6bfe)}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:not(.ui-mode-btn){anchor-name:--dsh-trigger-anchor;anchor-scope:--dsh-trigger-anchor}" +
      "[data-phase]:has([data-sidebar='on']) [data-slot='conversation.session.header.actions'] > *:not(.ui-mode-btn) > :is(ul,[role='tree']){position:fixed!important;left:auto!important;right:anchor(--dsh-trigger-anchor right)!important;top:calc(anchor(--dsh-trigger-anchor bottom) + 5px)!important}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header{flex:0 0 32px;padding:6px 12px 12px;align-items:flex-end;overflow:hidden;background:var(--dsw-specific-sidebar-fill,rgba(128,128,128,.05))}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header > div:first-child{flex:0 0 auto}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header > div:first-child > div:first-child{width:100%;min-width:0;flex:0 0 auto;justify-content:flex-start}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header nav,[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header > div:first-child > div:last-child,[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header.actions'] > *:not(.ui-mode-btn),[data-phase]:has([data-sidebar='on']):has([data-rail='on']) .ui-mode-btn:not([data-rail]){opacity:0;visibility:hidden;max-height:0;overflow:hidden;transition:opacity 150ms var(--ds-ease-in-out,cubic-bezier(0.4,0,0.2,1)),visibility 0s linear 150ms,max-height 0s linear 150ms}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header nav{white-space:nowrap;flex-wrap:nowrap;overflow:hidden}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [data-slot='conversation.session.header'] header > div:first-child > div:last-child{white-space:nowrap;flex-wrap:nowrap;overflow:hidden}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tablist']{top:66px;right:0;left:auto;align-items:stretch;gap:4px;padding-left:4px;width:56px;animation:dsh-tablist-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tablist']::before{content:\"\";position:absolute;flex:none;width:16px;height:0;margin-bottom:0;background:center/contain no-repeat var(--dsh-mode-icon, " + badgeI + ");opacity:.75;animation:dsh-mode-icon-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tab']{justify-content:center;gap:0;width:36px;height:36px;padding:0;border-radius:50%;font-size:0;text-align:center;animation:dsh-tab-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tab']::before{width:16px;height:16px;animation:dsh-icon-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tab']::after{display:block;animation:dsh-indicator-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) [role='tab'][aria-selected='true']{color:var(--dsw-alias-label-primary,#262626);background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) .ui-mode-btn[data-rail]{top:14px;right:10px;left:auto;display:flex!important;align-items:center;justify-content:center;width:36px;height:36px;padding:0;margin:0;border-radius:50%;background:transparent;color:transparent!important;font-size:0!important;line-height:36px;animation:dsh-toggle-collapse 300ms both}" +
      "[data-phase]:has([data-sidebar='on']):has([data-rail='on']) .ui-mode-btn[data-rail]::before{content:'«';font-size:16px;line-height:1.3;animation:dsh-toggle-glyph-collapse 300ms both}" +
      "[data-phase]:not(:has([data-dev='on'])) .ui-mode-btn[data-compact],[data-phase]:not(:has([data-dev='on'])) .ui-mode-btn[data-sidebar]{display:none!important}" +
      "[data-phase]:has([data-dev='on']) [data-slot='conversation.session.header'] header nav > span:last-child button{color:#4d6bfe!important;background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12))!important}" +
      // Cold mounts (session switches, slot remounts) must not replay entry
      // animations: settle straight into the final layout. The rail button
      // stamps data-cold on mount and removes it on the first real toggle.
      "[data-phase][data-cold] [data-slot='conversation.session.header'] header{transition:none}" +
      "[data-phase][data-cold] [role='tablist'],[data-phase][data-cold] [role='tablist']::before,[data-phase][data-cold] [role='tab'],[data-phase][data-cold] [role='tab']::before,[data-phase][data-cold] [role='tab']::after,[data-phase][data-cold] .ui-mode-btn[data-rail],[data-phase][data-cold] .ui-mode-btn[data-rail]::before{animation:none!important}" +
      "[data-phase][data-cold]:has([data-rail='on']) [role='tablist']{align-items:center;gap:12px;padding-left:0}" +
      "[data-phase][data-cold]:has([data-rail='on']) [role='tablist']::before{position:relative;height:16px;margin-bottom:4px}" +
      "[data-phase][data-cold] [data-slot='conversation.session.header'] header nav,[data-phase][data-cold] [data-slot='conversation.session.header'] header > div:first-child > div:last-child,[data-phase][data-cold] [data-slot='conversation.session.header.actions'] > *:not(.ui-mode-btn),[data-phase][data-cold] .ui-mode-btn:not([data-rail]){transition:none}" +
      '@media (prefers-reduced-motion:reduce){[data-phase]:has([data-sidebar=\'on\']) [data-slot=\'conversation.session.header\'] header{transition:none}[data-phase]:has([data-sidebar=\'on\']) [role=\'tablist\'],[data-phase]:has([data-sidebar=\'on\']) [role=\'tablist\']::before,[data-phase]:has([data-sidebar=\'on\']) [role=\'tab\'],[data-phase]:has([data-sidebar=\'on\']) [role=\'tab\']::before,[data-phase]:has([data-sidebar=\'on\']) [role=\'tab\']::after,[data-phase]:has([data-sidebar=\'on\']) .ui-mode-btn[data-rail],[data-phase]:has([data-sidebar=\'on\']) .ui-mode-btn[data-rail]::before{animation:none}[data-phase]:has([data-sidebar=\'on\']):has([data-rail=\'on\']) [role=\'tablist\']{align-items:center;gap:12px;padding-left:0}[data-phase]:has([data-sidebar=\'on\']):has([data-rail=\'on\']) [role=\'tablist\']::before{position:relative;height:16px;margin-bottom:4px}[data-phase]:has([data-sidebar=\'on\']) [data-slot=\'conversation.session.header\'] header nav,[data-phase]:has([data-sidebar=\'on\']) [data-slot=\'conversation.session.header\'] header > div:first-child > div:last-child,[data-phase]:has([data-sidebar=\'on\']) [data-slot=\'conversation.session.header.actions\'] > *:not(.ui-mode-btn),[data-phase]:has([data-sidebar=\'on\']) .ui-mode-btn:not([data-rail]){transition:none}}'
    ))
    ctx.effect(() => {
      if (typeof document === 'undefined' || typeof document.addEventListener !== 'function') return
      let lastDown = 0
      const onNavDown = (e) => {
        const header = document.querySelector('[data-slot="conversation.session.header"] header')
        if (!header) return
        const t = e.target
        if (!t || typeof t.closest !== 'function') return
        if (!t.closest('[data-slot="conversation.session.header"] header nav')) return
        const now = Date.now()
        if (now - lastDown < 400) {
          lastDown = 0
          header.dataset.dev = header.dataset.dev === 'on' ? 'off' : 'on'
        } else {
          lastDown = now
        }
      }
      document.addEventListener('pointerdown', onNavDown, true)
      return () => document.removeEventListener('pointerdown', onNavDown, true)
    })
    const registerToggle = (slots, id, order, label, attr, title) => {
      return slots.register(
        { name: 'conversation.session.header.actions', id: id, order: order, label: typeof label === 'function' ? '»' : label },
        (props) => {
          const [on, setOn] = React.useState(Boolean(layout[attr]))
          const text = typeof label === 'function' ? label(on) : label
          const tip = typeof title === 'function' ? title(on) : title
          if (attr !== 'rail') {
            return React.createElement('button', {
              type: 'button',
              className: 'ui-mode-btn',
              ['data-' + attr]: on ? 'on' : 'off',
              'aria-pressed': on,
              title: tip,
              onClick: () => {
                const next = !on
                layout[attr] = next
                setOn(next)
                saveLayout()
              },
            }, text)
          }
          // Rail button: stamp the phase as cold on mount so a remount
          // (session switch) renders the settled layout without replaying
          // entry animations; the first real toggle removes the stamp.
          // useRef keeps the interacted flag across re-renders: React calls
          // a changed ref callback with null then the node on every render,
          // which would otherwise re-stamp data-cold after the first click
          // and disable animations forever.
          const interacted = React.useRef(false)
          const ref = (node) => {
            if (node === null || interacted.current) return
            const phase = node.closest('[data-phase]')
            if (phase !== null) phase.dataset.cold = '1'
          }
          return React.createElement('button', {
            type: 'button',
            className: 'ui-mode-btn',
            ['data-' + attr]: on ? 'on' : 'off',
            'aria-pressed': on,
            title: tip,
            ref: ref,
            onClick: (event) => {
              const next = !on
              layout[attr] = next
              setOn(next)
              saveLayout()
              interacted.current = true
              const phase = event.currentTarget.closest('[data-phase]')
              if (phase !== null) phase.removeAttribute('data-cold')
            },
          }, text)
        },
      )
    }
    ctx.effect(() => {
      if (typeof document === 'undefined' || typeof MutationObserver !== 'function') return
      let lastUri = null
      const sync = () => {
        const svg = document.querySelector("[data-slot='conversation.session.header.actions'] > span svg")
        if (!svg) {
          if (lastUri !== null) {
            document.documentElement.style.removeProperty('--dsh-mode-icon')
            lastUri = null
          }
          return
        }
        const html = svg.outerHTML.replace(/fill=['"]currentColor['"]/g, "fill='#8a8f98'")
        const uri = 'url("data:image/svg+xml,' + encodeURIComponent(html) + '")'
        if (uri !== lastUri) {
          document.documentElement.style.setProperty('--dsh-mode-icon', uri)
          lastUri = uri
        }
      }
      sync()
      const mo = new MutationObserver(sync)
      mo.observe(document.documentElement, { subtree: true, childList: true })
      return () => mo.disconnect()
    })
    slots.inject('conversation.session.header.actions', () => {
      const compact = registerToggle(slots, 'compact-mode', 100, '紧凑模式', 'compact', '压缩 header / dock 条 / 输入框，加宽正文列，收紧行距与消息间距')
      const sidebar = registerToggle(slots, 'sidebar-mode', 101, '侧边栏', 'sidebar', '把 header 变成右侧竖栏，腾出整行高度')
      const rail = registerToggle(slots, 'rail-mode', 102, (on) => (on ? '«' : '»'), 'rail', (on) => (on ? '打开侧边栏' : '收起侧边栏'))
      return () => { compact(); sidebar(); rail() }
    })
  },
}

    })()
    exports.inject = ['slots']
    exports.apply = plugin.apply
    return module.exports
  },
})
