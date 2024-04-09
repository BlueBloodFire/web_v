// 设置消息

import {Message} from "element-ui";

const showMessage = Symbol('showMessage')

class WangjinMessage {
    [showMessage](type, options, single) {
        // 根据消息内容弹出不同样式的消息
        if(single) {
            if(document.getElementsByClassName('el-message').length === 0) {
                Message[type](options)
            }
        } else {
            Message[type](options)
        }
    }
    info(options, single = true) {
        this[showMessage]('info', options, single)
    }
    warning(options, single = true) {
        this[showMessage]('warning', options, single)
    }
    error(options, single = true) {
        this[showMessage]('error', options, single)
    }
    success(options, single = true) {
        this[showMessage]('success', options, single)
    }
}

export const mymessage = new WangjinMessage()
