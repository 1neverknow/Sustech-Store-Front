import Vue from 'vue'
import Vuex from 'vuex'
import avatar from "../assets/default.png";
import group from "../assets/default_group.png";
import user from "../assets/user.jpeg";
import el from "element-ui/src/locale/lang/el";

Vue.use(Vuex)

// 数据状态管理 - 多个组件的数据交流
// store的内容更新之后，会通知到每个组件。这样就可以达到多个组件数据同步的效果
export default new Vuex.Store({
    state: {
        // token和userInfo具体指的是什么？
        token: localStorage.getItem('token'),
        // 后端发送过来的用户信息
        userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
        name : 'user1',
        message : 1,
        modify_pos: '#test',

        // token: "",
        isShowExpression: false,
        isShowMembers: false,
        isShowMemberInfo: false,
        isShowMyInfo: false,
        isShowChatterInfo: false,
        isShowSearch: false,
        chatCount: 1,
        currentTabIndex: 0,
        currentRight: 0,
        currentLinkman: 0,
        myself: {
            id: "p0",
            avatar: user,
            nickname: "你自己",
            gender: "",
            alias: "",
            region: ""
        },
        chats: [
            {
                chatId: 0,
                linkmanIndex: 1,
                // isMute: false,
                // isOnTop: false,
                messages: [
                    {
                        avatar,
                        ctn: "你好",
                        nickname: "用户一",
                        sender: "p1",
                        time: new Date("2011-01-11 11:11:11"),
                        type: "chat"
                    },
                    {
                        avatar,
                        ctn: "你好",
                        nickname: "用户一",
                        sender: "p5",
                        time: new Date("2011-01-11 10:11:14"),
                        type: "chat"
                    }
                ]
            },
            // {
            //     chatId: 1,
            //     linkmanIndex: 1,
            //     isMute: false,
            //     isOnTop: false,
            //     messages: [
            //         {
            //             avatar,
            //             ctn: "你好",
            //             nickname: "111",
            //             // sender: "1",
            //             time: new Date("2011-01-11 9:11:11"),
            //             type: "chat"
            //         }
            //     ]
            // }
        ],
        linkmans: [
            {
                id: "g1",
                type: "group",
                members: ["p1", "p2"],
                nickname: "这是群组",
                gender: "",
                alias: "",
                region: "这是地区",
                avatar: group
            },
            {
                id: "p1",
                type: "A",
                nickname: "用户一",
                gender: "",
                alias: "",
                region: "这是地区",
                avatar
            },
            {
                id: "p2",
                type: "B",
                nickname: "用户二",
                gender: "",
                alias: "这是备注",

                region: "这是地区",
                avatar
            }
        ],
        currentChatId: -1



    },
    // mounted() {
    //     this.setInitialChatList();
    // },
    mutations: {
        // setter
        // 通过mutation，可以对token，userInfo进行赋值
        SET_TOKEN: (state, token) => {
            state.token = token
            // 可以通过token继续获取userInfo的信息
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            // 登录之后，一次会话期间，保留登陆状态
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        },

        REMOVE_INFO: () => {
            // 清除token和userInfo的值
            this.state.token = ''
            this.state.userInfo = {}
            localStorage.setItem('token', '')
            sessionStorage.setItem('userInfo', JSON.stringify(''))
        },

        setExpression(state, isShowExpression) {
            if (isShowExpression) {
                state.isShowMembers = false;
                state.isShowMemberInfo = false;
                state.isShowMyInfo = false;
                state.isShowChatterInfo = false;
            }
            state.isShowExpression = isShowExpression;
        },
        setMembers(state, isShowMembers) {
            if (isShowMembers) {
                state.isShowExpression = false;
                state.isShowMyInfo = false;
                state.isShowChatterInfo = false;
            }
            state.isShowMembers = isShowMembers;
        },
        setMemberInfo(state, isShowMemberInfo) {
            state.isShowMemberInfo = isShowMemberInfo;
        },
        setChatterInfo(state, isShowChatterInfo) {
            if (isShowChatterInfo) {
                state.isShowMembers = false;
                state.isShowMemberInfo = false;
                state.isShowExpression = false;
                state.isShowMyInfo = false;
            }
            state.isShowChatterInfo = isShowChatterInfo;
        },
        setMyInfo(state, isShowMyInfo) {
            if (isShowMyInfo) {
                state.isShowMembers = false;
                state.isShowMemberInfo = false;
                state.isShowExpression = false;
                state.isShowChatterInfo = false;
            }
            state.isShowMyInfo = isShowMyInfo;
        },
        setCurrentTab(state, tabIndex) {
            state.currentTabIndex = tabIndex;
        },
        setCurrentRight(state, rightIndex) {
            state.currentRight = rightIndex;
        },
        setCurrentLinkman(state, index) {
            state.currentLinkman = index;
        },
        hideAll(state) {
            state.isShowMembers = false;
            state.isShowMemberInfo = false;
            state.isShowExpression = false;
            state.isShowChatterInfo = false;
            state.isShowMyInfo = false;
            state.isShowSearch = false;
        },
        setChatId(state, id) {
            state.currentChatId = id;
            state.currentRight = 0;
        },
        setSearch(state, isShowSearch) {
            state.isShowSearch = isShowSearch;
        },
        sendMessage(state, msg) {
            for (let chat of state.chats) {
                if (chat.chatId === state.currentChatId) {
                    chat.messages.push(msg);
                    break;
                }
            }
        },
        addChat(state, linkmanIndex) {
            state.currentTabIndex = 0;
            state.currentRight = 0;
            for (let i = 0; i < state.chats.length; i++) {
                let chat = state.chats[i];
                if (chat.linkmanIndex === linkmanIndex) {
                    state.chats.splice(i, 1);
                    state.chats = [chat].concat(state.chats);
                    state.currentChatId = chat.chatId;
                    return;
                }
            }
            state.chats = [
                {
                    linkmanIndex,
                    chatId: state.chatCount,
                    isMute: false,
                    isOnTop: false,
                    messages: []
                }
            ].concat(state.chats);
            state.currentChatId = state.chatCount;

            state.chatCount += 1;
        },
        setInitialChatList(state,chatList){
            console.log(chatList.length)
            for (let i = 0; i < chatList.length; i++) {
                console.log('fuck')
                let history = chatList[i];
                let chatId=history.chatId;
                // state.currentTabIndex = 0;
                // state.currentRight = 0;
                console.log(history)
                for (let i = 0; i < state.chats.length; i++) {
                    let chat = state.chats[i];
                    let temp=chat.messages;
                    if (chat.chatId === chatId) {
                        console.log(chat.messages)
                        chat.messages.push(history.messages)
                        console.log(chat.messages)
                        // chat.messages.push();
                        // state.chats = [chat].concat(state.chats);
                        state.currentChatId=chatId;
                        break;
                    }
                }
                state.chats = [history].concat(state.chats);
                state.currentChatId=chatId;
                // console.log(state.chats)
            }
        },
        logout (state) {
            state.token = null
            state.userInfo = null
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        },
    },
    getters: {
        // get
        // 获取token，userInfo的方法
        getUser: state => {
            return state.userInfo
        },
        getToken: state =>{
            return state.token
        }
        // user: state => state
    },
    actions: {
    },
    modules: {
    },
})
