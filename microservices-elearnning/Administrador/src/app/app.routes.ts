import { Routes } from '@angular/router';
import { redirectGuard } from './guards/redirect.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'autenticacion',
        title: 'Autenticacion',
        loadComponent: () => import('./modules/auth/auth.component'),
        children: [
            {
                path: 'login',
                title: 'Login',
                //canActivate: [redirectGuard],
                loadComponent: () =>
                    import('./modules/auth/pages/login/login.component'),
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            }
        ],
    },
    {
        path: 'administrador',
        //canActivate: [authGuard],
        loadComponent: () => import('./modules/admin/admin.component'),
        children: [

            {
                path: '',
                redirectTo: '/administrador/usuarios',
                pathMatch: 'full',
            },
            {
                path: 'usuarios',
                title: 'Usuarios',
                loadComponent: () =>
                    import('./modules/admin/pages/users/users.component'),
            },
            {
                path: 'roles',
                title: 'Roles',
                loadComponent: () =>
                    import('./modules/admin/pages/roles/roles.component'),
            },
            {
                path: 'cursos',
                title: 'Cursos',
                loadComponent: () =>
                    import('./modules/admin/pages/courses/courses.component'),
            },
        ]
    },
    {
        path: '',
        redirectTo: '/administrador',
        pathMatch: 'full',
    },
    {
        path: '**',
        loadComponent: () => import('./shared/error/error404/error404.component'),
    },
];
