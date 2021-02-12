<template>
  <v-app class="settings">
    <AppTopBar />
    <transition mode="out-in" name="fade">
      <AppSettingsMain />
    </transition>
  </v-app>
</template>

<script>
    // @ is an alias to /src
    import AppTopBar from '@/components/core/AppTopBar';
    import AppSettingsMain from '@/components/settings/AppSettingsMain';

    export default {
        name: 'Settings',
        components: {
            AppTopBar,
            AppSettingsMain,
        },
        data: () => ({
        }),
        methods: {

        },
    }
</script>

<style lang="scss">
  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to, .fade-leave-active /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
