import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import auth from '@/services/authService';

Vue.use(VueAxios, axios);

export default {
    loadMenuData() {
        //If the user is logged, returns the menu items registered in the bank
        if (!auth.isUserLoggedIn()) {
            auth.goToLogin();
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
                    resolve(response);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    },
    saveMenuData(menu,newMenu) {
        //If the user is logged, save/update the menu in the database
        if (!auth.isUserLoggedIn()) {
            auth.goToLogin();
        }
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'responseType': 'json'
                },
                color:          menu.color,
                icon:           menu.icon,
                title:          menu.title,
                destination:    menu.destination,
                app_menus_id:   menu.app_menus_id,
                params: {

                },
            };

            if (newMenu) {
                Vue.axios.post(
                    process.env.VUE_APP_API_URL + '/menus',
                    config,
                ).then(function (response) {
                    resolve(response);
                }).catch(function (error) {
                    reject(error.response);
                });
            } else {
                Vue.axios.put(
                    process.env.VUE_APP_API_URL + '/menus/' + menu.id,
                    config
                ).then((response) => {
                    if (response !== undefined) {
                        resolve(response);
                    }
                }).catch((error) => {
                    reject(error);
                });
            }
        });
    },
    deleteMenuData(menu) {
        if (!auth.isUserLoggedIn()) {
            auth.goToLogin();
        }
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'responseType': 'json'
                },
                params: {

                },
            };

            Vue.axios.delete(
                process.env.VUE_APP_API_URL + '/menus/' + menu.id,
                config
            ).then((response) => {
                if (response !== undefined) {
                    resolve(response);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    },
    getParent(menu, id) {

        let filtro = menu.filter(function (el) {
            return el.id === id;
        });

        return(filtro);
    },
};
