
const wheels=[
{name:'BBS CH-R'},
{name:'Vossen HF-5'},
{name:'Rays TE37'},
{name:'Rotiform RSE'},
{name:'OZ Ultraleggera'},
{name:'Slik L-1811'}
];
const catalog=document.getElementById('catalog');
function render(list){
 catalog.innerHTML='';
 list.forEach(w=>{
  const d=document.createElement('div');
  d.className='card';
  d.innerHTML=`<img src="https://picsum.photos/200?random=${encodeURIComponent(w.name)}"><b>${w.name}</b>`;
  catalog.appendChild(d);
 });
}
render(wheels);
document.getElementById('search').oninput=e=>{
 const q=e.target.value.toLowerCase();
 render(wheels.filter(x=>x.name.toLowerCase().includes(q)));
};
document.getElementById('photo').onchange=e=>{
 const f=e.target.files[0]; if(!f) return;
 const img=document.getElementById('carPreview');
 img.src=URL.createObjectURL(f);
 img.style.display='block';
};
