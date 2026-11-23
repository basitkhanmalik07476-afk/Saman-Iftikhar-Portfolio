/* Website behaviour: animations, menu, pricing toggle, form, cursor trail. Uses CFG from config.js */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
$("#yr").textContent=new Date().getFullYear();
$("#wa").href="https://wa.me/"+CFG.whatsapp;$("#em").href="mailto:"+CFG.email;
$$(".fwa").forEach(a=>{a.href="https://wa.me/"+CFG.whatsapp});$$(".fem").forEach(a=>{a.href="mailto:"+CFG.email});$$(".fet").forEach(s=>{s.textContent=CFG.email});$$(".fph,#cl").forEach(a=>{a.href="tel:"+CFG.phone});$$(".fpt").forEach(s=>{s.textContent=CFG.phoneShow});
{const el=$("#el");el.href=CFG.eliteUrl;if(/^https?:/.test(CFG.eliteUrl)){el.target="_blank";el.rel="noopener"}}
$$("[data-soc]").forEach(a=>{const u=CFG.social[a.dataset.soc]||"#";a.href=u;if(/^https?:/.test(u)){a.target="_blank";a.rel="noopener"}});
$$("#wa,.fwa").forEach(a=>{a.target="_blank";a.rel="noopener"});
if(CFG.photo){const im=new Image();im.alt="Saman Iftikhar";im.src=CFG.photo;$("#pt").replaceChildren(im)}
/* nav + progress (one passive listener) */
const hd=$("#hd"),bar=$("#bar"),pr=$("#pr"),fill=$("#fill");
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 bar.style.width=(h>0?y/h*100:0)+"%";hd.classList.toggle("s",y>20);
 const r=pr.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.6-r.top)/r.height));fill.style.height=p*100+"%";}
addEventListener("scroll",onScroll,{passive:true});onScroll();
const mb=$("#mb"),lk=$("#lk"),ov=$("#ov");
function menu(o){lk.classList.toggle("open",o);ov.classList.toggle("on",o);mb.classList.toggle("x",o);document.body.classList.toggle("lock",o);mb.setAttribute("aria-expanded",o);mb.setAttribute("aria-label",o?"Close menu":"Open menu");
 if(o)$("a",lk).focus();else if(lk.contains(document.activeElement))mb.focus()}
mb.onclick=()=>menu(!lk.classList.contains("open"));ov.onclick=()=>menu(false);
addEventListener("keydown",e=>{if(e.key==="Escape"&&lk.classList.contains("open"))menu(false)});
matchMedia("(min-width:901px)").addEventListener("change",e=>{if(e.matches)menu(false)});
$$("#lk a").forEach(a=>a.addEventListener("click",()=>menu(false)));
/* generic reveal observer */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
$$(".bc").forEach((c,i)=>{c.style.setProperty("--d",i)});
$$(".rv,.st").forEach(el=>io.observe(el));
/* word rotator */
const rs=$$("#rot span");let ri=0;
if(!RM)setInterval(()=>{const o=rs[ri];o.className="out";ri=(ri+1)%rs.length;const n=rs[ri];n.className="on";setTimeout(()=>{o.className=""},650)},2400);
/* count up */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,n=+el.dataset.n,s=el.dataset.s||"",d=+el.dataset.d||0;
 if(RM){el.textContent=n.toFixed(d)+s;return}const t0=performance.now();
 (function f(t){const p=Math.min(1,(t-t0)/1800),v=n*(1-Math.pow(1-p,3));el.textContent=v.toFixed(d)+s;if(p<1)requestAnimationFrame(f)})(t0)}),{threshold:.6});
$$("[data-n]").forEach(el=>co.observe(el));
/* cursor tour (confined to stage; real mouse untouched) */
const stage=$("#stage"),cur=$("#cur"),tip=$("#tip"),tts=$$(".tt");let tour=0,timer;
function step(i){tts.forEach(t=>t.classList.remove("hl"));const t=tts[i%tts.length];if(getComputedStyle(t).display==="none")return step(i+1);
 const s=stage.getBoundingClientRect(),r=t.getBoundingClientRect(),x=r.left-s.left+r.width*.55,y=r.top-s.top+r.height*.6;
 cur.style.transform=`translate(${x}px,${y}px)`;tip.style.opacity=0;
 timer=setTimeout(()=>{t.classList.add("hl");tip.textContent=t.dataset.t;tip.style.transform=`translate(${Math.min(x+20,s.width-230)}px,${y+26}px)`;tip.style.opacity=1;
  timer=setTimeout(()=>step(i+1),2600)},1200)}
