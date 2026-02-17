import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  Cloud,
  Layout,
  ExternalLink,
  Code2,
  Database,
  Wrench,
  ChevronDown,
  GraduationCap,
  Briefcase,
  Download,
  ArrowRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const titles = [
  "Software Engineer",
  "Full-Stack Engineer",
  "Cloud Engineer",
  "Problem Solver",
];

const ModernPortfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setTypedText(
        isDeleting
          ? fullText.substring(0, typedText.length - 1)
          : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully! I will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("FAILED...", error);
        alert("Failed to send message. Please try again or email me directly.");
      });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Updated data structure
  const skillsData = {
    // TIER 1: Core Competencies (high-level overview)
    coreTier: [
      {
        key: "fullstack",
        icon: <Code2 size={32} />,
        title: "Full-Stack Development",
        description:
          "End-to-end application development with modern frameworks and architectures",
      },
      {
        key: "cloud",
        icon: <Cloud size={32} />,
        title: "Cloud & Infrastructure",
        description: "Scalable cloud solutions and containerized deployments",
      },
      {
        key: "devops",
        icon: <Wrench size={32} />,
        title: "DevOps & Automation",
        description:
          "CI/CD pipelines, testing automation, and system observability",
      },
    ],

    // TIER 2: Technical Skills (detailed, expandable)
    technicalTier: {
      languages: {
        icon: <Code2 size={24} />,
        title: "Languages & Frameworks",
        items: ["Java", "TypeScript", "JavaScript", "Python", "SQL"],
        details: [
          {
            name: "Java",
            description:
              "Enterprise application development with Spring ecosystem and microservices",
          },
          {
            name: "TypeScript",
            description:
              "Type-safe development with enhanced code quality and developer experience",
          },
          {
            name: "JavaScript",
            description: "Modern ES6+ features for full-stack web development",
          },
          {
            name: "SQL",
            description:
              "Complex queries, database design, and optimization techniques",
          },
        ],
      },
      backend: {
        icon: <Database size={24} />,
        title: "Backend Technologies",
        items: [
          "Spring Boot",
          "Node.js",
          "Express",
          "REST APIs",
          "Microservices",
          "OAuth2/JWT",
        ],
        details: [
          {
            name: "Spring Boot & MVC",
            description:
              "Building enterprise-grade Java applications with dependency injection",
          },
          {
            name: "Spring Security",
            description:
              "Authentication, authorization, and security best practices",
          },
          {
            name: "Node.js & Express",
            description: "RESTful APIs and server-side JavaScript applications",
          },
          {
            name: "Microservices",
            description:
              "Distributed system design and service-oriented architecture",
          },
          {
            name: "RESTful APIs",
            description: "API design, versioning, and best practices",
          },
        ],
      },
      frontend: {
        icon: <Layout size={24} />,
        title: "Frontend Development",
        items: [
          "React",
          "Angular",
          "Tailwind CSS",
          "Redux",
          "Responsive Design",
          "Component Architecture",
        ],
        details: [
          {
            name: "React",
            description:
              "Building modern, performant web applications with hooks and context",
          },
          {
            name: "Angular",
            description:
              "Enterprise frontend applications with TypeScript and RxJS",
          },
          {
            name: "Tailwind CSS",
            description:
              "Rapid UI development with utility-first CSS framework",
          },
          {
            name: "Redux",
            description: "State management for predictable application behavior",
          },
          {
            name: "Responsive Design",
            description: "Mobile-first design and cross-browser compatibility",
          },
          {
            name: "Component-Driven Development",
            description: "Reusable components and design systems",
          },
        ],
      },
      databases: {
        icon: <Database size={24} />,
        title: "Databases",
        items: [
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "Redis",
          "SQL Server",
          "Sequelize",
          "TypeORM",
          "Query Optimization",
        ],
        details: [
          {
            name: "PostgreSQL",
            description:
              "Advanced relational database features and performance tuning",
          },
          {
            name: "MongoDB",
            description: "NoSQL database design and aggregation pipelines",
          },
          {
            name: "MySQL",
            description: "Relational database management and stored procedures",
          },
          {
            name: "Redis",
            description: "In-memory caching and session management",
          },
          {
            name: "SQL Server",
            description: "Relational database management and performance tuning",
          },
          {
            name: "Sequelize",
            description: "Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server",
          },
          {
            name: "TypeORM",
            description: "ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript",
          },
          {
            name: "Query Optimization",
            description:
              "Indexing strategies, query analysis, and performance tuning",
          },
        ],
      },
      cloud: {
        icon: <Cloud size={24} />,
        title: "Cloud & DevOps",
        items: [
          "AWS",
          "Docker",
          "Kubernetes",
          "Kafka",
          "Jenkins",
          "GitHub Actions",
          "Terraform",
          "Control-M"
        ],
        details: [
          {
            name: "AWS Services",
            description: "EC2, S3, RDS, Lambda, API Gateway, IAM, CloudFormation",
          },
          {
            name: "Docker & Kubernetes",
            description:
              "Containerization and orchestration for scalable deployments",
          },
          {
            name: "Kafka",
            description: "Distributed event streaming platform for building real-time data pipelines", 
          },
          {
            name: "Terraform",
            description: "Infrastructure as Code for cloud resource management",
          },
          {
            name: "Jenkins & GitHub Actions",
            description: "Automated build, test, and deployment pipelines",
          },
          {
            name: "Control-M",
            description: "Enterprise job scheduling and workload automation",
          }
        ],
      },
      testing: {
        icon: <CheckCircle2 size={24} />,
        title: "Testing & Quality",
        items: [
          "JUnit",
          "Mockito",
          "Cypress",
          "Postman",
          "Selenium",
          "Integration Testing",
          "CloudWatch",
          "Grafana",
        ],
        details: [
          {
            name: "JUnit & Mockito",
            description: "Unit testing and mocking for Java applications",
          },
          {
            name: "Cypress",
            description: "End-to-end testing for modern web applications",
          },
          {
            name: "Postman",
            description: "API testing, documentation, and automation",
          },
          {
            name: "Selenium & Integration Testing",
            description: "Automated browser testing and comprehensive integration tests",
          },
          {
            name: "CloudWatch & Grafana",
            description: "Metrics, logs, and dashboards for system monitoring",
          },
        ],
      },
    },
  };

  const education = [
    {
      degree: "Master of Science in Computer Software Engineering",
      school: "Northeastern University",
      period: "September 2023 - May 2025",
      details: "Specialization in Software Engineering and Distributed Systems",
    },
    {
      degree: "Bachelor of Engineering in Computer Engineering",
      school: "Savitribai Phule Pune University",
      period: "August 2016 - May 2020",
      details:
        "Graduated with First Class Honors, focusing on Software Development and Data Structures",
    },
  ];

  const experience = [
  {
    title: "Software Engineering Intern",
    company: "Formless Inc.",
    period: "June 2024 - October 2024",
    description: "Worked across the full stack building configuration services and blockchain integrations. Spent a lot of time on testing infrastructure and CI/CD pipelines, getting coverage up to 90% and making deployments significantly faster. Also built real-time settlement flows that needed to be both secure and responsive.",
    keyAreas: ["API Development", "Test Automation", "Real-time Event Processing", "Deployment Optimization"],
  },
  {
    title: "Associate Consultant - GCM 2",
    company: "Atos",
    period: "March 2023 - June 2023",
    description: "Built microservices handling high-volume transactions and set up the testing and deployment infrastructure. Focused on making APIs secure and performant, and worked closely with frontend teams to integrate real-time updates. The work centered on keeping systems reliable at scale.",
    keyAreas: ["Microservices Architecture", "Event-Driven Systems", "API Security", "Database Optimization"],
  },
  {
    title: "Associate Consultant - GCM 1",
    company: "Atos",
    period: "March 2021 - February 2023",
    description: "Developed full-stack features for transaction systems that needed to stay reliable under heavy load. Spent significant time optimizing database queries and adding caching to improve response times. Also set up monitoring and observability to catch issues faster and keep systems healthy.",
    keyAreas: ["Full-Stack Development", "Performance Optimization", "System Observability", "Responsive UI Design"],
  },
];

  const projects = [
    {
      title: "InsightsIQ - Analytics Dashboard",
      description:
        "An AI Analytics Dashboard A web app where users can connect their data (CSV, Google Sheets, or API), visualize key KPIs, and ask natural language questions.",
      technologies: [
        "TypeScript",
        "Python",
        "Next.js",
        "React",
        "FastAPI",
        "PostgreSQL",
        "SQLAlchemy",
        "Redis",
        "Docker",
      ],
      githubUrl: "https://github.com/Preyash-NEU/InsightIQ",
      liveUrl: null,
    },
    {
      title: "Event Management App",
      description:
        "Collaborative event management platform with real-time updates, user roles, and calendar integration for seamless event planning.",
      technologies: [
        "MERN",
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "Tailwind",
        "Heroku",
      ],
      githubUrl: "https://github.com/dongrep/husky-events-client",
      liveUrl: null,
    },
    {
      title: "Personal-Data-Vault-PDV",
      description:
        "A secure, modular, and extensible web application that allows users to store, encrypt, and share sensitive data such as personal IDs, passwords, and other critical fields with fine-grained delegated access.",
      technologies: [
        "Java",
        "Spring Boot",
        "MySQL",
        "JWT",
        "Ethereum Sepolia",
        "Mailgun",
        "WebSocket",
        "Docker",
        "Swagger",
      ],
      githubUrl: "https://github.com/Preyash-NEU/Personal-Data-Vault-PDV",
      liveUrl: null,
    },
    {
      title: "Cloud-Native User Onboarding Platform",
      description:
        "A cloud-native platform for user onboarding with features like identity verification, multi-factor authentication, and role-based access control.",
      technologies: [
        "AWS",
        "Terraform",
        "PostgreSQL",
        "SendGrid",
        "GitHub Actions",
        "JavaScript",
        "Node.js",
      ],
      githubUrl: "https://github.com/Preyash-NEU/tf-aws-infra",
      liveUrl: null,
    },
  ];

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 53, 0.15), transparent 50%)`,
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  };

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        color: "#FFFFFF",
        minHeight: "100vh",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={gradientStyle} />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          zIndex: 0,
        }}
      />

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Navigation */}
        <nav
          style={{
            position: "fixed",
            top: isMobile ? "10px" : "20px",
            left: isMobile ? "10px" : "50%",
            right: isMobile ? "10px" : "auto",
            transform: isMobile ? "none" : "translateX(-50%)",
            backgroundColor: "rgba(20, 20, 20, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50px",
            padding: isMobile ? "12px 20px" : "12px 32px",
            display: "flex",
            gap: isMobile ? "0" : "32px",
            alignItems: "center",
            justifyContent: isMobile ? "space-between" : "center",
            zIndex: 1000,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {isMobile && (
            <>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PM
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#FFF",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </>
          )}

          {!isMobile &&
            ["About", "Experience", "Skills", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#FF6B35")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255, 255, 255, 0.7)")
                  }
                >
                  {item}
                </button>
              )
            )}
        </nav>

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "70px",
              left: "10px",
              right: "10px",
              backgroundColor: "rgba(20, 20, 20, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "24px",
              padding: "20px",
              zIndex: 999,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            {["About", "Experience", "Skills", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    padding: "16px",
                    textAlign: "left",
                    transition: "all 0.3s",
                    borderRadius: "12px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#FF6B35";
                    e.target.style.background = "rgba(255, 107, 53, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "rgba(255, 255, 255, 0.7)";
                    e.target.style.background = "none";
                  }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        )}

        {/* Hero Section */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? "0 20px" : "0 48px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: isMobile ? "250px" : "400px",
              height: isMobile ? "250px" : "400px",
              background:
                "radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
              top: "20%",
              right: isMobile ? "-20%" : "10%",
              animation: "float 6s ease-in-out infinite",
            }}
          />

          <div
            style={{
              maxWidth: "900px",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "rgba(255, 107, 53, 0.1)",
                border: "1px solid rgba(255, 107, 53, 0.3)",
                borderRadius: "50px",
                padding: "8px 20px",
                marginBottom: isMobile ? "16px" : "24px",
                fontSize: isMobile ? "12px" : "14px",
                color: "#FF6B35",
              }}
            >
              <Sparkles size={16} />
              Available for new opportunities
            </div>

            <div
              style={{
                fontSize: isMobile ? "36px" : "72px",
                fontWeight: "800",
                marginBottom: "24px",
                lineHeight: "1.2",
                height: isMobile ? "90px" : "170px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-2px",
              }}
            >
              {typedText}
              <span
                style={{
                  borderRight: isMobile
                    ? "3px solid #FF6B35"
                    : "4px solid #FF6B35",
                  animation: "blink 0.7s infinite",
                  marginLeft: "4px",
                }}
              />
            </div>

            <p
              style={{
                fontSize: isMobile ? "16px" : "20px",
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "600px",
                margin: "0 auto",
                marginBottom: isMobile ? "32px" : "40px",
                lineHeight: "1.6",
                padding: isMobile ? "0 10px" : "0",
              }}
            >
              Building elegant solutions to complex problems. Specialized in
              modern web technologies and scalable architectures.
            </p>

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexDirection: isMobile ? "column" : "row",
                padding: isMobile ? "0 20px" : "0",
              }}
            >
              <button
                onClick={() => scrollToSection("projects")}
                style={{
                  padding: isMobile ? "14px 32px" : "16px 40px",
                  background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                  border: "none",
                  borderRadius: "50px",
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.3s",
                  boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 15px 50px rgba(255, 107, 53, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 10px 40px rgba(255, 107, 53, 0.4)";
                }}
              >
                View Projects <ArrowRight size={18} />
              </button>
              <a
                href="/Preyash-Mehta.pdf"
                download="Preyash-Mehta.pdf"
                style={{
                  padding: isMobile ? "14px 32px" : "16px 40px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "50px",
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.borderColor = "rgba(255, 107, 53, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                }}
              >
                Download Resume <Download size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          style={{
            padding: isMobile ? "60px 20px" : "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: "700",
              marginBottom: isMobile ? "40px" : "64px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Me
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "32px" : "64px",
              alignItems: "center",
            }}
          >
            <img
              src="ProfileImage.jpeg"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                maxHeight: isMobile ? "400px" : "none",
                objectFit: "cover",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                Full-stack Software Engineer with 2+ years of experience
                delivering scalable microservices, cloud-based workflows, and
                secure, high-performance web applications. Skilled in building
                robust APIs, optimizing relational databases, and developing
                production-ready interfaces tightly integrated with backend
                services.
              </p>
              <p
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                When I'm not coding, you'll find me exploring new technologies,
                learning through projects, or making myself a pot of Biryani.
              </p>
              <p
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.8",
                }}
              >
                I believe in writing clean, maintainable code that adds impact
                to customers and create delightful user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section
          id="experience"
          style={{
            padding: isMobile ? "60px 20px" : "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: "700",
              marginBottom: isMobile ? "40px" : "64px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Experience & Education
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "48px" : "64px",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <GraduationCap size={24} />
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "600",
                    color: "#FFF",
                  }}
                >
                  Education
                </h3>
              </div>
              <div style={{ position: "relative", paddingLeft: "32px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    bottom: "8px",
                    width: "2px",
                    background:
                      "linear-gradient(180deg, rgba(255, 107, 53, 0.5), rgba(255, 107, 53, 0.1))",
                  }}
                />
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom: idx !== education.length - 1 ? "40px" : "0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-37px",
                        top: "8px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                        boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)",
                      }}
                    />
                    <div
                      style={{
                        padding: isMobile ? "20px" : "24px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#FF6B35",
                          fontWeight: "600",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {edu.period}
                      </div>
                      <h4
                        style={{
                          fontSize: isMobile ? "16px" : "18px",
                          fontWeight: "600",
                          color: "#FFF",
                          marginBottom: "8px",
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "12px",
                        }}
                      >
                        {edu.school}
                      </div>
                      <p
                        style={{
                          fontSize: isMobile ? "14px" : "15px",
                          color: "rgba(255, 255, 255, 0.5)",
                          lineHeight: "1.6",
                        }}
                      >
                        {edu.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background:
                      "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                  }}
                >
                  <Briefcase size={24} />
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "600",
                    color: "#FFF",
                  }}
                >
                  Experience
                </h3>
              </div>
              <div style={{ position: "relative", paddingLeft: "32px" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "8px",
                    bottom: "8px",
                    width: "2px",
                    background:
                      "linear-gradient(180deg, rgba(255, 107, 53, 0.5), rgba(255, 107, 53, 0.1))",
                  }}
                />
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginBottom:
                        idx !== experience.length - 1 ? "40px" : "0",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-37px",
                        top: "8px",
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                        boxShadow: "0 0 20px rgba(255, 107, 53, 0.6)",
                      }}
                    />
                    <div
                      style={{
                        padding: isMobile ? "20px" : "24px",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "16px",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#FF6B35",
                          fontWeight: "600",
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                        }}
                      >
                        {exp.period}
                      </div>
                      <h4
                        style={{
                          fontSize: isMobile ? "16px" : "18px",
                          fontWeight: "600",
                          color: "#FFF",
                          marginBottom: "8px",
                        }}
                      >
                        {exp.title}
                      </h4>
                      <div
                        style={{
                          fontSize: isMobile ? "14px" : "16px",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "16px",
                        }}
                      >
                        {exp.company}
                      </div>
                      <p
                        style={{
                          fontSize: isMobile ? "14px" : "15px",
                          color: "rgba(255, 255, 255, 0.5)",
                          lineHeight: "1.6",
                          marginBottom: "16px",
                        }}
                      >
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          style={{
            padding: isMobile ? "60px 20px" : "120px 48px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: "700",
              marginBottom: "16px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Skills & Technologies
          </h2>
          <p
            style={{
              fontSize: isMobile ? "14px" : "16px",
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
              marginBottom: isMobile ? "40px" : "64px",
            }}
          >
            Building scalable, production-ready applications from concept to
            deployment
          </p>

          {/* TIER 1: Core Competencies */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: isMobile ? "40px" : "64px",
            }}
          >
            {skillsData.coreTier.map((competency) => (
              <div
                key={competency.key}
                style={{
                  padding: isMobile ? "32px 24px" : "40px 32px",
                  background:
                    "linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.05))",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(255, 107, 53, 0.3)",
                  borderRadius: "24px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(255, 107, 53, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.3)";
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    background:
                      "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FF6B35",
                    margin: "0 auto 24px",
                  }}
                >
                  {competency.icon}
                </div>
                <h3
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "600",
                    color: "#FFF",
                    marginBottom: "12px",
                  }}
                >
                  {competency.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255, 255, 255, 0.6)",
                    lineHeight: "1.6",
                  }}
                >
                  {competency.description}
                </p>
              </div>
            ))}
          </div>

          {/* TIER 2: Technical Skills */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "24px",
              padding: isMobile ? "32px 20px" : "48px 40px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <h3
              style={{
                fontSize: isMobile ? "24px" : "28px",
                fontWeight: "600",
                color: "#FFF",
                marginBottom: isMobile ? "24px" : "32px",
                textAlign: "center",
              }}
            >
              Technical Expertise
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {Object.entries(skillsData.technicalTier).map(([key, skill]) => {
                const isExpanded = expandedSkill === key;
                return (
                  <div
                    key={key}
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      borderRadius: "16px",
                      border: `2px solid ${
                        isExpanded
                          ? "rgba(255, 107, 53, 0.4)"
                          : "rgba(255, 255, 255, 0.1)"
                      }`,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      onClick={() => setExpandedSkill(isExpanded ? null : key)}
                      style={{
                        padding: isMobile ? "20px" : "24px 32px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255, 255, 255, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          flex: 1,
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            background:
                              "linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(247, 147, 30, 0.08))",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FF6B35",
                            flexShrink: 0,
                          }}
                        >
                          {skill.icon}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            style={{
                              fontSize: isMobile ? "16px" : "18px",
                              fontWeight: "600",
                              color: "#FFF",
                              marginBottom: "6px",
                            }}
                          >
                            {skill.title}
                          </h4>
                          {!isExpanded && (
                            <p
                              style={{
                                fontSize: "14px",
                                color: "rgba(255, 255, 255, 0.5)",
                                whiteSpace: isMobile ? "normal" : "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {skill.items.join(" • ")}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown
                        size={20}
                        style={{
                          color: "rgba(255, 255, 255, 0.5)",
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0)",
                          transition: "transform 0.3s ease",
                          flexShrink: 0,
                          marginLeft: "16px",
                        }}
                      />
                    </div>

                    {isExpanded && (
                      <div
                        style={{
                          padding: isMobile ? "0 20px 24px" : "0 32px 32px",
                          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                          paddingTop: "24px",
                        }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: isMobile
                              ? "1fr"
                              : "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "16px",
                          }}
                        >
                          {skill.details.map((detail, idx) => (
                            <div
                              key={idx}
                              style={{
                                padding: "20px",
                                background: "rgba(255, 255, 255, 0.03)",
                                borderRadius: "12px",
                                borderLeft: "3px solid #FF6B35",
                              }}
                            >
                              <h5
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "600",
                                  color: "#FFF",
                                  marginBottom: "8px",
                                }}
                              >
                                {detail.name}
                              </h5>
                              <p
                                style={{
                                  fontSize: "13px",
                                  color: "rgba(255, 255, 255, 0.5)",
                                  lineHeight: "1.6",
                                }}
                              >
                                {detail.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          style={{
            padding: isMobile ? "60px 20px" : "120px 48px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "36px" : "48px",
              fontWeight: "700",
              marginBottom: isMobile ? "40px" : "64px",
              textAlign: "center",
              background:
                "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Featured Projects
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "24px" : "32px",
            }}
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "24px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  backdropFilter: "blur(10px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.5)";
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 60px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ padding: isMobile ? "24px" : "32px" }}>
                  <h3
                    style={{
                      fontSize: isMobile ? "20px" : "24px",
                      fontWeight: "600",
                      color: "#FFF",
                      marginBottom: "16px",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: isMobile ? "14px" : "15px",
                      color: "rgba(255, 255, 255, 0.5)",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    {project.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      marginBottom: "20px",
                      flexWrap: "wrap",
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "6px 16px",
                          background: "rgba(255, 107, 53, 0.1)",
                          border: "1px solid rgba(255, 107, 53, 0.3)",
                          color: "#FF6B35",
                          fontSize: isMobile ? "12px" : "13px",
                          borderRadius: "8px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
                  >
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#FF6B35",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        View Project <ExternalLink size={14} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#FF6B35",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        GitHub <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            padding: isMobile ? "60px 20px" : "120px 48px",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              background:
                "linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.05))",
              border: "1px solid rgba(255, 107, 53, 0.2)",
              borderRadius: "32px",
              padding: isMobile ? "40px 24px" : "64px",
              position: "relative",
              overflow: "hidden",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-25%",
                width: isMobile ? "250px" : "400px",
                height: isMobile ? "250px" : "400px",
                background:
                  "radial-gradient(circle, rgba(255, 107, 53, 0.2), transparent 70%)",
                borderRadius: "50%",
                filter: "blur(60px)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontSize: isMobile ? "36px" : "48px",
                  fontWeight: "700",
                  marginBottom: "16px",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.7))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Get In Touch
              </h2>
              <p
                style={{
                  fontSize: isMobile ? "14px" : "16px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                  marginBottom: isMobile ? "32px" : "48px",
                }}
              >
                Have a project in mind or want to collaborate? I'd love to hear
                from you.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    padding: isMobile ? "14px 20px" : "18px 24px",
                    fontSize: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#FFF",
                    outline: "none",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 107, 53, 0.5)";
                    e.target.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    padding: isMobile ? "14px 20px" : "18px 24px",
                    fontSize: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#FFF",
                    outline: "none",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 107, 53, 0.5)";
                    e.target.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{
                    padding: isMobile ? "14px 20px" : "18px 24px",
                    fontSize: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#FFF",
                    resize: "vertical",
                    outline: "none",
                    transition: "all 0.3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(255, 107, 53, 0.5)";
                    e.target.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  }}
                />
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: isMobile ? "16px 28px" : "18px 32px",
                    background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                    border: "none",
                    borderRadius: "12px",
                    color: "#FFF",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    boxShadow: "0 10px 40px rgba(255, 107, 53, 0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 15px 50px rgba(255, 107, 53, 0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 10px 40px rgba(255, 107, 53, 0.4)";
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            padding: isMobile ? "32px 20px" : "48px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <a
              href="https://github.com/Preyash-NEU"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 53, 0.2)";
                e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.5)";
                e.currentTarget.style.color = "#FF6B35";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }}
            >
              <Github size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/preyash-mehta"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 53, 0.2)";
                e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.5)";
                e.currentTarget.style.color = "#FF6B35";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }}
            >
              <Linkedin size={20} />
            </a>

            <a
              href="mailto:preyash.ja@example.com"
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s",
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 107, 53, 0.2)";
                e.currentTarget.style.borderColor = "rgba(255, 107, 53, 0.5)";
                e.currentTarget.style.color = "#FF6B35";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              }}
            >
              <Mail size={20} />
            </a>
          </div>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "14px",
            }}
          >
            © 2025 Preyash. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ModernPortfolio;
