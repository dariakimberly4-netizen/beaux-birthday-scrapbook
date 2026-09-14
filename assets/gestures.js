(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const isMobile=/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||matchMedia('(max-width:760px)').matches;

  function init(){
    const stage=document.getElementById('stage');
    const memories=document.getElementById('memories');
    const header=document.querySelector('.header');
    if(!stage||!memories||!header)return;

    const style=document.createElement('style');
    style.textContent=`
      #stage{touch-action:none;user-select:none;-webkit-user-select:none}
      #stage.gesture-hold:before{opacity:1!important;filter:blur(22px) brightness(1.12)!important}
      #stage.gesture-drag .photoShell,#stage.hand-live .photoShell{box-shadow:0 7px 22px #000b,0 0 12px #e8c78b22}
      .handControl{min-height:46px;padding:0 14px;border-radius:999px;border:1px solid #f4ddb066;background:#100e22ee;color:#fff;cursor:pointer;letter-spacing:.04em;font-weight:700}
      .handControl.on{border-color:#f4ddb0;background:#24183e;box-shadow:0 0 16px #bcaeff33}
      .handControl:disabled{opacity:.65;cursor:wait}
      .handHud{position:fixed;z-index:45;left:16px;bottom:52px;width:210px;max-width:42vw;border:1px solid #ffffff26;border-radius:14px;background:#090713f2;padding:8px;box-shadow:0 14px 44px #0009;display:none}
      .handHud.show{display:block}.handHud video{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:9px;display:block;transform:scaleX(-1);background:#05040c}
      .handStatus{margin-top:6px;font-size:11px;line-height:1.35;color:#f4eef9;text-align:center;word-break:break-word}.handStatus b{color:#f4ddb0}
      .handDot{position:fixed;z-index:46;width:20px;height:20px;border:2px solid #f4ddb0;border-radius:50%;pointer-events:none;display:none;box-shadow:0 0 16px #f4ddb088;transform:translate(-50%,-50%)}.handDot.show{display:block}
      @media(max-width:760px){.header{gap:6px;align-items:center}.handControl{font-size:10px;padding:0 9px;min-height:44px}.handHud{width:118px;max-width:34vw;left:8px;bottom:74px;padding:6px;border-radius:12px}.handHud video{border-radius:7px}.brand{max-width:38%!important;font-size:9px!important}.brand b{font-size:14px!important}.pill{font-size:10px!important;padding:0 9px!important}.handStatus{font-size:9px;line-height:1.25}}
      @media(prefers-reduced-motion:reduce){#stage{touch-action:manipulation}.memory{translate:0 0!important}}
    `;
    document.head.appendChild(style);

    const btn=document.createElement('button');
    btn.className='handControl';btn.type='button';btn.textContent='ENABLE HAND CONTROL';btn.setAttribute('aria-pressed','false');
    header.insertBefore(btn,header.lastElementChild);

    const hud=document.createElement('div');hud.className='handHud';
    hud.innerHTML='<video playsinline webkit-playsinline muted autoplay></video><div class="handStatus">Camera off</div>';
    document.body.appendChild(hud);
    const video=hud.querySelector('video');video.muted=true;video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');video.setAttribute('autoplay','');
    const status=hud.querySelector('.handStatus');
    const dot=document.createElement('div');dot.className='handDot';document.body.appendChild(dot);

    const bowls=()=>Array.from(memories.querySelectorAll('.memory'));
    let active=false,startX=0,startY=0,lastX=0,lastY=0,startT=0,dragged=false,holdTimer=null,suppressClick=false;
    let cameraOn=false,stream=null,recognizer=null,raf=0,lastVideoTime=-1,lastDetect=0,lastHandX=null,smoothX=null,slowState=false;

    function apply(dx,dy){
      if(reduced.matches)return;
      bowls().forEach((el,i)=>{if(i<28)return;const upper=i<62;const x=upper?dx*.18:-dx*.18;const y=dy*.06;el.style.transition='translate 70ms linear';el.style.translate=`${x}px ${y}px`})
    }
    function settle(boost=0){
      const list=bowls();list.forEach((el,i)=>{if(i<28)return;const upper=i<62;if(!reduced.matches&&boost){el.style.transition='translate 150ms ease-out';el.style.translate=`${(upper?1:-1)*boost}px 0px`;setTimeout(()=>{el.style.transition='translate 520ms cubic-bezier(.2,.8,.2,1)';el.style.translate='0px 0px'},150)}else{el.style.transition='translate 420ms cubic-bezier(.2,.8,.2,1)';el.style.translate='0px 0px'}});setTimeout(()=>list.forEach(el=>el.style.transition=''),700)
    }

    stage.addEventListener('pointerdown',e=>{if(cameraOn)return;if(e.pointerType==='mouse'&&e.button!==0)return;active=true;dragged=false;suppressClick=false;startX=lastX=e.clientX;startY=lastY=e.clientY;startT=performance.now();try{stage.setPointerCapture(e.pointerId)}catch(_){ }holdTimer=setTimeout(()=>stage.classList.add('gesture-hold'),280)},{passive:true});
    stage.addEventListener('pointermove',e=>{if(!active||cameraOn)return;lastX=e.clientX;lastY=e.clientY;const dx=lastX-startX,dy=lastY-startY;if(Math.hypot(dx,dy)>10){dragged=true;suppressClick=true;stage.classList.add('gesture-drag');apply(Math.max(-90,Math.min(90,dx)),Math.max(-50,Math.min(50,dy)))}},{passive:true});
    function end(e){if(!active||cameraOn)return;active=false;clearTimeout(holdTimer);stage.classList.remove('gesture-hold','gesture-drag');const dx=lastX-startX,dt=Math.max(1,performance.now()-startT),velocity=Math.abs(dx)/dt;let boost=0;if(dragged&&Math.abs(dx)>42&&velocity>.12&&!reduced.matches)boost=Math.sign(dx)*Math.min(24,10+velocity*22);settle(boost);try{stage.releasePointerCapture(e.pointerId)}catch(_){ }setTimeout(()=>suppressClick=false,220)}
    stage.addEventListener('pointerup',end,{passive:true});stage.addEventListener('pointercancel',end,{passive:true});
    stage.addEventListener('click',e=>{if(suppressClick&&e.target.closest('.memory')){e.preventDefault();e.stopImmediatePropagation()}},true);

    function setSlow(on){if(on===slowState)return;slowState=on;stage.classList.toggle('gesture-hold',on)}
    function gestureName(result){try{return result.gestures?.[0]?.[0]?.categoryName||'None'}catch(_){return'None'}}
    function reactToHand(result){
      const hands=result.landmarks||result.handLandmarks||[];
      if(!hands.length){status.textContent='Show one hand';dot.classList.remove('show');lastHandX=null;setSlow(false);settle();return}
      const lm=hands[0],palm=lm[9]||lm[0],x=1-palm.x,y=palm.y;smoothX=smoothX==null?x:(smoothX*.72+x*.28);
      const rect=stage.getBoundingClientRect();dot.style.left=(rect.left+smoothX*rect.width)+'px';dot.style.top=(rect.top+y*rect.height)+'px';dot.classList.add('show');
      const open=gestureName(result)==='Open_Palm';setSlow(open);
      if(lastHandX!=null&&!open&&!reduced.matches){const delta=(smoothX-lastHandX)*420;if(Math.abs(delta)>.45)apply(Math.max(-72,Math.min(72,delta)),0)}
      lastHandX=smoothX;status.innerHTML=open?'<b>OPEN PALM:</b> hold':'<b>HAND LIVE</b>';
    }

    async function buildRecognizer(delegate){
      const vision=await import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/+esm');
      const resolver=await vision.FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm');
      return vision.GestureRecognizer.createFromOptions(resolver,{baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',delegate},runningMode:'VIDEO',numHands:1,minHandDetectionConfidence:.5,minHandPresenceConfidence:.45,minTrackingConfidence:.45});
    }
    async function loadRecognizer(){
      if(recognizer)return recognizer;status.textContent='Loading hand tracking…';
      try{recognizer=await buildRecognizer(isMobile?'CPU':'GPU')}catch(e){status.textContent='Compatibility mode…';recognizer=await buildRecognizer('CPU')}
      return recognizer;
    }
    async function loop(t){if(!cameraOn)return;raf=requestAnimationFrame(loop);if(video.readyState<2||video.currentTime===lastVideoTime||t-lastDetect<(isMobile?110:70))return;lastDetect=t;lastVideoTime=video.currentTime;try{reactToHand(recognizer.recognizeForVideo(video,performance.now()))}catch(e){status.textContent='Tracking…'}}

    async function requestCamera(){
      let lastErr=null;
      const attempts=isMobile?[
        {video:{facingMode:'user'},audio:false},
        {video:{facingMode:{ideal:'user'}},audio:false},
        {video:true,audio:false}
      ]:[
        {video:{facingMode:{ideal:'user'},width:{ideal:640},height:{ideal:480}},audio:false},
        {video:true,audio:false}
      ];
      for(const constraints of attempts){
        try{return await navigator.mediaDevices.getUserMedia(constraints)}catch(e){
          lastErr=e;
          if(e?.name==='NotAllowedError'||e?.name==='PermissionDeniedError'||e?.name==='SecurityError')throw e;
        }
      }
      throw lastErr||new Error('Camera could not start');
    }

    function errorHelp(err){
      const name=err?.name||'CameraError';
      const msg=(err?.message||'').replace(/[<>]/g,'');
      if(name==='NotAllowedError'||name==='PermissionDeniedError')return `<b>CAMERA BLOCKED</b><br>${name}${msg?': '+msg:''}<br>Chrome ⋮ → Settings → Site settings → Camera → Allow`;
      if(name==='SecurityError')return `<b>CAMERA SECURITY ERROR</b><br>${name}${msg?': '+msg:''}`;
      if(name==='NotFoundError'||name==='DevicesNotFoundError')return `<b>NO CAMERA FOUND</b><br>${name}${msg?': '+msg:''}`;
      if(name==='NotReadableError'||name==='TrackStartError')return `<b>CAMERA BUSY</b><br>${name}${msg?': '+msg:''}<br>Close Camera/Meet/Messenger video, then retry.`;
      if(name==='OverconstrainedError'||name==='ConstraintNotSatisfiedError')return `<b>CAMERA CONSTRAINT ERROR</b><br>${name}${msg?': '+msg:''}`;
      return `<b>CAMERA ERROR</b><br>${name}${msg?': '+msg:''}`;
    }

    async function startCamera(){
      if(!window.isSecureContext){hud.classList.add('show');status.innerHTML='<b>CAMERA NEEDS HTTPS</b>';return}
      if(!navigator.mediaDevices?.getUserMedia){hud.classList.add('show');status.innerHTML='<b>CAMERA API UNAVAILABLE</b><br>Open directly in Chrome or Safari.';return}
      btn.disabled=true;hud.classList.add('show');status.textContent='Starting front camera…';
      try{
        stream=await requestCamera();
        video.srcObject=stream;
        await new Promise((resolve,reject)=>{
          let finished=false;
          const ok=()=>{if(finished)return;finished=true;cleanup();resolve()};
          const bad=()=>{if(finished)return;finished=true;cleanup();reject(new Error('Video metadata failed'))};
          const cleanup=()=>{video.removeEventListener('loadedmetadata',ok);video.removeEventListener('error',bad)};
          video.addEventListener('loadedmetadata',ok,{once:true});video.addEventListener('error',bad,{once:true});setTimeout(ok,2200);
        });
        video.muted=true;
        try{await video.play()}catch(playErr){throw playErr}
        status.textContent='Camera ready. Loading hand tracking…';
        await loadRecognizer();
        cameraOn=true;btn.disabled=false;btn.classList.add('on');btn.textContent='STOP HAND CONTROL';btn.setAttribute('aria-pressed','true');stage.classList.add('hand-live');status.innerHTML='<b>HAND LIVE</b>';lastHandX=null;smoothX=null;raf=requestAnimationFrame(loop);
      }catch(e){
        console.error('Hand camera error',e);btn.disabled=false;btn.classList.remove('on');btn.textContent='ENABLE HAND CONTROL';btn.setAttribute('aria-pressed','false');status.innerHTML=errorHelp(e);if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}video.srcObject=null;
      }
    }
    function stopCamera(){cameraOn=false;cancelAnimationFrame(raf);if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;video.srcObject=null;btn.classList.remove('on');btn.textContent='ENABLE HAND CONTROL';btn.setAttribute('aria-pressed','false');stage.classList.remove('hand-live','gesture-hold');dot.classList.remove('show');hud.classList.remove('show');setSlow(false);settle();lastHandX=null;smoothX=null}

    btn.addEventListener('click',()=>cameraOn?stopCamera():startCamera());
    window.addEventListener('pagehide',stopCamera,{once:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();