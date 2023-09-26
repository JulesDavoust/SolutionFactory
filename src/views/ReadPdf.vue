<template>
  <div>
    <div class="button-group">
      <button class="top" @click="previousPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPageLeft}} et {{currentPageRight}} sur {{ totalPages }}</span>
      <button class="top" @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
    <div id="container">
      <div class="page-container-left">
        <canvas ref="pdfCanvasLeft" class="pdf-canvas"></canvas>
      </div>
      <div class="page-container-right">
        <canvas ref="pdfCanvasRight" class="pdf-canvas"></canvas>
      </div>
    </div>
    <div class="button-group">
      <button @click="previousPage" :disabled="currentPage === 1">Précédent</button>
      <span>Page {{ currentPageLeft}} et {{currentPageRight}} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Suivant</button>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';
export default {
  data() {
    return {
      currentPageLeft: 1,
      currentPageRight: 2, // La page suivante de la page de gauche
      totalPages: 0,
      pdfDocument: null,
    };
  },
  mounted() {
    const encodeChiffre = this.$route.params.id;
    console.log(encodeChiffre)
    var idEbook = this.dechiffrement(encodeChiffre)
    console.log(`ID de l'ebook : ${idEbook}`);
    this.loadPDF(idEbook);
  },
  methods: {
    dechiffrement(chiffreEncode) {
      var cle = "MaCleSecrete";
      var chiffreDecode = CryptoJS.AES.decrypt(chiffreEncode, cle).toString(CryptoJS.enc.Utf8);
      return chiffreDecode
    },
    clearCanvas() {
      const canvas = this.$refs.pdfCanvas;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    loadPDF(idEbook) {
      const self = this;
      const canvasLeft = self.$refs.pdfCanvasLeft;
      const canvasRight = self.$refs.pdfCanvasRight;
      fetch(`http://localhost:8080/api/ebooks/oneEbook/${idEbook}`)
        .then(response => response.json())
        .then(dataEbook => {
          console.log(dataEbook.path);
          const pdfPath = '../..'+dataEbook.path
          pdfjsLib.getDocument(pdfPath).promise
          .then(pdf => {
            self.pdfDocument = pdf;
            self.totalPages = pdf.numPages;

            self.pdfDocument.getPage(self.currentPageLeft).then(pageLeft => {
              self.pdfDocument.getPage(self.currentPageRight).then(pageRight => {
                self.renderPage(pageLeft, canvasLeft);
                self.renderPage(pageRight, canvasRight);
              });
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    renderPage(page, canvas) {
      const scale = 0.9;
      const viewport = page.getViewport({ scale: scale });
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      page.render(renderContext);
    },
    previousPage() {
      if (this.currentPageLeft > 1) {
        this.currentPageLeft -= 2;
        this.currentPageRight -= 2;
        this.renderCurrentPages();
      }
    },

    nextPage() {
      if (this.currentPageRight < this.totalPages) {
        this.currentPageLeft += 2;
        this.currentPageRight += 2;
        this.renderCurrentPages();
      }
    },
    renderCurrentPages() {
      const self = this;
      const canvasLeft = self.$refs.pdfCanvasLeft;
      const canvasRight = self.$refs.pdfCanvasRight;

      self.pdfDocument.getPage(self.currentPageLeft).then(pageLeft => {
        self.pdfDocument.getPage(self.currentPageRight).then(pageRight => {
          self.renderPage(pageLeft, canvasLeft);
          self.renderPage(pageRight, canvasRight);
        });
      });
    },
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: center;
  gap: 10px; /* Espacement entre les éléments */
  margin-top:1%;
}

#canvas {
  border: 4px solid black; /* Ajout de la bordure noire */
  margin-top: 2%;
  margin-bottom: 1%;
}
#container{
  border:4px solid black ;
  margin-top: 2%;
  margin-bottom: 2%;
}
.page-container-left,
.page-container-right {
  display: inline-block;
  width: 50%;
  vertical-align: top;
}

.pdf-canvas {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>