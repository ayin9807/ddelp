<template>
  <div id="app">
    <div id="nav-bar"> 
        <h2>DDelp</h2>
        <input id="search-bar" style="width: 200px; height: 30px;">
        <div id="authentication">
            <div id="log-in">Log in</div>
            <div id="sign-up">Sign up</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
body {
    margin: 0 0;
}    

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
    
#nav-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    color: white;
}

h2 {
    font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
