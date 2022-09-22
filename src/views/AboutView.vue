<template>
  <div class="about">
    <div class="container">
      <div class="col-md-4 mx-auto mt-5">

        <ul class="nav nav-pills nav-tabs nav-justified" id="pills-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active btn-block" id="pills-home-tab" data-toggle="pill" data-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Login</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link btn-block" id="pills-profile-tab" data-toggle="pill" data-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Register</button>
          </li>

        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

            <div class="form-group mt-5">
              <label for="email">Email</label>
              <input id="email" v-model="email"  type="text" class="form-control" placeholder="Enter email">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input id="password"  v-model="password" type="password" class="form-control" placeholder="Enter password">
            </div>

            <div class="form-group mt-5">
              <button @click="login" class="btn btn-primary btn-block">Login</button>
            </div>

          </div>
          <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

            <div class="form-group mt-5">
              <label for="name">Name</label>
              <input id="name" v-model="name"  type="text" class="form-control" placeholder="Enter name">
            </div>

            <div class="form-group">
              <label for="emailx">Email</label>
              <input id="emailx" v-model="email"  type="text" class="form-control" placeholder="Enter email">
            </div>

            <div class="form-group">
              <label for="passwordx">Password</label>
              <input id="passwordx" v-model="password"  type="password" class="form-control" placeholder="Enter password">
            </div>

            <div class="form-group mt-4">
              <button @click="register" class="btn btn-primary btn-block">Register</button>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification'
import Pusher from 'pusher-js';
const toast = useToast()
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      loading: false
    }
  },
  created() {

    this.pusher = new Pusher('cc9fe42ff36f622d5949', {
      cluster: 'eu'
    });
        
    this.channel = this.pusher.subscribe("my-channelx");

    console.log(this.channel)

    this.channel.bind("my-event", (data) => {
        // alert('persons')
    // Method to be dispatched on trigger.
        console.log(data)

        toast.success('Button Clicked!!');


        // consol.log('thank God')

    });



    },
  methods: {
    register(){

      this.loading = true

            this.axios({
            method: 'post',
            url: process.env.VUE_APP_URL+'/api/register',
              data: {
                  name: this.name,
                  email: this.email,
                  password: this.password
              },
            })
            .then((response)=>{

              this.loading = false
              console.log(response)


                localStorage.setItem('user_token', response.data.access_token)
                localStorage.setItem('user_data', JSON.stringify(response.data.user_data))

                return this.$router.push('/home')

              })
            .catch((response)=>{

              this.loading = false

              console.log(response);


            })  

    },
    login(){

      this.loading = true

            this.axios({
            method: 'post',
            url: process.env.VUE_APP_URL+'/api/login',
              data: {
                  email: this.email,
                  password: this.password
              },
            })
            .then((response)=>{

              this.loading = false

              console.log(response)

              localStorage.setItem('user_token', response.data.access_token)
              localStorage.setItem('user_data', JSON.stringify(response.data.user_data))

              return this.$router.push('/home')

                            // if (localStorage.getItem('user_role') == 'user') {

                            //     return this.$router.push('/user')
                                
                            // }if (localStorage.getItem('user_role') == 'admin') {

                            //     return this.$router.push('/admin')
                                
                            // }

              })
            .catch((response)=>{

              this.loading = false

              console.log(response);


            }) 

      

    },

  },
}
</script>
