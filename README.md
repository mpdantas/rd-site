# RD Seguros - Site Institucional

Este é um site institucional moderno e responsivo, desenvolvido **integralmente do zero** utilizando **HTML, CSS e JavaScript puros**. O projeto tem como objetivo apresentar a corretora de seguros R&D Grupo, seus serviços, sua história, e oferecer canais de contato diretos e eficientes, tudo com um design limpo e focado na experiência do usuário.

## 🚀 Desafios Superados e Aprendizados

Durante o desenvolvimento deste projeto, diversos desafios de implementação e depuração foram enfrentados e superados, proporcionando um aprendizado aprofundado em:

* **Sintaxe HTML Rigorosa:** Identificação e correção de erros de tags não fechadas e estrutura malformada, que impactavam a renderização e o JavaScript.
* **Depuração de CSS e JavaScript:** Uso avançado das ferramentas de desenvolvedor do navegador para diagnosticar e resolver problemas de layout e funcionalidade.
* **Gerenciamento de Cache:** Técnicas para garantir que as últimas versões dos arquivos fossem carregadas pelo navegador.
* **Comunicação Frontend/Backend (CORS):** Configuração de permissões de comunicação entre o site estático e um servidor Django, lidando com requisições OPTIONS e erros de conexão.
* **Incompatibilidade de Versão Python/Django:** Resolução de problemas de ambiente de desenvolvimento.

## 💻 Tecnologias e Ferramentas Utilizadas

### Frontend

* **HTML5:** Estrutura semântica e acessível das páginas.
* **CSS3:** Estilização completa e responsiva, utilizando Flexbox, Grid e variáveis CSS. **Não utiliza frameworks CSS (como Bootstrap)**.
* **JavaScript (ES6+):** Lógica interativa do lado do cliente.

### Backend (Para Funções Específicas)

* **Python:** Linguagem de programação para o backend.
* **Django:** Framework web para gerenciamento de requisições e envio de e-mails (via SMTP).
* **`django-cors-headers`:** Biblioteca para gerenciar políticas de Cross-Origin Resource Sharing.

### Ferramentas de Desenvolvimento

* **Visual Studio Code (VS Code):** Editor de código.
* **Git:** Sistema de controle de versão.
* **GitHub:** Plataforma para hospedagem de repositório e colaboração.
* **FileZilla (FTP):** Cliente para upload de arquivos para hospedagem.

## 📂 Estrutura do Projeto

rd-site/
├── index.html                  # Página inicial principal
├── nossos-seguros.html         # Página detalhada com todos os seguros oferecidos
├── sobre-nos.html              # Página sobre a história, missão, visão e valores da corretora
├── contato.html                # Página de contato com formulário e mapa de localização
├── css/
│   └── style.css               # Folha de estilo CSS personalizada (todos os estilos do site)
├── js/
│   └── script.js               # Código JavaScript para interatividade das páginas
├── images/                     # Pasta para todas as imagens do site
│   ├── logo.png                # Logo principal da corretora
│   ├── seguro.jpg              # Imagem do banner hero
│   ├── (outras-imagens-seguros).jpg/png/avif # Imagens dos cards de serviço e outros elementos
│   └── (logos-seguradoras).png/jpg/svg       # Logotipos das seguradoras parceiras
├── rd_backend/                 # DIRETÓRIO DO BACKEND DJANGO
│   ├── venv/                   # Ambiente virtual Python
│   └── (estrutura Django...)   # Arquivos do projeto Django
└── README.md                   # Este arquivo (guia do projeto)
└── LICENSE                     # Arquivo de licença do projeto (MIT License)

## ✨ Funcionalidades Implementadas

* **Design Responsivo Completo:** Layout que se adapta fluidamente a telas de desktop, tablet e mobile.
* **Navegação Interativa:** Menu superior fixo com links ativos e botão "hambúrguer" para navegação mobile.
* **Seção Hero Dinâmica:** Banner de destaque na página inicial com chamada para ação direta via WhatsApp.
* **Grade de Serviços Detalhada:** Cards organizados em grade, apresentando diversos tipos de seguros com descrições curtas e botões "Saiba Mais".
* **Popups de Detalhes de Serviço:** Ao clicar em "Saiba Mais", um modal (popup) é exibido com informações detalhadas do seguro e um botão de contato direto via WhatsApp, aprimorando a experiência do usuário.
* **Carrossel de Parceiras (Loop Automático):** Seção dinâmica exibindo logotipos de seguradoras parceiras em um carrossel que roda automaticamente, sem botões de navegação.

* **Páginas Institucionais:**

  * **"Nossos Seguros":** Listagem expandida de seguros com cards detalhados.
  * **"Sobre Nós":** Seções sobre a história, missão, visão e valores da corretora, com cards estilizados.
    * **"Contato":** Informações de contato, formulário com dropdown de assuntos e mapa de localização.
* **Formulário de Contato Direto:** O formulário envia os dados diretamente para o **WhatsApp da corretora** com uma mensagem pré-preenchida, agilizando o atendimento ao cliente.
* **Rodapé Completo:** Estruturado em colunas, com informações de copyright (ano atualizado automaticamente), links úteis e ícones de redes sociais (Facebook, Instagram, WhatsApp) linkados corretamente.

## 🚀 Como Visualizar o Projeto Online

O projeto frontend está hospedado em:
**[SUA_URL_DO_SITE_AQUI]**

*(Substitua `[SUA_URL_DO_SITE_AQUI]` pela URL real do seu site na Locaweb, por exemplo: `https://www.rodriguesedantasseguros.com.br/`)*

## 🛠️ Como Executar o Projeto Localmente (Frontend)

1. **Clone o repositório:**

    ```bash
    git clone [https://github.com/SEU_USUARIO/rd-site.git](https://github.com/SEU_USUARIO/rd-site.git)
    ```

    (Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub).
2. **Navegue até a pasta do projeto frontend:**

    ```bash
    cd rd-site
    ```

3. **Abra o arquivo `index.html` em seu navegador padrão.**
    * Alternativamente, use uma extensão como "Live Server" no VS Code para abrir o projeto com um servidor local simples.

## 📧 Configuração do Backend Django (Opcional - Para Envio de E-mails)

Embora o formulário de contato utilize o WhatsApp, este projeto inclui uma estrutura de backend Django para funções mais avançadas (como o envio de e-mails via SMTP, caso fosse necessário).

1. **Navegue até a pasta do backend:**

    ```bash
    cd rd_backend
    ```

2. **Ative o ambiente virtual:**
    * Windows: `.\venv\Scripts\activate`
    * macOS/Linux: `source venv/bin/activate`
3. **Instale as dependências (se não o fez):**

    ```bash
    pip install django django-cors-headers
    ```

4. **Configure o `rdseguros/settings.py`:**
    * Preencha suas credenciais de e-mail (SMTP) e configurações CORS.
5. **Aplique as migrações:**

    ```bash
    python manage.py migrate
    ```

6. **Inicie o servidor de desenvolvimento:**

    ```bash
    python manage.py runserver
    ```

    O servidor estará acessível em `http://127.0.0.1:8000/`.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
