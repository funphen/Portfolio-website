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
                  // кілька картинок у квадратних дужках → вони плавно переливаються одна в одну:
                  // img: ['assets/images/a-1.jpg', 'assets/images/a-2.jpg', 'assets/images/a-3.jpg'],
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
    { name: T('Обкладинки', 'Covers'),
      works: [
        { title: T('Робота 01', 'Work 01'),
          img: [
          'assets/images/cover-01-1.jpg',
          'assets/images/cover-01-2.jpg',
          'assets/images/cover-01-3.jpg'
        ] },
        { title: T('Робота 02', 'Work 02'),
          img: 'assets/images/cover-02.jpg' },
        { title: T('Робота 03', 'Work 03'),
          img: [
          'assets/images/cover-03-1.jpg',
          'assets/images/cover-03-2.jpg',
          'assets/images/cover-03-3.jpg'
        ] },
        { title: T('Робота 04', 'Work 04'),
          img: 'assets/images/cover-04.jpg' },
        { title: T('Робота 05', 'Work 05'),
          img: 'assets/images/cover-05.jpg' },
        { title: T('Робота 06', 'Work 06'),
          img: 'assets/images/cover-06.jpg' },
        { title: T('Робота 07', 'Work 07'),
          img: 'assets/images/cover-07.jpg' },
        { title: T('Робота 08', 'Work 08'),
          img: 'assets/images/cover-08.jpg' },
        { title: T('Робота 09', 'Work 09'),
          img: 'assets/images/cover-09.jpg' },
        { title: T('Робота 10', 'Work 10'),
          img: 'assets/images/cover-10.jpg' },
        { title: T('Робота 11', 'Work 11'),
          img: 'assets/images/cover-11.jpg' },
        { title: T('Робота 12', 'Work 12'),
          img: [
          'assets/images/cover-12-1.jpg',
          'assets/images/cover-12-2.jpg'
        ] },
        { title: T('Робота 13', 'Work 13'),
          img: 'assets/images/cover-13.jpg' }
      ]
    },
    { name: T('Постери', 'Posters'),
      works: [
        { title: T('Робота 01', 'Work 01'),
          img: 'assets/images/poster-1.jpg' },
        { title: T('Робота 02', 'Work 02'),
          img: 'assets/images/poster-2.jpg' },
        { title: T('Робота 03', 'Work 03'),
          img: [
          'assets/images/poster-3-1.jpg',
          'assets/images/poster-3-2.jpg'
        ] },
        { title: T('Робота 04', 'Work 04'),
          img: 'assets/images/poster-4.jpg' },
        { title: T('Робота 05', 'Work 05'),
          img: 'assets/images/poster-5.jpg' },
        { title: T('Робота 06', 'Work 06'),
          img: [
          'assets/images/poster-6-1.jpg',
          'assets/images/poster-6-2.jpg',
          'assets/images/poster-6-3.jpg',
          'assets/images/poster-6-4.jpg',
          'assets/images/poster-6-5.jpg'
        ] },
        { title: T('Робота 07', 'Work 07'),
          img: 'assets/images/poster-7.jpg' },
        { title: T('Робота 08', 'Work 08'),
          img: [
          'assets/images/poster-8-1.jpg',
          'assets/images/poster-8-2.jpg'
        ] },
        { title: T('Робота 09', 'Work 09'),
          img: 'assets/images/poster-9.jpg' },
        { title: T('Робота 10', 'Work 10'),
          img: 'assets/images/poster-10.jpg' },
        { title: T('Робота 11', 'Work 11'),
          img: 'assets/images/poster-11.jpg' },
        { title: T('Робота 12', 'Work 12'),
          img: 'assets/images/poster-12.jpg' },
        { title: T('Робота 13', 'Work 13'),
          img: 'assets/images/poster-13.jpg' },
        { title: T('Робота 14', 'Work 14'),
          img: 'assets/images/poster-14.jpg' },
        { title: T('Робота 15', 'Work 15'),
          img: 'assets/images/poster-15.jpg' },
        { title: T('Робота 16', 'Work 16'),
          img: 'assets/images/poster-16.jpg' },
        { title: T('Робота 17', 'Work 17'),
          img: 'assets/images/poster-17.jpg' },
        { title: T('Робота 18', 'Work 18'),
          img: 'assets/images/poster-18.jpg' },
        { title: T('Робота 19', 'Work 19'),
          img: 'assets/images/poster-19.jpg' },
        { title: T('Робота 20', 'Work 20'),
          img: 'assets/images/poster-20.jpg' }
      ]
    },
    { name: T('Айдентика', 'Identity'),
      works: [
        { title: T('Робота 01', 'Work 01'),
          book: { dir: 'assets/book/identity-01/', count: 66, ext: 'webp', ratio: 0.7047 },
          video: 'assets/video/identity-01.mp4',
          poster: 'assets/video/identity-01.jpg',
          videoRatio: '9/16' }
      ]
    },
    { name: T('Ігрові концепти', 'Game concepts') }
  ]},
  { id: 'animation', title: T('Анімації', 'Animation'), projects: [
    { name: 'Rolling Toys', isNew: true }
  ]},
  { id: 'editing', title: T('Монтаж', 'Editing'), projects: [
    { name: 'League' }
  ]},
  { id: 'translation', title: T('Переклади', 'Translation'), projects: [
    { name: T('Локалізація гри', 'Game localization') }
  ]}
];
