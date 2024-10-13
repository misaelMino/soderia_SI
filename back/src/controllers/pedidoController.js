const pedidoRepository = require('../repositories/pedidos/pedidoRepository');

const addPedido = async (req, res) => {
    const { data, detallePedido } = req.body;

    try {
      await pedidoRepository.addPedido(data, detallePedido);  //Si no me equivoco tanto aca como en el update deberia crear un objeto de tipo Cliente, tal como se encuentra hoecho en getClientes()
      res.status(201).json({ message: 'Pedido agregado correctamente' });
    } catch (error) {
      console.error("Error al agregar pedido:", error);  // Imprimir el error completo en la consola
      res.status(500).json({ message: 'Error al cargar pedido', error: error.message });  // Enviar el mensaje de error en la respuesta
    }
  };

module.exports = {
    addPedido
};

