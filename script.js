// Wedding dates: change the year here and also update year text in index.html.
const MEHNDI_DATE = new Date('2026-11-20T19:00:00+05:00');
const WHATSAPP_NUMBER = '923127218896'; // Abdul Majeed
const $ = (selector) => document.querySelector(selector);
const opening = $('#opening');
let hasOpened = false;
function startInvitation(){
 if(hasOpened)return;
 hasOpened=true;
 const envelope=$('#envelopeButton');envelope.classList.add('opening-now');
 const song=$('#weddingMusic');if(song){song.volume=.55;song.play().catch(()=>{});}
 setTimeout(()=>{ $('#site').classList.add('visible');opening.classList.add('dismissed'); document.body.classList.remove('locked');celebrate(24);initializeScratch();},2550);
 setTimeout(()=>{opening.setAttribute('aria-hidden','true');opening.style.display='none';},3700);
}
$('#envelopeButton').addEventListener('click',startInvitation);
$('#envelopeButton').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();startInvitation();}});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e)=>{ if (e.isIntersecting) {e.target.classList.add('is-visible');observer.unobserve(e.target);} });
},{ threshold: .1 });
document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));

function updateCountdown(){
  let ms = Math.max(0, MEHNDI_DATE.getTime()-Date.now());
  const d = Math.floor(ms/86400000); ms%=86400000;
  const h = Math.floor(ms/3600000); ms%=3600000;
  const m = Math.floor(ms/60000); ms%=60000;
  const s = Math.floor(ms/1000);
  [['days',d],['hours',h],['minutes',m],['seconds',s]].forEach(([id,val])=>{ $(`#${id}`).textContent=String(val).padStart(2,'0'); });
  if(MEHNDI_DATE.getTime()<Date.now()) $('#countdownMessage').textContent='Our forever has begun ♡';
}
updateCountdown();setInterval(updateCountdown,1000);

let scratchInitialized=false; let scratchComplete=false;
function initializeScratch(){
  if(scratchInitialized)return;
  scratchInitialized=true;
  const canvas=$('#scratchCanvas'), card=$('#scratchCard'), ctx=canvas.getContext('2d');
  let drawing=false, drawDistance=0, last=null;
  const drawCover=()=>{
    if(scratchComplete)return;
    const box=card.getBoundingClientRect(); const ratio=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(box.width*ratio);canvas.height=Math.round(box.height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    let grad=ctx.createLinearGradient(0,0,box.width,box.height);
    grad.addColorStop(0,'#c5879f');grad.addColorStop(.5,'#edbecb');grad.addColorStop(1,'#a86681');
    ctx.fillStyle=grad;ctx.fillRect(0,0,box.width,box.height);
    ctx.strokeStyle='#fff5';ctx.lineWidth=1;
    for(let i=-box.height;i<box.width+box.height;i+=18){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i+box.height,box.height);ctx.stroke();}
    ctx.fillStyle='#fff8f5';ctx.textAlign='center';
    ctx.font='44px Georgia';ctx.fillText('♡',box.width/2,box.height/2-24);
    ctx.font='bold 13px sans-serif';ctx.fillText('SCRATCH TO REVEAL',box.width/2,box.height/2+15);
    ctx.font='12px Georgia';ctx.fillText('a little surprise awaits...',box.width/2,box.height/2+38);
  };
  drawCover();
  const point=(ev)=>{const r=canvas.getBoundingClientRect();return {x:ev.clientX-r.left,y:ev.clientY-r.top};};
  const rub=(p)=>{
    ctx.globalCompositeOperation='destination-out';ctx.lineWidth=43;ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath(); if(last){ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);drawDistance+=Math.hypot(p.x-last.x,p.y-last.y);}else{ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);}ctx.stroke();last=p;
    if(drawDistance>1250){completeScratch();}
  };
  const completeScratch=()=>{if(scratchComplete)return;scratchComplete=true;canvas.style.transition='opacity .8s';canvas.style.opacity='0';setTimeout(()=>canvas.style.pointerEvents='none',850);$('#scratchHint').textContent='♡ SURPRISE! WE CAN’T WAIT TO SEE YOU ♡';celebrate(28);};
  canvas.addEventListener('pointerdown',ev=>{drawing=true;canvas.setPointerCapture(ev.pointerId);last=null;rub(point(ev));});
  canvas.addEventListener('pointermove',ev=>{if(drawing)rub(point(ev));});
  canvas.addEventListener('pointerup',()=>{drawing=false;last=null;});
  canvas.addEventListener('pointercancel',()=>{drawing=false;last=null;});
  canvas.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();completeScratch();}});

  window.addEventListener('resize',()=>{if(!scratchComplete)drawCover();});
}
function celebrate(count){
  const field=$('#petalField');
  for(let i=0;i<count;i++){
    const p=document.createElement('span');p.className='petal';
    p.style.left=`${Math.random()*100}%`;p.style.setProperty('--drift',`${Math.random()*240-120}px`);
    p.style.animationDuration=`${3+Math.random()*4}s`;p.style.animationDelay=`${Math.random()*1.6}s`;
    p.style.background=['#f2b8c9','#db95a7','#f0d4a8','#fbdae2'][Math.floor(Math.random()*4)];
    field.appendChild(p);setTimeout(()=>p.remove(),9000);
  }
}
