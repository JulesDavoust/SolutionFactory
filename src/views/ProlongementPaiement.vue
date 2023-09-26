<template>
    <div class="container">
        <div class="product-border">
            <div class="all-product">
                <h2>Vous allez prolonger votre location de deux semaines pour ce produit :</h2>
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
    import CryptoJS from 'crypto-js';
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
    created(){
        const encodeChiffre = this.$route.params.id;
        console.log(encodeChiffre)
        this.idEbook = this.dechiffrement(encodeChiffre)
        console.log(this.idEbook)
        console.log(`ID de l'ebook : ${this.idEbook}`);
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
    },
    async mounted() {
        this.stripe = await loadStripe('pk_test_51NPmuzIHpdUumC00sGcs3OJxaFkSEAIKg6Vz4ns4pFX29i7teThZxZZKBVNbGw1T1tZUDaPvDDRmrBDhW9jUiUeO00nUBgTucS');
    
        let elements = this.stripe.elements();
        this.cardElement = elements.create('card');
        this.cardElement.mount(this.$refs.cardElement);
    },
    methods: {
        dechiffrement(chiffreEncode) {
        var cle = "MaCleSecrete";
        var chiffreDecode = CryptoJS.AES.decrypt(chiffreEncode, cle).toString(CryptoJS.enc.Utf8);
        return chiffreDecode
        },
      async processPayment() {
        const userId = 2
        let result = await this.stripe.createToken(this.cardElement);
        console.log(result)
        if(result.error){
            this.cardErrors = result.error
            alert("Erreur au niveau de votre carte");
        }
        else {
            this.cardErrors = null;
            this.processStripeToken(result.token);
        }
      },
      async processStripeToken(token) {
        const userId = 2
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
          fetch(`http://localhost:8080/api/rentedEbooks/getOneUserEbook/${this.product.idEbook}`,{
            headers: AuthService.authHeader()
          })
            .then(response => response.json())
            .then(dataEbook => {
                console.log(dataEbook);
                this.rentedEbook = dataEbook
                console.log("prod : ",this.rentedEbook.dateRented)
                // Convertissez la chaîne de date en objet Date
                let date = new Date(this.rentedEbook.dateRented);
                // Ajoutez 14 jours à la date
                date.setDate(date.getDate() + 14);
                // Récupérez la nouvelle date au format YYYY-MM-DD
                let newDate = date.toISOString().split('T')[0];

                console.log(newDate); // Affiche la nouvelle date
                fetch(`http://localhost:8080/api/rentedEbooks/update/${this.rentedEbook.idEbook}`,{
                    method: "PUT",
                    headers: Object.assign({"Content-Type": "application/json"}, AuthService.authHeader()),
                    body: JSON.stringify({
                        dateRented: newDate
                    })})
                    .then(response => {if (response.ok) {
                        // La suppression a réussi
                        console.log('Augmentation date avec succès.');
                        this.$router.push('/library');
                        
                    } else {
                        // La suppression a échoué
                        console.error('Erreur lors du like de l\'ebook.');
                        
                        
                    }})
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
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