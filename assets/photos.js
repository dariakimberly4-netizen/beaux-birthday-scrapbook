const _base="https://raw.githubusercontent.com/dariakimberly4-netizen/beaux-birthday-scrapbook/main/assets/photos/";
const _local=["IMG-20260705-WA0002.jpg","IMG-20260710-WA0001.jpg","IMG-20260710-WA0003.jpg","IMG-20260728-WA0000.jpg","IMG-20260728-WA0001.jpg","IMG-20260728-WA0002.jpg","IMG-20260728-WA0003.jpg","IMG-20260903-WA0001.jpg","IMG-20260903-WA0002.jpg","IMG-20260903-WA0003.jpg","IMG-20260903-WA0004.jpg","IMG-20260903-WA0005.jpg","IMG-20260903-WA0006.jpg","IMG-20260903-WA0007.jpg","IMG-20260903-WA0009.jpg","IMG-20260903-WA0010.jpg","IMG-20260903-WA0011.jpg","IMG-20260903-WA0012.jpg","IMG-20260903-WA0013.jpg","IMG-20260903-WA0014.jpg","IMG-20260903-WA0015.jpg","IMG-20260903-WA0016.jpg","IMG-20260903-WA0017.jpg","IMG-20260903-WA0019.jpg","IMG-20260903-WA0020.jpg","IMG-20260903-WA0021.jpg","IMG-20260903-WA0022.jpg","IMG-20260903-WA0023.jpg","IMG-20260903-WA0024.jpg","IMG-20260903-WA0025.jpg","IMG-20260903-WA0026.jpg","IMG-20260903-WA0028.jpg","IMG-20260903-WA0029.jpg","IMG-20260903-WA0031.jpg","IMG-20260903-WA0032.jpg","IMG-20260903-WA0033.jpg","IMG-20260903-WA0034.jpg","IMG-20260903-WA0035.jpg","IMG-20260903-WA0036.jpg","IMG-20260903-WA0037.jpg","IMG-20260903-WA0038.jpg","IMG-20260903-WA0039.jpg","IMG-20260903-WA0040.jpg","IMG-20260903-WA0041.jpg","IMG-20260903-WA0042.jpg","IMG-20260903-WA0043.jpg","IMG-20260903-WA0044.jpg","IMG-20260903-WA0045.jpg","IMG-20260903-WA0046.jpg","IMG-20260903-WA0047.jpg","IMG-20260903-WA0048.jpg","IMG-20260903-WA0049.jpg","IMG-20260903-WA0050.jpg","IMG-20260903-WA0051.jpg","IMG-20260903-WA0052.jpg","IMG-20260903-WA0053.jpg","IMG-20260903-WA0055.jpg","IMG-20260903-WA0056.jpg","IMG-20260903-WA0057.jpg","IMG-20260903-WA0059.jpg","IMG-20260903-WA0060.jpg","IMG-20260903-WA0061.jpg","IMG-20260903-WA0062.jpg","IMG-20260903-WA0063.jpg","IMG-20260903-WA0064.jpg","IMG-20260903-WA0065.jpg","IMG-20260903-WA0066.jpg","IMG-20260903-WA0067.jpg","IMG-20260903-WA0069.jpg","IMG-20260903-WA0070.jpg","IMG-20260903-WA0071.jpg","IMG-20260903-WA0072.jpg","IMG-20260903-WA0073.jpg","IMG-20260903-WA0074.jpg","IMG-20260903-WA0075.jpg","IMG-20260903-WA0077.jpg","IMG-20260903-WA0078.jpg","IMG-20260903-WA0079.jpg","IMG-20260903-WA0080.jpg","IMG-20260903-WA0081.jpg","IMG-20260903-WA0082.jpg","IMG-20260903-WA0083.jpg","IMG-20260903-WA0084.jpg"];
const _drive=["161zln6dYkrk5dJRkI1TnGOsO0TMOE8YC","1D114VqDItbkf4YVfl8XVLUd-FumLnbCF","1FQrogNrEZ2ni1LFhrYa72pmIO3iJ2iMf","1TvoH1YPp49JCldXLtxcf-ZR0nRnxegdC","1R0dkJ0G8Nxo7VsPzlcMGOVDJaRJU1AkE","1YyCgGaViXyoenuliOf9bIC28ryJqZscL","1YuPUYR09uk_M1VTWzHvXJTTFoUsJl_Bj","19EWg9GUZTpz5ZnrkQpURfUWYxhesDc7-","1qElNG1PjUdHg5DIS533lsTd7cExzROf2","1qNRLfVatqTZXURoG6cBXVYESiQaIc-p1","1i_xIxHDXyB-8u_CmqiuurxaDgzJz_9ia","198f3i9MCQhh3Pqt_qbpXOQ8prCyPU6H4","1_RGI7qEd-6hAL60EghKdR97J67RK87TS","1v4sH-bbRofRMLsWKsIe3GrRkiA0b68oE","1xfCQyACJs5W_1Jpr6e4bk2CarA6739bl","1YYue4sgu3RA9N9CR6GgnbivANttdIHcY","1COxnI3JAJ77mmeDA9v38ztukjqSW7qOl"];
window.BEAUX_PHOTOS=_local.map(n=>_base+n).concat(_drive.map(id=>`https://drive.google.com/thumbnail?id=${id}&sz=w1200`));

