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
      