function startTour(){clearTimeout(timer);const c=stage.getBoundingClientRect();cur.style.transform=`translate(${c.width-60}px,20px)`;
 if(RM){tts.forEach(t=>t.classList.add("hl"));tip.style.opacity=0;return}timer=setTimeout(()=>step(0),500)}
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&!tour){tour=1;startTour()}else if(!e.isIntersecting){clearTimeout(timer)}else startTour()}),{threshold:.5}).observe(stage);
$("#replay").onclick=startTour;
/* animated background: drifting sparkles over soft glowing blobs */
(()=>{const cv=$("#cv"),c=cv.getContext("2d"),cols=["224,140,171","155,79,150","199,159,99"];let W,H,P=[];
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);
 P=Array.from({length:W<700?22:46},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.4+.8,v:Math.random()*.25+.08,s:Math.random()*6.28,c:cols[Math.random()*3|0],st:Math.random()<.28}));if(RM)draw(0)}
function star(x,y,r){c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,l=i%2?r*.35:r*2.4;c.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l)}c.closePath();c.fill()}
function draw(t){c.clearRect(0,0,W,H);for(const p of P){c.fillStyle=`rgba(${p.c},${.25+.35*Math.sin(t/900+p.s)})`;
 if(p.st)star(p.x,p.y,p.r);else{c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()}
 if(!RM){p.y-=p.v;p.x+=Math.sin(t/2000+p.s)*.2;if(p.y<-10){p.y=H+10;p.x=Math.random()*W}}}
 if(!RM)requestAnimationFrame(draw)}
size();addEventListener("resize",size);if(!RM)requestAnimationFrame(draw)})();
/* cursor trail: colourful dots that drift and fade (mouse only, off for reduced motion) */
(()=>{if(RM||!matchMedia("(hover:hover) and (pointer:fine)").matches)return;
const cv=document.createElement("canvas");cv.id="trail";cv.setAttribute("aria-hidden","true");document.body.appendChild(cv);
const c=cv.getContext("2d"),cols=["#E08CAB","#9B4F96","#C79F63","#E0457B","#F9C846","#B070B8"];let W,H,P=[],run=0,lx=-1,ly=-1;
function size(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cv.style.width=W+"px";cv.style.height=H+"px";c.setTransform(d,0,0,d,0,0)}
size();addEventListener("resize",size);
function add(x,y,n,s){for(let i=0;i<n;i++)P.push({x:x+(Math.random()-.5)*14,y:y+(Math.random()-.5)*14,vx:(Math.random()-.5)*s,vy:(Math.random()-.5)*s+.25,r:Math.random()*4.5+1.5,c:cols[Math.random()*cols.length|0],l:1,d:Math.random()*.012+.012});
 if(P.length>160)P.splice(0,P.length-160);if(!run){run=1;requestAnimationFrame(tick)}}
function tick(){c.clearRect(0,0,W,H);for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.l-=p.d;c.globalAlpha=Math.max(p.l,0);c.fillStyle=p.c;c.beginPath();c.arc(p.x,p.y,p.r*(.5+p.l*.5),0,7);c.fill()}
 c.globalAlpha=1;P=P.filter(p=>p.l>0);if(P.length)requestAnimationFrame(tick);else{run=0;c.clearRect(0,0,W,H)}}
addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const dx=e.clientX-lx,dy=e.clientY-ly;
 if(lx<0||dx*dx+dy*dy>110){add(e.clientX,e.clientY,Math.random()<.4?2:1,1.2);lx=e.clientX;ly=e.clientY}},{passive:true});
addEventListener("pointerdown",e=>{if(e.pointerType==="mouse")add(e.clientX,e.clientY,12,4)});
})();
/* About photo reuses the hero photo */
{const hp=$("#pt img"),ai=$("#abimg");if(hp&&ai)ai.src=hp.src}
/* client / customer showcase */
{
 const grid=$("#clientGrid");
 if(grid&&CFG.clients){
  grid.innerHTML=CFG.clients.map((c,i)=>{
   const profile=c.image?`<img src="${c.image}" alt="${c.name}">`:`<span>${c.initial}</span>`;
   const link=c.link?`<a class="client-link facebook" href="${c.link}" target="_blank" rel="noopener"><svg class="ico"><use href="#i-fb"/></svg><span>Visit Facebook</span><svg class="ico client-arrow"><use href="#i-up"/></svg></a>`:'<span class="client-link client-coming"><svg class="ico"><use href="#i-fb"/></svg><span>Visit Facebook</span></span>';
   return `<article class="client-card rv" style="--d:${i}"><div class="client-profile">${profile}</div><div class="client-info"><h3>${c.name}</h3><p>${c.type}</p></div>${link}</article>`;
  }).join("");
  $$(".client-card").forEach(el=>io.observe(el));
 }
}
/* before / after */
const ba=$("#ba");$("input",ba).addEventListener("input",e=>ba.style.setProperty("--p",e.target.value+"%"));
/* pricing with rolling numbers */
let yearly=false;const fmt=n=>"PKR "+Math.round(n).toLocaleString("en-US");
$("#pg").innerHTML=CFG.plans.map((p,i)=>`<article class="pc rv${p.rec?" rec":""}" style="--d:${i}">${p.rec?'<span class="badge">Most popular</span>':""}<h3>${p.n}</h3><div class="pr-n"><span data-m="${p.m}">${fmt(p.m)}</span> <small>/ month</small></div><small style="color:var(--mute)" class="bn">Billed monthly</small><ul>${p.f.map(x=>"<li>"+x+"</li>").join("")}</ul><a class="btn${p.rec?"":" ghost"}" href="#contact">Choose ${p.n}</a></article>`).join("");
$$(".pc").forEach(el=>io.observe(el));
function roll(el,to){const from=parseFloat(el.dataset.cur||el.dataset.m);el.dataset.cur=to;if(RM){el.textContent=fmt(to);return}const t0=performance.now();
 (function f(t){const p=Math.min(1,(t-t0)/600),e=1-Math.pow(1-p,3);el.textContent=fmt(from+(to-from)*e);if(p<1)requestAnimationFrame(f)})(t0)}
