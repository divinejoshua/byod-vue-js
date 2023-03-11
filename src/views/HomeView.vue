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
        <p class="text-muted text-sm">BYOD (Bring Your Own Data) a powerful tool that uses artificial intelligence to help you fine-tune data from your document. 
          
          <!-- With Boyd, you can easily extract and analyze data from your documents, such as names, dates, and numbers, and then use our intuitive interface to make adjustments and corrections as needed. 
            <br><br>
            Our AI algorithms are designed to learn from your input, so the more you use the app, the smarter it becomes. Whether you're a business professional, researcher, or student, Boyd is the perfect tool for anyone who needs to work with large amounts of data in their word documents. -->
        </p>

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
        <div v-if="resultDisplay.question" class="display-result mt-4">
          <label class="text-deep-blue fw-bold text-sm mb-2">Question</label>
          <div class="text-sm">{{resultDisplay.question}}</div>
        </div>

        <!-- Result display answer  -->
        <div v-if="resultDisplay.answer || (isLoading && resultDisplay.question)" class="display-result">
          <label class="text-deep-blue fw-bold text-sm mb-2 mt-4">Answer</label>

          <!-- Display loader  -->
          <div class="text-sm text-muted" v-if="isLoading">Searching...</div>
          <!-- Show the typewiter effect for answer -->
          <div class="text-sm" v-else-if="isTyping">{{typewriterText}} </div> 
          <!-- Main answers  -->
          <div class="text-sm" v-else>{{resultDisplay.answer}} </div>
        </div>

         <div v-if="isErrorRequest" class="display-result">
          <label class="text-danger fw-bold text-sm mb-2 mt-4">Error</label>
          <div class="text-sm text-danger">An error has occured. Could be due to overloaded context data</div>
        </div>


      </div>         
      <br><br><br><br><br><br><br><br>

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
    import { ref, onMounted, reactive } from 'vue';
    import { Configuration, OpenAIApi } from "openai";    //OpenAI 
    // import Typewriter from "typewriter-vue";    //Typewriter effect 

    //state
    let contextData = ref("");
    let question = ref("");
    let answer = ref("");
    let isLoading = ref(false);
    let isErrorRequest = ref(false);
    let messagesData = ref([]);
    let resultDisplay = ref({question: '', answer: ''});
    let typewriterText = ref('')
    let isTyping = ref(true);

    let phrases = reactive([]) //This is used by the Typewriter

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

      this.isErrorRequest = false //Set error to false 

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

        // Typewriter effect 
        this.phrases.push(this.answer) //Add the answer to the phrases
        isTyping = true //Set isTyping to true
        typeWriterLoop() //start the Typewritter loop
        }

        catch{
          this.isErrorRequest = true
        }

        finally{
          this.isLoading=false
          
        }


    }

    // ========Custom made typewiter effect 
      let opt = reactive({
        currentPhraseIndex: 0, 
        currentCharacterIndex: 0, 
        currentPhrase: "", 
        isDeleting: false
      })
      

      // Typewriter loop
        const typeWriterLoop = () => {
          if(!phrases[0]) {return}
          let currentPhraseText = phrases[opt.currentPhraseIndex];
          if (!opt.isDeleting) {
            // Starts typing one after the order 
            try {
              opt.currentPhrase += currentPhraseText[opt.currentCharacterIndex];
            }
            catch{
              return
            }
            opt.currentCharacterIndex++;
          } 
          else {
            opt.currentPhrase = opt.currentPhrase.slice(0, -1);
            opt.currentCharacterIndex--;
          }
          // Set the value 
          typewriterText.value = opt.currentPhrase;

          if (opt.currentCharacterIndex === currentPhraseText.length) {
            // Done typing 
            opt.isDeleting = true;
            isTyping = false
            
          }

          
          if (opt.currentCharacterIndex === 0) {
            opt.currentPhrase = "";
            opt.isDeleting = false;
            opt.currentPhraseIndex++;
            if (opt.currentPhraseIndex === opt.phrases?.length) {
              opt.currentPhraseIndex = 0;
            }
          }
          
          setTimeout(typeWriterLoop, 25);
        }





    //lifecycle hooks
    onMounted(() => {
      console.log('BYOD Application started');
    })

  </script>