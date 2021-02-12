import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from '@/store';
import auth from '@/services/authService';

Vue.use(VueAxios, axios);

export default {
    loadMainMenu() {
        //If the user is logged, returns the menu items registered in the bank
        if (!auth.isUserLoggedIn()) {
            this.$router.push({name: 'Login'});
        }
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                },
                params: {

                }
            };

            Vue.axios.get(
                process.env.VUE_APP_API_URL+'/menus',
                config
            ).then((response) => {
                if(response !== undefined) {
                    store.commit('setButtonsData',response.data.data);
                    resolve();
                }
            }).catch((error) => {
                store.commit('setButtonsData',{});
                reject(error);
            });
        });
    },
    getMenuData(id) {
        //Retorna os menus filhos com base no filtro do menu informado
        let arrMenu = store.getters.getButtonsData;
        id = id ?? null;
        let filtro = arrMenu.filter(function (el) {
            return el.app_menus_id === id;
        });

         if(id){
             filtro.push(
                 this.getBackMenuStep(id)
             );
         }

        return(filtro);
    },
    getBackMenuStep(id) {
        //Returns the parent menu based on the given menu filter
        let arrMenu = store.getters.getButtonsData;

        let filtro = arrMenu.filter(function (el) {
            return el.id === id;
        });

        let backMenuStep = {
            id: filtro[0].app_menus_id,
            color: 'green darken-1',
            destination: null,
            icon: 'mdi-keyboard-return',
            title: 'Return',
            app_menus_id: null,
        };

        return(backMenuStep);
    },
    getMenuButtonTitle(id) {
        //Returns the title of the menu for use in the title of the screen
        let arrMenu = store.getters.getButtonsData;

        let filtro = arrMenu.filter(function (el) {
            return el.id === id;
        });

        let retorno = filtro.length > 0 ? filtro[0].title : null;

        return(retorno);
    },
};
