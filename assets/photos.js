const _base="https://raw.githubusercontent.com/dariakimberly4-netizen/beaux-birthday-scrapbook/main/assets/photos/";
const _local=["IMG-20260705-WA0002.jpg","IMG-20260710-WA0001.jpg","IMG-20260710-WA0003.jpg","IMG-20260728-WA0000.jpg","IMG-20260728-WA0001.jpg","IMG-20260728-WA0002.jpg","IMG-20260728-WA0003.jpg","IMG-20260903-WA0001.jpg","IMG-20260903-WA0002.jpg","IMG-20260903-WA0003.jpg","IMG-20260903-WA0004.jpg","IMG-20260903-WA0005.jpg","IMG-20260903-WA0006.jpg","IMG-20260903-WA0007.jpg","IMG-20260903-WA0009.jpg","IMG-20260903-WA0010.jpg","IMG-20260903-WA0011.jpg","IMG-20260903-WA0012.jpg","IMG-20260903-WA0013.jpg","IMG-20260903-WA0014.jpg","IMG-20260903-WA0015.jpg","IMG-20260903-WA0016.jpg","IMG-20260903-WA0017.jpg","IMG-20260903-WA0019.jpg","IMG-20260903-WA0020.jpg","IMG-20260903-WA0021.jpg","IMG-20260903-WA0022.jpg","IMG-20260903-WA0023.jpg","IMG-20260903-WA0024.jpg","IMG-20260903-WA0025.jpg","IMG-20260903-WA0026.jpg","IMG-20260903-WA0028.jpg","IMG-20260903-WA0029.jpg","IMG-20260903-WA0031.jpg","IMG-20260903-WA0032.jpg","IMG-20260903-WA0033.jpg","IMG-20260903-WA0034.jpg","IMG-20260903-WA0035.jpg","IMG-20260903-WA0036.jpg","IMG-20260903-WA0037.jpg","IMG-20260903-WA0038.jpg","IMG-20260903-WA0039.jpg","IMG-20260903-WA0040.jpg","IMG-20260903-WA0041.jpg","IMG-20260903-WA0042.jpg","IMG-20260903-WA0043.jpg","IMG-20260903-WA0044.jpg","IMG-20260903-WA0045.jpg","IMG-20260903-WA0046.jpg","IMG-20260903-WA0047.jpg","IMG-20260903-WA0048.jpg","IMG-20260903-WA0049.jpg","IMG-20260903-WA0050.jpg","IMG-20260903-WA0051.jpg","IMG-20260903-WA0052.jpg","IMG-20260903-WA0053.jpg","IMG-20260903-WA0055.jpg","IMG-20260903-WA0056.jpg","IMG-20260903-WA0057.jpg","IMG-20260903-WA0059.jpg","IMG-20260903-WA0060.jpg","IMG-20260903-WA0061.jpg","IMG-20260903-WA0062.jpg","IMG-20260903-WA0063.jpg","IMG-20260903-WA0064.jpg","IMG-20260903-WA0065.jpg","IMG-20260903-WA0066.jpg","IMG-20260903-WA0067.jpg","IMG-20260903-WA0069.jpg","IMG-20260903-WA0070.jpg","IMG-20260903-WA0071.jpg","IMG-20260903-WA0072.jpg","IMG-20260903-WA0073.jpg","IMG-20260903-WA0074.jpg","IMG-20260903-WA0075.jpg","IMG-20260903-WA0077.jpg","IMG-20260903-WA0078.jpg","IMG-20260903-WA0079.jpg","IMG-20260903-WA0080.jpg","IMG-20260903-WA0081.jpg","IMG-20260903-WA0082.jpg","IMG-20260903-WA0083.jpg","IMG-20260903-WA0084.jpg"];
const _drive=["161zln6dYkrk5dJRkI1TnGOsO0TMOE8YC","1D114VqDItbkf4YVfl8XVLUd-FumLnbCF","1FQrogNrEZ2ni1LFhrYa72pmIO3iJ2iMf","1TvoH1YPp49JCldXLtxcf-ZR0nRnxegdC","1R0dkJ0G8Nxo7VsPzlcMGOVDJaRJU1AkE","1YyCgGaViXyoenuliOf9bIC28ryJqZscL","1YuPUYR09uk_M1VTWzHvXJTTFoUsJl_Bj","19EWg9GUZTpz5ZnrkQpURfUWYxhesDc7-","1qElNG1PjUdHg5DIS533lsTd7cExzROf2","1qNRLfVatqTZXURoG6cBXVYESiQaIc-p1","1i_xIxHDXyB-8u_CmqiuurxaDgzJz_9ia","198f3i9MCQhh3Pqt_qbpXOQ8prCyPU6H4","1_RGI7qEd-6hAL60EghKdR97J67RK87TS","1v4sH-bbRofRMLsWKsIe3GrRkiA0b68oE","1xfCQyACJs5W_1Jpr6e4bk2CarA6739bl","1YYue4sgu3RA9N9CR6GgnbivANttdIHcY","1COxnI3JAJ77mmeDA9v38ztukjqSW7qOl"];
window.BEAUX_PHOTOS=_local.map(n=>_base+n).concat(_drive.map(id=>`https://drive.google.com/thumbnail?id=${id}&sz=w1200`));
(()=>{
  const bg='file_0000000013c481f5966a9b404b093318.png';
  const st=document.createElement('style');
  st.textContent=`
    html,body{background:#05040c!important}
    body{background-image:none!important}
    #gate{background:radial-gradient(circle,#39265f,#100a22 55%,#05040c)!important;background-image:none!important}
    #app{background-image:none!important;background-repeat:no-repeat!important;background-color:#05040c!important}
    body.entered #app{
      background-image:linear-gradient(rgba(5,4,12,.24),rgba(5,4,12,.40)),url('${bg}')!important;
      background-size:auto 96vh!important;
      background-position:22% 2vh!important;
      background-repeat:no-repeat!important;
      background-color:#05040c!important;
    }
    #stage:before{background:radial-gradient(ellipse,#f4ddb022,#bcaeff12 40%,transparent 70%)!important}
    .brand,.hint{text-shadow:0 2px 10px #000,0 1px 3px #000}
    .pill{background:#100e22bf!important;backdrop-filter:blur(6px)}
    @media(max-width:760px){
      body.entered #app{
        background-size:auto 92vh!important;
        background-position:18% 4vh!important;
      }
      .hint{background:linear-gradient(90deg,transparent,#05040c99,transparent);padding:6px 0}
    }
  `;
  document.head.appendChild(st);
  const enter=document.getElementById('enter');
  if(enter) enter.addEventListener('click',()=>document.body.classList.add('entered'),{capture:true});
  const f=document.createElement('script');f.src='assets/entrance-fix.js?v=20260914-entrance2';f.defer=true;document.head.appendChild(f);
  const s=document.createElement('script');s.src='assets/wild.js?v=20260914-wild1';s.defer=true;document.head.appendChild(s)
})();