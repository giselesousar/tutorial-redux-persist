# Tutorial React Native & Redux Persist

Neste tutorial, serão abordados todos os passos para a criação de aplicativos híbridos utilizando o framework, do Facebook, React Native e como promover o gerenciamento e persistência local de estados desses aplicativos por meio do uso das bibliotecas redux, react-redux e redux-persist.

## Redux [(doc)](https://redux.js.org/)

A biblioteca Javascript Redux ajuda o desenvolvedor no gerenciamento de estados dentro das aplicações. O gerenciamento acontece de forma centralizada no *store*, onde os estados são armazenados e modificados através de *actions* e *reducers*. O ambiente centralizado permite que os estados sejam compartilhados entre diferentes telas dentro da aplicação. Isso é bastante útil em aplicações de larga escala uma vez que permite à que equipe de desenvolvimento um completo conhecimento sobre o fluxo de dados, reduzindo potenciais bugs.

### Estrutura adotada
    .
    ├── ...
    ├── src                    
    │   ├── ...          
    │   ├── store
    │   |  ├── reducers
    |   |  |  ├── account
    |   |  |  |  ├── actions.ts
    |   |  |  |  └── reducer.ts
    |   |  |  └── rootReducer.ts
    │   |  └── index.ts      
    │   └── ...               
    └── ...
 
### Eentendo os componentes
#### O state
O *state* de uma aplicação corresponde a todas as informações que ela usa e/ou modifica. 
#### Actions e Reducers
Essas duas entidades, junstas, modificam o *state*. As *actions* determinam o que será modificado e onde. *Reducers*, por sua vez, especificam como o *state* é modificado. As *actions* são objetos com dois atributos: *type* e *payload*. O *type* é o indentificador de cada *action* e o *payload* é toda a informação necessária para modificar o *state*. Neste tutorial, teremos duas *actions*: SET_NAME e CLEAR_NAME. A primeira possui um *payload* especificando qual string deve ser atribuída à propriedade *name* do nosso *state*. A última apenas especifica que o atributo *name* deve ser 'limpo', ou seja, deve retornar ao seu estado inicial e, por isso, apenas determinamos o atributo *type* no momento da criação do objeto.

```javascript
const SET_NAME = 'SET_NAME';
const CLEAR_NAME = 'CLEAR_NAME';

export const setNameAction(name: String) => ({
  type: SET_NAME,
  payload: name
});

export const clearNameAction() => ({
  type: CLEAR_NAME
});
