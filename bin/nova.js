#!/usr/bin/env node
import { Command } from "commander";
import open from "open";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
<<<<<<< HEAD
import { readFileSync, createWriteStream, constants as fsConstants } from "node:fs";
=======
import { readFileSync, createWriteStream } from "node:fs";
>>>>>>> 6659c38 (Update Nova CLI)
import { createHash, randomBytes } from "node:crypto";
import { spawn, execFile } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { promisify } from "node:util";
<<<<<<< HEAD
=======
import { fileURLToPath } from "node:url";
>>>>>>> 6659c38 (Update Nova CLI)

const execFileAsync = promisify(execFile);

/* ------------------------------ config ------------------------------ */

const VERSION = (() => {
  try {
    return JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version;
  } catch {
<<<<<<< HEAD
    return "1.0.0";
  }
})();

const UA = `@getnexus/nova/${VERSION}`;
const REPO = "getnexusapp/releases";
const RELEASES = `https://github.com/${REPO}/releases`;
const LATEST_JSON = `${RELEASES}/latest/download/latest.json`; // same feed the in-app updater uses
const RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`;
const CLOUD = (process.env.NEXUS_CLOUD_URL || "https://proxy.nexusworkspace.net").replace(/\/+$/, "");
const WEBSITE = process.env.NEXUS_WEBSITE_URL || "https://github.com/getnexusapp";
const STATUS_PAGE = process.env.NEXUS_STATUS_URL || "https://status.nexusworkspace.net";
const APP_NAME = "Nexus";
const MIN_NODE = 20;
// Where the Nexus desktop app keeps its Nexus Cloud key (Rust `keyring` crate,
// service "com.nexus.desktop", user "nexus_cloud_key" → Windows target "<user>.<service>").
const APP_KEYRING_SERVICE = "com.nexus.desktop";
const APP_KEYRING_USER = "nexus_cloud_key";
const APP_KEYRING_TARGET = `${APP_KEYRING_USER}.${APP_KEYRING_SERVICE}`; // Windows target name
const APP_EXE = "Nexus.exe";
=======
    return "0.0.0";
  }
})();

// Optional developer overrides: load a .env that sits next to package.json (the package
// root, never the current directory, so a stray .env in some project can't redirect Nova).
// Real environment variables always win. The file is not published to npm.
try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(fileURLToPath(new URL("../.env", import.meta.url)));
  }
} catch {

}

const env = (name, fallback) => (process.env[name] || "").trim() || fallback;

const UA = `@getnexus/nova/${VERSION}`;
const REPO = env("NOVA_RELEASES_REPO", "getnexusapp/releases");
const RELEASES = `https://github.com/${REPO}/releases`;
const LATEST_JSON = `${RELEASES}/latest/download/latest.json`; // same feed the in-app updater uses
const RELEASE_API = `https://api.github.com/repos/${REPO}/releases/latest`;
const CLOUD = env("NEXUS_CLOUD_URL", "https://proxy.nexusworkspace.net").replace(/\/+$/, "");
const WEBSITE = env("NEXUS_WEBSITE_URL", "https://www.nexusworkspace.net");
const STATUS_PAGE = env("NEXUS_STATUS_URL", "https://status.nexusworkspace.net");
const APP_NAME = env("NEXUS_APP_NAME", "Nexus");
const APP_EXE = env("NEXUS_APP_EXE", `${APP_NAME}.exe`);
const MIN_NODE = Number(env("NOVA_MIN_NODE", "20"));
const PLATFORM_KEY = env("NOVA_PLATFORM_KEY", "windows-x86_64");

// The session token is sent to CLOUD, so it must always be a secure https endpoint.
if (new URL(CLOUD).protocol !== "https:") {
  console.error("Error: NEXUS_CLOUD_URL must use https.");
  process.exit(1);
}

// Where the Nexus desktop app keeps its Nexus Cloud key (Rust `keyring` crate,
// service "com.nexus.desktop", user "nexus_cloud_key" -> Windows target "<user>.<service>").
const APP_KEYRING_SERVICE = "com.nexus.desktop";
const APP_KEYRING_USER = "nexus_cloud_key";
const APP_KEYRING_TARGET = `${APP_KEYRING_USER}.${APP_KEYRING_SERVICE}`;
>>>>>>> 6659c38 (Update Nova CLI)

const program = new Command();

/* ------------------------------ helpers ----------------------------- */

const sha256 = (s) => createHash("sha256").update(s).digest("hex");
const cleanVersion = (v) => String(v ?? "").trim().replace(/^v/i, "");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
<<<<<<< HEAD
=======
const exists = (p) => fs.access(p).then(() => true, () => false);
>>>>>>> 6659c38 (Update Nova CLI)

function compareVersions(a, b) {
  const parse = (v) => cleanVersion(v).split("-")[0].split(".").map((n) => parseInt(n, 10) || 0);
  const [x, y] = [parse(a), parse(b)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (x[i] ?? 0) - (y[i] ?? 0);
    if (d !== 0) return d > 0 ? 1 : -1;
  }
  return 0;
}

function netError(err) {
  if (err?.name === "TimeoutError" || err?.name === "AbortError") return new Error("The request timed out.");
  const code = err?.cause?.code || err?.code;
  if (code === "ENOTFOUND") return new Error("Could not resolve the server. Check your internet connection.");
  if (code === "ECONNREFUSED" || code === "ECONNRESET") return new Error("The connection was refused or reset.");
  return new Error(err?.cause?.message || err?.message || "Network error.");
}

async function fetchJson(url, { method = "GET", headers = {}, body, timeout = 20_000 } = {}) {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "User-Agent": UA,
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeout),
    });
    const text = await res.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch { }
    return { ok: res.ok, status: res.status, data, text };
  } catch (err) {
    throw netError(err);
  }
}

function assertHttps(url, what = "URL") {
  let u;
  try {
    u = new URL(url);
  } catch {
    throw new Error(`${what} is not valid.`);
  }
  if (u.protocol !== "https:") throw new Error(`${what} must use https.`);
  return u;
}

function assertTrustedDownload(url) {
  const u = assertHttps(url, "Download URL");
  const h = u.hostname.toLowerCase();
  const ok = h === "github.com" || h.endsWith(".github.com") || h.endsWith(".githubusercontent.com");
  if (!ok) throw new Error(`Refusing to download from untrusted host: ${h}`);
}

async function openUrl(url) {
  assertHttps(url);
  try {
    await open(url);
  } catch {
    console.log("Couldn't launch a browser. Open this link manually:");
  }
  console.log(url);
}

