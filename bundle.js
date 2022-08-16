(()=>{"use strict";const t=JSON.parse('{"uq":[[0,-80,"4-H PART",150],[0,80,"SciBorgs",150],[0,300,"Gracious Professionalism",50,false],[-700,600,"What is 4-H?",100],[-700,700,"4‑H is delivered by Cooperative Extension—",30,false],[-700,750,"a community of more than 100 public universities",30,false],[-700,800,"across the nation that provides experiences",30,false],[-700,850,"where young people learn by doing. For more",30,false],[-700,900,"than 100 years, 4‑H has welcomed young people",30,false],[-700,950,"of all beliefs and backgrounds, giving kids a voice",30,false],[-700,1000,"to express who they are and how they make their",30,false],[-700,1050,"lives and communities better.",30,false],[-700,1150,"Through life-changing 4‑H programs, nearly six",30,false],[-700,1200,"million kids and teens have taken on critical",30,false],[-700,1250,"societal issues, such as addressing community",30,false],[-700,1300,"health inequities, engaging in civil discourse and",30,false],[-700,1350,"advocating for equity and inclusion for all.",30,false],[700,600,"What is FIRST?",100],[700,700,"The mission of FIRST® is to inspire young people",30,false],[700,750,"to be science and technology leaders and",30,false],[700,800,"innovators, by engaging them in exciting",30,false],[700,850,"mentor-based programs that build science,",30,false],[700,900,"engineering, and technology skills, that inspire",30,false],[700,950,"innovation, and that foster well-rounded life",30,false],[700,1000,"capabilities including self-confidence,",30,false],[700,1050,"communication, and leadership.",30,false],[1000,-500,"Support",100],[1000,-250,"Find the exact same low prices, vast selection,",20,false],[1000,-200,"and convenient shopping experience. Amazon Smile",20,false],[1000,-150,"will donate 0.5% of eligible purchases to the 4-H",20,false],[1000,-100,"Palouse Area Robotics Team.",20,false],[1000,0,"Venmo",80],[1000,100,"Venmo ID: FourH PART",30,false],[1000,150,"sciborgs6061@gmail.com",30,false],[1000,250,"Check",80],[1000,350,"Checks can be mailed to 4-H PART",30,false],[1000,400,"310 N Main St. Rm 209",30,false],[1000,450,"Colfax, WA 99111",30,false]],"Df":[[-900,-300,"Facebook",80,"https://facebook.com/sciborgs4061"],[-900,-100,"Twitter",80,"https://twitter.com/sciborgs4061"],[-900,100,"Instagram",80,"https://instagram.com/frc4061"],[-900,300,"GitHub",80,"https://github.com/frc4061"],[1000,-350,"Amazon Smile",80,"https://smile.amazon.com/ch/47-2565453"]],"Wc":[[0,0,"icon.png",1,false],[-800,-800,"a.jpg",1],[0,-600,"b.jpg",1],[800,-800,"c.jpg",1]]}');class e{x;y;constructor(t,e){this.x=t,this.y=e}static get ZERO(){return new e(0,0)}}class s{pos;content;scale;hover;ctx;cam;robot;size;constructor(t,s,i,o,h,n,a=!0){this.pos=t,this.content=new Image,this.content.src=`assets/${s}`,this.scale=i,this.hover=a,this.ctx=o,this.cam=h,this.robot=n,this.size=e.ZERO,this.content.onload=()=>{this.size=new e(this.content.width*this.scale,this.content.height*this.scale)}}draw(){if(this.hover){const t=this.robot.getPosition(),{bounds:e}=this;this.ctx.globalAlpha=t.y>e.top&&t.y<e.bottom&&t.x>e.left&&t.x<e.right?.8:.5}else this.ctx.globalAlpha=.5;this.ctx.drawImage(this.content,0,0,this.content.width,this.content.height,this.pos.x-this.cam.x-this.size.x/2,this.pos.y-this.cam.y-this.size.y/2,this.content.width*this.scale,this.content.height*this.scale),this.ctx.globalAlpha=1}get bounds(){return{top:this.pos.y-this.size.y/2,bottom:this.pos.y+this.size.y/2,left:this.pos.x-this.size.x/2,right:this.pos.x+this.size.x/2}}}class i{pos;content;fontSize;hover;color;ctx;cam;robot;size;constructor(t,s,i,o,h,n,a=!0,l="#1358bf"){this.pos=t,this.content=s,this.fontSize=i,this.hover=a,this.color=l,this.ctx=o,this.cam=h,this.robot=n,this.ctx.font=`${this.fontSize}px Rubik Mono One`;const c=this.ctx.measureText(this.content);this.size=new e(c.width,c.actualBoundingBoxAscent+c.actualBoundingBoxDescent)}draw(){if(this.hover){const t=this.robot.getPosition(),{bounds:e}=this;this.ctx.globalAlpha=t.y>e.top&&t.y<e.bottom&&t.x>e.left&&t.x<e.right?.8:.5}else this.ctx.globalAlpha=.5;this.ctx.fillStyle=this.color,this.ctx.font=`${this.fontSize}px Rubik Mono One`,this.ctx.fillText(this.content,Math.round(this.pos.x-this.cam.x-this.size.x/2),Math.round(this.pos.y-this.cam.y+this.size.y/2)),this.ctx.globalAlpha=1}get bounds(){return{top:this.pos.y-this.size.y/2,bottom:this.pos.y+this.size.y/2,left:this.pos.x-this.size.x/2,right:this.pos.x+this.size.x/2}}}class o extends i{target;opened;constructor(t,e,s,i,o,h,n){super(t,e,s,o,h,n,!0,"#ff6600"),this.target=i,this.opened=!1}update(){const t=this.robot.getPosition(),{bounds:e}=this;if(t.y>e.top&&t.y<e.bottom&&t.x>e.left&&t.x<e.right){if(!this.opened)return this.opened=!0,window.open(this.target),!0}else this.opened=!1;return!1}}const h=Math.PI/10,n=new e(4e3,4e3),a=document.querySelector("canvas"),l=a.getContext("2d");let c={up:!1,down:!1,left:!1,right:!1};const r=new e(-window.innerWidth/2,-window.innerHeight/2),d=new class{pos;speed;angle;wheelAngle;ctx;cam;constructor(t,s){this.pos=e.ZERO,this.speed=0,this.angle=0,this.wheelAngle=0,this.ctx=t,this.cam=s}turn(t){this.wheelAngle+=t,this.wheelAngle>h?this.wheelAngle=h:this.wheelAngle<-h&&(this.wheelAngle=-h)}accelerate(t){this.speed+=t}getPosition(){return this.pos}update(){this.pos.x+=this.speed*Math.cos(this.angle),this.pos.y+=this.speed*Math.sin(this.angle),this.angle+=this.wheelAngle*this.speed*.02,this.wheelAngle*=.8,this.speed*=.9,this.pos.x>n.x/2?this.pos.x=n.x/2:this.pos.x<-n.x/2&&(this.pos.x=-n.x/2),this.pos.y>n.y/2?this.pos.y=n.y/2:this.pos.y<-n.y/2&&(this.pos.y=-n.y/2)}draw(){this.ctx.beginPath(),this.ctx.lineWidth=4,this.ctx.strokeStyle="#000000",this.ctx.lineJoin="bevel",this.ctx.fillStyle="#aaaaaa",this.ctx.translate(Math.round(this.pos.x-this.cam.x),Math.round(this.pos.y-this.cam.y)),this.ctx.rotate(this.angle),this.ctx.translate(12,-20),this.ctx.rotate(this.wheelAngle),this.ctx.moveTo(-8,0),this.ctx.lineTo(8,0),this.ctx.rotate(-this.wheelAngle),this.ctx.translate(0,40),this.ctx.rotate(this.wheelAngle),this.ctx.moveTo(-8,0),this.ctx.lineTo(8,0),this.ctx.rotate(-this.wheelAngle),this.ctx.translate(-12,-20),this.ctx.moveTo(-20,-20),this.ctx.lineTo(-4,-20),this.ctx.moveTo(-20,20),this.ctx.lineTo(-4,20),this.ctx.fillRect(-20,-15,40,30),this.ctx.strokeRect(-20,-15,40,30),this.ctx.moveTo(5,0),this.ctx.ellipse(0,0,5,5,0,0,2*Math.PI),this.ctx.fillStyle=["#440000","#ff0000"][Math.abs(this.speed)<.5?0:(400,2,Math.floor(Date.now()%800/400))],this.ctx.fill(),this.ctx.stroke(),this.ctx.rotate(-this.angle),this.ctx.translate(-Math.round(this.pos.x-this.cam.x),-Math.round(this.pos.y-this.cam.y))}}(l,r),g=t.uq.map((t=>new i(new e(t[0],t[1]),t[2],t[3],l,r,d,t.length<=4))),p=t.Df.map((t=>new o(new e(t[0],t[1]),t[2],t[3],t[4],l,r,d))),x=t.Wc.map((t=>new s(new e(t[0],t[1]),t[2],t[3],l,r,d,t.length<=4)));a.width=window.innerWidth,a.height=window.innerHeight,window.addEventListener("resize",(()=>{a.width=window.innerWidth,a.height=window.innerHeight}));const f=()=>{requestAnimationFrame((()=>f())),l.fillStyle="#ffffff",l.fillRect(0,0,a.width,a.height),l.lineWidth=2,l.strokeStyle="#ddddff",l.beginPath();for(let t=Math.round(-r.x%80);t<=a.width;t+=80)l.moveTo(t,0),l.lineTo(t,a.height);for(let t=Math.round(-r.y%80);t<=a.height;t+=80)l.moveTo(0,t),l.lineTo(a.width,t);l.stroke(),c.up&&d.accelerate(.8),c.down&&d.accelerate(-.8),c.left&&d.turn(-.05),c.right&&d.turn(.05),x.forEach((t=>{const{bounds:e}=t;e.top<r.y+a.height&&e.bottom>r.y&&e.left<r.x+a.width/2+a.width/2&&e.right>r.x+a.width/2-a.width/2&&t.draw()})),p.forEach((t=>{const{bounds:e}=t;e.top<r.y+a.height&&e.bottom>r.y&&e.left<r.x+a.width/2+a.width/2&&e.right>r.x+a.width/2-a.width/2&&(t.update()&&(c={up:!1,down:!1,left:!1,right:!1}),t.draw())})),g.forEach((t=>{const{bounds:e}=t;e.top<r.y+a.height&&e.bottom>r.y&&e.left<r.x+a.width/2+a.width/2&&e.right>r.x+a.width/2-a.width/2&&t.draw()})),d.update(),d.draw(),r.x-=.05*(r.x+a.width/2-d.getPosition().x),r.y-=.05*(r.y+a.height/2-d.getPosition().y)},w=(t,e)=>{switch(t.key){case"ArrowUp":case"w":c.up=e;break;case"ArrowDown":case"s":c.down=e;break;case"ArrowLeft":case"a":c.left=e;break;case"ArrowRight":case"d":c.right=e;break;default:return}t.preventDefault()};document.addEventListener("keydown",(t=>w(t,!0))),document.addEventListener("keyup",(t=>w(t,!1))),requestAnimationFrame(f)})();