# CONFIGURAR REDUX
```
npm i react-redux redux redux-thunk
```
* redux-thunk se utiliza para ejecutar funciones asyncronas en redux. 

#### Creamos nuestro archivo store.js y realizamos los siguientes pasos:
* 1 - Importamos de redux los siguientes metodos: createStore, applyMiddleware, compose
** applyMiddleware, esto lo utilizamos ya que vamos a hacer uso de thunk, y lo que hace applyMiddleware es agregarlo como parte de la store.

```
import {legacy_createStore as createStore, applyMiddleware, compose} from 'redux';
```

* 2 - Importamos Thunk
```
import thunk from 'redux-thunk';
```

#### Siempre que creamos una store se requiere un reducer, el reducer es cada pieza, por ejemplo; usuarios, productos, clientes... cada uno de ellos tendrá su propio estado, pero al final todos deben estár juntos en uno solo.
* Para unirlos vamos a crear dentro del folder src la siguiente carpeta: reducers y dentro de esa carpeta creamos el archivo que unira todos los estados: index.js

#### src/reducers/index.js:
* importamos combineReducers de redux, para combinar todos los reducers de la aplicación (los estados de cada componente..), es decir, cada reducer tiene su propio state.
```
import { combineReducers } from "redux";
```

* creamos el primer reducer dentro de la carpeta reducers, llamado productosReducer.js

#### src/reducers/productosReducer.js:
* empezamos creando una constante que inicie el estado inicial de mi reducer:
```
const initialState = {}
```
* en el paso de initialState tenemos que pensar que tendrá el componente para pasar los datos como initialState... en este caso sería por ejemplo: productos: []:
```
const initialState = {
    productos:[], //<-- el valor inicial de productos será un arreglo vacio, ya que cuando hagamos la petición se llenara este arreglo
    error: false o null,
    loading: false
}
```

* Creamos una funcion que será la encargada de indicar que tipo de acción estamos realizando:
```
export const productosReducer = (state = initialState, action) => {}
```
* le pasamos el state (por defecto nuestro initialState y la acción que va a ejecutar)
* hacemos uso del switch para realizar validaciones sobre el tipo de accion que estamos llamando:
```
const productosReducer = (state = initialState, action) => {
    switch (action.type) { //<-- action.type es el tipo de accion que recibe y valida despues...    
        default:
            return state;
    }
}
```

#### src/reducers/index.js:
* importamos el reducer que hemos creado...
```
import { productosReducer } from "./ProductosReducer";
// puedes tener multiples reducers y los vas a importar todos aqui..
```
* para poder utilizar todos los reducers vamos a utilizar lo que anteriormente importamos... el combineReducers:
```
export default combineReducers({
    productos: productosReducer
})
```

#### src/store.js:
* creamos la store importando createStore (en el caso de ahora se llama legacy_createStore) pero yo utilizo la palabra reservada (as) para darle un alias y renombraro a createStore, seguidamente hacemos uso de ese metodo y vamos a abrir parentesis e indicar que recibimos los reducers, utilizamos el compose y dentro de sus parentesis hacemos uso del applyMiddleware y dentro de los parentesis de applyMiddleware el thunk mencionado anteriormente, salimos de los parentesis de applyMiddleware, colocamos una coma y vamos a indicar el siguiente codigo para utilizar react developer tools:
```
import reducers from './reducers';

export const store = createStore(
    reducers,
    compose( applyMiddleware(thunk),
        // Codigo para utilizar redux-developer-tools
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)
```

#### src/app.js:
* importamos el provider para utilizar la store de redux y tambien importamos la store
```
import { Provider } from 'react-redux';
import { store } from './store';
```
* Ahora hacemos uso del componente Provider y pasamos por props el store:
```
 <BrowserRouter>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos/nuevo" element={<NuevoProducto />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
```

## PRIMERAS ACCIONES DE REDUX

* Creamos en src/ una carpeta llamada types, los types solamente describen que está pasando en tu aplicación.
* dentro de types creamos el archivo index.js (o el nombre que queramos)... estos types usualmente se utilizan tanto en el action como en el reducer...
src/types/index.js:
```
export const types = {
    AGREGAR_PRODUCTO: '@AGREGAR_PRODUCTO',
    AGREGAR_PRODUCTO_EXITO: '@AGREGAR_PRODUCTO_EXITO',
    AGREGAR_PRODUCTO_ERROR: '@AGREGAR_PRODUCTO_ERROR'
}
```

#### src/reducers/productosReducer:

* Importamos los types dentro de nuestro archivo:
```
import { types } from "../types";
```

* dentro de src/ creamos una carpeta llamada actions y dentro un archivo llamado productoActions.js, y esta son las funciones que modifican el state del reducer

#### src/actions/productoActions:
* Importamos los types 
```
import { types } from "../types";
```

