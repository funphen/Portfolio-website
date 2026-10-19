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
         tools:   'Photoshop, After Effects',               // необов'язково: «Програми» на сторінці роботи, стоїть над «Категорією»
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
        { title: 'buenas noches',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/cover-01-1.jpg',
          'assets/images/cover-01-2.jpg',
          'assets/images/cover-01-3.jpg'
        ] },
        { title: T('Завтрашні спогади', "Tomorrow's memories"),
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-02.jpg' },
        { title: 'Forest',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/cover-03-1.jpg',
          'assets/images/cover-03-2.jpg',
          'assets/images/cover-03-3.jpg'
        ] },
        { title: 'hunt',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-04.jpg' },
        { title: T('Тінь', 'Shadow'),
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-05.jpg' },
        { title: 'smoke',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-06.jpg' },
        { title: 'Disco',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-08.jpg' },
        { title: 'rush',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-09.jpg' },
        { title: 'rabbit trap',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-10.jpg' },
        { title: 'Aurora',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-11.jpg' },
        { title: 'bone',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/cover-12-1.jpg',
          'assets/images/cover-12-2.jpg'
        ] },
        { title: T('Новий твій', 'Your new'),
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-13.jpg' },
        { title: 'Helsingin Balalaikkaorkesteri',
          tools: 'Adobe Photoshop',
          img: 'assets/images/cover-14.jpg' },
        { title: T('Пройдисвіт', 'Wanderer'),
          img: 'assets/images/cover-15.jpg' }
      ]
    },
    { name: T('Постери', 'Posters'),
      works: [
        { title: 'Manchester',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-1.jpg' },
        { title: 'Pixel hunt pt1',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-2.jpg' },
        { title: 'Pixel hunt pt2',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/poster-3-1.jpg',
          'assets/images/poster-3-2.jpg'
        ] },
        { title: 'crime',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-4.jpg' },
        { title: 'call 911',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-5.jpg' },
        { title: 'evolution',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/poster-6-1.jpg',
          'assets/images/poster-6-2.jpg',
          'assets/images/poster-6-3.jpg',
          'assets/images/poster-6-4.jpg',
          'assets/images/poster-6-5.jpg'
        ] },
        { title: 'transmog',
          tools: 'Adobe Illustrator',
          img: 'assets/images/poster-7.jpg' },
        { title: 'sky',
          tools: 'Adobe Photoshop',
          img: [
          'assets/images/poster-8-1.jpg',
          'assets/images/poster-8-2.jpg'
        ] },
        { title: 'pixel hunt pt3',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-9.jpg' },
        { title: 'autopsy',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-10.jpg' },
        { title: 'who you are',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-11.jpg' },
        { title: 'freedom',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-12.jpg' },
        { title: 'hollywood',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-13.jpg' },
        { title: 'impuls',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-14.jpg' },
        { title: T('Новий твій', 'Your new'),
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-15.jpg' },
        { title: 'Stranger Things',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-16.jpg' },
        { title: 'blood aquarelle',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-17.jpg' },
        { title: 'dark age',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-18.jpg' },
        { title: 'a life tragedy',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-19.jpg' },
        { title: 'neuron',
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-20.jpg' },
        { title: T('Звук води', 'Sound of the water'),
          tools: 'Adobe Photoshop',
          img: 'assets/images/poster-21.jpg' }
      ]
    },
    { name: T('Айдентика', 'Identity'),
      works: [
        { title: T('Робота 01', 'Work 01'),
          book: { dir: 'assets/book/identity-01/', count: 66, ext: 'webp', ratio: 0.7047 },
          video: 'assets/video/identity-01.mp4',
          poster: 'assets/video/identity-01.jpg',
          videoRatio: '9/16' },
        { title: 'Skinzone',
          /* single: true — книга показується по одній сторінці, кожна сторінка повністю (довгі сторінки зменшені, щоб влізти). Приберіть, щоб були розвороти, як в «Ігрових концептах» */
          book: { dir: 'assets/book/identity-02/', count: 9, ext: 'webp', ratio: 1.3333, single: true } },
        { title: 'Дмитро Мельникович Брендбук',
          book: { dir: 'assets/book/identity-03/', count: 16, ext: 'webp', ratio: 1.7778 } }
      ]
    },
    { name: T('Ігрові концепти', 'Game concepts'),
      works: [
        { title: T('Робота 01', 'Work 01'),
          book: { dir: 'assets/book/concepts-01/', count: 9, ext: 'webp', ratio: 1.7778 } },
        { title: T('Шепіт часу', 'Whisper of time'),
          tools: 'Adobe Photoshop, Figma',
          img: 'assets/images/whisper-preview.jpg',
          /* slides — кадри переливаються самі, а ще їх можна гортати кліком вліво/вправо, стрілками чи клавішами ←/→ */
          slides: { dir: 'assets/slides/whisper/', count: 12, ext: 'webp', ratio: 1.7778 } }
      ]
    }
  ]},
  { id: 'animation', title: T('Анімації', 'Animation'), projects: [
    { name: 'Rolling Toys', isNew: true }
  ]},
  { id: 'editing', title: T('Монтаж', 'Editing'), projects: [
    { name: '',
      works: [
        { title: T('Каталог Мандели', 'Mandela Magazine'),
          tools: 'Adobe Premiere Pro, Adobe After Effects',
          video: 'https://youtu.be/Asf1lWLAXlA' }
      ]
    }
  ]},
  { id: 'translation', title: T('Переклади', 'Translation'), projects: [
    { name: T('Локалізація ігор', 'Game localization'),
      works: [
        { title: 'Furi',
          tools: 'UABEA, Notepad++',
          img: 'assets/images/furi-preview.png',
          /* блоки сторінки йдуть зверху вниз у цьому порядку:
             compare — порівняння мишкою (before — права частина, after — ліва)
             fade    — одна картинка, що по черзі переливається
             meter   — шкали з відсотками */
          media: [
            { type: 'compare', before: 'assets/images/furi-01-menu-en.jpg', after: 'assets/images/furi-01-menu-ua.jpg', labelBefore: 'EN', labelAfter: 'UA' },
            { type: 'compare', before: 'assets/images/furi-01-sub-en.jpg',  after: 'assets/images/furi-01-sub-ua.jpg',  labelBefore: 'EN', labelAfter: 'UA' },
            { type: 'fade', images: [
              'assets/images/furi-02-1.jpg',
              'assets/images/furi-02-2.jpg',
              'assets/images/furi-02-3.jpg',
              'assets/images/furi-02-4.jpg'
            ] },
            { type: 'compare', ratio: '1840/910', before: 'assets/images/furi-03-file.webp', after: 'assets/images/furi-03-translation.webp',
              labelBefore: T('Файл гри', 'Game file'), labelAfter: T('Переклад', 'Translation') },
            { type: 'meter', items: [
              { label: T('Перекладено', 'Translated'), value: 100 },
              { label: T('Вичитка', 'Proofreading'), value: 100 }
            ] }
          ] },
        { title: 'Wavetale',
          tools: 'UABEA, Notepad++',
          img: 'assets/images/wavetale-preview.png',
          media: [
            { type: 'compare', before: 'assets/shots/wavetale-01-menu-en.webp', after: 'assets/shots/wavetale-01-menu-ua.webp', labelBefore: 'EN', labelAfter: 'UA' },
            { type: 'compare', before: 'assets/shots/wavetale-02-game-en.webp', after: 'assets/shots/wavetale-02-game-ua.webp', labelBefore: 'EN', labelAfter: 'UA' },
            { type: 'meter', items: [
              { label: T('Перекладено', 'Translated'), value: 36 },
              { label: T('Вичитка', 'Proofreading'), value: 10 }
            ] }
          ] },
        { title: 'Split Fiction',
          tools: 'FModel, UE4localizationsTool, UE4-DDS-Tools',
          img: 'assets/images/split-fiction-preview.png',
          media: [
            { type: 'fade', images: [
              'assets/shots/split-fiction-1.webp',
              'assets/shots/split-fiction-2.webp',
              'assets/shots/split-fiction-3.webp',
              'assets/shots/split-fiction-4.webp'
            ] },
            { type: 'meter', items: [
              { label: T('Перекладено', 'Translated'), value: 100 },
              { label: T('Вичитка', 'Proofreading'), value: 100 }
            ] }
          ] }
      ]
    },
    { name: T('Переклад книжок', 'Book translation'),
      works: [
        { title: 'Cyberpunk 2020 - the second edition',
          tools: 'Adobe InDesign, Adobe Illustrator',
          book: { dir: 'assets/book/cyberpunk-01/', count: 27, ext: 'webp', ratio: 0.7071 },
          media: [
            { type: 'meter', items: [
              { label: T('Перекладено', 'Translated'), value: 10 },
              { label: T('Вичитка', 'Proofreading'), value: 0 }
            ] }
          ] }
      ]
    }
  ]}
];
