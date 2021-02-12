<template>
    <v-main>
        <div class="text-left">
            <transition-group mode="out-in" :name="transMenu">
                <AppMainButton v-for="(button, index) in buttons"
                            :key="`btn${index}`"
                            :id="button.id"
                            :color="button.color"
                            :icon="button.icon"
                            :title="button.title"
                            :destination="button.destination"
                            @clicked="fnOnMenuClick"
                ></AppMainButton>
            </transition-group>
        </div>
    </v-main>
</template>

<script>
    import mainMenu from '@/services/mainMenuService';
    import AppMainButton from '@/components/core/extras/AppMainButton';

    export default {
        name: 'AppMain',
        components: {
            AppMainButton,
        },
        props: {

        },

        data: () => ({
            transMenu: 'menuAnimDE',
            loadMainMenuErro: false,
            buttons: {},
        }),

        computed: {
        },

        methods: {
            fnLoadMainMenu: async function (id) {
                this.buttons = {};
                try {
                    this.loadMainMenuErro = false;
                    await mainMenu.loadMainMenu({
                    }).then(() => {
                        this.buttons = mainMenu.getMenuData(id);
                    });
                } catch (error) {
                    this.fnloadMainMenuErro();
                }
            },
            fnloadMainMenuErro() {
                this.loadMainMenuErro = true;
            },
            fnOnMenuClick(id) {
                this.fnLoadMainMenu(id);
                this.$emit('onChange',mainMenu.getMenuButtonTitle(id));
            },
        },
        mounted: function () {
            this.fnLoadMainMenu();
        },
    }
</script>

<style lang="scss">
    .menuAnimDE-enter-active, .menuAnimDE-leave-active {
        transition: all .5s;
    }

    .menuAnimDE-enter {
        transform: translate(.1rem, 0);
        opacity: 0;
    }
    .menuAnimDE-leave-to {
        transform: translate(-.1rem, 0);
        opacity: 0;
    }

    .menuAnimDE-leave-active {
        position: absolute;
    }
    .menuAnimDE-move {
        transition: all .5s;
    }
</style>