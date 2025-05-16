import { User } from "lucide-react";
import { Message } from "@/lib/types";
import { motion } from "framer-motion";

interface UserMessageProps {
  message: Message;
}

export default function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div 
        className="flex items-start space-x-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <div className="flex-1 bg-blue-900/30 rounded-lg p-4">
          <div className="prose prose-sm prose-invert max-w-none">
            <p className="text-blue-100">{message.content}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
