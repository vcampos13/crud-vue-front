<template>
    <v-card class="mx-auto login" max-width="400">
      <v-card-text class="textBox">
        <v-img
              :src="logoImg"
              class="white--text align-end"
              contain
              height="100px"
        ></v-img>
        <div class="text-center">
          <h1>Crud-Vue-Front</h1>
        </div>
        <div class="text--primary" v-if="!loginIn">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    autocomplete="email"
                    required>
            </v-text-field>
            <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    label="Password"
                    name="password"
                    id="password"
                    autocomplete="current-password"
                    required>
            </v-text-field>
            <v-card-actions>
              <div class="text-center">
                <div class="my-2">
                  <v-btn large :disabled="!valid" color="green darken-3" class="mr-4 displayButton" @click="validate">
                    <span class="white--text">Login</span>
                  </v-btn>
                </div>
                <div class="my-2">
                  <v-btn large color="red darken-3" class="mr-4 displayButton" @click="fgtPass" >
                    <span class="white--text">Forgot Password</span>
                  </v-btn>
                </div>
              </div>
            </v-card-actions>
          </v-form>
        </div>
        <div class="text-center validating" v-else>
          <p>
            <strong>Validating User!</strong>
          </p>
          <v-progress-circular indeterminate color="primary">
          </v-progress-circular>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
// @ is an alias to /src
import auth from '@/services/authService';

export default {
  name: 'Login',
  components: {

  },
  data: () => ({
      logoImg: 'imgs/' + process.env.VUE_APP_BIG_LOGO,
      valid: true,
      loginIn: false,
      password: '',
      passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must be at least 6 characters',
      ],
      email: '',
      emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
  }),
  methods: {
    validate: function () {
        let result = this.$refs.form.validate();
        if(result){
            this.login();
        }
    },
    fgtPass: function () {
        this.$store.commit('setAlertBox',[null,'info','Function disabled!']);
    },
    login: async function () {
      try {
          this.loginIn = true;
          const { email, password } = this;

          await auth.login({
              email: email,
              password: password,
          }).then(() => {
              this.$router.push('/');
          });
      } catch (error) {
          this.loginIn = false;
          this.fnLoginErro();
      }
    },
    fnLoginErro() {
        this.$store.commit('setAlertBox',[null,'error','Incorrect Username or Password!']);
    },
  },
  mounted: function () {
      this.email = 'user@email.com';
      this.password = 'password';
  },
}
</script>

<style lang="scss">
  #inspire {
    padding-top: 10px;
  }
  .textBox{
    min-width: 250px;
  }
  .displayButton {
    width: 100%;
  }
  .validating {
    margin: 20px 0;
    width: 100%;
  }
  .errorBox{
    position: fixed;
    bottom: 5px;
    right: 10px;
  }
</style>
