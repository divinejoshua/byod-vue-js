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
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.9);
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

.typed-out{
  overflow: hidden;
  border-right: .15em solid orange;
  white-space: nowrap;
  animation: typing 2.5s steps(50, end) forwards;
  font-size: 1.6rem;
  width: 0;
}
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

</style>
