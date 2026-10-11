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
let last=performance.now();
(function loop(now){requestAnimationFrame(loop);let dt=Math.min(.05,(now-last)/1000);last=now;if(stop>0){stop-=dt;dt=0}update(dt);if(comp){gr.uniforms.t.value=(now*.001)%10;gr.uniforms.dark.value=(1-P.hp/100)*.85;comp.render()}else ren.render(scene,cam)})(last);

// teleport menu (testing): press O ten times in a row
const TP=[['Frostfall Basin (start)',0,10],['The Frostpass',700,zc1(700)],['Spirefall Heights',1500,zc1(1500)],['The Dead-End Pass',1700,zc1(1700)],['The Pale Marches (road)',CX,-640,'n'],['Castle Gate',CX,CZ+240,'n'],['Castle Courtyard',CX,CZ+120,'n'],['Great Hall',CX,CZ+5,'n'],['Floor 1 corridor',CX,CZ,'n',PL+28],['Floor 3 corridor',CX,CZ,'n',PL+56],['Roof terrace',CX+24.5,CZ+10,'n',PL+74],['Sundered Reach: causeway',PX(-1500),-1500,'n'],['Sundered Reach: the gate ring',PX(-2380),-2380,'n']];
let tpOpen=false,oN=0,oT=0;const tpEl=document.createElement('div');tpEl.id='tp';
tpEl.innerHTML='<div class="tpb"><h2>Teleport <small>(testing)</small></h2>'+TP.map((t,i)=>'<button data-i="'+i+'"><b>'+(i+1)+'</b>'+t[0]+'</button>').join('')+'<p>Press 1-9 or click &middot; Esc to close</p></div>';document.body.appendChild(tpEl);
tpEl.addEventListener('click',e=>{const b=e.target.closest('button');if(b)tele(+b.dataset.i);else if(e.target===tpEl)closeTp()});
function openTp(){tpOpen=true;for(const k in keys)keys[k]=false;tpEl.style.display='flex';try{document.exitPointerLock()}catch(_){}}
function closeTp(){tpOpen=false;tpEl.style.display='none';if(started)try{ren.domElement.requestPointerLock()}catch(_){}}
function tele(i){const t=TP[i];P.x=t[1];P.z=t[2];P.y=t[4]!==undefined?t[4]:H(t[1],t[2]);P.vy=0;P.atk=null;P.roll=null;P.q=null;P.lock=false;const nd=t[3]=='n';yaw=nd?0:i?-PI/2:0;P.face=nd?PI:i?PI/2:PI;pitch=.35;closeTp();if(started)msg(areaN.toUpperCase(),2000)}
// input
addEventListener('keydown',e=>{
 if(e.code=='KeyO'){if(!e.repeat){const n=performance.now();oN=n-oT<1500?oN+1:1;oT=n;if(oN>=10){oN=0;tpOpen?closeTp():openTp()}}}else if(!e.repeat)oN=0;
 if(tpOpen){if(/^Digit[1-9]$/.test(e.code))tele(+e.code[5]-1);if(e.code=='Escape')closeTp();e.preventDefault();return}
 if(P.dead){if(e.code=='KeyR')respawn();return}keys[e.code]=true;
 if(e.code=='KeyR'&&RVN(P.x,P.z)>.02){P.x=P.sx;P.z=P.sz;P.y=P.sy;P.vy=0;P.air=false;msg('BACK ON SOLID GROUND',1800)}
 if(e.code=='Space'){e.preventDefault();const mx=(keys.KeyD?1:0)-(keys.KeyA?1:0),mz=(keys.KeyW?1:0)-(keys.KeyS?1:0);
  const fx=-Math.sin(yaw),fz=-Math.cos(yaw);let dx=fx*mz-fz*mx,dz=fz*mz+fx*mx;const l=Math.hypot(dx,dz);dodge(l?dx/l:0,l?dz/l:0,l)}
 if(e.code=='Tab'||e.code=='KeyQ'){e.preventDefault();toggleLock()}if(e.code=='KeyJ')attack('L');if(e.code=='KeyK')attack('H')});
addEventListener('keyup',e=>keys[e.code]=false);
addEventListener('mousemove',e=>{if(document.pointerLockElement){if(!P.lock)yaw-=e.movementX*.003;pitch=Math.max(-.15,Math.min(1.2,pitch+e.movementY*.003))}});
addEventListener('wheel',e=>{dist=Math.max(3,Math.min(14,dist+e.deltaY*.005))});
addEventListener('contextmenu',e=>e.preventDefault());
ren.domElement.addEventListener('mousedown',e=>{if(!started||tpOpen)return;if(e.button==1){e.preventDefault();toggleLock();return}attack(e.button==2?'H':'L')});
$('title').addEventListener('click',()=>{started=true;$('title').style.display='none';msg('FROSTFALL BASIN',3200);try{ren.domElement.requestPointerLock()}catch(_){}});
addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();ren.setSize(innerWidth,innerHeight);if(comp)comp.setSize(innerWidth,innerHeight)});
