(function ($) {

    $.fn.wordsrotator = function (options) {
        var defaults = {
            autoLoop: true,
            randomize: false,
            stopOnHover: false,
            changeOnClick: false,
            words: null,
            animationIn: "flipInY",
            animationOut: "flipOutY",
            speed: 40,
            onRotate: function () {},/
            stopRotate: function () {}

        };
        var settings = $.extend({}, defaults, options);
        var listItem
        var array_bak = [];
        var stopped = false;

        settings.stopRotate = function () {
            stopped = true;
        }

        return this.each(function () {
            var el = $(this)
            var cont = $("#" + el.attr("id"));
            var array = [];

            //if array is not empty
            if ((settings.words) || (settings.words instanceof Array)) {
                array = $.extend(true, [], settings.words);

                //In random order, need a copy of array
                if (settings.randomize) array_bak = $.extend(true, [], array);


                listItem = 0
                //if randomize pick a random value for the list item
                if (settings.randomize) listItem = Math.floor(Math.random() * array.length)

                //init value into container
                cont.html(array[listItem]);


                // animation option
                var rotate = function () {


                    cont.html("<span class='wordsrotator_wordOut'><span>" + array[listItem] + "</span></span>");

                    if (settings.randomize) {
                        //remove printed element from array
                        array.splice(listItem, 1);
                        //refill the array from his copy, if empty
                        if (array.length == 0) array = $.extend(true, [], array_bak);
                        //generate new random number
                        listItem = Math.floor(Math.random() * array.length);
                    } else {
                        //if reached the last element of the array, reset the index 
                        if (array.length == listItem + 1) listItem = -1;
                        //move to the next element
                        listItem++;
                    }

                    $("<span class='wordsrotator_wordIn'>" + array[listItem] + "</span>").appendTo(cont);
                    cont.wrapInner("<span class='wordsrotator_words' />");
                    cont.find(".wordsrotator_wordOut").addClass("animated " + settings.animationOut);
                    cont.find(".wordsrotator_wordIn").addClass("animated " + settings.animationIn);

                    settings.onRotate();//this callback will allow to change the speed

                    if (settings.autoLoop && !stopped) {
                        //using timeout instead of interval will allow to change the speed
                        t = setTimeout(function () {
                            rotate()
                        }, settings.speed, function () {
                            rotate()
                        });
                        if (settings.stopOnHover) {
                            cont.hover(function () {
                                window.clearTimeout(t)
                            }, function () {
                                t = setTimeout(rotate, settings.speed, rotate);

                            });
                        };
                    }
                };


                t = setTimeout(function () {
                    rotate()
                }, settings.speed, function () {
                    rotate()
                })
                cont.on("click", function () {
                    if (settings.changeOnClick) {
                        rotate();
                        return false;
                    };
                });



            };

        });
    }

}(jQuery));

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}


function erm() {
    var cont = $("#myWords");

    $(function () {
        $("#myWords").wordsrotator({
            animationIn: "fadeOutIn", //css class for entrace animation
            animationOut: "fadeOutDown", //css class for exit animation
            randomize: true,
            words: ['Heimerdinger', 'Ezreal', 'Skarner', 'Nunu', 'Kennen', 'Lulu', 'Morgana', 'Sejuani', 'Draven', 'Nocturne', 'KogMaw', 'Jinx', 'Khazix', 'Cassiopeia', 'Fiora', 'Maokai', 'Zac', 'Quinn', 'Vladimir', 'RekSai', 'LeeSin', 'TwistedFate', 'MissFortune', 'Shaco', 'Vayne', 'Sivir', 'Urgot', 'Nautilus', 'Annie', 'Fizz', 'Janna', 'Irelia', 'Karthus', 'Trundle', 'Jax', 'Graves', 'Leona', 'Rengar', 'Amumu', 'Malzahar', 'TahmKench', 'MasterYi', 'Twitch', 'Rumble', 'Nidalee', 'Shyvana', 'Veigar', 'Singed', 'Riven', 'Leblanc', 'Katarina', 'Azir', 'Viktor', 'Poppy', 'Ahri', 'Yorick', 'Aatrox', 'Brand', 'Tryndamere', 'DrMundo', 'Hecarim', 'Braum', 'Nasus', 'Pantheon', 'Elise', 'Velkoz', 'Swain', 'Darius', 'Kayle', 'Thresh', 'Nami', 'Ekko', 'Alistar', 'Galio', 'Warwick', 'Orianna', 'Sona', 'Lux', 'Ryze', 'Jayce', 'Kassadin', 'Volibear', 'Blitzcrank', 'Gangplank', 'Karma', 'XinZhao', 'Ziggs', 'Malphite', 'Tristana', 'Soraka', 'Anivia', 'Xerath', 'Renekton', 'Shen', 'Lissandra', 'Ashe', 'Mordekaiser', 'Talon', 'Zilean', 'JarvanIV', 'Rammus', 'Yasuo', 'Vi', 'Bard', 'Sion', 'Udyr', 'MonkeyKing', 'Akali', 'Diana', 'Varus', 'Kalista', 'Evelynn', 'Teemo', 'Gnar', 'Garen', 'Taric', 'FiddleSticks', 'Chogath', 'Zed', 'Lucian', 'Caitlyn', 'Corki', 'Zyra', 'Syndra', 'Gragas', 'Olaf'],
            onRotate: function () {
              //on each rotate you make the timeout longer, until it's slow enough
              if (this.speed > 600) {
                    this.speed += 30;
                }
                if (this.speed < 1200) {
                    this.speed += 10;

                } else {
                    this.stopRotate();
                   	console.log(document.getElementsByClassName('.wordsrotator_wordOut span').innerHTML);
                }
            }


        });

    });

}