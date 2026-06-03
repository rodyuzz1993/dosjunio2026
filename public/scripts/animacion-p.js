document.addEventListener('DOMContentLoaded', () => {
    const elementosTexto = document.querySelectorAll(
        'section, article, h1, h2, h3, h4, h5, h6, figcaption'
    );

    const parrafos = document.querySelectorAll('p');

    const elementosImagen = document.querySelectorAll(
        'img, figure'
    );

    elementosTexto.forEach((elemento, index) => {
        elemento.classList.add('reveal', 'reveal-up');

        if (index % 3 === 0) elemento.classList.add('reveal-delay-1');
        if (index % 3 === 1) elemento.classList.add('reveal-delay-2');
        if (index % 3 === 2) elemento.classList.add('reveal-delay-3');
    });

    elementosImagen.forEach((elemento, index) => {
        elemento.classList.add('reveal', 'reveal-down');

        if (index % 2 === 0) elemento.classList.add('reveal-delay-1');
        if (index % 2 === 1) elemento.classList.add('reveal-delay-2');
    });

    parrafos.forEach((parrafo) => {
        const textoOriginal = parrafo.textContent.trim();

        if (!textoOriginal) return;

        parrafo.dataset.textoOriginal = textoOriginal;
        parrafo.style.minHeight = `${parrafo.offsetHeight}px`;
        parrafo.textContent = '';
        parrafo.classList.add('type-reveal');
    });

    function escribirParrafo(parrafo) {
        if (parrafo.dataset.escrito === 'true') return;

        parrafo.dataset.escrito = 'true';
        parrafo.classList.add('show', 'typing');

        const texto = parrafo.dataset.textoOriginal || '';
        let index = 0;
        const velocidad = 18;

        function escribir() {
            parrafo.textContent = texto.slice(0, index);
            index++;

            if (index <= texto.length) {
                setTimeout(escribir, velocidad);
            } else {
                parrafo.classList.remove('typing');
                parrafo.style.minHeight = '';
            }
        }

        escribir();
    }

    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                if (entrada.target.classList.contains('type-reveal')) {
                    escribirParrafo(entrada.target);
                } else {
                    entrada.target.classList.add('show');
                }

                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15
    });

    document.querySelectorAll('.reveal, .type-reveal').forEach((elemento) => {
        observer.observe(elemento);
    });
});
