<script>
export default {
  setup() {
    
  },
}
</script>

<template>
  <div class="w-[100%] px-[2rem] py-[1rem] flex items-center justify-between cursor-pointer hover:bg-gray-100 text-[2rem]">
    <p><slot name="function">Settings</slot></p>
    <div><slot  name="icon">Ic</slot></div>
  </div>
</template>
