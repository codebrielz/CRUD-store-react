import { types } from "../types";

const initialState = {
    productos:[],
    error:null,
    loading:false,
    productoEliminar:null,
    productoEditar:null
}

export const productosReducer = (state = initialState, action) => {
    switch (action.type) {
        // de esta forma podemos evaluar los dos casos con un mismo scope.
        case types.COMENZAR_DESCARGA_PRODUCTOS:
        case types.AGREGAR_PRODUCTO:
            return{
                ...state,
                loading:action.payload
            }
        case types.AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading:false,
                productos:[...state.productos, action.payload]
            }
        case types.PRODUCTO_ELIMINADO_ERROR:
        case types.DESCARGA_PRODUCTOS_ERROR:
        case types.AGREGAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case types.DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                loading:false,
                error:null,
                productos: action.payload
            }
        case types.OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                productoEliminar:action.payload
            }
        case types.PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                // hacemos el payload aqui para acceder directamente al state del reducer (state.productoEliminar). Filter lo que hace es validar si obtienes lo que estás validando y te lo retorna en un nuevo arreglo.
                productos: state.productos.filter(producto=>producto.id !== state.productoEliminar),
                productoEliminar:null //<-- volvemos a null el productoEliminar
            }
        case types.OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar: action.payload
            }
        default:
            return state;
    }
}
