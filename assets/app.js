/* ============ 芯汇通 SourcIC · 公共组件与交互 ============ */

/* ---------- 顶部导航 ---------- */
function renderHeader(active, opts){
  opts = opts || {};
  const megaCols = [[],[],[],[]];
  CATEGORIES.forEach((c,i)=> megaCols[i % 4].push(c));

  const mega = `<div class="mega"><div class="mega-grid">${
    megaCols.map(col => `<div class="mega-col">${
      col.map(c => `<h5><span>${c.icon}</span>${c.name}</h5>${
        c.subs.slice(0,6).map(s=>`<a href="search.html?cat=${encodeURIComponent(c.name)}&sub=${encodeURIComponent(s)}">${s}</a>`).join('')
      }`).join('')
    }</div>`).join('')
  }</div></div>`;

  const links = [
    ['index.html','首页',''],
    ['search.html','现货库存',''],
    ['buyer.html?tab=bom','BOM 配单','dot'],
    ['seller.html','卖家中心',''],
    ['buyer.html','买家中心',''],
    ['trust.html','担保交易',''],
    ['brands.html','品牌厂家',''],
    ['ai.html','AI 找料','dot']
  ];

  document.getElementById('app-header').innerHTML = `
  <div class="topbar"><div class="wrap">
    <div class="row center gap12">
      <span>📍 立足深圳 · 服务全球电子元器件供应链</span>
      <span class="role-tag">${opts.role || '游客浏览中'}</span>
    </div>
    <div class="row center">
      <a href="register.html">免费注册</a>
      <a href="register.html">登录</a>
      <a href="seller.html">卖家中心</a>
      <a href="buyer.html">买家中心</a>
      <a href="trust.html">交易保障</a>
      <a href="info.html?t=help">帮助中心</a>
    </div>
  </div></div>

  <header class="hdr"><div class="wrap hdr-main">
    <a href="index.html" class="logo">
      <div class="logo-mark"><svg viewBox="0 0 38 38" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="20" height="20" rx="4"/><path d="M14 9V5M19 9V5M24 9V5M14 29V33M19 29V33M24 29V33M9 14H5M9 19H5M9 24H5M29 14H33M29 19H33M29 24H33"/><path d="M9 9L19 19M29 9L19 19M9 29L19 19M29 29L19 19" stroke-width="1.2"/></g><circle cx="19" cy="19" r="3.4" fill="#FF6B00"/></svg></div>
      <div class="logo-txt"><strong>芯汇通</strong><span>SOURCIC</span></div>
    </a>
    <div class="searchbox">
      <form class="searchbar" onsubmit="doSearch(event)">
        <select id="q-type">
          <option>型号</option><option>品牌</option><option>参数</option><option>卖家</option>
        </select>
        <input id="q-kw" placeholder="输入型号 / 参数 / 品牌，如 STM32F103C8T6、0603 10K 1%" value="${opts.kw||''}">
        <button type="submit">🔍 搜索</button>
      </form>
      <div class="hotwords">
        <span>热搜：</span>
        <a href="search.html?kw=STM32F103C8T6">STM32F103C8T6</a>
        <a href="search.html?kw=ESP32">ESP32 模组</a>
        <a href="search.html?kw=0603">0603 电容</a>
        <a href="search.html?kw=AO3400A">AO3400A</a>
        <a href="search.html?kw=GD32">国产替代</a>
      </div>
    </div>
    <div class="hdr-actions">
      <a href="buyer.html" class="btn btn-ghost">📋 我的询价 <span class="tag tag-org">3</span></a>
      <a href="seller.html?tab=upload" class="btn btn-accent">⬆ 上传库存</a>
    </div>
  </div></header>

  <nav class="nav"><div class="wrap">
    <div class="nav-cat">☰ 全部器件分类 ${mega}</div>
    <div class="nav-links">
      ${links.map(l=>`<a href="${l[0]}" class="${active===l[0]?'on':''}">${l[1]}${l[2]?'<span class="dot"></span>':''}</a>`).join('')}
    </div>
  </div></nav>`;
}

