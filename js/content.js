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
    'assets/images/reel-1.jpg',
    'assets/images/reel-2.jpg',
    'assets/images/reel-3.jpg',
    'assets/images/reel-4.jpg',
    'assets/images/reel-5.jpg',
    'assets/images/reel-6.jpg',
    'assets/images/reel-7.jpg',
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
        { title: T('Мерехтіння Словесне', 'Verbal Glimmer'),
          tools: 'Adobe Photoshop, Adobe Illustrator, Adobe InDesign',
          book: { dir: 'assets/book/identity-01/', count: 66, ext: 'webp', ratio: 0.7047 } },
        { title: 'Skinzone',
          tools: 'Adobe Photoshop, Adobe Illustrator, Figma',
          img: 'assets/images/skinzone-preview.jpg',
          /* single: true — книга показується по одній сторінці, кожна сторінка повністю (довгі сторінки зменшені, щоб влізти). Приберіть, щоб були розвороти, як в «Ігрових концептах» */
          book: { dir: 'assets/book/identity-02/', count: 9, ext: 'webp', ratio: 1.3333, single: true },
          /* strip — безкінечна стрічка сторіз, що їде зліва направо (без гортання) */
          strip: { dir: 'assets/strip/skinzone/', count: 19, ext: 'webp' },
          row: ['assets/images/row-4.png', 'assets/images/row-3.png', 'assets/images/row-2.png', 'assets/images/row-5.png', 'assets/images/row-7.png', 'assets/images/row-6.png', 'assets/images/row-1.png'] },
        { title: 'PRO8',
          tools: 'Adobe Illustrator',
          cover: 'assets/images/pro8-preview.jpg',
          /* collage — ряди зображень; ar — пропорція кадру (ширина/висота), max — найбільша ширина ряду в px */
          collage: [
            { items: [ { src: 'assets/pro8/banner.webp', ar: '1200/640' } ] },
            { items: [ { src: 'assets/pro8/story.webp', ar: '9/16' }, { src: 'assets/pro8/square.webp', ar: '1/1' }, { src: 'assets/pro8/tall.webp', ar: '1/2' } ] },
            { max: 640, items: [ { src: 'assets/pro8/leader.webp', ar: '320/100' } ] }
          ] },
        { title: 'Estetdent',
          tools: 'Adobe Illustrator, Figma',
          grid: { dir: 'assets/strip/estetdent-sq/', count: 3, ext: 'webp' },
          strip: { dir: 'assets/strip/estetdent/', count: 20, ext: 'webp', kind: 'story' },
          img: 'assets/images/estetdent-preview.png', logo: true },
        { title: 'Street life',
          tools: 'Adobe Photoshop',
          cover: 'assets/images/street-preview.jpg',
          collage: [
            { items: [ { src: 'assets/street/a1.webp', ar: '707/1000' }, { src: 'assets/street/a2.webp', ar: '707/1000' }, { src: 'assets/street/a3.webp', ar: '707/1000' } ] },
            { items: [ { src: 'assets/street/s1.webp', ar: '1/1' }, { src: 'assets/street/s2.webp', ar: '1/1' } ] }
          ] },
        { title: '7 clouds',
          tools: 'Adobe Photoshop, Adobe Illustrator, Adobe After Effects, Source Filmmaker',
          cover: 'assets/images/7cloud-preview.jpg',
          collage: [
            { items: [ { src: 'assets/cloud/hero.webp', ar: '16/9' } ] },
            { items: [ { src: 'assets/cloud/concept.webp', ar: '7/4' }, { src: 'assets/cloud/logo.webp', ar: '7/4' } ] },
            { items: [ { src: 'assets/cloud/animation.gif', ar: '16/9' } ] }
          ] },
        { title: 'Bumpin',
          tools: 'Adobe Photoshop, Adobe Illustrator, Adobe After Effects',
          cover: 'assets/images/bumpin-preview.jpg',
          collage: [
            { max: 900, items: [ { src: 'assets/bumpin/mock.webp', ar: '1400/1000' } ] },
            { items: [ { src: 'assets/bumpin/logo.webp', ar: '16/9' } ] },
            { items: [ { src: 'assets/bumpin/white.webp', ar: '1200/1079' }, { src: 'assets/bumpin/black.webp', ar: '1200/1078' } ] },
            { items: [ { src: 'assets/bumpin/tee.gif', ar: '1/1' }, { src: 'assets/bumpin/redesign.gif', ar: '16/9' } ] }
          ] },
        { title: 'Дмитро Мельникович Брендбук',
          tools: 'Adobe Photoshop, Adobe Illustrator, Figma',
          strips: [
            { dir: 'assets/strip/dmitro-story/', count: 7, ext: 'webp', kind: 'story' },
            { dir: 'assets/strip/dmitro-square/', count: 4, ext: 'webp', kind: 'square' },
            { dir: 'assets/strip/dmitro-wide/', count: 8, ext: 'webp', kind: 'wide' }
          ],
          book: { dir: 'assets/book/identity-03/', count: 16, ext: 'webp', ratio: 1.7778 } }
      ]
    },
    { name: T('Ігрові концепти', 'Game concepts'),
      works: [
        { title: 'Dream Window',
          tools: 'Blender, Adobe Photoshop, Figma',
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
    { name: '',
      works: [
        { title: 'Pimp My Ride',
          tools: 'Adobe After Effects',
          video: 'https://youtu.be/JV55Z_ywEEY' },
        { title: 'WOO company',
          tools: 'Adobe After Effects',
          /* videos — вертикальні відео поруч: перше зліва, друге справа */
          videos: ['https://www.youtube.com/shorts/vmVwsDTdsq0', 'https://www.youtube.com/shorts/JYV81Tup5v4'] },
        { title: 'Street Life',
          tools: 'Adobe After Effects',
          videos: ['https://youtube.com/shorts/1zizo1iqlCc'] },
        { title: 'Wind',
          tools: 'Adobe After Effects',
          videos: ['https://youtube.com/shorts/ZkGbaf-I2RI'] },
        { title: 'Forest',
          tools: 'Adobe After Effects',
          videos: ['https://youtube.com/shorts/v-Gg-AE4FAQ'] }
      ]
    }
  ]},
  { id: 'editing', title: T('Монтаж', 'Editing'), projects: [
    { name: '',
      works: [
        { title: T('Каталог Мандели', 'Mandela Magazine'),
          tools: 'Adobe Premiere Pro, Adobe After Effects',
          video: 'https://youtu.be/Asf1lWLAXlA' },
        { title: T('Турбуленція', 'Turbulence'),
          tools: 'Adobe Premiere Pro, Adobe After Effects',
          video: 'https://youtu.be/7K6teRx8ols' },
        { title: T('Вікторина Терті Пляцкина', 'Terti Pliatskyn Quiz'),
          tools: 'Adobe Premiere Pro, Adobe After Effects',
          video: 'https://youtu.be/Y18k-06dtbM' },
        { title: T('Мерехтіння Словесне', 'Verbal Glimmer'),
          video: 'assets/video/identity-01.mp4',
          poster: 'assets/video/identity-01.jpg',
          videoRatio: '9/16' }
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
