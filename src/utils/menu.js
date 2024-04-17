import {getRequest} from "@/utils/api";
import {request} from "axios";


let initMenu;
let formatRoutes;
export default initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }
    getRequest("/system/config/menu").then( data => {
        if (data) {
            let fmtRoutes = formatRoutes(data)
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes)
        }
    })
}

export default  formatRoutes = (routes) => {
    let fmRoutes = [];
    routes.forEach( router => {
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children)
        }
        let fmRouter = {
            path : path,
            name : name,
            iconCls : iconCls,
            meta: meta,
            children : children,
            component(resolve) {
                require(['../view/' + component + '.vue'], resolve)
            }
        }
        fmRoutes.push(fmRouter);
    })
    return fmRoutes
}
// export default initMenu = (router, store) => {
//     if (store.state.routes.length > 0) {
//         return;
//     }
//     getRequest("/system/config/menu").then(data => {
//         if (data) {
//             let fmtRoutes = formatRoutes(data)
//             router.addRoutes(fmtRoutes)
//             store.commit('initRoutes', fmtRoutes)
//             store.dispatch('connect')
//         }
//     })
// }

// export default formatRoutes = (routes) => {
//     let fmtRoutes = [];
//     routes.forEach(router => {
//         let {
//             path,
//             component,
//             name,
//             meta,
//             iconCls,
//             children
//         } = router
//         if (children && children instanceof Array) {
//             children = formatRoutes(children)
//         }
//         let fmtRouter = {
//             path: path,
//             name: name,
//             iconCls: iconCls,
//             meta: meta,
//             children: children,
//             component(resolve) {
//                 if (component.startsWith("Home")) {
//                     require(['../views/' + component + '.vue'], resolve);
//                 } else if (component.startsWith("Emp")) {
//                     require(['../views/emp' + component + '.vue'], resolve);
//                 } else if (component.startsWith("Per")) {
//                     require(['../views/per' + component + '.vue'], resolve);
//                 } else if (component.startsWith("Sal")) {
//                     require(['../views/sal' + component + '.vue'], resolve);
//                 } else if (component.startsWith("Sta")) {
//                     require(['../views/sta' + component + '.vue'], resolve);
//                 } else if (component.startsWith("Sys")) {
//                     require(['../views/sys' + component + '.vue'], resolve);
//                 }
//             }
//         }
//         fmtRoutes.push(fmtRouter)
//     })
//     return fmtRoutes
// }
