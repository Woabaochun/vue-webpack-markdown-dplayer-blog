import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const k = 'infouserinfouser';

const store = new Vuex.Store({
  state: {
    search:true,
    articleTags:[],
    scrollTop:0,
    keyOne:k,
    popupVal: null,
    previewImgModal: false,
    defaultActive: '全部',
    videoSelect: false,
    editorRou: false,
    editor: null,
    active: '1',
    articleContent: '',
    empty: 'search',
    TOKEN: null,
    ACTIVE: '',
    navigation: true,
    topbor: true,
    avatarimgUrl: '',
    userMessage: null,
    USERNAME: null,
    LOADINGTAG: "login",
    LOADING: false,
    IS_PC: true,
    LOGINSHOW: false,
    POPUP: false,
    Editor: false,
    SELECTACTIVENAME: '',
    selectChange: null,
    videoOptions: null,
    articleTitle: '',
    viewData: {
      id: '',
      type: '',
      article_title: '',
      article_content: '',
      article_tags: [],
      article_url: '',
      article_tabloid: '',
      update_date: '',
      preview_statistics: null,
      path: ''
    },
    listShow: true,
  },
  mutations: {
    setOnSearch(state,value){
      state.search = value
    },
    setArticleTags(state,value){
      state.articleTags = value
    },
    setKeyOne(state,value){
      state.keyOne = value
    },
    getDefaultActive(state) {
      return state.defaultActive
    },
    setDefaultActive(state, value) {
      state.defaultActive = value
    },
    getVideoSelect(state) {
      return state.videoSelect
    },
    setVideoSelect(state, value) {
      state.videoSelect = value
    },
    setListShow(state, value) {
      state.listShow = value
    },
    setArticleTitle(state, value) {
      state.articleTitle = value
    },
    getArticleTitle(state) {
      return state.articleTitle
    },
    setViewData(state, value) {
      state.viewData = value
    },
    getViewData(state) {
      return state.viewData
    },
    setEditorRou(state, value) {
      state.editorRou = value
    },
    getArticleContent(state) {
      return state.articleContent
    },
    setArticleContent(state, value) {
      state.articleContent = value
    },
    setActive(state, value) {
      state.active = value
    },
    setEmptyOptions(state, value) {
      state.empty = value
    },
    setTopbor(state, value) {
      state.topbor = value
    },
    setNavigationOptions(state, value) {
      state.navigation = value
    },
    setActiveOptions(state, value) {
      state.ACTIVE = value
    },
    getVideoOptions(state) {
      return state.videoOptions
    },
    setVideoOptions(state, value) {
      state.videoOptions = value
    },
    getSselectActiveName(state) {
      return state.SELECTACTIVENAME
    },
    setSselectActiveName(state, value) {
      state.SELECTACTIVENAME = value
    },
    showLogingTag(state, value) {
      state.LOADINGTAG = value
    },
    showPOPUP(state) {
      state.POPUP = true
      if (state.popupVal) {
        state.popupVal.hideUserEdit()
      }
    },
    hidePOPUP(state) {
      state.POPUP = false
    },
    showLogin(state) {
      state.LOGINSHOW = true
    },
    hideLogin(state) {
      state.LOGINSHOW = false
    },
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    },
    showLoging(state, value) {
      state.TOKEN = value
    },
    hideLoging(state) {
      state.TOKEN = null
    },
    pcheader(state) {
      state.IS_PC = true
    },
    moveheader(state) {
      state.IS_PC = false
    },
    getIsPc(state) {
      return state.IS_PC
    },
    showEditor(state) {
      state.Editor = true
    },
    hideEditor(state) {
      state.Editor = false
    },
  }
})
export default store
