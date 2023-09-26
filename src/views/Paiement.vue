<template>
    <div class="container">
        <div class="product-border">
            <div class="all-product">
                <h2>Votre produit :</h2>
                <img :src="product.coverPage" alt="failed"  class="img-product">
                <div class="product-title"><h4>{{ product.title }}</h4>
                  Prix : 0.50€
                </div>
            </div>
        </div>
        <div id="payment-form">
            <div ref="cardElement"></div>
            <button @click="processPayment">Payer maintenant</button>
        </div>
    </div>
</template>
  
  <script>
  import { loadStripe } from '@stripe/stripe-js';
  import AuthService from '../services/auth.service'
  
  export default {
    data() {
      return {
        stripe: null,
        cardElement: null,
        cardErrors: null,
        product: {}, // Votre produit à payer
        idEbook: 0
      };
    },
    async mounted() {
        this.idEbook = this.$route.params.id;
        fetch(`http://localhost:8080/api/ebooks/oneEbook/${this.idEbook}`)
        .then(response => response.json())
        .then(dataEbook => {
          console.log(dataEbook);
          this.product = dataEbook
          console.log("prod : ",this.product)
        })
        .catch(error => {
          console.log(error);
        });
        console.log("next ?")
        
        this.stripe = await loadStripe('pk_test_51NPmuzIHpdUumC00sGcs3OJxaFkSEAIKg6Vz4ns4pFX29i7teThZxZZKBVNbGw1T1tZUDaPvDDRmrBDhW9jUiUeO00nUBgTucS');
    
        let elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        this.cardElement.mount(this.$refs.cardElement);
    },
    methods: {
      async processPayment() {
        const userId = 2
        this.AlreadyLiked = []
        this.isItRented = false
        fetch(`http://localhost:8080/api/rentedEbooks/getUserEbooks`,{
          headers: AuthService.authHeader()
        })
          .then(response => response.json())
          .then(async data => {
            this.AlreadyRented = data;
            console.log(this.AlreadyRented)
            console.log(this.product.idEbook)
            for(let i = 0; i<this.AlreadyRented.length; i++){
              console.log(this.AlreadyRented[i].idEbook)
              if(this.AlreadyRented[i].idEbook == this.product.idEbook){
                this.isItRented = true
              }
            }
            console.log(this.product)
            console.log(this.isItRented)
            let result = await this.stripe.createToken(this.cardElement);
            console.log(result)
            if (this.isItRented == true) {
              alert("Vous avez déjà loué ce bouquin");
            } 
            else if(result.error){
              this.cardErrors = result.error
            }
            else {
              this.cardErrors = null;
              this.processStripeToken(result.token);
            }
          })
          .catch(error => {
            console.error(error);
          });
        
      },
      async processStripeToken(token) {
        console.log(this.product)
        // Envoyez le token à votre serveur pour qu'il réalise le paiement.
        let response = await fetch(`http://localhost:8080/api/paiement/process`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            token: token.id,
            product: this.product,
            amount: 50
          })
        });
  
        let data = await response.json();
  
        if (!data.success) {
          console.log('Le paiement a échoué');
        } else {
          console.log('Le paiement a réussi');
          fetch("https://worldtimeapi.org/api/ip")
          .then(response => response.json())
          .then(data => {
              let currentDate = new Date(data.datetime);
              currentDate.setDate(currentDate.getDate() + 14); // Ajoute 14 jours à la date actuelle

              const year = currentDate.getFullYear();
              const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
              const day = currentDate.getDate().toString().padStart(2, '0');

              this.mysqlDate  = `${year}-${month}-${day}`;
              console.log(this.mysqlDate)
              console.log(this.product.idEbook, " Date Rented : ", this.mysqlDate)
              fetch(`http://localhost:8080/api/rentedEbooks/addRentedEbook`,{
                method: 'POST',
                headers: Object.assign({'Content-Type': 'application/json'}, AuthService.authHeader()),
                body: JSON.stringify({
                  idEbook: this.product.idEbook,
                  dateRented: this.mysqlDate
                })
              })
              .then(response => {if (response.ok) {
                console.log(response)
                console.log('Add Rented Ebook avec succès.');
                this.$router.push('/library');
              } else {
                console.error("Erreur lors du l'add de l'ebook.");         
              }})
              .catch(error => {
                console.log(error);
              });
          })
          .catch(error => {
              console.error(error);
          });
          
          
        }
      }
    },
  };
  </script>

<style scoped>
.img-product{
    border-radius: 10px;
}
.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.product-border{
  flex: 1;
  margin: 3%;
  width: 30%;
  background: #ffffff;
  border: 1px solid black;
  box-shadow: 0px 10px 20px 0px black;
  border-radius: 10px;
}

.all-product{
  margin: 5% 7%;
  text-align: center;
}

.product-title{
  text-align: center;
}

#payment-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px 0px black;
  max-width: 500px;
  width: 100%;
  margin: 3%;
  padding: 10px;  /* réduit le padding de 20px à 10px */
  max-height: 200px; /* définit une hauteur maximale */
  overflow: auto; /* ajoute une barre de défilement si le contenu dépasse la hauteur maximale */
}


#payment-form div {
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

#payment-form button {
  background-color: #6772e5;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#payment-form button:hover {
  background-color: #5a64d8;
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
  }
  #payment-form {
    padding: 15px;
  }

  #payment-form button {
    padding: 10px;
    font-size: 14px;
  }
}
</style>