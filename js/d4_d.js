  {name:'a round of the harbour front',p:[W(6,-150),W(6,-60),W(44,-56),W(44,56),W(6,60),W(6,150),W(6,214),W(-130,214),W(130,214),W(6,214)]},{name:'the east gate and back',p:[W(6,-60),W(44,-44),W(56,6),W(300,6)]},{name:'the west gate and back',p:[W(-6,-60),W(-44,-44),W(-56,-6),W(-300,-6)]}];
 const toTour=(d,cut)=>{const r=(d.out?[W(0,-240)]:[]).concat(cut?d.p.slice(0,cut):d.p);return r.concat(r.slice(0,-1).reverse())};
 const LOIT=[W(0,-170),W(8,-100),W(8,60),W(0,100),W(-20,140),W(20,140),W(-60,30),W(60,-30),W(100,-60),W(-100,-60),W(40,100),W(-40,100),W(12,200),W(-12,200),W(0,-30),W(30,60)];
 const back=n=>n.k=='g'&&!cmd&&n.free?'wander':'return',mad=n=>{if(n.state!='hostile')n.pre=n.state;n.state='hostile';n.atk=null;n.chase=0};
 const stand=n=>{n.atk=null;n.chase=0;if(n.tour){if(n.pre=='tour'){n.state='tour';let b=0,bd=1e9;n.tour.forEach((p,i)=>{const e=Math.hypot(p[0]-n.x,p[1]-n.z);if(e<bd){bd=e;b=i}});n.ti=b}else{n.state='rest';n.go=0}}else n.state=back(n)};
 const say=(c,t)=>{bub.t=9;bub.who=c;bub.txt='<b style="color:#d8b56a">'+c.n+'</b><br>'+t};
 const briefRoute=()=>{const c=cmd;return[[CX_+8,CZ_-185],c.x>CX_+60?[c.x-3,c.z]:[c.x+3,c.z+2.5]]};
 const pickDest=p=>{const busy=PARTIES.map(q=>q.ph=='out'?q.dest:-1),c=DST.map((_,i)=>i).filter(i=>!busy.includes(i)&&i!=p.last);return c[Math.floor(Math.random()*c.length)]};
 const scatter=init=>{for(const n of NPCS)if(n.k=='g'&&n.rank=='g'&&!n.tour){n.free=Math.random()<.45;if(n.free&&(n.state=='idle'||n.state=='patrol'||n.state=='return')){n.state='wander';n.wp=null;n.ww=0}}
  for(const n of tourG){n.lw=init?5+Math.random()*50:15+Math.random()*80;if(n.state=='brief'||n.state=='await')n.state='rest'}for(const p of PARTIES)if(p.ph=='brief')p.ph='rest'};
 const cmdStep=dt=>{cmd=commander();bub.t-=dt;const near=Math.hypot(P.x-CX_,P.z-CZ_)<700;
  if(lastCmd!==cmd){
   if(lastCmd===undefined){if(!cmd)scatter(true)}
   else if(cmd){if(near)msg(cmd.n.toUpperCase()+' TAKES COMMAND',2800,'The Watch rallies to its new leader');const v=caps[0];cmd.hx=v.hx;cmd.hz=v.hz;cmd.hf=v.hf;if(cmd.state=='idle')cmd.state='return';
    for(const p of PARTIES)if(p.ph=='brief'){p.ph='rest';p.wait=6+Math.random()*10;for(const n of p.m)if(n.state=='brief'||n.state=='await')n.state='rest'}}
   else{if(near)msg('BRIGHTWATER IS LEADERLESS',3000,'The Watch falls into disorder');scatter(false)}
   lastCmd=cmd}
  const home=n=>Math.hypot(n.x-n.hx,n.z-n.hz)<4;
  for(const p of PARTIES){const al=p.m.filter(n=>!n.dead);if(!al.length)continue;
   if(p.ph=='out'){if(al.every(n=>n.state=='rest'&&home(n))){p.ph='rest';p.last=p.dest;p.dest=-1;p.wait=60+Math.random()*60}}
   else if(!cmd)p.ph='rest';
   else if(p.ph=='rest'){if(al.every(n=>n.state=='rest'&&home(n)&&!(n.go>0))){p.wait-=dt;if(p.wait<=0){p.ph='brief';p.t=0;for(const n of al){n.state='brief';n.route=briefRoute();n.bi=0;n.go=0}}}}
   else if(p.ph=='brief'){p.t+=dt;const act=al.filter(n=>n.state=='brief'||n.state=='await');
    if(!act.length){p.ph='rest';p.wait=40+Math.random()*40}
    else if(act.every(n=>n.state=='await')||p.t>90){const di=pickDest(p),r=toTour(DST[di]);act.forEach((n,k)=>{n.tour=r;n.ti=0;n.off=(k-(act.length-1)/2)*2.6;n.state='await';n.go=3.5+k*.9});p.dest=di;p.ph='out';say(cmd,'Patrol: to '+DST[di].name+'. Keep to the roads, report anything that moves, and be back before dark.')}}}
  if(!cmd)for(const n of tourG){if(n.dead||n.state!='rest'||n.go>0||!home(n))continue;n.lw-=dt;
   if(n.lw<=0){const sq=[n];for(const o of tourG)if(o!==n&&!o.dead&&o.state=='rest'&&!(o.go>0)&&home(o)&&sq.length<4&&Math.random()<.5)sq.push(o);
    const d=DST[Math.floor(Math.random()*DST.length)],r=toTour(d,1+Math.floor(Math.random()*d.p.length));sq.forEach((s,k)=>{s.tour=r;s.ti=0;s.off=(Math.random()-.5)*6;s.go=.6+k*1.1;s.lw=60+Math.random()*120})}}};
 const lines=n=>n.grudge?(n.k=='g'?['You again. I remember your face. Come closer and I finish it.','Brightwater does not forgive a blow to its Watch.']:['Get away from me!','You struck me. I will not forget it.']):level==2?(n.k=='g'?['Surrender!']:['Please, leave us be!','Guards! GUARDS!']):(!cmd&&n.k=='g')?['The Governor and the Marshal are gone. Who gives the orders now?','Nobody commands the Watch. Do not make this worse.']:level==1?n.la:n.l;
 const hit=dm=>{let struck=null;for(const n of NPCS){if(n.dead||n.dy>6)continue;const ox=n.x-P.x,oz=n.z-P.z,dd=Math.hypot(ox,oz);if(dd<3.9&&(ox*Math.sin(P.face)+oz*Math.cos(P.face))/dd>.3){struck=n;n.hp-=dm;n.flash=.2;n.grudge=true;stop=Math.max(stop,dm>50?.13:.07);shake=Math.max(shake,dm>50?.5:.25);
   if(n.k=='g')mad(n);else{n.state='flee';n.fleeT=7}
   if(n.hp<=0){n.dead=.01;n.state='dead'}}}
  if(struck){const inside=ins(struck.x,struck.z),was=level;alertT=300;for(const q of NPCS)if(q.k=='g'&&!q.dead&&q.state!='hostile'&&((inside&&ins(q.x,q.z))||Math.hypot(q.x-struck.x,q.z-struck.z)<150)){mad(q);q.dy=Math.min(q.dy,6)}
   if(inside){level=2;if(was<2)msg('THE WATCH TURNS ON YOU',2400,was?'Brightwater was already watching you':'You struck first')}else msg('THE PATROL ATTACKS',2000);if(typeof saveGame=='function')saveGame()}};
 const talk=()=>{if(!cur||cur.dead)return;talkT=6;const L=lines(cur);npcEl.innerHTML='<b style="color:#d8b56a">'+cur.n+'</b><br>'+L[cur.li++%L.length];npcEl.style.display='block'};
 const save=()=>({lv:level,at:alertT,n:NPCS.map(n=>[n.hp,n.dead?1:0,n.grudge?1:0,n.dead?+n.x.toFixed(1):0,n.dead?+n.z.toFixed(1):0,n.dead?+n.f.toFixed(2):0])});
 const load=s=>{if(!s||!Array.isArray(s.n)||s.n.length!=NPCS.length)return;level=s.lv==2?1:(s.lv|0);alertT=s.lv==2?300:+s.at||0;if(level==1&&alertT<=0)alertT=300;s.n.forEach((a,i)=>{const n=NPCS[i];n.hp=a[0];n.grudge=!!a[2];if(a[1]){n.dead=1;n.state='dead';n.x=a[3];n.z=a[4];n.f=a[5]}})};
 const seaStep=dt=>{const td=Math.hypot(P.x-CX_,P.z-CZ_);grp.visible=td<800;seaG.visible=P.z>300&&td<2200;if(!seaG.visible)return;const t=performance.now()*.001;wt.offset.x+=dt*.004;wt.offset.y+=dt*.0025;for(const s of ships){s.g.position.y=s.y0+Math.sin(t*.9+s.ph)*.22;s.g.rotation.z=Math.sin(t*.7+s.ph)*.02}};
 const yAt=(x,z)=>{const h=H(x,z);if(z<CZ_+240)return h;const s=surfY(x,z,3);return s>h?s:h};
 const upd=dt=>{cmdStep(dt);seaStep(dt);const td=Math.hypot(P.x-CX_,P.z-CZ_),inTown=td<420&&P.z>CZ_-230,far=td>900;let near=null,nd=4.5;
  if(level==2&&!NPCS.some(n=>n.k=='g'&&!n.dead&&n.state=='hostile'))setLevel(1);else if(level==1){alertT-=dt;if(alertT<=0)setLevel(0)}
  const fols=NPCS.filter(n=>n.state=='follow'); // on alert, two guards shadow you inside the walls
  if(level==1&&inTown&&!P.dead){while(fols.length<2){let b=null,bd=1e9;for(const n of NPCS)if(n.k=='g'&&n.rank=='g'&&!n.dead&&!n.tour&&n.dy<6&&(n.state=='patrol'||n.state=='idle'||n.state=='return')&&!fols.includes(n)){const d=Math.hypot(P.x-n.x,P.z-n.z);if(d<bd){bd=d;b=n}}if(!b)break;b.state='follow';b.atk=null;fols.push(b)}}
  else for(const f of fols)f.state=back(f);
  for(const n of NPCS){if(far&&!n.dead&&(n.state=='idle'||n.state=='patrol'))continue;
   const dx=P.x-n.x,dz=P.z-n.z,d=Math.hypot(dx,dz),g=n.g,st=n.st;n.flash=Math.max(0,n.flash-dt);n.cd-=dt;n.rest-=dt;g.visible=d<300||n.state=='hostile';
   if(n.dead){n.dead=Math.min(1,n.dead+dt*1.4);g.rotation.x=-n.dead*PI/2*.98;g.position.set(n.x,yAt(n.x,n.z)+.15*n.dead+n.dy,n.z);for(const m of n.mats){m.emissive.setHex(0);m.emissiveIntensity=0}continue}
   let sp=0,aw=0,arm=0;
   if(P.dead&&(n.state=='hostile'||n.state=='follow'))stand(n);
   if(n.k=='g'&&n.grudge&&n.rest<=0&&d<28&&!P.dead&&n.state!='hostile'&&n.state!='flee'&&n.dy<6){mad(n);if(level==0)setLevel(1,'A guard remembers you')}
   if(n.state=='hostile'){if(d<4)n.chase=0;else n.chase+=dt;
    if(n.chase>25){n.rest=8;stand(n)} // chased long enough: give up and walk back to the city
    else{const want=Math.atan2(dx,dz),W_=st.wind;
     if(n.atk){const a=n.atk;a.t+=dt;n.f=lerpA(n.f,want,Math.min(1,dt*(a.t<W_?3:.5)));
      if(a.t<W_){arm=-1.6*(a.t/W_);aw=a.t/W_}else if(a.t<W_+.18){arm=-1.6+.5*((a.t-W_)/.18);aw=1;if(!a.hit&&a.t>W_+.04){a.hit=true;if(d<3.9&&Math.abs(((want-n.f+3*PI)%(2*PI))-PI)<1.1)hurt(st.dmg)}}
      else if(a.t<W_+.85){arm=-1.1*(1-(a.t-W_-.18)/.67)}else{n.atk=null;n.cd=st.rec}}
     else{n.f=lerpA(n.f,d>8?aim(n,P.x,P.z):want,Math.min(1,dt*6));if(d>2.8){sp=st.spd}else if(n.cd<=0)n.atk={t:0,hit:false}}}}
   else if(n.state=='follow'){n.f=lerpA(n.f,d>7?aim(n,P.x,P.z):Math.atan2(dx,dz),Math.min(1,dt*5));if(d>9)sp=5.8;else if(d>6.2)sp=4.7;else if(d<3.8)sp=-1.6}
   else if(n.state=='flee'){n.fleeT-=dt;n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=5;if(n.fleeT<=0)n.state='return'}
   else if(n.state=='return'){const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz);if(hd<1.2){n.state=n.pat.length?'patrol':'idle'}else{n.f=lerpA(n.f,aim(n,n.hx,n.hz),Math.min(1,dt*6));sp=4.2}}
   else if(n.state=='patrol'){const p=n.pat[n.pi],hx=p[0]-n.x,hz=p[1]-n.z,hd=Math.hypot(hx,hz);if(n.wait>0)n.wait-=dt;else if(hd<1){n.pi=(n.pi+1)%n.pat.length;n.wait=n.k=='g'?1.4:3}else{n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=n.k=='g'?1.8:1.4}}
   else if(n.state=='rest'){const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz); // waiting between patrols
    if(hd>2){n.f=lerpA(n.f,aim(n,n.hx,n.hz),Math.min(1,dt*5));sp=3.2}else n.f=lerpA(n.f,d<30?Math.atan2(dx,dz):n.hf,Math.min(1,dt*2));
    if(n.go>0){n.go-=dt;if(n.go<=0){n.state='tour';n.ti=0}}}
   else if(n.state=='brief'){const w=n.route[n.bi];if(!w)n.state='await';else{const hx=w[0]-n.x,hz=w[1]-n.z;if(Math.hypot(hx,hz)<2.5){n.bi++;if(n.bi>=n.route.length)n.state='await'}else{n.f=lerpA(n.f,aim(n,w[0],w[1]),Math.min(1,dt*5));sp=4.2}}} // reporting to the leader for orders
   else if(n.state=='await'){n.f=lerpA(n.f,cmd?Math.atan2(cmd.x-n.x,cmd.z-n.z):n.hf,Math.min(1,dt*3));if(n.go>0){n.go-=dt;if(n.go<=0){n.state='tour';n.ti=0}}}
   else if(n.state=='wander'){if(!n.wp||Math.hypot(n.wp[0]-n.x,n.wp[1]-n.z)<1.5){if(n.ww>0)n.ww-=dt;else{n.wp=pick(LOIT);n.ww=4+Math.random()*18}}else{n.f=lerpA(n.f,aim(n,n.wp[0],n.wp[1]),Math.min(1,dt*4));sp=1.5}} // no post to keep, no one to answer to
   else if(n.state=='tour'){const p=n.tour[n.ti],tx=p[0]+n.off,tz=p[1],hd=Math.hypot(tx-n.x,tz-n.z); // march the route: out through the gate, around, and back
    if(d<16&&!P.dead)n.halt+=dt;else n.halt=0;
    if(d<16&&!P.dead&&n.halt<10)n.f=lerpA(n.f,Math.atan2(dx,dz),Math.min(1,dt*4)); // halt and eye any traveller they meet
    else if(hd<5){n.ti++;if(n.ti>=n.tour.length){n.state='rest';n.go=0;n.lw=20+Math.random()*80}}
    else{n.f=lerpA(n.f,aim(n,tx,tz),Math.min(1,dt*4));sp=3.2}}
   else{const hx=n.hx-n.x,hz=n.hz-n.z,hd=Math.hypot(hx,hz),scared=n.k!='g'&&(n.grudge||level==2)&&d<(level==2?14:12);
    if(scared){n.f=lerpA(n.f,Math.atan2(-dx,-dz),Math.min(1,dt*8));sp=3.4}
    else if(hd>1.5){n.f=lerpA(n.f,Math.atan2(hx,hz),Math.min(1,dt*5));sp=2.2}
    else n.f=lerpA(n.f,d<(n.k=='g'?30:9)?Math.atan2(dx,dz):n.hf,Math.min(1,dt*2))}
   n.dy+=((n.dy0&&n.state=='idle'?n.dy0:0)-n.dy)*Math.min(1,dt*3);
   if(sp!=0){const ox=n.x,oz=n.z;n.x+=Math.sin(n.f)*sp*dt;n.z+=Math.cos(n.f)*sp*dt;if(n.dy<6)fcollide(n,.5);n.mv+=Math.hypot(n.x-ox,n.z-oz);n.tw+=Math.abs(sp)*dt;if(n.tw>.6){if(n.mv<n.tw*.3){n.side=Math.random()<.5?-1:1;n.sideT=1.2}n.mv=n.tw=0}}else if(n.dy<6)fcollide(n,.5);n.sideT-=dt;
   if(d<.9&&!P.dead&&n.dy<6){const k=.9-d;P.x+=dx/(d||1)*k;P.z+=dz/(d||1)*k}
   n.ph+=Math.abs(sp)*dt*2.4;const sw=sp!=0?Math.sin(n.ph)*.7:0;n.legs[0].rotation.x=sw;n.legs[1].rotation.x=-sw;
   n.arms[0].rotation.x=-sw*.6;n.arms[1].rotation.x=n.atk?arm:sw*.6;
   g.position.set(n.x,yAt(n.x,n.z)+n.dy,n.z);g.rotation.y=n.f;g.scale.set(n.sc,n.sc*(1+Math.sin(performance.now()*.002+n.ph)*.008),n.sc);
   const f=n.flash>0;for(const m of n.mats){m.emissive.setHex(f?0xffffff:0xff3b2a);m.emissiveIntensity=f?.5:aw*.4}
   if(n.state!='hostile'&&n.state!='flee'&&n.dy<6&&d<nd){near=n;nd=d}}
  if(td<600){tEl.style.display='block';tEl.style.color=LVC[level];tEl.textContent='BRIGHTWATER \u00b7 '+LVN[level]+(cmd?'':' \u00b7 NO LEADER')}else tEl.style.display='none';
  cur=near;if(near){if(talkT>0)talkT-=dt;else{npcEl.innerHTML='<span style="color:#d8b56a">E</span> &mdash; speak with '+near.n}npcEl.style.display='block'}else if(bub.t>0&&bub.who&&Math.hypot(P.x-bub.who.x,P.z-bub.who.z)<22){npcEl.innerHTML=bub.txt;npcEl.style.display='block';talkT=0}else{npcEl.style.display='none';talkT=0}};
 {const u0=window.npcUpdate,h0=window.hitNPCs,t0=window.npcTalk,s0=window.townSave,l0=window.townLoad;
  window.npcUpdate=dt=>{u0(dt);upd(dt)};window.hitNPCs=dm=>{h0(dm);hit(dm)};window.npcTalk=()=>{t0();talk()};
  window.townSave=()=>{const o=s0();o.b=save();return o};window.townLoad=s=>{l0(s);if(s&&s.b)load(s.b)}}}

