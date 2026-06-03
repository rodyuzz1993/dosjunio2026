document.addEventListener('DOMContentLoaded', () => {
    const policyModal = document.getElementById('policyModal');
    const policyModalTitle = document.getElementById('policyModalTitle');
    const policyModalBody = document.getElementById('policyModalBody');
    const policyButtons = document.querySelectorAll('[data-policy]');
    const closeModalButtons = document.querySelectorAll('[data-close-modal]');
    const currentYear = document.getElementById('currentYear');

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const policies = {
        privacidad: {
            title: 'Aviso de privacidad',
            body: `
                <p>
                    En Recuperación Express respetamos la privacidad de nuestros usuarios. 
                    La información proporcionada a través de este sitio web será utilizada únicamente 
                    para brindar seguimiento a solicitudes de asesoría, contacto y atención personalizada.
                </p>

                <p>
                    Los datos que podemos solicitar incluyen nombre, teléfono, correo electrónico 
                    y detalles relacionados con la solicitud enviada por el usuario.
                </p>

                <ul>
                    <li>No compartimos información personal con terceros sin autorización.</li>
                    <li>La información se utiliza únicamente para fines de contacto y asesoría.</li>
                    <li>El usuario puede solicitar la eliminación o actualización de sus datos.</li>
                </ul>

                <p>
                    Este texto es un ejemplo informativo y deberá ser revisado y adaptado conforme 
                    a las necesidades legales del proyecto.
                </p>
            `
        },

        terminos: {
            title: 'Términos y condiciones',
            body: `
                <p>
                    Al utilizar este sitio web, el usuario acepta que la información presentada tiene 
                    fines informativos y de orientación general.
                </p>

                <p>
                    Recuperación Express podrá contactar al usuario a través de los datos proporcionados 
                    en el formulario para dar seguimiento a su solicitud.
                </p>

                <ul>
                    <li>El envío del formulario no garantiza la aprobación o resolución de un caso.</li>
                    <li>La asesoría dependerá de la información proporcionada por el usuario.</li>
                    <li>El contenido del sitio puede actualizarse sin previo aviso.</li>
                </ul>

                <p>
                    Este texto es un ejemplo base y debe ajustarse con información real del negocio 
                    antes de publicar la landing.
                </p>
            `
        }
    };

    function openPolicyModal(policyKey) {
        if (!policyModal || !policyModalTitle || !policyModalBody) return;

        const policy = policies[policyKey];

        if (!policy) return;

        policyModalTitle.textContent = policy.title;
        policyModalBody.innerHTML = policy.body;

        policyModal.classList.add('is-active');
        policyModal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';
    }

    function closePolicyModal() {
        if (!policyModal) return;

        policyModal.classList.remove('is-active');
        policyModal.setAttribute('aria-hidden', 'true');

        document.body.style.overflow = '';
    }

    policyButtons.forEach((button) => {
        button.addEventListener('click', () => {
            openPolicyModal(button.dataset.policy);
        });
    });

    closeModalButtons.forEach((button) => {
        button.addEventListener('click', closePolicyModal);
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' && 
            policyModal && 
            policyModal.classList.contains('is-active')
        ) {
            closePolicyModal();
        }
    });
});
