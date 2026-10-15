/* Преображение: центр йоги. Сайт рисует фигуры сам (SVG), без внешних фото. */
(function(){
  var WA = "79023109714";
  function wa(text){ return "https://wa.me/"+WA+"?text="+encodeURIComponent(text); }

  // ссылки записи
  var hero = document.getElementById("cta-hero");
  if(hero) hero.href = wa("Здравствуйте! Хочу записаться на пробное занятие йоги.");
  document.querySelectorAll("[data-wa]").forEach(function(a){ a.href = wa(a.getAttribute("data-wa")); });

  /* ---------- фигуры по суставам ---------- */
  // ширина штриха и «контровой свет»
  function fig(parts, view, o){
    o = o || {};
    var w = o.w || 5, head = o.head;
    var id = "g"+Math.random().toString(36).slice(2,8);
    var d = parts.map(function(p){ return "M"+p.map(function(q){return q.join(" ");}).join(" L"); }).join(" ");
    var h = head ? '<circle cx="'+head[0]+'" cy="'+head[1]+'" r="'+head[2]+'" fill="none"/>' : "";
    var halo = o.halo ? '<circle cx="'+o.halo[0]+'" cy="'+o.halo[1]+'" r="'+o.halo[2]+'" fill="none" stroke="url(#lg'+id+')" stroke-width="1.4" opacity=".55"/><circle cx="'+o.halo[0]+'" cy="'+o.halo[1]+'" r="'+(o.halo[2]*0.72)+'" fill="none" stroke="url(#lg'+id+')" stroke-width="1" opacity=".35"/>' : "";
    return '<svg viewBox="'+view+'" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">'
      +'<defs><linearGradient id="lg'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3ff"/><stop offset=".5" stop-color="#e7b6ff"/><stop offset="1" stop-color="#b86bff"/></linearGradient>'
      +'<filter id="f'+id+'" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="'+(o.blur||3)+'" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
      +halo
      +'<g filter="url(#f'+id+')" stroke="url(#lg'+id+')" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="'+d+'"/>'+h+'</g>'
      +'</svg>';
  }

  function lotus(o){
    o=o||{}; var id="l"+Math.random().toString(36).slice(2,7), w=o.w||2.2;
    return '<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3ff"/><stop offset=".5" stop-color="#e9b8ff"/><stop offset="1" stop-color="#b86bff"/></linearGradient><filter id="f'+id+'" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="'+(o.blur||3)+'" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>'
    +'<g filter="url(#f'+id+')" stroke="url(#'+id+')" stroke-width="'+w+'" fill="none" stroke-linecap="round" stroke-linejoin="round">'
    +'<path d="M200 28C168 78 168 142 200 196C232 142 232 78 200 28Z"/>'
    +'<path d="M200 196C142 176 100 124 96 70C142 90 182 132 200 196Z"/><path d="M200 196C258 176 300 124 304 70C258 90 218 132 200 196Z"/>'
    +'<path d="M200 196C112 196 50 154 28 102C80 112 152 142 200 196Z"/><path d="M200 196C288 196 350 154 372 102C320 112 248 142 200 196Z"/>'
    +'<path d="M58 208C140 236 260 236 342 208"/><path d="M96 222C160 242 240 242 304 222" opacity=".6"/></g></svg>';
  }

  var POSES = {
    dog: { view:"0 0 200 260", head:[50,176,12], parts:[
      [[22,240],[40,202],[66,168]], [[66,168],[112,74]], [[112,74],[152,152],[188,240]] ] },
    leg: { view:"0 0 200 260", head:[96,36,12], parts:[
      [[98,50],[100,136]], [[100,136],[100,192],[100,252]], [[100,136],[146,104],[172,62]],
      [[100,66],[136,72],[168,64]], [[100,64],[82,36],[72,8]] ] },
    warrior: { view:"0 0 200 260", head:[100,44,12], parts:[
      [[100,60],[100,134]], [[100,70],[22,72]], [[100,70],[178,72]],
      [[100,134],[150,172],[150,240]], [[100,134],[68,188],[38,240]] ] },
    reach: { view:"0 0 200 260", head:[88,50,12], parts:[
      [[94,64],[102,100],[100,140]], [[94,66],[126,34],[154,6]], [[94,72],[68,92],[52,122]],
      [[100,140],[80,196],[72,252]], [[100,140],[124,196],[138,252]] ] }
  };

  // карточки «Выбор клиентов»
  var cards = document.getElementById("cards");
  [1,2,3,4].forEach(function(n){
    var el = document.createElement("article");
    el.className = "card";
    el.innerHTML = '<div class="fig photo p'+n+'"><div class="aura">'+lotus({w:2.6,blur:2.6})+'</div></div>'
      +'<div class="meta"><span>1 ч</span><span>Виньяса Йога</span></div>'
      +'<p>Активная, динамичная практика Йоги, направленная на укрепление тела и нервной системы. Повышает бодрость, стрессоустойчивость.</p>';
    cards.appendChild(el);
  });

  /* ---------- иконки-неон ---------- */
  var NEON = 'fill="none" stroke="url(#ng)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"';
  function neonSvg(inner){
    return '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7be8"/><stop offset="1" stop-color="#b04dff"/></linearGradient><filter id="nf" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g filter="url(#nf)" '+NEON+'>'+inner+'</g></svg>';
  }
  var ICON_LOTUS = neonSvg(
    '<circle cx="60" cy="24" r="8"/><path d="M60 34v32"/><path d="M60 42c-10 4-18 14-20 24M60 42c10 4 18 14 20 24"/>'
    +'<path d="M30 82c8-14 30-14 40 0M90 82c-8-14-30-14-40 0"/><path d="M26 86c18 10 50 10 68 0"/>');
  var ICON_FACE = neonSvg(
    '<path d="M60 22c-14 0-24 10-24 24 0 12 6 20 12 26 4 4 8 8 12 8s8-4 12-8c6-6 12-14 12-26 0-14-10-24-24-24z"/>'
    +'<path d="M30 70c-6-8-6-18 0-24M90 70c6-8 6-18 0-24"/><path d="M48 52c4-3 8-3 12 0M64 52c4-3 8-3 12 0"/><path d="M52 74c5 4 11 4 16 0"/>');
  var ICON_CAT = neonSvg(
    '<path d="M22 86c0-16 14-28 36-28 20 0 32 10 34 28"/><path d="M92 86V56c0-8 4-14 10-16"/><circle cx="98" cy="38" r="8"/>'
    +'<path d="M24 86v18M38 86v18M78 86v18M92 86v18"/><path d="M22 70c-8-6-10-16-6-26"/>');

  var orbs = document.getElementById("orbs");
  var seq = [
    {t:"Внутренняя гармония"}, {i:ICON_LOTUS},
    {t:"Снятие стресса и тревожности"}, {i:ICON_FACE},
    {t:"Развитие гибкости"}, {i:ICON_CAT}
  ];
  seq.forEach(function(s){
    var el = document.createElement("div");
    if(s.t){ el.className = "orb fill"; el.textContent = s.t; }
    else { el.className = "orb dark"; el.innerHTML = s.i; }
    orbs.appendChild(el);
  });

  /* ---------- герой: фигура поверх букв ---------- */
  var heroFig = document.getElementById("hero-figure");
  if(heroFig){ heroFig.innerHTML = '<div class="hero-photo"></div><div class="hero-lotus">'+lotus({w:2.4,blur:4})+'</div>'; }

  /* ---------- появление при прокрутке ---------- */
  var items = document.querySelectorAll(".card,.orb");
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ var el=e.target; var i=[].indexOf.call(el.parentNode.children, el); setTimeout(function(){el.classList.add("in");}, i*110); io.unobserve(el); } });
    },{threshold:.15});
    items.forEach(function(el){ io.observe(el); });
  } else { items.forEach(function(el){ el.classList.add("in"); }); }
})();
