import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { cardSx } from "./theme";
import {
  SOC_LAB_REPO_URL,
  fetchAllLabWriteups,
  rawUrlForLab,
  resolveWriteupImageSrc,
} from "./socLabs";

function SectionHeading({ title, subtitle }) {
  return (
    <Box textAlign="center" mb={subtitle ? 2 : 3}>
      <Typography variant="h5" color="text.primary">
        {title}
      </Typography>
      <Box
        sx={{
          width: 56,
          height: 4,
          borderRadius: 2,
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

const markdownSx = {
  color: "text.primary",
  lineHeight: 1.7,
  "& h1": { fontSize: "1.5rem", mt: 0, mb: 2 },
  "& h2": { fontSize: "1.2rem", mt: 3, mb: 1.5, color: "primary.dark" },
  "& h3": { fontSize: "1.05rem", mt: 2, mb: 1 },
  "& p": { mb: 1.5 },
  "& ul, & ol": { pl: 3, mb: 1.5 },
  "& li": { mb: 0.5 },
  "& table": {
    width: "100%",
    borderCollapse: "collapse",
    mb: 2,
    fontSize: "0.875rem",
  },
  "& th, & td": {
    border: "1px solid",
    borderColor: "divider",
    p: 1,
    textAlign: "left",
  },
  "& th": { bgcolor: "rgba(13, 148, 136, 0.08)" },
  "& code": {
    bgcolor: "rgba(2, 132, 199, 0.08)",
    px: 0.75,
    py: 0.25,
    borderRadius: 1,
    fontSize: "0.85em",
  },
  "& pre": {
    bgcolor: "#f1f5f9",
    p: 2,
    borderRadius: 2,
    overflow: "auto",
    mb: 2,
  },
  "& pre code": { bgcolor: "transparent", p: 0 },
  "& img": {
    maxWidth: "100%",
    height: "auto",
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
    my: 2,
  },
  "& hr": { my: 3, borderColor: "divider" },
  "& a": { color: "secondary.main", fontWeight: 600 },
  "& blockquote": {
    borderLeft: "4px solid",
    borderColor: "primary.main",
    pl: 2,
    ml: 0,
    color: "text.secondary",
  },
};

function WriteupViewer({ markdown, labPath }) {
  return (
    <Box sx={markdownSx}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <Box
              component="img"
              src={resolveWriteupImageSrc(src, labPath)}
              alt={alt || ""}
              loading="lazy"
            />
          ),
          a: ({ href, children }) => (
            <Box
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </Box>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}

function LabCard({ lab, onReadWriteup }) {
  return (
    <Card
      sx={{
        ...cardSx,
        borderLeft: "4px solid",
        borderLeftColor: "primary.main",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
          {lab.title}
        </Typography>
        <Chip
          label={lab.category}
          size="small"
          sx={{ mb: 1.5, bgcolor: "rgba(13, 148, 136, 0.08)", color: "primary.dark" }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            startIcon={<MenuBookIcon />}
            onClick={() => onReadWriteup(lab)}
          >
            Read write-up
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            href={lab.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon />}
          >
            GitHub
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SocTriageLabs() {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLab, setActiveLab] = useState(null);
  const [writeupMarkdown, setWriteupMarkdown] = useState("");
  const [writeupLoading, setWriteupLoading] = useState(false);
  const [writeupError, setWriteupError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLabs() {
      setLoading(true);
      setError(null);
      try {
        const loaded = await fetchAllLabWriteups();
        if (!cancelled) {
          setLabs(loaded);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load lab write-ups.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLabs();
    return () => {
      cancelled = true;
    };
  }, []);

  const openWriteup = useCallback(async (lab) => {
    setActiveLab(lab);
    setWriteupMarkdown("");
    setWriteupError(null);
    setWriteupLoading(true);

    try {
      const res = await fetch(rawUrlForLab(lab.path));
      if (!res.ok) {
        throw new Error(`Could not load write-up (${res.status})`);
      }
      setWriteupMarkdown(await res.text());
    } catch (err) {
      setWriteupError(err.message || "Failed to load write-up.");
    } finally {
      setWriteupLoading(false);
    }
  }, []);

  const closeWriteup = () => {
    setActiveLab(null);
    setWriteupMarkdown("");
    setWriteupError(null);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <SectionHeading
        title="Blue Team Lab Write-ups"
        subtitle={
          <>
            Write-ups loaded from{" "}
            <Box
              component="a"
              href={SOC_LAB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "secondary.main", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              soc_lab_writeup
            </Box>
          </>
        }
      />

      {loading && (
        <Box display="flex" justifyContent="center" py={6}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" py={4}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Grid2 container spacing={2}>
          {labs.map((lab) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={lab.id}>
              <LabCard lab={lab} onReadWriteup={openWriteup} />
            </Grid2>
          ))}
        </Grid2>
      )}

      <Dialog
        open={Boolean(activeLab)}
        onClose={closeWriteup}
        fullWidth
        maxWidth="lg"
        scroll="paper"
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            pr: 6,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          {activeLab?.title || "Lab write-up"}
          <IconButton
            onClick={closeWriteup}
            sx={{ position: "absolute", right: 8, top: 8 }}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            bgcolor: "#fafcff",
            minHeight: 400,
            maxHeight: "75vh",
          }}
        >
          {writeupLoading && (
            <Box display="flex" justifyContent="center" py={8}>
              <CircularProgress color="primary" />
            </Box>
          )}
          {writeupError && (
            <Typography color="error" textAlign="center" py={4}>
              {writeupError}
            </Typography>
          )}
          {!writeupLoading && !writeupError && writeupMarkdown && activeLab && (
            <WriteupViewer markdown={writeupMarkdown} labPath={activeLab.path} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
