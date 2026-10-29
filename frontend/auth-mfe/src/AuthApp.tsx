import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

function AuthApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AuthApp;