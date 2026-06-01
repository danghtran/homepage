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

function getLabDir(labPath) {
  const idx = labPath.lastIndexOf("/");
  return idx === -1 ? "" : labPath.slice(0, idx);
}

/** Resolve a relative path against a base directory within the repo. */
function resolveRelativePath(baseDir, relativePath) {
  const stack = baseDir ? baseDir.split("/") : [];
  const parts = relativePath.replace(/\\/g, "/").split("/");

  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      if (stack.length) stack.pop();
    } else {
      stack.push(part);
    }
  }

  return stack.join("/");
}

function toRawGitHubUrl(repoPath) {
  const encoded = repoPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${SOC_LAB_RAW_BASE}/${encoded}`;
}

/**
 * Rewrite relative image paths from writeup markdown to raw GitHub URLs.
 * Supports ../images/, images/ (repo root), ./local, and nested paths.
 */
export function resolveWriteupImageSrc(src, labPath) {
  if (!src) return src;

  const trimmed = src.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  let path = decodeURIComponent(trimmed);
  const labDir = getLabDir(labPath);

  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  if (path.startsWith("../") || path.startsWith("./")) {
    return toRawGitHubUrl(resolveRelativePath(labDir, path));
  }

  // New write-ups often use images/foo.png (repo-root images/) instead of ../images/
  if (path.startsWith("images/")) {
    return toRawGitHubUrl(path);
  }

  if (labDir) {
    return toRawGitHubUrl(`${labDir}/${path}`);
  }

  return toRawGitHubUrl(path);
}