const run = (fn) => async (...args) => {
  try {
    await fn(...args);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
};

function fmtDuration(ms) {
  const m = Math.max(0, Math.round(ms / 60000));
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m % 60} min`;
}

/* --------------------------- platform support ----------------------- */

<<<<<<< HEAD
const exists = (p) => fs.access(p).then(() => true, () => false);

function linuxFamily() {
  try {
    const t = readFileSync("/etc/os-release", "utf8").toLowerCase();
    const ids = `${(t.match(/^id=(.*)$/m) || [])[1] || ""} ${(t.match(/^id_like=(.*)$/m) || [])[1] || ""}`;
    if (/debian|ubuntu|mint|pop|elementary|kali/.test(ids)) return "debian";
    if (/rhel|fedora|centos|rocky|alma|suse|opensuse|amzn/.test(ids)) return "rpm";
  } catch {
    /* unknown distro */
  }
  return "other";
}

/** Which build of Nexus this machine needs. */
function detectTarget() {
  if (process.arch !== "x64" && process.arch !== "arm64") {
    throw new Error(`Unsupported CPU architecture: ${process.arch}.`);
  }
  const a = process.arch === "arm64" ? "aarch64" : "x86_64";
  switch (process.platform) {
    case "win32": // Windows on ARM runs the x64 build under emulation
      return { os: "windows", arch: "x64", key: "windows-x86_64", label: "Windows" };
    case "darwin":
      return { os: "macos", arch: process.arch, key: `darwin-${a}`, label: "macOS" };
    case "linux":
      return { os: "linux", arch: process.arch, key: `linux-${a}`, label: "Linux", family: linuxFamily() };
    default:
      throw new Error(`Unsupported operating system: ${process.platform}.`);
  }
}

/* >>> pick */
const ARCH_RE = { x64: /(x64|x86[_-]64|amd64)/i, arm64: /(aarch64|arm64)/i };
const KIND_RE = {
  exe: /setup\.exe$/i,
  dmg: /\.dmg$/i,
  app: /\.app\.tar\.gz$/i,
  deb: /\.deb$/i,
  rpm: /\.rpm$/i,
  appimage: /\.appimage$/i,
};

function kindOrder(target) {
  if (target.os === "windows") return ["exe"];
  if (target.os === "macos") return ["dmg", "app"];
  if (target.family === "debian") return ["deb", "appimage"];
  if (target.family === "rpm") return ["rpm", "appimage"];
  return ["appimage"];
}

function kindFromName(name) {
  return Object.keys(KIND_RE).find((k) => KIND_RE[k].test(name)) || null;
}

/** Picks the best Nexus package for `target` from a release's assets. */
function pickAsset(assets, target, wanted) {
  const order = wanted ? [wanted] : kindOrder(target);
  const mine = ARCH_RE[target.arch];
  const other = ARCH_RE[target.arch === "x64" ? "arm64" : "x64"];
  const usable = assets.filter((a) => /^nexus/i.test(a.name) && !/\.(sig|json|sha256|blockmap|txt|asc)$/i.test(a.name));

  for (const kind of order) {
    const candidates = usable
      .filter((a) => KIND_RE[kind].test(a.name))
      .filter((a) => mine.test(a.name) || /universal/i.test(a.name) || !other.test(a.name))
      .map((a) => ({ a, score: mine.test(a.name) ? 2 : /universal/i.test(a.name) ? 1 : 0 }))
      .sort((x, y) => y.score - x.score);
    if (candidates.length) return { kind, name: candidates[0].a.name, url: candidates[0].a.url, sha256: candidates[0].a.sha256 };
  }
  return null;
}
/* <<< pick */

=======
const OS_NAMES = { darwin: "macOS", linux: "Linux" };

/** Windows 10 reports build < 22000; Windows 11 reports 22000+. */
function windowsInfo() {
  const [major, , build] = os.release().split(".").map((n) => parseInt(n, 10) || 0);
  return { major, build, name: build >= 22000 ? "Windows 11" : "Windows 10" };
}

/** Nexus is only available for Windows 10/11 right now. Throws on anything else. */
function assertSupported() {
  if (process.platform !== "win32") {
    const name = OS_NAMES[process.platform] || process.platform;
    throw new Error(`Nova currently supports Windows 10 and 11 only (this is ${name}). Nexus isn't available for other systems yet.`);
  }
  if (process.arch !== "x64" && process.arch !== "arm64") {
    throw new Error(`Unsupported CPU architecture: ${process.arch}. Nexus needs a 64-bit Windows PC (x64 or ARM64).`);
  }
  const win = windowsInfo();
  if (win.major < 10) throw new Error("Nexus requires Windows 10 or Windows 11.");
  return win;
}

>>>>>>> 6659c38 (Update Nova CLI)
/* ------------------------- release discovery ------------------------ */

