(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let sequenceBusy=false, periodicTimer=0, finalIntercept=false;

  function init(){
    const stage=document.getElementById('stage');
    const memories=document.getElementById('memories');
    const enter=document.getElementById('enter');
    const finalBtn=document.getElementById('finalBtn');
    const again=document.getElementById('again');
    if(!stage||!memories||!enter||!finalBtn)return;

    const style=document.createElement('style');
    style.textContent=`
      .memory .photoShell{isolation:isolate}
      .memory.wild-wave .photoShell{box-shadow:0 10px 32px #000c,0 0 0 1px #f4ddb099,0 0 24px #bcaeff8a,0 0 42px #f4ddb03f;transform:translate(-50%,-50%) scale(1.055)}
      .memory.wild-chase .photoShell{box-shadow:0 8px 28px #000b,0 0 0 1px #fff3ce,0 0 16px #f4ddb0cc,0 0 34px #f4ddb066}
      .memory.wild-100 .photoShell{box-shadow:0 12px 34px #000d,0 0 0 1px #fff7dd,0 0 22px #f4ddb0,0 0 48px #bcaeff8f;transform:translate(-50%,-50%) scale(1.07)}
      .memory.wild-collapse{opacity:0!important;transform:translate(-50%,-50%) scale(.82)!important;filter:blur(2px);pointer-events:none}
      .memory{transition:opacity .34s ease,filter .34s ease,transform .34s cubic-bezier(.2,.8,.2,1)}
      #wildPulse{position:absolute;z-index:8;width:13px;height:13px;border-radius:50%;pointer-events:none;opacity:0;background:#fff7d9;box-shadow:0 0 10px #fff,0 0 22px #f4ddb0,0 0 40px #bcaeff;transform:translate(-50%,-50%);transition:opacity .22s ease}
      #wildPulse.on{opacity:1}
      #wildVeil{position:absolute;z-index:7;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 50%,transparent 35%,#05040ca8 100%);transition:opacity .55s ease}
      #wildVeil.on{opacity:1}
      @media(prefers-reduced-motion:reduce){.memory{transition:none!important}.memory.wild-wave .photoShell,.memory.wild-chase .photoShell,.memory.wild-100 .photoShell{transform:translate(-50%,-50%)!important}.memory.wild-collapse{filter:none!important;transform:translate(-50%,-50%)!important}#wildPulse{display:none!important}}
    `;
    document.head.appendChild(style);

    const pulse=document.createElement('div');pulse.id='wildPulse';stage.appendChild(pulse);
    const veil=document.createElement('div');veil.id='wildVeil';stage.appendChild(veil);

    const tiles=()=>Array.from(memories.querySelectorAll('.memory'));
    const sleep=ms=>new Promise(r=>setTimeout(r,ms));

    async function memoryWave(){
      const list=tiles();if(!list.length||sequenceBusy)return;
      sequenceBusy=true;
      if(reduced.matches){list.forEach(x=>x.classList.add('wild-wave'));setTimeout(()=>list.forEach(x=>x.classList.remove('wild-wave')),650);sequenceBusy=false;return}
      const ordered=[...list].sort((a,b)=>a.offsetTop-b.offsetTop||a.offsetLeft-b.offsetLeft);
      ordered.forEach((el,i)=>setTimeout(()=>{el.classList.add('wild-wave');setTimeout(()=>el.classList.remove('wild-wave'),520)},i*22));
      await sleep(ordered.length*22+620);sequenceBusy=false;
    }

    async function goldenChase(){
      const list=tiles();if(!list.length||sequenceBusy)return;
      sequenceBusy=true;
      if(reduced.matches){list.forEach(x=>x.classList.add('wild-chase'));setTimeout(()=>list.forEach(x=>x.classList.remove('wild-chase')),550);sequenceBusy=false;return}
      pulse.classList.add('on');
      for(let i=0;i<list.length;i++){
        const el=list[i],sr=stage.getBoundingClientRect(),r=el.getBoundingClientRect();
        pulse.style.left=(r.left-sr.left+r.width/2)+'px';pulse.style.top=(r.top-sr.top+r.height/2)+'px';
        el.classList.add('wild-chase');setTimeout(()=>el.classList.remove('wild-chase'),260);
        await sleep(24);
      }
      pulse.classList.remove('on');sequenceBusy=false;
    }

    async function openingSequence(){
      await sleep(700);await memoryWave();await sleep(350);await goldenChase();
      clearInterval(periodicTimer);periodicTimer=setInterval(async()=>{if(document.getElementById('viewer')?.classList.contains('show')||document.getElementById('finale')?.classList.contains('show'))return;await memoryWave();await sleep(450);await goldenChase()},24000);
    }

    function hundredEvent(){
      const list=tiles();if(!list.length)return;
      veil.classList.add('on');
      const ordered=[...list].sort((a,b)=>b.offsetTop-a.offsetTop||a.offsetLeft-b.offsetLeft);
      if(reduced.matches){ordered.forEach(el=>el.classList.add('wild-100'));setTimeout(()=>{ordered.forEach(el=>el.classList.remove('wild-100'));veil.classList.remove('on')},900);return}
      ordered.forEach((el,i)=>setTimeout(()=>{el.classList.add('wild-100');setTimeout(()=>el.classList.remove('wild-100'),900)},i*18));
      setTimeout(()=>veil.classList.remove('on'),ordered.length*18+850);
    }

    async function reverseCollapse(){
      if(finalIntercept)return;finalIntercept=true;clearInterval(periodicTimer);
      const list=tiles();
      if(reduced.matches){list.forEach(el=>el.classList.add('wild-collapse'));await sleep(180)}
      else{
        const reversed=[...list].reverse();
        for(let i=0;i<reversed.length;i++){reversed[i].classList.add('wild-collapse');if(i%3===0)await sleep(14)}
        await sleep(420);
      }
      try{if(typeof finalBtn.onclick==='function')finalBtn.onclick()}finally{finalIntercept=false}
    }

    function restore(){
      clearInterval(periodicTimer);tiles().forEach(el=>el.classList.remove('wild-collapse','wild-wave','wild-chase','wild-100'));veil.classList.remove('on');pulse.classList.remove('on');
      setTimeout(()=>{periodicTimer=setInterval(async()=>{if(document.getElementById('viewer')?.classList.contains('show')||document.getElementById('finale')?.classList.contains('show'))return;await memoryWave();await sleep(450);await goldenChase()},24000)},900);
    }

    enter.addEventListener('click',()=>setTimeout(openingSequence,120),{once:true});
    memories.addEventListener('click',e=>{const m=e.target.closest('.memory');if(m&&Number(m.dataset.i)===99)setTimeout(hundredEvent,180)},true);
    finalBtn.addEventListener('click',e=>{if(finalIntercept)return;e.preventDefault();e.stopImmediatePropagation();reverseCollapse()},true);
    again?.addEventListener('click',()=>setTimeout(restore,250),true);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
