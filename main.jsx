import React,{useEffect,useState} from "react";
import {createRoot} from "react-dom/client";
import {ArrowUpRight,Menu,X,Lock,Upload,LogOut,ImagePlus} from "lucide-react";
import {supabase,supabaseConfigured} from "./supabase";
import "./styles.css";

const defaultEvents=[
{id:"1",title:"Ganesh Chaturthi",date:"19 September 2025",image:""},
{id:"2",title:"Aarti & Pujan",date:"20 September 2025",image:""},
{id:"3",title:"Visarjan Sohala",date:"28 September 2025",image:""}
];
const defaultGallery=[
["Morya Moments",""],["Celebration",""],["Togetherness",""],["Devotion",""],
["Community",""],["Aarti",""],["Visarjan",""],["Memories",""]
];
const defaultMembers=[
["Rahul Patil","President"],["Siddhesh More","Vice President"],["Omkar Jadhav","Secretary"],["Rohit Kadam","Treasurer"],
["Akash Shelar","Event Manager"],["Prathamesh Jagtap","Public Relations"],["Sagar Bhosale","Decoration Head"],["Aditya Shinde","Media Head"]
];

function go(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
function Placeholder({src,label,portrait=false}){
 return src?<img className="media" src={src} alt={label}/>:<div className={portrait?"media placeholder portrait":"media placeholder"}><span>ॐ</span><b>{label}</b></div>
}

function App(){
 const [open,setOpen]=useState(false),[admin,setAdmin]=useState(false),[session,setSession]=useState(null);
 const [events,setEvents]=useState(defaultEvents),[gallery,setGallery]=useState(defaultGallery.map((x,i)=>({id:i,title:x[0],image_url:x[1]}))),[members,setMembers]=useState(defaultMembers.map((x,i)=>({id:i,name:x[0],role:x[1],image_url:""})));
 useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setSession(data.session));const {data:l}=supabase.auth.onAuthStateChange((_,s)=>setSession(s));return()=>l.subscription.unsubscribe()},[]);
 useEffect(()=>{if(!supabase)return;Promise.all([supabase.from("events").select("*").order("sort_order"),supabase.from("gallery").select("*").order("created_at",{ascending:false}),supabase.from("committee").select("*").order("sort_order")]).then(([a,b,c])=>{if(a.data?.length)setEvents(a.data);if(b.data?.length)setGallery(b.data);if(c.data?.length)setMembers(c.data)})},[]);
 return <div>
 <header className="nav"><button className="brand" onClick={()=>go("home")}><img src="./logo.svg"/><span>MORYA<small>GANPATI GROUP</small></span></button>
 <nav className={open?"open":""}>{["home","about","events","gallery","committee","contact"].map(x=><button key={x} onClick={()=>{setOpen(false);go(x)}}>{x==="contact"?"CONTACT":x.toUpperCase()}</button>)}<button className="join" onClick={()=>go("contact")}>JOIN US <ArrowUpRight size={12}/></button></nav><button className="hamb" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>

 <section id="home" className="hero">
  <div className="ornament o1">ॐ</div><div className="hero-copy"><div className="tiny">॥ गणपती बाप्पा मोरया ॥</div><h1>MORYA<br/><span>GANPATI GROUP</span></h1><div className="rule"></div><h2>Uniting Devotion.<br/><em>Spreading Happiness.</em></h2><p>Celebrating the arrival of Bappa with faith, culture and community.</p><div className="buttons"><button className="gold" onClick={()=>go("events")}>EXPLORE EVENTS <ArrowUpRight size={14}/></button><button onClick={()=>go("about")}>ABOUT US</button></div></div>
  <div className="ganesh"><div className="halo"></div><div className="ganesh-art">ॐ</div></div><div className="social">◯　◉　▻</div>
 </section>

 <section id="about" className="story">
  <div className="center-title"><span>―　OUR STORY　―</span><i>✦</i></div><div className="story-grid"><div className="story-image"><Placeholder label="GANPATI BAPPA"/></div><div><h2>Our group was founded<br/>with a simple belief —<br/><em>Devotion brings us together.</em></h2><p>Morya Ganpati Group has been celebrating Ganeshotsav with devotion and enthusiasm since many years. Our aim is to preserve our culture and spread happiness.</p><button className="outline" onClick={()=>go("committee")}>READ MORE <ArrowUpRight size={13}/></button></div></div>
 </section>

 <section id="events" className="events"><div className="center-title"><span>―　UPCOMING EVENTS　―</span><i>✦</i></div><div className="event-cards">{events.map((e,i)=><article className="event-card" key={e.id||i}><Placeholder src={e.image||e.image_url} label={e.title}/><h3>{e.title}</h3><p>▣　{e.date||"September 2025"}</p></article>)}</div><button className="outline center-btn">VIEW ALL EVENTS <ArrowUpRight size={13}/></button></section>

 <section id="gallery" className="gallery"><div className="center-title"><span>―　GALLERY　―</span><i>✦</i></div><div className="filters"><button className="active">All</button><button>Ganesh Chaturthi</button><button>Aarti</button><button>Visarjan</button><button>Activities</button></div><div className="gallery-grid">{gallery.slice(0,8).map((g,i)=><article key={g.id||i}><Placeholder src={g.image_url} label={g.title}/></article>)}</div><button className="outline center-btn">VIEW FULL GALLERY <ArrowUpRight size={13}/></button></section>

 <section id="committee" className="committee"><div className="center-title"><span>―　OUR COMMITTEE　―</span><i>✦</i></div><div className="members">{members.slice(0,8).map((m,i)=><article key={m.id||i}><Placeholder src={m.image_url} label="PHOTO" portrait/><h3>{m.name}</h3><p>{m.role}</p></article>)}</div><button className="outline center-btn">VIEW ALL MEMBERS <ArrowUpRight size={13}/></button></section>

 <section id="contact" className="contribute"><div className="center-title"><span>―　MAKE A CONTRIBUTION　―</span><i>✦</i></div><div className="heart">♡</div><h2>Be a part of<br/><em>the celebration.</em></h2><p>Your contribution helps us organize events, social activities and support the community.</p><button className="gold" onClick={()=>alert("Connect your payment link/UPI details here.")}>CONTRIBUTE NOW <ArrowUpRight size={14}/></button><div className="payment"><div><h3>SCAN TO PAY</h3><div className="qr">QR</div></div><div><h3>BANK TRANSFER</h3><p>Morya Ganpati Group<br/>Bank: Your Bank Name<br/>A/C No: XXXXXXXX<br/>IFSC: XXXXXXXX</p></div></div></section>

 <footer><div className="footer-brand"><img src="./logo.svg"/> <b>MORYA<small>GANPATI GROUP</small></b></div><div className="footlinks">{["Home","About Us","Events","Gallery","Committee","Contribution","Contact"].map(x=><button key={x} onClick={()=>go(x.toLowerCase().replace(" ",""))}>{x}</button>)}</div><button className="admin" onClick={()=>setAdmin(true)}><Lock size={11}/> ADMIN</button><div className="copy">© 2025 Morya Ganpati Group. All Rights Reserved.　　Privacy Policy　|　Terms & Conditions</div></footer>
 {admin&&<Admin session={session} close={()=>setAdmin(false)} refresh={()=>location.reload()}/>}
 </div>
}
function Admin({session,close,refresh}){const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[file,setFile]=useState(null),[title,setTitle]=useState(""),[msg,setMsg]=useState(""),[busy,setBusy]=useState(false);
 async function login(e){e.preventDefault();if(!supabaseConfigured)return setMsg("Configure Supabase first — see SETUP.md.");setBusy(true);const {error}=await supabase.auth.signInWithPassword({email,password});setBusy(false);setMsg(error?.message||"Logged in.");}
 async function upload(){if(!supabase)return setMsg("Configure Supabase first.");if(!file||!title.trim())return setMsg("Choose a photo and title.");setBusy(true);const path=Date.now()+"-"+file.name.replace(/[^a-zA-Z0-9._-]/g,"-");let r=await supabase.storage.from("gallery").upload(path,file);if(r.error){setBusy(false);return setMsg(r.error.message)}const {data}=supabase.storage.from("gallery").getPublicUrl(path);r=await supabase.from("gallery").insert({title:title.trim(),image_url:data.publicUrl});setBusy(false);setMsg(r.error?.message||"Photo uploaded.");if(!r.error){setFile(null);setTitle("");refresh()}}
 return <div className="modal"><div className="panel"><button className="close" onClick={close}><X/></button>{!session?<form onSubmit={login}><div className="tiny">MORYA ADMIN</div><h2>Private <em>dashboard.</em></h2><p>Sign in to manage gallery photos.</p><input type="email" placeholder="Admin email" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="gold wide" disabled={busy}>SIGN IN</button></form>:<><div className="tiny">MORYA ADMIN</div><h2>Add a <em>memory.</em></h2><label className="drop"><ImagePlus/><span>{file?file.name:"Choose a photo"}</span><input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}/></label><input placeholder="Photo title" value={title} onChange={e=>setTitle(e.target.value)}/><button className="gold wide" onClick={upload} disabled={busy}><Upload size={13}/> UPLOAD PHOTO</button><button className="logout" onClick={()=>{supabase?.auth.signOut();close()}}><LogOut size={13}/> LOG OUT</button></>}{msg&&<div className="msg">{msg}</div>}</div></div>}
createRoot(document.getElementById("root")).render(<App/>);