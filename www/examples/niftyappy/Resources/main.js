(function() {
    var pinned = false;

    function closeNotes() {
        var notes = $('.notes');
        if (notes.hasClass('pinned')) {
            notes.removeClass('visible');
            notes.removeClass('pinned');
        } else {
            $(this.parentElement).removeClass('visible');
        }
    }

    function openNotes() {
        $(this.parentElement).addClass('visible');
    }

    function pinNotes() {
        var notes = $('.notes');
        notes.addClass('visible');
        notes.addClass('pinned');
    }

    $('.open').on('click', openNotes);
    $('.close').on('click', closeNotes);
    $('.pin').on('click', pinNotes);

    Path.map("#/page/:page_id").to(function(){
        var page_id = this.params['page_id'];
        $('.page').hide();
        $('#'+page_id).show();
    });

    Path.root("#/page/start");

    Path.listen();
}());
