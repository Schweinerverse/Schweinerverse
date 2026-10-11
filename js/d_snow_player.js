// snowfall
const N=14000,sp=new Float32Array(N*3),sv=new Float32Array(N);
for(let i=0;i<N;i++){sp[i*3]=(R()-.5)*100;sp[i*3+1]=R()*55;sp[i*3+2]=(R()-.5)*100;sv[i]=2+R()*3}
const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));
const snow=new T.Points(sg,new T.PointsMaterial({color:0xffffff,size:.26,transparent:true,opacity:.9,fog:false}));snow.frustumCulled=false;scene.add(snow);

// player rig (faces +z)
const M=c=>new T.MeshStandardMaterial({color:c,roughness:.8});
const box=(w,h,d,c,x,y,z,p)=>{const m=new T.Mesh(new T.BoxGeometry(w,h,d),M(c));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};
const root=new T.Group(),rig=new T.Group(),torsoG=new T.Group();root.add(rig);rig.add(torsoG);scene.add(root);
const limb=(x,y,len,c,p)=>{const g=new T.Group();g.position.set(x,y,0);box(.24,len,.26,c,0,-len/2,0,g);p.add(g);return g};
// Tarnished-style wanderer: hooded, worn armor, frost-rimed, tattered cloak
const mt=(c,r,m)=>new T.MeshStandardMaterial({color:c,roughness:r??.9,metalness:m||0});
const MC=mt(0x2c333d),MA=mt(0x5b636e,.55,.55),MD=mt(0x2a2420,.95),ML=mt(0x3d3129,.9),MF=mt(0xd9d3c7,1),MS=mt(0xeaf2fa,1),MK=mt(0x38414e,1),MG=mt(0x9a8450,.5,.6);MK.side=T.DoubleSide;
const BX=(w,h,d)=>new T.BoxGeometry(w,h,d),SP=new T.SphereGeometry(1,12,9),CY=(a,b,h)=>new T.CylinderGeometry(a,b,h,10);
const pc=(g,m,x,y,z,p,sx,sy,sz,rx,rz)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);if(sx)o.scale.set(sx,sy,sz);if(rx)o.rotation.x=rx;if(rz)o.rotation.z=rz;o.castShadow=true;p.add(o);return o};
const leg=x=>{const g=new T.Group();g.position.set(x,0,0);rig.add(g);
 pc(BX(.26,.46,.28),MC,0,-.23,0,g);pc(BX(.21,.13,.07),MA,0,-.47,.14,g);pc(CY(.17,.15,.12),MF,0,-.52,0,g);
 pc(BX(.26,.36,.28),ML,0,-.72,0,g);pc(BX(.28,.04,.3),MD,0,-.64,0,g);pc(BX(.28,.04,.3),MD,0,-.78,0,g);
 pc(BX(.24,.1,.16),MD,0,-.86,.09,g);pc(BX(.2,.03,.2),MS,0,-.575,0,g);return g};
const legL=leg(.16),legR=leg(-.16);
pc(BX(.56,.7,.32),MC,0,.4,0,torsoG);pc(BX(.62,.4,.38),MA,0,.53,0,torsoG);
pc(BX(.64,.05,.4),MD,0,.33,0,torsoG);pc(BX(.64,.05,.4),MD,0,.73,0,torsoG);
pc(BX(.6,.09,.36),ML,0,.14,0,torsoG);pc(BX(.1,.08,.02),MG,0,.14,.185,torsoG);
[[-.1,.5],[.09,.38]].forEach(([x,l])=>pc(BX(.14,l,.03),MK,x,.1-l/2,.2,torsoG));
[-1,1].forEach(s=>{pc(BX(.22,.3,.3),MA,s*.29,-.02,0,torsoG,0,0,0,0,s*.12);pc(BX(.14,.12,.1),ML,s*.3,.08,.17,torsoG)});
pc(BX(.8,.14,.38),MK,0,.8,-.02,torsoG);pc(BX(.72,.03,.32),MS,0,.88,-.02,torsoG);
pc(new T.TorusGeometry(.25,.09,8,14),MF,0,.86,.02,torsoG,1,1,1,PI/2);
const hood=new T.Group();hood.position.set(0,1.04,0);torsoG.add(hood);
pc(SP,MK,0,0,-.01,hood,.25,.27,.27);pc(new T.ConeGeometry(.16,.3,8),MK,0,.1,-.22,hood,1,1,1,-1.3);
pc(SP,mt(0x06080b),0,-.01,.13,hood,.15,.15,.15);pc(new T.TorusGeometry(.16,.05,8,14),MK,0,-.01,.15,hood);
[-1,1].forEach(s=>pc(BX(.045,.02,.02),new T.MeshBasicMaterial({color:0x9fdcff}),s*.055,.02,.268,hood));
pc(BX(.38,.42,.14),MK,0,-.24,-.2,hood,1,1,1,.25);pc(SP,MS,0,.25,-.03,hood,.17,.05,.17);
const arm=x=>{const g=new T.Group(),s=Math.sign(x);g.position.set(x,.75,0);torsoG.add(g);
 pc(BX(.2,.36,.22),MC,0,-.18,0,g);pc(BX(.23,.3,.25),MA,0,-.5,0,g);pc(BX(.25,.04,.27),MD,0,-.4,0,g);pc(BX(.18,.12,.2),MD,0,-.68,0,g);
 pc(SP,MA,s*.03,.04,0,g,.2,.11,.22);pc(SP,MA,s*.03,-.06,0,g,.22,.09,.24);pc(SP,MS,s*.03,.13,0,g,.15,.03,.17);return g};
