import { Modal, ModalHeader, ModalBody, ModalCloseButton } from "@/components/ui/modal";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  affiliateUrl: string;
}

export function RegisterModal({ isOpen, onClose, affiliateUrl }: RegisterModalProps) {
  // Convert both possible URLs to HTTPS
  const secureUrl = affiliateUrl
    .replace("http://137.59.47.127:9989", "https://137.59.47.127:9989")
    .replace("http://mobifone-aff.vn", "https://mobifone-aff.vn");

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-xl overflow-hidden rounded-2xl">
      <ModalHeader className="rounded-t-2xl border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/10 dark:bg-blue-500 dark:shadow-blue-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Đăng ký gói cước</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vui lòng điền thông tin để đăng ký
            </p>
          </div>
        </div>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="p-0">
        <div className="relative w-full bg-white dark:bg-gray-900">
          <div className="h-[calc(90vh-7rem)] overflow-hidden">
            <iframe
              src={secureUrl}
              className="h-full w-full"
              referrerPolicy="no-referrer-when-downgrade"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
              loading="lazy"
            />
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
