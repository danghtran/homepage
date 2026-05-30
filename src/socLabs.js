export const SOC_LAB_REPO = "danghtran/soc_lab_writeup";
export const SOC_LAB_RAW_BASE = `https://raw.githubusercontent.com/${SOC_LAB_REPO}/main`;
export const SOC_LAB_TREE_API = `https://api.github.com/repos/${SOC_LAB_REPO}/git/trees/main?recursive=1`;
export const SOC_LAB_REPO_URL = `https://github.com/${SOC_LAB_REPO}`;

/** Top-level paths that are not lab write-up folders. */
const EXCLUDED_TOP_LEVEL = new Set(["images"]);

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

function formatCategory(folder) {
  return folder
    .replace(/_labs$/i, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isLabWriteupPath(path) {
  if (!path.endsWith(".md")) return false;
  if (!path.includes("/")) return false;
  if (path.toLowerCase().includes("template")) return false;

  const topLevel = path.split("/")[0];
  return !EXCLUDED_TOP_LEVEL.has(topLevel);
}

function labFromPath(path, title) {
  const parts = path.split("/");
  const folder = parts[0];
  const fileName = parts[parts.length - 1];

  return {
    id: path,
    path,
    fileName,
    title: title || formatLabTitle(fileName),
    category: formatCategory(folder),
    githubUrl: githubBlobUrl(path),
  };
}

async function fetchTitleFromWriteup(path) {
  try {
    const res = await fetch(rawUrlForLab(path));
    if (!res.ok) return null;
    const text = await res.text();
    const match = text.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  } catch {
    return null;
  }
}

/**
 * Discover all lab write-ups from the repo tree (no hardcoded folder list).
 * Any .md under a subfolder is included, except templates and images/.
 */
export async function fetchAllLabWriteups() {
  const res = await fetch(SOC_LAB_TREE_API);
  if (!res.ok) {
    throw new Error(`Could not load labs (${res.status})`);
  }

  const { tree } = await res.json();
  const paths = tree
    .filter((item) => item.type === "blob" && isLabWriteupPath(item.path))
    .map((item) => item.path);

  const labs = await Promise.all(
    paths.map(async (path) => {
      const title = await fetchTitleFromWriteup(path);
      return labFromPath(path, title);
    })
  );

  return labs.sort(
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
