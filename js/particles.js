const hero = document.getElementById('hero');
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

const words = ["<div>","<span>","<header>","<footer>","<section>","<article>","<nav>","<aside>","<h1>","<h2>","<h3>","<p>","<a>","<ul>","<li>","<img>","<button>","<form>","<input>","<label>","class","void","int","double","block","item","craft","spawn","mob","redstone","server","host","plugin","dashboard","ESP32","RGB","smartHome","network","nextLevel"];

let particlesArray = [];

function resizeCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.word = words[Math.floor(Math.random() * words.length)];
        this.baseSize = Math.random() * 18 + 12;
        this.size = this.baseSize;
        this.sizeDirection = Math.random() > 0.5 ? 1 : -1;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size += 0.05 * this.sizeDirection;
        if(this.size > this.baseSize+5 || this.size < this.baseSize-5) this.sizeDirection*=-1;
        if(this.x<0||this.x>canvas.width) this.speedX*=-1;
        if(this.y<0||this.y>canvas.height) this.speedY*=-1;
    }
    draw() {
        ctx.fillStyle = `rgba(0,200,255,${this.opacity})`;
        ctx.font = `${this.size}px monospace`;
        ctx.fillText(this.word, this.x, this.y);
    }
}

function initParticles(count=80) {
    particlesArray=[];
    for(let i=0;i<count;i++) particlesArray.push(new Particle());
}
initParticles();

function connectParticles() {
    for(let a=0;a<particlesArray.length;a++){
        for(let b=a+1;b<particlesArray.length;b++){
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if(distance<150){
                ctx.strokeStyle = `rgba(0,200,255,0.1)`;
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x,particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x,particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particlesArray.forEach(p=>{p.update();p.draw();});
    connectParticles();
    requestAnimationFrame(animate);
}
animate();
