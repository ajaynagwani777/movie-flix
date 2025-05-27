import React from 'react';
import Main from './src/ui/Main';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import Loading from './src/ui/components/Loading';

function App(): React.JSX.Element {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<Loading/>} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
