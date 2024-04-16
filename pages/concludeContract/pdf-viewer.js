const url = "https://rkkabel.by/sites/default/files/tipovaya_forma_dogovora.pdf";

pdfjs.Lib.getDocument(url).promise.then((doc) => {
  console.log(doc); 
})