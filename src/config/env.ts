/**
 * Konfigurasi Terpusat Environment Variables untuk YukPlanning Landing Page.
 * Seluruh endpoint API dan URL dashboard bersumber dari modul ini (membaca dari Vite env).
 */

export const API_BASE_URL: string = (
  import.meta.env.VITE_API_BASE_URL || 'https://api.yukplanning.tech/api/v1'
).replace(/\/$/, '');

export const DASHBOARD_URL: string = (
  import.meta.env.VITE_DASHBOARD_URL || 'https://app.yukplanning.tech'
).replace(/\/$/, '');

export const LOGIN_URL: string = DASHBOARD_URL;

export const SUPPORT_EMAIL: string =
  import.meta.env.VITE_SUPPORT_EMAIL || 'halo@yukplanning.tech';

export const SUPPORT_WHATSAPP: string =
  import.meta.env.VITE_SUPPORT_WHATSAPP || '+62 812-9988-7766';

/**
 * Hostname dashboard untuk tampilan mockup browser di showcase (misal: "app.yukplanning.tech")
 */
export const DASHBOARD_HOSTNAME: string = (() => {
  try {
    return new URL(DASHBOARD_URL).host;
  } catch {
    return 'app.yukplanning.tech';
  }
})();
