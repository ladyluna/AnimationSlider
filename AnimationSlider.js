if (!window.AnimationSlider) {

var AnimationSlider = (function() {

'use strict';

/**
 * AnimationSlider
 *
 * @version 1.1.0
 * @author Natalia Uvarova
 */

 /**
 * Version 1.1.0: 
 * Добавлена плавность смены кадров и появления первого кадра
 */

/** 
 * @constructor AnimationSlider
 *
 * @param {jQuery Object} $container контейнер
 * @param {Object} arrayImages массив картинок (пути до картинок и виды анимаций)
 * @param {Object} params параметры
 * 
 */
var AnimationSlider = function ($container, arrayImages, params) {

    this.init($container, arrayImages, params);

};

AnimationSlider.prototype = {

    _config: {
       selectorElem: '[data-elem="photo"]',
       // задержка перед началом Анимации
       delayStartAnimation: 500,
       // продолжительность смены кадров
       durationChangeAnimation: 2000,
       // продолжительность анимации (для css-анимации прописана в стилях)
       durationAnimation: 15000,
       // Признак Использовать ли css анимацию
       useCssAnimation: Modernizr.csstransforms && Modernizr.csstransitions
    },
    // Имена Видов анимаций
    namesAnimation: {
        // Уменьшать
        'decrease': 'scale-small', 
        // Увеличивать
        'increase': 'scale', 
        // Сдвиг "Снизу-Вверх"
        'shift-bottom-up': 'top', 
        // Сдвиг "Сверху-Вниз"
        'shift-top-down': 'bottom'
    },

    // Объекты для JS-анимации
    objJSAnimation: {
        'scale-small': {

            'from': {
                'display': 'block',
                'position': 'absolute',
                'top': 77 + 'px',  /* половина высоты родителя */
                'left': '50%',
                'margin-left': -1000 + 'px',
                'margin-top': -130 + 'px', /* половина высоты картинки */
                'width': 2000 + 'px'
            },

            'to': {
                'marginLeft': -600,
                'marginTop': -77,
                'width': 1200
            }

        },

        'scale': {

            'from': {
                'display': 'block',
                'position': 'absolute',
                'top': 77 + 'px',
                'left': '50%',
                'margin-left': -600 + 'px',
                'margin-top': -77 + 'px',
                'width': 1200 + 'px'
            },

            'to': {
                'marginLeft': -1000,
                'marginTop': -130,
                'width': 2000
            }

        },

        'top': {

            'from': {
               'margin-top': -345 + 'px'
            },

            'to': {
                'marginTop': 0
            }
  
        },

        'bottom': {

            'from': {
               'margin-top': 0
            },

            'to': {
                'marginTop': -345
            }

        }
    }, 

    /**
     * Инициализация
     *
     * @method init
     *
     * @param {jQuery Object} $container контейнер
     * @param {Object} arrayImages данные 
     * @param {Object} params параметры
     */
    init: function($container, arrayImages, params) {

        var that = this;

        that.$container = $container;

        that.arrayImages = arrayImages;

        that.shuffleImages = _.shuffle(that.arrayImages);

        that._config = $.extend({}, that._config, params);

        that.useCssAnimation = that._config.useCssAnimation;

        // Дописываю в массив: названия типов анимаций, признак загрузки изображений 
        // и признак ошибки при загрузке
        for (var i = 0; i < that.shuffleImages.length; i++) {

            that.shuffleImages[i].nameAnimation = that.namesAnimation[that.shuffleImages[i].animation];
            that.shuffleImages[i].loadEvent = 'false';
            that.shuffleImages[i].errorFlag = 'false';
        }

        // Предзагрузка фото
        that.preloadPhotos();
        
        that.$elems = [];
        that.$pictures = [];

        // Показываем первую картинку
        that.showFirstPicture();

        // Анимация завершена
        that.$container.on('endAnimation', 'img', function() {

            that.startNextStep();

        });

    },

    /**
     * Показываем первую загруженную картинку 
     * (в порядке очереди - согласно последовательности в массиве that.shuffleImages)
     *
     * @method showFirstPicture
     *
     */
    showFirstPicture: function() {

        var that = this;

        that.currentElem = 0;

        for (var i = 0; i < that.shuffleImages.length; i++) {

            that.currentElem = i;

            // Если картинка загружена
            if (that.shuffleImages[i].loadEvent && (that.shuffleImages[i].loadEvent === 'true')) {

                that.createElem(i);

                that.$elems[i].css('opacity', 0);

                that.$container.append(that.$elems[i]);

                setTimeout(function() {

                    // Стартуем Анимацию!
                    that.startAnimationPicture(i);

                }, that._config.delayStartAnimation);


                that.$elems[i].animate({
                    opacity: 1
                }, that._config.durationChangeAnimation, 'linear', function () {

                    // Убираем background 
                    that.$container.css('background', 'transparent');

                });

                break;

            }

        }

        // Если так ни одна фото и не загружена, начинаем сначала
        if (i === that.shuffleImages.length) {

            setTimeout(function() {

                that.showFirstPicture();    

            }, 3000);
               
        }

    },

    /**
     * Начало следующего шага
     *
     * @method startNextStep
     *
     */
    startNextStep: function(prev) {

        var that = this;

        // видимый элемент
        if (prev !== undefined) {
            that.prevElem = prev;
        } else {
            that.prevElem = that.currentElem;
        }
        
        if (that.currentElem < that.shuffleImages.length - 1) {
            that.currentElem = that.currentElem + 1;
        } else {
            that.currentElem = 0;
        }

        // Если картинка загружена
        if (that.shuffleImages[that.currentElem].loadEvent && (that.shuffleImages[that.currentElem].loadEvent === 'true')) {

            that.showNextPicture();

        } else {

            that.startNextStep(that.prevElem);

        }

    },

    /**
     * Показываем следующую загруженную картинку 
     * (в порядке очереди - согласно последовательности в массиве that.shuffleImages)
     *
     * @method showNextPicture
     *
     */
    showNextPicture: function () {

        var that = this;

        // Если не один кадр
        if (that.prevElem !== that.currentElem) {

            that.$elems[that.prevElem].animate({
                opacity: 0
            }, that._config.durationChangeAnimation, 'linear', function () {

                that.$elems[that.prevElem].css('display', 'none');

            });

            // Если Елемента еще нет в DOM
            if (!that.$elems[that.currentElem]) {

                that.createElem(that.currentElem);

                that.$elems[that.currentElem].css('opacity', 0);

                that.$container.append(that.$elems[that.currentElem]);

            } else {

                that.$elems[that.currentElem].css('opacity', 0);

                // Установка условий для анимации
                that.createConditionsAnimate(that.currentElem);

            }

        } else {

            that.$elems[that.prevElem].css('opacity', 0);

            // Установка условий для анимации
            that.createConditionsAnimate(that.prevElem);

        }

        setTimeout(function() {

            // Стартуем Анимацию!
            that.startAnimationPicture(that.currentElem);

        }, that._config.delayStartAnimation);


        that.$elems[that.currentElem].animate({
            opacity: 1
        }, that._config.durationChangeAnimation, 'linear', function () {

        });
        
    },

    /**
     * Предзагрузка фотографий 
     *
     * @method preloadPhotos
     */
    preloadPhotos: function () {

        var that = this;

        that.imagesList = [];

        for (var i = 0; i < that.shuffleImages.length; i++) {

            that.imagesList.push(new Image());
            that.imagesList[that.imagesList.length-1].src = that.shuffleImages[i].file;

            // Устанавливаем флаги
            that.promiseImage(that.imagesList[i]).then(function (img) {

                for(var j = 0; j < that.shuffleImages.length; j++) {

                    if (that.shuffleImages[j].file === img.src) {

                        that.shuffleImages[j].loadEvent = 'true';

                        break;

                    }
                }

            }, function (img) {

                for (var j = 0; j < that.shuffleImages.length; j++) {

                    if (that.shuffleImages[j].file === img.src) {

                        that.shuffleImages[j].errorFlag = 'true';
                        that.shuffleImages[j].loadEvent = 'false';

                        break;

                    }
 
                }
                
            });

        }

    },

    /**
     * Promise
     *
     * @method promiseImage
     *
     * @param {Object} img объект картинки
     */
    promiseImage: function (img) {

        var that = this,
            deferred = Q.defer();

        img.onload = function() {

            deferred.resolve(this);  

        };
  
        img.onerror = function() {

            deferred.reject(this); 

        };

        return deferred.promise;

    },

    /**
     * Начинаем анимацию картинки
     *
     * @method startAnimationPicture
     *
     * @param {Number} i индекс элемента
     */
    startAnimationPicture: function(i) {

        var that = this;

        if (that.useCssAnimation) {
                        
            that.$elems[i].addClass(that.shuffleImages[i].nameAnimation + '-animate_active');

        } else {

            that.startJSAnimation(that.shuffleImages[i].nameAnimation);
        }

        // Триггерим событие окончания Анимации
        setTimeout(function() {
            that.$pictures[i].trigger('endAnimation');
        }, that._config.durationAnimation - that._config.durationChangeAnimation - that._config.delayStartAnimation - 500);

    },

    /**
     * Начинаем js анимацию
     *
     * @method startJSAnimation
     *
     * @param {String} name имя анимации
     */
    startJSAnimation: function(name) {

        var that = this;

        that.$pictures[that.currentElem].animate(that.objJSAnimation[name]['to'], 
            that._config.durationAnimation, 'linear', function () {

        });

    },

    /**
     * Создание элемента для вставки в DOM
     *
     * @method createElem
     *
     * @param {Number} i индекс cоздаваемого элемента
     */
    createElem: function(i) {

        var that = this;

        that.$elems[i] = $('<div class="ny-header__elem" data-elem="photo" data-elem-index="' + i + '">' +
                            '<img class="ny-header__img" src="' + that.shuffleImages[i].file + '" alt="" />' +
                        '</div>');

        that.$pictures[i] = that.$elems[i].find('img');

        if (that.useCssAnimation) {

            that.$elems[i].addClass(that.shuffleImages[i].nameAnimation + '-animate');

        } else {

            that.$pictures[i].css(that.objJSAnimation[that.shuffleImages[i].nameAnimation]['from']);
                
        }

    }, 

    /**
     * Создание условий для Анимации Существующего элемента
     *
     * @method createConditionsAnimate
     *
     * @param {Number} i индекс элемента, который готовим к анимации
     */
    createConditionsAnimate: function (i) {

        var that = this;

        that.$elems[i].css('display', 'block');

        if (that.useCssAnimation) {

            that.$elems[i].removeClass(that.shuffleImages[i].nameAnimation + '-animate_active');

        } else {

            that.$pictures[i].css(that.objJSAnimation[that.shuffleImages[i].nameAnimation]['from']);

        }

    }

};

return AnimationSlider;

})();

}