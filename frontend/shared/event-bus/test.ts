import { eventBus } from "./eventBus";

const handleLogin = (data?: unknown) => {
  console.log("Login siuccesfull : ", data);
};

const showWelcome = () => {
  console.log("Welcome to agencyos");
};

eventBus.on("login", handleLogin);
eventBus.on("login", showWelcome);

eventBus.emit("login", { userId: 101 });
eventBus.off("login", handleLogin);

eventBus.emit("login");
