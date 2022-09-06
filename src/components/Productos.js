import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ClockLoader } from 'react-spinners';
import { obtenerProductosAction } from '../actions/productoActions'
import { Producto } from './Producto';

export const Productos = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Consultar API
    const cargarProductos =()=> dispatch(obtenerProductosAction());
    cargarProductos();
  
    return () => {}
  }, [])

  // obtener el state
  const productos = useSelector( state => state.productos.productos );
  const error = useSelector( state => state.productos.error );
  const cargando = useSelector( state => state.productos.loading );
  
  if(cargando)return(<p className='d-flex justify-content-center'><ClockLoader color='green' /></p>)
  return (
    <>
        <h2 className='text-center my-5'>Listado de productos</h2>
        { error && <p className='font-weight-bold alert alert-danger text-center mt-4'>Hubo un error</p>}
        <table className='table table-striped'>
            <thead className='bg-primary table-dark'>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                  productos.length === 0 ? 'No hay productos' : (
                    productos.map((producto) =>(
                      <Producto key={producto.id} producto={producto} />
                    ) )
                  )
                }
            </tbody>
        </table>
    </>
  )
}
