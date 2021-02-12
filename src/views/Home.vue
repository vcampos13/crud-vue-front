<template>
  <v-app class="home">
    <AppTopBar :titleNameSufix="titleNameSufix" />
    <AppMain @onChange="fnTopBarTitle" />
  </v-app>
</template>

<script>
// @ is an alias to /src
import auth from '@/services/authService';
import AppTopBar from '@/components/core/AppTopBar';
import AppMain from '@/components/core/AppMain';

export default {
  name: 'Home',
  components: {
      AppTopBar,
      AppMain,
  },
  data: () => ({
      titleNameSufix: '',
  }),
  methods: {
      logout: function () {
        auth.logout().then(() => {
            this.$router.push('/login');
        });
      },
      fnTopBarTitle(value){
          this.titleNameSufix = value ? ' > '+value : '';
      }
  },
}
</script>
