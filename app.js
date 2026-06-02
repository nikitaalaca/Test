
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const upload=document.getElementById('carUpload');
const saveBtn=document.getElementById('saveBtn');
const catalog=document.getElementById('catalog');
const search=document.getElementById('search');

let carImg=null;

function renderCatalog(list){
 catalog.innerHTML='';
 list.forEach(w=>{
   const d=document.createElement('div');
   d.className='card';
   d.innerHTML=`<img src="${w.image}"><h3>${w.name}</h3>`;
   catalog.appendChild(d);
 });
}

renderCatalog(wheelCatalog);

search.oninput=()=>{
 const q=search.value.toLowerCase();
 renderCatalog(wheelCatalog.filter(x=>x.name.toLowerCase().includes(q)));
};

upload.onchange=e=>{
 const f=e.target.files[0];
 if(!f)return;
 const r=new FileReader();
 r.onload=ev=>{
  carImg=new Image();
  carImg.onload=()=>{
   canvas.width=carImg.width;
   canvas.height=carImg.height;
   ctx.drawImage(carImg,0,0);
  };
  carImg.src=ev.target.result;
 };
 r.readAsDataURL(f);
};

saveBtn.onclick=()=>{
 const a=document.createElement('a');
 a.href=canvas.toDataURL('image/png');
 a.download='wheel-fit.png';
 a.click();
};
