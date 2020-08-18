const config = {
  serviceName: process.env.SERVICE_NAME || 'Device',
  servicePort: process.env.SERVICE_PORT || 3010,
  jwtSecret: process.env.JWT_SECRET,
  baseRoute: process.env.BASE_ROUTE || 'api',
};

export { config };
