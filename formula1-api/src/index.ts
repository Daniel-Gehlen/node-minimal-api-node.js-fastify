import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import routes from './routes/drivers';

const app = fastify({ logger: true });

// Register CORS
app.register(fastifyCors);

// Register Swagger
app.register(fastifySwagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Formula 1 API',
      description: 'API for Formula 1 drivers management',
      version: '0.1.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
});

// Register routes
app.register(routes);

const start = async () => {
  try {
    await app.listen(3000);
    app.swagger();
    app.log.info(`Server listening on ${app.server.address()}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
