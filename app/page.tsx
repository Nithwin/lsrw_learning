"use client";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import  Footer  from "@/components/landing/Footer";
import  GetInTouch  from "@/components/landing/GetInTouch";
import Header from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

export default function LandingPage() {
  const {uid, loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!loading && uid){
      router.push('/student-dashboard');
    }
  },[uid, loading]);
  if(loading || uid) return null;
  return (
    <div className="relative pt-[5rem]">
      <Header />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        custom={0}
      >
        <Hero />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        custom={0.15}
      >
        <Features />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        custom={0.3}
      >
        <About />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        custom={0.45}
      >
        <GetInTouch />
      </motion.div>
      <Footer />
    </div>
  );
}
