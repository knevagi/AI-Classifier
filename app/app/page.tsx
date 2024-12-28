import Image from "next/image";
import Link from "next/link";
import ProductCard from "./components/ProductCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3 className="text-4xl" style={{ color: 'black' }}>AI Classifier</h3>
      <ProductCard /> 

    </main>
  );
}
