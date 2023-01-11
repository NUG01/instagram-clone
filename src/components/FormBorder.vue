<script>
export default {
  props:['width'],
  setup(props) {
    const width=props.width
    


    return {width}
  },
}
</script>

<template>
  <div class="flex items-center gap-[3rem]" :class="[width ? width : 'w-[90%]']">
    <div class="h-[1.2px] w-[100%] bg-[#7b7b7bb4]"></div>
    <p class="text-[2.5rem] text-[#7b7b7bb4] font-[500]">OR</p>
    <div class="h-[1.2px] w-[100%] bg-[#7b7b7bb4]"></div>
  </div>
</template>