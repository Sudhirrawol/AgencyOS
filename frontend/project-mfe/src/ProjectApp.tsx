import "../../shared/ui/agencyos.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";

function ProjectApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default ProjectApp;