const armL=arm(.42),armR=arm(-.42);
const cape=new T.Group();cape.position.set(0,.8,-.2);torsoG.add(cape);
for(let i=0;i<7;i++){const L=[.95,.7,.88,.62,.9,.72,.98][i],g=new T.Group();g.position.x=(i-3)*.105;g.rotation.z=(i-3)*.02;pc(BX(.11,L,.03),MK,0,-L/2,0,g);cape.add(g)}
// sword slot: replace the contents of this group with your GLB model later
const swordSlot=new T.Group();torsoG.add(swordSlot);
{const MB=mt(0xc9d2dc,.25,.9);pc(BX(.11,1.25,.025),MB,0,1.125,0,swordSlot);pc(BX(.03,1.1,.03),mt(0x8894a2,.3,.9),0,1.1,0,swordSlot);pc(new T.ConeGeometry(.055,.16,4),MB,0,1.83,0,swordSlot,1,1,.25);
 pc(BX(.46,.06,.1),MG,0,.5,0,swordSlot);pc(BX(.055,.62,.055),MD,0,.17,0,swordSlot);pc(SP,MG,0,-.17,0,swordSlot,.07,.07,.07)}
// sword trail (additive ribbon, glows through bloom)
const TN=14,tv=new Float32Array(TN*6),tcol=new Float32Array(TN*6),tgm=new T.BufferGeometry(),tix=[],hist=[],tipP=new T.Vector3(),baseP=new T.Vector3();
for(let i=0;i<TN;i++){const f=Math.pow(1-i/(TN-1),1.6);for(let k=0;k<2;k++){tcol.set([.7*f,.88*f,1*f],i*6+k*3)}if(i<TN-1){const a=i*2;tix.push(a,a+1,a+2,a+1,a+3,a+2)}}
tgm.setAttribute('position',new T.BufferAttribute(tv,3));tgm.setAttribute('color',new T.BufferAttribute(tcol,3));tgm.setIndex(tix);
const trail=new T.Mesh(tgm,new T.MeshBasicMaterial({vertexColors:true,side:T.DoubleSide,blending:T.AdditiveBlending,transparent:true,depthWrite:false,fog:false}));trail.frustumCulled=false;scene.add(trail);
function trailUpdate(on){root.updateMatrixWorld(true);
 if(on){tipP.set(0,1.75,0);baseP.set(0,.8,0);swordSlot.localToWorld(tipP);swordSlot.localToWorld(baseP);hist.unshift([tipP.x,tipP.y,tipP.z,baseP.x,baseP.y,baseP.z])}else hist.pop();
 while(hist.length>TN)hist.pop();
 for(let i=0;i<TN;i++)tv.set(hist[Math.min(i,hist.length-1)]||[0,-999,0,0,-999,0],i*6);
 tgm.attributes.position.needsUpdate=true}
window.attachSword=obj=>{while(swordSlot.children.length)swordSlot.remove(swordSlot.children[0]);swordSlot.add(obj)};

