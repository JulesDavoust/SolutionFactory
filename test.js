const PDFStart = () => {      
    console.log("Hi1")     
    let loadingTask = pdfjsLib.getDocument('./Ebook/Dans_la_nuit.pdf'),
        pdfDoc = null,
        canvas = document.querySelector('#cnv'),
        ctx = canvas.getContext('2d'),
        scale = 1.5,
        numPage = 1;
        console.log("Hi")
}

const startPdf = () =>{
    PDFStart()
}

window.addEventListener('load',startPdf)