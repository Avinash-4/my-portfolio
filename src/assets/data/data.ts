import OneBancLogo from "../../assets/images/onebanc-logo.png";
import SpcLogo from "../../assets/images/spc-logo.png";
import BcgLogo from "../../assets/images/bcg.png";
import VitLogo from "../../assets/images/vit-logo.png";
import VitBGLogo from "../../assets/images/vit-logo-bg.png";

import JestIcon from "../../assets/images/jest.png";
import WebSocketsIcon from "../../assets/images/web-sockets.png";
import FluentUIIcon from "../../assets/images/fluent-ui.png";
import BootStrapIcon from "../../assets/images/bootstrap.png";
import TypeScriptIcon from "../../assets/images/typescript.png";
import JavaScriptIcon from "../../assets/images/javascript.png";
import DotNetIcon from "../../assets/images/dot-net.png";
import NodeIcon from "../../assets/images/node.png";
import ReactIcon from "../../assets/images/react.png";
import ReduxIcon from "../../assets/images/redux.png";
import GoLangIcon from "../../assets/images/go.png";
import HTMLIcon from "../../assets/images/html.png";
import CSSIcon from "../../assets/images/css.png";
import ExpressIcon from "../../assets/images/express.png";
import MongoDBIcon from "../../assets/images/mongo-db.png";
import RestIcon from "../../assets/images/rest.png";
import PythonIcon from "../../assets/images/python.png";
import AzureIcon from "../../assets/images/azure.png";
import GCPIcon from "../../assets/images/gcp.png";
import CsharpIcon from "../../assets/images/csharp.png";
import SQLIcon from "../../assets/images/sql.png";
import CosmosDBIcon from "../../assets/images/cosmosdb.png";

import CubekartImage from "../../assets/images/cubekart.png";
import CubekartLogo from "../../assets/images/cubekart-logo.png";
import CubeMusicImage from "../../assets/images/cubemusic.png";
import Pro4Image from "../../assets/images/pro4.png";
import CubeMusicLogo from "../../assets/images/cube-music-logo.png";
import CubeChatImage from "../../assets/images/cubechat.png";
import CubeChatLogo from "../../assets/images/cube-chat-logo.png";
import TrackerLogo from "../../assets/images/tracker-logo.png";
import TrackerImage from "../../assets/images/tracker-image.png";
import CubekartGif from "../../assets/images/cubekart.gif";
import CubeMusicGif from "../../assets/images/cubemusic.gif";
import CubeChatGif from "../../assets/images/cubechat.gif";

import MailIcon from "../../assets/images/mail.png";
import GitHubIcon from "../../assets/images/github.png";
import LinkedInIcon from "../../assets/images/linkedin.png";
import TwitterIcon from "../../assets/images/twitter.png";
import InstagramIcon from "../../assets/images/instagram.png";
import PhoneIcon from "../../assets/images/phone.png";
import WhatsAppIcon from "../../assets/images/whatsapp.png";
import TelegramIcon from "../../assets/images/telegram.png";

import {
  ICareerItem,
  IContactLink,
  IPageInfo,
  IProjectDict,
  ISkillsDict,
  ISocialLink,
} from "../../common/interfaces";

export const pageInfo: IPageInfo = {
  about: {
    title: "Me Myself & I",
    description: "A little boasting",
  },
  career: {
    title: "Career",
    description: "Learn, Grow, Excel",
  },
  skills: {
    title: "Skills",
    description: "My weapons of choice - Drop in the slot to know more",
  },
  projects: {
    title: "Projects",
    description: "Bringing ideas to life - one at a time",
  },
  contact: {
    title: "Contact",
    description:
      "Want to build something together? or hire me? or just say hi?",
  },
};

export const introInfo: {
  name: string;
  shortDesc: string;
} = {
  name: "Anudeep",
  shortDesc: "I create value by building web",
};

export const aboutInfo: string = `I specialize in full-stack development, creating and integrating
data-driven applications with effective interfaces to deliver dynamic
user experiences. I also enjoy coding as a hobby, allowing me to
explore new technologies and push the boundaries of what's possible.
When I'm not coding, you can usually find me playing badminton or
watching cricket. Trying to be a better version of myself every day in
this fast moving world.`;

