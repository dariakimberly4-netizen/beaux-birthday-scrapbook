(()=>{
  const gate=document.getElementById('gate');
  const app=document.getElementById('app');
  const enter=document.getElementById('enter');
  const finalBtn=document.getElementById('finalBtn');
  if(!gate||!app||!enter)return;

  document.title='BEAUX — The Queen B';
  const bg='assets/queen-b-final-background.jpg?v=20260914-qb-final1';

  const style=document.createElement('style');
  style.textContent=`
    html,body{margin:0!important;width:100%!important;height:100%!important;overflow:hidden!important;background:#05040c!important}
    #gate{background:radial-gradient(circle,#39265f,#100a22 55%,#05040c)!important;background-image:none!important}
    body.entered{background:#05040c!important}
    body.entered #app{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;padding:0!important;margin:0!important;display:flex!important;align-items:center!important;justify-content:center!important;background-image:url('${bg}')!important;background-size:cover!important;background-position:center center!important;background-repeat:no-repeat!important;overflow:hidden!important}
    body.entered #app:before,body.entered #app:after{display:none!important;content:none!important}
    body.entered .header,body.entered .hint,body.entered .star{display:none!important}

    body.entered #stage{display:block!important;position:relative!important;width:min(54vw,900px)!important;height:min(76vh,780px)!important;margin-left:28vw!important;z-index:20!important;pointer-events:auto!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important}
    body.entered #stage:before{display:none!important;content:none!important;background:none!important}
    body.entered #memories{display:block!important;position:absolute!important;inset:0!important;background:transparent!important;pointer-events:auto!important}
    body.entered .memory{z-index:30!important;background:transparent!important;pointer-events:auto!important;cursor:pointer!important}
    body.entered .photoShell{opacity:1!important;visibility:visible!important;border:1px solid #f0d6a3aa!important;box-shadow:0 4px 14px #000a!important;pointer-events:none!important;overflow:hidden!important;background:transparent!important}
    body.entered .photoShell img{width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;filter:none!important;transform:none!important;background:transparent!important}
    body.entered .memory:focus-visible{outline:2px solid #f4ddb0!important;outline-offset:2px!important}

    #queenFinalHit{position:fixed;z-index:80;top:2.2vh;right:2vw;width:14.5vw;height:6.5vh;min-width:175px;min-height:48px;border:0;background:transparent;cursor:pointer;display:none}
    body.entered #queenFinalHit{display:block}

    @media(max-width:760px){
      body.entered #app{background-size:cover!important;background-position:30% center!important}
      body.entered #stage{width:82vw!important;height:62vh!important;margin-left:12vw!important;margin-top:10vh!important}
      #queenFinalHit{top:1.6vh;right:2vw;width:42vw;height:7vh;min-width:0}
    }
  `;
  document.head.appendChild(style);

  enter.addEventListener('click',()=>{
    document.body.classList.add('entered');
  },{capture:true});

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