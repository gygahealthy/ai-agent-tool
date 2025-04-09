import { MainLayout } from "@/components/layouts/MainLayout";

export default function TinTucPage() {
  return (
    <MainLayout
      title="Quản lý gói cước | Tin tức"
      description="Quản lý và theo dõi thông tin gói cước MobiFone"
    >
      <div className="container mx-auto py-8">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-sm dark:bg-gray-900"></div>
      </div>
    </MainLayout>
  );
}
