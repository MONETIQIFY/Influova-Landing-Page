// ============================================================
// INFLUOVA — Landing Page Scripts
// ============================================================

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Country dial codes  [name, ISO2, dialCode]
// ============================================================
const COUNTRIES = [
  ['Afghanistan','AF','+93'],['Albania','AL','+355'],['Algeria','DZ','+213'],
  ['Andorra','AD','+376'],['Angola','AO','+244'],['Argentina','AR','+54'],
  ['Armenia','AM','+374'],['Australia','AU','+61'],['Austria','AT','+43'],
  ['Azerbaijan','AZ','+994'],['Bahamas','BS','+1'],['Bahrain','BH','+973'],
  ['Bangladesh','BD','+880'],['Barbados','BB','+1'],['Belarus','BY','+375'],
  ['Belgium','BE','+32'],['Belize','BZ','+501'],['Benin','BJ','+229'],
  ['Bolivia','BO','+591'],['Bosnia & Herzegovina','BA','+387'],['Botswana','BW','+267'],
  ['Brazil','BR','+55'],['Brunei','BN','+673'],['Bulgaria','BG','+359'],
  ['Burkina Faso','BF','+226'],['Cambodia','KH','+855'],['Cameroon','CM','+237'],
  ['Canada','CA','+1'],['Chile','CL','+56'],['China','CN','+86'],
  ['Colombia','CO','+57'],['Costa Rica','CR','+506'],['Croatia','HR','+385'],
  ['Cyprus','CY','+357'],['Czech Republic','CZ','+420'],['Denmark','DK','+45'],
  ['Dominican Republic','DO','+1'],['Ecuador','EC','+593'],['Egypt','EG','+20'],
  ['El Salvador','SV','+503'],['Estonia','EE','+372'],['Ethiopia','ET','+251'],
  ['Fiji','FJ','+679'],['Finland','FI','+358'],['France','FR','+33'],
  ['Georgia','GE','+995'],['Germany','DE','+49'],['Ghana','GH','+233'],
  ['Greece','GR','+30'],['Guatemala','GT','+502'],['Honduras','HN','+504'],
  ['Hong Kong','HK','+852'],['Hungary','HU','+36'],['Iceland','IS','+354'],
  ['India','IN','+91'],['Indonesia','ID','+62'],['Iraq','IQ','+964'],
  ['Ireland','IE','+353'],['Israel','IL','+972'],['Italy','IT','+39'],
  ['Jamaica','JM','+1'],['Japan','JP','+81'],['Jordan','JO','+962'],
  ['Kazakhstan','KZ','+7'],['Kenya','KE','+254'],['Kuwait','KW','+965'],
  ['Latvia','LV','+371'],['Lebanon','LB','+961'],['Libya','LY','+218'],
  ['Liechtenstein','LI','+423'],['Lithuania','LT','+370'],['Luxembourg','LU','+352'],
  ['Macau','MO','+853'],['Malaysia','MY','+60'],['Maldives','MV','+960'],
  ['Malta','MT','+356'],['Mauritius','MU','+230'],['Mexico','MX','+52'],
  ['Moldova','MD','+373'],['Monaco','MC','+377'],['Mongolia','MN','+976'],
  ['Montenegro','ME','+382'],['Morocco','MA','+212'],['Nepal','NP','+977'],
  ['Netherlands','NL','+31'],['New Zealand','NZ','+64'],['Nicaragua','NI','+505'],
  ['Nigeria','NG','+234'],['North Macedonia','MK','+389'],['Norway','NO','+47'],
  ['Oman','OM','+968'],['Pakistan','PK','+92'],['Panama','PA','+507'],
  ['Paraguay','PY','+595'],['Peru','PE','+51'],['Philippines','PH','+63'],
  ['Poland','PL','+48'],['Portugal','PT','+351'],['Qatar','QA','+974'],
  ['Romania','RO','+40'],['Russia','RU','+7'],['Rwanda','RW','+250'],
  ['Saudi Arabia','SA','+966'],['Senegal','SN','+221'],['Serbia','RS','+381'],
  ['Singapore','SG','+65'],['Slovakia','SK','+421'],['Slovenia','SI','+386'],
  ['South Africa','ZA','+27'],['South Korea','KR','+82'],['Spain','ES','+34'],
  ['Sri Lanka','LK','+94'],['Sweden','SE','+46'],['Switzerland','CH','+41'],
  ['Taiwan','TW','+886'],['Tanzania','TZ','+255'],['Thailand','TH','+66'],
  ['Trinidad & Tobago','TT','+1'],['Tunisia','TN','+216'],['Turkey','TR','+90'],
  ['Uganda','UG','+256'],['Ukraine','UA','+380'],['United Arab Emirates','AE','+971'],
  ['United Kingdom','GB','+44'],['United States','US','+1'],['Uruguay','UY','+598'],
  ['Uzbekistan','UZ','+998'],['Venezuela','VE','+58'],['Vietnam','VN','+84'],
  ['Zambia','ZM','+260'],['Zimbabwe','ZW','+263'],
];

