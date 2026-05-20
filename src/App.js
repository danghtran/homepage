import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Fade,
  Grid2,
  IconButton,
  Collapse,
  CardMedia,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SecurityIcon from "@mui/icons-material/Security";
import { pageGradient, heroGradient, cardSx, accentBorders } from "./theme";

export default function App() {
  const [showContent, setShowContent] = useState(false);
  const [openGame, setOpenGame] = useState(false);
  const [openPrj1, setOpenPrj1] = useState(false);
  const [expandedExp, setExpandedExp] = useState({});

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const toggleExpand = (index) => {
    setExpandedExp((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: pageGradient,
        color: "text.primary",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Fade in={showContent} timeout={600}>
          <Card
            elevation={0}
            sx={{
              mb: 5,
              p: { xs: 3, md: 5 },
              textAlign: "center",
              background: heroGradient,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 8px 32px rgba(2, 132, 199, 0.12)",
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                px: 2,
                py: 0.75,
                borderRadius: 99,
                bgcolor: "rgba(13, 148, 136, 0.1)",
                color: "primary.dark",
              }}
            >
              <SecurityIcon fontSize="small" />
              <Typography variant="body2" fontWeight={600}>
                Cybersecurity · Software Engineering
              </Typography>
            </Box>
            <Typography
              variant="h3"
              sx={{
                background: "linear-gradient(90deg, #0f766e 0%, #0284c7 55%, #0369a1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
              }}
            >
              Hi, I&apos;m Dang Tran
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: "auto", mb: 2 }}>
              Software engineer transitioning into cybersecurity — building tools for reconnaissance, SOC triage, and data integrity.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
              {["CompTIA Security+", "TryHackMe", "GitHub projects"].map((label) => (
                <Chip key={label} label={label} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Card>
        </Fade>

        <Grid2 container spacing={3}>
          {infoCards.map((card, idx) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={card.title}>
              <Fade in={showContent} timeout={500 + idx * 200}>
                <Card
                  sx={{
                    ...cardSx,
                    borderTop: "4px solid",
                    borderTopColor: accentBorders[idx % accentBorders.length],
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" color="primary.dark" gutterBottom>
                      {card.title}
                    </Typography>
                    {card.title === "Education" ? (
                      <Box>
                        {card.content.map((item, i) => {
                          const [degree, details] = item.split(", ");
                          return (
                            <Box key={i} mb={2}>
                              <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                                {degree}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {details}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : Array.isArray(card.content) ? (
                      <Box
                        component="ul"
                        sx={{ m: 0, pl: 2.5, color: "text.secondary", "& li": { mb: 1 } }}
                      >
                        {card.content.map((item, i) => (
                          <li key={i}>
                            <Typography variant="body2" component="span">
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </Box>
                    ) : (
                      <Typography color="text.secondary" textAlign="justify">
                        {card.content}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid2>
          ))}
        </Grid2>

        <Fade in={showContent} timeout={800}>
          <Box sx={{ my: 6 }}>
            <SectionHeading title="Experience" />
            <Grid2 container spacing={3} justifyContent="center">
              {experienceCard.map((exp, i) => (
                <Grid2 size={{ xs: 12, md: 10 }} key={exp.content}>
                  <Card sx={cardSx}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        onClick={() => toggleExpand(i)}
                        sx={{ cursor: "pointer" }}
                      >
                        <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                          {exp.content}
                        </Typography>
                        <IconButton size="small" color="primary">
                          {expandedExp[i] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                      <Collapse in={expandedExp[i]} timeout="auto" unmountOnExit>
                        <Box
                          component="ul"
                          sx={{ mt: 2, mb: 0, pl: 2.5, color: "text.secondary", "& li": { mb: 1 } }}
                        >
                          {exp.desc.map((item, j) => (
                            <li key={j}>
                              <Typography variant="body2" component="span">
                                {item}
                              </Typography>
                            </li>
                          ))}
                        </Box>
                      </Collapse>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={900}>
          <Box textAlign="center" sx={{ mb: 6 }}>
            <SectionHeading title="Contact Me" />
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mt={2}>
              {contacts.map((contact) => (
                <IconButton
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={contact.label}
                  sx={{
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    width: 52,
                    height: 52,
                    boxShadow: "0 4px 14px rgba(13, 148, 136, 0.35)",
                    "&:hover": {
                      bgcolor: "primary.dark",
                      transform: "scale(1.06)",
                    },
                    transition: "transform 0.2s ease",
                  }}
                >
                  {contact.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={1000}>
          <Box sx={{ mb: 6 }}>
            <SectionHeading title="Certificates" />
            <Grid2 container spacing={3} mt={2}>
              {credlyBadges.map((badgeId) => (
                <Grid2 size={{ xs: 12, sm: 4 }} key={badgeId}>
                  <Card sx={{ ...cardSx, bgcolor: "#f8fdff", borderColor: "rgba(2, 132, 199, 0.2)" }}>
                    <CardContent sx={{ textAlign: "center", pt: 3 }}>
                      <div
                        data-iframe-width="270"
                        data-iframe-height="240"
                        data-share-badge-id={badgeId}
                        data-share-badge-host="https://www.credly.com"
                      />
                      <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js" />
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={1000}>
          <Box sx={{ pb: 4 }}>
            <SectionHeading
              title="Cybersecurity Projects"
              subtitle={
                <>
                  Selected work from{" "}
                  <Box
                    component="a"
                    href="https://github.com/danghtran"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "secondary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
                  >
                    github.com/danghtran
                  </Box>
                </>
              }
            />
            <Grid2 container spacing={3} mt={1}>
              {securityProjects.map((project) => (
                <Grid2 size={{ xs: 12, md: 6 }} key={project.title}>
                  <ProjectCard
                    project={project}
                    accent="primary"
                    onOpenGame={() => setOpenGame(true)}
                    onOpenMerkle={() => setOpenPrj1(true)}
                  />
                </Grid2>
              ))}
            </Grid2>

            <Box sx={{ mt: 6 }}>
              <SectionHeading title="Other Software Projects" />
              <Grid2 container spacing={3} mt={1}>
                {otherProjects.map((project) => (
                  <Grid2 size={{ xs: 12, md: 6 }} key={project.title}>
                    <ProjectCard
                      project={project}
                      accent="secondary"
                      onOpenGame={() => setOpenGame(true)}
                      onOpenMerkle={() => setOpenPrj1(true)}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          </Box>
        </Fade>

        <Dialog open={openGame} onClose={() => setOpenGame(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
            Game Preview
            <IconButton
              onClick={() => setOpenGame(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <iframe
              src="https://danghtran.github.io/webgl2-car-driving-game/"
              width="100%"
              height="600"
              style={{ border: "none" }}
              title="Game Preview"
              allowFullScreen
            />
          </DialogContent>
        </Dialog>

        <Dialog open={openPrj1} onClose={() => setOpenPrj1(false)} fullWidth maxWidth="md">
          <DialogTitle sx={{ fontWeight: 700, pr: 6 }}>
            Benchmark Merkle Tree on cloud environments
            <IconButton
              onClick={() => setOpenPrj1(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <iframe
              src={`${process.env.PUBLIC_URL}/Benchmark_Merkle_Tree_on_cloud_environments.pdf`}
              width="100%"
              height="600"
              style={{ border: "none" }}
              title="Project report"
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <Box textAlign="center" mb={subtitle ? 2 : 3}>
      <Typography variant="h5" color="text.primary">
        {title}
      </Typography>
      <Divider
        sx={{
          width: 56,
          height: 4,
          borderRadius: 2,
          border: "none",
          bgcolor: "primary.main",
          mx: "auto",
          mt: 1.5,
          mb: subtitle ? 1.5 : 0,
        }}
      />
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

const credlyBadges = [
  "7194b350-1f50-4a30-9055-09fba5d67a1a",
  "9e47e9f7-11f0-4e84-a87b-70317971ab93",
  "5694b335-ecfa-44f4-8dee-ec7c7bb835fa",
];

const containedBtnSx = { mt: 2, mr: 1 };
const outlinedBtnSx = { mt: 2, mr: 1 };

function ProjectCard({ project, accent, onOpenGame, onOpenMerkle }) {
  const accentColor = accent === "secondary" ? "secondary.main" : "primary.main";

  return (
    <Card
      sx={{
        ...cardSx,
        borderLeft: "4px solid",
        borderLeftColor: accentColor,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom color="text.primary">
          {project.title}
        </Typography>
        {project.language && (
          <Chip
            label={project.language}
            size="small"
            sx={{ mb: 2, bgcolor: "rgba(13, 148, 136, 0.08)", color: "primary.dark", fontWeight: 500 }}
          />
        )}
        {project.image && (
          <CardMedia
            component="img"
            image={`${process.env.PUBLIC_URL}/${project.image}`}
            sx={{
              width: "100%",
              mb: 2,
              objectFit: "cover",
              maxHeight: 220,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        )}
        {project.description.map((paragraph, i) => (
          <Typography key={i} color="text.secondary" paddingTop={i === 0 ? 0 : 2}>
            {paragraph}
          </Typography>
        ))}
        <Box sx={{ mt: 1 }}>
          {project.href && (
            <Button
              href={project.href}
              variant="contained"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              sx={containedBtnSx}
            >
              {project.linkLabel || "View on GitHub"}
            </Button>
          )}
          {project.secondaryHref && (
            <Button
              href={project.secondaryHref}
              variant="outlined"
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              sx={outlinedBtnSx}
            >
              {project.secondaryLabel}
            </Button>
          )}
          {project.action === "play" && (
            <Button variant="contained" color="secondary" sx={containedBtnSx} onClick={onOpenGame}>
              Play
            </Button>
          )}
          {project.action === "merkle" && (
            <Button variant="outlined" color="secondary" sx={outlinedBtnSx} onClick={onOpenMerkle}>
              View report
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

const securityProjects = [
  {
    title: "SOC Triage System",
    language: "Terraform · Python · Azure OpenAI · Microsoft Sentinel",
    description: [
      "Azure-native SOC pipeline that ingests virtual network flow logs via Traffic Analytics, raises Sentinel incidents on high-risk network traffic, and enriches alerts with structured AI triage recommendations from Azure OpenAI.",
      "Includes Terraform for Sentinel, VNet flow logs, analytics rules, and an optional Logic App playbook to POST incident context to a Function App responder."
    ],
    href: "https://github.com/danghtran/soc-triage-system",
    linkLabel: "Source"
  },
  {
    title: "Vulnerability Scanner",
    language: "Python",
    description: [
      "External reconnaissance and triage tool: TCP port discovery, TLS and HTTP security header checks, DNS and passive web inventory, then NVD/CVE enrichment with CISA KEV and EPSS context.",
      "Produces a unified action queue ranked by relevance, with optional Mistral AI advisory suggestions. Supports stealth scanning profiles for authorized assessments."
    ],
    href: "https://github.com/danghtran/vul_scanner",
    linkLabel: "Source"
  },
  {
    title: "Shoulder Surfing Detector",
    language: "Python",
    description: [
      "Desktop application that detects intentional shoulder surfing and blurs or hides sensitive on-screen content using gaze estimation (GazeML)."
    ],
    href: "https://github.com/danghtran/shouldetector",
    linkLabel: "Source"
  },
  {
    title: "Verifiable Database — Merkle Tree Benchmark",
    language: "Java · Google Cloud Dataflow",
    image: "merkle_benchmark.png",
    description: [
      "Benchmarked Merkle tree variants on Google Cloud to build a verifiable database with strong data-integrity guarantees while keeping throughput around five seconds per million records."
    ],
    href: "https://github.com/danghtran/merkle-tree-variant",
    linkLabel: "Source",
    action: "merkle"
  },
  {
    title: "Bitcoin SPV Wallet (Android)",
    language: "Java",
    description: [
      "Android wallet using the Simplified Payment Verification model to create and verify transactions without a trusted third party. Supports hierarchical deterministic wallets and multiple accounts.",
      "Companion backend: coinwallet-server."
    ],
    href: "https://github.com/danghtran/CoinWallet",
    linkLabel: "Mobile app",
    secondaryHref: "https://github.com/danghtran/coinwallet-server",
    secondaryLabel: "Server"
  }
];

const otherProjects = [
  {
    title: "Absorbent Gas Composition Visualization",
    language: "JavaScript · Plotly",
    image: "gas.png",
    description: [
      "Collaboration with chemistry researchers: imports, cleans, and visualizes experimental gas datasets in an interactive 3D Plotly view with adjustable thresholds."
    ],
    href: "https://github.com/danghtran/gas_vis",
    linkLabel: "Source"
  },
  {
    title: "3D Driving Game",
    language: "React · WebGL2",
    image: "webgl_car.png",
    description: [
      "WebGL2 driving game with PBR rendering, GPU instancing, AABB collision, and Phong lighting — collect fuel and coins while avoiding obstacles."
    ],
    href: "https://github.com/danghtran/webgl2-car-driving-game",
    linkLabel: "Source",
    action: "play"
  },
  {
    title: "Little Boy — Cross the Road",
    language: "C · SDL2",
    image: "cross_road.png",
    description: [
      "Desktop arcade game inspired by Crossy Road, built with C and SDL2."
    ],
    href: "https://github.com/danghtran/LittleBoy",
    linkLabel: "Source"
  }
];

const infoCards = [
  {
    title: "About Me",
    content:
      "I’m pursuing a Master’s in Computer Science at Memorial University and previously spent two years as a Software Engineer at Elca. I’m now focused on cybersecurity: CompTIA Security+, TryHackMe labs, and building open-source tools for vulnerability assessment, SOC automation on Azure, and privacy-aware desktop security. I combine strong software engineering habits with a security-first mindset."
  },
  {
    title: "Education",
    content: [
      "M.Sc. in Computer Science, Memorial University of Newfoundland (2025 - Present)",
      "B.Sc. in Computer Science, Ho Chi Minh City University of Science (2018 - 2022 GPA: 3.8)"
    ]
  },
  
  {
    title: "Skills",
    content: [
      "Vulnerability assessment: Nmap, custom Python scanners, TLS/HTTP/DNS analysis",
      "Cloud security: Microsoft Sentinel, Azure OpenAI, Terraform, VNet flow logs",
      "Languages: Python, Java, TypeScript, C/C++",
      "Frameworks: Spring Boot, React, Azure Functions",
      "Recon & analysis: Wireshark (tshark), Recon-ng, KQL",
      "Software engineering: microservices, design patterns, test automation"
    ]
  }
];

const experienceCard = [
  {
    content: "Deep Packet Inspection QA Student (Co-op) — Nokia, Ottawa, ON (Jan 2026 – Aug 2026)",
    desc: [
      "Performed maintenance for application signatures (Facebook, YouTube, TikTok) by analyzing network traffic and payloads with Elasticsearch, Logstash, Kibana, and Wireshark, and collaborated with designers to improve application detection.",
      "Wrote test plans and implemented Python regression tests for Defender mitigation system features, including tracked-source dynamic blocking for multiple protocols (TLS, QUIC, ICMP) on IP Network Service Routers (SR), ensuring continuous services in data centers.",
      "Automated extraction of technical logs from the SR DPI system to locate potential memory leaks and failures with Bash.",
    ],
  },
  {
    content: "Software Engineer - Elca Information Technology (2022 - 2024)",
    desc: [
      "Pioneered in implementing architectural refactoring that transformed 70% of code redundancy into reusable code, and helped improve future features development time by 50%.",
      "Successfully designed and built the unified pipeline for automation tests following TDD that reduced unit test writing time by 75% and eliminated most technical critical bugs in later iterations.",
      "Provided core training in design patterns and automation testing techniques and strategies for different teams, shortening the code acceptance phase by 3 days.",
      "Created a comprehensive troubleshooting guide for analyzing test failure, which minimized the number of reopen and test failure tickets by 25% and accelerated system build efficiency."
    ]
  },
  {
    content: "Intern Developer - Elca Information Technology (2021)",
    desc: [
      "Developed an internal tool that helped the company track code quality and gave analytics results 50% faster by integrating it with the company Jira system to synchronize data automatically."
    ]
  },
];

const contacts = [
  { icon: <GitHubIcon />, href: "https://github.com/danghtran", label: "GitHub" },
  { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/hddangtran/", label: "LinkedIn" },
  { icon: <EmailIcon />, href: "mailto:thdang.work@gmail.com", label: "Email" },
];