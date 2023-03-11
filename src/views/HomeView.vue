<template>
  <div class="home">

     <!-- Navbar -->
    <nav class="navbar navbar-light bg-white border-bottom">
        <div class="container-fluid pt-3">
          <a class="navbar-brand fw-bold" href="#">
            <img src="@/assets/logo.png" alt="" width="24" height="24" class="shadow-sm d-inline-block align-text-top">
            BYOD - Bring Your Own Data
          </a>
        </div>
      </nav>


      <!-- Main  -->
      <main class="mt-10" style="padding:15px">
        <br>
        <h5>Information re-defined</h5>

        <br>
        <p class="text-muted text-sm">BYOD (Bring Your Own Data) a powerful tool that uses artificial intelligence to help you fine-tune data from your word documents. With Boyd, you can easily extract and analyze data from your documents, such as names, dates, and numbers, and then use our intuitive interface to make adjustments and corrections as needed. 
            <br><br>
            Our AI algorithms are designed to learn from your input, so the more you use the app, the smarter it becomes. Whether you're a business professional, researcher, or student, Boyd is the perfect tool for anyone who needs to work with large amounts of data in their word documents.
        </p>

      <!-- Data context form  -->
        <form>
            <div class="mb-3">
                <label class="text-muted fw-bold text-sm mb-2">Paste your data here</label>
                <textarea class="form-control text-sm pt-3" rows="5" placeholder="" v-model="contextData"></textarea>
            </div>
                <label class="text-muted fw-bold text-sm mb-2">Result</label>
            
        </form>


      </main>


      <!-- The bottom text input  -->
      <div class="bottom-bar">
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Ask question" aria-label="" aria-describedby="" v-model="question">
        <button class="btn btn-outline-secondary" type="button" @click="submitForm()">Search</button>
        </div>
      </div>
  
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue';

//state
const contextData = ref("");
const question = ref("");
const answer = ref("");



// methods
// This method submits the form
function submitForm(){

  console.log(contextData.value)
  console.log(question.value)
  


}


function decrement(num) {
  counter.value = num--;
}
//lifecycle hooks
onMounted(() => {
  console.log('Application started');
})

</script>