/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_HERO_CAR_IMAGE?: string;
  readonly REACT_APP_API_URL?: string;
  readonly REACT_APP_HERO_CAR_IMAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
