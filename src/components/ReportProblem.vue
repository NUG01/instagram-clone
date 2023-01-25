<script>
import { useFunctionalityStore } from "@/stores/FunctionalityStore.js";

export default {
  setup() {
        const functionality=useFunctionalityStore()

    return {functionality}
  },
}
</script>

<template>
<div>
<div class="absolute top-0 left-0 w-[100vw] h-[100vh] bg-[#0000009f] z-30" @click="functionality.reportProblem=false"></div>
<div class="absolute top-1/2 left-1/2 bg-[#fff] z-40 modal-anim rounded-[20px]"></div>
</div>
</template>

<style scoped>
.color{
  color:#0000009f;
}
@keyframes animation {
  from {
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40rem;
    opacity: 0.3;
    }
  to {
    transform:translate(-50%, -50%);
    width: 30%;
    height: 30rem;
    opacity: 1;
    }
}

/* The element to apply the animation to */
.modal-anim {
  transform:translate(-50%, -50%);
  opacity: 1;
  width: 30%;
  height: 30rem;
  animation-name: animation;
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}
</style>.