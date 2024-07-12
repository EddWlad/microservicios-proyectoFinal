import { Router } from 'express';
import { UserRoutes } from './user/routes';
import { AuthRoutes } from './auth/routes';
import { RoleRoutes } from './role/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { FilesRoutes } from './images/routes';
import { ModuleRoutes } from './module/routes';
import { PermitRoutes } from './permit/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', AuthRoutes.routes );

    router.use('/api/user', UserRoutes.routes);

    router.use('/api/role', RoleRoutes.routes);

    router.use('/api/module', ModuleRoutes.routes );

    router.use('/api/permit', PermitRoutes.routes );

    return router;
  }


}

