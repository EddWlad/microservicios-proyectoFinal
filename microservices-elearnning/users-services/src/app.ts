import { envs } from './config/envs';
import { PostgresDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { Eureka } from 'eureka-js-client';

(async()=> {
  main();
})();


async function main() {
  await PostgresDatabase.connect({
    dbName: envs.DB_NAME,
      dbUser: envs.DB_USER,
      dbPassword: envs.DB_PASSWORD,
      dbHost: envs.DB_HOST,
      dbPort: envs.DB_PORT,
      synchronize: envs.SYNCHRONIZE,
      logging: envs.LOGGING,
  })
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
  const client = new Eureka({
    instance: {
      app: 'USERS-SERVICE',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      port: {
        '$': envs.PORT,
        '@enabled': true,
      },
      vipAddress: 'USERS-SERVICE',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });
  
  client.start((error: any) => {
    console.log(error || 'Node.js client registered with Eureka server');
  });
}