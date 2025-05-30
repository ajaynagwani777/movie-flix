declare module 'react-native-config' {
  export interface NativeConfig {
      API_URL: string;
      TOKEN: string;
  }

  export const Config: NativeConfig
  export default Config
}