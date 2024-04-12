import axios from 'axios'
import {Message} from "element-ui";
// import {mymessage} from "@/utils/mymessage";
// import router from "@/router/router";


axios.interceptors.response.use(success => {
    if( success.status && success.status === 200 && success.data.status === 500 ) {
        Message.error({message: success.data.msg})
        return;
    }
    // if (success.data.msg) {
    //     Message.success({message: success.data.msg})
    // }
    return success.data;
},error => {
    if (error.response.status === 504 || error.response.status === 404) {
        Message.error({message: '服务器连接失败'})
    } else if (error.response.status === 403) {
        Message.error({message: '权限不足，请联系王津！'})
    } else if (error.response.status === 401) {
        Message.error({message: '尚未登录，请登录'})
    } else {
        if (error.response.data.msg) {
            Message.error({message: error.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
})
// 设置依据消息状态弹出相应消息
// axios.interceptors.response.use(success => {
//     // 状态为200且为500的消息列为异常消息
//     if (success.status && success.status === 200 && success.data.status === 500 ) {
//         Message.error({message: success.data.msg})
//         return;
//     }
//     // 状态正常为正常消息
//     if (success.data.msg) {
//         Message.success({message: success.data.msg})
//     }
//     return success.data;
// }, error => {
//     if (error.response.status === 504 || error.response.status === 400) {
//         Message.error({message: '服务器连接不上'})
//     } else if (error.response.status === 403) {
//         Message.error({message: '权限不足，请联系管理员'})
//     } else if (error.response.status === 401) {
//         mymessage.error({message: error.response.data.msg ? error.response.data.msg : '尚未登录，请登录'})
//         router.replace('/');
//     } else {
//         if (error.response.data.msg) {
//             Message.error({message: error.response.data.msg})
//         } else {
//             Message.error({message: '未知错误！'})
//         }
//     }
// })

let base = '';

// 设置post接口
export const postKeyValueRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function (data) {
           let ret = '';
           for( let i in data ) {
               ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&'
           }
           console.log(ret)
           return ret;
        }],

        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    });
}

// 设置post接口
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: '${base}${url}',
        data: params
    })
}

// 设置put接口
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params
    })
}

// 设置get接口
export const getRequest = (url, params) => {
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params
    })
}

// 设置delete接口
export  const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params
    })
}
