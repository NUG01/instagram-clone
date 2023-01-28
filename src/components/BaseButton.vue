<script>
export default {
  props:['type', 'width', 'rounded'],
  setup(props) {
     const buttonType=props.type
     const width=props.width
     const rounded=props.rounded



     return { buttonType, width, rounded }
  },
}
</script>


<template>
<button :type="buttonType" :class="[width ? width : 'w-[90%]', rounded ? rounded : 'rounded-[10px]']" class="flex items-center justify-center bg-[#0095f6] text-[#fff] text-[2.4rem] py-[1rem] font-[500] hover:bg-[#0074cc]"><slot></slot></button>
</template>

<style scoped>

</style>