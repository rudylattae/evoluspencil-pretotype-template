function onCloseBtnClick() {
    this.parentElement.classList.remove('visible');
}

function wireUpCloseButtons() {
    var btns = $('.close'),
        i = 0;
        max = btns.length;

    for (; i < max; i++) {
        btns[i].addEventListener('click', onCloseBtnClick, false);
    }
}


function onOpenBtnClick() {
    this.parentElement.classList.add('visible');
}

function wireUpOpenButtons() {
    var btns = $('.open'),
        i = 0;
        max = btns.length;

    for (; i < max; i++) {
        btns[i].addEventListener('click', onOpenBtnClick, false);
    }
}


wireUpCloseButtons();
wireUpOpenButtons();


Path.map("#/page/:page_id").to(function(){
    var page_id = this.params['page_id'];
    $('.page').hide();
    $('#'+page_id).show();
});

Path.root("#/page/start");

Path.listen();