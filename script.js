// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Contact forms: this is a static site with no server, so a submitted form
// opens the visitor's email app with the message filled in.
document.querySelectorAll('form[data-mailto]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get('first')} ${data.get('last')}`,
      `Email: ${data.get('email')}`,
    ];
    if (form.elements.newsletter) {
      lines.push(`Sign up for news and updates: ${data.get('newsletter') ? 'Yes' : 'No'}`);
    }
    lines.push('', data.get('message'));
    const href = `mailto:${form.dataset.mailto}?subject=${encodeURIComponent(form.dataset.subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = href;
    const note = form.querySelector('.form-note');
    if (note) note.hidden = false;
  });
});
