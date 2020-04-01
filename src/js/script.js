$(function() {

    $('.services__service').on('mouseenter', function() {
        $(this).addClass('services__service_hovered')
    });

    $('.services__service').on('mouseleave', function() {
        $(this).removeClass('services__service_hovered')
    });

    if ($('.video__video').length) {
        let link = $('.video__video').attr('data-src');
        let embedLink = createYouTubeEmbedLink(link);
        let previewPic = createYouTubePicPreview(embedLink);

        $('.video__thumb').css({ 'background-image': `url(${previewPic}` });
    }

    $('.video__video').on('click', function() {
        let link = $('.video__video').attr('data-src');
        let embedLink = createYouTubeEmbedLink(link);
        $('.video__video').append(`<iframe class="video__iframe" src="${embedLink}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
        $('.video__playbtn').css({ 'opacity': 0, 'visibility': 'hidden' });
    });

    function createYouTubePicPreview(dataSrcStr) {
        let picStr = 'http://img.youtube.com/vi/';
        return picStr + dataSrcStr.slice(dataSrcStr.lastIndexOf('/') + 1, dataSrcStr.indexOf('?')) + '/0.jpg'
    }

    function createYouTubeEmbedLink(link) {
        let linkStart = 'https://www.youtube.com/embed/';
        let linkEnd = '?rel=0&showinfo=0&autoplay=1';
        let isParams = link.indexOf('&', link.indexOf('?') + 1) === -1 ? false : true;

        return isParams ?
            linkStart + link.slice(link.indexOf('=') + 1, link.indexOf('&')) + linkEnd :
            linkStart + link.slice(link.indexOf('=') + 1) + linkEnd
    }
});