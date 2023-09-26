<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import AuthService from "../services/auth.service";

const router = useRouter()

const searchValue = ref('');
const searchValueTag = ref('');

const emits = defineEmits("home");

const isLogged = ref(false);

const loginEmail = ref("");
const loginPassword = ref("");

const registerFName = ref("");
const registerLName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");

isLogged.value = AuthService.isLogged();
loginEmail.value = "ryan.hant@gmail.com";
registerFName.value = "Test";
registerLName.value = "TEST";
registerEmail.value = "test.test@test.tst";

function onSubmittingLogin () {
  AuthService.login({ email: loginEmail.value, password: loginPassword.value })
    .then(data => isLogged.value = AuthService.isLogged());
}

function onSubmittingRegister () {
  AuthService.register({  firstNameUser: registerFName.value,
                          lastNameUser: registerLName.value,
                          email: registerEmail.value,
                          password: registerPassword.value }, 
                        isLogged);
}

function onLogout () {
  AuthService.logout();
  isLogged.value = AuthService.isLogged();
}

const search = () => {
  if(searchValue.value == '' && searchValueTag.value != ''){
    console.log(searchValueTag.value)
    router.push({name:'SearchByTag', params:{searchTag : searchValueTag.value}})
  }
  else if(searchValue.value != ''){
    console.log(searchValue.value)
    router.push({name:'Search', params:{searchID : searchValue.value}})
  }
  else{
    alert("Vous ne pouvez pas faire de recherche dans ce cas-là")
  }
};

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary rounded-bottom-4" data-bs-theme="dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link active home">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/pricing" class="nav-link active pricing">Pricing</RouterLink>
          </li>
        </ul>
        <RouterLink to="/" class="navbar-brand d-flex mx-auto">
          <p style="color: white; margin: 0%;">
            <img src="/public/RnR_logo_noBG.svg" width="30" height="30" class="d-inline-block align-top" alt="Logo" id="logo">
            Read'n'Rent
          </p>
        </RouterLink>
        <ul class="navbar-nav">
          <li class="nav-item">
            <button class="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal" id="loginRegisterButton" v-if="!isLogged">Login</button>
            <button class="nav-link" @click="onLogout()" v-else>Logout</button>
          </li>
          <li class="nav-item">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search with one tag" aria-label="Search" v-model="searchValueTag">
              <input class="form-control me-2" type="search" placeholder="Search by name" aria-label="Search" v-model="searchValue">
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Search</button>
            </form>
          </li>
          <li class="nav-item dropdown" style="padding-left: 0.5vw;">
            <button class="nav-link btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><RouterLink to="/library" class="navbar-brand dropdown-item d-flex mx-auto">Library</RouterLink></li>
              <li><RouterLink to="/setting" class="navbar-brand dropdown-item d-flex mx-auto">setting</RouterLink></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Connection</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="closeAuth"></button>
        </div>
        <div class="modal-body">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                  aria-expanded="true" aria-controls="collapseOne">
                  Login
                </button>
              </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <form id="loginForm" @submit.prevent="onSubmittingLogin()">
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="emailLoginInput" placeholder="name@example.com"
                        name="mail" v-model="loginEmail" required>
                      <label for="emailLoginInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="passwordLoginInput" placeholder="password"
                        name="password" v-model="loginPassword" required>
                      <label for="passwordLoginInput">Password</label>
                    </div>
                    <p class="errorMessage hide" id="errorLoginMessage">Error !</p>
                    <input type="submit" class="btn btn-primary" id="loginButton" value="Login">
                  </form>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Register
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <form id="registerForm" @submit.prevent="onSubmittingRegister()">
                    <div class="row">
                      <div class="col">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="fNameRegisterInput" placeholder="name@example.com"
                            name="firstNameUser" v-model="registerFName" required>
                          <label for="fNameRegisterInput">First Name</label>
                        </div>
                      </div>
                      <div class="col">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" id="lNameRegisterInput" placeholder="name@example.com"
                            name="lastNameUser" v-model="registerLName" required>
                          <label for="lNameRegisterInput">Last Name</label>
                        </div>
                      </div>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="email" class="form-control" id="emailRegisterInput" placeholder="name@example.com"
                        name="email" v-model="registerEmail" required>
                      <label for="emailRegisterInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                      <input type="password" class="form-control" id="passwordRegisterInput" placeholder="password"
                        name="password" v-model="registerPassword" required>
                      <label for="passwordRegisterInput">Password</label>
                    </div>
                    <p class="errorMessage hide" id="errorRegisterMessage">Error !</p>
                    <input type="submit" class="btn btn-primary" id="registerButton" value="Register">
                    <!-- <button class="btn btn-primary" id="loginButton">Login</button> -->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-menu {
  border: none;
  background-color: #2b3035;
}

.dropdown-item {
  font-size: 100%;
  color: #adb5bd;
}

#logo {
  margin-right: 10px;
}

.home,
.pricing {
  color: white;
  text-decoration: none;
}

.modal-header {
  background-color: #212529;
  color: white;
}

.modal-footer {
  background-color: #212529;
  color: white;
}

.modal-body {
  background-color: #343746;
  color: white;
}

.accordion-button {
  background-color: #343746;
  color: white;
}

.accordion-body {
  background-color: #343746;
  color: white;
}

.form-floating {
  color: grey;
}

.errorMessage {
  color: crimson;
}

@media (min-width: 992px) {
  .home {
    margin-left: 2em;
  }

  .pricing {
    margin-left: 3em;
  }

}

@media (max-width: 992px) {
  .dropdown-item {
    border-left: solid;
  }
}
</style>

