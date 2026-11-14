/**
 * Development-only marker for details carried over from the earlier site that still need
 * the owner's confirmation. Production builds hide these details entirely (see isShown).
 */
export function Unconfirmed() {
  if (!import.meta.env.DEV) return null;
  return (
    <span
      title="Carried over from the earlier site. Confirm before publishing; hidden in production builds."
      className="ml-2 inline-flex translate-y-[-1px] items-center rounded-full bg-[#fff1c7] px-2 py-0.5 align-middle text-[0.6875rem] font-semibold uppercase tracking-wide text-[#7a5300]"
    >
      To confirm
    </span>
  );
}
