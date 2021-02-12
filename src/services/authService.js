import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

export default {
    login(credentials) {
        //Performs the login request with the data provided by the user
        return new Promise((resolve, reject) => {
            Vue.axios.post(process.env.VUE_APP_API_URL+'/login', credentials).then((response) => {
                if(response !== undefined){
                    //In case of success, save the token and set the user as logged in
                    const token = 'Bearer '+response.data.data.token;
                    localStorage.setItem('isLogged',true);
                    localStorage.setItem('userApiToken', token);

                    let dt = new Date();
                    dt.setMinutes( dt.getMinutes() + 30 );

                    localStorage.setItem('loginTimeOut', dt);
                    axios.defaults.headers.common['Authorization'] = token;
                    resolve();
                } else {
                    localStorage.setItem('isLogged',false);
                    localStorage.removeItem('userApiToken');
                    localStorage.removeItem('loginTimeOut');
                    delete axios.defaults.headers.common['Authorization'];
                    reject();
                }
            }).catch(() => {
                //In case of failure, keep the login status pending
                localStorage.setItem('isLogged',false);
                localStorage.removeItem('userApiToken');
                localStorage.removeItem('loginTimeOut');
                delete axios.defaults.headers.common['Authorization'];
                reject();
            });
        });
    },
    logout() {
        //Performs the system logout
        localStorage.setItem('isLogged',false);
        localStorage.removeItem('userApiToken');
        localStorage.removeItem('loginTimeOut');
        delete axios.defaults.headers.common['Authorization'];
        return true;
    },
    goToLogin() {
        this.$router.push({name: 'Login'});
    },
    isUserLoggedIn() {
        //Returns if the user is logged in
        if(JSON.parse(localStorage.getItem('isLogged'))) {
             this.isLoginTimeOut();
        }
        return (JSON.parse(localStorage.getItem('isLogged')));
    },
    isLoginTimeOut() {
        //Forces the user to log off in case of inactivity
        let loginTimeOut = new Date(localStorage.getItem('loginTimeOut'));
        let isLoginTimeOut = (new Date() > loginTimeOut);

        if(!loginTimeOut || isLoginTimeOut){
            this.logout();
        } else {

            let dt = new Date();
            dt.setMinutes( dt.getMinutes() + 30 );
            localStorage.setItem('loginTimeOut', dt);
        }
    },
};
