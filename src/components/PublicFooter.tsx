import { PrivacyPolicyModal } from "./legal/PrivacyPolicyModal";

export function PublicFooter() {
  return (
    <div className="font-heading text-uppercase text-center text-sm text-gray-500 pt-5 mt-10 mx-auto max-w-screen-xl">
      <hr className="mx-auto" />

      <div className="pt-4 py-4">&copy; Puolustusvoimat</div>

      <hr className="mx-auto w-56" />

      <div className="py-3 text-xs">
        <PrivacyPolicyModal triggerClassName="text-m text-blue-500 underline cursor-pointer" />
      </div>
      <hr className="mx-auto w-56" />
    </div>
  );
}