window.addEventListener('DOMContentLoaded',()=>{
  const finale=document.getElementById('finale');
  if(!finale)return;
  const style=document.createElement('style');
  style.textContent=`
    #finale{overflow:auto;padding:24px 16px!important}
    .sweetFinal{width:min(92vw,760px);margin:auto;display:grid;place-items:center;text-align:center;animation:sweetIn .9s cubic-bezier(.2,.8,.2,1)}
    .sweetPhotoWrap{position:relative;width:min(86vw,560px);max-height:52vh;display:grid;place-items:center;margin:0 auto 18px;padding:7px;border:1px solid rgba(245,223,178,.52);background:rgba(8,5,18,.72);box-shadow:0 30px 90px rgba(0,0,0,.55),0 0 45px rgba(188,174,255,.28)}
    .sweetPhotoWrap:before{content:"";position:absolute;inset:-18px;border-radius:30px;background:radial-gradient(circle,rgba(245,223,178,.16),rgba(188,174,255,.09) 38%,transparent 72%);filter:blur(14px);z-index:-1}
    .sweetPhoto{display:block;max-width:100%;max-height:50vh;width:auto;height:auto;object-fit:contain;object-position:center;background:#080612}
    .sweetKicker{font:500 11px Georgia,serif;letter-spacing:.22em;color:#f5dfb2;margin:2px 0 9px}
    .sweetTitle{font:500 clamp(30px,6vw,54px)/1.05 Georgia,serif;color:#fffaf3;margin:0 0 14px;text-shadow:0 0 24px rgba(188,174,255,.38)}
    .sweetMessage{width:min(88vw,640px);font:400 clamp(15px,2.5vw,19px)/1.7 Georgia,serif;color:#e8e0ee;margin:0 auto}
    .sweetSign{margin-top:14px;font:italic 500 18px Georgia,serif;color:#f5dfb2}
    .sweetAgain{margin-top:20px;height:48px;padding:0 22px;border:1px solid #f5dfb2;border-radius:999px;background:linear-gradient(135deg,#f2dcad,#cda665);color:#18101f;font-weight:900;cursor:pointer}
    @keyframes sweetIn{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:none}}
    @media(max-width:620px){.sweetPhotoWrap{max-height:43vh;width:min(88vw,440px)}.sweetPhoto{max-height:41vh}.sweetMessage{font-size:14px;line-height:1.55}.sweetTitle{font-size:32px}}
  `;
  document.head.appendChild(style);
  finale.innerHTML=`<div class="sweetFinal"><div class="sweetPhotoWrap"><img class="sweetPhoto" id="sweetPhoto" src="https://drive.google.com/thumbnail?id=1nxLSD2dlZ8ltzL_MrK6FyM6EKTFAy22n&sz=w1600" alt="A special memory for Beaux"></div><div class="sweetKicker">ONE PHOTO • A THOUSAND LITTLE MEMORIES</div><div class="sweetTitle">Happy Birthday, Sis! 💜</div><div class="sweetMessage">No matter how many years, places, or memories fill our lives, one thing will always stay the same—you’ll always be my sister, my safe place, and one of my favorite parts of home.<br><br>I hope this year gives you back all the love, laughter, and light you give so freely. Here’s to everything we’ve already shared—and all the beautiful memories still waiting for us.</div><div class="sweetSign">Love you always, Kimmy</div><button id="again" class="sweetAgain" type="button">BACK TO OUR MEMORIES ✦</button></div>`;
  const img=document.getElementById('sweetPhoto');
  img.addEventListener('error',()=>{img.closest('.sweetPhotoWrap').style.display='none'});
  document.getElementById('again').addEventListener('click',()=>{
    finale.classList.remove('show');
    setTimeout(()=>document.getElementById('wildBtn')?.click(),120);
  });
});
