// $alt.js
(function(g, document) {

    // Alternative DOM Wrapper
    function AlternativeDomWrapper( elements ) {
        if ( typeof elements.length === 'undefined' ) 
            this.elements = [elements];
        else
            this.elements = elements;
    }

    // applies the given function to each of the childern
    AlternativeDomWrapper.prototype.each = function each(fn, thisArg) {
        var i = 0,
            z = this.elements.length;

        for (; i < z; i++) {
            fn.call(thisArg || this.elements[i], this.elements[i], i);
        }
        return this;
    };


    // based on salt.js | https://github.com/james2doyle/saltjs
    /*! Salt.js DOM Selector Lib. By @james2doyle */
    function salt( selector, context ) {
        if ( typeof context === 'undefined' ) context = document;

        // an object containing the matching keys and native get commands
        var matches = {
            '#': 'getElementById',
            '.': 'getElementsByClassName',
            '@': 'getElementsByName',
            '=': 'getElementsByTagName',
            '*': 'querySelectorAll'
        }[selector[0]]; // you can treat a string as an array of characters

        // now pass the target without the key
        return (context[matches](selector.slice(1)));
    }


    // public API
    function $alt( document, engine, wrapper ) {

        if ( typeof document === 'undefined' )
            throw new Error('document is required');

        if ( typeof engine === 'undefined' )
            engine = salt;

        if ( typeof wrapper === 'undefined' )
            wrapper = AlternativeDomWrapper;

        function api( what, context ) {
            if ( typeof context === 'undefined' ) context = document;

            // handle $(element) || $(object)
            if (typeof what === 'object') {
                if ( wrapper !== null ) return new wrapper( what );
                else return what;
            }

            // handle $(fn)
            if (typeof what === 'function') {
                /c/.test(context.readyState) ? what() : context.addEventListener('DOMContentLoaded', what)
                return this;
            }

            if ( wrapper !== null ) return new wrapper( engine(what, context) );
            else return engine(what, context);
        }

        // augments the wrapper by attaching the given extensions to it's prototype
        function extendWrapper( extensions, force ) {
            for( name in extensions ) {
                x = extensions[name];
                if ( extensions.hasOwnProperty(name) 
                        && typeof x !== 'undefined'
                        && ( !wrapper.prototype.hasOwnProperty(name) || force) ) {
                    wrapper.prototype[name] = x;
                }
                else 
                    throw new Error('wrapper already has ' + name + ' defined');
            }
        }

        // enable wrapper extensions
        api.fn = wrapper.prototype;
        api.xfn = extendWrapper;

        return api;
    }

    $alt.AlternativeDomWrapper = AlternativeDomWrapper;

    // exports
    g.$alt = $alt;

}(this, document));


// $alt-basics.js
var $ = $alt( document );

$.xfn({
    // dom
    attr: function( name, value ) {
        if ( typeof value !== 'undefined' ) {
            this.each( function( el ) { el.setAttribute(name, value); });
        } else {
            return this.elements[0].getAttribute(name);
        }
        return this;
    },

    // events
    on: function( type, listener, capture) {
        return this.each( function( el ) {
            el.addEventListener( type, listener, capture );
        });
    },

    off: function( type, listener) {
        return this.each( function( el ) {
            el.removeEventListener( type, listener, capture );
        });
    },

    // styling
    css: function( prop, value ) {
        if ( typeof value !== 'undefined' ) {
            this.each( function( el ) { el.style[prop] = value; });
        } else {
            return this.elements[0].style[prop];
        }
        return this;
    },
    
    addClass: function( c ) {
        return this.each( function( el ) { el.classList.add( c ); });
    },

    removeClass: function( c ) {
        return this.each( function( el ) { el.classList.remove( c ); });
    },

    hasClass: function( c ) {
        var i = 0,
            z = this.elements.length;

        for (; i < z; i++) {
            if ( this.elements[i].classList.contains( c ) ) return true;
        }
        return false;
    },

    // visibility
    hide: function() {
        return this.css('display', 'none');
    },

    show: function() {
        return this.css('display', '');
    }
});


