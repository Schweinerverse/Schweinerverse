// post-processing: bloom + ACES + grade + grain (falls back to plain render if libs are missing)
let comp=null,gr=null;
if(T.EffectComposer&&T.UnrealBloomPass&&T.ShaderPass&&T.RenderPass){try{
 comp=new T.EffectComposer(ren);comp.addPass(new T.RenderPass(scene,cam));
 comp.addPass(new T.UnrealBloomPass(new T.Vector2(innerWidth,innerHeight),.5,.6,1.2));
 gr=new T.ShaderPass({uniforms:{tDiffuse:{value:null},t:{value:0},dark:{value:0}},
  vertexShader:'varying vec2 v;void main(){v=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
  fragmentShader:'uniform sampler2D tDiffuse;uniform float t,dark;varying vec2 v;float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}vec3 aces(vec3 x){return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.,1.);}void main(){vec2 c=v-.5;float d=dot(c,c);vec3 col=vec3(texture2D(tDiffuse,v+c*d*.014).r,texture2D(tDiffuse,v).g,texture2D(tDiffuse,v-c*d*.014).b);col=aces(col*1.15);float l=dot(col,vec3(.299,.587,.114));col=mix(vec3(l),col,.9-dark*.7);col=mix(col*vec3(.93,.98,1.06),col*vec3(1.05,1.,.94),smoothstep(.25,.9,l)*.5);col*=1.-d*1.2;col*=1.-dark*.35;col+=(h(v*vec2(1920.,1080.)+t)-.5)*.03;gl_FragColor=vec4(col,1.);}'});
 comp.addPass(gr);ren.toneMapping=T.NoToneMapping;
}catch(e){comp=null;gr=null;console.warn('postfx off',e)}}
// ---- saved progress: health, stamina, position, camera, the Frost Knight, and Rimeholt's mood and memories ----
const SAVE_KEY='sitws5-save-v1';let noSave=false;
function snapshot(){const r=P.dead?(P.fd?{x:P.sx,z:P.sz,y:P.sy}:{x:0,z:10,y:H(0,10)}):{x:P.x,z:P.z,y:P.y};
 return{v:1,p:{x:r.x,z:r.z,y:r.y,face:P.dead?PI:P.face,hp:P.dead?100:P.hp,st:P.dead?100:P.st,sx:P.sx,sz:P.sz,sy:P.sy},cam:{yaw,pitch,dist},k:E.hp,town:typeof townSave=='function'?townSave():null}}
function saveGame(){if(!started||noSave)return;try{localStorage.setItem(SAVE_KEY,JSON.stringify(snapshot()))}catch(_){}}
function loadGame(){let s=null;try{s=JSON.parse(localStorage.getItem(SAVE_KEY)||'null')}catch(_){}
 if(!s||s.v!==1||!s.p)return false;const p=s.p;if(![p.x,p.z,p.y,p.hp].every(Number.isFinite)||p.x<-WL||p.x>XMAX||p.z<-ZN||p.z>LIM)return false;
 P.x=p.x;P.z=p.z;P.y=p.y;P.face=Number.isFinite(p.face)?p.face:PI;P.hp=Math.min(100,Math.max(1,p.hp));P.st=Number.isFinite(p.st)?Math.min(100,Math.max(0,p.st)):100;
 if([p.sx,p.sz,p.sy].every(Number.isFinite)){P.sx=p.sx;P.sz=p.sz;P.sy=p.sy}else{P.sx=P.x;P.sz=P.z;P.sy=P.y}
 if(s.cam){if(Number.isFinite(s.cam.yaw))yaw=s.cam.yaw;if(Number.isFinite(s.cam.pitch))pitch=Math.max(-.15,Math.min(1.2,s.cam.pitch));if(Number.isFinite(s.cam.dist))dist=Math.max(3,Math.min(14,s.cam.dist))}
 if(Number.isFinite(s.k))E.hp=Math.max(1,Math.min(E.max,s.k));
 if(s.town&&typeof townLoad=='function')townLoad(s.town);return true}
