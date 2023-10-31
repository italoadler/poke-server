const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001; 

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Server rondando.');
});

// Rota para lidar com a finalização da compra
app.post('/checkout', (req, res) => {
  const cartData = req.body;

  if (!Array.isArray(cartData) || cartData.length === 0) {
    return res.status(400).json({ error: 'Dados do carrinho inválidos.' });
  }

  // Calcular o total da compra
  let total = 0;
  for (const item of cartData) {
    total += item.price * item.quantity;
  }

  // Gerar um recibo
  const receipt = {
    items: cartData,
    total,
    date: new Date(),
    // Outros detalhes do recibo, como informações de pagamento, endereço de entrega, etc.
  };

  // Envie o recibo como resposta
  res.json({ message: 'Compra finalizada com sucesso!', receipt });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
