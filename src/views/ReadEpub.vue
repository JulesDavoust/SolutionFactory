<template>
    <div class="container">
        <div id="viewer"></div> 
        <div class="buttons">
            <button @click="prevPage">Précédent</button>
            <div class="page-counter"></div>
            <button @click="nextPage">Suivant</button>
        </div>
    </div>
</template>
  
<script>
import CryptoJS from 'crypto-js';
import ePub from "epubjs";
  
export default {
    data() {
      return {
        book: null,
        rendition: null,
        displayed: null,
        currentPage: 1,
        totalPages: 0
      };
    },
    mounted() {
        
        
        
        this.loadPDF(idEbook);
    },
    mounted() {
        const encodeChiffre = this.$route.params.id;
        console.log(encodeChiffre)
        var idEbook = this.dechiffrement(encodeChiffre)
        console.log(`ID de l'ebook : ${idEbook}`);
        fetch(`http://localhost:8080/api/ebooks/oneEbook/${idEbook}`)
        .then(response => response.json())
        .then(dataEbook => {
            console.log(dataEbook.path);
            const pdfPath = '../..'+dataEbook.path
            console.log(pdfPath)
            this.book = ePub(pdfPath);
            this.book.loaded.metadata.catch(error => {
                console.error("Error loading book:", error);
            });
            this.rendition = this.book.renderTo("viewer", { 
                width: "100%", 
                height: "100%" 
            });
            this.rendition.display()
        })
        .catch(error => {
          console.log(error);
        });
        
    },
    methods: {
        dechiffrement(chiffreEncode) {
            var cle = "MaCleSecrete";
            var chiffreDecode = CryptoJS.AES.decrypt(chiffreEncode, cle).toString(CryptoJS.enc.Utf8);
            return chiffreDecode
        },
        nextPage() {
            this.rendition.next();
            this.currentPage = this.currentPage + 1
        },
        prevPage() {
            this.rendition.prev();
            this.currentPage = this.currentPage - 1
        },
    }
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    border: 2px solid #000;
    border-radius: 5px;
    padding: 10px;
}

#viewer{
    width: 80vw; 
    height: 80vh;
    margin: 0 auto;
    border: 1px solid #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    overflow: auto;
}

.buttons {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    padding: 10px 0;
}

.page-counter {
    display: flex;
    align-items: center;
}
</style>