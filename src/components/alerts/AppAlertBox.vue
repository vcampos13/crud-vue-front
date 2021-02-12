<template>
  <div class="appAlertBox">
    <v-alert
            prominent
            :value = "displayBox"
            :type = "errorType"
            @click="removeAlertBox"
    >
      <span class="title">{{ this.errorTitle }}</span>
      <span class="text">{{ this.errorMessage }}</span>
    </v-alert>
  </div>
</template>
<script>

export default {
  name: 'AppAlertBox',
  computed: {
    errorType: function() {
        let value = this.$store.getters.getErrorType;
        if(value !== undefined && value !== null) {
            return value;
        } else {
            return "";
        }
    },
    errorTitle: function() {
        let value = this.$store.getters.getErrorTitle;
        if(value !== undefined && value !== null) {
            return value;
        } else {
            return "";
        }
    },
    errorMessage: function() {
        let value = this.$store.getters.getErrorMessage;
        if(value !== undefined && value !== null) {
            return value;
        } else {
            return "";
        }
    },
    displayBox: function() {
        let value = this.$store.getters.getErrorMessage;
        if(value !== undefined && value !== null) {
            return true;
        } else {
            return false;
        }
    }
  },
  mounted() {
      setTimeout(this.removeAlertBox, process.env.VUE_APP_ALERT_BOX_TIME)
  },
  methods: {
      removeAlertBox(){
          this.$store.dispatch('removeAlertBox');
      }
  },
  components: {
  },
  data: () => ({
      alertBox: true,
      tgTimer: null,
  }),
  created () {

  },
}
</script>

<style lang="scss" scoped>
  .appAlertBox{
    position: fixed;
    bottom: 5px;
    right: 10px;
    cursor: pointer;
    z-index: 300;
  }
  .appAlertBox .title{
    font-weight: bold;
    display: flex;
  }
  .appAlertBox .text{
    display: flex;
  }
</style>
