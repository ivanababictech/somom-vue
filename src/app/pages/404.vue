<template>
  <v-layout column align-center justify-center class="notfound text-center">
	  <h1 class="blue-grey--text">Oops...</h1>
	  <h4 class="blue-grey--text text-xs-center">The page you are looking for could not be found!</h4>

	  <div class="text-xs-center">
	    <v-btn outline to="/">go to home page</v-btn>
	  </div>
	</v-layout>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
  };
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notfound {

}
</style>
