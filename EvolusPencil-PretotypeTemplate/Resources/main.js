var $ = function(a,b){a=a.match(/^(\W)?(.*)/);return(b||document)["getElement"+(a[1]?a[1]=="#"?"ById":"sByClassName":"sByTagName")](a[2])};

Path.map("#/page/:page_id").to(function(){
    var page_id = this.params['page_id'];
    var pages = $('.page');
    for(i=0; i<pages.length; i++) {
        pages[i].style.display = 'none';
    }
    $('#'+page_id).style.display = '';
});

Path.root("#/page/start");

Path.listen();