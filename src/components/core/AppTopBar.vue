<template>
    <v-app-bar class="AppTopBar" id="app-bar" absolute app color="transparent" flat>
        <router-link to="/">
            <v-img
                class="mr-3"
                elevation="1"
                fab small
                :src="logoImg"
                contain
                height="100%"
                max-width="50"
            ></v-img>
        </router-link>

        <v-toolbar-title class="hidden-sm-and-down font-weight-light" v-text="titleName+' '+titleNameSufix"/>
        <v-spacer />

        <div class="mx-3" />

        <v-menu bottom left offset-y origin="top right" transition="scale-transition">
            <template v-slot:activator="{ attrs, on }">
                <v-btn name="bt2" class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
                    <v-icon>mdi-account</v-icon>
                </v-btn>
            </template>

            <v-list :tile="false" nav>
                <div>
                    <app-bar-item>
                        <v-btn class="ml-2" min-width="0" text @click="settings">
                            <v-icon>mdi-wrench</v-icon> Settings
                        </v-btn>
                    </app-bar-item>
                    <v-divider></v-divider>
                    <app-bar-item>
                        <v-btn class="ml-2" min-width="0" text @click="logout">
                            <v-icon>mdi-logout</v-icon> Logout
                        </v-btn>
                    </app-bar-item>
                </div>
            </v-list>
        </v-menu>

    </v-app-bar>
</template>

<script>
    import auth from '@/services/authService';

    // Components
    import { VHover, VListItem } from 'vuetify/lib'

    export default {
        name: 'AppTopBar',

        components: {
            AppBarItem: {
                render (h) {
                    return h(VHover, {
                        scopedSlots: {
                            default: ({ hover }) => {
                                return h(VListItem, {
                                    attrs: this.$attrs,
                                    class: {
                                        'black--text': !hover,
                                        'white--text secondary elevation-12': hover,
                                    },
                                    props: {
                                        activeClass: '',
                                        dark: hover,
                                        link: true,
                                        ...this.$attrs,
                                    },
                                }, this.$slots.default)
                            },
                        },
                    })
                },
            },
        },

        props: {
            titleNameSufix: { type: String, default:'' },
        },

        data: () => ({
            titleName: 'My Storage',
            logoImg: process.env.VUE_APP_URL + '/imgs/' + process.env.VUE_APP_SML_LOGO,
        }),

        computed: {

        },

        methods: {
            settings: function () {
                this.$router.push('/settings').catch(()=>{});
            },
            logout: function () {
                if(confirm('Are you sure?')){
                    if(auth.logout()) {
                        this.$router.push('/login').catch(() => {});
                    }
                }
            },
        },
        mounted: function () {
            this.titleName = this.$route.name;
        }
    }
</script>

<style lang="scss">
    .AppTopBar{
        height: 15px;
    }
</style>