// ============================================================
// Phone widget
// ============================================================
const phoneBtn      = document.getElementById('phoneCountryBtn');
const phoneDial     = document.getElementById('phoneDial');
const phoneDropdown = document.getElementById('phoneDropdown');
const phoneSearch   = document.getElementById('phoneSearch');
const phoneList     = document.getElementById('phoneList');
const phoneEmpty    = document.getElementById('phoneEmpty');
const phoneInput    = document.getElementById('phoneInput');
const countryField  = document.getElementById('countryField');

let selected = COUNTRIES.find(c => c[1] === 'GB'); // fallback default

// Try to guess the visitor's country from their browser locale (e.g. "en-US")
(function detectCountry() {
  try {
    const locale = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    const region = locale.split('-')[1];
    if (region) {
      const match = COUNTRIES.find(c => c[1] === region.toUpperCase());
      if (match) selected = match;
    }
  } catch (e) { /* keep fallback */ }
})();

function applySelected() {
  phoneDial.textContent = selected[2];
  countryField.value = selected[0] + ' (' + selected[2] + ')';
}

function renderList(filter = '') {
  const q = filter.trim().toLowerCase();
  phoneList.innerHTML = '';
  let count = 0;
  COUNTRIES.forEach((c) => {
    if (q && !c[0].toLowerCase().includes(q) && !c[2].includes(q)) return;
    count++;
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    if (c[1] === selected[1]) li.classList.add('is-active');
    li.innerHTML = '<span class="c-name">' + c[0] + '</span><span class="c-dial">' + c[2] + '</span>';
    li.addEventListener('click', () => {
      selected = c;
      applySelected();
      closeDropdown();
      phoneInput.focus();
    });
    phoneList.appendChild(li);
  });
  phoneEmpty.hidden = count !== 0;
}

function openDropdown() {
  phoneDropdown.hidden = false;
  phoneBtn.setAttribute('aria-expanded', 'true');
  phoneSearch.value = '';
  renderList();
  phoneSearch.focus();
}
function closeDropdown() {
  phoneDropdown.hidden = true;
  phoneBtn.setAttribute('aria-expanded', 'false');
}

if (phoneBtn) {
  applySelected();
  phoneBtn.addEventListener('click', () => {
    phoneDropdown.hidden ? openDropdown() : closeDropdown();
  });
  phoneSearch.addEventListener('input', () => renderList(phoneSearch.value));
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!document.getElementById('phoneWidget').contains(e.target)) closeDropdown();
  });
  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDropdown(); });
}

// ============================================================
// Form handling
// ============================================================
const form = document.getElementById('applyForm');
const successMessage = document.getElementById('successMessage');
const phoneFieldHidden = document.getElementById('phoneField');

function showSuccess() {
  if (form) form.hidden = true;
  if (successMessage) successMessage.hidden = false;
  document.getElementById('apply').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Build the full international number from dial code + entered digits
    const digits = phoneInput.value.trim();
    phoneFieldHidden.value = selected[2] + ' ' + digits;

    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => showSuccess())
      .catch((err) => {
        console.error('Submission error:', err);
        showSuccess();
      });
  });
}

// No-JS fallback: Netlify redirects back with ?success=true
if (new URLSearchParams(window.location.search).get('success') === 'true') {
  showSuccess();
}
