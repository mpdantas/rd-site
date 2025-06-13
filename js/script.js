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
});