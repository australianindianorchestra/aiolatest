
export type GalleryImage = {
  src: string;
  alt: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  image: { src: string; alt: string };
  BannerImage: { src: string; alt: string };
  gallery: GalleryImage[];
  intro: string;
  description: string[];
  highlights: string[];
  process?: { title: string; text: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "film-scoring",
    title: "Film Scoring",
    tagline: "Original music written to the rhythm of your story.",
    image: {
      src: "/services/film-scoring.jpeg",
      alt: "A hand writing a musical score on manuscript paper",
    },
    BannerImage: {
      src: "/services/banner/film.png",
      alt: "A hand writing a musical score on manuscript paper",
    },
    gallery: [
      { src: "/services/film-scoring.jpeg", alt: "Writing a musical score" },
    ],
    intro:
      "From intimate dramas to sweeping epics, we compose and orchestrate scores that blend Indian classical and contemporary orchestral traditions.",
    description: [
      "Our composers work closely with directors and producers from the first cut, shaping themes, motifs and textures that carry emotion and cultural depth.",
      "Using live Indian instruments alongside a full orchestra, we deliver scores that feel authentic, cinematic and unmistakably original.",
    ],
    highlights: [
      "Original composition and orchestration",
      "Indian classical, fusion and contemporary styles",
      "Live instrumentalists and vocalists",
      "Spotting sessions and score revisions",
      "Delivery of stems and final masters",
    ],
    process: [
      { title: "Brief", text: "We discuss your story, tone and references." },
    ],
  },
  {
    slug: "live-recording",
    title: "Live Recording",
    tagline: "Studio-quality sound, captured with a full orchestra.",
    image: {
      src: "/services/live-recording.jpeg",
      alt: "A film orchestra performing during a recording session",
    },
    BannerImage: {
      src: "/services/banner/live-recording.png",
      alt: "A film orchestra performing during a recording session",
    },
    gallery: [
      { src: "/services/live-recording.jpeg", alt: "Orchestra recording session" },
    ],
    intro:
      "Record with world-class musicians in a professional session environment, tailored for film, television, albums and advertising.",
    description: [
      "We assemble the right ensemble for your project, from solo sitar and tabla to a full string and brass orchestra, and guide the session from setup to final take.",
      "Our team handles musician booking, charting, conducting and engineering so you can focus on the creative.",
    ],
    highlights: [
      "Full orchestra or bespoke chamber ensembles",
      "Indian and Western instrumentalists",
      "Experienced conductors and session leaders",
      "Professional engineering and mixing",
      "Remote attendance for overseas clients",
    ],
  },
  {
    slug: "live-show-production",
    title: "Live Show Production",
    tagline: "Concerts and festival performances at scale.",
    image: {
      src: "/services/live-show-production.jpeg",
      alt: "Our orchestra performing at the A.R. Rahman concert",
    },
    BannerImage: {
      src: "/services/banner/live-performance.png",
      alt: "Our orchestra performing at the A.R. Rahman concert",
    },
    gallery: [
      { src: "/services/live-show-production.jpeg", alt: "Orchestra live on stage" },
    ],
    intro:
      "We design, rehearse and deliver large-scale live shows, from theatre concerts to stadium productions.",
    description: [
      "Our orchestra has performed alongside leading artists on major stages, and we bring that experience to every production: music direction, arrangement, rehearsal management and on-stage performance.",
      "Whether you are staging a cultural festival, a corporate gala or a headline tour, we build a show that moves audiences.",
    ],
    highlights: [
      "Music direction and arrangements",
      "Orchestra, choir and featured soloists",
      "Rehearsal and stage management",
      "Coordination with sound, lighting and AV teams",
      "Tour and festival packages",
    ],
    process: [
      { title: "Concept", text: "We define the vision, venue and audience." },
      { title: "Arrange", text: "Repertoire and arrangements are prepared." },
      { title: "Rehearse", text: "Musicians and production teams align." },
      { title: "Perform", text: "We deliver a seamless live experience." },
    ],
  },
  {
    slug: "private-concerts",
    title: "Private Concerts",
    tagline: "An intimate mehfil in the comfort of your home.",
    image: {
      src: "/services/private-concerts.jpeg",
      alt: "Musicians performing a mehfil in a private home",
    },
    BannerImage: {
      src: "/services/banner/private-concert.png",
      alt: "private-concerts service image",
    },
    gallery: [
      { src: "/services/private-concerts.jpeg", alt: "Intimate home mehfil" },
    ],
    intro:
      "Bring the warmth of a traditional mehfil to your home, celebration or private event.",
    description: [
      "Our artists perform classical, semi-classical, ghazal and film music in an intimate setting, creating an evening your guests will remember.",
      "Perfect for weddings, anniversaries, festivals and milestone birthdays, each programme is curated with you.",
    ],
    highlights: [
      "Solo, duo or small ensemble formats",
      "Classical, ghazal, qawwali and film repertoire",
      "Curated programmes for your occasion",
      "Minimal setup, suitable for homes and small venues",
    ],
  },
  {
    slug: "private-lessons",
    title: "Private Lessons",
    tagline: "Learn from professional performers, one on one.",
    image: {
      src: "/services/learning.png",
      alt: "A child playing the violin during a private lesson",
    },
    BannerImage: {
      src: "/services/banner/learning.png",
      alt: "learning service image",
    },
    gallery: [
      { src: "/services/learning.png", alt: "A child learning violin" },
    ],
    intro:
      "Personalised tuition for students of all ages and levels, in both Indian and Western styles.",
    description: [
      "Our teachers are working professionals who combine technical training with real stage experience, helping students build confidence as well as skill.",
      "Lessons are available in person or online and are adapted to each student's goals, from beginner foundations to performance preparation.",
    ],
    highlights: [
      "Violin, vocals, keys, percussion and more",
      "Beginners through to advanced students",
      "In-person and online lessons",
      "Exam, audition and performance preparation",
    ],
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
