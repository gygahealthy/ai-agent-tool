import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

const ForbiddenPage = () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-warning mb-4">403</h1>
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/images/403-illustration.svg"
              alt="Forbidden Access Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Truy cập bị từ chối
          </h2>
          <p className="text-gray-600 mb-8">
            Bạn không có quyền truy cập vào trang này
          </p>
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
          >
            <span className="mr-2">←</span>
            Về trang chủ
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForbiddenPage; 