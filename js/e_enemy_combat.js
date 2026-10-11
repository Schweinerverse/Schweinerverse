// state
const P={x:0,z:10,face:PI,hp:100,st:100,stT:0,roll:null,atk:null,combo:0,cT:0,q:null,cyc:0,lock:false,dead:false,y:0,vy:0};
let yaw=0,pitch=.35,dist=7,started=false,hits=0,dmg=0;const keys={};
// Swings are keyframed as blade direction (azimuth/elevation) + hands + body twist; arms follow the hands (see hold()).
// pose = [azimuth, elevation, reach, torso twist, hip twist, lean, crouch, hand height]
const GUARD=[0,1,.45,0,0,0,0,.55];
const LIGHT=[
 {dur:.8,w:[.36,.52],lun:3,dm:26,k:[[0,GUARD],[.36,[-1,1.2,.3,-.6,-.35,-.05,.04,1.05]],[.52,[1,-.15,.5,.7,.45,.12,.06,.4]],[.66,[1.35,-.4,.5,.85,.55,.14,.06,.35]],[1,GUARD]]},
 {dur:.8,w:[.36,.52],lun:3,dm:26,k:[[0,GUARD],[.36,[1.15,.1,.35,.75,.5,0,.05,.55]],[.52,[-1.05,.6,.5,-.7,-.45,.1,.05,.8]],[.66,[-1.4,.75,.5,-.85,-.55,.12,.05,.85]],[1,GUARD]]},
 {dur:1,w:[.44,.58],lun:4.5,dm:38,k:[[0,GUARD],[.44,[0,1.75,.15,0,0,-.22,.1,1.3]],[.58,[0,-.35,.5,0,0,.45,.1,.35]],[.72,[0,-.6,.5,0,0,.55,.1,.3]],[1,GUARD]]}];
const HEAVY={dur:1.6,w:[.46,.6],lun:6.5,dm:75,k:[[0,GUARD],[.46,[-1.6,.35,.3,-1.2,-.9,-.1,.14,.7]],[.6,[1.6,.05,.5,1.3,1,.12,.1,.5]],[.78,[2.1,-.1,.5,1.5,1.15,.14,.1,.5]],[1,GUARD]]};
function swingPose(k,t){let i=0;while(i<k.length-2&&t>=k[i+1][0])i++;
 const [t0,p0]=k[i],[t1,p1]=k[i+1];let u=Math.min(1,Math.max(0,(t-t0)/(t1-t0)));
 u=i==1?Math.pow(u,1.8):i==2?1-Math.pow(1-u,2):ease(u); // wind-up eases in, strike accelerates, follow-through decelerates
 return p0.map((v,j)=>v+(p1[j]-v)*u)}
const gB=new T.Vector3(),gG=new T.Vector3(),gD=new T.Vector3(),DN=new T.Vector3(0,-1,0),UPV=new T.Vector3(0,1,0),shL=new T.Vector3(.42,.75,0),shR=new T.Vector3(-.42,.75,0),hL=new T.Vector3(),hR=new T.Vector3();
function hold(G,B){for(const [arm,sh,h] of [[armL,shL,hL],[armR,shR,hR]]){gD.copy(G).sub(sh).normalize();arm.quaternion.setFromUnitVectors(DN,gD);h.copy(sh).addScaledVector(gD,.7)}
 swordSlot.position.copy(hL).add(hR).multiplyScalar(.5);swordSlot.quaternion.setFromUnitVectors(UPV,B)}
function applyPose(p){const az=p[0],el=p[1];gB.set(Math.sin(az)*Math.cos(el),Math.sin(el),Math.cos(az)*Math.cos(el));gG.set(Math.sin(az)*.12,p[7],p[2]);
 hold(gG,gB);torsoG.rotation.set(p[5],p[3],0);rig.rotation.y=p[4]}
