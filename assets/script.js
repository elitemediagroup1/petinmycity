(function(){
  // ===== Header mount =====
  var headerHTML = '' +
    '<nav class="site-nav">' +
      '<a class="logo" href="/">petsinmycity.com</a>' +
      '<ul class="nav-links">' +
        '<li><a href="/#insurance">Insurance</a></li>' +
        '<li><a href="/adoption/">Adoption</a></li>' +
        '<li><a href="/#cities">Find a Vet</a></li>' +
        '<li><a href="/#supplies">Supplies</a></li>' +
        '<li><a href="/#cities">Cities</a></li>' +
      '</ul>' +
    '</nav>';
  var headerMount = document.getElementById('site-header');
  if(headerMount){ headerMount.innerHTML = headerHTML; }

  // ===== Footer mount =====
  var year = new Date().getFullYear();
  if(year < 2026) year = 2026;
  var footerHTML = '' +
    '<footer class="site-footer">' +
      '<div class="footer-inner">' +
        '<div>' +
          '<div class="footer-logo">petsinmycity.com</div>' +
          '<div style="margin-top:6px;">Free pet resources for owners across the US.</div>' +
        '</div>' +
        '<ul class="footer-links">' +
          '<li><a href="/about/">About</a></li>' +
          '<li><a href="/privacy/">Privacy</a></li>' +
          '<li><a href="mailto:help@elitemediagroup.io">Contact</a></li>' +
        '</ul>' +
        '<div class="footer-note">&copy; ' + year + ' Elite Media Group LLC &middot; Also visit <a href="https://consumersupporthelp.com/">consumersupporthelp.com</a> for home services and pest control.</div>' +
      '</div>' +
    '</footer>';
  var footerMount = document.getElementById('site-footer');
  if(footerMount){ footerMount.innerHTML = footerHTML; }

  // ===== City search =====
  var KNOWN_CITIES = {
    'chicago':'/cities/chicago/',
    'houston':'/cities/houston/',
    'phoenix':'/cities/phoenix/',
    'dallas':'/cities/dallas/',
    'los angeles':'/cities/los-angeles/',
    'la':'/cities/los-angeles/',
    'indianapolis':'/cities/indianapolis/',
    'nashville':'/cities/nashville/',
    'charlotte':'/cities/charlotte/',
    'jacksonville':'/cities/jacksonville/',
    'atlanta':'/cities/atlanta/',
    'denver':'/cities/denver/',
    'seattle':'/cities/seattle/'
  };
  // ZIP prefix to city (very coarse for v1)
  var ZIP_PREFIX = {
    '60':'/cities/chicago/',
    '77':'/cities/houston/',
    '85':'/cities/phoenix/',
    '75':'/cities/dallas/',
    '90':'/cities/los-angeles/',
    '46':'/cities/indianapolis/',
    '37':'/cities/nashville/',
    '28':'/cities/charlotte/',
    '32':'/cities/jacksonville/',
    '30':'/cities/atlanta/',
    '80':'/cities/denver/',
    '98':'/cities/seattle/'
  };
  function resolveCity(raw){
    if(!raw) return null;
    var s = String(raw).trim().toLowerCase();
    if(/^\d{5}$/.test(s)){
      return ZIP_PREFIX[s.substring(0,2)] || null;
    }
    s = s.replace(/[,].*$/,'').trim();
    return KNOWN_CITIES[s] || null;
  }
  window.pimcCitySearch = function(inputEl){
    if(!inputEl) return;
    var v = inputEl.value;
    var url = resolveCity(v);
    if(url){ window.location.href = url; }
    else { window.location.href = '/#cities'; }
  };
  document.addEventListener('submit', function(e){
    var f = e.target;
    if(f && f.classList && f.classList.contains('city-search-form')){
      e.preventDefault();
      var input = f.querySelector('input[type="text"], input[type="search"], input');
      window.pimcCitySearch(input);
    }
  });

  // ===== Lead form (silent) =====
  document.addEventListener('submit', function(e){
    var f = e.target;
    if(f && f.classList && f.classList.contains('lead-form')){
      e.preventDefault();
      var btn = f.querySelector('button[type="submit"], button');
      if(btn){ btn.disabled = true; btn.textContent = 'Thanks &mdash; we will be in touch'; }
    }
  });

  // ===== Smooth anchor scroll =====
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if(!a) return;
    var hash = a.getAttribute('href');
    if(hash && hash.length > 1){
      var target = document.querySelector(hash);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
})();
