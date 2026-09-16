(()=>{
  const stage=document.getElementById('stage');
  const crown=document.getElementById('crown');
  const restore=document.getElementById('restore');
  const count=document.getElementById('count');
  if(!stage||!crown||!count) return;

  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx=document.createElement('div');
  fx.className='wildFX';
  fx.setAttribute('aria-hidden','true');
  const aura=document.createElement('div');
  aura.className='wildAura';
  fx.appendChild(aura);

  const moteCount=reduce?4:22;
  for(let i=0;i<moteCount;i++){
    const m=document.createElement('i');
    m.className='wildMote';
    m.style.setProperty('--x',(4+Math.random()*92)+'%');
    m.style.setProperty('--sz',(3+Math.random()*6)+'px');
    m.style.setProperty('--dur',(7+Math.random()*9)+'s');
    m.style.setProperty('--delay',(-Math.random()*14)+'s');
    m.style.setProperty('--drift',(-45+Math.random()*90)+'px');
    fx.appendChild(m);
  }
  document.body.appendChild(fx);

  function burstAt(x,y,power=1){
    const ring=document.createElement('i');
    ring.className='wildRing';
    ring.style.left=x+'px';
    ring.style.top=y+'px';
    document.body.appendChild(ring);
    setTimeout(()=>ring.remove(),900);

    const flash=document.createElement('i');
    flash.className='wildFlash';
    flash.style.setProperty('--fx',x+'px');
    flash.style.setProperty('--fy',y+'px');
    document.body.appendChild(flash);
    setTimeout(()=>flash.remove(),650);

    const n=reduce?5:Math.round(16*power);
    for(let i=0;i<n;i++){
      const a=(Math.PI*2*i/n)+(Math.random()*.35);
      const d=(45+Math.random()*95)*power;
      const s=document.createElement('i');
      s.className='wildSpark';
      s.style.setProperty('--x',x+'px');
      s.style.setProperty('--y',y+'px');
      s.style.setProperty('--s',(4+Math.random()*7)+'px');
      s.style.setProperty('--dx',(Math.cos(a)*d)+'px');
      s.style.setProperty('--dy',(Math.sin(a)*d)+'px');
      s.style.setProperty('--rot',(Math.random()*540-270)+'deg');
      document.body.appendChild(s);
      setTimeout(()=>s.remove(),900);
    }

    crown.classList.remove('wildHit');
    void crown.offsetWidth;
    crown.classList.add('wildHit');
    setTimeout(()=>crown.classList.remove('wildHit'),760);
  }

  function centerOf(el){
    const r=el.getBoundingClientRect();
    return {x:r.left+r.width/2,y:r.top+r.height/2};
  }

  function visualTap(e){
    const p=(e&&typeof e.clientX==='number'&&e.clientX>0)?{x:e.clientX,y:e.clientY}:centerOf(crown);
    burstAt(p.x,p.y,1);
  }

  crown.addEventListener('click',visualTap,{passive:true});
  if(restore) restore.addEventListener('click',()=>{
    const p=centerOf(restore);
    burstAt(p.x,p.y,.8);
  },{passive:true});

  let lastSeen=parseInt(count.textContent,10)||0;
  const milestoneText={25:['25','MEMORIES IGNITED'],50:['50','HALFWAY TO THE CROWN'],75:['75','QUEEN B POWER SURGE'],100:['100','THE CROWN AWAKENS']};

  function showMilestone(n){
    const data=milestoneText[n];
    if(!data) return;
    const box=document.createElement('div');
    box.className='wildMilestone';
    box.innerHTML=`${data[0]}<small>${data[1]}</small>`;
    document.body.appendChild(box);
    const p=centerOf(crown);
    burstAt(p.x,p.y,n===100?1.8:1.35);
    if(n===100){
      setTimeout(()=>burstAt(p.x-90,p.y+10,1.25),180);
      setTimeout(()=>burstAt(p.x+95,p.y-20,1.25),360);
    }
    setTimeout(()=>box.remove(),1500);
  }

  const observer=new MutationObserver(()=>{
    const n=parseInt(count.textContent,10)||0;
    if(n!==lastSeen){
      if(n>lastSeen) showMilestone(n);
      lastSeen=n;
    }
  });
  observer.observe(count,{childList:true,characterData:true,subtree:true});
})();
