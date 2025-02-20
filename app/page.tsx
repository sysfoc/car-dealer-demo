import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
export default function Home() {
  return (
    <main>
      <section
        className="min-h-screen w-full flex items-center justify-center relative"
        style={{
          background: "url('./banner.webp') no-repeat center center/cover",
          backgroundColor: "rgb(5, 11, 32)",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="absolute top-10 left-10 sm:left-14 text-white">
          <span>Great packs of ready-made templates</span>
        </div>
        <div className="w-[80%] text-center">
          <h1 className="text-white text-4xl sm:text-5xl font-semibold leading-tight">
            Car Dealer, Car Leasing, Car Repair HTML & Next JS Templates
          </h1>
          <div className="flex items-center justify-center">
            <Link
              href={"/add-ons"}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-6 flex items-center gap-2"
            >
              View Demos <MdArrowOutward fontSize={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
