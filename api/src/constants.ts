/**
 * True if `NODE_ENV` is `production`
 */

export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Address to listen on
 */

export const ADDRESS = process.env.ADDRESS || '0.0.0.0';

/**
 * Port to listen on
 */

export const PORT = +process.env.API_PORT || 3000;

/**
 * Hosts to allow cross-site requests from, comma separated
 */

export const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : [
      'http://localhost:3000',
      'http://localhost:8080',
      'ws://localhost:8080',
    ];

/**
 * Headers to allow via CORS, comma separated
 */

export const CORS_ALLOWED_HEADERS = process.env.CORS_ALLOWED_HEADERS
  ? process.env.CORS_ALLOWED_HEADERS.split(',')
  : ['Content-Type', 'Authorization'];