export const carrerData: ICareerItem[] = [
  {
    id: 1,
    orgLogo: VitLogo,
    orgBGLogo: VitBGLogo,
    orgName: "Vellore Institute of Technology",
    orgPosition: "Bachelor of Technology",
    orgTenure: "July 2017 - July 2021",
    orgLink: "https://vit.ac.in",
    location: "Vellore, Tamil Nadu",
  },
  {
    id: 2,
    orgLogo: OneBancLogo,
    orgBGLogo: OneBancLogo,
    orgName: "OneBanc Technologies",
    orgPosition: "Software Developer",
    orgTenure: "July 2021 - June 2022",
    orgLink: "https://onebanc.ai",
    location: "Gurgaon, Haryana",
  },
  {
    id: 3,
    orgLogo: SpcLogo,
    orgBGLogo: SpcLogo,
    orgName: "SkyPoint Cloud",
    orgPosition: "Software Development Engineer - I",
    orgTenure: "June 2022 - Nov 2023",
    orgLink: "https://skypointcloud.com",
    location: "Bangalore, Karnataka",
  },
  {
    id: 4,
    orgLogo: BcgLogo,
    orgBGLogo: BcgLogo,
    orgName: "Boston Consulting Group",
    orgPosition: "Software Engineer",
    orgTenure: "Nov 2023 - Present",
    orgLink: "https://bcg.com",
    location: "Bangalore, Karnataka",
  },
];

