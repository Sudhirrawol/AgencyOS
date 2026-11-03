declare module "auth_mfe/AuthApp" {
  import type { ComponentType } from "react";

  const AuthApp: ComponentType;

  export default AuthApp;
}

// Existing Auth MFE declaration
declare module "auth_mfe/AuthApp" {
  import type { ComponentType } from "react";

  const AuthApp: ComponentType;

  export default AuthApp;
}

declare module "auth_mfe/EventBus" {
  export const eventBus: {
    on(eventName: string, callback: () => void): void;

    emit(eventName: string, data?: unknown): void;

    off(eventName: string, callback: () => void): void;
  };
}
