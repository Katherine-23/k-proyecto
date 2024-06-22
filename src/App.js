import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'; 
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Categorias from './pages/Categorias';
import Productos from './pages/Productos';
import Proveedor from './pages/Proveedores';
import Cliente from './pages/Clientes';
import Login from './components/Login';
import Registro from './components/Registro';
import Ventas from './pages/Ventas';
import Compras from './pages/Compras';
import Marcas from './pages/Marcas';
import NuevaMarca from './pages/NuevaMarca';
import EditarMarca from './pages/EditarMarca';
import NuevaCategoria from './pages/NuevaCategoria';
import EditarCategoria from './pages/EditarCategoria';
import NuevoProducto from './pages/NuevoProducto';
import EditarProducto from './pages/EditarProducto';
import NuevoProveedor from './pages/NuevoProveedor';
import EditarProveedor from './pages/EditarProveedor';
import NuevoCliente from './pages/NuevoCliente';
import EditarCliente from './pages/EditarCliente';
import NuevaVenta from './pages/NuevaVenta';
import EditarVenta from './pages/EditarVenta';
import NuevaCompra from './pages/NuevaCompra';
import EditarCompra from './pages/EditarCompra';
import EditarPerfil from './pages/EditarPerfil';
import { UserProvider } from './components/UserContext';


function App() {

  const API_URL = 'http://localhost:8000/api'; 

  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedor] = useState([]);
  const [clientes, setCliente] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [compras, setCompras] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const redirectToCategorias = () => {
    window.location.href = '/categorias';
  };
  
  const redirectToProductos = () => {
    window.location.href = '/productos';
  };
  
  const redirectToProveedor = () => {
    window.location.href = '/proveedores';
  };
  
  const redirectToCliente = () => {
    window.location.href = '/clientes';
  };
  
  const redirectToVentas = () => {
    window.location.href = '/ventas';
  };
  
  const redirectToCompras = () => {
    window.location.href = '/compras';
  };

  const redirectToMarcas = () => {
    window.location.href = '/marcas';
  }

  const handleAddCategoria = async (nuevaCategoria, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/categorias`, NuevaCategoria);
      setCategorias([...categorias, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar categoría:', error);
    }
  };
  
  const handleAddProducto = async (nuevoProducto, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/productos`, nuevoProducto);
      setProductos([...productos, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };
  
  const handleAddProveedor = async (nuevoProveedor, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/proveedores`, nuevoProveedor);
      setProveedor([...proveedores, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar proveedor:', error);
    }
  };
  
  const handleAddCliente = async (nuevoCliente, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/clientes`, nuevoCliente);
      setCliente([...clientes, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar cliente:', error);
    }
  };
  
  const handleAddCompras = async (nuevaCompra, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/compras`, nuevaCompra);
      setCompras([...compras, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar compra:', error);
    }
  };
  
  const handleAddVentas = async (nuevaVenta, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/ventas`, nuevaVenta);
      setVentas([...ventas, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar venta:', error);
    }
  };

  const handleAddMarcas = async (NuevaMarca, redirectTo) => {
    try {
      const response = await axios.post(`${API_URL}/marcas`, NuevaMarca);
      setMarcas([...marcas, response.data]);
      redirectTo();
    } catch (error) {
      console.error('Error al agregar marca:', error);
    }
  };

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get(`${API_URL}/categorias`);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
  
    obtenerCategorias();
  }, [API_URL]);
  

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/productos`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, [API_URL]);

  useEffect(() => {
    const obtenerProveedor = async () => {
      try {
        const response = await axios.get(`${API_URL}/proveedor`);
        setProveedor(response.data);
      } catch (error) {
        console.error('Error al obtener proveedor:', error);
      }
    };

    obtenerProveedor();
  }, [API_URL]);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const response = await axios.get(`${API_URL}/cliente`);
        setCliente(response.data);
      } catch (error) {
        console.error('Error al obtener cliente:', error);
      }
    };

    obtenerCliente();
  }, [API_URL]);

  useEffect(() => {
    const obtenerVentas = async () => {
      try {
        const response = await axios.get(`${API_URL}/ventas`);
        setVentas(response.data);
      } catch (error) {
        console.error('Error al obtener ventas:', error);
      }
    };

    obtenerVentas();
  }, [API_URL]);

  useEffect(() => {
    const obtenerCompras = async () => {
      try {
        const response = await axios.get(`${API_URL}/compras`);
        setCompras(response.data);
      } catch (error) {
        console.error('Error al obtener compras:', error);
      }
    };

    obtenerCompras();
  }, [API_URL]);

  useEffect(() => {
    const obtenerMarcas = async () => {
      try {
        const response = await axios.get(`${API_URL}/marcas`);
        setMarcas(response.data);
      } catch (error) {
        console.error('Error al obtener marcas:', error);
      }
    };

    obtenerMarcas();
  }, [API_URL]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Categorias categorias={categorias} setCategorias={setCategorias} />} />
        <Route path="/productos" element={<Productos productos={productos} setProductos={setProductos} />} />
        <Route path="/proveedores" element={<Proveedor proveedor={proveedores} setProveedor={setProveedor} />} />
        <Route path="/clientes" element={<Cliente cliente={clientes} setCliente={setCliente} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/ventas" element={<Ventas venta={ventas} setVentas={setVentas} />} />
        <Route path="/compras" element={<Compras compra={compras} setCompras={setCompras} />} />
        <Route path="/marcas" element={<Marcas marca={marcas} setMarcas={setMarcas} />} />
        <Route path="/editarPerfil" element={<EditarPerfil usuarios={usuarios} setUsuarios={setUsuarios} />} />
        <Route
          path="/nueva-categoria"
          element={<NuevaCategoria onAddCategoria={handleAddCategoria} redirectToCategorias={redirectToCategorias} setCategorias={setCategorias} />}
        />
        <Route path="/editar-categoria/:id" element={<EditarCategoria />} />
        <Route
          path="/nuevo-producto"
          element={<NuevoProducto onAddProducto={handleAddProducto} redirectToProductos={redirectToProductos} setProductos={setProductos} />}
        />
        <Route path="/editar-producto/:id" element={<EditarProducto />} />
        <Route
          path="/nuevo-proveedor" 
          element={<NuevoProveedor onAddProveedor={handleAddProveedor} redirectToProveedores={redirectToProveedor} setProveedores={setProveedor} />}
        />
        <Route path="/editar-proveedor/:id" element={<EditarProveedor />} />
        <Route
          path="/nuevo-cliente"
          element={<NuevoCliente onAddCliente={handleAddCliente} redirectToCliente={redirectToCliente} setCliente={setCliente} />}
        />
        <Route path="/editar-cliente/:id" element={<EditarCliente />} />
        <Route
          path="/nueva-venta"
          element={<NuevaVenta onAddVenta={handleAddVentas} redirectToVentas={redirectToVentas} setVentas={setVentas} />}
        />
        <Route path="/editar-venta/:id" element={<EditarVenta />} />
        <Route
          path="/nueva-compra"
          element={<NuevaCompra onAddCompra={handleAddCompras} redirectToCompras={redirectToCompras} setCompras={setCompras} />}
        />
        <Route path="/editar-compra/:id" element={<EditarCompra />} />
        <Route
          path="nueva-marca"
          element={<NuevaMarca onAddMarca={handleAddMarcas} redirectToMarcas={redirectToMarcas} setMarcas={setMarcas} />}
        />
        <Route path="/editar-marca/:id" element={<EditarMarca />} />
      </Routes>
    </div>
  );
}

export default App;
