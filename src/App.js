import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, Button, Box, Fade, Grid2, IconButton, Collapse, CardMedia } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
    <Box sx={{ minHeight: "100vh", bgcolor: "#0f0f0f", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Fade in={showContent} timeout={600}>
          <Box textAlign="center" mb={5}>
            <Typography variant="h3" fontWeight={700} gutterBottom>
              Hi, I'm Dang Tran
            </Typography>
            <Typography variant="h6" color="grey.500">
               A motivated and curious professional who enjoys solving problems and learning new skills.
            </Typography>
            <Typography variant="h6" color="grey.500">
              I value teamwork and clear communication, but I’m also comfortable working independently.
            </Typography>
          </Box>
        </Fade>

        <Grid2 container spacing={3} columns={12}>
          {infoCards.map((card, idx) => (
            <Grid2 size={{ xs: 4, sm: 4 }} key={idx}>
              <Fade in={showContent} timeout={500 + idx * 200}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight={600}  color="white">
                      {card.title}
                    </Typography>
                    {card.title === "Education" ? (
                      <Box sx={{ color: "#9ca3af" }}>
                        {card.content.map((item, i) => {
                          const [degree, details] = item.split(", ");
                          return (
                            <Box key={i} mb={2}>
                              <Typography variant="subtitle1" fontWeight={600}>{degree}</Typography>
                              <Typography variant="body2">{details}</Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : Array.isArray(card.content) ? (
                      <ul style={{ color: "#9ca3af", paddingLeft: "1rem" }}>
                        {card.content.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <Typography color="grey.500" textAlign={"justify"}>{card.content}</Typography>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid2>
          ))}
        </Grid2>

        <Fade in={showContent} timeout={800}>
          <Box mb={5} mt={5}>
            <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
              Experience
            </Typography>
            <Grid2 container spacing={3} columns={12} mt={2}>
              {experienceCard?.map((exp, i) => (
                <>
                <Grid2 size={3}></Grid2>
                  <Grid2 size={6} key={i}>
                    <Card sx={{ bgcolor: "#1f2937" }}>
                      <CardContent>
                        <Box display="flex" justifyContent="space-between" alignItems="center" onClick={() => toggleExpand(i)} sx={{ cursor: "pointer" }}>
                          <Typography variant="body1" color="grey.300">
                            {exp.content}
                          </Typography>
                          <IconButton size="small" sx={{ color: "white" }}>
                            {expandedExp[i] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        </Box>
                        <Collapse in={expandedExp[i]} timeout="auto" unmountOnExit>
                          <Typography variant="body2" color="grey.300" mt={2}>
                            <ul style={{ color: "#9ca3af", paddingLeft: "1rem" }}>
                              {exp.desc.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </Typography>
                        </Collapse>
                      </CardContent>
                    </Card>
                  </Grid2>
                  <Grid2 size={3}></Grid2>
                </>
              ))}
            </Grid2>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={900}>
          <Box textAlign="center" mb={5} mt={5}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              Contact Me
            </Typography>
            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap" mt={2}>
              {contacts.map((contact, idx) => (
                <IconButton
                  key={idx}
                  href={contact.href}
                  target="_blank" rel="noopener noreferrer"
                  sx={{ color: "white", border: "1px solid #9ca3af" }}
                >
                  {contact.icon}
                </IconButton>
              ))}
            </Box>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={1000}>
          <Box textAlign="center" mb={5} mt={5}>
            <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
              Certificates
            </Typography>
            <Grid2 container spacing={5} columns={21} mt={2}>
              <Grid2 size={{ xs: 7, sm: 7 }}>
                <Card sx={{ bgcolor: "#bcd2f2ff" }}>
                  <CardContent sx={{ textAlign: "center", paddingTop: 3 }}>
                    <div data-iframe-width="270" data-iframe-height="240" data-share-badge-id="7194b350-1f50-4a30-9055-09fba5d67a1a" data-share-badge-host="https://www.credly.com"></div>
                    <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 7, sm: 7 }}>
                <Card sx={{ bgcolor: "#bcd2f2ff" }}>
                  <CardContent sx={{ textAlign: "center", paddingTop: 3 }}>
                    <div data-iframe-width="270" data-iframe-height="240" data-share-badge-id="9e47e9f7-11f0-4e84-a87b-70317971ab93" data-share-badge-host="https://www.credly.com"></div>
                    <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 7, sm: 7 }}>
                <Card sx={{ bgcolor: "#bcd2f2ff" }}>
                  <CardContent sx={{ textAlign: "center", paddingTop: 3 }}>
                    <div data-iframe-width="270" data-iframe-height="240" data-share-badge-id="5694b335-ecfa-44f4-8dee-ec7c7bb835fa" data-share-badge-host="https://www.credly.com"></div>
                    <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        </Fade>

        <Fade in={showContent} timeout={1000}>
          <Box>
            <Typography variant="h5" fontWeight={600} textAlign="center" gutterBottom>
              Projects
            </Typography>
            <Grid2 container spacing={3} columns={16} mt={2}>
              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      Shoulder Surfing Detection Application
                    </Typography>
                    
                    <Typography color="grey.500" paddingTop={2}>
                      A desktop application to detect intentional shoulder surfer and hide/ blur sensitive data using GazeML.
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }}>
                      Ongoing
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      Vulnerability Scanning Tool
                    </Typography>
                    
                    <Typography color="grey.500" paddingTop={2}>
                      A lightweight tool to scan vulnerabilities in open ports, protocols, and web headers of a host using Python.
                    </Typography>
                    <Button href="https://github.com/danghtran/Vul_Scanner" variant="outlined" target="_blank" rel="noopener noreferrer"
                      sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }}>
                      Source & Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      Little Boy Game
                    </Typography>
                    <CardMedia
                      component="img"
                      image={`${process.env.PUBLIC_URL}/cross_road.png`}
                      sx={{ width: "100%", height: "75%", objectFit: "cover"}}
                    />
                    <Typography color="grey.500" paddingTop={2}>
                      A desktop game based on the classic game Cross The Road, developed using C++ and SDL2 library. The game is under develop and in early stages.
                    </Typography>
                    <Button href="https://github.com/danghtran/LittleBoy" variant="outlined" target="_blank" rel="noopener noreferrer"
                      sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }}>
                      Source
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      3D Driving Game
                    </Typography>
                    <CardMedia
                      component="img"
                      image={`${process.env.PUBLIC_URL}/webgl_car.png`}
                      sx={{ width: "100%", height: "50%", objectFit: "cover"}}
                    />
                    <Typography color="grey.500" paddingTop={2}>
                      This car-driving game is written in ReactJS with WebGL2, where you collect fuel and coins while avoiding obstacles in a 3D environment. It uses physical-based rendering, texture loading, GPU instancing, prototype pattern, AABB collision detection, and Phong shading for lighting.
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }} onClick={() => setOpenGame(true)}>
                      Play
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      Benchmark Merkle Tree model for cloud-based verifiable database
                    </Typography>
                    <CardMedia
                      component="img"
                      image={`${process.env.PUBLIC_URL}/merkle_benchmark.png`}
                      sx={{ width: "100%", height: "50%", objectFit: "cover"}}
                    />
                    <Typography color="grey.500" paddingTop={2}>
                      Explored and utilized Google Cloud Dataflow and Function to create a verifiable database with different Merkle Tree setup to improve data integrity while maintaining stable performance (average of 5 seconds per million data records)
                    </Typography>
                    <Button variant="outlined" sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }} onClick={() => setOpenPrj1(true)}>
                      View
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>

              <Grid2 size={{ xs: 8, sm: 8 }}>
                <Card sx={{ bgcolor: "#1f2937" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom color="white">
                      Simplified Bitcoin Self-hosted Wallet for Android
                    </Typography>
                    <Typography color="grey.500">
                      A Bitcoin wallet application for Android using the Simplified Verification Model to create and verify transactions using mobile devices without third-party intervention. The application supports hierarchical deterministic wallet mobiles and supports multiple accounts
                    </Typography>
                    <Button href="https://github.com/danghtran/CoinWallet" variant="outlined" target="_blank" rel="noopener noreferrer"
                      sx={{ mt: 2, color: "white", borderColor: "#9ca3af" }}>
                      Source
                    </Button>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        </Fade>
        <Dialog open={openGame} onClose={() => setOpenGame(false)} fullWidth maxWidth="md">
          <DialogTitle>
            Game Preview
            <IconButton
              onClick={() => setOpenGame(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <iframe
              src="https://danghtran.github.io/webgl2-car-driving-game/"  // replace with your actual game link
              width="100%"
              height="600"
              style={{ border: "none" }}
              title="Game Preview"
              allowFullScreen
            ></iframe>
          </DialogContent>
        </Dialog>

        <Dialog open={openPrj1} onClose={() => setOpenPrj1(false)} fullWidth maxWidth="md">
          <DialogTitle>
            Benchmark Merkle Tree on cloud environments
            <IconButton
              onClick={() => setOpenPrj1(false)}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <iframe
              src={`${process.env.PUBLIC_URL}/Benchmark_Merkle_Tree_on_cloud_environments.pdf`}  // place your PDF in the public folder
              width="100%"
              height="600"
              style={{ border: "none" }}
              title="Project report"
            ></iframe>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}

const infoCards = [
  {
    title: "About Me",
    content:
      "I’m pursuing a Master’s in Computer Science and previously worked two years as a Software Engineer at Elca, gaining strong technical and professional experience. Over time, I developed a passion for cybersecurity, earning my CompTIA Security+ certification and practicing on platforms like TryHackMe. Now I’m motivated to bring my technical background, security mindset, energy, and drive for innovation to make real impacts."
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
      "Java, Spring Boot, Hibernate",
      "ReactJS, Node.js, TypeScript",
      "WebGL2, OpenGL",
      "NMap, Recon-ng, tshark",
      "Distributed Systems, Microservices",
      "Design Pattern, MVC, MVVM"
    ]
  }
];

const experienceCard = [
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
  { icon: <GitHubIcon />, href: "https://github.com/danghtran" },
  { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/hddangtran/" },
  { icon: <EmailIcon />, href: "mailto:thdang.work@gmail.com" }
];