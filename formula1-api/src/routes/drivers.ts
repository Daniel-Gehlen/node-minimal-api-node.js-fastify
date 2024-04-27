import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Driver } from '../models/Driver';

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  let drivers: Driver[] = [];

  // Get all drivers
  fastify.get('/drivers', async () => {
    return drivers;
  });

  // Add a new driver
  fastify.post<{ Body: Driver }>('/drivers', async (request, reply) => {
    const driver = request.body;
    drivers.push(driver);
    return driver;
  });

  // Get driver by ID
  fastify.get<{ Params: { id: number } }>('/drivers/:id', async (request) => {
    const { id } = request.params;
    const driver = drivers.find((d) => d.id === id);
    if (!driver) throw new Error('Driver not found');
    return driver;
  });

  // Update driver
  fastify.put<{ Params: { id: number }; Body: Driver }>('/drivers/:id', async (request) => {
    const { id } = request.params;
    const updatedDriver = request.body;
    const index = drivers.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Driver not found');
    drivers[index] = { ...drivers[index], ...updatedDriver };
    return drivers[index];
  });

  // Delete driver
  fastify.delete<{ Params: { id: number } }>('/drivers/:id', async (request) => {
    const { id } = request.params;
    const index = drivers.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Driver not found');
    const deletedDriver = drivers.splice(index, 1);
    return deletedDriver;
  });
}

export default routes;