const REST=[-.75,0,0,0],ease=x=>x*x*(3-2*x);
const cost=t=>t=='H'?38:20;
function spend(n){if(P.st<=0)return false;P.st=Math.max(0,P.st-n);P.stT=.8;return true}
function attack(t){if(!started||P.roll||P.dead)return;
 if(P.atk){if(P.atk.t>.4)P.q=t;return}
 if(!spend(cost(t)))return;
 const d=t=='H'?HEAVY:LIGHT[P.combo%3];if(t=='H')P.combo=0;else P.combo++;
 if(P.lock)P.face=Math.atan2(E.x-P.x,E.z-P.z);P.atk={d,t:0,hit:false};P.cT=0}
function dodge(dx,dz,l){if(!started||P.roll||P.atk||P.st<=0||P.dead)return;spend(25);
 if(!l){dx=Math.sin(P.face);dz=Math.cos(P.face)}P.face=Math.atan2(dx,dz);P.roll={t:0,dx,dz}}
const lerpA=(a,b,t)=>a+(((b-a+3*PI)%(2*PI))-PI)*t;

function update(dt){
 const mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),mz=(keys.KeyW?1:0)-(keys.KeyS?1:0);
 if(!P.lock){if(keys.ArrowLeft)yaw+=dt*2;if(keys.ArrowRight)yaw-=dt*2}if(keys.ArrowUp)pitch=Math.min(1.2,pitch+dt*1.5);if(keys.ArrowDown)pitch=Math.max(-.15,pitch-dt*1.5);
 const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let dx=fx*mz-fz*mx,dz=fz*mz+fx*mx;const l=Math.hypot(dx,dz);if(l){dx/=l;dz/=l}
 let speed=0,sprint=false,rigX=0;enemyUpdate(dt);lockUpdate(dt);treeUpdate();edgeCheck();compassUpdate();areaUpdate();
 if(P.roll){const r=P.roll;r.t+=dt/.55;speed=11*(1-r.t*.55);dx=r.dx;dz=r.dz;if(r.t>=1)P.roll=null;else rigX=r.t*2*PI}
 else if(P.atk){const a=P.atk,d=a.d;a.t+=dt/d.dur;
  if(a.t>=d.w[0]&&a.t<d.w[1]){speed=d.lun;dx=Math.sin(P.face);dz=Math.cos(P.face)}else{dx=dz=0}
  if(!a.hit&&a.t>=d.w[0]+(d.w[1]-d.w[0])*.7){a.hit=true;
   const ox=dummy.position.x-P.x,oz=dummy.position.z-P.z,dd=Math.hypot(ox,oz);
   if(dd<3.8&&(ox*Math.sin(P.face)+oz*Math.cos(P.face))/dd>.3){wob=1;hits++;dmg+=d.dm}hitEnemy(d.dm)}
  if(a.t>=1){P.atk=null;if(P.q){const q=P.q;P.q=null;attack(q)}}}
 else{
  if(l){sprint=keys.ShiftLeft&&P.st>0;speed=sprint?8.5:4.6;if(!P.lock)P.face=lerpA(P.face,Math.atan2(dx,dz),Math.min(1,dt*12));if(sprint)P.st=Math.max(0,P.st-16*dt),P.stT=.8}
  else dx=dz=0}
 {const nx=Math.max(-LIM,Math.min(XMAX,P.x+dx*speed*dt)),nz=Math.max(-ZN,Math.min(LIM,P.z+dz*speed*dt)),h0=H(P.x,P.z),ok=(a,b)=>{const st=Math.hypot(a-P.x,b-P.z);return st<1e-5||(H(a,b)-h0)/st<1.15};
  if(ok(nx,nz)){P.x=nx;P.z=nz}else if(ok(nx,P.z))P.x=nx;else if(ok(P.x,nz))P.z=nz}
 collide(P,.55);{const g=groundY(P);if(g>=P.y-.35){P.y=g;P.vy=0}else{P.vy-=45*dt;P.y=Math.max(g,P.y+P.vy*dt)}} // floors, stairs and falling
 if(!P.atk&&!P.roll){P.cT+=dt;if(P.cT>.6)P.combo=0}
 if(!sprint&&!P.roll&&!P.atk){P.stT-=dt;if(P.stT<=0)P.st=Math.min(100,P.st+28*dt)}
 // pose
 P.cyc+=speed*dt*(P.roll?0:1.4);const s=Math.sin(P.cyc),amp=speed>0&&!P.roll&&!P.atk?.8:0;
 legL.rotation.x=s*amp;legR.rotation.x=-s*amp;rig.rotation.x=0;
 let pse=[s*amp*.08,1+Math.sin(P.cyc*2)*amp*.04,.45,0,0,0,0,.55];
 if(P.atk)pse=swingPose(P.atk.d.k,P.atk.t);
 applyPose(pse);rig.position.y=.9-pse[6]*.3;
 if(P.atk){const a=P.atk,d=a.d,t=a.t,k=t<d.w[1]?ease(t/d.w[1]):1-ease((t-d.w[1])/(1-d.w[1]));legL.rotation.x=-.45*k;legR.rotation.x=.35*k;rig.position.y-=.09*k}
 if(P.roll){applyPose([0,2.1,.3,0,0,.35,0,.55]);rig.rotation.x=rigX;rig.position.y=.65;legL.rotation.x=legR.rotation.x=-1.3}
 if(P.dead){rig.rotation.x=-1.45;rig.position.y=.25}cape.rotation.x=.15+Math.min(speed,9)*.06+Math.sin(P.cyc*.5)*.05;const ct=performance.now()*.004;cape.children.forEach((c,i)=>{c.rotation.x=Math.sin(ct*(1+speed*.1)+i*.9)*.07*(1+speed*.2)});
 const gy=P.y;root.position.set(P.x,gy,P.z);root.rotation.y=P.face;trailUpdate(!!(P.atk&&P.atk.t>=P.atk.d.w[0]*.9&&P.atk.t<P.atk.d.k[3][0]));
 wob=Math.max(0,wob-dt*2.2);dummy.rotation.z=Math.sin(performance.now()*.03)*wob*.28;
 // camera
 const tx=P.x,ty=gy+1.7,tz=P.z;
 const cx=tx+Math.sin(yaw)*Math.cos(pitch)*dist,cz=tz+Math.cos(yaw)*Math.cos(pitch)*dist,cy=Math.max(ty+Math.sin(pitch)*dist,H(cx,cz)+.8);
 const cf=camFree(tx,ty,tz,cx,cy,cz);cam.position.set(tx+(cx-tx)*cf+(R()-.5)*shake,ty+(cy-ty)*cf+(R()-.5)*shake,tz+(cz-tz)*cf);cam.lookAt(tx,ty,tz);sky.position.copy(cam.position);shake=Math.max(0,shake-dt*2);
 sun.position.set(P.x+SUN.x*70,gy+SUN.y*70,P.z+SUN.z*70);sun.target.position.set(P.x,gy,P.z);
 // snow
 const zone=sm(-440,-600,P.z)*(1-sm(380,520,P.x)),tt=performance.now()*.001,wind=(2.5+2*Math.sin(tt*.35)+Math.sin(tt*.9))*(1-.4*zone);uT.value=tt;{const inK=Math.abs(P.x-CX)<41&&P.z-CZ>-46&&P.z-CZ<36&&P.y<PL+72;sg.setDrawRange(0,inK?0:Math.floor(N*(1-.7*zone)))} // lighter snowfall in the marches
 scene.fog.density=(.0135+.005*Math.sin(tt*.21)+.003*Math.sin(tt*.6))*(1-.35*zone);
 for(let i=0;i<N;i++){const j=i*3;sp[j]+=dt*wind*(.6+sv[i]*.2);sp[j+2]+=dt*wind*.35;sp[j+1]-=sv[i]*dt;
  if(sp[j+1]<gy-3)sp[j+1]+=55;if(sp[j+1]>gy+52)sp[j+1]-=55;
  if(sp[j]-P.x>50)sp[j]-=100;if(sp[j]-P.x<-50)sp[j]+=100;if(sp[j+2]-P.z>50)sp[j+2]-=100;if(sp[j+2]-P.z<-50)sp[j+2]+=100}
 sg.attributes.position.needsUpdate=true;
 $('hp').firstChild.style.width=P.hp+'%';$('st').firstChild.style.width=P.st+'%';
 $('hits').textContent=hits?`Training dummy: ${hits} hits, ${dmg} damage`:'';
}