* Primer action para crear nuevos productos:
```
export const crearNuevoProductoAction = () => {
    return()=>{
        console.log('desde action');
    }
}
```
#### src/components/NuevoProducto:

* importamos dos hooks de react-redux: useDispatch y useSelector
* importamos nuestra action:

```
import {useDispatch, useSelector} from 'react-redux'
import { crearNuevoProductoAction } from "../actions/productoActions";
...
const dispatch = useDispatch();
```

* el dispatch se utiliza para disparar una accion creada por nosotros, entonces es lo que vamos a hacer:
```
const agregarProducto = () => dispatch(crearNuevoProductoAction())
//y lo llamamos al metodo submitNuevoProducto:
  const submitNuevoProducto = (e) => {
        e.preventDefault();
        agregarProducto();
    }
```

* nuestro nuevo producto tiene un nombre (nombre del producto) y un precio (el precio del mismo), entonces nuestro metodo agregarProducto recibe un objeto con estas propiedades y se lo pasamos a nuestro action.
```
 const submitNuevoProducto = (e) => {
        e.preventDefault();
        agregarProducto({nombre, producto});
    }
```
* por ende, tenemos que indicar que nuestro metodo agregarProducto recibe 1 parametro (ya que estamos enviando 1 objeto...), a continuación en los parentesis de la acción le pasamos el objeto que recibimos en el metodo.
```
const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto))
```

# src/action/productoActions:
* recibimos el objeto para trabajar con el en la acción
```
export const crearNuevoProductoAction = (producto) => {
    return()=>{
        console.log(producto);
    }
}
```

* Borramos el console.log y vamos a proceder a escribir en el return la palabra dispatch, ya que nuestro return puede disparar una acción.
```
export const crearNuevoProductoAction = (producto) => {
    return(dispatch)=>{
        dispatch();
    }
}
```
* creamos nuestro metodo que será disparado por el return para poder trabajar con la data que recibimos en nuestro metodo crearNuevoProductoAction:
```
export const crearNuevoProductoAction = (producto) => {
    return(dispatch)=>{
        dispatch(agregarProducto());
    }
}
const agregarProducto = () => ({
    type: types.AGREGAR_PRODUCTO
    //le podemos colocar un payload, payload es la parte que modifica los datos recibidos. (no es obligatorio utilizarlo.)
})
```
* SIEMPRE que definimos una funcion en nuestro action, tenemos que definirlo en el reducer.

#### src/reducers/productosReducer.js
```
 switch (action.type) {
    case types.AGREGAR_PRODUCTO:
        return{
            ...state, //<-- copia del state
            loading:true //<-- loading a true ya que está cargando el producto.
    }
        default:
            return state;
    }
```

#### src/actions/productoActions:
* tenemos dos types más que son para saber si el proceso ha sido un exito o ha tenido algún inconveniente... Entonces vamos a realizar la validación para que en caso de tener un error capturarlo.
```
export const crearNuevoProductoAction = (producto) => {
    return(dispatch)=>{
        dispatch(agregarProducto());

         try {
            dispatch(agregarProductoExito(producto)) //<-- ya que es exitoso le pasamos el producto para que modifique el state.
        } catch (error) {
            dispatch(agregarProductoError(true));
        }
    }
}
```
* Como con el metodo agregarProductoExito vamos a modificar el state, tenemos que pasarle un payload:
```
const agregarProductoExito = (producto) => ({ //<-- lo que está en el parentesis es el action.
    type: types.AGREGAR_PRODUCTO_EXITO,
    payload: producto //<-- enviamos los nuevos datos de un nuevo producto.
})
```
* y lo agregamos en nuestro reducer (src/reducers/productosReducer):
```
case types.AGREGAR_PRODUCTO_EXITO:
    return{
        ...state, //<--copia del state anterior
        loading:false, //<-- ya que ya realizó la carga
        productos: [...state.productos //<-- copia de los productos anteriores del array, action.payload //<-- el payload con el estado modificado que viene del action]
    }
```

#### src/actions/productoActions:
* ahora vamos a definir el metodo de error:
```
const agregarProductoError = (estado) => ({ //<-- el estado es el true que anteriormente hemos escrito en el parametro.
    type: types.AGREGAR_PRODUCTO_ERROR,
    payload: estado
})
```

#### src/reducers/productosReducer:
```
   case types.AGREGAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload // <-- error true
            }
```

#### src/actions/productoActions:
* Una vez configurado el archivo config/axios.js (una simple configuración de axios para hacer uso (mirar archivo)) vamos a crear la instancia o utilizar ese archivo aqui (pasamos el return a async/await)
```
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
```
## Acceder al state del store
#### src/components/NuevoProducto:
* Para acceder al state del store vamos a hacer uso del useSelector
```
  // acceder al state del store
  const cargando = useSelector((state) => state);
  console.log(cargando);
```

## Inicializar servidor json-server:
```
json-server --watch --port=4000 db.json
```