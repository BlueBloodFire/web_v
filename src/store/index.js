// import Vue from 'vue';
// import Vuex from 'vuex';
// import { Notification } from "element-ui";
// import { getRequest } from "@/utils/api";
// import '../utils/sockjs'
// import '../utils/stomp'
//
// Vue.use(Vuex)
//
// const now = new Date()
//
// const store = new Vuex.Store({
//     // 设置多个变量对应的状态
//     state: {
//         routes: [],
//         sessions: {},
//         hrs: [],
//         currentSession: null,
//         currentHr: JSON.parse(window.sessionStorage.getItem("user")),
//         filterKey: '',
//         stomp: null,
//         isDot: {}
//     },
//
//     // 设置相应的事件状态变化,必须同步执行
//     mutations: {
//         INIT_CURRENTHR(state, hr) {
//             state.currentHr = hr;
//         },
//         initRoutes(state, data) {
//             state.routes = data;
//         },
//         changeCurrentSession(state, currentSession) {
//             Vue.set(state.isDot, state.currentHr.username + '#' + currentSession.username, false);
//             state.currentSession = currentSession
//         },
//         // 设置消息返回的用户状态
//         addMessage(state, msg) {
//             let mss = state.sessions[state.currentHr.username + '#' + msg.to];
//             if(!mss) {
//                 Vue.set(state.sessions, state.currentHr.username + '#' + msg.to, []);
//             }
//             state.sessions[state.currentHr.username + '#' + msg.to].push({
//                 content: msg.content,
//                 date: new Date(),
//                 self: !msg.notSelf
//             })
//         },
//         INIT_DATA(state) {
//             let data = localStorage.getItem('vue-chat-session');
//             if (data) {
//                 state.session = JSON.parse(data);
//             }
//         },
//         INIT_HR(state, data) {
//             state.hrs = data;
//         }
//     },
//
//     // 用于提交事件而不是变更状态,可包含异步操作
//     actions: {
//         connect(context) {
//             context.state.stomp = Stomp.over(new SockJS('/ws/ep'));
//             context.state.stomp.connect({}, success => {
//                 context.state.stomp.subscribe('/user/queue/chat', msg => {
//                     let receiveMsg = JSON.parse(msg.body);
//                     if (!context.state.currentSession || receiveMsg.from != context.state.currentSession.username) {
//                         Notification.info({
//                             title: '【' + receiveMsg.fromNickname + '】 发来一条消息',
//                             message: receiveMsg.content.length > 10 ? receiveMsg.content.substr(0, 10) : receiveMsg.content,
//                             position: 'bottom-right'
//                         })
//                         Vue.set(context.state.isDot, context.state.currentHr.username + '#' + receiveMsg.from, true);
//                     }
//                     receiveMsg.notSelf = true;
//                     receiveMsg.to = receiveMsg.from;
//                     context.commit('addMessage', receiveMsg);
//                 })
//             }, error => {
//
//             })
//         },
//         initData(context) {
//             context.commit('INIT_DATA')
//             getRequest("/chat/hrs").then(resp => {
//                 if (resp) {
//                     context.commit('INIT_HR', resp);
//                 }
//             })
//         }
//     }
// })
//
// store.watch(function (state) {
//     return state.sessions
// }, function (val) {
//     localStorage.setItem('vue-chat-session', JSON.stringify(val));
// }, {
//     deep: true
// })
//
// export default store
