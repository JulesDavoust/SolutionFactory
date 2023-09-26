import router from "../plugins/router";

const API_URL = "http://localhost:8080/api/";


class AuthService {
  async login(user) {
    if (!this.isLogged()){
      await fetch(API_URL + 'users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
            document.getElementById('closeAuth').click();
          } else {
            const errorDisplay = document.getElementById('errorLoginMessage');
            errorDisplay.textContent = data.message;
            errorDisplay.classList.remove('hide');
          }
      });
    }
  }

  // SETUP QUOI FAIRE APRES REGISTER (Exemple : reload page)
  async register(user, isLoggedDisplay) {
    if (!this.isLogged()){
      await fetch(API_URL + 'users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'mode': 'no-cors'
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Registered") {
            this.login({ email: user.email, password: user.password })
              .then(data => isLoggedDisplay.value = this.isLogged());
          } else {
            const errorDisplay = document.getElementById('errorRegisterMessage');
            errorDisplay.textContent = data.message;
            errorDisplay.classList.remove('hide');
          }
      });

    }
  }

  logout () {
    localStorage.removeItem("user");
  }

  authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

  isLogged() {
    return JSON.parse(localStorage.getItem("user")) ? true : false;
  }

  /* // NE MARCHE PAS ENCORE !!!
  async isAdmin() {
    var isAdmin;
    await fetch(API_URL + 'checkAdmin', { headers : this.authHeader() })
      .then(response => response.json())
      .then(data => {
        isAdmin = data;
    });
    return isAdmin;
  } */
}

export default new AuthService();
