<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 800px;
  margin: 0 auto;;
  color: #2c3e50;
}

.bottom-bar{
  position: fixed;
  bottom: 0px;
  height:90px;
  width: 100%;
  max-width: 800px;
  padding:15px;
}
a{
  color: #888;
}

.text-deep-blue{
  color: #3B82F6;
}

.display-result{
    opacity: 0;
    animation: fadeIn 0.2s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
    from {
    opacity: 0;
    }
    to {
    opacity: 1;
    }
}

</style>
