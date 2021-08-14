// Note: Snowpack uses `import.meta.env` instead of `process.env`

/**
 * True if `NODE_ENV` is `production`
 */

export const isProduction = import.meta.env.NODE_ENV === 'production';

/**
 * Backend API URL
 */

export const API_URL =
  import.meta.env.SNOWPACK_PUBLIC_API_URL || `http://localhost:3000/`;

/**
 * Backend API WebSocket URL
 */

export const WS_URL =
  import.meta.env.SNOWPACK_PUBLIC_WS_URL || `ws://localhost:3000/`;