function eraseSave(btn){if(btn.dataset.arm!=='1'){btn.dataset.arm='1';btn.dataset.t=btn.textContent;btn.textContent='Click again to erase your progress and start over';setTimeout(()=>{btn.dataset.arm='';btn.textContent=btn.dataset.t},4000);return}
 noSave=true;try{localStorage.removeItem(SAVE_KEY)}catch(_){}location.reload()}
if(loadGame()){const tp=$('title').querySelector('p');tp.innerHTML='Eternal Snow &mdash; click to continue';const b=document.createElement('button');b.textContent='Start over';
 b.style.cssText='margin-top:22px;padding:8px 18px;background:rgba(216,181,106,.1);border:1px solid rgba(216,181,106,.5);color:#eef3f8;font:inherit;font-size:14px;cursor:pointer';b.addEventListener('click',e=>{e.stopPropagation();eraseSave(b)});$('title').appendChild(b)}
setInterval(saveGame,4000);addEventListener('pagehide',saveGame);addEventListener('beforeunload',saveGame);document.addEventListener('visibilitychange',()=>{if(document.hidden)saveGame()});
let last=performance.now();
(function loop(now){requestAnimationFrame(loop);let dt=Math.min(.05,(now-last)/1000);last=now;if(stop>0){stop-=dt;dt=0}update(dt);if(comp){gr.uniforms.t.value=(now*.001)%10;gr.uniforms.dark.value=(1-P.hp/100)*.85;comp.render()}else ren.render(scene,cam)})(last);

