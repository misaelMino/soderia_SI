const pedidoRepository = require('../repositories/pedidos/pedidoRepository');

const addPedido = async (req, res) => {
  const { data, detallePedido } = req.body;
  try {
    await pedidoRepository.addPedido(data, detallePedido);  //Si no me equivoco tanto aca como en el update deberia crear un objeto de tipo Cliente, tal como se encuentra hoecho en getClientes()
    res.status(201).json({ message: 'Pedido agregado correctamente' });
  } catch (error) {
    console.error("Error al agregar pedido:", error); 
    res.status(500).json({ message: 'Error al cargar pedido', error: error.message });  
  }
};

//getAllPedidos
const getAllPedidos = async (req, res) => {
  try {
      const clientesData = await pedidoRepository.getAllPedidos(); 
      res.json(clientesData); 
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos' });
  }
};

const getPedidoCompletoById = async (req, res) => {
  const data = req.body;
  const IdPedido = req.params.id
  data.IdPedido = IdPedido;
  console.log(data.IdPedido + " este es el ID");
  try {
      const pedidoData = await pedidoRepository.getPedidoCompletoById(data.IdPedido); // datos JSON desde la base de datos
      res.json(pedidoData);
     
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener cliente, pedido inexistente' });
  }
};



const updatePedido = async (req, res) => {
  const data = req.body;
  const IdPedido = req.params.id
  data.IdPedido = IdPedido;
  console.log("id pedidoAAAAA: " + IdPedido);
  console.log("dataAAAAAA: " +data.IdPedido);
  console.log(data);
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
  updatePedido,
  getAllPedidos,
  getPedidoCompletoById
};