// cookie.min.js
// https://github.com/js-coder/cookie.js
// Copyright (c) 2012 Florian H.
!function(e,t){var n=function(){return n.get.apply(n,arguments)},r=n.utils={isArray:Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},isPlainObject:function(e){return!!e&&Object.prototype.toString.call(e)==="[object Object]"},toArray:function(e){return Array.prototype.slice.call(e)},getKeys:Object.keys||function(e){var t=[],n="";for(n in e)e.hasOwnProperty(n)&&t.push(n);return t},escape:function(e){return String(e).replace(/[,;"\\=\s%]/g,function(e){return encodeURIComponent(e)})},retrieve:function(e,t){return e==null?t:e}};n.defaults={},n.expiresMultiplier=86400,n.set=function(n,i,s){if(r.isPlainObject(n))for(var o in n)n.hasOwnProperty(o)&&this.set(o,n[o],i);else{s=r.isPlainObject(s)?s:{expires:s};var u=s.expires!==t?s.expires:this.defaults.expires||"",a=typeof u;a==="string"&&u!==""?u=new Date(u):a==="number"&&(u=new Date(+(new Date)+1e3*this.expiresMultiplier*u)),u!==""&&"toGMTString"in u&&(u=";expires="+u.toGMTString());var f=s.path||this.defaults.path;f=f?";path="+f:"";var l=s.domain||this.defaults.domain;l=l?";domain="+l:"";var c=s.secure||this.defaults.secure?";secure":"";e.cookie=r.escape(n)+"="+r.escape(i)+u+f+l+c}return this},n.remove=function(e){e=r.isArray(e)?e:r.toArray(arguments);for(var t=0,n=e.length;t<n;t++)this.set(e[t],"",-1);return this},n.empty=function(){return this.remove(r.getKeys(this.all()))},n.get=function(e,n){n=n||t;var i=this.all();if(r.isArray(e)){var s={};for(var o=0,u=e.length;o<u;o++){var a=e[o];s[a]=r.retrieve(i[a],n)}return s}return r.retrieve(i[e],n)},n.all=function(){if(e.cookie==="")return{};var t=e.cookie.split("; "),n={};for(var r=0,i=t.length;r<i;r++){var s=t[r].split("=");n[decodeURIComponent(s[0])]=decodeURIComponent(s[1])}return n},n.enabled=function(){if(navigator.cookieEnabled)return!0;var e=n.set("_","_").get("_")==="_";return n.remove("_"),e},typeof define=="function"&&define.amd?define(function(){return n}):typeof exports!="undefined"?exports.cookie=n:window.cookie=n}(document);

// path.min.js
var Path={version:"0.8.4",map:function(a){if(Path.routes.defined.hasOwnProperty(a)){return Path.routes.defined[a]}else{return new Path.core.route(a)}},root:function(a){Path.routes.root=a},rescue:function(a){Path.routes.rescue=a},history:{initial:{},pushState:function(a,b,c){if(Path.history.supported){if(Path.dispatch(c)){history.pushState(a,b,c)}}else{if(Path.history.fallback){window.location.hash="#"+c}}},popState:function(a){var b=!Path.history.initial.popped&&location.href==Path.history.initial.URL;Path.history.initial.popped=true;if(b)return;Path.dispatch(document.location.pathname)},listen:function(a){Path.history.supported=!!(window.history&&window.history.pushState);Path.history.fallback=a;if(Path.history.supported){Path.history.initial.popped="state"in window.history,Path.history.initial.URL=location.href;window.onpopstate=Path.history.popState}else{if(Path.history.fallback){for(route in Path.routes.defined){if(route.charAt(0)!="#"){Path.routes.defined["#"+route]=Path.routes.defined[route];Path.routes.defined["#"+route].path="#"+route}}Path.listen()}}}},match:function(a,b){var c={},d=null,e,f,g,h,i;for(d in Path.routes.defined){if(d!==null&&d!==undefined){d=Path.routes.defined[d];e=d.partition();for(h=0;h<e.length;h++){f=e[h];i=a;if(f.search(/:/)>0){for(g=0;g<f.split("/").length;g++){if(g<i.split("/").length&&f.split("/")[g].charAt(0)===":"){c[f.split("/")[g].replace(/:/,"")]=i.split("/")[g];i=i.replace(i.split("/")[g],f.split("/")[g])}}}if(f===i){if(b){d.params=c}return d}}}}return null},dispatch:function(a){var b,c;if(Path.routes.current!==a){Path.routes.previous=Path.routes.current;Path.routes.current=a;c=Path.match(a,true);if(Path.routes.previous){b=Path.match(Path.routes.previous);if(b!==null&&b.do_exit!==null){b.do_exit()}}if(c!==null){c.run();return true}else{if(Path.routes.rescue!==null){Path.routes.rescue()}}}},listen:function(){var a=function(){Path.dispatch(location.hash)};if(location.hash===""){if(Path.routes.root!==null){location.hash=Path.routes.root}}if("onhashchange"in window&&(!document.documentMode||document.documentMode>=8)){window.onhashchange=a}else{setInterval(a,50)}if(location.hash!==""){Path.dispatch(location.hash)}},core:{route:function(a){this.path=a;this.action=null;this.do_enter=[];this.do_exit=null;this.params={};Path.routes.defined[a]=this}},routes:{current:null,root:null,rescue:null,previous:null,defined:{}}};Path.core.route.prototype={to:function(a){this.action=a;return this},enter:function(a){if(a instanceof Array){this.do_enter=this.do_enter.concat(a)}else{this.do_enter.push(a)}return this},exit:function(a){this.do_exit=a;return this},partition:function(){var a=[],b=[],c=/\(([^}]+?)\)/g,d,e;while(d=c.exec(this.path)){a.push(d[1])}b.push(this.path.split("(")[0]);for(e=0;e<a.length;e++){b.push(b[b.length-1]+a[e])}return b},run:function(){var a=false,b,c,d;if(Path.routes.defined[this.path].hasOwnProperty("do_enter")){if(Path.routes.defined[this.path].do_enter.length>0){for(b=0;b<Path.routes.defined[this.path].do_enter.length;b++){c=Path.routes.defined[this.path].do_enter[b]();if(c===false){a=true;break}}}}if(!a){Path.routes.defined[this.path].action()}}};
    