import { Project } from './models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'BookStore',
    summary: 'A full-stack e-commerce platform for browsing and purchasing programming books.',
    description:
    'BookStore allows users to browse and filter programming books, view product information and place orders. The application uses a React/Vite frontend connected to a Node.js and Express REST API, with MongoDB for storing products and orders.',
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB'
  ],
    images: [
      '/images/books.png',
      '/images/cart.png',
      '/images/checkout.png'
    ],
    demoUrl: 'https://example.com/taskflow',
    githubUrl: 'https://github.com/SajadFaiz/web-entwicklung/tree/main/Fullstack-Programming-Bookstore'
  },
  {
    id: 2,
    title: 'Student Dashboard',
    summary: 'A modern and responsive dashboard for managing tasks and tracking study progress.',
    description:
      'The Student Dashboard helps users manage tasks, track their progress and visualize weekly study hours. It includes task management, automatic progress calculation, light and dark mode with persistent settings, and data storage using the browser LocalStorage API.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'LocalStorage API'
    ],
    images: [
      '/images/light-mode.png',
      '/images/dashboard.png',
      '/images/tasks.png',
      '/images/progress.png'
    ],
    demoUrl: 'https://example.com/finance-tracker',
    githubUrl: 'https://github.com/SajadFaiz/web-entwicklung/blob/main/Studenten-Dashboard/README.md'
  },
  {
    id: 3,
    title: 'Ziffernfolge',
    summary: 'A Java memory game where players memorize and reproduce increasingly long sequences of digits.',
    description: 'Ziffernfolge is a Java memory game that generates random digit sequences which players must memorize and reproduce correctly. The application tracks player results and maintains a persistent leaderboard. The project was developed in two stages, starting as a console application and later extended with a graphical user interface. The GUI version applies object-oriented design, design patterns, state-based programming and automated testing.',
    technologies: [
      'Java',
      'Object-Oriented Programming',
      'GUI',
      'JUnit',
      'Javadoc',
      'Design Patterns',
      'File I/O'
    ],
    images: [
      '/images/Name.png',
      '/images/spiel.png',
      '/images/Ergebnis.png'
    ],
    demoUrl: 'https://example.com/appointment-hub',
    githubUrl: 'https://github.com/SajadFaiz/Java_Projekte/blob/main/README.md'
  },
  {
    id: 4,
    title: 'PIR Motion Detection System',
    summary: 'An IoT motion detection system using a Raspberry Pi, PIR sensor and Python.',
    description:
      'A Raspberry Pi-based motion detection system that uses an HC-SR501 PIR sensor to detect movement and trigger connected devices. The project was developed in Python using GPIO libraries and extended with visual and audible alerts using an LED and buzzer. It demonstrates hardware integration, GPIO programming, sensor integration and event-driven control.',
    technologies: [
      'Python',
      'Raspberry Pi',
      'GPIO',
      'PIR Sensor',
      'gpiozero'
    ],
    images: [
      '/images/PIR&LED.webp',
      '/images/Project.jpg'
    ],
    demoUrl: 'https://example.com/modern-shop',
    githubUrl: 'https://github.com/SajadFaiz/Raspberry_Pi_Projekte/blob/main/BewegungsErkennung_Alarm_System/BewegungsErkennungSystem.ipynb'
  }
];