import Swal from "sweetalert2";
import { clienteAxios } from "../config/axios";
import { types } from "../types";

export const crearNuevoProductoAction = (producto) => {
    return async (dispatch)=>{
        dispatch(agregarProducto());
        try {
            //insertar en la API
            await clienteAxios.post('/productos',producto) //<-- señalamos a que path queremos dirigirnos de la api (localhost:4000/productos) y mandamos la data.
            dispatch(agregarProductoExito(producto))
        } catch (error) {
            console.log(error);
            dispatch(agregarProductoError(true));
        }
    }
}

const agregarProducto = () => ({
    type: types.AGREGAR_PRODUCTO,
    payload:true
})

const agregarProductoExito = (producto) => ({
    type: types.AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

const agregarProductoError = (estado) => ({
    type: types.AGREGAR_PRODUCTO_ERROR,
    payload: estado
});


// funcion que descarga los productos de la base de datos
export const obtenerProductosAction = () => {
    return async(dispatch)=>{
        dispatch(descargarProductos());
        try {
            setTimeout(async() => {
                const respuesta = await clienteAxios.get('/productos');
                dispatch(descargaProductosExitosa(respuesta.data));
            }, 200);
        } catch (error) {
            dispatch(descargaProductosError())
        }
    }
}

const descargarProductos = () => ({
    type:types.COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type:types.DESCARGA_PRODUCTOS_EXITO,
    payload:productos
})

const descargaProductosError = () => ({
    type:types.DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export const borrarProductoAction = (id) => {
    return async(dispatch)=>{
        dispatch(obtenerProductoEliminar(id));

        try {
            const resultado = await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito())
            Swal.fire(
                'eliminado!',
                'Tu producto ha sido eliminado.',
                'success'
                )
        } catch (error) {
            dispatch(eliminarProductoError(true))
        }
    }
}

const obtenerProductoEliminar = (id) =>({
    type: types.OBTENER_PRODUCTO_ELIMINAR,
    payload:id
})

const eliminarProductoExito = () => ({
    type:types.PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type:types.PRODUCTO_ELIMINADO_ERROR,
    payload:true
})

// colocar producto edición

export const obtenerProductoEditar = (producto)=>{
    return(dispatch)=>{
        dispatch(obtenerProductoEditarAction(producto));
    }
}

const obtenerProductoEditarAction = (producto) => ({
    type: types.OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un registro en la API y State
export const editarProductoAction = (producto)=>{
    return async(dispatch)=>{
        dispatch(editarProducto(producto))
        try {
            const result = await clienteAxios.put(`/productos/${producto.id}`, producto)
            console.log(result);
        } catch (error) {
            
        }
    }
}

const editarProducto = (producto) => ({
    type: types.COMENZAR_EDICION_PRODUCTO,
    payload:producto
})