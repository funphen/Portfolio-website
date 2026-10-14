/* =====================================================================
   content.js — ТУТ ви додаєте й змінюєте весь контент сайту.
   Нічого більше чіпати не потрібно.

   Тексти можна писати двома способами:
     'Один текст для обох мов'
     T('Український текст', 'English text')
   ===================================================================== */

var T = function (uk, en) { return { uk: uk, en: en }; };

/* Стрічка фото, що їде під категоріями.
   Додайте шляхи до фото. Якщо список порожній — буде сірі плитки. */
var SITE = {
  reel: [
    // 'assets/images/reel-1.jpg',
    // 'assets/images/reel-2.jpg',
  ]
};

/* Категорії та проєкти.
   Якщо в проєкта немає списку works, на сайті показуються 6 сірих плиток.

   Як додати роботу до проєкту — впишіть works: [ ... ], наприклад:

   {
     name: T('Обкладинки', 'Covers'),
     works: [
       {
         title:   T('Обкладинка альбому', 'Album cover'),   // назва роботи
         img:     'assets/images/cover-1.jpg',              // обкладинка (картинка в сітці та на сторінці)
         images:  ['assets/images/cover-1-b.jpg',           // додаткові фото на сторінці роботи
                   { src: 'assets/images/cover-1-c.jpg', full: true }],  // full: true — на всю ширину
         video:   'https://www.youtube.com/watch?v=XXXXXXXXXXX',  // YouTube, Vimeo або assets/video/clip.mp4
         year:    2026,                                     // необов'язково
         tools:   'Photoshop, After Effects',               // необов'язково
         task:    T('Завдання…', 'Brief…'),                 // текст «Завдання»
         process: T('Процес…',   'Process…'),               // текст «Процес»
         result:  T('Результат…', 'Result…')                // текст «Результат»
       }
     ]
   }

   Усі поля, крім title, необов'язкові. Блок тексту, якого немає, просто не показується.
*/
var CATEGORIES = [
  { id: 'design', title: T('Дизайн', 'Design'), projects: [
    { name: T('Обкладинки', 'Covers') },
    { name: T('Постери', 'Posters'),
    { title: T('Перша обкладинка', 'First cover'),
      img: 'assets/images/poster-1.webp' }
     ]
    { name: T('Айдентика', 'Identity') },
    { name: T('Ігрові концепти', 'Game concepts') },
    { name: 'Ridge Boots' },
    { name: 'Harbor Brewing' }
  ]},
  { id: 'animation', title: T('Анімації', 'Animation'), projects: [
    { name: 'Rolling Toys', isNew: true },
    { name: 'Marlo Vance', isNew: true },
    { name: 'Pulse Records' },
    { name: T('Без назви', 'Untitled') }
  ]},
  { id: 'editing', title: T('Монтаж', 'Editing'), projects: [
    { name: 'Motor Weekly' },
    { name: 'Stride Running' },
    { name: 'Atlas Air' },
    { name: 'League' }
  ]},
  { id: 'translation', title: T('Переклади', 'Translation'), projects: [
    { name: T('Субтитри до короткометражки', 'Short film subtitles') },
    { name: T('Локалізація гри', 'Game localization') },
    { name: T('Гайдлайни бренду', 'Brand guidelines') },
    { name: T('Інтерв\'ю з дизайнером', 'Designer interview') }
  ]}
];
