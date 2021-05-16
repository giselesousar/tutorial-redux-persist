# Tutorial React Native & Redux Persist

Neste tutorial, serão abordados todos os passos para a criação de aplicativos híbridos utilizando o framework, do Facebook, React Native e como promover o gerenciamento e persistência local de estados desses aplicativos por meio do uso das bibliotecas redux, react-redux e redux-persist.

## Instalando as dependências
Com o projeto React Native já criado, usaremos o npm para instalar as bibliotecas necessárias para este tutorial, a partir da linha de comando:

`npm install redux react-redux redux-persist @react-native-async-storage/async-storage`

## Redux [(doc)](https://redux.js.org/)

A biblioteca Javascript Redux ajuda o desenvolvedor no gerenciamento de estados dentro das aplicações. O gerenciamento acontece de forma centralizada no *store*, onde os estados são armazenados e modificados através de *actions* e *reducers*. O ambiente centralizado permite que os estados sejam compartilhados entre diferentes telas dentro da aplicação. Isso é bastante útil em aplicações de larga escala uma vez que permite à que equipe de desenvolvimento um completo conhecimento sobre o fluxo de dados, reduzindo potenciais bugs.

### Estrutura adotada
    .
    ├── ...
    ├── src                    
    │   ├── ...          
    │   ├── store
    │   |  ├── reducers
    |   |  |  ├── user
    |   |  |  |  ├── actions.ts
    |   |  |  |  └── reducer.ts
    |   |  |  └── rootReducer.ts
    │   |  └── index.ts      
    │   └── ...               
    └── ...
 
### O state
O *state* de uma aplicação corresponde a todas as informações que ela usa e/ou modifica. 
### Actions e Reducers
Essas duas entidades, junstas, modificam o *state*. As *actions* determinam o que será modificado e onde. *Reducers*, por sua vez, especificam como o *state* é modificado. As *actions* são objetos com dois atributos: *type* e *payload*. O *type* é o indentificador de cada *action* e o *payload* é toda a informação necessária para modificar o *state*. Neste tutorial, teremos duas *actions*: SET_USER e CLEAR_USER. A primeira possui um *payload* especificando as informações sobre o usuário que devem ser atribuídas à propriedade *user* do nosso *state*. A última apenas especifica que o atributo *user* deve ser 'limpo', ou seja, deve retornar ao seu estado inicial e, por isso, apenas determinamos o atributo *type* no momento da criação do objeto.

```javascript
// src/store/reducers/user/actions.ts

const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

export const setUserAction = (user: { name: string, phone: string, email: string }) => ({
  type: SET_USER,
  payload: user
});

export const clearNameAction = () => ({
  type: CLEAR_USER
});

```
```javascript
// src/store/reducers/user/reducer.ts

const initialState = {
    user: {
        name: '',
        phone: '',
        email: ''
    }
}

export default (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return { 
                ...state, user: action.payload
            };
        case 'CLEAR_USER':
            return { 
                ...state, ...initialState
            };
        default:
            return state;
    }
}


```
### Combinando Reducers
Uma boa prática em aplicações com muitos reducers, que usam o Redux, é utilizar a função *combineReducers* para unir todos os reducers do projeto em um único, que será usado na criação do store.

```javascript
// src/store/reducers/rootReducer.ts

import { combineReducers } from 'redux';

import user from './user/reducer';

const rootReducer = combineReducers({
  user
});

export default rootReducer;
```

### O store
O store é o objeto onde o state é armazenado. O store é criado a partir do método *createStore()* do Redux, que recebe como argumento o reducer criado. 

```javascript
// src/store/index.ts

import { createStore } from "redux"

import rootReducer from "./reducers/rootReducer"

export default createStore(rootReducer)
```

## React Redux [(doc)](https://react-redux.js.org/)
### Provider
Para que o store esteja disponível em todo o escopo da aplicação, ele é passado para o componente Provider, que importamos da biblioteca react-redux, que envolve nosso componente Routes. Dessa forma, o Provider pode prover acesso ao store nos componentes envoltos por ele e em todos dentro destes.

```javascript
// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
        <Routes/>
    </Provider>
  );
}

```
### Conectando componentes

Nós utilizaremos as hooks disponibilizadas pela biblioteca react-redux para ter acesso às informações sobre os estados e realizar modificações neles, através das actions.

#### useSelector()
Permite que extraiamos dados do state do nosso redux usando uma função seletora. Essa função é invocada sempre que o componente da função é renderizado e sempre que uma *action* é invocada, alterando ou não o state da aplicação.
```javascript
const user: User = useSelector((state: any) => state.user);
```
#### useDispatch()
Para fazer uso desse hook, iremos invocá-lo e armazenar isso em uma constante *dispatch*.
```javascript
const dispatch = useDispatch()
```
Para fazermos o "disptach" de *actions*, importamos em nosso componente as funções anteriormente criadas que retornam o objeto representante da *action*. Passamos a função, então, como argumento para a constante *dispatch*.

```javascript
import { setUserAction, clearUserAction } from '../../store/reducers/user/actions';
...
dispatch(setUserAction({
    name: 'name',
    email: 'email@user.com',
    phone: '3333-4444'
}));
...
dispatch(clearUserAction());
```
## Redux Persist [(doc)](https://github.com/rt2zz/redux-persist)
A biblioteca Redux persist salva localmente o store do Redux de forma persistente. Sempre que a aplicação abrir novamente ou for recarregada, o store é resgatado do armazenamento local. 


### Integrando com o store
Para fazer uso da biblioteca, devemos criar usar o método que *persistReducer* que recebe como parâmetro um objeto com as configurações (chave e storage) e nos retorna um reducer. A partir do reducer retornado, podemos obter o objeto persistor a partir do método *persistStore*, que recebe como paraâmetro nosso store. O objeto é, então, exportado para usarmos no App.tsx.
```javascript
// src/store/index.ts

import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
```

### PersistGate
Envolvemos nossa aplicação com o componente PersistGate, que atrasa a renderização das interfaces da aplicação até que o state persistido tenha sido resgatado e salvo no Redux.

```javascript
// App.tsx

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Routes/>
        </PersistGate>
    </Provider>
  );
}

```
