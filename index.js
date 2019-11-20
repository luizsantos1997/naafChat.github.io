const instance = axios.create({
  baseURL: 'http://www.chatruy.somee.com/api',
  timeout: 5000,
  
});
new Vue({
  el: "#app",
  data: {
    talks: [
      {
        text: 'Olá Seja Bem vindo!',
        isBotAnswer: true
      }
    ],
    newText: ''
  },
  methods: {

    AddText() {
      if (this.newText === '' ||
        this.newText === null) {
        alert("Texto vazio!");
        return false;
      }
      let newTalk = {
        text: this.newText,
        isBotAnswer: false
      };
      this.talks.push(newTalk);
      this.TalkWithBot(this.newText);
      this.newText = '';
    },
    async TalkWithBot(str) {
      let vm = this;
      await instance.get('/values?text='+str)
        .then(function (response) {
          console.log(response);
          let result =  response.data.value.output.generic[0];
          console.log(result);
          let newTalk = {
            text: result.text,
            isBotAnswer: true
          };
          vm.talks.push(newTalk);
        })
        .catch(function (error) {
          console.log(error);
        })
        
    }

  }
});
