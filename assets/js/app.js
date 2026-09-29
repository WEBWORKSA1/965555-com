/* 965555.com — core app: layout, number engine, tools, forms, monetization */
(function () {
  "use strict";
  var S = window.SITE || {}, D = window.DIGITS || {}, C = window.COMBOS || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    sget: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    sset: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function ch() { return String.fromCharCode.apply(null, (S._c || []).map(function (c) { return c - 7; })).split("").reverse().join(""); }
  function toast(msg) { var t = $("#toast"); if (!t) return; t.textContent = msg; t.style.display = "block"; setTimeout(function () { t.style.display = "none"; }, 2600); }

  /* ---------- Layout ---------- */
  var NAV = [
    ["Tools", [["lucky-number-checker.html", "🔢 Lucky Number Checker"], ["number.html", "🔍 Number Meaning Lookup"], ["lucky-number-generator.html", "🎲 Lucky Number Generator"], ["lucky-date-checker.html", "📅 Lucky Date Checker"], ["chinese-zodiac-lucky-numbers.html", "🐉 Zodiac Lucky Numbers"], ["kua-number-calculator.html", "🧭 Kua Number Calculator"], ["red-envelope-amounts.html", "🧧 Red Envelope Amounts"], ["slang.html", "💬 Number Slang Decoder"]]],
    ["Meanings", [["meanings.html", "📖 Number Dictionary"], ["slang.html", "💬 Chinese Number Slang"], ["guide-chinese-lucky-numbers.html", "🍀 Lucky Numbers Guide"], ["guide-meaning-of-965555.html", "✨ What 965555 Means"]]],
    ["Guides", [["guides.html", "📚 All Guides"], ["guide-numeric-domains-china.html", "🌐 Numeric Domains & China"], ["guide-lucky-phone-numbers.html", "📱 Lucky Phone Numbers"], ["guide-lucky-license-plates.html", "🚗 Lucky License Plates"], ["guide-auspicious-wedding-dates.html", "💍 Wedding Dates"], ["cheat-sheet.html", "🖨️ Free Cheat Sheet"]]],
    ["Videos", "videos.html"],
    ["Community", [["contest.html", "🏆 Monthly Contest"], ["donate.html", "❤️ Support Us"], ["careers.html", "💼 Careers"], ["advertise.html", "📣 Advertise & Partner"], ["about.html", "ℹ️ About"], ["contact.html", "✉️ Contact"]]]
  ];
  function buildHeader() {
    var h = $("#site-header"); if (!h) return;
    var here = location.pathname.split("/").pop() || "index.html";
    var items = NAV.map(function (n) {
      if (typeof n[1] === "string") return '<li><a href="' + n[1] + '"' + (here === n[1] ? ' class="active"' : "") + ">" + n[0] + "</a></li>";
      return '<li><button aria-haspopup="true">' + n[0] + ' ▾</button><div class="dd">' + n[1].map(function (l) { return '<a href="' + l[0] + '"' + (here === l[0] ? ' class="active"' : "") + ">" + l[1] + "</a>"; }).join("") + "</div></li>";
    }).join("");
    h.className = "site-header";
    h.innerHTML = '<div class="container nav"><a class="logo" href="index.html" aria-label="965555.com home"><span class="logo-mark">福</span><span>965555<span style="color:var(--red)">.com</span><small>' + esc(S.brand || "") + '</small></span></a>' +
      '<ul class="menu" id="menu">' + items + '</ul>' +
      '<a class="btn btn-red btn-sm nav-cta" href="get-your-report.html">Free Report</a>' +
      '<button class="icon-btn" id="theme" aria-label="Toggle dark mode">🌓</button>' +
      '<button class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div>';
    $("#burger").onclick = function () { $("#menu").classList.toggle("open"); };
    $("#theme").onclick = function () { var d = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", d); store.set("theme", d); };
  }
  function buildFooter() {
    var f = $("#site-footer"); if (!f) return;
    var y = new Date().getFullYear();
    f.className = "site-footer";
    f.innerHTML = '<div class="container"><div class="fgrid">' +
      '<div><a class="logo" href="index.html" style="color:#fff"><span class="logo-mark">福</span><span>965555.com<small style="color:#a89c90">' + esc(S.tagline || "") + '</small></span></a>' +
      '<p style="margin-top:14px;font-size:.93rem">Free tools and guides that decode numbers through Chinese language, culture and feng shui. Get the free cheat sheet:</p>' +
      '<form class="nl" data-form="Newsletter signup" data-success="You\'re in! Check your inbox soon."><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><input type="email" name="email" placeholder="Your email" required aria-label="Email"><button class="btn btn-gold btn-sm">Join</button><div class="form-msg"></div></form></div>' +
      '<div><h4>Tools</h4><ul><li><a href="lucky-number-checker.html">Lucky Number Checker</a></li><li><a href="number.html">Number Meaning</a></li><li><a href="lucky-number-generator.html">Number Generator</a></li><li><a href="lucky-date-checker.html">Lucky Dates</a></li><li><a href="kua-number-calculator.html">Kua Calculator</a></li><li><a href="red-envelope-amounts.html">Red Envelope</a></li></ul></div>' +
      '<div><h4>Learn</h4><ul><li><a href="meanings.html">Number Dictionary</a></li><li><a href="slang.html">Number Slang</a></li><li><a href="chinese-zodiac-lucky-numbers.html">Zodiac Numbers</a></li><li><a href="guides.html">Guides</a></li><li><a href="videos.html">Videos</a></li><li><a href="faq.html">FAQ</a></li></ul></div>' +
      '<div><h4>Get Involved</h4><ul><li><a href="get-your-report.html">Free Lucky Report</a></li><li><a href="contest.html">Monthly Contest</a></li><li><a href="donate.html">Donate / Support</a></li><li><a href="careers.html">Careers</a></li><li><a href="advertise.html">Advertise & Sponsor</a></li><li><a href="' + S.bannerUrl + '" rel="noopener">Buy / Partner</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="about.html">About</a></li><li><a href="contact.html">Contact</a></li><li><a href="privacy.html">Privacy</a></li><li><a href="terms.html">Terms</a></li><li><a href="disclaimer.html">Disclaimer & ™/© Notice</a></li><li><a href="sitemap.xml">Sitemap</a></li></ul></div>' +
      '</div><div class="disclosure"><p><strong>Trademark & copyright disclosure:</strong> 965555.com is an independent educational and entertainment website. The sequence "965555" is used solely as a domain name and numeric string; no trademark rights are claimed in it, and this site is not affiliated with, endorsed by, or connected to any company, product, part number, phone number or brand that uses the same digits. All third-party names, logos and videos remain the property of their respective owners and are used for identification or via official embeds. Cultural meanings are folk traditions for entertainment — not financial, legal or predictive advice. Some links may be ads or affiliate links. <a href="disclaimer.html">Full disclaimer</a>.</p>' +
      '<p>© ' + y + ' 965555.com — original text, tools and design. All rights reserved.</p></div></div>';
  }
  function chrome() {
    document.body.insertAdjacentHTML("beforeend", '<div id="toast" class="toast" role="status"></div><button class="totop" id="totop" aria-label="Back to top">↑</button>' +
      '<div class="sticky-cta"><a href="get-your-report.html">🧧 Get your FREE lucky number report →</a></div>' +
      '<div class="cookie" id="cookie"><strong>Cookies:</strong> we use cookies for analytics and ads (Google AdSense) to keep this site free. <a href="privacy.html">Privacy</a><div style="margin-top:8px;display:flex;gap:8px"><button class="btn btn-red btn-sm" id="ck-ok">Accept</button><button class="btn btn-ghost btn-sm" id="ck-no">Essential only</button></div></div>' +
      '<div class="modal" id="exit-modal" role="dialog" aria-modal="true" aria-labelledby="em-t"><div class="box"><button class="x" aria-label="Close">×</button><div style="font-size:2.4rem">🧧</div><h3 id="em-t">Wait — grab the free Lucky Numbers Cheat Sheet</h3><p class="muted">Every digit, 60+ lucky & unlucky combos, zodiac numbers and red-envelope amounts on one printable page. Plus our monthly auspicious-dates email.</p>' +
      '<form data-form="Cheat sheet request (exit popup)" data-success="Done! Opening your cheat sheet…" data-redirect="cheat-sheet.html"><input class="hp" name="_honey" tabindex="-1" autocomplete="off"><div class="field"><input name="name" placeholder="First name"></div><div class="field"><input type="email" name="email" placeholder="Email address" required></div><button class="btn btn-red btn-block">Send me the cheat sheet</button><p class="hint center mt" style="margin-top:8px">No spam. Unsubscribe anytime.</p><div class="form-msg"></div></form></div></div>');
    var tt = $("#totop"); window.addEventListener("scroll", function () { tt.style.display = scrollY > 600 ? "block" : "none"; }); tt.onclick = function () { scrollTo(0, 0); };
    var ck = store.get("consent");
    if (!ck) $("#cookie").classList.add("show"); else if (ck === "all") loadAnalytics();
    $("#ck-ok").onclick = function () { store.set("consent", "all"); $("#cookie").classList.remove("show"); loadAnalytics(); };
    $("#ck-no").onclick = function () { store.set("consent", "essential"); $("#cookie").classList.remove("show"); };
    var m = $("#exit-modal");
    function openExit() { if (store.sget("exit") || store.get("subscribed")) return; store.sset("exit", 1); m.classList.add("open"); }
    $(".x", m).onclick = function () { m.classList.remove("open"); }; m.addEventListener("click", function (e) { if (e.target === m) m.classList.remove("open"); });
    document.addEventListener("mouseout", function (e) { if (!e.relatedTarget && e.clientY < 8) openExit(); });
    setTimeout(function () { if (innerWidth < 800) openExit(); }, 50000);
  }
  function loadAnalytics() {
    if (!S.ga4Id || window.gtag) return;
    var s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4Id; document.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", S.ga4Id);
  }
  function ads() {
    var slots = $$(".ad"); if (!slots.length) return;
    if (S.adsenseClient) {
      var s = document.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
      s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient; document.head.appendChild(s);
      slots.forEach(function (el) {
        var slot = (S.adSlots || {})[el.getAttribute("data-slot")] || "";
        el.classList.add("filled");
        el.innerHTML = '<span class="ad-label">Advertisement</span><ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="' + S.adsenseClient + '"' + (slot ? ' data-ad-slot="' + slot + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      });
    } else {
      slots.forEach(function (el) { el.innerHTML = '<div><span class="ad-label">Sponsored space</span><a href="advertise.html">Reach number-curious, Chinese-market audiences — <strong>advertise on 965555.com →</strong></a></div>'; });
    }
  }

  /* ---------- Number engine ---------- */
  var comboKeys = Object.keys(C).filter(function (k) { return /^\d{2,}$/.test(k); }).sort(function (a, b) { return b.length - a.length; });
  function digitsOnly(s) { return String(s || "").replace(/\D/g, ""); }
  function analyze(raw) {
    var d = digitsOnly(raw); if (!d) return null;
    var sum = 0; for (var i = 0; i < d.length; i++) sum += D[d[i]].s;
    var avg = sum / d.length, used = new Array(d.length).fill(false), found = [], cs = 0;
    comboKeys.forEach(function (k) {
      var idx = d.indexOf(k);
      while (idx !== -1) {
        var free = true; for (var j = idx; j < idx + k.length; j++) if (used[j]) { free = false; break; }
        if (free) { for (j = idx; j < idx + k.length; j++) used[j] = true; found.push({ k: k, e: C[k], at: idx }); cs += C[k].s; }
        idx = d.indexOf(k, idx + 1);
      }
    });
    cs = Math.max(-25, Math.min(25, cs));
    var pat = 0, notes = [];
    if (d.length >= 3 && /^(\d)\1+$/.test(d) && d[0] !== "4") { pat += 10; notes.push("All-same-digit pattern (very memorable, premium)"); }
    else { var m = d.match(/(\d)\1{2,}$/); if (m && m[1] !== "4") { pat += 6; notes.push("Ends in a " + m[0].length + "× repeat of " + m[1] + " — a premium, memorable pattern"); } }
    if (/(\d\d)\1/.test(d)) { pat += 3; notes.push("Contains an ABAB repeat — easy to remember"); }
    if (/(012|123|234|345|456|567|678|789)/.test(d)) { pat += 2; notes.push("Contains a rising sequence — step-by-step growth"); }
    var last = d[d.length - 1];
    if (last === "8") { pat += 3; notes.push("Ends in 8 — finishing with prosperity"); } else if (last === "6" || last === "9") { pat += 2; notes.push("Ends in " + last + " — a smooth/lasting finish"); } else if (last === "4") { pat -= 4; notes.push("Ends in 4 — the least favoured ending"); }
    var fours = (d.match(/4/g) || []).length; if (fours) notes.push(fours + "× digit 4 — traditionally avoided (sounds like 死)");
    if (!/[04]/.test(d)) notes.push("No 0 and no 4 — preferred by Chinese number buyers");
    var score = Math.round(50 + avg * 4 + cs * 0.8 + pat - Math.max(0, fours - 1) * 3);
    score = Math.max(1, Math.min(99, score));
    var v = score >= 85 ? ["大吉", "Great Fortune", "#b8860b"] : score >= 70 ? ["吉", "Lucky", "#1f8a4c"] : score >= 50 ? ["中平", "Neutral / Balanced", "#8a8580"] : score >= 35 ? ["小凶", "Slightly Unlucky", "#8a4b2b"] : ["凶", "Unlucky", "#333"];
    return { d: d, score: score, verdict: v, found: found.sort(function (a, b) { return a.at - b.at; }), notes: notes, avg: avg };
  }
  window.LNL = { analyze: analyze };
  function digitTiles(d) {
    return '<div class="digits">' + d.split("").map(function (x) { var o = D[x]; return '<div class="dg ' + (o.s >= 5 ? "good" : o.s < 0 ? "bad" : "") + '" title="' + esc(o.m) + '"><b>' + x + "</b><i>" + o.h + "</i><small>" + o.py + "</small></div>"; }).join("") + "</div>";
  }
  function resultHTML(r, opts) {
    opts = opts || {};
    var chain = r.d.split("").map(function (x) { return D[x].sound.split(" ")[0]; }).join(" · ");
    var combos = r.found.length ? '<div class="table-wrap mt"><table><thead><tr><th>Combo</th><th>Reading</th><th>Meaning</th><th>Type</th></tr></thead><tbody>' + r.found.map(function (f) { return '<tr><td><a href="number.html?n=' + f.k + '"><strong>' + f.k + "</strong></a></td><td>" + esc(f.e.r) + "</td><td>" + esc(f.e.m) + '</td><td><span class="tag t-' + f.e.c + '">' + f.e.c + "</span></td></tr>"; }).join("") + "</tbody></table></div>" : '<p class="muted mt">No famous combos detected — the score comes from individual digits and patterns.</p>';
    return '<div class="score-wrap"><div class="gauge" style="--p:' + r.score + ";--c:" + r.verdict[2] + '"><span>' + r.score + '</span></div><div><div class="verdict" style="color:' + r.verdict[2] + '">' + r.verdict[0] + " · " + r.verdict[1] + '</div><div class="muted">Lucky score for <strong>' + esc(opts.label || r.d) + "</strong> (0–100)</div>" +
      '<div class="chips"><button class="chip" data-share="' + esc(r.d) + '" data-score="' + r.score + '">📤 Share result</button><a class="chip" href="number.html?n=' + r.d + '">🔍 Full meaning</a><a class="chip" href="get-your-report.html?n=' + r.d + '">🧧 Get full report</a></div></div></div>' +
      digitTiles(r.d) + '<p><strong>Sound chain:</strong> ' + esc(chain) + "</p>" +
      (r.notes.length ? '<ul class="checks">' + r.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") + combos +
      '<div class="callout"><strong>Want the in-depth version?</strong> Our free personalised report checks this number against your zodiac sign and Kua number. <a href="get-your-report.html?n=' + r.d + '">Get it free →</a></div>';
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-share]"); if (!b) return;
    var url = location.origin + location.pathname.replace(/[^/]*$/, "") + "number.html?n=" + b.getAttribute("data-share");
    var text = "My number " + b.getAttribute("data-share") + " scored " + b.getAttribute("data-score") + "/100 on 965555.com's Chinese Lucky Number Checker!";
    if (navigator.share) navigator.share({ title: "965555.com", text: text, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text + " " + url).then(function () { toast("Link copied!"); });
  });

  /* ---------- Tools ---------- */
  function toolChecker() {
    $$("[data-checker]").forEach(function (f) {
      var out = $(f.getAttribute("data-checker"));
      function run(v) { var r = analyze(v); if (!r) { toast("Please enter a number with digits"); return; } out.innerHTML = resultHTML(r, { label: v }); out.classList.add("show"); }
      f.addEventListener("submit", function (e) { e.preventDefault(); run($("input", f).value); });
      $$(".chip[data-try]", f.parentNode).forEach(function (c) { c.onclick = function () { $("input", f).value = c.getAttribute("data-try"); run(c.getAttribute("data-try")); }; });
    });
  }
  function toolMeaning() {
    var f = $("#meaning-form"); if (!f) return;
    var out = $("#meaning-out"), inp = $("input", f);
    function show(n) {
      var r = analyze(n); if (!r) return;
      var e = C[r.d] || C[n];
      document.title = "What does " + r.d + " mean in Chinese? Meaning, luck score & slang | 965555.com";
      var h = $("#meaning-title"); if (h) h.textContent = "Meaning of " + r.d + " in Chinese";
      out.innerHTML = (e ? '<div class="quick"><span class="tag t-' + e.c + '">' + e.c + '</span><h2 style="margin:.3em 0">' + r.d + " = " + esc(e.r) + "</h2><p class=\"mb0\">" + esc(e.m) + "</p></div>" : '<div class="quick"><h2 style="margin:0 0 .3em">' + r.d + '</h2><p class="mb0">Not a famous slang code — here is how it reads digit by digit and how lucky it scores.</p></div>') +
        '<div class="table-wrap"><table><thead><tr><th>Digit</th><th>Hanzi</th><th>Mandarin</th><th>Cantonese</th><th>Sounds like</th></tr></thead><tbody>' + r.d.split("").map(function (x) { var o = D[x]; return "<tr><td><strong>" + x + "</strong></td><td>" + o.h + "</td><td>" + o.py + "</td><td>" + o.yue + "</td><td>" + esc(o.sound) + "</td></tr>"; }).join("") + "</tbody></table></div>" +
        '<h3 class="mt">Luck analysis</h3>' + resultHTML(r);
      out.classList.add("show");
      try { history.replaceState(null, "", "?n=" + r.d); } catch (x) {}
    }
    f.addEventListener("submit", function (e) { e.preventDefault(); show(inp.value); });
    var q = new URLSearchParams(location.search).get("n"); if (q) { inp.value = q; show(q); }
    $$(".chip[data-try]").forEach(function (c) { c.onclick = function () { inp.value = c.getAttribute("data-try"); show(inp.value); scrollTo({ top: f.offsetTop - 90, behavior: "smooth" }); }; });
  }
  function toolDictionary() {
    var tb = $("#dict-body"); if (!tb) return;
    var q = $("#dict-q"), cat = $("#dict-cat"), seen = {};
    var rows = Object.keys(C).filter(function (k) { if (seen[k]) return false; seen[k] = 1; return true; }).sort(function (a, b) { return a.length - b.length || a.localeCompare(b); });
    function render() {
      var s = (q.value || "").toLowerCase(), c = cat.value;
      var html = rows.filter(function (k) { var e = C[k]; return (!c || e.c === c) && (!s || (k + e.r + e.m).toLowerCase().indexOf(s) > -1); }).map(function (k) { var e = C[k]; return '<tr><td><a href="number.html?n=' + encodeURIComponent(k) + '"><strong>' + esc(k) + "</strong></a></td><td>" + esc(e.r) + "</td><td>" + esc(e.m) + '</td><td><span class="tag t-' + e.c + '">' + e.c + "</span></td></tr>"; }).join("");
      tb.innerHTML = html || '<tr><td colspan="4">No match — try the <a href="number.html">meaning lookup</a> for any number.</td></tr>';
      $("#dict-count").textContent = tb.children.length;
    }
    q.oninput = render; cat.onchange = render; render();
  }
  function toolSlang() {
    var f = $("#slang-form"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var txt = $("textarea", f).value.trim(); if (!txt) return;
      var out = txt.split(/(\s+|[,.!?;，。！？])/).map(function (tok) {
        if (!/\d/.test(tok)) return esc(tok);
        if (C[tok]) return '<mark title="' + esc(C[tok].m) + '">' + esc(C[tok].r) + "</mark>";
        var d = digitsOnly(tok), res = [], i = 0;
        while (i < d.length) {
          var hit = null; for (var L = Math.min(8, d.length - i); L >= 2; L--) { var sub = d.substr(i, L); if (C[sub]) { hit = sub; break; } }
          if (hit) { res.push('<mark title="' + esc(C[hit].m) + '">' + esc(C[hit].r) + "</mark>"); i += hit.length; } else { res.push(D[d[i]].sound.split(" ")[0]); i++; }
        }
        return res.join(" ");
      }).join("");
      $("#slang-out").innerHTML = '<div class="quick"><strong>Decoded:</strong><p style="font-size:1.2rem;margin:.4em 0 0">' + out + '</p><p class="hint mb0">Hover highlighted parts for meanings.</p></div>';
      $("#slang-out").classList.add("show");
    });
    $$(".chip[data-try]").forEach(function (c) { c.onclick = function () { $("textarea", f).value = c.getAttribute("data-try"); f.requestSubmit(); }; });
  }
  function toolGenerator() {
    var f = $("#gen-form"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var len = Math.max(2, Math.min(12, +f.len.value || 6)), pre = digitsOnly(f.prefix.value), inc = digitsOnly(f.include.value), no4 = f.no4.checked, cnt = Math.min(50, +f.count.value || 12);
      var pool = no4 ? "01235678 9".replace(" ", "") : "0123456789", weight = "8886669990123578";
      if (no4) weight = weight.replace(/4/g, "");
      var seen = {}, list = [];
      for (var t = 0; t < 6000 && pre.length < len; t++) {
        var s = pre; while (s.length < len) { var src = Math.random() < .55 ? weight : pool; s += src[Math.floor(Math.random() * src.length)]; }
        if (inc && inc.split("").some(function (x) { return s.indexOf(x) < 0; })) continue;
        if (no4 && s.indexOf("4") > -1) continue;
        if (seen[s]) continue; seen[s] = 1; list.push(analyze(s));
      }
      if (pre.length >= len) list = [analyze(pre.slice(0, len))];
      list.sort(function (a, b) { return b.score - a.score; });
      $("#gen-out").innerHTML = '<div class="table-wrap"><table><thead><tr><th>#</th><th>Number</th><th>Score</th><th>Verdict</th><th>Combos</th></tr></thead><tbody>' + list.slice(0, cnt).map(function (r, i) { return "<tr><td>" + (i + 1) + '</td><td><a href="number.html?n=' + r.d + '"><strong style="font-size:1.15rem;letter-spacing:1px">' + r.d + "</strong></a></td><td><strong>" + r.score + '</strong></td><td style="color:' + r.verdict[2] + '">' + r.verdict[0] + " " + r.verdict[1] + "</td><td>" + (r.found.map(function (x) { return x.k; }).join(", ") || "—") + "</td></tr>"; }).join("") + '</tbody></table></div><div class="callout">Want a <strong>real</strong> lucky phone number, plate or numeric domain? <a href="get-your-report.html#buy">Tell us what you need →</a></div>';
      $("#gen-out").classList.add("show");
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dateScore(dt) { return analyze("" + dt.getFullYear() + pad(dt.getMonth() + 1) + pad(dt.getDate())); }
  function toolDate() {
    var f = $("#date-form"); if (!f) return;
    var inp = $("input", f), today = new Date(); inp.value = today.getFullYear() + "-" + pad(today.getMonth() + 1) + "-" + pad(today.getDate());
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var p = inp.value.split("-"); if (p.length < 3) return;
      var dt = new Date(+p[0], +p[1] - 1, +p[2]), r = dateScore(dt), md = +p[2], mo = +p[1], notes = [];
      if ([4, 14, 24].indexOf(md) > -1) notes.push("Day " + md + " contains a 4 — many families avoid it for weddings and openings.");
      if (mo === 8 || md === 8 || md === 18 || md === 28) notes.push("An 8 in the month/day — a favourite for launches and weddings.");
      if (mo === 9 || md === 9) notes.push("A 9 (久, lasting) — popular for weddings and anniversaries.");
      if (md % 2 === 0) notes.push("Even day — pairs are auspicious for weddings (好事成双)."); else notes.push("Odd day — fine for most events; weddings traditionally prefer even numbers.");
      if (dt.getDay() === 0 || dt.getDay() === 6) notes.push("Falls on a weekend — convenient for guests.");
      $("#date-out").innerHTML = resultHTML(r, { label: inp.value }) + '<ul class="checks">' + notes.map(function (n) { return "<li>" + n + "</li>"; }).join("") + '</ul><p class="hint">Digit luck only. Traditional Tong Shu almanacs also weigh lunar-calendar factors (e.g., the 7th lunar "Ghost Month") — ask for a full date selection in our <a href="get-your-report.html#consult">consultation</a>.</p>';
      $("#date-out").classList.add("show");
    });
    var top = $("#top-dates"); if (top) {
      var arr = []; for (var i = 1; i <= 365; i++) { var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i); arr.push({ d: d, r: dateScore(d) }); }
      arr.sort(function (a, b) { return b.r.score - a.r.score; });
      var wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      top.innerHTML = arr.slice(0, 20).map(function (x, i) { return "<tr><td>" + (i + 1) + "</td><td><strong>" + x.d.getFullYear() + "-" + pad(x.d.getMonth() + 1) + "-" + pad(x.d.getDate()) + "</strong></td><td>" + wd[x.d.getDay()] + "</td><td><strong>" + x.r.score + '</strong></td><td style="color:' + x.r.verdict[2] + '">' + x.r.verdict[0] + "</td></tr>"; }).join("");
    }
  }
  function toolZodiac() {
    var Z = window.ZODIAC; if (!Z) return;
    var all = $("#zodiac-table");
    if (all) all.innerHTML = Z.map(function (z, i) { var yrs = []; for (var y = 1936 + i; y <= 2031; y += 12) yrs.push(y); return "<tr><td><strong>" + z.h + " " + z.a + "</strong></td><td>" + z.lucky.join(", ") + "</td><td>" + z.unlucky.join(", ") + "</td><td>" + z.colors + "</td><td>" + z.best + '</td><td class="hint">' + yrs.slice(-5).join(", ") + "</td></tr>"; }).join("");
    var f = $("#zodiac-form"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var y = +$("input", f).value; if (!y || y < 1900 || y > 2100) { toast("Enter a year between 1900 and 2100"); return; }
      var z = Z[((y - 4) % 12 + 12) % 12];
      $("#zodiac-out").innerHTML = '<div class="quick"><div style="font-size:3rem;font-family:var(--serif)">' + z.h + '</div><h2 style="margin:.2em 0">' + y + " is the Year of the " + z.a + '</h2><p class="mb0"><strong>Lucky numbers:</strong> ' + z.lucky.join(", ") + " · <strong>Numbers to avoid:</strong> " + z.unlucky.join(", ") + "<br><strong>Lucky colours:</strong> " + z.colors + " · <strong>Best matches:</strong> " + z.best + '</p></div><p class="hint">Born in January or early February? Your sign may be the previous animal — the Chinese year starts at Lunar New Year (between Jan 21 and Feb 20).</p><div class="callout">Check whether your phone number suits a ' + z.a + ' → <a href="lucky-number-checker.html">Lucky Number Checker</a> · or get a <a href="get-your-report.html">free personalised report</a>.</div>';
      $("#zodiac-out").classList.add("show");
    });
  }
  function reduce(n) { while (n > 9) n = String(n).split("").reduce(function (a, b) { return a + +b; }, 0); return n; }
  function toolKua() {
    var f = $("#kua-form"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var p = f.dob.value.split("-"); if (p.length < 3) return;
      var y = +p[0], m = +p[1], d = +p[2]; if (m < 2 || (m === 2 && d < 4)) y--;
      var n = reduce(y % 100), k;
      if (f.gender.value === "m") { k = y < 2000 ? 10 - n : 9 - n; if (k <= 0) k += 9; k = reduce(k); if (k === 5) k = 2; }
      else { k = reduce(y < 2000 ? n + 5 : n + 6); if (k === 5) k = 8; }
      var K = window.KUA[k];
      $("#kua-out").innerHTML = '<div class="quick"><h2 style="margin:0">Your Kua number is ' + k + '</h2><p class="mb0">' + K.g + " group (" + (K.g === "East" ? "1, 3, 4, 9" : "2, 6, 7, 8") + ') · Solar year used: ' + y + '</p></div><div class="table-wrap"><table><thead><tr><th>Aspect</th><th>Your best direction</th></tr></thead><tbody>' + Object.keys(K.d).map(function (a) { return "<tr><td>" + a + "</td><td><strong>" + K.d[a] + "</strong></td></tr>"; }).join("") + '</tbody></table></div><p class="hint mt">Tip: face your Success direction at your desk and point your head toward Health or Love while sleeping. Feng shui is a cultural practice — enjoy it as such.</p>';
      $("#kua-out").classList.add("show");
    });
  }
  var AMOUNTS = [6, 8, 9, 16, 18, 26, 28, 36, 66, 68, 88, 99, 128, 168, 188, 200, 288, 366, 388, 520, 588, 600, 666, 688, 800, 888, 999, 1000, 1314, 1688, 1888, 2000, 2888, 3000, 5200, 6666, 8888, 9999];
  var OCC = {
    wedding: ["Weddings", "Even amounts; avoid any 4. Classics: 888, 1314 (a lifetime), 5200 (I love you), 9999 (forever).", function (a) { return a % 2 === 0 || /9{2,}/.test(a); }],
    cny: ["Lunar New Year", "Children: 88–200; parents/elders: 600–1888 (6 and 8 dominate). Crisp new notes.", function () { return true; }],
    birthday: ["Birthdays / elders", "9s for longevity (99, 999) or 6s for smooth years; avoid 4.", function (a) { return /[69]/.test(a); }],
    business: ["Business opening", "8s for prosperity — 168, 888, 1688, 8888.", function (a) { return /8/.test(a); }],
    baby: ["Baby's full month", "Even, 6s and 8s; 188, 288, 666, 888.", function (a) { return a % 2 === 0; }],
    funeral: ["Funerals (白金 white envelope)", "Odd amounts ending in 1 (e.g., 101, 201, 501) — never lucky 'celebration' numbers.", null]
  };
  function toolRed() {
    var f = $("#red-form"); if (!f) return;
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var b = +f.budget.value || 100, o = OCC[f.occ.value];
      var html;
      if (!o[2]) { var odd = [101, 201, 301, 501, 1001, 2001].sort(function (x, y) { return Math.abs(x - b) - Math.abs(y - b); }).slice(0, 3); html = odd.map(function (a) { return '<div class="card tier"><div class="amt">' + a + '</div><p>Odd amount — appropriate for condolences</p></div>'; }).join(""); }
      else { var c = AMOUNTS.filter(o[2]).sort(function (x, y) { return Math.abs(x - b) - Math.abs(y - b); }).slice(0, 3).sort(function (x, y) { return x - y; }); html = c.map(function (a) { var r = analyze(a), e = C[String(a)]; return '<div class="card tier"><div class="amt">' + a + "</div><p><strong>" + r.score + "/100</strong> · " + r.verdict[1] + "<br>" + (e ? esc(e.r + " — " + e.m) : esc(r.d.split("").map(function (x) { return D[x].sound.split(" ")[0]; }).join(" · "))) + "</p></div>"; }).join(""); }
      $("#red-out").innerHTML = '<div class="quick"><strong>' + o[0] + ":</strong> " + o[1] + '</div><div class="grid g3">' + html + "</div>";
      $("#red-out").classList.add("show");
    });
  }

  /* ---------- Videos ---------- */
  function videos() {
    var V = window.VIDEOS || [];
    $$("[data-videos]").forEach(function (box) {
      var n = +box.getAttribute("data-videos") || V.length, cat = box.getAttribute("data-cat");
      box.innerHTML = V.filter(function (v) { return !cat || v.cat === cat; }).slice(0, n).map(function (v) { return '<div class="card" style="padding:12px"><div class="video" data-id="' + v.id + '" role="button" tabindex="0" aria-label="Play: ' + esc(v.t) + '"><img loading="lazy" src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="' + esc(v.t) + '"></div><h3 style="font-size:1rem;margin:10px 0 2px">' + esc(v.t) + '</h3><p class="hint mb0">' + esc(v.ch) + " · " + v.cat + "</p></div>"; }).join("");
    });
    document.addEventListener("click", function (e) {
      var v = e.target.closest(".video[data-id]"); if (!v || v.classList.contains("playing")) return;
      v.classList.add("playing"); v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.getAttribute("data-id") + '?autoplay=1&rel=0" title="YouTube video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    });
  }

  /* ---------- Forms (single hidden channel) ---------- */
  function utm() { var p = new URLSearchParams(location.search), o = {}; ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) { if (p.get(k)) { o[k] = p.get(k); store.set(k, p.get(k)); } else if (store.get(k)) o[k] = store.get(k); }); return o; }
  function forms() {
    var u = utm();
    $$("form[data-form]").forEach(function (f) {
      f.setAttribute("novalidate", "");
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = $(".form-msg", f), hp = f.querySelector("[name=_honey]");
        if (hp && hp.value) return;
        var bad = $$("[required]", f).filter(function (i) { return !i.value.trim() || (i.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(i.value)) || (i.type === "checkbox" && !i.checked); });
        if (bad.length) { bad[0].focus(); if (msg) { msg.className = "form-msg err"; msg.textContent = "Please complete the highlighted required field(s)."; } return; }
        var data = {}; new FormData(f).forEach(function (v, k) { if (k !== "_honey") data[k] = data[k] ? data[k] + ", " + v : v; });
        Object.keys(u).forEach(function (k) { data[k] = u[k]; });
        data.page = location.href; data.referrer = document.referrer || "direct";
        data._subject = "[965555.com] " + f.getAttribute("data-form"); data._template = "table"; data._captcha = "false";
        var btn = $("button[type=submit],button:not([type])", f); if (btn) { btn.disabled = true; btn.dataset.t = btn.textContent; btn.textContent = "Sending…"; }
        function done(ok) {
          if (btn) { btn.disabled = false; btn.textContent = btn.dataset.t; }
          if (ok) {
            if (msg) { msg.className = "form-msg ok"; msg.textContent = f.getAttribute("data-success") || "Thank you! We'll be in touch shortly."; }
            if (/newsletter|cheat/i.test(f.getAttribute("data-form"))) store.set("subscribed", "1");
            f.reset(); if (window.gtag) gtag("event", "generate_lead", { form: f.getAttribute("data-form") });
            var rd = f.getAttribute("data-redirect"); if (rd) setTimeout(function () { location.href = rd; }, 900);
          }
        }
        fetch("https://formsubmit.co/ajax/" + ch(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (r.ok) done(true); else throw j; }); })
          .catch(function () {
            var body = Object.keys(data).filter(function (k) { return k[0] !== "_"; }).map(function (k) { return k + ": " + data[k]; }).join("\n");
            location.href = "mailto:" + ch() + "?subject=" + encodeURIComponent(data._subject) + "&body=" + encodeURIComponent(body);
            done(true);
          });
      });
    });
    /* generic contact links: <a data-mail="Subject"> */
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-mail]"); if (!a) return; e.preventDefault();
      location.href = "mailto:" + ch() + "?subject=" + encodeURIComponent("[965555.com] " + (a.getAttribute("data-mail") || "Inquiry"));
    });
    /* donations */
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-donate]"); if (!a) return; e.preventDefault();
      var amt = a.getAttribute("data-donate") || ($("#custom-amt") && $("#custom-amt").value) || "";
      var url = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=" + encodeURIComponent(ch()) + "&item_name=" + encodeURIComponent("Support 965555.com — operations, promotion, talent & contest prizes") + "&currency_code=USD" + (amt ? "&amount=" + encodeURIComponent(amt) : "");
      window.open(url, "_blank", "noopener");
    });
    $$("[data-platform]").forEach(function (a) { var u2 = (S.donate || {})[a.getAttribute("data-platform")]; if (u2) { a.href = u2; a.hidden = false; } });
  }
  function tabs() {
    $$("[data-tabs]").forEach(function (w) {
      var ts = $$(".tab", w), ps = $$(".panel", w);
      function act(id) { ts.forEach(function (t) { t.classList.toggle("active", t.getAttribute("data-t") === id); }); ps.forEach(function (p) { p.classList.toggle("active", p.id === id); }); }
      ts.forEach(function (t) { t.onclick = function () { act(t.getAttribute("data-t")); }; });
      var h = location.hash.slice(1); if (h && $("#" + h, w)) act(h);
    });
  }
  function steps() {
    $$("[data-steps]").forEach(function (f) {
      var st = $$(".step", f), bar = $(".progress i", f), i = 0;
      function go(n) { i = n; st.forEach(function (s, k) { s.classList.toggle("active", k === i); }); if (bar) bar.style.width = ((i + 1) / st.length * 100) + "%"; }
      $$("[data-next]", f).forEach(function (b) { b.onclick = function () { var req = $$("[required]", st[i]).filter(function (x) { return !x.value.trim(); }); if (req.length) { req[0].focus(); toast("Please fill in the required fields"); return; } go(Math.min(i + 1, st.length - 1)); }; });
      $$("[data-prev]", f).forEach(function (b) { b.onclick = function () { go(Math.max(i - 1, 0)); }; });
      go(0);
    });
    var n = new URLSearchParams(location.search).get("n"); if (n) $$("input[name=number]").forEach(function (x) { x.value = digitsOnly(n); });
  }
  function tiers() {
    $$(".tier[data-amt]").forEach(function (t) { t.onclick = function () { $$(".tier").forEach(function (x) { x.classList.remove("active"); }); t.classList.add("active"); var c = $("#custom-amt"); if (c) c.value = t.getAttribute("data-amt"); }; });
  }
  function countdown() {
    var el = $("#countdown"); if (!el) return;
    function tick() { var n = new Date(), end = new Date(n.getFullYear(), n.getMonth() + 1, 1), s = Math.max(0, (end - n) / 1000); el.textContent = Math.floor(s / 86400) + "d " + Math.floor(s % 86400 / 3600) + "h " + Math.floor(s % 3600 / 60) + "m"; }
    tick(); setInterval(tick, 30000);
    var mn = $("#contest-month"); if (mn) mn.textContent = new Date().toLocaleString("en", { month: "long", year: "numeric" });
  }

  var th = store.get("theme"); if (th) document.documentElement.setAttribute("data-theme", th);
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader(); buildFooter(); chrome(); ads(); toolChecker(); toolMeaning(); toolDictionary(); toolSlang(); toolGenerator(); toolDate(); toolZodiac(); toolKua(); toolRed(); videos(); forms(); tabs(); steps(); tiers(); countdown();
  });
})();