export const skills: ISkillsDict = {
  javascript: {
    id: "javascript",
    techName: "JavaScript",
    description:
      "A scripting language used for creating interactive web pages and web applications, often used alongside HTML and CSS.",
    icon: JavaScriptIcon,
    projectsCount: 10,
    skillLevelPercentage: 80,
    isActive: true,
    startDate: "06/2021",
    experienceType: "relative",
  },
  reactjs: {
    id: "reactjs",
    techName: "React JS",
    description:
      "A JavaScript library used for building user interfaces, allowing developers to create reusable UI components and build complex applications.",
    icon: ReactIcon,
    projectsCount: 4,
    skillLevelPercentage: 85,
    isActive: true,
    startDate: "06/2021",
    experienceType: "relative",
  },
  typescript: {
    id: "typescript",
    techName: "TypeScript",
    description:
      "A typed superset of JavaScript that provides better type checking and enables better code organization, allowing for more maintainable codebases.",
    icon: TypeScriptIcon,
    projectsCount: 3,
    skillLevelPercentage: 90,
    isActive: true,
    startDate: "08/2021",
    experienceType: "relative",
  },
  csharp: {
    id: "csharp",
    techName: "C#",
    description:
      "C# is an object-oriented, component-oriented programming language. It is a programming language developed by Microsoft that runs on the .NET Framework. ",
    icon: CsharpIcon,
    projectsCount: 3,
    skillLevelPercentage: 60,
    isActive: true,
    startDate: "06/2022",
    experienceType: "relative",
  },
  dotnet: {
    id: "dotnet",
    techName: ".NET",
    description:
      "A framework used for building web applications, desktop applications, mobile applications, and web services.",
    icon: DotNetIcon,
    projectsCount: 2,
    skillLevelPercentage: 60,
    isActive: true,
    startDate: "06/2022",
    experienceType: "relative",
  },
  golang: {
    id: "golang",
    techName: "Go",
    description:
      "Go is popular for its simplicity, fast compile times, efficient memory management, and built-in concurrency support, making it a great choice for building high-performance and scalable applications.",
    icon: GoLangIcon,
    projectsCount: 3,
    skillLevelPercentage: 45,
    isActive: true,
    startDate: "03/2023",
    experienceType: "relative",
  },
  sql: {
    id: "sql",
    techName: "SQL",
    description:
      "SQL is a standard language for storing, manipulating, and retrieving data in relational database systems. SQL is used to query, insert, update and modify data.",
    icon: SQLIcon,
    projectsCount: 3,
    skillLevelPercentage: 60,
    isActive: true,
    experienceType: "relative",
    startDate: "06/2022",
  },
  azure: {
    id: "azure",
    techName: "Microsoft Azure",
    description:
      "Microsoft Azure is a cloud computing service created by Microsoft for building, testing, deploying, and managing applications and services through Microsoft-managed data centers.",
    icon: AzureIcon,
    projectsCount: 1,
    skillLevelPercentage: 40,
    isActive: true,
    experienceType: "relative",
    startDate: "08/2022",
  },
  gcp: {
    id: "gcp",
    techName: "Google Cloud Platform",
    description:
      "Google Cloud Platform is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products.",
    icon: GCPIcon,
    projectsCount: 1,
    skillLevelPercentage: 20,
    isActive: true,
    experienceType: "relative",
    startDate: "06/2023",
  },
  mongodb: {
    id: "mongodb",
    techName: "Mongo DB",
    description:
      "A popular NoSQL database used for storing and managing unstructured data, often used in web and mobile applications to provide flexible data storage.",
    icon: MongoDBIcon,
    projectsCount: 3,
    skillLevelPercentage: 50,
    isActive: true,
    experienceType: "relative",
    startDate: "08/2021",
  },
  cosmosdb: {
    id: "cosmosdb",
    techName: "Cosmos DB",
    description:
      "A NoSQL database service used for storing and managing unstructured data, often used in web and mobile applications to provide flexible data storage.",
    icon: CosmosDBIcon,
    projectsCount: 1,
    skillLevelPercentage: 40,
    isActive: false,
    experienceType: "relative",
    startDate: "08/2022",
  },
  html: {
    id: "html",
    techName: "HTML",
    description:
      "A markup language used to structure content on web pages, defining the layout and appearance of text, images, and other media.",
    icon: HTMLIcon,
    projectsCount: 10,
    skillLevelPercentage: 90,
    isActive: true,
    startDate: "06/2021",
    experienceType: "relative",
  },
  css: {
    id: "css",
    techName: "CSS",
    description:
      "A stylesheet language used to describe the presentation of HTML content, controlling its appearance, layout, and other visual aspects.",
    icon: CSSIcon,
    projectsCount: 10,
    skillLevelPercentage: 90,
    isActive: true,
    startDate: "06/2021",
    experienceType: "relative",
  },
  redux: {
    id: "redux",
    techName: "Redux",
    description:
      "A state management library used in conjunction with React to manage application state and data flow.",
    icon: ReduxIcon,
    projectsCount: 3,
    skillLevelPercentage: 70,
    isActive: true,
    startDate: "06/2021",
    experienceType: "relative",
  },
  fluentui: {
    id: "fluentui",
    techName: "Fluent UI",
    description:
      "A design system developed by Microsoft for building user interfaces, offering a set of reusable components and tools for creating modern web and mobile applications.",
    icon: FluentUIIcon,
    projectsCount: 1,
    skillLevelPercentage: 80,
    isActive: true,
    startDate: "06/2022",
    experienceType: "relative",
  },
  bootstrap: {
    id: "bootstrap",
    techName: "BootStrap",
    description:
      "A popular CSS framework used for building responsive and mobile-first web applications, providing a set of pre-built UI components and styles.",
    icon: BootStrapIcon,
    projectsCount: 3,
    skillLevelPercentage: 70,
    isActive: false,
    experienceType: "fixed",
    startDate: "08/2021",
    endDate: "12/2021",
  },
  jest: {
    id: "jest",
    techName: "Jest",
    description:
      "A JavaScript testing framework developed by Facebook, used for unit and integration testing of React applications and other JavaScript projects.",
    icon: JestIcon,
    projectsCount: 1,
    skillLevelPercentage: 70,
    isActive: true,
    startDate: "06/2022",
    experienceType: "relative",
  },
  nodejs: {
    id: "nodejs",
    techName: "Node JS",
    description:
      "A JavaScript runtime built on the Chrome V8 engine, used for building server-side web applications and other backend services in JavaScript.",
    icon: NodeIcon,
    projectsCount: 3,
    skillLevelPercentage: 20,
    isActive: false,
    experienceType: "fixed",
    startDate: "08/2021",
    endDate: "12/2021",
  },
  expressjs: {
    id: "expressjs",
    techName: "Express JS",
    description:
      "A popular web framework for Node JS that provides a robust set of features for web and mobile applications.",
    icon: ExpressIcon,
    projectsCount: 10,
    skillLevelPercentage: 20,
    isActive: false,
    experienceType: "fixed",
    startDate: "08/2021",
    endDate: "12/2021",
  },
  websockets: {
    id: "websockets",
    techName: "Web Sockets",
    description:
      "A protocol used for bi-directional communication between a client and server, allowing real-time data transfer and enabling the creation of interactive web applications.",
    icon: WebSocketsIcon,
    projectsCount: 1,
    skillLevelPercentage: 30,
    isActive: false,
    experienceType: "fixed",
    startDate: "08/2021",
    endDate: "06/2022",
  },
  restapi: {
    id: "restapi",
    techName: "REST API",
    description:
      "An architectural style for designing networked applications that uses HTTP requests to GET, PUT, POST and DELETE data.",
    icon: RestIcon,
    projectsCount: 6,
    skillLevelPercentage: 70,
    isActive: false,
    experienceType: "relative",
    startDate: "06/2021",
  },
  python: {
    id: "python",
    techName: "Python",
    description:
      "A high-level programming language used for web development, data analysis, scientific computing, and more.",
    icon: PythonIcon,
    projectsCount: 4,
    skillLevelPercentage: 20,
    isActive: false,
    experienceType: "fixed",
    startDate: "05/2021",
    endDate: "08/2021",
  },
};

