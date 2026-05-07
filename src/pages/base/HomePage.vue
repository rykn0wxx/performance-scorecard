<template>
  <div class="home-page">
    <h4>HomePage</h4>
    <Button asChild v-slot="slotProps">
      <RouterLink to="/widgets/button" :class="slotProps.class">Router</RouterLink>
    </Button>
  </div>
</template>

<script setup>
// const name = 'HomePage'
</script>

<style lang="scss" scoped></style>
