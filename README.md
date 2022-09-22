# Next Level Week Esports - Backend
Durante a Next Level Week disponibilizada pela Rocketseat, participei da trilha Ignite, onde foi desenvolvido uma aplicação dividida em backend, frontend web e frontend mobile. Este repositório demonstra os códigos desenvolvidos do backend durante todos os dias do evento.
## O backend possui quatro rotas
- Rotas com método http GET:
  - **/games**: Rota responsável por retornar uma lista de jogos que está no server Sqlite.
  - **/games/:id/ads**: Rota responsável por retornar um jogo específico através do id.
  - **/ads/:id/discord**: Rota responsável por retornar o id do discord de quem fez um anúncio específico para um jogo específico
- Rota com método http POST:
  - **/games/:id/ads**: Rota de criação de anúncios para um jogo específico
## As principais tecnologias utilizadas no backend foram:
- Node.js
- Typescript
- Prisma ORM
- Sqlite
- Express.js
