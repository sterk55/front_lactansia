import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
{
        path: '/',
        component : () => import('../components/loginPagina')
    
},
{
    path: '/main',
    component : () => import('../components/PaginaMain')

},
{
    path: '/crear',
    component : () => import('../components/CrearPersona')

},
{
    path: '/mostrar',
    component : () => import('../components/MostrarTodos')
},
{
    path: '/buscarID',
    component : () => import('../components/BuscarId')
},
{
    path: '/editar/:ids-:nombres-:direccions-:edads',
    name: 'editar',
    props: true,
    component : () => import('../components/EditarPerd')
},
{
    path: '/crearases',
    component : () => import('../components/CrearAsesor')

},
{
    path: '/mostrarases',
    component : () => import('../components/MostratAses')
},
{
    path: '/buscarasesID',
    component : () => import('../components/BuscarAsesCed')
},
{
    path: '/editarases/:ids-:nombres-:direccions-:edads',
    name: 'editar',
    props: true,
    component : () => import('../components/EditarAse')
}



]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router