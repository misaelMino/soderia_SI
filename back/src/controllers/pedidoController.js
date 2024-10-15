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



const updatePedido = async (req, res) => {
  const data = req.body;
  const IdPedido = req.params.id
  data.IdPedido = IdPedido;
  console.log("id pedido: " + IdPedido);
  console.log("data: " +data.IdPedido);
  try {
    await pedidoRepository.updatePedido(data);
    res.status(201).json({ message: 'Pedido actualizado correctamente' });
  }
  catch (error) {
    console.error("Error al actualizar pedido:", error);
    res.status(500).json({ message: 'Error al cargar pedido', error: error.message });
  }

}




module.exports = {
  addPedido,
  updatePedido
};

