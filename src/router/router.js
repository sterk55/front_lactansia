import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('../components/loginPagina')
    },
    {
        path: '/main',
        component: () => import('../components/PaginaMain')
    },
    {
        path: '/crear',
        component: () => import('../components/CrearPersona')
    },
    {
        path: '/mostrar',
        component: () => import('../components/MostrarTodos')
    },
    {
        path: '/buscarID',
        component: () => import('../components/BuscarId')
    },
    {
        path: '/editar/:id-:identityCard-:fullName-:birthDate-:phone-:residence-:educationLevel-:employmentStatus-:diseases-:healthService-:medications-:livingWith',
        name: 'editar',
        props: true,
        component: () => import('../components/EditarPerd'),
    },
    {
        path: '/registrarFicha',
        component: () => import('../components/registrarFicha.vue')
    },
    {
        path: '/crearases',
        component: () => import('../components/CrearAsesor')
    },
    {
        path: '/mostrarases',
        component: () => import('../components/MostratAses')
    },
    {
        path: '/buscarasesID',
        component: () => import('../components/BuscarAsesCed')
    },
    {
        path: '/editarases/:ids-:nombres-:direccions-:edads',
        name: 'editarases',
        props: true,
        component: () => import('../components/EditarAse')
    },
    {
        path: '/crearficha/:identityCard',
        name: 'crearficha',
        props: true,
        component: () => import('../components/formularioFicha.vue')
    },
    {
        path: '/buscarficha',
        component: () => import('../components/buscarFichaCedula.vue')
    },
    // Ruta catch-all que redirige a /main
    {
        path: '/:pathMatch(.*)*', // Captura cualquier ruta no definida
        redirect: '/main'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
