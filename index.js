/**
 * dsh-sidebar-modes host half: no-op node-side mount. The plugin substance
 * lives in the browser half (`./client.js`), which the clientModules registry
 * serves because this package declares `dsh.client.platform = "web"`.
 */

/** Plugin id (cordis row id / loader entry). */
export const name = 'dsh-sidebar-modes'

/** No services required on the host plane. */
export const inject = []

/** Host plane mounts nothing: the browser half owns the whole feature. */
export function apply(ctx) {}
