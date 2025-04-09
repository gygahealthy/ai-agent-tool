import React from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

const ServerErrorPage = () => {
  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-destructive mb-4">500</h1>
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/images/500-illustration.svg"
              alt="Server Error Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Oops! Đã có lỗi xảy ra
          </h2>
          <p className="text-gray-600 mb-8">
            Máy chủ đang gặp sự cố. Vui lòng thử lại sau
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

export default ServerErrorPage; 