export const projects: IProjectDict = {
  pro4: {
    id: "pro4",
    title: "Pro4",
    description:
      "Pro4 is a versatile event management website that simplifies the process of creating, managing, and promoting events. With customizable registration forms, secure payment collection, and convenient attendee engagement features, Pro4 streamlines event organization.",
    githubLink: "",
    projectLink: "https://pro4.anudeep.info",
    image: Pro4Image,
    logo: "",
    gif: "",
    techStack: ["golang", "mongodb", "reactjs", "typescript"],
  },
  websitetracker: {
    id: "website-tracker",
    title: "Website tracker",
    description:
      "Website tracker is a tool designed to track and monitor the behavior and engagement of website users. It records and provides insights into the number of times a user has visited the website and the duration of time spent on the site during each visit.",
    githubLink: "https://github.com/anudeep-mp/tracker-api",
    projectLink: "",
    image: TrackerImage,
    logo: TrackerLogo,
    gif: "",
    techStack: ["golang", "mongodb", "reactjs", "typescript"],
  },
  cubechat: {
    id: "cube-chat",
    title: "Cube Chat",
    description:
      "Cube Chat is a real-time chat platform that allows users to communicate with their friends. It offers various functionalities, such as discovering people on Cube Chat, connecting with friends, and engaging in real-time conversations.",
    githubLink: "https://github.com/anudeep-m/Cube-chat",
    projectLink: "https://cube-chat.anudeep.info",
    image: CubeChatImage,
    logo: CubeChatLogo,
    gif: CubeChatGif,
    techStack: ["reactjs", "nodejs", "expressjs", "mongodb", "websockets"],
  },
  cubemusic: {
    id: "cube-music",
    title: "Cube Music",
    description:
      "Cube Music is an online music streaming platform designed for playing songs. It offers various features for managing personal playlists, liked songs, adding songs to a queue, and creating albums. Additionally, Cube Music has an admin management system that enables administrators to add new albums.",
    githubLink: "https://github.com/anudeep-m/Cube-music",
    projectLink: "https://cube-music.anudeep.info",
    image: CubeMusicImage,
    logo: CubeMusicLogo,
    gif: CubeMusicGif,
    techStack: ["reactjs", "nodejs", "expressjs", "mongodb"],
  },
  cubekart: {
    id: "cubekart",
    title: "Cubekart",
    githubLink: "https://github.com/anudeep-m/Cubekart",
    projectLink: "https://cubekart.anudeep.info",
    image: CubekartImage,
    logo: CubekartLogo,
    gif: CubekartGif,
    description:
      "Cubekart is an online shopping platform that enables customers to purchase products through a web application. The platform offers various features such as adding items to a virtual cart, placing orders, and leaving reviews. Additionally, Cubekart features an admin management system, allowing administrators to add new products and manage orders.",
    techStack: ["reactjs", "nodejs", "expressjs", "mongodb"],
  },
};

