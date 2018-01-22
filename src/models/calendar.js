
export default {

  namespace: 'calendar',

  state: {  // 状态
    text: '',
    todo: '',
    notTodo: '',
    date: 0,
    picture: null
  },

  subscriptions: {
    setup({ dispatch, history }) {  // 监听路由触发动作
    },
  },

  effects: {
    *submit({ payload }, { call, put }) {  // actions
      yield put({
        type: 'save' ,
        payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
