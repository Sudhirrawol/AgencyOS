import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { useEffect } from "react";
import { logoutSuccess } from "./features/auth/authSlice";
import { eventBus } from "../../shared/event-bus/eventBus";

function AuthEventListener() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleLogout = () => {
      dispatch(logoutSuccess());
    };
    eventBus.on("auth:logout", handleLogout);
    return () => {
      eventBus.off("auth:logout", handleLogout);
    };
  }, [dispatch]);
  return <App />;
}

function AuthApp() {
  return (
    <Provider store={store}>
      <AuthEventListener />
    </Provider>
  );
}

export default AuthApp;
