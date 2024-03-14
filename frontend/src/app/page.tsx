"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/navbar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/mint");
  }, [router]);
  return (
    <main className="flex min-h-screen flex-col items-center px-24 bg-indigo-200">
      <Navbar />
    </main>
  );
}
