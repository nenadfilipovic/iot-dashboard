const config = {
  serviceName: process.env.SERVICE_NAME || 'Authentication',
  servicePort: process.env.SERVICE_PORT || 3005,
  jwtSecret: process.env.JWT_SECRET,
  baseRoute: process.env.BASE_ROUTE || 'api',
};

export { config };
