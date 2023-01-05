<script>
export default {
  props:['type', 'width'],
  setup(props) {
     const buttonType=props.type
     const width=props.width



     return { buttonType, width }
  },
}
</script>

<template>
<button :type="buttonType" :class="[width ? width : 'w-[90%]']" class="flex items-center justify-center bg-[#0095f6] text-[#fff] text-[2.4rem] py-[1rem] font-[500] rounded-[10px] hover:bg-[#0074cc]"><slot></slot></button>
</template>

<style scoped>

</style>