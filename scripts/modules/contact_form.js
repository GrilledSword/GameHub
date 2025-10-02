/**
 * Kapcsolati űrlap kezelése.
 */
export function initContactForm() {
    const form = document.getElementById('contact-form');
    const privacyCheckbox = document.getElementById('privacy-checkbox');
    const submitButton = document.getElementById('submit-button');
    const formStatus = document.getElementById('form-status');
    if (!form || !privacyCheckbox || !submitButton) return;

    const toggleSubmitButton = () => {
        submitButton.disabled = !privacyCheckbox.checked;
    };

    privacyCheckbox.addEventListener('change', toggleSubmitButton);
    toggleSubmitButton();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (submitButton.disabled) return;
        if (formStatus) {
            formStatus.textContent = 'Küldés...';
            formStatus.style.color = '';
        }

        const ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
        const formData = new FormData(form);
        formData.append("access_key", ACCESS_KEY);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                formStatus.textContent = document.querySelector('[data-lang-key="form_status_success"]').textContent;
                formStatus.style.color = '#10B981';
                form.reset();
                toggleSubmitButton();
            } else {
                throw new Error(result.message || 'Ismeretlen hiba történt.');
            }
        } catch (error) {
            formStatus.textContent = `${document.querySelector('[data-lang-key="form_status_error"]').textContent} ${error.message}`;
            formStatus.style.color = '#EF4444';
        } finally {
            setTimeout(() => { if (formStatus) formStatus.textContent = ''; }, 6000);
        }
    });
}
