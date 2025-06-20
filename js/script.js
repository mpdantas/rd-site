// Aguarda o carregamento completo do DOM (Document Object Model)
// Isso garante que todos os elementos HTML estejam disponíveis antes que o script tente manipulá-los.
document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidade do Menu Responsivo (Hambúrguer) ---

    // Seleciona o botão de alternar o menu pelo seu seletor de classe CSS
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleciona a lista de navegação que será exibida/ocultada
    const navList = document.querySelector('.nav-list');

    // Verifica se ambos os elementos (botão e lista) foram encontrados no HTML.
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);
        });
    }

    // --- Atualização Automática do Ano do Copyright no Rodapé ---

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const currentYear = new Date().getFullYear(); 
        currentYearSpan.textContent = currentYear; 
    }

    // --- Funcionalidade do Carrossel de Parceiros (Loop Infinito e Suave) ---
    // Apenas inicializa se o elemento do carrossel existir na página atual
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselButtons = document.querySelectorAll('.carousel-button'); 
    let originalPartnerLogos = [];

    // Carrossel só será inicializado se o carouselTrack for encontrado
    if (carouselTrack) {
        originalPartnerLogos = Array.from(document.querySelectorAll('.partner-logo'));

        let slideWidth = 0; 
        let currentIndex = 0; 
        let itemsPerView = 0; 
        let autoSlideInterval; 

        const clonesCount = 3; 

        function setupClones() {
            const existingClones = carouselTrack.querySelectorAll('.clone');
            existingClones.forEach(clone => clone.remove());

            for (let i = 0; i < clonesCount; i++) {
                const clone = originalPartnerLogos[originalPartnerLogos.length - 1 - i].cloneNode(true);
                clone.classList.add('clone');
                carouselTrack.prepend(clone);
            }

            for (let i = 0; i < clonesCount; i++) {
                const clone = originalPartnerLogos[i].cloneNode(true);
                clone.classList.add('clone');
                carouselTrack.appendChild(clone);
            }

            currentIndex = clonesCount; 
            updateCarouselPosition(false); 
        }

        function calculateCarouselMetrics() {
            if (originalPartnerLogos.length === 0) { // Verifica se há logos originais
                // Se não houver logos, não há carrossel para mostrar.
                stopAutoSlide();
                if (carouselButtons) carouselButtons.forEach(button => button.style.display = 'none');
                if (carouselTrack) {
                    carouselTrack.style.transition = 'none';
                    carouselTrack.style.transform = 'translateX(0)';
                }
                return;
            }

            const firstLogo = originalPartnerLogos[0];
            const style = getComputedStyle(firstLogo);
            const marginRight = parseFloat(style.marginRight);
            const marginLeft = parseFloat(style.marginLeft);
            slideWidth = firstLogo.offsetWidth + marginRight + marginLeft;

            const trackContainer = document.querySelector('.carousel-track-container');
            if (!trackContainer) return;
            itemsPerView = Math.floor(trackContainer.offsetWidth / slideWidth);

            if (originalPartnerLogos.length <= itemsPerView) {
                carouselButtons.forEach(button => button.style.display = 'none');
                carouselTrack.style.transition = 'none';
                carouselTrack.style.transform = 'translateX(0)';
                stopAutoSlide();
                return; 
            } else {
                carouselButtons.forEach(button => button.style.display = 'none'); 
                if (!autoSlideInterval) { 
                     startAutoSlide();
                }
            }
            setupClones();
        }

        function updateCarouselPosition(withTransition = true) {
            carouselTrack.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
            carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            if (withTransition) { 
                if (currentIndex >= originalPartnerLogos.length + clonesCount) {
                    setTimeout(() => {
                        currentIndex = clonesCount;
                        updateCarouselPosition(false);
                    }, 500); 
                } 
            }
        }
        
        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                currentIndex++; 
                updateCarouselPosition(true); 
            }, 3000); 
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null; 
        }

        // Event listeners para o carrossel, apenas se o carrosselTrack existir
        window.addEventListener('load', calculateCarouselMetrics);
        window.addEventListener('resize', calculateCarouselMetrics);
    } else {
        console.warn("Carrossel de parceiros (.carousel-track) não encontrado nesta página.");
    }

    // --- Funcionalidade do Modal de Detalhes do Serviço ---
    // ESTE BLOCO AGORA ESTÁ DENTRO DO DOMContentLoaded!

    const serviceModal = document.getElementById('serviceModal');
    // Só seleciona elementos relacionados ao modal se o modal existir
    const modalCloseButton = serviceModal ? serviceModal.querySelector('.modal-close-button') : null;
    const modalTitle = serviceModal ? serviceModal.querySelector('.modal-title') : null;
    const modalDescription = serviceModal ? serviceModal.querySelector('.modal-description') : null;
    const modalWhatsappBtn = serviceModal ? serviceModal.querySelector('.modal-whatsapp-btn') : null;

    const openModalButtons = document.querySelectorAll('.open-service-modal');

    // Função para abrir o modal
    function openModal(title, description, whatsappMsg) {
        // Verifica se TODOS os elementos necessários do modal foram encontrados antes de usar
        if (!serviceModal || !modalCloseButton || !modalTitle || !modalDescription || !modalWhatsappBtn) {
            console.error("Erro: Elementos do modal não encontrados. Verifique o HTML do modal e sua posição no DOM.");
            return;
        }
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalWhatsappBtn.href = `https://wa.me/5511994856220?text=${encodeURIComponent(whatsappMsg)}`; 
        
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    // Função para fechar o modal
    function closeModal() {
        if (!serviceModal) return; // Adicionado para segurança
        serviceModal.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // Adiciona event listeners aos botões "Saiba Mais"
    if (openModalButtons.length > 0) { // Verifica se há botões para evitar erro em páginas sem eles
        openModalButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                const title = button.dataset.title;
                const description = button.dataset.description;
                const whatsappMsg = button.dataset.whatsappMsg;
                openModal(title, description, whatsappMsg);
            });
        });
    } else {
        // Este console.warn é normal em páginas que não têm botões de modal (ex: contato.html, sobre-nos.html)
        console.warn("Nenhum botão '.open-service-modal' encontrado nesta página.");
    }

    // Adiciona event listeners para fechar o modal (apenas se o modal e o botão existirem)
    if (serviceModal && modalCloseButton) {
        modalCloseButton.addEventListener('click', closeModal);
        serviceModal.addEventListener('click', (event) => { // Clique fora do conteúdo
            if (event.target === serviceModal) {
                closeModal();
            }
        });
    }
    // Listener para fechar com ESC (serviceModal deve existir para verificar a classe 'active')
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
            closeModal();
        }
    });


    // --- Funcionalidade do Formulário de Contato (Envio para WhatsApp) ---
    // Este bloco também está dentro do DOMContentLoaded!
    const contactForm = document.getElementById('contactForm'); 

    if (contactForm) { // Verifica se o formulário existe na página
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Previne o comportamento padrão de submissão (recarregar a página)

            // Coleta os dados do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value; 
            const message = document.getElementById('message').value;

            // Monta a mensagem para o WhatsApp
            let whatsappMessage = `Olá, gostaria de entrar em contato!\n\n`;
            whatsappMessage += `*Nome:* ${name}\n`;
            whatsappMessage += `*Email:* ${email}\n`;
            whatsappMessage += `*Assunto:* ${subject}\n`;
            whatsappMessage += `*Mensagem:* ${message}`;

            // Codifica a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            const whatsappNumber = '5511994856220'; // Use o número REAL da corretora aqui
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            alert('Sua mensagem está sendo preparada para o WhatsApp. Por favor, confirme o envio lá!');

            window.open(whatsappUrl, '_blank');

            contactForm.reset(); // Limpa o formulário após o "envio"

        });
    } else {
        // Este console.warn é normal em páginas que não têm o formulário de contato
        console.warn("Formulário de contato (#contactForm) não encontrado nesta página.");
    }

}); // FIM DO DOMContentLoaded