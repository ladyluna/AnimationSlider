AnimationSlider
===============

Анимированный слайдер изображений

с css и js-анимациями

----
Пример:
http://codepen.io/ladyluna/pen/vEgQLJ

---

Пример инициализации:

     new AnimationSlider($('.js-animation-header'), headerImages);
 
      где 
      
       $('.js-animation-header') - контейнер для слайдера,
       
       headerImages - массив из объектов:
      
       var headerImages = [
       
          {'file' : 'http://...891498.jpg','animation' : 'shift-bottom-up'},
          
          {'file' : 'http://...7d3592.jpg','animation' : 'shift-top-down'},
          
          {'file' : 'http://...300728.jpg','animation' : 'decrease'},
          
          {'file' : 'http://...007286.jpg','animation' : 'increase'}
          
       ];
   
       headerImages[i].file {string}  путь до картинки
       
       headerImages[i].animation {string} тип анимации
       
           'decrease' - Уменьшать
           
           'increase' - Увеличивать
           
           'shift-bottom-up' - Сдвиг "Снизу-Вверх"
           
           'shift-top-down' -  Сдвиг "Сверху-Вниз"
           
      
        Также при инициализации можно указать третий необязательный параметр - Объект из параметров:
 
        Его значения по-умолчанию:
      
        {
        
           // селектор элемента с фото
            selectorElem: '[data-elem="photo"]',
            
            // задержка перед началом Анимации
            delayStartAnimation: 500,
            
            // продолжительность смены кадров
            durationChangeAnimation: 2000,
            
            // продолжительность анимации (для css-анимации прописана в стилях)
            durationAnimation: 15000,
            
            // Признак Использовать ли css анимацию
            useCssAnimation: Modernizr.csstransforms && Modernizr.csstransitions
            
        }
   
  ---
  
  Фотографии в слайдере сортируются случайным образом
  
  По-умолчанию, если браузер поддерживает css transforms и css transitions 
  для анимации изображения используется css, иначе применяется jquery анимация
      
