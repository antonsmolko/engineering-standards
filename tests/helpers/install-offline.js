import { execFileSync } from "node:child_process";

const INSTALL_TIMEOUT_MS = 120000;

export const installOffline = (root, packages, { cache } = {}) => {
  try {
    return execFileSync(
      "npm",
      [
        "install",
        "--offline",
        "--ignore-scripts",
        "--no-audit",
        "--no-fund",
        "--package-lock=false",
        ...(cache ? ["--cache", cache] : []),
        ...packages,
      ],
      {
        cwd: root,
        encoding: "utf8",
        timeout: INSTALL_TIMEOUT_MS,
        stdio: "pipe",
      },
    );
  } catch (error) {
    if (/\bENOTCACHED\b/.test(String(error.stderr))) {
      throw Object.assign(
        new Error(
          "Offline consumer cache is incomplete; run npm ci --ignore-scripts in the repository with registry access before running tests.",
        ),
        { code: "OFFLINE_CACHE_MISSING" },
      );
    }
    throw error;
  }
};