const ghHeaders = () => ({
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

function normalizeAssets(list) {
  return (list || []).map((a) => ({
    name: a.name,
    url: a.browser_download_url,
    sha256: typeof a.digest === "string" && a.digest.startsWith("sha256:") ? a.digest.slice(7) : null,
  }));
}

function githubError(r) {
  return new Error(
    r.status === 403 || r.status === 429
<<<<<<< HEAD
      ? "GitHub rate limit reached. Try again later (or set GITHUB_TOKEN)."
=======
      ? "GitHub rate limit reached. Try again later, or set a GITHUB_TOKEN environment variable."
>>>>>>> 6659c38 (Update Nova CLI)
      : `Could not reach the release service (HTTP ${r.status}).`
  );
}

/** Returns { version, notes, publishedAt, platforms, assets? }. */
async function getLatestRelease() {
  // Primary: the same latest.json the app's updater reads (no API rate limits).
  try {
    const r = await fetchJson(LATEST_JSON);
    if (r.ok && r.data?.version) {
      return {
        version: cleanVersion(r.data.version),
        notes: r.data.notes || "",
        publishedAt: r.data.pub_date || null,
        platforms: r.data.platforms || {},
      };
    }
  } catch {
    /* fall through to the API */
  }

  const r = await fetchJson(RELEASE_API, { headers: ghHeaders() });
  if (!r.ok) throw githubError(r);
  return {
    version: cleanVersion(r.data.tag_name),
    notes: r.data.body || "",
    publishedAt: r.data.published_at || null,
    platforms: {},
    assets: normalizeAssets(r.data.assets),
  };
}

async function loadAssets(release) {
  if (release.assets) return release.assets;
  try {
    const r = await fetchJson(`https://api.github.com/repos/${REPO}/releases/tags/v${release.version}`, { headers: ghHeaders() });
    if (r.ok) release.assets = normalizeAssets(r.data.assets);
  } catch {
    /* fall back to latest.json URLs */
  }
  return release.assets || [];
}

<<<<<<< HEAD
async function resolvePackage(release, target, wanted) {
  const valid = kindOrder({ ...target, family: "debian" }).concat(["rpm", "appimage", "dmg", "app", "exe"]);
  if (wanted && !valid.includes(wanted)) throw new Error(`Unknown package type '${wanted}'.`);

  const assets = await loadAssets(release);
  const picked = assets.length ? pickAsset(assets, target, wanted) : null;
  if (picked) return picked;

  // Fallback: the platform URL from latest.json (updater artifact).
  const url = release.platforms?.[target.key]?.url;
  const kind = url ? kindFromName(new URL(url).pathname) : null;
  if (url && kind && (!wanted || wanted === kind)) {
    return { kind, name: path.basename(new URL(url).pathname), url, sha256: null };
  }

  throw new Error(
    `Nexus ${release.version} has no ${target.label} (${target.arch}) package${wanted ? ` of type '${wanted}'` : ""} yet. ` +
    `Check ${RELEASES} for available downloads.`
  );
}

/* ----------------------------- process helpers ---------------------- */

function runInherit(cmd, args) {
  return new Promise((resolve, reject) => {
    const c = spawn(cmd, args, { stdio: "inherit" });
    c.once("error", reject);
    c.once("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}.`))));
  });
}

function runWithInput(cmd, args, input) {
  return new Promise((resolve) => {
    const c = spawn(cmd, args, { stdio: ["pipe", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";
    c.stdout.on("data", (d) => (stdout += d));
    c.stderr.on("data", (d) => (stderr += d));
    c.once("error", (err) => resolve({ code: -1, stdout, stderr: err.message }));
    c.once("exit", (code) => resolve({ code, stdout, stderr }));
    c.stdin.on("error", () => { });
    c.stdin.end(input);
  });
}

async function commandExists(cmd) {
  try {
    if (process.platform === "win32") await execFileAsync("where", [cmd], { windowsHide: true });
    else await execFileAsync("sh", ["-c", 'command -v "$1"', "sh", cmd]);
    return true;
  } catch {
    return false;
  }
=======
const SETUP_RE = /setup\.exe$/i;
const X64_RE = /(x64|x86[_-]64|amd64)/i;
const ARM_RE = /(aarch64|arm64)/i;

/** Picks the Windows installer (x64) from a release's assets. */
function pickInstaller(assets) {
  const candidates = assets
    .filter((a) => /^nexus/i.test(a.name) && SETUP_RE.test(a.name) && !ARM_RE.test(a.name))
    .map((a) => ({ a, score: X64_RE.test(a.name) ? 1 : 0 }))
    .sort((x, y) => y.score - x.score);
  return candidates.length ? candidates[0].a : null;
}

async function resolveInstaller(release) {
  const assets = await loadAssets(release);
  const picked = assets.length ? pickInstaller(assets) : null;
  if (picked) return picked;

  // Fallback: the platform URL from latest.json (updater artifact).
  const url = release.platforms?.[PLATFORM_KEY]?.url;
  if (url && SETUP_RE.test(new URL(url).pathname)) {
    return { name: path.basename(new URL(url).pathname), url, sha256: null };
  }

  throw new Error(`Nexus ${release.version} has no Windows installer yet. Check ${RELEASES} for available downloads.`);
>>>>>>> 6659c38 (Update Nova CLI)
}

/* ------------------------- installed-app detection ------------------ */

<<<<<<< HEAD
const MAC_APP_DIRS = ["/Applications", path.join(os.homedir(), "Applications")];
const LINUX_DATA_DIR = path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), ".local", "share"), "nexus");
const LINUX_MARKER = path.join(LINUX_DATA_DIR, "nova-installed.json");

async function macAppPath() {
  for (const d of MAC_APP_DIRS) {
    const p = path.join(d, `${APP_NAME}.app`);
    if (await exists(p)) return p;
=======
const UNINSTALL = "\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\" + APP_NAME;

/** Installed Nexus version from the Windows uninstall registry, or null. */
async function getInstalledVersion() {
  if (process.platform !== "win32") return null;
  const keys = [`HKCU${UNINSTALL}`, `HKLM${UNINSTALL}`, `HKLM\\Software\\WOW6432Node${UNINSTALL.replace("\\Software", "")}`];
  for (const key of keys) {
    try {
      const { stdout } = await execFileAsync("reg", ["query", key, "/v", "DisplayVersion"], { windowsHide: true });
      const m = stdout.match(/DisplayVersion\s+REG_SZ\s+(\S+)/i);
      if (m) return cleanVersion(m[1]);
    } catch {
      /* try next */
    }
>>>>>>> 6659c38 (Update Nova CLI)
  }
  return null;
}

<<<<<<< HEAD
/** Installed Nexus version, or null if it can't be determined. */
async function getInstalledVersion() {
  if (process.platform === "win32") {
    const base = "\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\" + APP_NAME;
    const keys = [`HKCU${base}`, `HKLM${base}`, `HKLM\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\${APP_NAME}`];
    for (const key of keys) {
      try {
        const { stdout } = await execFileAsync("reg", ["query", key, "/v", "DisplayVersion"], { windowsHide: true });
        const m = stdout.match(/DisplayVersion\s+REG_SZ\s+(\S+)/i);
        if (m) return cleanVersion(m[1]);
      } catch {
        /* try next */
      }
    }
    return null;
  }

  if (process.platform === "darwin") {
    const app = await macAppPath();
    if (!app) return null;
    try {
      const { stdout } = await execFileAsync("/usr/libexec/PlistBuddy", ["-c", "Print :CFBundleShortVersionString", path.join(app, "Contents", "Info.plist")]);
      return cleanVersion(stdout) || null;
    } catch {
      return null;
    }
  }

  // Linux: package databases first, then the marker Nova writes for AppImage installs.
  const queries = [
    ["dpkg-query", ["-W", "-f=${Version}", "nexus"]],
    ["rpm", ["-q", "--qf", "%{VERSION}", "nexus"]],
  ];
  for (const [cmd, args] of queries) {
    try {
      const { stdout } = await execFileAsync(cmd, args);
      if (stdout.trim()) return cleanVersion(stdout.trim().replace(/^\d+:/, ""));
    } catch {
      /* not installed that way */
    }
  }
  try {
    return cleanVersion(JSON.parse(await fs.readFile(LINUX_MARKER, "utf8")).version) || null;
  } catch {
    return null;
  }
}

/** Returns { version, exePath } if the Nexus desktop app is installed, else null. */
async function findInstalledApp() {
  const version = await getInstalledVersion();
  let candidates = [];

  if (process.platform === "win32") {
    const roots = [process.env.LOCALAPPDATA, process.env["ProgramFiles"], process.env["ProgramFiles(x86)"]].filter(Boolean);
    candidates = roots.flatMap((r) => [path.join(r, APP_NAME, APP_EXE), path.join(r, "Programs", APP_NAME, APP_EXE)]);
  } else if (process.platform === "darwin") {
    candidates = MAC_APP_DIRS.map((d) => path.join(d, `${APP_NAME}.app`, "Contents", "MacOS", APP_NAME));
  } else {
    candidates = [
      "/usr/bin/Nexus",
      "/usr/bin/nexus",
      "/opt/Nexus/Nexus",
      path.join(LINUX_DATA_DIR, "Nexus.AppImage"),
      path.join(os.homedir(), ".local", "bin", "nexus"),
    ];
  }
=======
/** Returns { version, exePath } if the Nexus desktop app is installed, else null. */
async function findInstalledApp() {
  if (process.platform !== "win32") return null;
  const version = await getInstalledVersion();
  const roots = [process.env.LOCALAPPDATA, process.env["ProgramFiles"], process.env["ProgramFiles(x86)"]].filter(Boolean);
  const candidates = roots.flatMap((r) => [path.join(r, APP_NAME, APP_EXE), path.join(r, "Programs", APP_NAME, APP_EXE)]);
>>>>>>> 6659c38 (Update Nova CLI)

  let exePath = null;
  for (const c of candidates) {
    if (await exists(c)) {
      exePath = c;
      break;
    }
  }
  return version || exePath ? { version, exePath } : null;
}

async function isAppRunning() {
<<<<<<< HEAD
  try {
    if (process.platform === "win32") {
      const { stdout } = await execFileAsync("tasklist", ["/FI", `IMAGENAME eq ${APP_EXE}`, "/NH"], { windowsHide: true });
      return stdout.toLowerCase().includes(APP_EXE.toLowerCase());
    }
    await execFileAsync("pgrep", ["-ix", APP_NAME]);
    return true; // pgrep exits non-zero when nothing matches
=======
  if (process.platform !== "win32") return false;
  try {
    const { stdout } = await execFileAsync("tasklist", ["/FI", `IMAGENAME eq ${APP_EXE}`, "/NH"], { windowsHide: true });
    return stdout.toLowerCase().includes(APP_EXE.toLowerCase());
>>>>>>> 6659c38 (Update Nova CLI)
  } catch {
    return false;
  }
}

/* ----------------------- Nexus app sign-in hand-off ----------------- */

const CRED_WRITE_PS = `
$ErrorActionPreference = 'Stop'
Add-Type -TypeDefinition @'
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class NovaCred {
  [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Unicode)]
  struct CREDENTIAL {
    public uint Flags; public uint Type; public string TargetName; public string Comment;
    public System.Runtime.InteropServices.ComTypes.FILETIME LastWritten;
    public uint CredentialBlobSize; public IntPtr CredentialBlob; public uint Persist;
    public uint AttributeCount; public IntPtr Attributes; public string TargetAlias; public string UserName;
  }
  [DllImport("advapi32.dll", CharSet = CharSet.Unicode, SetLastError = true)]
  static extern bool CredWrite(ref CREDENTIAL c, uint flags);
  public static void Write(string target, string user, string secret) {
    byte[] b = Encoding.Unicode.GetBytes(secret);
    IntPtr p = Marshal.AllocHGlobal(b.Length);
    try {
      Marshal.Copy(b, 0, p, b.Length);
      CREDENTIAL c = new CREDENTIAL();
      c.Type = 1; c.TargetName = target; c.CredentialBlobSize = (uint)b.Length;
      c.CredentialBlob = p; c.Persist = 2; c.UserName = user;
      if (!CredWrite(ref c, 0)) throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error());
    } finally { Marshal.FreeHGlobal(p); }
  }
}
'@
[NovaCred]::Write($env:NOVA_TARGET, $env:NOVA_USER, $env:NOVA_SECRET)
`;

<<<<<<< HEAD
/** Stores the key where the Nexus app reads it on startup (the OS credential store). */
async function writeAppCredential(key, app) {
  if (process.platform === "win32") {
    const encoded = Buffer.from(CRED_WRITE_PS, "utf16le").toString("base64");
    try {
      await execFileAsync("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded], {
        windowsHide: true,
        timeout: 30_000,
        // The secret goes through the environment, never the command line.
        env: { ...process.env, NOVA_TARGET: APP_KEYRING_TARGET, NOVA_USER: APP_KEYRING_USER, NOVA_SECRET: key },
      });
    } catch (err) {
      const detail = (err.stderr || err.message || "").toString().trim().split("\n")[0];
      throw new Error(`Couldn't write the sign-in to the Nexus app: ${detail}`);
    }
    return;
  }

  if (process.platform === "darwin") {
    // `security -i` reads commands from stdin, so the key never appears in the process list.
    const trust = app?.exePath ? ` -T "${app.exePath}"` : "";
    const r = await runWithInput("security", ["-i"], `add-generic-password -U -s ${APP_KEYRING_SERVICE} -a ${APP_KEYRING_USER}${trust} -w ${key}\n`);
    if (r.code !== 0 || /error|could not|unable/i.test(r.stderr)) {
      throw new Error(`Couldn't write the sign-in to the macOS Keychain: ${r.stderr.trim().split("\n")[0] || "unknown error"}`);
    }
    return;
  }

  // Linux: Secret Service (GNOME Keyring / KWallet) through libsecret's secret-tool.
  if (!(await commandExists("secret-tool"))) {
    throw new Error("`secret-tool` was not found. Install libsecret-tools (Debian/Ubuntu) or libsecret (Fedora) and retry.");
  }
  const r = await runWithInput(
    "secret-tool",
    ["store", "--label=Nexus Cloud key", "service", APP_KEYRING_SERVICE, "username", APP_KEYRING_USER, "application", "rust-keyring"],
    key
  );
  if (r.code !== 0) {
    throw new Error(`Couldn't write the sign-in to the system keyring: ${r.stderr.trim().split("\n")[0] || "is a keyring service running?"}`);
=======
/** Stores the key in Windows Credential Manager, where the Nexus app reads it on startup. */
async function writeAppCredential(key) {
  const encoded = Buffer.from(CRED_WRITE_PS, "utf16le").toString("base64");
  try {
    await execFileAsync("powershell.exe", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded], {
      windowsHide: true,
      timeout: 30_000,
      // The secret goes through the environment, never the command line.
      env: { ...process.env, NOVA_TARGET: APP_KEYRING_TARGET, NOVA_USER: APP_KEYRING_USER, NOVA_SECRET: key },
    });
  } catch (err) {
    const detail = (err.stderr || err.message || "").toString().trim().split("\n")[0];
    throw new Error(`Couldn't write the sign-in to the Nexus app: ${detail}`);
>>>>>>> 6659c38 (Update Nova CLI)
  }
}

async function deleteAppCredential() {
  try {
<<<<<<< HEAD
    if (process.platform === "win32") {
      await execFileAsync("cmdkey", [`/delete:${APP_KEYRING_TARGET}`], { windowsHide: true });
    } else if (process.platform === "darwin") {
      await execFileAsync("security", ["delete-generic-password", "-s", APP_KEYRING_SERVICE, "-a", APP_KEYRING_USER]);
    } else {
      await execFileAsync("secret-tool", ["clear", "service", APP_KEYRING_SERVICE, "username", APP_KEYRING_USER]);
    }
=======
    await execFileAsync("cmdkey", [`/delete:${APP_KEYRING_TARGET}`], { windowsHide: true });
>>>>>>> 6659c38 (Update Nova CLI)
  } catch {
    /* nothing stored */
  }
}

/* ------------------------- download + install ----------------------- */

async function downloadFile(url, dest, expectedSha) {
  assertTrustedDownload(url);
  let res;
  try {
    res = await fetch(url, { headers: { "User-Agent": UA }, signal: AbortSignal.timeout(10 * 60_000) });
  } catch (err) {
    throw netError(err);
  }
  if (!res.ok || !res.body) throw new Error(`Download failed (HTTP ${res.status}).`);
  assertTrustedDownload(res.url || url); // re-check after redirects

  const total = Number(res.headers.get("content-length")) || 0;
  const hash = createHash("sha256");
  let got = 0;
  let lastPct = -1;

  await pipeline(
    Readable.fromWeb(res.body),
    async function* (src) {
      for await (const chunk of src) {
        got += chunk.length;
        hash.update(chunk);
        if (total && process.stdout.isTTY) {
          const pct = Math.floor((got / total) * 100);
          if (pct !== lastPct) {
            lastPct = pct;
            process.stdout.write(`\r  ${pct}%  (${(got / 1048576).toFixed(1)} / ${(total / 1048576).toFixed(1)} MB)`);
          }
        }
        yield chunk;
      }
    },
    createWriteStream(dest)
  );
  if (process.stdout.isTTY && total) process.stdout.write("\n");

  if (total && got !== total) throw new Error("The download was incomplete. Please try again.");
  if (got === 0) throw new Error("The downloaded file was empty.");
<<<<<<< HEAD
  if (expectedSha && hash.digest("hex") !== expectedSha.toLowerCase()) {
    throw new Error("Checksum mismatch: the package does not match the published release.");
  }
}

/* ---- Windows ---- */

=======
  if (expectedSha) {
    if (hash.digest("hex") !== expectedSha.toLowerCase()) {
      throw new Error("Checksum mismatch: the installer does not match the published release.");
    }
    console.log("Checksum verified.");
  } else {
    console.log("Note: no checksum was published for this file, so it couldn't be verified.");
  }
}

>>>>>>> 6659c38 (Update Nova CLI)
function launchInstaller(file, args, wait) {
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { detached: !wait, stdio: "ignore" });
    child.once("error", (err) => {
<<<<<<< HEAD
      // Installer wants elevation (UAC) — let the shell handle it.
=======
      // Installer wants elevation (UAC) - let the shell handle it.
>>>>>>> 6659c38 (Update Nova CLI)
      if (!wait && (err.code === "UNKNOWN" || err.code === "EACCES" || err.errno === 740)) {
        const c = spawn("cmd.exe", ["/c", "start", "", file], { detached: true, stdio: "ignore", windowsHide: true });
        c.once("error", reject);
        c.once("spawn", () => {
          c.unref();
          resolve(null);
        });
      } else {
        reject(err);
      }
    });
    if (wait) {
      child.once("exit", (code) => resolve(code));
    } else {
      child.once("spawn", () => {
        child.unref();
        resolve(null);
      });
    }
  });
}

<<<<<<< HEAD
async function installWindows(file, version, { passive, silent }) {
  const args = silent ? ["/S"] : passive ? ["/P"] : [];
  const wait = silent || passive;
  console.log(wait ? "Running the installer..." : "Download complete. Launching the installer...");
  const code = await launchInstaller(file, args, wait);
  if (wait) {
    if (code !== 0) throw new Error(`The installer exited with code ${code}.`);
    console.log(`Nexus ${version} installed.`);
    return true; // temp file can be removed
  }
  console.log("Installer launched. Follow the Windows prompts to finish.");
  return false; // installer is still using the file
}

/* ---- macOS ---- */

async function installMac(file, kind, version) {
  if (await isAppRunning()) throw new Error("Nexus is running. Quit it and try again.");

  let destDir = null;
  for (const d of MAC_APP_DIRS) {
    if (await exists(path.join(d, `${APP_NAME}.app`))) {
      destDir = d;
      break;
    }
  }
  if (!destDir) {
    destDir = (await fs.access("/Applications", fsConstants.W_OK).then(() => true, () => false)) ? "/Applications" : MAC_APP_DIRS[1];
  }
  await fs.mkdir(destDir, { recursive: true });

  const stage = await fs.mkdtemp(path.join(os.tmpdir(), "nova-"));
  let mount = null;
  const findApp = async (dir) => {
    const hit = (await fs.readdir(dir)).find((n) => n.endsWith(".app"));
    if (!hit) throw new Error("The package didn't contain an .app bundle.");
    return path.join(dir, hit);
  };

  try {
    console.log("Installing...");
    let src;
    if (kind === "dmg") {
      mount = path.join(stage, "mnt");
      await fs.mkdir(mount);
      await execFileAsync("hdiutil", ["attach", "-nobrowse", "-readonly", "-noverify", "-mountpoint", mount, file]);
      src = await findApp(mount);
    } else {
      await execFileAsync("tar", ["-xzf", file, "-C", stage]);
      src = await findApp(stage);
    }
    const dest = path.join(destDir, path.basename(src));
    await fs.rm(dest, { recursive: true, force: true });
    await execFileAsync("ditto", [src, dest]);
    await execFileAsync("xattr", ["-dr", "com.apple.quarantine", dest]).catch(() => { });
    console.log(`Nexus ${version} installed to ${dest}`);
  } finally {
    if (mount) await execFileAsync("hdiutil", ["detach", mount, "-force"]).catch(() => { });
    await fs.rm(stage, { recursive: true, force: true }).catch(() => { });
  }
}

/* ---- Linux ---- */

async function asRoot(cmd, args) {
  if (process.getuid?.() === 0) return runInherit(cmd, args);
  if (!(await commandExists("sudo"))) throw new Error(`Installing a system package needs root. Re-run as root or install sudo.`);
  console.log("Administrator access is needed to install the package (sudo may ask for your password).");
  return runInherit("sudo", [cmd, ...args]);
}

async function installLinux(file, kind, version) {
  if (kind === "deb") {
    if (await commandExists("apt-get")) await asRoot("apt-get", ["install", "-y", file]);
    else await asRoot("dpkg", ["-i", file]);
    console.log(`Nexus ${version} installed.`);
    return;
  }

  if (kind === "rpm") {
    if (await commandExists("dnf")) await asRoot("dnf", ["install", "-y", file]);
    else if (await commandExists("zypper")) await asRoot("zypper", ["--non-interactive", "install", "--allow-unsigned-rpm", file]);
    else await asRoot("rpm", ["-Uvh", file]);
    console.log(`Nexus ${version} installed.`);
    return;
  }

  // AppImage: per-user install, no root needed.
  if (await isAppRunning()) throw new Error("Nexus is running. Quit it and try again.");
  const binDir = path.join(os.homedir(), ".local", "bin");
  const appsDir = path.join(path.dirname(LINUX_DATA_DIR), "applications");
  const image = path.join(LINUX_DATA_DIR, "Nexus.AppImage");
  await fs.mkdir(LINUX_DATA_DIR, { recursive: true });
  await fs.mkdir(binDir, { recursive: true });
  await fs.mkdir(appsDir, { recursive: true });

  await fs.copyFile(file, `${image}.new`);
  await fs.chmod(`${image}.new`, 0o755);
  await fs.rename(`${image}.new`, image);

  const link = path.join(binDir, "nexus");
  await fs.rm(link, { force: true });
  await fs.symlink(image, link);

  await fs.writeFile(
    path.join(appsDir, "nexus.desktop"),
    `[Desktop Entry]\nType=Application\nName=Nexus\nComment=Your Notes. Your Browser. Your AI.\nExec="${image}"\nTerminal=false\nCategories=Utility;\n`
  );
  await fs.writeFile(LINUX_MARKER, JSON.stringify({ version, installedAt: new Date().toISOString() }));

  console.log(`Nexus ${version} installed to ${image}`);
  console.log(`Launch it from your app menu or run \`nexus\` (make sure ${binDir} is on your PATH).`);
  console.log("If it won't start, AppImages need FUSE 2 (e.g. `sudo apt install libfuse2`).");
}

/* ---- dispatcher ---- */

async function installRelease(release, opts = {}) {
  const target = detectTarget();
  if (target.os !== "windows" && (opts.passive || opts.silent)) {
    console.log("Note: --passive/--silent only apply to the Windows installer; ignoring.");
  }

  const pkg = await resolvePackage(release, target, opts.package);
  console.log(`Downloading Nexus ${release.version} for ${target.label} (${pkg.name})...`);
  const dest = path.join(os.tmpdir(), `nexus-${release.version}-${Date.now()}-${path.basename(pkg.name)}`);

  let removeTemp = true;
  try {
    await downloadFile(pkg.url, dest, pkg.sha256);
    if (target.os === "windows") removeTemp = await installWindows(dest, release.version, opts);
    else if (target.os === "macos") await installMac(dest, pkg.kind, release.version);
    else await installLinux(dest, pkg.kind, release.version);
=======
async function installRelease(release, opts = {}) {
  assertSupported();
  const pkg = await resolveInstaller(release);
  console.log(`Downloading Nexus ${release.version} for Windows (${pkg.name})...`);

  if (await isAppRunning()) {
    console.log("Note: Nexus is running. Close it so the installer can replace its files.");
  }

  const dest = path.join(os.tmpdir(), `nexus-${release.version}-${Date.now()}-${path.basename(pkg.name)}`);
  let removeTemp = true;
  try {
    await downloadFile(pkg.url, dest, pkg.sha256);

    const args = opts.silent ? ["/S"] : opts.passive ? ["/P"] : [];
    const wait = Boolean(opts.silent || opts.passive);
    console.log(wait ? "Running the installer..." : "Launching the installer...");
    const code = await launchInstaller(dest, args, wait);
    if (wait) {
      if (code !== 0) throw new Error(`The installer exited with code ${code}.`);
      console.log(`Nexus ${release.version} installed.`);
    } else {
      removeTemp = false; // the installer is still using the file
      console.log("Installer launched. Follow the Windows prompts to finish.");
    }
>>>>>>> 6659c38 (Update Nova CLI)
  } finally {
    if (removeTemp) await fs.rm(dest, { force: true }).catch(() => { });
  }
}

/* ----------------------------- credentials -------------------------- */

function credentialsPath() {
<<<<<<< HEAD
  const base =
    process.platform === "win32"
      ? process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming")
      : process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
=======
  const base = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
>>>>>>> 6659c38 (Update Nova CLI)
  return path.join(base, "nova", "credentials.json");
}

async function loadCredentials() {
  try {
    const c = JSON.parse(await fs.readFile(credentialsPath(), "utf8"));
    return typeof c?.key === "string" && c.key ? c : null;
  } catch {
    return null;
  }
}

async function saveCredentials(creds) {
  const file = credentialsPath();
<<<<<<< HEAD
  await fs.mkdir(path.dirname(file), { recursive: true, mode: 0o700 });
  await fs.writeFile(file, JSON.stringify(creds, null, 2), { mode: 0o600 });
=======
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(creds, null, 2));
>>>>>>> 6659c38 (Update Nova CLI)
}

async function clearCredentials() {
  await fs.rm(credentialsPath(), { force: true }).catch(() => { });
}

async function requireLogin() {
  const creds = await loadCredentials();
  if (!creds) throw new Error("You're not signed in. Run `nova login` first.");
  return creds;
}

<<<<<<< HEAD
function authHeader(creds) {
  return { Authorization: `Bearer ${creds.key}` };
}
=======
const authHeader = (creds) => ({ Authorization: `Bearer ${creds.key}` });
>>>>>>> 6659c38 (Update Nova CLI)

function apiError(r, fallback) {
  if (r.status === 401) return new Error("Your session is no longer valid. Run `nova login` again.");
  return new Error(r.data?.error || `${fallback} (HTTP ${r.status})`);
}

/* ------------------------------- login ------------------------------ */

// Matches the code the Nexus server shows on its confirmation page.
const confirmCode = (state) => {
  const hex = sha256(state).slice(0, 8).toUpperCase();
  return `${hex.slice(0, 4)}-${hex.slice(4)}`;
};

async function doLogin(provider, { browser }) {
  if (!["google", "github"].includes(provider)) throw new Error("Provider must be 'google' or 'github'.");
<<<<<<< HEAD
=======
  assertSupported();
>>>>>>> 6659c38 (Update Nova CLI)

  // Sign-in is only offered once the Nexus desktop app is on this computer.
  const app = await findInstalledApp();
  if (!app) {
    throw new Error("Nexus isn't installed on this computer. Run `nova install` first, then `nova login`.");
  }
  console.log(`Found Nexus${app.version ? ` ${app.version}` : ""}.`);

  const verifier = randomBytes(32).toString("hex");
  const start = await fetchJson(`${CLOUD}/auth/oauth/start`, {
    method: "POST",
    body: { provider, challenge: sha256(verifier) },
  });
  if (!start.ok) throw new Error(start.data?.error || `Couldn't start sign-in (HTTP ${start.status}).`);

  const { state, url } = start.data || {};
  if (!state || !url) throw new Error("The server didn't return a sign-in session.");
  assertHttps(url, "Sign-in URL");

  console.log(`Signing in with ${provider === "google" ? "Google" : "GitHub"}.`);
  console.log(`\n  Confirmation code:  ${confirmCode(state)}\n`);
  console.log("After you authorize, the browser asks you to confirm. Only continue if it shows this same code.");
  if (browser) await openUrl(url);
  else console.log(`Open this link:\n${url}`);
  console.log("\nWaiting for sign-in (Ctrl+C to cancel)...");

  const deadline = Date.now() + 10 * 60_000;
  let failures = 0;
  while (Date.now() < deadline) {
    await sleep(3000);
    let r;
    try {
      r = await fetchJson(`${CLOUD}/auth/oauth/poll`, { method: "POST", body: { state, verifier } });
      failures = 0;
    } catch (err) {
      if (++failures >= 5) throw err;
      continue;
    }
    if (r.status === 429) continue;
    if (!r.ok) throw new Error(r.data?.error || `Sign-in failed (HTTP ${r.status}).`);
    if (r.data?.key) {
      const creds = { key: r.data.key, savedAt: new Date().toISOString() };
      const me = await fetchJson(`${CLOUD}/auth/me`, { headers: authHeader(creds) }).catch(() => null);
      if (me?.ok && me.data?.email) creds.email = me.data.email;
      await saveCredentials(creds);
      console.log(`Signed in${creds.email ? ` as ${creds.email}` : ""}.`);

      // Hand the same session to the Nexus app so it's signed in too.
      try {
<<<<<<< HEAD
        await writeAppCredential(creds.key, app);
        creds.sharedWithApp = true;
        await saveCredentials(creds);
        console.log("The Nexus app is signed in too.");
        if (await isAppRunning()) console.log("Nexus is currently running — restart it to pick up the new sign-in.");
=======
        await writeAppCredential(creds.key);
        creds.sharedWithApp = true;
        await saveCredentials(creds);
        console.log("The Nexus app is signed in too.");
        if (await isAppRunning()) console.log("Nexus is currently running. Restart it to pick up the new sign-in.");
>>>>>>> 6659c38 (Update Nova CLI)
      } catch (err) {
        console.error(`Warning: ${err.message}`);
        console.error("Nova is signed in, but you'll need to sign in inside the Nexus app yourself.");
        process.exitCode = 1;
      }
      return;
    }
  }
  throw new Error("Sign-in timed out. Please try again.");
}

/* ------------------------------ commands ---------------------------- */

<<<<<<< HEAD
program.name("nova").description("Nexus App CLI").version(VERSION, "-v, --version", "Show CLI version");
=======
program.name("nova").description("Official CLI companion for Nexus App").version(VERSION, "-v, --version", "Show CLI version");
>>>>>>> 6659c38 (Update Nova CLI)

program.addHelpText(
  "after",
  `
Examples:
<<<<<<< HEAD
  nova install            Install the latest Nexus (Windows, macOS or Linux)
  nova update             Install the latest release only if it's newer
  nova check              Show installed vs. latest version
  nova login              Sign in or sign up (Google/GitHub) — requires Nexus installed
=======
  nova install            Install the latest Nexus for Windows
  nova update             Install the latest release only if it's newer
  nova check              Show installed vs. latest version
  nova login              Sign in or sign up (Google/GitHub); requires Nexus installed
>>>>>>> 6659c38 (Update Nova CLI)
  nova whoami             Show the signed-in account
  nova usage              Show your Nexus Cloud AI usage
  nova logout             Sign out of Nova and the Nexus app
  nova status             Check Nexus Cloud health
  nova website            Open the Nexus website
<<<<<<< HEAD
  nova releases           Open all Nexus releases
  nova doctor             Diagnose your setup
  nova version            Show CLI version
=======
  nova releases           Open the Nexus releases page
  nova doctor             Diagnose your setup
  nova version            Show CLI version

Nexus is currently available for Windows 10 and 11 only.
>>>>>>> 6659c38 (Update Nova CLI)
`
);

program
  .command("install")
<<<<<<< HEAD
  .description("Download and install the latest Nexus for your operating system")
  .option("--package <type>", "package type: exe | dmg | app | deb | rpm | appimage")
  .option("--passive", "Windows: show installer progress but require no interaction")
  .option("--silent", "Windows: install with no UI at all")
  .action(
    run(async (opts) => {
=======
  .description("Download and install the latest Nexus for Windows")
  .option("--passive", "show installer progress but require no interaction")
  .option("--silent", "install with no UI at all")
  .action(
    run(async (opts) => {
      assertSupported();
>>>>>>> 6659c38 (Update Nova CLI)
      console.log("Checking the latest Nexus release...");
      const release = await getLatestRelease();
      await installRelease(release, opts);
    })
  );

program
  .command("update")
  .description("Update Nexus if a newer release is available")
  .option("-f, --force", "reinstall even if already up to date")
<<<<<<< HEAD
  .option("--package <type>", "package type: exe | dmg | app | deb | rpm | appimage")
  .option("--passive", "Windows: show installer progress but require no interaction")
  .option("--silent", "Windows: install with no UI at all")
  .action(
    run(async (opts) => {
=======
  .option("--passive", "show installer progress but require no interaction")
  .option("--silent", "install with no UI at all")
  .action(
    run(async (opts) => {
      assertSupported();
>>>>>>> 6659c38 (Update Nova CLI)
      console.log("Checking the latest Nexus release...");
      const [release, installed] = await Promise.all([getLatestRelease(), getInstalledVersion()]);
      if (installed && compareVersions(installed, release.version) >= 0 && !opts.force) {
        console.log(`Nexus is up to date (${installed}).`);
        return;
      }
      console.log(
<<<<<<< HEAD
        installed ? `Update available: ${installed} → ${release.version}` : `Installing Nexus ${release.version} (installed version unknown).`
=======
        installed ? `Update available: ${installed} -> ${release.version}` : `Installing Nexus ${release.version} (installed version unknown).`
>>>>>>> 6659c38 (Update Nova CLI)
      );
      await installRelease(release, opts);
    })
  );

program
  .command("check")
  .description("Show installed and latest Nexus versions")
  .action(
    run(async () => {
      const [release, installed] = await Promise.all([getLatestRelease(), getInstalledVersion()]);
      console.log(`Latest release:    ${release.version}`);
      if (release.publishedAt) console.log(`Published:         ${new Date(release.publishedAt).toLocaleString()}`);
      console.log(`Installed version: ${installed ?? "not detected"}`);
      if (installed) {
<<<<<<< HEAD
        console.log(
          compareVersions(installed, release.version) < 0
            ? "An update is available. Run `nova update`."
            : "You're up to date."
        );
=======
        console.log(compareVersions(installed, release.version) < 0 ? "An update is available. Run `nova update`." : "You're up to date.");
      } else if (process.platform === "win32") {
        console.log("Nexus doesn't appear to be installed. Run `nova install`.");
>>>>>>> 6659c38 (Update Nova CLI)
      }
      console.log(RELEASES);
    })
  );

program
  .command("login")
  .description("Sign in (or sign up) from the terminal; also signs in the installed Nexus app")
  .option("-p, --provider <provider>", "google or github", "google")
  .option("--no-browser", "print the sign-in link instead of opening a browser")
  .action(run((opts) => doLogin(opts.provider.toLowerCase(), opts)));

program
  .command("logout")
  .description("Sign out and revoke this CLI's session")
  .action(
    run(async () => {
      const creds = await loadCredentials();
      if (!creds) {
        console.log("You're already signed out.");
        return;
      }
      await fetchJson(`${CLOUD}/auth/logout`, { method: "POST", headers: authHeader(creds) }).catch(() => { });
      await clearCredentials();
<<<<<<< HEAD
      // The app shares this session, which is now revoked — remove its copy too.
=======
      // The app shares this session, which is now revoked, so remove its copy too.
>>>>>>> 6659c38 (Update Nova CLI)
      if (creds.sharedWithApp) await deleteAppCredential();
      console.log(creds.sharedWithApp ? "Signed out of Nova and the Nexus app." : "Signed out.");
    })
  );

program
  .command("whoami")
  .description("Show the signed-in Nexus account")
  .action(
    run(async () => {
      const creds = await requireLogin();
      const r = await fetchJson(`${CLOUD}/auth/me`, { headers: authHeader(creds) });
      if (!r.ok) {
        if (r.status === 401) await clearCredentials();
        throw apiError(r, "Couldn't fetch account info");
      }
      console.log(r.data.email);
      if (r.data.createdAt) console.log(`Member since ${new Date(r.data.createdAt).toLocaleDateString()}`);
    })
  );

program
  .command("usage")
  .description("Show your Nexus Cloud AI usage")
  .action(
    run(async () => {
      const creds = await requireLogin();
      const r = await fetchJson(`${CLOUD}/api/usage`, { headers: authHeader(creds) });
      if (!r.ok) {
        if (r.status === 401) await clearCredentials();
        throw apiError(r, "Couldn't fetch usage");
      }
      const d = r.data;
      const n = (x) => Number(x ?? 0).toLocaleString();
      console.log(`5-hour window: ${n(d.usedInWindow)} / ${n(d.windowLimit)} tokens`);
      if (d.resetAt) console.log(`  resets in ${fmtDuration(new Date(d.resetAt).getTime() - Date.now())}`);
      console.log(`Today:         ${n(d.usedToday)} / ${n(d.dailyLimit)} tokens`);
      if (d.mode && d.mode !== "normal") console.log(`Service mode:  ${d.mode} (limits are reduced)`);
    })
  );

program
  .command("website")
  .alias("web")
  .description("Open the Nexus website")
  .action(run(() => openUrl(WEBSITE)));

program
  .command("status")
  .description("Check Nexus Cloud health")
  .option("-o, --open", "also open the status page in your browser")
  .action(
    run(async (opts) => {
      const t0 = Date.now();
      let healthy = false;
      try {
        const r = await fetchJson(`${CLOUD}/health`, { timeout: 10_000 });
        healthy = r.ok && r.data?.ok === true;
<<<<<<< HEAD
        console.log(
          healthy ? `Nexus Cloud: operational (${Date.now() - t0} ms)` : `Nexus Cloud: degraded (HTTP ${r.status})`
        );
=======
        console.log(healthy ? `Nexus Cloud: operational (${Date.now() - t0} ms)` : `Nexus Cloud: degraded (HTTP ${r.status})`);
>>>>>>> 6659c38 (Update Nova CLI)
      } catch (err) {
        console.log(`Nexus Cloud: unreachable (${err.message})`);
      }
      if (opts.open) await openUrl(STATUS_PAGE);
      if (!healthy) process.exitCode = 1;
    })
  );

program
  .command("releases")
  .description("Open Nexus downloads and release notes")
  .action(run(() => openUrl(RELEASES)));

program
  .command("version")
  .description("Show CLI version")
  .action(() => console.log(VERSION));

program
  .command("doctor")
  .description("Check whether your setup is ready")
  .action(
    run(async () => {
      let bad = 0;
      const line = (ok, label, detail = "") => {
        if (!ok) bad++;
        console.log(`${ok ? "✓" : "✗"} ${label}${detail ? `: ${detail}` : ""}`);
      };

      const major = parseInt(process.versions.node.split(".")[0], 10);
      line(major >= MIN_NODE, "Node.js", `${process.version} (need >= ${MIN_NODE})`);
<<<<<<< HEAD
      try {
        const t = detectTarget();
        line(true, "Platform", `${t.label} ${process.arch}${t.family ? ` (${t.family})` : ""}`);
=======

      try {
        const win = assertSupported();
        line(true, "Platform", `${win.name} (${os.release()}), ${process.arch}${process.arch === "arm64" ? ", runs the x64 build under emulation" : ""}`);
>>>>>>> 6659c38 (Update Nova CLI)
      } catch (err) {
        line(false, "Platform", err.message);
      }

      try {
        const r = await getLatestRelease();
        line(true, "Release feed", `latest is ${r.version}`);
      } catch (err) {
        line(false, "Release feed", err.message);
      }

      try {
        const t0 = Date.now();
        const r = await fetchJson(`${CLOUD}/health`, { timeout: 10_000 });
        line(r.ok && r.data?.ok === true, "Nexus Cloud", r.ok ? `${Date.now() - t0} ms` : `HTTP ${r.status}`);
      } catch (err) {
        line(false, "Nexus Cloud", err.message);
      }

      const app = await findInstalledApp().catch(() => null);
<<<<<<< HEAD
      line(Boolean(app), "Nexus installed", app ? app.version ?? app.exePath : "not detected");

      const creds = await loadCredentials();
      console.log(`${creds ? "✓" : "–"} Signed in: ${creds ? creds.email || "yes" : "no (optional — run `nova login`)"}`);
=======
      line(Boolean(app), "Nexus installed", app ? app.version ?? app.exePath : "not detected (run `nova install`)");

      const creds = await loadCredentials();
      console.log(`${creds ? "✓" : "–"} Signed in: ${creds ? creds.email || "yes" : "no (optional, run `nova login`)"}`);
      if (creds) console.log(`${creds.sharedWithApp ? "✓" : "–"} Shared with Nexus app: ${creds.sharedWithApp ? "yes" : "no (sign in inside the app)"}`);
>>>>>>> 6659c38 (Update Nova CLI)

      if (bad) process.exitCode = 1;
    })
  );

program.parseAsync(process.argv).catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
