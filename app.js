const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const carUpload = document.getElementById("carUpload");
const saveBtn = document.getElementById("saveBtn");
const wheelCards = document.querySelectorAll(".wheel-card");

let carImage = null;
let wheelImage = null;

let wheels = [
{
x: 250,
y: 350,
size: 140
},
{
x: 550,
y: 350,
size: 140
}
];

let activeWheel = null;

function draw() {

ctx.clearRect(0,0,canvas.width,canvas.height);

if(carImage){

ctx.drawImage(
carImage,
0,
0,
canvas.width,
canvas.height
);

}

if(wheelImage){

wheels.forEach(wheel => {

ctx.drawImage(
wheelImage,
wheel.x,
wheel.y,
wheel.size,
wheel.size
);

});

}

}

carUpload.addEventListener("change",(e)=>{

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(event){

carImage = new Image();

carImage.onload = ()=>{

canvas.width = carImage.width;
canvas.height = carImage.height;

wheels = [

{
x: canvas.width * 0.25,
y: canvas.height * 0.65,
size: canvas.width * 0.12
},

{
x: canvas.width * 0.65,
y: canvas.height * 0.65,
size: canvas.width * 0.12
}

];

draw();

};

carImage.src = event.target.result;

};

reader.readAsDataURL(file);

});

wheelCards.forEach(card=>{

card.addEventListener("click",()=>{

const src = card.dataset.wheel;

wheelImage = new Image();

wheelImage.onload = ()=>{

draw();

};

wheelImage.src = src;

});

});

canvas.addEventListener("mousedown",(e)=>{

const rect = canvas.getBoundingClientRect();

const x =
(e.clientX - rect.left) *
(canvas.width / rect.width);

const y =
(e.clientY - rect.top) *
(canvas.height / rect.height);

wheels.forEach((wheel,index)=>{

if(

x > wheel.x &&
x < wheel.x + wheel.size &&
y > wheel.y &&
y < wheel.y + wheel.size

){

activeWheel = index;

}

});

});

canvas.addEventListener("mousemove",(e)=>{

if(activeWheel === null) return;

const rect = canvas.getBoundingClientRect();

const x =
(e.clientX - rect.left) *
(canvas.width / rect.width);

const y =
(e.clientY - rect.top) *
(canvas.height / rect.height);

wheels[activeWheel].x =
x - wheels[activeWheel].size/2;

wheels[activeWheel].y =
y - wheels[activeWheel].size/2;

draw();

});

canvas.addEventListener("mouseup",()=>{

activeWheel = null;

});

canvas.addEventListener("mouseleave",()=>{

activeWheel = null;

});

canvas.addEventListener("wheel",(e)=>{

e.preventDefault();

if(activeWheel === null) return;

if(e.deltaY < 0){

wheels[activeWheel].size += 10;

}else{

wheels[activeWheel].size -= 10;

}

if(wheels[activeWheel].size < 50){

wheels[activeWheel].size = 50;

}

draw();

});

saveBtn.addEventListener("click",()=>{

const link =
document.createElement("a");

link.download =
"wheelfit-result.png";

link.href =
canvas.toDataURL("image/png");

link.click();

});
