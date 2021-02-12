import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        buttonsData: {},
        errorTitle: '',
        errorType: '',
        errorMessage: '',
    },
    actions: {
        removeAlertBox({ commit }){
            commit('setErrorTitle','');
            commit('setErrorType','');
            commit('setErrorMessage','');
        },
    },
    mutations: {
        setButtonsData(state,arr){
            state.buttonsData = arr;
        },
        addButtonData(state,arr){
            state.buttonsData.push(arr);
        },
        setAlertBox(state,arr){
            state.errorTitle = arr[0];
            state.errorType = arr[1];
            state.errorMessage = arr[2];
        },
        setErrorTitle(state,str){
            state.errorTitle = str;
        },
        setErrorType(state,str){
            state.errorType = str;
        },
        setErrorMessage(state,str){
            state.errorMessage = str;
        },
    },
    getters: {
        getButtonsData:     state => state.buttonsData,
        getErrorTitle:      state => state.errorTitle,
        getErrorType:       state => state.errorType,
        getErrorMessage:    state => state.errorMessage,
    },
    modules: {

    },
});
