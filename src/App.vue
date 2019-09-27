<template>
  <div id="app" style="width: 100%; height:100%;">
    <div id="wrap">
      <router-view />

      <div id="status-bar">
        <ul class="status-list">
          <!-- <li>인터넷</li>
          <li>터치</li>-->
        </ul>
        <div class="time">10:10</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
    }
  },
  methods: {},
};
</script>