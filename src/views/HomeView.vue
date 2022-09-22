<template>
  <div class="home">

    <div class="container col-md-6">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to client side"/>
      <div class="logout">
        <button @click="logout" class="btn btn-primary float-right">Logout</button>
      </div>
      <table class="table mt-5">
        <tr>
          <td>Name</td>
          <td>{{userData.name}}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{userData.email}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { useToast } from 'vue-toastification'
import Pusher from 'pusher-js';

const toast = useToast()
export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      userData: '',
      email: ''
    }
  },
  methods: {
    connect(){
      toast.success('just loaded');
    },
    async getUserData(){

            await this.axios({
            method: 'get',
            url: process.env.VUE_APP_URL+'/api/userData',
            headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' +localStorage.getItem('user_token')
                },
            })
            .then((response)=>{

              console.log(response)
              this.userData = response.data
              this.email = response.data.email

              this.created()


              })
            .catch((response)=>{

            console.log(response);


            })  
    },
    logout(){

          alert('logging out')
          localStorage.setItem('user_data', '')
          localStorage.setItem('access_token', '')

          this.$router.push('/');

          },
   created() {
  
              this.pusher = new Pusher('cc9fe42ff36f622d5949', {
                cluster: 'eu'
              });
                  
              this.channel = this.pusher.subscribe((this.email));
  
              console.log(this.channel)
    
              this.channel.bind("my-event", (data) => {
                  // alert('persons')
              // Method to be dispatched on trigger.
                  console.log(data)
  
                  toast.success('Button Clicked!!');
  
  
                  // consol.log('thank God')
  
              });
  
  
    
    },
  }, 
  mounted() {
    this.connect()
    this.getUserData()

    
  },
}
</script>
