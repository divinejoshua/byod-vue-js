<template>
  <div class="home">

     <!-- Navbar -->
    <nav class="navbar navbar-light bg-white border-bottom">
        <div class="container-fluid pt-3">
          <a class="navbar-brand fw-bold" href="#">
            <img src="@/assets/logo.png" alt="" width="24" height="24" class="shadow-sm d-inline-block align-text-top">
            BYOD
          </a>

          <span class='float-right'>
              <!-- Link to codebase  -->
              <a href='https://github.com/divinejoshua/byod-vue-js' rel="noreferrer" target="_blank">
                <i class="fa fa-brands fa-github text-gray-400"></i>
              </a>
              &nbsp;&nbsp;

               <!-- Link to twitter account  -->
              <a href='https://twitter.com/Divine_Er' rel="noreferrer" target="_blank" >
                <i class="fa fa-brands fa-twitter text-gray-400"></i>
              </a>
          </span>


        </div>
      </nav>


      <!-- Main  -->
      <main class="mt-10" style="padding:15px">
        <br>
        <h5>Information re-defined</h5>

        <br>
        <!-- <p class="text-muted text-sm">BYOD (Bring Your Own Data) a powerful tool that uses artificial intelligence to help you fine-tune data from your word documents. With Boyd, you can easily extract and analyze data from your documents, such as names, dates, and numbers, and then use our intuitive interface to make adjustments and corrections as needed. 
            <br><br>
            Our AI algorithms are designed to learn from your input, so the more you use the app, the smarter it becomes. Whether you're a business professional, researcher, or student, Boyd is the perfect tool for anyone who needs to work with large amounts of data in their word documents.
        </p> -->

      <!-- Data context form  -->
            <div class="mb-3">
                <label class="text-muted fw-bold text-sm mb-2">Paste your data here</label>
                <textarea class="form-control text-sm pt-3" rows="5" placeholder="You must provide a context here..." v-model="contextData"></textarea>
            </div>
            

        <!-- The result display  -->
         <label class="text-muted fw-bold text-sm mb-2" v-if="!resultDisplay.question">Result</label>

      <!-- Conversations -->
      <div>

        <!-- Result display question  -->
        <div v-if="resultDisplay.question" class="display-result">
          <label class="text-deep-blue fw-bold text-sm mb-2">Question</label>
          <div class="text-sm">{{resultDisplay.question}}</div>
        </div>

        <!-- Result display answer  -->
        <div v-if="resultDisplay.answer || (isLoading && resultDisplay.question)" class="display-result">
          <label class="text-deep-blue fw-bold text-sm mb-2 mt-4">Answer</label>
          <div class="text-sm text-muted" v-if="isLoading">Searching...</div>
          <div class="text-sm" v-else>{{resultDisplay.answer}}</div>
        </div>
      </div>         


      </main>


      <!-- The bottom text input  -->
      <div class="bottom-bar">
         <form method="post" @submit.prevent="submitForm()">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Ask question" aria-label="" aria-describedby="" v-model="question">
              <button class="btn btn-outline-secondary" @disabled="true" type="submit">Ask</button>        
            </div>
        </form>

      </div>
  
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue';
import { Configuration, OpenAIApi } from "openai";    //OpenAI 

//state
let contextData = ref("");
let question = ref("");
let answer = ref("");
let isLoading = ref(false);
let messagesData = ref([]);
let resultDisplay = ref({
  question: '',
  answer: ''
});


// Create configuration object
const configuration = new Configuration({
  apiKey: process.env.VUE_APP_OPENAI_API_KEY,
});

// create OpenAI configuration object
const openai = new OpenAIApi(configuration);





// =====methods

    // This method submits the form
    async function submitForm(){

      if(isLoading.value==true) { return } //Return if the form is loading
      if (!contextData.value || !question.value) { return }  // Return if there is no question or contextData 

     this.messagesData = []

      // Add the contextData and question to the messagesData object
      this.messagesData.push({role: "assistant", content: this.contextData})
      this.messagesData.push({role: "user", content: this.question})


      this.resultDisplay.question = this.question //Add the display question

      this.question = "" //Clear the question string


      this.isLoading = true //Start the loading

      // Send the request 
      try {

        let response = await openai.createChatCompletion({ 
          model: "gpt-3.5-turbo",
          temperature: 0,
          max_tokens: 2000,
          top_p: 0,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["{}"],
          messages: messagesData.value,
        });

        //set the result to answer
        this.answer = response.data.choices[0].message.content
        this.messagesData.push({role: "assistant", content: this.answer})

        this.resultDisplay.answer = this.answer //Add the display answer

        }

        catch{

        }

        finally{
          this.isLoading=false
        }


    }





//lifecycle hooks
onMounted(() => {
  console.log('BYOD Application started');
})

</script>