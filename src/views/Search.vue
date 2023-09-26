<template>
    <div class="content">
        <div :class="{'col-md-3':arrayEbooks.length > 2, 'col-12':arrayEbooks.length >2}" v-for="book in arrayEbooks" :key="book.idEbook" >
            <div class="book-container" 
                    @mouseenter="handleMouseEnter"
                    @mouseleave="handleMouseLeave">
                <img :src="book.coverPage" :alt="book.title" class="book-image" data-bs-toggle="modal" :data-bs-target="'#modal-home-'+book.idEbook">
                <div class="book-title" :class="{ 'hovered': isHovered }">{{ book.title }}</div>
            </div>
        </div>
    </div>

    <section class="all-modals">
        
        <div v-for="ebook in arrayEbooks" :key="ebook.idEbook" class="modal" :id="'modal-home-'+ebook.idEbook" tabindex="-1">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">

                    <div class="modal-header">
                        <div class="modal-header-content">
                            <h5 class="modal-title">{{ ebook.title }}</h5>
                            <h5 class="modal-author">{{ authors[(ebook.idEbook).toString()].firstNameAuthor }} {{ authors[(ebook.idEbook).toString()].lastNameAuthor }}</h5>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <div class="modal-top">
                            <div class="modal-top-left">
                                <img alt="..." :src="ebook.coverPage" class="book-cover" />
                            </div>

                            <div class="modal-top-right">
                                <p class="modal-bookinfo">
                                    <b>Author:</b> {{ authors[(ebook.idEbook).toString()].firstNameAuthor }} {{ authors[(ebook.idEbook).toString()].lastNameAuthor }} <br>
                                    <b>Publication date:</b> {{ ebook.publishDate }} <br>
                                    <b>Edition:</b> {{ ebook.editor }} <br>
                                    <b>Language:</b> {{ ebook.language }}
                                </p>
                                <div class="modal-buttons">
                                  <button v-if="isLogged" class="modal-button-rent" :class="{ 'disabled-button': !isLogged, 'additional-class': condition }" @click="paiement(ebook.idEbook)">
                                    <p class="modal-button-text">Rent this book</p>
                                  </button>
                                  <button v-if="isLogged" class="modal-button-like" :class="{ 'disabled-button': !isLogged, 'additional-class': condition }" @click="addLike(ebook.idEbook)">
                                    <img class="modal-image-like" src="/public/like_icon.png" alt="like">
                                  </button>
                                </div>
                            </div>
                        </div>

                        <div class="modal-bottom">
                            <p class="modal-description">
                                <b>Description</b><br>
                                {{ ebook.descriptionEbook }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

</template>

<script>
import AuthService from '../services/auth.service'
export default {
    data(){
        return{
            searchID: null,
            arrayEbooks: [],
            carrouselAuthorId: [],
            authors:{},
            isLogged: true
        }
    },

    created() {
        this.searchID = this.$route.params.searchID;
        console.log(this.searchID)
        this.isLogged = AuthService.isLogged()
        console.log(this.isLogged)
        this.fetchData();
    },
    watch: {
        // Ajoutez un watcher pour '$route.params'
        '$route.params':
        function (newParams, oldParams) {
            if (newParams.searchID !== oldParams.searchID) {
            this.searchID = newParams.searchID;
            this.fetchData();
            }
        }
    },

  methods: {
    fetchData() {
      this.authors = {}
      // Mettez votre code fetch ici
      fetch(`http://localhost:8080/api/ebooks/name/${this.searchID}`)
        .then(response => response.json())
        .then(dataEbooks => {
            this.arrayEbooks = dataEbooks
            console.log(this.arrayEbooks[0]);
            for(let j = 0; j<this.arrayEbooks.length; j++){
              console.log(this.arrayEbooks[j].idEbook);
              fetch(`http://localhost:8080/api/authors/oneAuthor/${this.arrayEbooks[j].authorID}`)
                .then(response => response.json())
                .then(data => {
                console.log("test " , data);
                this.authors[this.arrayEbooks[j].idEbook]=(data);;
                console.log(this.authors)
                
              })
                .catch(err => console.log("error from fetch : ", err));
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
    paiement(idEbook){
      console.log(idEbook)
      this.$router.push({ name: 'Paiement', params: {id :idEbook} });
      
    },
    addLike(idEbook){
      console.log("liked")
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
    }

  },

}



 
</script>

<style>

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
}

  .book-image {
  max-width: 70%;
  height: auto;
  border-radius: 5%;
  margin-top:3%;
  margin-bottom: 3%;
}

.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* aligne les éléments au centre */
  border: 1px solid black;
  border-radius: 5%;
  background-color: azure;
  box-shadow: 2px 2px 5px black;
  border-radius: 3%;
  margin-top: 5%;
  width:70%;
  margin-left:13%;
  transition: transform 0.2s;
}

  .book-title {
  word-wrap: break-word; 
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center; /* Centrer le texte */
}

@media (max-width: 1300px) {
  .col-md-4 {
    flex: 0 0 50%;
    max-width: 100%;
  }

  .content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
}

  .book-image {
  max-width: 70%;
  height: auto;
  border-radius: 5%;
  margin-top:3%;
  margin-bottom: 3%;
}

.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* aligne les éléments au centre */
  border: 1px solid black;
  box-shadow: 2px 2px 5px black;
  border-radius: 5%;
  border-radius: 3%;
  background-color: azure;
  margin-top: 5%;
  width:70%;
  margin-left:13%;
  transition: transform 0.2s;
}

  .book-title {
  word-wrap: break-word; 
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center; /* Centrer le texte */
}
}

@media (max-width: 1000px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 80px;
}

  .book-image {
  max-width: 70%;
  height: auto;
  border-radius: 5%;
  margin-top:3%;
  margin-bottom: 3%;
}

.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* aligne les éléments au centre */
  border: 1px solid black;
  box-shadow: 2px 2px 5px black;
  border-radius: 5%;
  background-color: azure;
  margin-top: 5%;
  width:70%;
  margin-left:13%;
  transition: transform 0.2s;
}

  .book-title {
  word-wrap: break-word; 
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center; /* Centrer le texte */
}
}

