 {const n=46,im=new T.InstancedMesh(new T.CylinderGeometry(1,1.1,.6,7),new T.MeshStandardMaterial({color:0xeaf4f8,roughness:.7}),n),d=new T.Object3D();for(let i=0;i<n;i++){const s=2+Math.random()*6;d.position.set(rnd(-520,520),SEA+.1,CZ_+rnd(390,820));d.scale.set(s,1,s*rnd(.7,1.3));d.rotation.y=Math.random()*6;d.updateMatrix();im.setMatrixAt(i,d.matrix)}im.frustumCulled=false;seaG.add(im)}
 flush();
 // ---- the people of Brightwater: a Governor, his Marshal, the City Watch, and some forty-seven townsfolk ----
 const NPCS=[],npcEl=document.createElement('div');npcEl.style.cssText='position:fixed;left:50%;bottom:17%;transform:translateX(-50%);padding:10px 18px;background:rgba(14,20,30,.82);border:1px solid rgba(216,181,106,.5);color:#eef3f8;font:16px Georgia,serif;max-width:560px;text-align:center;pointer-events:none;z-index:4;display:none';document.body.appendChild(npcEl);
 let level=0,alertT=0,talkT=0,cur=null,cmd=null,lastCmd;
 const LVN=['FRIENDLY','ALERT','AGGRESSIVE'],LVC=['#8fcf9a','#e0b44f','#d9503f'],tEl=document.createElement('div');tEl.style.cssText='font-size:12px;letter-spacing:.18em;margin-top:6px;display:none;text-shadow:0 1px 4px #000';$('hud').appendChild(tEl);
 const setLevel=(l,sub)=>{if(l==level)return;level=l;if(l==1)alertT=300;if(Math.hypot(P.x-CX_,P.z-CZ_)<700)msg(l==1?'BRIGHTWATER IS ON ALERT':'BRIGHTWATER HAS CALMED',2600,sub||(l==1?'The Watch has given up the chase':'The city forgives, but does not forget'))};
 const ST={g:{hp:200,dmg:18,wind:.6,spd:4.2,rec:1},h:{hp:240,dmg:20,wind:.65,spd:4.2,rec:1},m:{hp:340,dmg:26,wind:.8,spd:4,rec:1.1},L:{hp:360,dmg:26,wind:.85,spd:3.9,rec:1.2}};
 const W=(x,z)=>[CX_+x,CZ_+z];
 // three gates (north, east, west); anyone crossing the walls is routed through the nearest one, and the palace is entered by its west door
 const GATES=[{x:0,z:-215,ox:0,oz:-1},{x:330,z:0,ox:1,oz:0},{x:-330,z:0,ox:-1,oz:0}].map(g=>({x:g.x+CX_,z:g.z+CZ_,ox:g.ox,oz:g.oz})),ins=(x,z)=>Math.abs(x-CX_)<322&&z>CZ_-209;
 const aim=(n,tx,tz)=>{if(ins(n.x,n.z)!=ins(tx,tz)){const nin=ins(n.x,n.z);let g=null,bd=1e9;for(const q of GATES){const d=Math.hypot(n.x-q.x,n.z-q.z)+Math.hypot(tx-q.x,tz-q.z);if(d<bd){bd=d;g=q}}
   const rx_=n.x-g.x,rz_=n.z-g.z,pa=rx_*g.ox+rz_*g.oz,lat=Math.abs(-rx_*g.oz+rz_*g.ox),inn=[g.x-g.ox*22,g.z-g.oz*22],out=[g.x+g.ox*22,g.z+g.oz*22],t=nin?((lat>6||pa<-24)?inn:out):((lat>6||pa>24)?out:inn);tx=t[0];tz=t[1]}
  else if(tx>CX_+60&&tz<CZ_-95&&n.x<CX_+42){if(n.x<CX_+30||Math.abs(n.z-(CZ_-146))>6){tx=CX_+30;tz=CZ_-146}else{tx=CX_+56;tz=CZ_-146}}
  else if(n.x>CX_+46&&n.z<CZ_-92&&n.z>CZ_-200&&(tx<CX_+40||tz>CZ_-90)){if(n.x>CX_+58&&Math.abs(n.z-(CZ_-146))>3){tx=CX_+60;tz=CZ_-146}else{tx=CX_+30;tz=CZ_-146}}
  return Math.atan2(tx-n.x,tz-n.z)+(n.sideT>0?n.side*1.2:0)};
 const GC={},gb=(w,h,d)=>GC[w+','+h+','+d]||(GC[w+','+h+','+d]=new T.BoxGeometry(w,h,d)),SPG=new T.SphereGeometry(1,10,8),CNG=new T.ConeGeometry(.26,.42,8);
 function mk(d){const guard=d.k=='g',rk=d.rank,g=new T.Group(),mats=[],Mm=(c,r,m)=>{const x=new T.MeshStandardMaterial({color:c,roughness:r??.9,metalness:m||0});mats.push(x);return x};
  const part=(geo,m,x,y,z,p,sx,sy,sz)=>{const o=new T.Mesh(geo,m);o.position.set(x,y,z);if(sx)o.scale.set(sx,sy,sz);o.castShadow=true;(p||g).add(o);return o};
  const skin=Mm(0xcdb4a0),steel=Mm(0x7a8590,.45,.65),dark=Mm(0x2b3138,.6,.5),tab=Mm({g:0x2f5a7a,h:0xb59a45,m:0x7a1f1f,L:0xb59a45}[rk]||0x2f5a7a,.9),cl=Mm(d.c||0x6b5a46),dk=Mm(d.c2||0x4a3f33);
  const legs=[-1,1].map(s=>{const l=new T.Group();l.position.set(s*.17,.95,0);g.add(l);part(gb(.28,.95,.3),guard?dark:dk,0,-.47,0,l);return l});
  part(gb(.7,.85,.42),guard?steel:cl,0,1.35,0);part(SPG,skin,0,1.98,0,null,.2,.22,.21);
  const arms=[-1,1].map(s=>{const a=new T.Group();a.position.set(s*.44,1.68,0);g.add(a);part(gb(.22,.78,.24),guard?steel:cl,0,-.39,0,a);return a});
  let weapon=null;
  if(guard){part(gb(.46,.78,.04),tab,0,1.3,.23);for(const s of[-1,1])part(SPG,steel,s*.48,1.74,0,null,.27,.17,.29);part(SPG,steel,0,2.06,0,null,.25,.21,.26);part(gb(.06,rk=='g'?.22:.36,.34),tab,0,rk=='g'?2.28:2.34,0);
   part(gb(.08,.95,.62),dark,-.22,-.55,.12,arms[0]);part(gb(.09,.4,.3),tab,-.27,-.5,.12,arms[0]);
   weapon=new T.Group();weapon.position.set(0,-.7,.12);arms[1].add(weapon);part(new T.CylinderGeometry(.04,.04,2.8,6),dark,0,.95,0,weapon);part(gb(.5,.34,.06),steel,.2,2.2,0,weapon);weapon.rotation.x=-.2;
   if(rk=='L'||rk=='m')part(gb(.8,1.5,.06),Mm(rk=='L'?0x7a1f1f:0x2f5a7a),0,1.15,-.27);if(rk=='L')part(new T.CylinderGeometry(.24,.26,.12,10),Mm(0xd8b350,.3,.7),0,2.3,0)}
  else{if(d.hat=='cone')part(CNG,dk,0,2.16,0);else if(d.hat=='cap')part(gb(.5,.14,.4),dk,0,2.12,0);else if(d.hat=='hood')part(SPG,dk,0,2.0,-.04,null,.26,.25,.27);if(d.apron)part(gb(.5,.7,.04),Mm(0xe8e0d0),0,1.1,.23)}
  return{g,legs,arms,mats,weapon}}
 // ---- who lives here ----
 const D=[];
 const GLF=[['Welcome to Brightwater. Mind the ice on the quay.','The Governor keeps the peace here. Help him keep it.'],['Trade is welcome. Trouble is not.','Dock fees are posted at the harbour office.'],['Keep to the avenues after dark, traveller.','The sea is kind to those who respect the Watch.'],['Brightwater has not been robbed in twenty years. Let us keep it so.','Ships from three seas, and the Watch meets every one.']],
  GLA=[['We know what you did. I will be watching you.','Keep your hands where I can see them.'],['One more blow and the whole Watch answers.','Walk slowly, stranger.'],['The Governor has been told about you.','Behave, and this may pass.']];
 const G=(n,x,z,f,o)=>D.push(Object.assign({n,k:'g',rank:'g',x,z,f:f||0,l:GLF[D.length%4],la:GLA[D.length%3]},o||{}));
 G('Governor Aldous Vane',152,-145,PI/2,{rank:'L',l:['Welcome to Brightwater, traveller. The sea has been generous to us.','Trade and order, friend. Break neither.','My Marshal keeps the Watch; I keep the city. Between us, nothing is lost.'],la:['I hear you have been making trouble in my city.','Be careful, stranger. My patience is not the sea; it has a floor.']});
 G('Marshal Isolde Crane',24,-125,PI,{rank:'m',l:['The Watch answers to me, and I answer to the Governor.','Brightwater is the safest harbour on the coast. I intend to keep it so.'],la:['You are the one my patrols spoke of. Stay where I can see you.','One more blow and the Governor will hear of a very short visit.']});
 for(const q of[[-12,-205,PI],[12,-205,PI],[318,-10,PI/2],[318,10,PI/2],[-318,-10,-PI/2],[-318,10,-PI/2]])G('Gate guard',q[0],q[1],q[2]);
 for(const q of[[-200,-214,PI,0],[200,-214,PI,0],[329,-110,PI/2,0],[-329,110,-PI/2,0]])G('Wall sentry',q[0],q[1],q[2],{dy0:10});
 for(const p of[[[6,-180],[6,-62]],[[-6,62],[-6,196]],[[-60,5],[-300,5]],[[60,-5],[300,-5]]])G('City Watch',p[0][0],p[0][1],0,{patrol:p});
 for(const q of[[-16,222],[16,222],[112,226]])G('Harbour watch',q[0],q[1],0);
 G('Barracks guard',-240,-165,PI/2);G('Barracks guard',-240,-130,PI/2);
 for(const q of[[140,-157],[140,-133],[150,-168],[150,-122]])G('Honor guard',q[0],q[1],PI/2,{rank:'h'});
 for(let i=0;i<2;i++)for(let j=0;j<2;j++)G('City patrol',(j?4:-4),-190+i*14,0,{party:i,tour:[],off:0,go:0,lw:0});
 const ROLE={vendor:{c:[0x8a5a3a,0x4d6a52,0x6a4a7a,0x7a6a3a],hat:'cap',apron:1,l:['Fresh off the morning boats, friend. Best prices on the coast.','Silver for salt cod, copper for kelp. The sea provides.','Brightwater pays its taxes, and eats well for it.'],la:['I sell to anyone with coin, whoever you are.','Buy something or move along. The Watch is staring.']},
  shop:{c:[0x5a4a6a,0x6a5a4a,0x4a5a6a],hat:'cap',apron:1,l:['Welcome. Everything is fair-priced under the Governor.','We stock goods from three seas. Take your time.'],la:['My shop is open, but I would rather you left.','The Watch has been asking about you.']},
  dock:{c:[0x5a5048,0x4a5a6a,0x6a5a3a],hat:'cap',l:['Heave! Another cargo of furs for the southern ships.','Mind the ice on the planks, traveller.','Ten ships in port, and every one needs unloading.'],la:['Not talking while the Watch is near.','Keep to the quay, stranger.']},
  sail:{c:[0x2f4a6a,0x3a3a46],hat:'cap',l:['Three months at sea, and the ice never once relented.','This harbour is the only one worth sailing for.'],la:['I only just arrived. I want no trouble.','Heard there was a scuffle in town.']},
  fish:{c:[0x4a5a4a,0x6a5a3a],hat:'hood',l:['The cod run is thin this winter, but the nets hold.','Ice floes drift past the breakwater by dawn.'],la:['Quiet now. The Watch listens.','I mind my nets and nothing more.']},
  noble:{c:[0x7a2a4a,0x2a4a7a,0x6a4a8a,0x2a6a5a],hat:'none',l:['Brightwater is the jewel of the coast. Naturally, I live here.','The Governor is a fine man, if a little fond of ledgers.'],la:['Disgraceful. In my city?','I shall be writing to the Governor about you.']},
  walk:{c:[0x6a5a4a,0x4a6a6a,0x7a5a5a],hat:'hood',l:['A fine cold day for a walk by the sea.','The avenues are swept every morning. The Governor insists.'],la:['Oh dear. Best keep clear of you.','Is it true you attacked someone?']},
  priest:{c:[0xe8e2d0],hat:'none',l:['The Tides take all of us in time. Be at peace.','The cathedral bells ring for every ship that comes home.'],la:['Violence has no place in this house of the sea.','Pray for calm, my child, if you can.']}};
 const V=(role,n,x,z,f,o)=>{const r=ROLE[role];D.push(Object.assign({n,k:'c',x,z,f:f||0,c:pick(r.c),c2:0x3f3a36,hat:r.hat,apron:r.apron,l:r.l,la:r.la},o||{}))};
 const STALLS_=[[-34,-22],[-34,0],[-34,22],[34,-22],[34,0],[34,22],[-16,-38],[16,-38],[-16,38],[16,38]];
 ['Marta the fishmonger','Oswin the baker','Tilda the weaver','Garrick the cheesemonger','Livia the spice seller','Bran the butcher','Nella the florist','Hob the cobbler','Edda the candlemaker','Per the fruiterer'].forEach((nm,i)=>V('vendor',nm,STALLS_[i][0],STALLS_[i][1]-.8,PI/2*(i<3?1:i<6?-1:0)+(i>5?(i<8?0:PI):0)));
 ['Cedric the chandler','Ilse the apothecary','Mord the tailor','Rhea the jeweller','Tomas the bookseller','Anselm the locksmith'].forEach((nm,i)=>V('shop',nm,(i%2?-16:16),70+i*20,i%2?PI/2:-PI/2));
 [['Dockhand Brock',-290,189],['Dockhand Ulf',-255,190],['Dockhand Yrsa',-225,190],['Dockhand Karl',160,190],['Stevedore Olaf',190,190],['Rigger Jon',-110,247],['Rigger Tove',110,247],['Stevedore Hild',-9,247]].forEach(q=>V('dock',q[0],q[1],q[2],PI));
 V('dock','Dockhand Sven',-100,236,0,{patrol:[[-100,236],[100,236]]});V('dock','Dockhand Mira',100,238,0,{patrol:[[100,238],[-100,238]]});
 [['Sailor Bjorn',2,285],['Sailor Leif',-3,320],['Mate Astrid',-110,300],['Captain Roald',110,310]].forEach(q=>V('sail',q[0],q[1],q[2],PI/2));
 [['Fisher Ragn',-120,213],['Fisher Anya',-100,213],['Fisher Dag',-80,213],['Fisher Solveig',-66,212]].forEach(q=>V('fish',q[0],q[1],q[2],0));
 [['Lady Verena',20,-150,PI],['Lord Casimir',27,-132,PI],['Dame Odette',-8,-30,PI/2],['Ser Aldric',8,30,-PI/2]].forEach(q=>V('noble',q[0],q[1],q[2],q[3]));
 [['Townsman Pell',[[-5,-180],[-5,-62]]],['Townswoman Greta',[[5,62],[5,196]]],['Clerk Fenn',[[60,6],[300,6]]],['Scribe Maelis',[[-60,-6],[-300,-6]]],['Child Wren',[[-44,-44],[44,-44],[44,44],[-44,44]]],['Pilgrim Joss',[[-150,214],[150,214]]]].forEach(q=>V('walk',q[0],q[1][0][0],q[1][0][1],0,{patrol:q[1]}));
 V('priest','Prelate Ambrose',-40,-160,PI/2);V('priest','Acolyte Cael',-45,-150,PI/2);V('priest','Acolyte Rin',-35,-170,PI/2);
 for(const d of D){const m=mk(d),s=ST[d.rank||'g'],n=Object.assign({},d,{g:m.g,legs:m.legs,arms:m.arms,mats:m.mats,weapon:m.weapon,x:CX_+d.x,z:CZ_+d.z,f:d.f||0,hx:CX_+d.x,hz:CZ_+d.z,hf:d.f||0,hp:d.k=='g'?s.hp:40,st:s,sc:d.rank=='m'?1.06:d.rank=='L'?1.1:1,
   state:d.tour?'rest':d.patrol?'patrol':'idle',pat:(d.patrol||[]).map(p=>[CX_+p[0],CZ_+p[1]]),pi:0,wait:0,cd:0,flash:0,li:0,ph:Math.random()*6,dead:0,atk:null,fleeT:0,chase:0,rest:0,grudge:false,mv:0,tw:0,side:1,sideT:0,dy:d.dy0||0,halt:0});NPCS.push(n);grp.add(m.g)}
 // ---- chain of command: the Governor leads, the Marshal is his replacement; once both are gone nobody leads ----
 const tourG=NPCS.filter(n=>n.party!==undefined),PARTIES=[0,1].map(i=>({i,m:tourG.filter(n=>n.party==i),ph:'rest',wait:[10,70][i],dest:-1,last:-1,t:0})),caps=NPCS.filter(n=>n.rank=='L'||n.rank=='m'),commander=()=>caps.find(n=>!n.dead)||null,bub={t:0,who:null,txt:''};
 const ROAD=[[CX_+10,CZ_-240],[CX_+25,620],[CX_,450],[CX_,300]];
 const DST=[{name:'the South Road',out:1,p:ROAD.slice(0,2)},{name:'the road to the basin',out:1,p:ROAD},{name:'the Frostfall basin',out:1,p:ROAD.concat([[CX_,150],[CX_,10]])},