$("#sw").onclick=e=>{yearly=!yearly;e.currentTarget.setAttribute("aria-checked",yearly);
 $$("[data-m]").forEach(el=>roll(el,+el.dataset.m*(yearly?.8:1)));$$(".bn").forEach(b=>b.textContent=yearly?"Billed yearly, 20% off":"Billed monthly")};
/* comparison rows */
$("#ct").insertAdjacentHTML("beforeend",CFG.compare.map((c,i)=>`<div class="cr" style="--d:${i}"><span>${c}</span><span class="y" aria-label="Yes">✓</span><span class="${i!==2?"x":"y"}" aria-label="${i!==2?"No":"Yes"}">${i!==2?"✕":"✓"}</span></div>`).join(""));
$$(".cr:not(.h)").forEach(el=>io.observe(el));
/* CTA buttons that pointed to #contact now open WhatsApp with a ready message */
const waUrl=m=>"https://wa.me/"+CFG.whatsapp+"?text="+encodeURIComponent(m);
$$('a.btn[href="#contact"]').forEach(a=>{const pc=a.closest(".pc");
 const msg=()=>pc?`Hi Saman, I’m interested in the ${$("h3",pc).textContent} package (${yearly?"yearly":"monthly"} billing).`:/strategy/i.test(a.textContent)?"Hi Saman, I’d like to book a free strategy call.":/content/i.test(a.textContent)?"Hi Saman, I’d like to discuss content creation for my brand.":"Hi Saman, I’d like to talk about growing my brand.";
 a.target="_blank";a.rel="noopener";a.href=waUrl(msg());
 a.insertAdjacentHTML("afterbegin",'<svg class="ico" style="width:20px;height:20px" aria-hidden="true"><use href="#i-wa"/></svg>');
 a.addEventListener("click",()=>{a.href=waUrl(msg())})});
/* contact form: success only after a real result */
const f=$("#f"),sb=$("#sb"),lbl=$(".lbl",sb),msg=$("#msg");
function bad(i,t){i.setAttribute("aria-invalid","true");i.closest("label").querySelector(".err").textContent=t}
function reset(){sb.className="btn";lbl.textContent="Send message"}
f.addEventListener("submit",e=>{e.preventDefault();msg.textContent="";$$("[aria-invalid]",f).forEach(i=>{i.removeAttribute("aria-invalid");i.closest("label").querySelector(".err").textContent=""});
 const n=f.n,em=f.e,m=f.m;let ok=true;
 if(!n.value.trim()){bad(n,"Please enter your name.");ok=false}
 if(!/^\S+@\S+\.\S+$/.test(em.value)){bad(em,"Enter a valid email, like name@mail.com.");ok=false}
 if(m.value.trim().length<10){bad(m,"Write at least a short sentence about your project.");ok=false}
 if(!ok){sb.className="btn bad";lbl.textContent="Check the highlighted fields";setTimeout(reset,2400);$("[aria-invalid]",f).focus();return}
 sb.className="btn load";lbl.textContent="Opening WhatsApp";
 const text=`Hi Saman, I’m ${n.value.trim()} (${em.value.trim()}). I need help with ${f.s.value}.\n\n${m.value.trim()}`;
 setTimeout(()=>{const w=window.open("https://wa.me/"+CFG.whatsapp+"?text="+encodeURIComponent(text),"_blank","noopener");
  if(w===null&&!window.opener){/* popup may return null with noopener, so verify via visibility */}
  if(/^9?2?0{6,}$/.test(CFG.whatsapp)){sb.className="btn bad";lbl.textContent="WhatsApp number not set";msg.textContent="Add the real WhatsApp number in CFG.whatsapp, or email "+CFG.email+" instead.";setTimeout(reset,3500);return}
  sb.className="btn ok";lbl.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path class="chk" d="M5 12.5l4.5 4.5L19 7"/></svg> Message ready';
  msg.textContent="WhatsApp opened with your message. Press send there to reach Saman.";f.reset();setTimeout(reset,4000)},900)});
