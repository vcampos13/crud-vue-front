<template>
  <v-app>
    <transition
            :name="transitionName"
            mode="out-in"
            @beforeLeave="beforeLeave"
            @enter="enter"
            @afterEnter="afterEnter"
    >
      <router-view></router-view>
    </transition>
    <div>
      <transition
              name="slide-y-reverse-transition"
              mode="out-in"
      >
        <appAlertBox v-if="errorMessage" />
      </transition>
    </div>
  </v-app>
</template>
<script>

import appAlertBox from '@/components/alerts/AppAlertBox';

const DEFAULT_TRANSITION = 'fade';

export default {
  name: 'App',
  data() {
      return {
          prevHeight: 0,
          transitionName: DEFAULT_TRANSITION,
      };
  },
  components: {
      appAlertBox,
  },
  computed: {
      errorMessage: function() {
          return this.$store.getters.getErrorMessage;
      }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }
      this.transitionName = transitionName || DEFAULT_TRANSITION;

      next();
    });
  },
  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
};
</script>

<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: height, opacity;
    transition-timing-function: ease;
    overflow: hidden;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition-duration: 0.5s;
    transition-property: height, opacity, transform;
    transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
    overflow: hidden;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate(2em, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate(-2em, 0);
  }
</style>
