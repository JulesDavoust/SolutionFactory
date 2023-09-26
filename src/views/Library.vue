<template>
  <div class="container">
    <div class="header">
      <div class="tab" @click="show = 'rented'" :class="{active: show === 'rented'}">
        Mes livres loués
      </div>
      <div class="tab" @click="show = 'liked'" :class="{active: show === 'liked'}">
        Mes livres enregistrés
      </div>
    </div>
    <div class="content">
      <div v-if="show === 'rented'" class="row">
        <div :class="{'col-md-4':rentedBooks.length > 2, 'col-12':rentedBooks.length >2}" v-for="book in rentedBooks" :key="book.idEbook" >
          <div class="book-container" 
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave">
            <img :src="book.coverPage" :alt="book.title" class="book-image">
            <div class="book-title" :class="{ 'hovered': isHovered }">{{ book.title }}</div>
            <div>Fin de location : {{ getDateRented(book.idEbook) }}</div>
            <div class="button-container">
              <button @click="like(book.idEbook)">Enregistrer</button>
              <button @click="handleImageClick(book.idEbook)">Read</button>
              <button @click="prolongerLocation(book.idEbook)">Prolonger la location</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="show === 'liked'" class="row">
        <div :class="{'col-md-4':likedBooks.length > 2, 'col-12':likedBooks.length >2}" v-for="book in likedBooks" :key="book.idEbook">
          <div class='book-container'
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
                @click="selectedBook = book, showModal = true">
            <img :src="book.coverPage" :alt="book.title" class="book-image">
            <div class="book-title" :class="{ 'hovered': isHovered }">{{ book.title }}</div>
            <button @click="unlike(book.idEbook)">Enlever des enregistrement</button>
          </div>
        </div>

        <!--div v-if="showModal" class="modal">
          <div class="modal-content">
            <img :src="selectedBook.coverPage" :alt="selectedBook.title" class="book-detail-image">
            <div class="book-details">
              <h2>{{ selectedBook.title }}</h2>
              <p><strong>Auteur: </strong>{{ selectedBook.author }}</p>
              <p><strong>Éditeur: </strong>{{ selectedBook.publisher }}</p>
              <p><strong>Date de publication: </strong>{{ selectedBook.publicationDate }}</p>
              <p>{{ selectedBook.description }}</p>
              <button @click="showModal = false">Fermer</button>
            </div>
          </div>
        </div-->
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import AuthService from '../services/auth.service'

