const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('mainNav');
function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    mainNav.classList.toggle('open', open);
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        if (mainNav.contains(document.activeElement)) menuToggle.focus();
        setMenu(false);
    }
});
window.matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));
document.querySelectorAll('[data-interest]').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('interest').value = link.dataset.interest;
    });
});
const form = document.getElementById('contactForm');
const result = document.getElementById('enquiryResult');
const status = document.getElementById('formStatus');
const preview = document.getElementById('enquiryPreview');
const copyButton = document.getElementById('copyEnquiry');
form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !message) {
        const emptyField = !name ? form.elements.name : form.elements.message;
        emptyField.setCustomValidity('Please add a few details.');
        emptyField.reportValidity();
        return;
    }
    preview.textContent = `Name: ${name}\nEmail: ${form.elements.email.value.trim()}\nInterested in: ${form.elements.interest.value || 'Style guidance'}\n\n${message}`;
    result.hidden = false;
    status.textContent = 'Your enquiry is ready to copy. It has not been sent.';
    result.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest'});
});
form.addEventListener('input', event => {
    if (event.target.setCustomValidity) event.target.setCustomValidity('');
    result.hidden = true;
});
copyButton.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(preview.textContent);
        status.textContent = 'Enquiry copied. It has not been sent.';
    } catch {
        status.textContent = 'Select and copy the enquiry text below. It has not been sent.';
    }
});
document.getElementById('year').textContent = new Date().getFullYear();
