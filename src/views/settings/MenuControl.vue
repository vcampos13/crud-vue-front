<template>
  <v-app class="settings">
    <AppTopBar />
    <transition mode="out-in" name="fade">
      <AppSettingsMenu />
    </transition>
  </v-app>
</template>

<script>
    // @ is an alias to /src
    import AppTopBar from '@/components/core/AppTopBar';
    import AppSettingsMenu from '@/components/settings/AppSettingsMenu';

    export default {
        name: 'MenuControl',
        components: {
            AppTopBar,
            AppSettingsMenu,
        },
        data: () => ({
        }),
        methods: {

        },
    }
</script>

<style lang="scss" scoped>
  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
