# Dashboard Captado - Frontend

Este projeto é o front-end de um sistema de monitoramento de investimentos de clientes. Ele consome dados via WebSocket e exibe dashboards com os valores captados por períodos: anual, semestral, mensal e semanal.

---


## Tecnologias utilizadas

- **React** (com hooks e functional components)
- **TypeScript** (tipagem segura)
- **TailwindCSS** (estilização responsiva e customizável)
- **WebSocket** (conexão em tempo real com o backend)

---


## Estrutura do projeto

C:.
|   .eslintrc.json
|   Dockerfile
|   estrutura.txt
|   next-env.d.ts
|   next.config.js
|   package-lock.json
|   package.json
|   postcss.config.js
|   README.md
|   tailwind.config.ts
|   tsconfig.json
|               
+---public
|       componente.svg
|       next.svg
|       vercel.svg
|       
\---src
    |   AppRoutes.tsx
    |   
    +---app
    |   |   globals.css
    |   |   layout.tsx
    |   |   page.tsx
    |   |   
    |   +---allocations
    |   |   |   page.tsx
    |   |   |   
    |   |   +---components
    |   |   |       AllocationsModal.tsx
    |   |   |       
    |   |   \---interfaces
    |   |           index.ts
    |   |           
    |   +---assets
    |   |       page.tsx
    |   |       
    |   +---clients
    |   |   |   page.tsx
    |   |   |   
    |   |   +---components
    |   |   |       ClientModal.tsx
    |   |   |       
    |   |   \---interfaces
    |   |           ClientModal.ts
    |   |           
    |   +---dashboard
    |   |       index.tsx
    |   |       
    |   +---home
    |   |       page.tsx
    |   |       
    |   \---register
    |           page.tsx
    |           
    +---components
    |       Button.tsx
    |       Header.tsx
    |       LineChart.tsx
    |       Providers.tsx
    |       Sidebar.tsx
    |       ThemeClassController.tsx
    |       ThemeToggle.tsx
    |       
    +---context
    |       ThemeContext.tsx
    |       
    +---hooks
    +---lib
    |       api.ts
    |       
    \---services
        +---allocations
        |   +---data
        |   |       index.ts
        |   |       
        |   \---interfaces
        +---assets
        |   +---data
        |   |       index.ts
        |   |       
        |   \---interfaces
        |           index.ts
        |           
        +---client
        |   +---data
        |   |       index.ts
        |   |       
        |   \---interface
        |           index.ts
        |           
        +---performance
        |   \---data
        |           index.ts
        |           
        +---user
        |   +---data
        |   |       index.ts
        |   |       
        |   \---interface
        |           index.ts
        |           
        \---web_socket
            +---data
            |       index.ts
            |       
            \---interface
                    index.ts


## Configuração e execução

1. **Instalação das dependências**

npm install

2. **Iniciar o servidor de desenvolvimento**

npm run dev

O aplicativo estará disponível em: http://localhost:3000 (ou conforme configurado no seu next.config.js / vite.config.ts).


## Uso

O dashboard exibe:

Filtros para selecionar mês e ano.

Cards com os totais captados: anual, semestral, mensal e semanal.

Tabela com cada cliente e seus valores detalhados.

Os dados são atualizados em tempo real via WebSocket, consumindo o endpoint:
ws://127.0.0.1:8000/ws/captado?month=<month>&year=<year>


## Customização

Estilos: É possível ajustar cores e temas via TailwindCSS (dark mode já suportado).

Filtros de período: O front envia os parâmetros month e year na URL do WebSocket.


## Observações

Certifique-se de que o backend está rodando e que o endpoint WebSocket está disponível.

Os dados apresentados dependem dos registros de clientes e alocações no banco de dados.

Valores monetários são exibidos em BRL (R$), mas podem ser ajustados conforme necessidade.