export default {
  data() {
    return {
      show: 'rented',
      userEbooks: [], // Ici, vous devez insérer vos vraies données
      rentedBooks:[], // Ici, vous devez insérer vos vraies données
      likedBooks: [],
      userEbooksLike: [] // Ici, vous devez insérer vos vraies données
    };
  },
  created() {
    this.fetchRentedBooks();
    this.fetchLikedBooks();
  },
  methods: {
    prolongerLocation(idEbook){
      console.log("prolongement")
      let chiffreEncode2 = this.chiffrement(idEbook)
      console.log(chiffreEncode2);
      this.$router.push({ name: 'Prolonger', params: {id :chiffreEncode2} });
    },
    like(idEbook){
      console.log("liked")
      const userId = 2
      this.AlreadyLiked = []
      this.isItLiked = false
      fetch(`http://localhost:8080/api/likeEbooks/user`,{
        headers:AuthService.authHeader()
      })
        .then(response => response.json())
        .then(data => {
          this.AlreadyLiked = data;
          for(let i = 0; i<this.AlreadyLiked.length; i++){
            if(this.AlreadyLiked[i].idEbook == idEbook){
              this.isItLiked = true
            }
          }
          if(this.isItLiked == false){
            console.log('work ?')
            fetch(`http://localhost:8080/api/likeEbooks/like/${idEbook}`,{
                    method: 'POST',
                    headers:AuthService.authHeader()
                  })
                  .then(response => {if (response.ok) {
                    // La suppression a réussi
                    console.log('Ebook like avec succès.');
                    location.reload()
                    
                  } else {
                    // La suppression a échoué
                    console.error('Erreur lors du like de l\'ebook.');
                    
                    
                  }})
                  .catch(error => {
                    console.log(error);
                  });
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    unlike(idEbook){
      console.log("unlike")
      const userId = 2
      fetch(`http://localhost:8080/api/likeEbooks/unlike/${idEbook}`,{
                method: 'DELETE',
                headers: AuthService.authHeader()
              })
              .then(response => {if (response.ok) {
                // La suppression a réussi
                console.log('Ebook supprimé avec succès.');
                location.reload()
                // Faites quelque chose après la suppression réussie
              } else {
                // La suppression a échoué
                console.error('Erreur lors de la suppression de l\'ebook.');
                // Faites quelque chose en cas d'échec de la suppression
                
              }})
              .catch(error => {
                console.log(error);
              });
      
    },
    getDateRented(idEbook) {
      const ebook = this.userEbooks.find(item => item.idEbook === idEbook);
      return ebook ? ebook.dateRented : "";
    },
    chiffrement(idEbook) {
      var chiffre = idEbook;
      var cle = "MaCleSecrete";
      var chiffreEncode = CryptoJS.AES.encrypt(chiffre.toString(), cle).toString();
      return chiffreEncode
    },
    fetchLikedBooks(){
      const userId = 2; // Remplacez 123 par l'ID de l'utilisateur que vous souhaitez récupérer les ebooks
      fetch(`http://localhost:8080/api/likeEbooks/user`,{
        headers:AuthService.authHeader()
      })
        .then(response => response.json())
        .then(data => {
          this.userEbooksLike = data;
          console.log(this.userEbooksLike)
          
          for(let i = 0; i<this.userEbooksLike.length; i++){
            let idEbook = this.userEbooksLike[i].idEbook;
            console.log("id : ", idEbook)
            //console.log("supp : ", this.userEbooksLike[i])
            fetch(`http://localhost:8080/api/ebooks/oneEbook/${idEbook}`)
            .then(response => response.json())
            .then(data => {
              //console.log(i, data);
              this.likedBooks.push(data);
              console.log(this.likedBooks[0].coverPage)
            })
            .catch(error => {
              console.log(error);
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchRentedBooks() {
      const userId = 2; // Remplacez 123 par l'ID de l'utilisateur que vous souhaitez récupérer les ebooks
      fetch("https://worldtimeapi.org/api/ip")
      .then(response => response.json())
      .then(data => {
        const currentDate = new Date(data.datetime);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const day = String(currentDate.getDate()).padStart(2, "0");

        this.mysqlDate  = `${year}-${month}-${day}`;
      })
      .catch(error => {
        console.error(error);
      });
      fetch(`http://localhost:8080/api/rentedEbooks/getUserEbooks`, {
        headers: AuthService.authHeader()
      })
        .then(response => response.json())
        .then(data => {
          this.userEbooks = data;
          console.log(this.userEbooks)
          
          for(let i = 0; i<this.userEbooks.length; i++){
            let idEbook = this.userEbooks[i].idEbook;
            console.log("id : ", idEbook)
            if(this.userEbooks[i].dateRented >= this.mysqlDate){
              //console.log("supp : ", this.userEbooks[i])
              fetch(`http://localhost:8080/api/ebooks/oneEbook/${idEbook}`)
              .then(response => response.json())
              .then(data => {
                //console.log(i, data);
                this.rentedBooks.push(data);
                console.log(this.rentedBooks)
              })
              .catch(error => {
                console.log(error);
              });
            }else{
              fetch(`http://localhost:8080/api/rentedEbooks/delete/${idEbook}`,{
                method: 'DELETE',
                headers: AuthService.authHeader()
              })
              .then(response => {if (response.ok) {
                // La suppression a réussi
                console.log('Ebook supprimé avec succès.');
                // Faites quelque chose après la suppression réussie
              } else {
                // La suppression a échoué
                console.error('Erreur lors de la suppression de l\'ebook.');
                // Faites quelque chose en cas d'échec de la suppression
              }})
              .catch(error => {
                console.log(error);
              });
            }
          }
        })
        .catch(error => {
          console.error(error);
        }); 
    },
    handleImageClick(idEbook) {
      // Logique à exécuter lors du clic sur l'image
      console.log(`Image cliquée ! ${idEbook}`);
      fetch(`http://localhost:8080/api/ebooks/oneEbook/${idEbook}`)
        .then(response => response.json())
        .then(dataEbook => {
          console.log(dataEbook);
          if (dataEbook.path.endsWith('.pdf')) {
            console.log(idEbook)
            let chiffreEncode = this.chiffrement(idEbook)
            console.log(chiffreEncode);
            //let chiffreDecode = this.dechiffrement(chiffreEncode)
            //console.log(chiffreDecode)
            this.$router.push({ name: 'Pdf', params: {id :chiffreEncode} });
            //this.$router.push('/readPdf');
          }else if(dataEbook.path.endsWith('.epub')){
            let chiffreEncode = this.chiffrement(idEbook)
            console.log(chiffreEncode);
            this.$router.push({ name: 'Epub', params: {id :chiffreEncode} });
          }
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    handleMouseEnter(event) {
      event.target.style.transform = 'scale(1.05)';
      this.isHovered = true;
    },
    handleMouseLeave(event) {
      event.target.style.transform = 'scale(1)';
      this.isHovered = false;
    },
  },
};
</script>

<style scoped>

.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 4px;
  width: 80%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.book-detail-image {
  width: 40%;
  height: auto;
}

.book-details {
  width: 60%;
}

@media (max-width: 768px) {
  .modal-content {
    flex-direction: column;
  }

  .book-detail-image, .book-details {
    width: 100%;
  }
}
.button-container {
  display: flex;
  justify-content: space-between;  /* Optionnel : espacer les boutons */
}
.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* aligne les éléments au centre */
  border: 1px solid black;
  margin-top: 5%;
  transition: transform 0.2s;
}

.container {
  width: 100%;
  margin-top: 3%;
  background: #f0f0f0;
  box-shadow: 5px 5px 15px 5px #000000;
}

.header {
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
  padding: 20px;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.tab {
  cursor: pointer;
  flex: 1;
  text-align: center;
}

.tab.active {
  font-weight: bold;
  color: blue;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
}


.book-image {
  max-width: 150%;
  height: auto;
  margin-bottom: 3%;
}



@media (max-width: 1300px) {
  .col-md-4 {
    flex: 0 0 50%;
    max-width: 100%;
  }
  .book-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* aligne les éléments au centre */
    border: 0px solid black;
    margin-top: 5%;
    margin-left: 10%;
    transition: transform 0.2s;
  }

  .book-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


}

@media (max-width: 1000px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .book-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* aligne les éléments au centre */
    border: 0px solid black;
    margin-top: 5%;
    margin-left: 5%;
    transition: transform 0.2s;
  }

  .book-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


}


@media (min-width: 576px) {
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 5%;
  }

  .book-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
}
  
}
</style>

