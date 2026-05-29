export const SOC_LAB_REPO = "danghtran/soc_lab_writeup";
export const SOC_LAB_RAW_BASE = `https://raw.githubusercontent.com/${SOC_LAB_REPO}/main`;
export const SOC_LAB_TREE_API = `https://api.github.com/repos/${SOC_LAB_REPO}/git/trees/main?recursive=1`;
export const SOC_LAB_REPO_URL = `https://github.com/${SOC_LAB_REPO}`;

const LAB_FOLDERS = new Set([
  "soc_triage_labs",
  "digital_forensic_labs",
  "threat_intelligence_labs",
]);

const CATEGORY_LABELS = {
  soc_triage_labs: "SOC triage",
  digital_forensic_labs: "Digital forensics",
  threat_intelligence_labs: "Threat intelligence",
};

export function rawUrlForLab(path) {
  return `${SOC_LAB_RAW_BASE}/${path}`;
}

export function githubBlobUrl(path) {
  return `https://github.com/${SOC_LAB_REPO}/blob/main/${path}`;
}

function formatLabTitle(fileName) {
  return fileName
    .replace(/\.md$/, "")
    .replace(/^(thm|cyberrange|btlo)-/i, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function labFromPath(path) {
  const parts = path.split("/");
  const folder = parts[0];
  const fileName = parts[parts.length - 1];

  return {
    id: path,
    path,
    fileName,
    title: formatLabTitle(fileName),
    category: CATEGORY_LABELS[folder] || folder,
    githubUrl: githubBlobUrl(path),
  };
}

/** List every lab write-up markdown under lab folders (excludes templates and root docs). */
export async function fetchAllLabWriteups() {
  const res = await fetch(SOC_LAB_TREE_API);
  if (!res.ok) {
    throw new Error(`Could not load labs (${res.status})`);
  }

  const { tree } = await res.json();

  return tree
    .filter(
      (item) =>
        item.type === "blob" &&
        item.path.endsWith(".md") &&
        LAB_FOLDERS.has(item.path.split("/")[0]) &&
        !item.path.toLowerCase().includes("template")
    )
    .map((item) => labFromPath(item.path))
    .sort(
      (a, b) =>
        a.category.localeCompare(b.category) || a.title.localeCompare(b.title)
    );
}

/** Rewrite relative image paths from writeup markdown to raw GitHub URLs. */
export function resolveWriteupImageSrc(src, labPath) {
  if (!src || src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }
  if (src.startsWith("../images/")) {
    return `${SOC_LAB_RAW_BASE}/images/${src.slice("../images/".length)}`;
  }
  if (src.startsWith("./")) {
    const folder = labPath.includes("/") ? labPath.replace(/\/[^/]+$/, "") : "";
    return `${SOC_LAB_RAW_BASE}/${folder}/${src.slice(2)}`;
  }
  return src;
}
