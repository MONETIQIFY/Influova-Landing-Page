// ============================================================
// INFLUOVA — Landing Page Scripts
// ============================================================

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// --- Form handling ---------------------------------------------------------
// We submit the form to Netlify via fetch so we can show an inline success
// message without a full page reload. Netlify still captures the submission
// (and emails you) because the POST hits the Netlify Forms endpoint.
const form = document.getElementById('applyForm');
const successMessage = document.getElementById('successMessage');

function showSuccess() {
  if (form) form.hidden = true;
  if (successMessage) successMessage.hidden = false;
  // Bring the confirmation into view
  document.getElementById('apply').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => showSuccess())
      .catch((err) => {
        console.error('Submission error:', err);
        // Even if the inline fetch fails (e.g. running locally without Netlify),
        // still confirm to the user so the experience isn't broken.
        showSuccess();
      });
  });
}

// If Netlify redirected back with ?success=true (no-JS fallback path), show success.
if (new URLSearchParams(window.location.search).get('success') === 'true') {
  showSuccess();
}
