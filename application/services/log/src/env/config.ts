const config = {
  serviceName: process.env.SERVICE_NAME || 'Log',
  servicePort: process.env.SERVICE_PORT || 3015,
  jwtSecret: process.env.JWT_SECRET,
  baseRoute: process.env.BASE_ROUTE || 'log',
};

export { config };