@media (min-width: 576px) {

    .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 5%;
  }

  .book-image {
  max-width: 70%;
  height: auto;
  margin-top:3%;
  border-radius: 5%;
  margin-bottom: 0;
}

.book-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* aligne les éléments au centre */
  border: 1px solid black;
  box-shadow: 2px 2px 5px black;
  border-radius: 5%;
  background-color:azure;
  margin-top: 5%;
  width:70%;
  margin-left:13%;
  transition: transform 0.2s;
}

  .book-title {
  word-wrap: break-word; 
  overflow-wrap: break-word;
  padding: 10px;
  text-align: center; /* Centrer le texte */
}
  
}
.modal-backdrop {
  display: none;
}


.modal {
  transition: all 0.5s ease-in-out;
}

.modal-top{
    display: grid;
    grid-template-columns: 1fr 1fr;

}

.book-cover{
    width: 100%;
    border-radius: 5%;
    box-shadow: 4px 4px 8px 0px #898989, 8px 8px 12px 0px rgba(137, 137, 137, 0.20), -4px -4px 8px 0px rgba(255, 255, 255, 0.75), -8px -8px 12px 0px rgba(255, 255, 255, 0.25);
}
.modal-top-right{
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: transparent;
}

.modal-buttons{
    display: flex;
    flex-direction: column;
    background-color: transparent;
    width: 40%;
}

.modal-description{
    border-top: 5%;
}

.modal-button-rent,
.modal-button-like {
    border-radius: 5px;
    margin: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  box-shadow: 4px 4px 8px 0px #898989, 8px 8px 12px 0px rgba(137, 137, 137, 0.20), -4px -4px 8px 0px rgba(255, 255, 255, 0.75), -8px -8px 12px 0px rgba(255, 255, 255, 0.25);

  cursor: pointer;
}

.modal-button-rent {
  background-color: #898989;
  color: #fff;
}

.modal-button-like {
  background-color: transparent;
  border: 1px solid #ccc;
}

.modal-button-text {
  margin: 0;
}

.modal-image-like {
  width: 20px;
  height: 20px;
}

/* Responsive styles */
@media (max-width: 576px) {
  .modal-button-rent,
  .modal-button-like {
    width: 100%;
  }
}

@media (min-width: 577px) {
  .modal-button-rent,
  .modal-button-like {
    width: auto;
  }
}

.modal-button-rent{
    background-color: #898989;
    border-radius: 5%;
    box-shadow: 4px 4px 8px 0px #898989, 8px 8px 12px 0px rgba(137, 137, 137, 0.20), -4px -4px 8px 0px rgba(255, 255, 255, 0.75), -8px -8px 12px 0px rgba(255, 255, 255, 0.25);
}
.modal-button-like{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 5%;
    height: 45%;
}



.book-cover{
    width: 100%;
    border-radius: 5%;
    box-shadow: 4px 4px 8px 0px #898989, 8px 8px 12px 0px rgba(137, 137, 137, 0.20), -4px -4px 8px 0px rgba(255, 255, 255, 0.75), -8px -8px 12px 0px rgba(255, 255, 255, 0.25);
}
.modal-top-right{
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    background-color: transparent;
}

.modal-buttons{
    display: flex;
    flex-direction: column;
    background-color: transparent;
    width: 40%;
}
.modal-button-rent{
    background-color: #898989;
    border-radius: 5%;
    box-shadow: 4px 4px 8px 0px #898989, 8px 8px 12px 0px rgba(137, 137, 137, 0.20), -4px -4px 8px 0px rgba(255, 255, 255, 0.75), -8px -8px 12px 0px rgba(255, 255, 255, 0.25);
}
.modal-button-like{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 5%;
    height: 45%;
}



.modal-bookinfo, .modal-description {
    color: #1a1a1a;
}

</style>