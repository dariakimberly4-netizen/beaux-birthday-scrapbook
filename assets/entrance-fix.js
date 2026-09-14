(()=>{
  const gate=document.getElementById('gate');
  const app=document.getElementById('app');
  const enter=document.getElementById('enter');
  const finalBtn=document.getElementById('finalBtn');
  if(!gate||!app||!enter)return;

  document.title='BEAUX — The Queen B';
  const desktopBg='assets/queen-b-final-background.jpg?v=20260915-clean1';
  const mobileBg='assets/q.png?v=20260915-clean1';

  const style=document.createElement('style');
  style.textContent=`
    html,body{margin:0!important;width:100%!important;height:100%!important;min-height:100%!important;overflow:hidden!important;background:#05040c!important}
    #gate{background:radial-gradient(circle,#39265f,#100a22 55%,#05040c)!important;background-image:none!important}
    body.entered{background:#05040c!important}
    body.entered #app{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;min-height:100dvh!important;padding:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;background-image:url('${desktopBg}')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;background-color:#05040c!important;overflow:hidden!important}
    body.entered #app:before,body.entered #app:after{display:none!important;content:none!important}
    body.entered .header,body.entered .hint,body.entered .star{display:none!important}

    body.entered #stage{display:block!important;position:relative!important;width:min(50vw,820px)!important;height:min(72vh,760px)!important;margin-left:32vw!important;z-index:20!important;pointer-events:auto!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important}
    body.entered #stage:before{display:none!important;content:none!important;background:none!important}
    body.entered #memories{display:block!important;position:absolute!important;inset:0!important;background:transparent!important;pointer-events:auto!important}
    body.entered .memory{z-index:30!important;background:transparent!important;pointer-events:auto!important;cursor:pointer!important}
    body.entered .photoShell{opacity:1!important;visibility:visible!important;border:1px solid #f0d6a3aa!important;box-shadow:0 4px 14px #000a!important;pointer-events:none!important;overflow:hidden!important;background:transparent!important}
    body.entered .photoShell img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;filter:none!important;transform:none!important;background:transparent!important}

    #queenFinalHit{position:fixed;z-index:80;top:2.2vh;right:2vw;width:14.5vw;height:6.5vh;min-width:175px;min-height:48px;border:0;background:transparent;cursor:pointer;display:none}
    body.entered #queenFinalHit{display:block}

    @media(max-width:760px){
      body.entered,body.entered #app{
        background-image:url('${mobileBg}')!important;
        background-size:cover!important;
        background-position:center top!important;
        background-repeat:no-repeat!important;
        background-color:#05040c!important;
      }
      body.entered #stage{position:absolute!important;left:57%!important;top:24%!important;width:39vw!important;height:47vh!important;margin:0!important;transform:none!important}
      body.entered .memory{width:34px!important;height:34px!important}
      body.entered .photoShell{max-width:30px!important;max-height:24px!important}
      #queenFinalHit{top:auto!important;bottom:3.5vh!important;left:14vw!important;right:auto!important;width:72vw!important;height:7vh!important;min-width:0!important}
    }
    @supports not (height:100dvh){body.entered #app{height:100vh!important;min-height:100vh!important}}
  `;
  document.head.appendChild(style);

  const forceBackground=()=>{
    if(innerWidth<=760){
      const v=`url('${mobileBg}')`;
      for(const el of [document.body,app]){
        el.style.setProperty('background-image',v,'important');
        el.style.setProperty('background-size','cover','important');
        el.style.setProperty('background-position','center top','important');
        el.style.setProperty('background-repeat','no-repeat','important');
        el.style.setProperty('background-color','#05040c','important');
      }
    }
  };

  enter.addEventListener('click',()=>{
    document.body.classList.add('entered');
    forceBackground();
    setTimeout(forceBackground,100);
    setTimeout(forceBackground,600);
  },{capture:true});
  window.addEventListener('resize',()=>{if(document.body.classList.contains('entered'))forceBackground()});

  const wireFinalHit=()=>{
    if(document.getElementById('queenFinalHit'))return;
    const hit=document.createElement('button');
    hit.id='queenFinalHit';
    hit.setAttribute('aria-label','Open final message');
    hit.addEventListener('click',()=>{if(finalBtn)finalBtn.click()});
    document.body.appendChild(hit);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wireFinalHit,{once:true});
  else wireFinalHit();
})();