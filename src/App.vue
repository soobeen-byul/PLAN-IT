<template>
      <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};

// // 위치정보
// navigator.geolocation.getCurrentPosition(function(pos) {
// console.log(pos);
// var latitude = pos.coords.latitude;
// var longitude = pos.coords.longitude;
// alert("현재 위치는 : " + latitude + ", "+ longitude);
// });
</script>

<style>
</style>

