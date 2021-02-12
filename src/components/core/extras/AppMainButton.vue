<template>
    <div class="btnBody">
        <v-btn fab dark large
               v-if="destination !== null"
               :id=id
               :color=color
               :to=destination>
            <v-icon dark>
                {{ icon }}
            </v-icon>
        </v-btn>
        <v-btn fab dark large
               v-else
               :id=id
               @click="fnNavMenu"
               :color=color
               to=''>
            <v-icon dark>
                {{ icon }}
            </v-icon>
        </v-btn>
        <p class="text-center btnSpan">
            {{ title }}
        </p>
    </div>
</template>

<script>
    export default {
        name: 'AppMainButton',

        props: {
            color: { type: String, default: 'light-blue darken-1', },
            icon: { type: String, default: 'mdi-help',},
            title: { type: String, default: '?????', },
            destination: { type: String, },
            id: { type: Number },
        },

        data: () => ({

        }),

        computed: {

        },

        methods: {
            fnNavMenu: function () {
                this.$emit('clicked',this.id);
            },

        },
    }
</script>

<style lang="scss">
    .btnBody{
        width: 80px;
        margin: 0 0 5px 5px; /* t r b l */
        float: left;
        text-align: center;
    }

    .btnSpan{
        font-size: 0.80em;
    }

</style>