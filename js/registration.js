/* Bauchi State Chapter membership registration form. */
(() => {
  const form = document.getElementById('membership-registration-form');
  if (!form) return;
  const lgaSelect = document.getElementById('registration-lga');
  const wardSelect = document.getElementById('registration-ward');
  const message = document.getElementById('registration-message');
  const lgas = Array.isArray(window.BAUCHI_LGAS) ? window.BAUCHI_LGAS : [];

  lgas.forEach((lga) => lgaSelect.add(new Option(lga.name, lga.name)));
  lgaSelect.addEventListener('change', () => {
    const selected = lgas.find((item) => item.name === lgaSelect.value);
    wardSelect.replaceChildren(new Option(selected ? 'Select your ward' : 'Select your LGA first', ''));
    wardSelect.disabled = !selected;
    (selected?.wards || []).forEach((ward) => wardSelect.add(new Option(ward, ward)));
  });

  // Set this only after the chapter's Google Sheet and Apps Script web app are configured.
  const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyTr17Wg4TcR4IZ8YPUIF_Udw9_tCz8Sxc7mfgL-w0T4My6C6AfEWnwU8WqHXO3yVwk_g/exec';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    message.textContent = '';
    message.className = 'registration-message';
    if (!form.reportValidity()) return;

    const accountNumber = form.elements.accountNumber.value.trim();
    const accountName = form.elements.accountName.value.trim();
    const bankName = form.elements.bankName.value.trim();
    const anyBankDetail = accountNumber || accountName || bankName;
    if (anyBankDetail && !(accountNumber && accountName && bankName)) {
      message.textContent = 'Please complete all three bank fields, or leave all bank fields blank.';
      message.classList.add('is-error');
      return;
    }
    if (accountNumber && !/^\d{10}$/.test(accountNumber)) {
      message.textContent = 'Please enter a valid 10-digit account number.';
      message.classList.add('is-error');
      form.elements.accountNumber.focus();
      return;
    }
    if (!GOOGLE_APPS_SCRIPT_URL) {
      message.textContent = 'The registration form is ready for testing. The registration service is not configured yet. Please try again later.';
      message.classList.add('is-info');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.applicationStatus = 'Pending';
    payload.financialSupportStatus = anyBankDetail ? 'Pending review' : 'Not applicable';
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Submitting…';
    fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams(payload)
    }).then(() => {
      form.reset();
      wardSelect.replaceChildren(new Option('Select your LGA first', ''));
      wardSelect.disabled = true;
      message.textContent = 'Your submission request has been sent. Please contact a chapter administrator if you need confirmation of receipt.';
      message.classList.add('is-success');
    }).catch(() => {
      message.textContent = 'We could not submit your application. Please try again later.';
      message.classList.add('is-error');
    }).finally(() => {
      button.disabled = false;
      button.innerHTML = 'Submit membership application <span aria-hidden="true">→</span>';
    });
  });
})();
