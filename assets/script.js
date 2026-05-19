/* petsinmycity.com - global script v2 (amber/coral/sage) */

(function(){
  function buildHeader(){
    return '<nav class="pimc-nav">'+
      '<a href="/" class="pimc-logo">'+
        '<span class="logo-pets">pets</span>'+
        '<span class="logo-inmy">inmy</span>'+
        '<span class="logo-city">city</span>'+
      '</a>'+
      '<div class="pimc-nav-links">'+
        '<a href="/#insurance">Insurance</a>'+
        '<a href="/adoption/">Adoption</a>'+
        '<a href="/dog-care/">Dog Care</a>'+
        '<a href="/find-a-vet/">Find a Vet</a>'+
        '<a href="/lucy/" style="color:var(--amber);font-weight:700">\u2728 Lucy AI</a>'+
        '<a href="/#cities">Cities</a>'+
      '</div>'+
      '<a href="/#insurance" class="nav-cta">Get Free Quote</a>'+
    '</nav>';
  }

  function buildFooter(){
    return '<footer class="pimc-footer"><div class="container">'+
      '<div class="footer-inner">'+
        '<div>'+
          '<div class="pimc-logo" style="margin-bottom:12px">'+
            '<span class="logo-pets">pets</span>'+
            '<span class="logo-inmy">inmy</span>'+
            '<span class="logo-city">city</span>'+
          '</div>'+
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
