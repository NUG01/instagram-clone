<script>
export default {
  props:['type'],
  setup(props) {
     const buttonType=props.type



     return { buttonType }
  },
}
</script>

<template>
<button :type="buttonType" class="w-[90%] flex items-center justify-center bg-[#0095f6] text-[#fff] text-[2.4rem] py-[1rem] font-[500] rounded-[10px] hover:bg-[#0074cc]"><slot></slot></button>
</template>

<style scoped>

</style>