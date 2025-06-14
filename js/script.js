// Aguarda o carregamento completo do DOM (Document Object Model)
// Isso garante que todos os elementos HTML estejam disponíveis antes que o script tente manipulá-los.
document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidade do Menu Responsivo (Hambúrguer) ---

    // Seleciona o botão de alternar o menu pelo seu seletor de classe CSS
    const menuToggle = document.querySelector('.menu-toggle');
    // Seleciona a lista de navegação que será exibida/ocultada
    const navList = document.querySelector('.nav-list');

    // Verifica se ambos os elementos (botão e lista) foram encontrados no HTML.
    // Isso evita erros caso algum elemento não exista na página.
    if (menuToggle && navList) {
        // Adiciona um 'ouvinte de evento' de clique ao botão do menu.
        menuToggle.addEventListener('click', () => {
            // Alterna a classe 'active' na lista de navegação.
            // Se a classe 'active' estiver presente, ela é removida; se não estiver, ela é adicionada.
            // Esta classe 'active' será usada no CSS para exibir ou ocultar o menu.
            navList.classList.toggle('active');

            // Alterna o estado do atributo 'aria-expanded' no botão.
            // Este atributo é importante para a acessibilidade, informando a leitores de tela
            // se o menu está expandido (aberto) ou colapsado (fechado).
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);

            // Opcional: Você pode adicionar ou alternar uma classe adicional aqui
            // para animar o ícone do hambúrguer (transformando-o em um 'X', por exemplo).
            // Exemplo: menuToggle.classList.toggle('open');
            // Se usar isso, precisaria de CSS para estilizar a classe 'open'.
        });
    }

    // --- Atualização Automática do Ano do Copyright no Rodapé ---

    // Seleciona o elemento <span> onde o ano atual será exibido.
    // O ID 'current-year' deve ser adicionado ao HTML na tag <span> do copyright.
    const currentYearSpan = document.getElementById('current-year');

    // Verifica se o elemento <span> com o ID 'current-year' foi encontrado no HTML.
    if (currentYearSpan) {
        // Cria uma nova instância do objeto Date, que representa a data e hora atuais.
        const currentYear = new Date().getFullYear(); 
        // Obtém o ano completo (ex: 2024, 2025).

        // Define o conteúdo de texto do <span> como o ano atual.
        currentYearSpan.textContent = currentYear; 
    }

    // --- Funcionalidade do Carrossel de Parceiros (Loop Infinito e Suave) ---
    const carouselTrack = document.querySelector('.carousel-track');
    // Os botões agora estão ocultos, mas as referências são mantidas para a lógica de 'click' se reativada
    const carouselButtons = document.querySelectorAll('.carousel-button'); 

    // Garante que a lista de logos é estática no carregamento para clonagem
    // Transforma a NodeList em um Array para manipulação
    const originalPartnerLogos = Array.from(document.querySelectorAll('.partner-logo'));

    // Variáveis de controle do carrossel
    let slideWidth = 0; // Largura de um slide, incluindo margens
    let currentIndex = 0; // Índice do slide atual (referente aos logos ORIGINAIS + CLONES)
    let itemsPerView = 0; // Quantos itens cabem na visualização atual do carrossel
    let autoSlideInterval; // Variável para controlar o intervalo do slide automático

    // Quantidade de clones para criar o efeito de loop.
    // Geralmente 2 ou 3 é suficiente para cobrir a view sem piscar
    const clonesCount = 3; 

    // 1. Clonar itens para o looping (Adiciona clones no início e no final da pista)
    function setupClones() {
        // Remove quaisquer clones antigos antes de adicionar novos (útil ao redimensionar)
        const existingClones = carouselTrack.querySelectorAll('.clone');
        existingClones.forEach(clone => clone.remove());

        // Clona os últimos 'clonesCount' itens originais e adiciona no INÍCIO da pista
        for (let i = 0; i < clonesCount; i++) {
            const clone = originalPartnerLogos[originalPartnerLogos.length - 1 - i].cloneNode(true);
            clone.classList.add('clone'); // Adiciona uma classe para identificar o clone
            carouselTrack.prepend(clone); // Adiciona no início
        }

        // Clona os primeiros 'clonesCount' itens originais e adiciona no FINAL da pista
        for (let i = 0; i < clonesCount; i++) {
            const clone = originalPartnerLogos[i].cloneNode(true);
            clone.classList.add('clone'); // Adiciona uma classe para identificar o clone
            carouselTrack.appendChild(clone); // Adiciona no final
        }

        // Ajusta o currentIndex inicial para a primeira posição REAL (após os clones iniciais)
        // Isso posiciona o carrossel no primeiro conjunto de itens originais
        currentIndex = clonesCount; 
        updateCarouselPosition(false); // Posição inicial SEM transição visível
    }


    // Função para calcular métricas do carrossel (largura dos slides, itens visíveis)
    function calculateCarouselMetrics() {
        // Sai se não houver logos originais no HTML
        if (!carouselTrack || originalPartnerLogos.length === 0) return; 

        // Calcula a largura total de um slide (largura do elemento + suas margens)
        const firstLogo = originalPartnerLogos[0];
        const style = getComputedStyle(firstLogo);
        const marginRight = parseFloat(style.marginRight);
        const marginLeft = parseFloat(style.marginLeft);
        slideWidth = firstLogo.offsetWidth + marginRight + marginLeft;

        // Calcula quantos itens cabem na visualização atual do contêiner do carrossel
        const trackContainer = document.querySelector('.carousel-track-container');
        if (!trackContainer) return; // Sai se o contêiner não existir
        itemsPerView = Math.floor(trackContainer.offsetWidth / slideWidth);

        // Se o número de itens originais for menor ou igual aos itens visíveis,
        // o carrossel não é necessário. Esconde os botões e para o slide automático.
        if (originalPartnerLogos.length <= itemsPerView) {
            carouselButtons.forEach(button => button.style.display = 'none');
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = 'translateX(0)';
            stopAutoSlide(); // Para o slide automático se não for mais necessário
            return; 
        } else {
            carouselButtons.forEach(button => button.style.display = 'none'); // Mantém os botões ocultos
            // Se o carrossel é necessário, garante que o slide automático esteja rodando
            if (!autoSlideInterval) { // Só inicia se já não estiver rodando
                 startAutoSlide();
            }
        }

        // Reconfigura os clones e a posição inicial após o cálculo das métricas (útil no redimensionamento)
        setupClones();
    }

    // Função para atualizar a posição do carrossel visualmente
    // 'withTransition' controla se a transição CSS é aplicada para o movimento
    function updateCarouselPosition(withTransition = true) {
        carouselTrack.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
        carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Lógica para o loop "infinito" e suave:
        if (withTransition) { // Só aplica o timeout para pulo se houver transição
            if (currentIndex >= originalPartnerLogos.length + clonesCount) {
                // Se avançou para a área dos clones do FINAL
                setTimeout(() => {
                    currentIndex = clonesCount; // Pula de volta para o início dos itens originais
                    updateCarouselPosition(false); // Realiza o pulo SEM transição
                }, 500); // Deve ser igual ou maior que a duração da transição CSS
            } 
            // Não precisamos de lógica para voltar para trás se não há botões 'prev' visíveis para o usuário
            // e o carrossel é apenas automático para frente.
            // A lógica de pular para trás (if (currentIndex < clonesCount && currentIndex !== 0))
            // é mais relevante quando há navegação manual para trás.
            // Para um loop automático só para frente, podemos simplificar um pouco.
        }
    }
    
    // Removendo event listeners para botões, já que eles não serão clicados.
    // carouselButtons.forEach(button => {
    //     button.addEventListener('click', () => {
    //         if (button.classList.contains('next')) {
    //             currentIndex++;
    //         } else {
    //             currentIndex--;
    //         }
    //         updateCarouselPosition(true);
    //     });
    // });

    // --- Carrossel Automático em Loop ---
    function startAutoSlide() {
        stopAutoSlide(); // Garante que não haja múltiplos intervalos rodando
        autoSlideInterval = setInterval(() => {
            // Avança o currentIndex
            currentIndex++; 
            // Chama updateCarouselPosition. A lógica de pulo para o início já está dentro dela.
            updateCarouselPosition(true); 
        }, 3000); // Muda a cada 3 segundos (ajuste o tempo conforme preferir)
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null; // Reseta a variável do intervalo
    }

    // Inicializa o carrossel ao carregar a página
    window.addEventListener('load', () => {
        calculateCarouselMetrics(); // Calcula as métricas e configura os clones
        startAutoSlide(); // Inicia o carrossel automático logo após o carregamento
    });

    // Recalcula as métricas e reposiciona o carrossel ao redimensionar a janela
    window.addEventListener('resize', () => {
        stopAutoSlide(); // Para o slide automático durante o redimensionamento
        calculateCarouselMetrics(); // Recalcula e posiciona
        startAutoSlide(); // Reinicia o slide automático
    });
    
    // Opcional: Pausar no hover e reiniciar ao sair (descomente se quiser)
    // const carouselContainer = document.querySelector('.carousel-container');
    // if (carouselContainer) {
    //     carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    //     carouselContainer.addEventListener('mouseleave', startAutoSlide);
    // }
});