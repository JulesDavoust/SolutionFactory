<template>
    <div class="container">
        <form @submit.prevent="updateInfo" class="form">
            <div class="field">
                <label for="email">Email</label>
                <input v-model="user.email" type="email" id="email" name="email" placeholder="email">
            </div>
            <div class="field">
                <label for="password">Mot de passe</label>
                <input :type="passwordFieldType" v-model="user.password" id="password" name="password" placeholder="mot de passe">
                <button type="button" @click="togglePasswordVisibility" class="button-password">{{ showPassword ? 'Hide' : 'Show' }}</button>
            </div>
            <button type="submit" class="submit-button" @click="modify()">Modifier mes informations</button>
        </form>
    </div>
</template>

<script>
import AuthService from '../services/auth.service'
export default {
    
    data() {
        return {
            user: {
                email: '', // remplacez par l'email par défaut de l'utilisateur
                password: '' // remplacez par le mot de passe par défaut de l'utilisateur
            },
            showPassword: false
        };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        }
    },
    created(){
        fetch(`http://localhost:8080/api/users/oneUser`,{
                    headers:AuthService.authHeader()
                  })
                  .then(response => response.json())
                  .then(data => {
                    this.user['email'] = data.email
                    this.user['password'] = data.password
                  })
                  .catch(error => {
                    console.log(error);
                  });
    },
    methods: {
        updateInfo() {
            // Logique pour la mise à jour des informations de l'utilisateur
            console.log(this.user);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        modify(){
            console.log("info : ", this.user.email, this.user.password)
            fetch(`http://localhost:8080/api/users/update`,{
                    method: "PUT",
                    headers: Object.assign({"Content-Type": "application/json"}, AuthService.authHeader()),
                    body: JSON.stringify({
                        email: this.user.email,
                        password: this.user.password
                    })})
                    .then(response => {if (response.ok) {
                        // La suppression a réussi
                        console.log('Changement info avec succès.');
                        window.location.reload()
                        
                    } else {
                        // La suppression a échoué
                        console.error("Erreur lors du changement d'informations.");
                        
                        
                    }})
                    .catch(error => {
                        console.log(error);
                    });
        }
    }
}
</script>

<style scoped>
.button-password{
    width:35%;
    height: 20%;
}

#email{
    border-radius: 3%;
}

#password{
    border-radius: 3%;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
    width: 40vh;
    border:3px solid black;
    border-radius: 6%;
    margin-top:10%;
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

.field {
    margin: 10px 0;
}

.field label {
    display: block;
    margin-bottom: 5px;
}

.submit-button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}

@media (max-width: 600px) {
    .container {
        padding: 0 20px;
    }
}
</style>