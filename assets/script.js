/* petsinmycity.com - global script v2 (amber/coral/sage) */

(function(){
  function buildHeader(){
    return `<style>.nav-dropdown{position:relative}.nav-dropdown-menu{display:none;position:absolute;top:100%;left:0;background:white;border:1px solid #fde68a;border-radius:12px;padding:8px 0;min-width:230px;box-shadow:0 8px 24px rgba(0,0,0,0.12);z-index:9999}.nav-dropdown:hover .nav-dropdown-menu{display:block}.nav-dropdown-menu a{display:flex;align-items:center;gap:10px;padding:10px 16px;font-family:Inter,sans-serif;font-size:0.875rem;color:#374151;text-decoration:none;transition:background 0.15s}.nav-dropdown-menu a:hover{background:#fff8e7;color:#92400e}.nav-dropdown-see-all{border-top:1px solid #fde68a;margin-top:4px;padding-top:4px;font-weight:700 !important;color:#f59e0b !important}.paw-tools-toggle{cursor:pointer;display:flex;align-items:center;gap:4px}.paw-tools-mobile{display:none;flex-direction:column;padding-left:16px}.paw-tools-mobile.open{display:flex}</style><nav class="pimc-nav">
  <div class="pimc-logo-row">
    <a href="/" class="pimc-logo-link" style="display:inline-flex;align-items:center;text-decoration:none">
      <img src="/assets/logo.png" alt="PetsInMyCity - Your Local Pet Resource" style="height:200px;width:auto;display:block">
    </a>
  </div>
  <div class="pimc-nav-row">
    <div class="container" style="display:flex;align-items:center;justify-content:center;width:100%;position:relative">
      <div class="pimc-nav-links" id="pimc-nav-links">
        <a href="/pet-insurance/">Insurance</a>
        <a href="/adoption/">Adoption</a>
        <a href="/dog-care/">Dog Care</a>
        <a href="/find-a-vet/">Find a Vet</a>
        <li class="nav-dropdown" style="list-style:none;display:inline-block;margin:0;padding:0">
          <a href="/tools/" class="paw-tools-toggle" style="font-weight:600">&#128062; Paw Tools <span style="font-size:0.7rem;margin-left:2px">&#9660;</span></a>
          <ul class="nav-dropdown-menu" style="list-style:none;margin:0">
            <li><a href="/tools/food-checker/">&#127837; Can My Pet Eat This?</a></li>
            <li><a href="/tools/calorie-calculator/">&#128290; Calorie Calculator</a></li>
            <li><a href="/tools/symptom-checker/">&#128137; Symptom Checker</a></li>
            <li><a href="/tools/breed-matcher/">&#128054; Breed Matcher</a></li>
            <li><a href="/tools/name-generator/">&#10024; Name Generator</a></li>
            <li><a href="/tools/vet-cost-estimator/">&#128176; Vet Cost Estimator</a></li>
            <li><a href="/tools/emergency-finder/">&#128680; Emergency Finder</a></li>
            <li><a href="/tools/dog-park-finder/">&#127795; Dog Park Finder</a></li>
            <li><a href="/tools/grooming-calculator/">&#9986; Grooming Calculator</a></li>
            <li><a href="/tools/lost-pet/">&#128062; Lost Pet Assistant</a></li>
            <li><a href="/tools/" class="nav-dropdown-see-all">See all Paw Tools &#8594;</a></li>
          </ul>
        </li>
        <a href="/lucy/" style="color:var(--amber);font-weight:700">&#10024; Lucy AI</a>
        <a href="/#cities">Cities</a>
      </div>
      <button id="pimc-hamburger" onclick="toggleMobileNav()" aria-label="Open menu" aria-expanded="false" style="display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;align-items:center;justify-content:center;position:absolute;right:16px;top:50%;transform:translateY(-50%)">
        <span style="display:block;width:24px;height:2px;background:var(--charcoal);border-radius:2px;transition:all 0.3s"></span>
        <span style="display:block;width:24px;height:2px;background:var(--charcoal);border-radius:2px;transition:all 0.3s"></span>
        <span style="display:block;width:24px;height:2px;background:var(--charcoal);border-radius:2px;transition:all 0.3s"></span>
      </button>
    </div>
  </div>
  <div id="pimc-mobile-nav" style="display:none;background:white;border-top:1px solid var(--border);padding:16px 24px;flex-direction:column;gap:0">
    <a href="/pet-insurance/" style="display:block;padding:14px 0;border-bottom:1px solid var(--border);font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);text-decoration:none">&#127973;&#65039; Insurance</a>
    <a href="/adoption/" style="display:block;padding:14px 0;border-bottom:1px solid var(--border);font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);text-decoration:none">&#128062; Adoption</a>
    <a href="/dog-care/" style="display:block;padding:14px 0;border-bottom:1px solid var(--border);font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);text-decoration:none">&#129436; Dog Care</a>
    <a href="/find-a-vet/" style="display:block;padding:14px 0;border-bottom:1px solid var(--border);font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);text-decoration:none">&#129658; Find a Vet</a>
    <div style="border-bottom:1px solid var(--border)">
      <span onclick="togglePawTools()" class="paw-tools-toggle" style="font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);padding:14px 0;display:flex;align-items:center;gap:6px;cursor:pointer">&#128062; Paw Tools <span style="font-size:0.7rem">&#9660;</span></span>
      <ul id="paw-tools-mobile" class="paw-tools-mobile" style="list-style:none;margin:0;padding:0 0 8px 16px">
        <li><a href="/tools/food-checker/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#127837; Can My Pet Eat This?</a></li>
        <li><a href="/tools/calorie-calculator/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128290; Calorie Calculator</a></li>
        <li><a href="/tools/symptom-checker/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128137; Symptom Checker</a></li>
        <li><a href="/tools/breed-matcher/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128054; Breed Matcher</a></li>
        <li><a href="/tools/name-generator/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#10024; Name Generator</a></li>
        <li><a href="/tools/vet-cost-estimator/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128176; Vet Cost Estimator</a></li>
        <li><a href="/tools/emergency-finder/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128680; Emergency Finder</a></li>
        <li><a href="/tools/dog-park-finder/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#127795; Dog Park Finder</a></li>
        <li><a href="/tools/grooming-calculator/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#9986; Grooming Calculator</a></li>
        <li><a href="/tools/lost-pet/" style="font-family:Nunito;font-size:0.9rem;color:var(--charcoal);text-decoration:none;padding:8px 0;display:block">&#128062; Lost Pet Assistant</a></li>
        <li><a href="/tools/" style="font-family:Nunito;font-size:0.9rem;color:var(--amber);font-weight:700;text-decoration:none;padding:10px 0;display:block;border-top:1px solid #fde68a;margin-top:4px">See all Paw Tools &#8594;</a></li>
      </ul>
    </div>
    <a href="/lucy/" style="display:block;padding:14px 0;border-bottom:1px solid var(--border);font-family:Nunito;font-weight:700;font-size:1rem;color:var(--amber);text-decoration:none">&#10024; Lucy AI</a>
    <a href="/#cities" style="display:block;padding:14px 0;font-family:Nunito;font-weight:600;font-size:1rem;color:var(--charcoal);text-decoration:none">&#127961;&#65039; Cities</a>
  </div>
</nav>`;
  }

  function buildFooter(){
    return '<footer class="pimc-footer"><div class="container">'+
      '<div class="footer-inner">'+
        '<div>'+
          '<a href="/" style="display:flex;align-items:center;text-decoration:none">'+
          '<img src="/assets/logo.png" alt="PetsInMyCity - Your Local Pet Resource" style="height:96px;width:auto;display:block">'+
          '</a>'+
          '<p style="font-size:0.85rem;color:rgba(255,255,255,0.5);max-width:280px;line-height:1.6">'+
            'Free pet resources for pet owners across America. Insurance, vets, adoption, and more &mdash; all local, all free.'+
          '</p>'+
        '</div>'+
        '<div>'+
          '<p style="font-family:Nunito;font-weight:700;color:white;margin-bottom:12px">Resources</p>'+
          '<div style="display:flex;flex-direction:column;gap:8px">'+
            '<a href="/#insurance" class="footer-link">Pet Insurance</a>'+
            '<a href="/adoption/" class="footer-link">Adoption</a>'+
            '<a href="/find-a-vet/" class="footer-link">Find a Vet</a>'+
            '<a href="/#cities" class="footer-link">Browse Cities</a>'+
          '</div>'+
        '</div>'+
        '<div>'+
          '<p style="font-family:Nunito;font-weight:700;color:white;margin-bottom:12px">Company</p>'+
          '<div style="display:flex;flex-direction:column;gap:8px">'+
            '<a href="/about/" class="footer-link">About</a>'+
            '<a href="/privacy/" class="footer-link">Privacy</a>'+
            '<a href="mailto:help@elitemediagroup.io" class="footer-link">Contact</a>'+
            '<a href="https://consumersupporthelp.com" class="footer-link" target="_blank" rel="noopener">ConsumerSupportHelp</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="footer-bottom">'+
        '<p>&copy; 2026 Elite Media Group LLC &mdash; All rights reserved. petsinmycity.com is a free resource for pet owners. We may earn referral fees from affiliate partners.</p>'+
      '</div>'+
    '</div></footer>';
  }

  var CITY_MAP = {
    'chicago':'/cities/chicago/','houston':'/cities/houston/','phoenix':'/cities/phoenix/',
    'dallas':'/cities/dallas/','nashville':'/cities/nashville/','charlotte':'/cities/charlotte/',
    'jacksonville':'/cities/jacksonville/','atlanta':'/cities/atlanta/','denver':'/cities/denver/',
    'seattle':'/cities/seattle/','portland':'/cities/portland/','indianapolis':'/cities/indianapolis/',
    'los angeles':'/cities/los-angeles/','la':'/cities/los-angeles/',
    'new york':'/cities/new-york/','nyc':'/cities/new-york/'
  };
  var ZIP_PREFIX_MAP = {
    '606':'/cities/chicago/','770':'/cities/houston/','850':'/cities/phoenix/','852':'/cities/phoenix/','853':'/cities/phoenix/',
    '752':'/cities/dallas/','372':'/cities/nashville/','282':'/cities/charlotte/','322':'/cities/jacksonville/',
    '303':'/cities/atlanta/','802':'/cities/denver/','981':'/cities/seattle/','972':'/cities/portland/',
    '462':'/cities/indianapolis/','900':'/cities/los-angeles/','100':'/cities/new-york/'
  };

  window.searchCity = function(){
    var inp = document.getElementById('city-search');
    if(!inp){return;}
    var q = (inp.value||'').trim().toLowerCase();
    if(!q){return;}
    if(/^\d{3,5}$/.test(q)){
      var pre = q.substring(0,3);
      if(ZIP_PREFIX_MAP[pre]){window.location.href = ZIP_PREFIX_MAP[pre];return;}
    }
    var clean = q.replace(/,.*$/, '').trim();
    if(CITY_MAP[clean]){window.location.href = CITY_MAP[clean];return;}
    window.location.href = '/#cities';
  };

  window.submitVetForm = function(e){
    if(e && e.preventDefault){e.preventDefault();}
    var form = e ? e.target : document.querySelector('form');
    var name = (document.getElementById('vet-name')||{}).value || '';
    var phone = (document.getElementById('vet-phone')||{}).value || '';
    var zip = (document.getElementById('vet-zip')||{}).value || '';
    var pet = (document.getElementById('vet-pet')||{}).value || '';
    if(!name||!phone||!zip||!pet){alert('Please fill in all fields.');return false;}
    try{
      fetch('https://api.hsforms.com/submissions/v3/integration/submit/243957727/243d8ca3-2c2d-484f-bf44-264f02ad446c', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({fields:[
          {name:'firstname',value:name},
          {name:'phone',value:phone},
          {name:'zip',value:zip},
          {name:'pet_type',value:pet}
        ], context:{pageUri:window.location.href, pageName:document.title}})
      }).catch(function(){});
    }catch(_){}
    if(form){
      form.innerHTML = '<div style="text-align:center;padding:24px">'+
        '<p style="font-family:Nunito;font-weight:800;font-size:1.2rem;color:var(--amber-dark);margin-bottom:8px">&#x1F43E; Got it!</p>'+
        '<p style="color:var(--gray)">A local vet will be in touch shortly.</p>'+
      '</div>';
    }
    return false;
  };

  function mount(){
    // Inject favicon if missing
    try {
      if (!document.querySelector('link[rel~="icon"]')) {
        var fav = document.createElement('link');
        fav.rel = 'icon';
        fav.type = 'image/png';
        fav.href = '/assets/logo.png';
        document.head.appendChild(fav);
      }
    } catch(e){}
    var h = document.getElementById('site-header') || document.querySelector('.site-header');
    if(h){h.innerHTML = buildHeader();}
    var f = document.getElementById('site-footer') || document.querySelector('.site-footer');
    if(f){f.innerHTML = buildFooter();}
    // Lucy AI widget: appended to body via lucy.js loaded from index pages.
    if(!document.getElementById('lucy-script-tag')){
      var ls = document.createElement('script');
      ls.id = 'lucy-script-tag';
      ls.src = '/assets/lucy.js';
      ls.defer = true;
      document.head.appendChild(ls);
    }
    document.querySelectorAll('a[href^="#"], a[href*="/#"]').forEach(function(a){
      a.addEventListener('click', function(ev){
        var href = a.getAttribute('href')||'';
        var hash = href.indexOf('#') >= 0 ? href.substring(href.indexOf('#')) : '';
        if(hash && hash.length > 1){
          var target = document.querySelector(hash);
          if(target){ev.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
        }
      });
    });
    var si = document.getElementById('city-search');
    if(si){si.addEventListener('keydown', function(e){if(e.key==='Enter'){e.preventDefault();window.searchCity();}});}
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else { mount(); }
})();

window.toggleMobileNav = function toggleMobileNav() {
  var mobileNav = document.getElementById('pimc-mobile-nav');
  var hamburger = document.getElementById('pimc-hamburger');
  if (!mobileNav || !hamburger) return;
  if (mobileNav.style.display === 'flex') {
    mobileNav.style.display = 'none';
    hamburger.setAttribute('aria-expanded', 'false');
  } else {
    mobileNav.style.display = 'flex';
    hamburger.setAttribute('aria-expanded', 'true');
  }
};

function togglePawTools() {
  var menu = document.getElementById('paw-tools-mobile');
  if (menu) {
    menu.classList.toggle('open');
  }
}

