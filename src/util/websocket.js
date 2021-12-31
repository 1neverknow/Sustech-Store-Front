import SockJS from 'sockjs-client';
import websocket from "../../util/websocket";
// import Stomp from 'stompjs';

websocket.stomp = null;
export default {
        // var stomp = null;
        data() {
                return {
                        dataList: []
                };
        },
        // mounted:function(){
        //     this.initWebSocket();
        // },
        // beforeDestroy: function () {
        //     // 页面离开时断开连接,清除定时器
        //     this.disconnect();
        //     clearInterval(this.timer);
        // },
        // methods: {
        //     initWebSocket() {
        //         let url = "http://localhost:8081/webSocket"
        //         let socket = new SockJS(url);
        //         stomp = Stomp.over(socket);
        //         stomp.connect(
        //             {"Authorization":this.$store.getters.getToken,
        //                 "chatId":this.chatId}
        //             // , function (frame) {
        //             //     //用户模式
        //             //     stomp.subscribe("/user/queue", function (res) {
        //             //         $("#userMsg").val(res.body);
        //             //     });
        //             //     stomp.subscribe("/app/subscribe/chat", function (res) {
        //             //         $("#subscribeMsg").val(res.body);
        //             //     });
        //             //     // setConnect(true);
        //             // }
        //             );
        //     },
        //     disconnect() {
        //         if (stomp != null) {
        //             stomp.disconnect();
        //         }
        //     }
        // }
};
