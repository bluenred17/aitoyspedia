/**
 * URL situs lama (aplikasi Express, ID angka) ke URL baru.
 * ID diverifikasi terhadap ai.toyspedia.fun pada 2026-11-04.
 * Understand Anything dan Claude-Mem berpindah dari Skills ke Plugins: README keduanya menyebut diri mereka
 * plugin (Claude-Mem menyertakan hook, server MCP, dan skill).
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/skills/578': '/plugins/claude-mem/',
  '/skills/579': '/skills/impeccable/',
  '/skills/580': '/skills/taste-skill/',
  '/skills/581': '/plugins/understand-anything/',
  '/skills/582': '/skills/lemo-opuscar/',
  '/tools/13': '/tools/headroom/',
  '/tools/14': '/tools/hyperframes/',
  '/tools/15': '/tools/freellmapi/',
  '/tools/16': '/tools/omniroute/',
  '/auth/login': '/',
  '/auth/register': '/',
};
