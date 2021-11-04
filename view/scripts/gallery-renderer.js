$( document ).ready(createGallery)

function startGallery(){
    $('#gallery-image-1').trigger('click');
}


function createGallery(){
    let index = 0;

    let images = window.getImages();
    let imageHtml = images.map(image => {
        index++;
        return `
        <a id="gallery-image-${index.toString()}"
         style="display: none;" 
         id="gallery" 
         href="images/gallery/${image}" 
         data-lightbox="mumsbirthday">
        </a>`.replace(/\n/g,"");
    }).join("\n");

    $("#gallery").html(imageHtml)
}