// training dummy
const dummy=new T.Group(),dx0=7,dz0=-6;dummy.position.set(dx0,H(dx0,dz0),dz0);scene.add(dummy);
box(.3,2.2,.3,0x6b4f36,0,1.1,0,dummy);box(1.4,.2,.2,0x6b4f36,0,1.6,0,dummy);box(.5,.5,.5,0xc9b28a,0,2.4,0,dummy);
let wob=0,stop=0,shake=0;
// enemy: Frost Knight
const E={g:new T.Group(),x:-16,z:-24,face:0,hp:150,max:150,s:'idle',t:0,cd:1,atk:null,hit:false,dead:0,flash:0,last:'',mats:[]};
E.g.rotation.order='YXZ';scene.add(E.g);
box(.26,.9,.3,0x232b38,-.18,.45,0,E.g);box(.26,.9,.3,0x232b38,.18,.45,0,E.g);
const eT=new T.Group();eT.position.y=.9;E.g.add(eT);
box(.75,.95,.42,0x2f3b4d,0,.5,0,eT);box(.36,.36,.34,0x9fb4c8,0,1.2,0,eT);box(.1,.35,.1,0xdde6ee,.22,1.5,0,eT);box(.1,.35,.1,0xdde6ee,-.22,1.5,0,eT);box(.95,.16,.46,0x445468,0,.92,0,eT);
limb(.5,.85,.8,0x2f3b4d,eT);const eA=limb(-.5,.85,.8,0x2f3b4d,eT);
const eW=new T.Group();eW.position.set(0,-.75,.05);eW.rotation.x=1.4;eA.add(eW);
box(.14,1.5,.05,0x7f93a8,0,.85,0,eW);box(.4,.08,.1,0x445468,0,.1,0,eW);
E.g.scale.setScalar(1.15);E.g.traverse(o=>{if(o.isMesh)E.mats.push(o.material)});
const glow=(c,k)=>E.mats.forEach(m=>{m.emissive.setHex(c);m.emissiveIntensity=k});
const EA={slash:{wind:.75,strike:.2,rec:.8,dmg:14,rng:3.4,A:[-1.5,-1,-.9],B:[-1.5,.9,.8],col:0xff3b2a},
 smash:{wind:1.2,strike:.22,rec:1.2,dmg:32,rng:3.8,A:[-3,0,-.2],B:[-.4,0,.3],col:0xffa41f}};
const v3=new T.Vector3();
function scr(x,y,z,el,show){v3.set(x,y,z).project(cam);const ok=show&&v3.z<1&&Math.abs(v3.x)<1.1&&Math.abs(v3.y)<1.1;el.style.display=ok?'block':'none';if(ok){el.style.left=(v3.x*.5+.5)*innerWidth+'px';el.style.top=(-v3.y*.5+.5)*innerHeight+'px'}}
let msgT;function msg(t,ms,sub){const m=$('msg');m.innerHTML=t+(sub?'<div style="font-size:16px;letter-spacing:.05em;margin-top:8px">'+sub+'</div>':'');m.style.color=t=='YOU DIED'?'#b3392f':'#d8b56a';m.style.opacity=1;clearTimeout(msgT);if(ms)msgT=setTimeout(()=>m.style.opacity=0,ms)}
function respawnEnemy(){E.hp=E.max;E.dead=0;E.s='idle';E.x=-16;E.z=-24;E.g.rotation.x=0;E.atk=null;E.cd=1}
function respawn(){P.dead=false;P.hp=100;P.st=100;if(P.fd){P.x=P.sx;P.z=P.sz;P.y=P.sy}else{P.x=0;P.z=10;P.y=H(0,10)}P.fd=false;P.air=false;P.vy=0;P.face=PI;P.atk=null;P.roll=null;P.q=null;respawnEnemy();$('msg').style.opacity=0}
function fallHurt(d){const n=(d-22)*1.6;if(P.hp-n<=0)P.fd=true;hurt(n);if(!P.dead)msg('A HARD LANDING',2600,'Press R to climb back to solid ground')}
function hurt(n){const r=P.roll;if(P.dead||(r&&r.t>.08&&r.t<.7))return;
 P.hp-=n;P.atk=null;P.q=null;$('hurt').style.opacity=.9;shake=.5;
 if(P.hp<=0){P.hp=0;P.dead=true;P.roll=null;P.lock=false;for(const k in keys)keys[k]=false;msg('YOU DIED',0,'Press R to rise again')}}
