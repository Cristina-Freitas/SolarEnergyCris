# SolarEnergyCris
Projeto de gerenciamento de energia e unidades consumidoras desenvolvido no M3S1 do FuturoDEV[Ingleses], SENAI-SC

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/Cristina-Freitas/SolarEnergyCris/blob/main/LICENSE) 

## Definições iniciais do projeto
● Projeto desenvolvido em linguagem JavaScript
● Framework/biblioteca = React + vite
● Estrutura de organização das pastas = Atomic design pattern
● Backend simulado com JSON Server
● Biblioteca para consumir os dados da API = fetch
● Biblioteca para Rotas =  React router DOM

### Rotas

A aplicação terá as seguintes rotas:
/dashboard ou /home ou /
/unidades
/geracoes
/login

### API

A aplicação fará requisições para 2 endpoints da API (que serão simuladas através do JSON server)

/unidades
```json
{
  "unidades": [
    {
      "id": "abc",
      "apelido": "Unidade 1",
      "local": "Rua 123",
      "marca": "Marca 1",
      "modelo": "Modelo 1",
      "ativa": true
    },
    {
      "id": "def",
      "apelido": "Unidade 2",
      "local": "Rua 2",
      "marca": "Marca 2",
      "modelo": "Modelo 2",
      "ativa": false
    }
  ]
}
```

OBS: Na rota `/unidades/:id` podemos utilizar os métodos:
- DELETE: para deletar a unidade
- PUT: para atualizar os dados da unidade


/lancamentos
```json
{
  "lancamentos": [
    {
      "id": "123",
      "unidade": "abc",
      "data": "2023-01",
      "total": 100
    },
    {
      "id": "456",
      "unidade": "abc",
      "data": "2023-02",
      "total": 800
    },
    {
      "id": "345",
      "unidade": "def",
      "data": "2023-02",
      "total": 320
    },
    {
      "id": "678",
      "unidade": "def",
      "data": "2023-03",
      "total": 710
    }
  ]
}
```
