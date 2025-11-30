# catback
Projeto Catback

## Integração Dyad (Node.js)

Adicione integração com Dyad usando o scaffold Node.js criado em `src/dyad-client.js`.

- `package.json`: scripts `start` e `test` (executam `example/run.js`).
- `src/dyad-client.js`: exporta `DyadClient` com um *adapter* configurável. Por padrão usa um *mock adapter* que não precisa de dependências externas, útil para testes.
- `example/run.js`: exemplo mínimo que conecta, envia mensagem e fecha.

Como usar (local):

```bash
node example/run.js
```

Para integrar com uma implementação real do Dyad (se houver um pacote npm chamado `dyad` ou SDK semelhante):

1. Instale o pacote real, por exemplo `npm install dyad` (substitua pelo pacote correto).
2. Implemente um adapter que exponha `connect`, `send` e `close` e passe para `new DyadClient({ adapter })`.

Exemplo rápido de adapter usando um hipotético `dyad` npm:

```js
const Dyad = require('dyad');

function createDyadAdapter(config) {
  const conn = new Dyad.Connection(config);
  return {
    connect: async () => conn.open(),
    send: async (msg) => conn.send(msg),
    close: async () => conn.close()
  };
}

const adapter = createDyadAdapter({ host: '...'});
const client = new DyadClient({ adapter });
```

Se desejar, eu posso:
- Instalar e configurar um pacote NPM específico (se você indicar o nome exato do pacote Dyad).
- Substituir o *mock adapter* por um adapter real e adicionar exemplos de integração.