export const defaultProjectKey = "pro4";

export const contactLinks: IContactLink[] = [
  {
    id: "phone",
    icon: PhoneIcon,
    link: "tel:+91-900-332-2159",
    label: "Phone",
    socialId: "+91-900-332-2159",
  },
  {
    id: "mail",
    icon: MailIcon,
    link: "mailto:anudeep.mp7@gmail.com",
    label: "Mail",
    socialId: "anudeep.mp7@gmail.com",
  },
  {
    id: "whatsapp",
    icon: WhatsAppIcon,
    link: "https://wa.me/919003322159",
    label: "WhatsApp",
    socialId: "+91-900-332-2159",
  },
  {
    id: "telegram",
    icon: TelegramIcon,
    link: "https://t.me/i_anudeep",
    label: "Telegram",
    socialId: "@i_anudeep",
  },
];

export const socialLinks: ISocialLink[] = [
  {
    id: "linkedin",
    icon: LinkedInIcon,
    link: "https://www.linkedin.com/in/anudeep-m",
    label: "LinkedIn",
    socialId: "anudeep-m",
  },
  {
    id: "github",
    icon: GitHubIcon,
    link: "https://github.com/anudeep-mp",
    label: "GitHub",
    socialId: "anudeep-mp",
  },
  {
    id: "twitter",
    icon: TwitterIcon,
    link: "https://twitter.com/i__anudeep",
    label: "Twitter",
    socialId: "i__anudeep",
  },
  {
    id: "instagram",
    icon: InstagramIcon,
    link: "https://instagram.com/i_anudeep",
    label: "Instagram",
    socialId: "i_anudeep",
  },
];

export function LeftArrow () {
  return (<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="500.000000pt" height="500.000000pt" viewBox="0 0 500.000000 500.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
fill="var(--primary-color)" stroke="none">
<path d="M2521 3431 c-15 -15 -28 -19 -55 -14 -30 5 -50 -4 -166 -76 -319
-198 -725 -419 -1060 -576 -113 -54 -211 -102 -218 -107 -20 -17 -14 -73 10
-99 32 -34 381 -294 570 -425 87 -60 213 -140 280 -178 68 -38 192 -107 276
-155 84 -47 203 -123 264 -168 61 -46 118 -83 128 -83 9 0 37 16 62 36 l46 35
3 239 c2 131 8 242 12 247 17 17 660 16 897 -2 435 -32 385 -31 405 -1 28 42
7 98 -44 117 l-24 10 7 182 c6 175 18 327 32 413 5 34 2 45 -19 70 l-25 28
-193 -3 c-482 -9 -1055 -16 -1061 -13 -5 2 -8 114 -8 250 0 136 -4 252 -8 258
-23 35 -83 43 -111 15z m-19 -383 l3 -232 40 -29 40 -28 604 6 603 6 -6 -38
c-3 -21 -9 -141 -12 -267 l-7 -228 -51 6 c-146 18 -525 28 -786 21 -377 -9
-360 -8 -375 -28 -19 -26 -35 -152 -42 -324 -3 -84 -7 -153 -9 -153 -2 0 -41
24 -86 54 -46 29 -137 84 -203 121 -272 153 -338 193 -497 300 -168 114 -487
346 -488 355 0 3 98 53 218 112 330 162 694 364 947 526 44 28 86 51 92 51 10
1 13 -55 15 -231z"/>
<path d="M2230 3089 c-204 -109 -540 -319 -591 -370 -27 -27 -24 -74 6 -104
13 -14 32 -25 42 -25 10 0 63 31 118 69 122 84 362 228 508 306 59 31 115 68
123 80 29 45 -9 105 -66 105 -14 0 -77 -28 -140 -61z"/>
</g>
</svg>)
}
