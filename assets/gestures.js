(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function init(){
    const stage=document.getElementById('stage');
    const memories=document.getElementById('memories');
    if(!stage||!memories)return;

    const style=document.createElement('style');
    style.textContent=`
      #stage{touch-action:none;user-select:none;-webkit-user-select:none}
      #stage.gesture-hold:before{opacity:1!important;filter:blur(22px) brightness(1.12)!important}
      #stage.gesture-drag .photoShell{box-shadow:0 7px 22px #000b,0 0 12px #e8c78b22}
      @media(prefers-reduced-motion:reduce){#stage{touch-action:manipulation}.memory{translate:0 0!important}}
    `;
    document.head.appendChild(style);

    let active=false,startX=0,startY=0,lastX=0,lastY=0,startT=0,dragged=false,holdTimer=null,suppressClick=false;
    const bowls=()=>Array.from(memories.querySelectorAll('.memory'));

    function apply(dx,dy){
      if(reduced.matches)return;
      const list=bowls();
      list.forEach((el,i)=>{
        if(i<28)return; // spine remains stable
        const upper=i<62;
        const x=upper?dx*.18:-dx*.18;
        const y=dy*.06;
        el.style.transition='translate 70ms linear';
        el.style.translate=`${x}px ${y}px`;
      });
    }

    function settle(boost=0){
      const list=bowls();
      list.forEach((el,i)=>{
        if(i<28)return;
        const upper=i<62;
        if(!reduced.matches&&boost){
          el.style.transition='translate 150ms ease-out';
          el.style.translate=`${(upper?1:-1)*boost}px 0px`;
          setTimeout(()=>{
            el.style.transition='translate 520ms cubic-bezier(.2,.8,.2,1)';
            el.style.translate='0px 0px';
          },150);
        }else{
          el.style.transition='translate 420ms cubic-bezier(.2,.8,.2,1)';
          el.style.translate='0px 0px';
        }
      });
      setTimeout(()=>list.forEach(el=>el.style.transition=''),700);
    }

    stage.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0)return;
      active=true;dragged=false;suppressClick=false;
      startX=lastX=e.clientX;startY=lastY=e.clientY;startT=performance.now();
      try{stage.setPointerCapture(e.pointerId)}catch(_){ }
      stage.classList.add('gesture-hold');
      holdTimer=setTimeout(()=>stage.classList.add('gesture-hold'),280);
    },{passive:true});

    stage.addEventListener('pointermove',e=>{
      if(!active)return;
      lastX=e.clientX;lastY=e.clientY;
      const dx=lastX-startX,dy=lastY-startY;
      if(Math.hypot(dx,dy)>10){
        dragged=true;suppressClick=true;
        stage.classList.add('gesture-drag');
        apply(Math.max(-90,Math.min(90,dx)),Math.max(-50,Math.min(50,dy)));
      }
    },{passive:true});

    function end(e){
      if(!active)return;
      active=false;clearTimeout(holdTimer);
      stage.classList.remove('gesture-hold','gesture-drag');
      const dx=lastX-startX,dt=Math.max(1,performance.now()-startT);
      const velocity=Math.abs(dx)/dt;
      let boost=0;
      if(dragged&&Math.abs(dx)>42&&velocity>.12&&!reduced.matches){
        boost=Math.sign(dx)*Math.min(24,10+velocity*22);
      }
      settle(boost);
      try{stage.releasePointerCapture(e.pointerId)}catch(_){ }
      setTimeout(()=>suppressClick=false,220);
    }
    stage.addEventListener('pointerup',end,{passive:true});
    stage.addEventListener('pointercancel',end,{passive:true});

    stage.addEventListener('click',e=>{
      if(suppressClick&&e.target.closest('.memory')){
        e.preventDefault();e.stopImmediatePropagation();
      }
    },true);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();