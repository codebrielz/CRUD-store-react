import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';
import Swal from 'sweetalert2';
export const Producto = ({producto}) => {
    const {nombre, precio, id} = producto;

    const dispatch = useDispatch();
    let navigate = useNavigate();

    // Confirmar eliminación prod
    const confirmarEliminarProd = (id) => {
        // preguntar al usuario
        Swal.fire({
            title:'Estas seguro de eliminar el producto?',
            text:'No podrás revertir la acción!',
            icon:'warning',
            showCancelButton:true,
            confirmButtonColor:'#3085d6',
            cancelButtonColor:'#d33',
            confirmButtonText:'Si, eliminar!'
        }).then((result)=>{
            if(result.value){
                // pasar al action
                dispatch(borrarProductoAction(id));
                }
            })
        }

        const redireccionarEdicion = (producto)=>{
            dispatch(obtenerProductoEditar(producto))
            navigate(`/productos/editar/${producto.id}`)
        }

  return (
    <tr>
        <td>{nombre}</td>
        <td><span className='font-weight-bold'>{precio}€</span></td>
        <td className="acciones">
            <button type='button' className="btn btn-primary mr-2" onClick={()=>redireccionarEdicion(producto)}>Editar</button>
            <button type='button' className='btn btn-danger' onClick={()=>confirmarEliminarProd(id)}>Eliminar</button>
        </td>
    </tr>
  )
}