/* ---------- 页脚 ---------- */
function renderFooter(){
  document.getElementById('app-footer').innerHTML = `
  <footer class="ftr"><div class="wrap">
    <div class="ftr-main">
      <div>
        <div class="logo" style="margin-bottom:12px">
          <div class="logo-mark"><svg viewBox="0 0 38 38" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="20" height="20" rx="4"/><path d="M14 9V5M19 9V5M24 9V5M14 29V33M19 29V33M24 29V33M9 14H5M9 19H5M9 24H5M29 14H33M29 19H33M29 24H33"/><path d="M9 9L19 19M29 9L19 19M9 29L19 19M29 29L19 19" stroke-width="1.2"/></g><circle cx="19" cy="19" r="3.4" fill="#FF6B00"/></svg></div>
          <div class="logo-txt"><strong style="color:#fff">芯汇通</strong><span>SOURCIC</span></div>
        </div>
        <p style="line-height:1.8">聚合国内授权代理商、独立贸易商与工厂呆料库存，<br>为电子制造企业提供可验证、可担保、可追溯的<br>元器件现货交易平台。</p>
        <div class="row gap8 mt16">
          <span class="tag tag-line" style="color:#98a2ae;border-color:#3a444f">✓ 平台担保交易</span>
          <span class="tag tag-line" style="color:#98a2ae;border-color:#3a444f">✓ 假一赔十</span>
        </div>
      </div>
      <div><h6>买家服务</h6>
        <a href="search.html">现货搜索</a><a href="buyer.html?tab=bom">BOM 一键配单</a>
        <a href="buyer.html">询价管理</a><a href="trust.html">担保交易流程</a><a href="info.html?t=invoice">发票与账期</a></div>
      <div><h6>卖家服务</h6>
        <a href="seller.html?tab=upload">库存上传</a><a href="seller.html">卖家后台</a>
        <a href="register.html">企业认证入驻</a><a href="info.html?t=promotion">推广与排名</a><a href="info.html?t=api">开放 API / ERP 对接</a></div>
      <div><h6>交易保障</h6>
        <a href="trust.html">资金托管说明</a><a href="trust.html">品质争议处理</a>
        <a href="trust.html">第三方检测合作</a><a href="info.html?t=logistics">物流与验收</a><a href="info.html?t=penalty">违规处罚规则</a></div>
      <div><h6>关于平台</h6>
        <a href="info.html?t=about">关于我们</a><a href="info.html?t=partner">商务合作</a><a href="info.html?t=career">加入我们</a>
        <a href="info.html?t=privacy">隐私政策</a><a href="info.html?t=agreement">用户协议</a></div>
    </div>
    <div class="ftr-bot">
      <span>© 2026 芯汇通 SourcIC（sourcic.cn） · 原型演示版 v0.1 · 数据均为模拟数据，仅用于产品验证</span>
      <span>粤ICP备00000000号 · 增值电信业务经营许可证</span>
    </div>
  </div></footer>`;
}

/* ---------- 搜索跳转 ---------- */
function doSearch(e){
  e.preventDefault();
  const kw = document.getElementById('q-kw').value.trim();
  location.href = 'search.html' + (kw ? '?kw=' + encodeURIComponent(kw) : '');
}

/* ---------- 演示水印 ---------- */
function renderDemoNote(text){
  const d = document.createElement('div');
  d.className = 'demo-note';
  d.innerHTML = `<i></i> 原型演示 · ${text || '数据为模拟数据'}`;
  document.body.appendChild(d);
}

/* ---------- 联系方式脱敏（核心商业规则：防跳单） ---------- */
function unmask(el, real){
  if(!confirm('查看卖家联系方式将消耗 1 次「联系额度」，并记录到交易溯源日志。\n\n提示：平台建议优先使用站内 IM 沟通，线下成交不受平台担保保护。\n\n确认查看？')){ return; }
  el.closest('.masked').innerHTML = `<span>${real}</span><span class="tag tag-warn">已解锁 · 已记录</span>`;
}

/* ---------- 通用提示 ---------- */
function demoTip(msg){
  alert('【原型演示】\n\n' + (msg || '该功能在正式版本中提供，当前为交互占位。'));
}

/* ---------- 产品卡片 ---------- */
function productCard(p){
  const s = SELLERS[p.seller];
  return `<a class="pcard" href="product.html?id=${p.id}">
    <div class="pimg">${compSVG(p.icon, 84)}</div>
    <div class="pmpn">${p.mpn}</div>
    <div class="pdesc">${p.desc}</div>
    <div class="row center gap4 mb8">
      <span class="tag tag-blue">${fmt.brandCn(p.brand)}</span>
      <span class="tag tag-gray">${p.dateCode}</span>
      ${p.quality==='全新原装'?'<span class="tag tag-ok">原装</span>':'<span class="tag tag-warn">'+p.quality+'</span>'}
    </div>
    <div class="pprice">${fmt.price(p.tiers[0].p)} <small>起 / MOQ ${fmt.qty(p.moq)}</small></div>
    <div class="pmeta"><span>库存 ${fmt.qty(p.qty)}</span><span>${s.type}</span></div>
  </a>`;
}