function hitEnemy(dm){if(E.dead>0)return;const ox=E.x-P.x,oz=E.z-P.z,dd=Math.hypot(ox,oz);
 if(dd<3.9&&(ox*Math.sin(P.face)+oz*Math.cos(P.face))/dd>.3){E.hp-=dm;E.flash=.15;stop=dm>50?.13:.07;shake=dm>50?.5:.25;if(E.s=='idle')E.s='chase';
  if(E.s=='atk'&&E.atk.n=='slash'&&E.t<E.atk.wind){E.s='chase';E.cd=.7;E.atk=null}
  if(E.hp<=0){E.hp=0;E.dead=10;P.lock=false;msg('ENEMY FELLED',2800)}}}
function toggleLock(){if(P.lock){P.lock=false;return}if(E.dead>0||P.dead)return;if(Math.hypot(E.x-P.x,E.z-P.z)<40)P.lock=true}
function lockUpdate(dt){
 if(P.lock&&(E.dead>0||Math.hypot(E.x-P.x,E.z-P.z)>55))P.lock=false;
 if(P.lock){yaw=lerpA(yaw,Math.atan2(P.x-E.x,P.z-E.z),Math.min(1,dt*6));
  if(!P.roll&&!P.atk)P.face=lerpA(P.face,Math.atan2(E.x-P.x,E.z-P.z),Math.min(1,dt*12))}
 scr(E.x,H(E.x,E.z)+1.8,E.z,$('lock'),P.lock);
 const h=$('hurt');h.style.opacity=Math.max(0,(+h.style.opacity||0)-dt*2)}
function enemyUpdate(dt){
 const gy=H(E.x,E.z),bar=$('ebar');
 if(E.dead>0){E.dead-=dt;E.g.rotation.x=Math.min(1.5,E.g.rotation.x+dt*3);glow(0,0);elight.intensity=0;bar.style.display='none';
  if(E.dead<=0)respawnEnemy();E.g.position.set(E.x,gy,E.z);return}
 const dx=P.x-E.x,dz=P.z-E.z,d=Math.hypot(dx,dz),want=Math.atan2(dx,dz);
 if(E.s=='idle'&&d<26&&!P.dead)E.s='chase';
 E.cd-=dt;E.flash=Math.max(0,E.flash-dt);
 const ep=(f,g,u)=>f.map((v,i)=>v+(g[i]-v)*u),RS=[-.2,-.12,0];
 let pose=RS,gc=0,gk=0;
 if(E.s=='chase'&&!P.dead){E.face=lerpA(E.face,want,Math.min(1,dt*5));
  if(d>2.9){E.x+=Math.sin(E.face)*3.8*dt;E.z+=Math.cos(E.face)*3.8*dt}
  else if(E.cd<=0){const n=E.last!='smash'&&Math.random()<.4?'smash':'slash';E.last=n;E.atk=EA[n];E.atk.n=n;E.t=0;E.hit=false;E.s='atk'}}
 else if(E.s=='atk'){const a=E.atk,T0=a.wind,T1=T0+a.strike,T2=T1+a.rec;E.t+=dt;
  if(E.t<T0){const u=ease(E.t/T0);E.face=lerpA(E.face,want,Math.min(1,dt*2.5));pose=ep(RS,a.A,u);gc=a.col;gk=u*(.7+.3*Math.sin(E.t*22))}
  else if(E.t<T1){const u=(E.t-T0)/a.strike;pose=ep(a.A,a.B,u);gc=a.col;gk=1.2;E.x+=Math.sin(E.face)*5*dt;E.z+=Math.cos(E.face)*5*dt;
   if(!E.hit&&u>.4){E.hit=true;if(d<a.rng&&Math.abs(((want-E.face+3*PI)%(2*PI))-PI)<1)hurt(a.dmg)}}
  else if(E.t<T2){pose=ep(a.B,RS,ease((E.t-T1)/a.rec))}
  else{E.s='chase';E.cd=.5+Math.random()*.6}}
 if(P.dead&&E.s!='idle'){E.s='chase'}
 if(E.flash>0){gc=0xffffff;gk=.6}
 glow(gc,gk);elight.color.setHex(gc||0xff3b2a);elight.intensity=gk*7;elight.position.set(E.x,H(E.x,E.z)+2,E.z);eA.rotation.set(pose[0],0,pose[1]);eT.rotation.y=pose[2];
 E.x=Math.max(-LIM,Math.min(XMAX,E.x));E.z=Math.max(-ZN,Math.min(LIM,E.z));collide(E,1);
 E.g.position.set(E.x,H(E.x,E.z),E.z);E.g.rotation.y=E.face;
 bar.querySelector('i').style.width=E.hp/E.max*100+'%';scr(E.x,H(E.x,E.z)+3.1,E.z,bar,d<45)}


