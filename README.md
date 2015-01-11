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
     {'file' : 'http://.../644f06e3525ce6afaeee0394bbda2552141588179148.jpg','animation' : 'shift-bottom-up'},
     {'file' : 'http://.../3d47d350484d92f477139e0a18065356141588181892.jpg','animation' : 'shift-top-down'},
     {'file' : 'http://.../3e0a6f6ff415eeddc4972dda73f5ed34141588200728.jpg','animation' : 'decrease'},
     {'file' : 'http://.../3e0a6f6ff415eeddc4972dda73f5ed34141588200728.jpg','animation' : 'increase'}
  ];
   
  headerImages[i].file {string}  путь до картинки
  
  headerImages[i].animation {string} тип анимации
      'decrease' - Уменьшать
      'increase' - Увеличивать
      'shift-bottom-up' - Сдвиг "Снизу-Вверх"
      'shift-top-down' -  Сдвиг "Сверху-Вниз"