// teleport menu (testing): press O ten times in a row
const TP=[['Frostfall Basin (start)',0,10],['The Frostpass',700,zc1(700)],['Spirefall Heights',1500,zc1(1500)],['The Dead-End Pass',1700,zc1(1700)],['The Pale Marches (road)',CX,-640,'n'],['Castle Gate',CX,CZ+240,'n'],['Castle Courtyard',CX,CZ+120,'n'],['Great Hall',CX,CZ+5,'n'],['Floor 1 corridor',CX,CZ,'n',PL+28],['Floor 3 corridor',CX,CZ,'n',PL+56],['Roof terrace',CX+24.5,CZ+10,'n',PL+74],['Sundered Reach: causeway',PX(-1500),-1500,'n'],['Sundered Reach: the gate ring',PX(-2380),-2380,'n'],['The Great Forest: trail',-620,FPATH(-620),'w'],['Giant tree: entrance',TX+75,TZ,'w'],['Giant tree: top floor',TX+22,TZ-20,'w',FT+84],['Rimeholt: south gate',TWX,TWZ+170,'n'],['Rimeholt: the square',TWX,TWZ+25,'n'],['Ironhold: south gate',NWX,NWZ+250,'n'],['Ironhold: the parade ground',NWX,NWZ+30,'n'],['The Iron Road',-1200,-1500,'n']];
let tpOpen=false,oN=0,oT=0;const tpEl=document.createElement('div');tpEl.id='tp';
const TPG=[[0,'Frostfall Basin & the Mountains'],[4,'The Pale Marches & the Citadel'],[11,'The Sundered Reach'],[13,'The Great Forest'],[16,'Rimeholt'],[18,'Ironhold & the Iron Road']],tpLabel=i=>i<9?String(i+1):String.fromCharCode(65+i-9);
{const st=document.createElement('style');st.textContent='.tpb{width:min(1180px,94vw);max-height:92vh;overflow:auto;box-sizing:border-box;padding:28px 34px;min-width:0}.tpc{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:6px 30px;text-align:left;align-items:start}.tpc h3{margin:14px 0 6px;font-weight:400;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid rgba(216,181,106,.35);padding-bottom:5px}.tpb button{margin:5px 0;font-size:16px}.tpb button.tpn{width:auto;margin-top:16px;font-size:13px;opacity:.8}';document.head.appendChild(st)}
tpEl.innerHTML='<div class="tpb"><h2>Teleport <small>(testing)</small></h2><div class="tpc">'+TPG.map((g,gi)=>{const end=gi+1<TPG.length?TPG[gi+1][0]:TP.length;let h='<section><h3>'+g[1]+'</h3>';for(let i=g[0];i<end;i++)h+='<button data-i="'+i+'"><b>'+tpLabel(i)+'</b>'+TP[i][0]+'</button>';return h+'</section>'}).join('')+'</div><p>Press 1&ndash;9 or A&ndash;L, or click &middot; Esc to close</p><button class="tpn" id="tpnew">Erase saved progress &amp; start over</button></div>';document.body.appendChild(tpEl);
tpEl.addEventListener('click',e=>{const b=e.target.closest('button');if(b){if(b.id=='tpnew')eraseSave(b);else tele(+b.dataset.i)}else if(e.target===tpEl)closeTp()});
function openTp(){tpOpen=true;for(const k in keys)keys[k]=false;tpEl.style.display='flex';try{document.exitPointerLock()}catch(_){}}
function closeTp(){tpOpen=false;tpEl.style.display='none';if(started)try{ren.domElement.requestPointerLock()}catch(_){}}
function tele(i){const t=TP[i];P.x=t[1];P.z=t[2];P.y=t[4]!==undefined?t[4]:H(t[1],t[2]);P.vy=0;P.atk=null;P.roll=null;P.q=null;P.lock=false;const nd=t[3]=='n',wd=t[3]=='w';yaw=wd?PI/2:nd?0:i?-PI/2:0;P.face=wd?-PI/2:nd?PI:i?PI/2:PI;pitch=.35;closeTp();if(started)msg(areaN.toUpperCase(),2000)}
// input
addEventListener('keydown',e=>{
 if(e.code=='KeyO'){if(!e.repeat){const n=performance.now();oN=n-oT<1500?oN+1:1;oT=n;if(oN>=10){oN=0;tpOpen?closeTp():openTp()}}}else if(!e.repeat)oN=0;
 if(tpOpen){if(/^Digit[1-9]$/.test(e.code))tele(+e.code[5]-1);else{const m=/^Key([A-L])$/.exec(e.code);if(m&&m[1].charCodeAt(0)-56<TP.length)tele(m[1].charCodeAt(0)-56)}if(e.code=='Escape')closeTp();e.preventDefault();return}
 if(P.dead){if(e.code=='KeyR')respawn();return}keys[e.code]=true;
 if(e.code=='KeyR'&&RVN(P.x,P.z)>.02){P.x=P.sx;P.z=P.sz;P.y=P.sy;P.vy=0;P.air=false;msg('BACK ON SOLID GROUND',1800)}
 if(e.code=='KeyE'&&typeof npcTalk=='function')npcTalk();
 if(e.code=='Space'){e.preventDefault();const mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),mz=(keys.KeyW?1:0)-(keys.KeyS?1:0);
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let dx=fx*mz-fz*mx,dz=fz*mz+fx*mx;const l=Math.hypot(dx,dz);dodge(l?dx/l:0,l?dz/l:0,l)}
 if(e.code=='Tab'||e.code=='KeyQ'){e.preventDefault();toggleLock()}if(e.code=='KeyJ')attack('L');if(e.code=='KeyK')attack('H')});
addEventListener('keyup',e=>keys[e.code]=false);
addEventListener('mousemove',e=>{if(document.pointerLockElement){if(!P.lock)yaw-=e.movementX*.003;pitch=Math.max(-.15,Math.min(1.2,pitch+e.movementY*.003))}});
addEventListener('wheel',e=>{dist=Math.max(3,Math.min(14,dist+e.deltaY*.005))});
addEventListener('contextmenu',e=>e.preventDefault());
ren.domElement.addEventListener('mousedown',e=>{if(!started||tpOpen)return;if(e.button==1){e.preventDefault();toggleLock();return}attack(e.button==2?'H':'L')});
$('title').addEventListener('click',()=>{started=true;$('title').style.display='none';msg(areaN.toUpperCase(),3200);try{ren.domElement.requestPointerLock()}catch(_){}});
addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();ren.setSize(innerWidth,innerHeight);if(comp)comp.setSize(innerWidth,innerHeight)});
