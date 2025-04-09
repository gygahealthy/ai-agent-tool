'use client'

import { MainLayout } from "@/components/layouts/MainLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import ChatIcon from '@mui/icons-material/Chat'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

const faqs = [
  {
    question: "Làm thế nào để đăng ký gói cước 4G?",
    answer: "Bạn có thể đăng ký gói cước 4G bằng cách soạn tin nhắn theo cú pháp hoặc thông qua ứng dụng My MobiFone."
  },
  {
    question: "Làm sao để kiểm tra dung lượng data còn lại?",
    answer: "Soạn tin DATA gửi 9090 hoặc kiểm tra trực tiếp trên ứng dụng My MobiFone."
  },
  {
    question: "Tôi có thể chuyển đổi giữa các gói cước không?",
    answer: "Có, bạn có thể chuyển đổi giữa các gói cước bất kỳ lúc nào. Lưu ý rằng dung lượng data còn lại sẽ được cộng dồn."
  }
]

export default function HoTroPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <MainLayout
      title="MobiFone - Hỗ trợ khách hàng"
      description="Trung tâm hỗ trợ khách hàng MobiFone. Giải đáp thắc mắc và hỗ trợ 24/7."
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-8"
      >
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-8"
        >
          Hỗ trợ khách hàng
        </motion.h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="h-[200px] rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div variants={item}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <PhoneIcon className="w-12 h-12 text-blue-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Tổng đài hỗ trợ</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Gọi ngay để được hỗ trợ 24/7
                  </p>
                  <Button className="w-full transition-transform duration-300 hover:scale-105">
                    Gọi 9090
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <EmailIcon className="w-12 h-12 text-blue-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Email hỗ trợ</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Gửi email cho chúng tôi
                  </p>
                  <Button variant="outline" className="w-full transition-transform duration-300 hover:scale-105">
                    support@mobifone.vn
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center text-center">
                  <ChatIcon className="w-12 h-12 text-blue-600 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Chat trực tuyến</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Chat với nhân viên hỗ trợ
                  </p>
                  <Button variant="outline" className="w-full transition-transform duration-300 hover:scale-105">
                    Bắt đầu chat
                  </Button>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Câu hỏi thường gặp</h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index} 
                variants={item}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors duration-300"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </MainLayout>
  )
} 