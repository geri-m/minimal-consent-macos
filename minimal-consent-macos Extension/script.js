document.addEventListener("DOMContentLoaded", function(event) {
    safari.extension.dispatchMessage("Hello World!");
    console.log("Document:" + document);
    console.log("Document Body:"  + document.body);
    console.log("Document Body:"  + document.body.innerHTML.length);
    console.log("Document Body:"  + document.getElementsByTagName("body").innerHTML.length);
});
