<template>
  <v-main>
    <div class="text-left">
      <transition-group name="testanim">
        <AppMainButton v-for="(button, index) in buttons"
                    :key="`btn${index}`"
                    :id="button.id"
                    :color="button.color"
                    :icon="button.icon"
                    :title="button.title"
                    :destination="button.destination"
        >
        </AppMainButton>
      </transition-group>
    </div>
  </v-main>
</template>

<script>
    import AppMainButton from '@/components/core/extras/AppMainButton';

    export default {
        name: 'AppSettingsMain',
        components: {
            AppMainButton,
        },
        props: {

        },

        data: () => ({
            buttons: [{
                id: 1,
                color: 'light-blue darken-1',
                destination: '/settings/menu',
                icon: 'mdi-menu',
                title: 'Menu Control',
                app_menus_id: null,
            },{
                id: null,
                color: 'green darken-1',
                destination: '/',
                icon: 'mdi-home',
                title: 'Home',
                app_menus_id: null,
            },],
        }),

        computed: {

        },

        methods: {

        },
    }
</script>

<style lang="scss" scoped>
  .testanim-enter-active, .testanim-leave-active {
    transition: all .5s;
  }
  .testanim-enter, .testanim-leave-to {
    transform: translateX(1rem);
    opacity: 0;
  }
  .testanim-leave-active {
    position: absolute;
  }
  .testanim-move {
    transition: all .5s;
  }
</style>
