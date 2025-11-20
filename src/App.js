import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
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
} from "lucide-react";
import emailjs from "@emailjs/browser";

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

  const titles = [
    "Software Engineer",
    "Full-Stack Engineer",
    "Cloud Engineer",
    "Problem Solver",
  ];
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

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

    // Prepare the email parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    // Send email using EmailJS
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

  const skillsData = {
    languages: {
      icon: <Code2 size={24} />,
      title: "Programming Languages",
      brief: "Java, TypeScript, JavaScript, SQL, HTML5, CSS3",
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
        {
          name: "HTML5 & CSS3",
          description:
            "Semantic markup and modern styling with responsive design",
        },
      ],
    },
    backend: {
      icon: <Database size={24} />,
      title: "Backend",
      brief:
        "Spring Boot, Spring MVC, Spring Security, Node.js, Express, Microservices, Restful APIs",
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
      icon: <Code2 size={24} />,
      title: "Frontend & Frameworks",
      brief:
        "React, Angular, Tailwind CSS, Responsive Design, Component-Driven Development",
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
          description: "Rapid UI development with utility-first CSS framework",
        },
        {
          name: "Responsive UI Design",
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
      title: "Databases & Storage",
      brief: "PostgreSQL, MongoDB, MySQL, SQL Server, ORMs",
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
          name: "MySQL & SQL Server",
          description: "Relational database management and stored procedures",
        },
        {
          name: "ORM Tools",
          description: "Hibernate, Sequelize, and data mapping frameworks",
        },
        {
          name: "Query Optimization",
          description:
            "Indexing strategies, query analysis, and performance tuning",
        },
      ],
    },
    cloud: {
      icon: <Wrench size={24} />,
      title: "Cloud & DevOps",
      brief:
        "AWS, Docker, Kubernetes, Terraform, Kafka, Jenkins & Github Actions, CI/CD Pipelines",
      details: [
        {
          name: "AWS Services",
          description: "EC2, S3, Lambda, RDS, ECS for cloud infrastructure",
        },
        {
          name: "Docker & Kubernetes",
          description:
            "Containerization and orchestration for scalable deployments",
        },
        {
          name: "Terraform",
          description: "Infrastructure as Code for cloud resource management",
        },
        {
          name: "Apache Kafka",
          description: "Event-driven architecture and real-time data streaming",
        },
        {
          name: "Jenkins & GitHub Actions",
          description: "Automated build, test, and deployment pipelines",
        },
        {
          name: "CI/CD Pipelines",
          description: "Continuous integration and delivery automation",
        },
      ],
    },
    testing: {
      icon: <Wrench size={24} />,
      title: "Testing & Observability",
      brief:
        "JUnit, Mockito, Cypress, Postman, CloudWatch, Grafana, Performance Monitoring",
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
          name: "CloudWatch & Grafana",
          description: "Metrics, logs, and dashboards for system monitoring",
        },
        {
          name: "Performance Monitoring",
          description: "Application performance analysis and optimization",
        },
      ],
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
      achievements: [
        "Architected a full-stack configuration service with Spring Boot backend APIs and a React-based admin interface using schema validation and RBAC, enabling creators to manage monetization workflows across distributed platform microservices.",
        "Developed Jenkins CI/CD pipelines integrating JUnit and Cypress test automation, leveraging GitHub Copilot for rapid UI and API test generation; achieved 90% coverage and accelerated frontend and backend deployment cycles by 40% through Dockerization.",
        "Implemented blockchain withdrawal flows with React/MetaMask wallet interactions on the frontend and secure Spring Boot APIs on the backend, integrating webhook-driven event confirmations for real-time Ethereum/Polygon settlement.",
      ],
    },
    {
      title: "Associate Consultant - GCM 2",
      company: "Atos",
      period: "March 2023 - June 2023",
      achievements: [
        "Designed event-driven microservices using Spring Boot and Kafka while collaborating with frontend teams to integrate real-time status updates and notification flows for high-volume insurance transactions exceeding 500K/day.",
        "Established Jenkins CI/CD pipelines incorporating component, API, and UI testing using JUnit, Mockito, and Cypress, maintaining 80% test coverage and reducing cross-team release issues by 15%.",
        "Built secure OAuth2 REST APIs and optimized SQL queries to enhance performance and responsiveness for claim and policy processing.",
      ],
    },
    {
      title: "Associate Consultant - GCM 1",
      company: "Atos",
      period: "March 2021 - February 2023",
      achievements: [
        "Delivered full-stack transaction features using Spring Boot microservices and React UI modules, ensuring consistent user workflows and maintaining 99.9% uptime across policy management, payment workflows, and claim operations.",
        "Enhanced system responsiveness by 25% through PostgreSQL query tuning and implemented client-side caching in React to reduce data-loading latency for high-traffic operational dashboards.",
        "Built reusable and responsive React components integrated with JWT-secured Spring Boot APIs, improving navigation, workflow accuracy, accessibility, and overall interface consistency across internal agent portals and policyholder-facing web applications.",
        "Established full-stack observability using CloudWatch by capturing UI error events, API performance traces, and system health metrics, improving issue visibility and incident detection rates by 30%.",
      ],
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
      image: "/InsightsIQ.png",
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
      image: "/EMP.png",
      githubUrl: "https://github.com/dongrep/husky-events-client",
      liveUrl: null,
    },
    {
      title: "Personal-Data-Vault-PDV",
      description:
        "A secure, modular, and extensible web application that allows users to store, encrypt, and share sensitive data such as personal IDs, passwords, and other critical fields with fine-grained delegated access. Built using Java (Spring Boot), MySQL, JWT, and optional blockchain & email integrations.",
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
      image: "/PDV.png",
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
      image: "/CloudOnBoarding.png",
      githubUrl: "https://github.com/Preyash-NEU/tf-aws-infra",
      liveUrl: null,
    },
  ];

  // const blogPosts = [
  //   {
  //     title: 'Building Scalable Microservices with Node.js',
  //     excerpt: 'Learn how to design and implement microservices architecture using Node.js, Docker, and Kubernetes.',
  //     date: 'Nov 15, 2024',
  //     readTime: '8 min read'
  //   },
  //   {
  //     title: 'Advanced React Patterns for Large Applications',
  //     excerpt: 'Explore compound components, render props, and custom hooks to build maintainable React applications.',
  //     date: 'Nov 8, 2024',
  //     readTime: '6 min read'
  //   },
  //   {
  //     title: 'PostgreSQL Performance Optimization',
  //     excerpt: 'Deep dive into indexing strategies, query optimization, and connection pooling for PostgreSQL databases.',
  //     date: 'Nov 1, 2024',
  //     readTime: '10 min read'
  //   }
  // ];

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

      <div style={{ position: "relative", zIndex: 2 }}>
        <nav
          style={{
            position: "fixed",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "rgba(20, 20, 20, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50px",
            padding: "12px 32px",
            display: "flex",
            gap: "32px",
            alignItems: "center",
            zIndex: 1000,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* <div style={{
            fontSize: '18px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Preyash
          </div> */}
          {["About", "Experience", "Skills", "Projects", "Contact"].map(
            (item) => (
              <button
                key={item}
                onClick={() => {
                  const element = document.getElementById(item.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
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

        {/* Hero Section */}
        <section
          id="home"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 48px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              background:
                "radial-gradient(circle, rgba(255, 107, 53, 0.3), transparent 70%)",
              borderRadius: "50%",
              filter: "blur(60px)",
              top: "20%",
              right: "10%",
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
                marginBottom: "24px",
                fontSize: "14px",
                color: "#FF6B35",
              }}
            >
              <Sparkles size={16} />
              Available for new opportunities
            </div>

            <div
              style={{
                fontSize: "72px",
                fontWeight: "800",
                marginBottom: "24px",
                lineHeight: "1.2",
                height: "170px",
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
                  borderRight: "4px solid #FF6B35",
                  animation: "blink 0.7s infinite",
                  marginLeft: "4px",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "20px",
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "600px",
                margin: "0 auto 40px",
                lineHeight: "1.6",
              }}
            >
              Building elegant solutions to complex problems. Specialized in
              modern web technologies and scalable architectures.
            </p>

            <div
              style={{ display: "flex", gap: "16px", justifyContent: "center" }}
            >
              <button
                onClick={() => {
                  const element = document.getElementById("projects");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  padding: "16px 40px",
                  background: "linear-gradient(135deg, #FF6B35, #F7931E)",
                  border: "none",
                  borderRadius: "50px",
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
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
                href="/resume.pdf"
                download="Preyash-Mehta.pdf"
                style={{
                  padding: "16px 40px",
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
            padding: "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "64px",
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
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
              alignItems: "center",
            }}
          >
            <img
              src="ProfileImage.jpeg"
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
            <div>
              <p
                style={{
                  fontSize: "18px",
                  color: "rgba(255, 255, 255, 0.7)",
                  lineHeight: "1.8",
                  marginBottom: "20px",
                }}
              >
                Full-stack Software Engineer with 3 years of experience
                delivering Java, Spring Boot microservices, cloud-based
                workflows, and secure, high-performance web applications.
                Skilled in building REST APIs, optimizing PostgreSQL databases,
                and developing production-ready React interfaces tightly
                integrated with backend services. Experienced with AWS, CI/CD
                automation, containerized deployments, and distributed system
                monitoring to ensure reliability, scalability, and efficient
                cross-team delivery.
              </p>
              <p
                style={{
                  fontSize: "18px",
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
                  fontSize: "18px",
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
            padding: "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "64px",
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
              gridTemplateColumns: "1fr 1fr",
              gap: "64px",
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
                    fontSize: "28px",
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
                        padding: "24px",
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
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#FFF",
                          marginBottom: "8px",
                        }}
                      >
                        {edu.degree}
                      </h4>
                      <div
                        style={{
                          fontSize: "16px",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "12px",
                        }}
                      >
                        {edu.school}
                      </div>
                      <p
                        style={{
                          fontSize: "15px",
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
                    fontSize: "28px",
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
                        padding: "24px",
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
                          fontSize: "18px",
                          fontWeight: "600",
                          color: "#FFF",
                          marginBottom: "8px",
                        }}
                      >
                        {exp.title}
                      </h4>
                      <div
                        style={{
                          fontSize: "16px",
                          color: "rgba(255, 255, 255, 0.6)",
                          marginBottom: "16px",
                        }}
                      >
                        {exp.company}
                      </div>
                      <ul
                        style={{
                          margin: 0,
                          padding: 0,
                          listStyle: "none",
                        }}
                      >
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            style={{
                              fontSize: "15px",
                              color: "rgba(255, 255, 255, 0.5)",
                              lineHeight: "1.6",
                              marginBottom: "8px",
                              display: "flex",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{ color: "#FF6B35", marginTop: "6px" }}
                            >
                              →
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
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
            padding: "120px 48px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
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
              fontSize: "16px",
              color: "rgba(255, 255, 255, 0.5)",
              textAlign: "center",
              marginBottom: "64px",
            }}
          >
            Click on each card to explore detailed skills
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {Object.entries(skillsData).map(([key, skill]) => {
              const isExpanded = expandedSkill === key;
              return (
                <div
                  key={key}
                  onClick={() => setExpandedSkill(isExpanded ? null : key)}
                  style={{
                    padding: "32px",
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(20px)",
                    border: `2px solid ${
                      isExpanded
                        ? "rgba(255, 107, 53, 0.5)"
                        : "rgba(255, 255, 255, 0.1)"
                    }`,
                    borderRadius: "24px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    gridColumn: isExpanded ? "span 3" : "span 1",
                    boxShadow: isExpanded
                      ? "0 20px 60px rgba(255, 107, 53, 0.3)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 107, 53, 0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor =
                        "rgba(255, 255, 255, 0.1)";
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        background:
                          "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))",
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FF6B35",
                      }}
                    >
                      {skill.icon}
                    </div>
                    <ChevronDown
                      size={20}
                      style={{
                        color: "rgba(255, 255, 255, 0.5)",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#FFF",
                      marginBottom: "12px",
                    }}
                  >
                    {skill.title}
                  </h3>
                  {!isExpanded ? (
                    <p
                      style={{
                        fontSize: "15px",
                        color: "rgba(255, 255, 255, 0.5)",
                        lineHeight: "1.6",
                      }}
                    >
                      {skill.brief}
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                        marginTop: "32px",
                      }}
                    >
                      {skill.details.map((detail, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: "24px",
                            background: "rgba(255, 255, 255, 0.05)",
                            borderRadius: "16px",
                            borderLeft: "3px solid #FF6B35",
                          }}
                        >
                          <h4
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#FFF",
                              marginBottom: "12px",
                            }}
                          >
                            {detail.name}
                          </h4>
                          <p
                            style={{
                              fontSize: "14px",
                              color: "rgba(255, 255, 255, 0.5)",
                              lineHeight: "1.6",
                            }}
                          >
                            {detail.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          style={{
            padding: "120px 48px",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "64px",
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
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "32px",
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
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      background:
                        "linear-gradient(135deg, rgba(255, 107, 53, 0.2), rgba(247, 147, 30, 0.1))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255, 255, 255, 0.3)",
                      fontSize: "16px",
                    }}
                  >
                    Project Screenshot
                  </div>
                )}
                <div style={{ padding: "32px" }}>
                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#FFF",
                      marginBottom: "16px",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
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
                          fontSize: "13px",
                          borderRadius: "8px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "16px" }}>
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

        {/* Blog Section */}
        {/* <section id="blog" style={{
          padding: '120px 48px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '64px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FFFFFF, rgba(255, 255, 255, 0.5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Latest Blog Posts
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px'
          }}>
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.5)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '16px'
                }}>
                  {post.date} • {post.readTime}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#FFF',
                  marginBottom: '16px',
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {post.excerpt}
                </p>
                <a
                  href="#"
                  style={{
                    color: '#FF6B35',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </section> */}

        {/* Contact Section */}
        <section
          id="contact"
          style={{
            padding: "120px 48px",
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
              padding: "64px",
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
                width: "400px",
                height: "400px",
                background:
                  "radial-gradient(circle, rgba(255, 107, 53, 0.2), transparent 70%)",
                borderRadius: "50%",
                filter: "blur(60px)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2
                style={{
                  fontSize: "48px",
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
                  fontSize: "16px",
                  color: "rgba(255, 255, 255, 0.5)",
                  textAlign: "center",
                  marginBottom: "48px",
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
                  placeholder="Preyash"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    padding: "18px 24px",
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
                    padding: "18px 24px",
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
                    padding: "18px 24px",
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
                    padding: "18px 32px",
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
            padding: "48px",
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
            {/* GitHub */}
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

            {/* LinkedIn */}
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

            {/* Email */}
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
