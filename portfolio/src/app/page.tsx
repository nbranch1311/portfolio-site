import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nicholas A. Branch</h1>
        <nav className="flex gap-4">
          <Link href="/resume" className="text-sm sm:text-base hover:underline">
            Resume
          </Link>
          <Link
            href="/portfolio"
            className="text-sm sm:text-base hover:underline"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className="text-sm sm:text-base hover:underline"
          >
            Contact
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center gap-8">
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Hi, I’m Nicholas A. Branch
          </h2>
          <p className="text-lg sm:text-xl mt-2">
            Software Engineer | Full-Stack Developer
          </p>
        </div>

        <div className="max-w-2xl text-center">
          <p className="text-sm sm:text-base">
            I am a passionate developer with expertise in building scalable,
            modern web applications. Check out my projects and experience, or
            get in touch to collaborate.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/portfolio"
            className="rounded-full bg-black text-white px-6 py-2 text-sm sm:text-base hover:bg-gray-800"
          >
            View My Work
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-black px-6 py-2 text-sm sm:text-base hover:bg-gray-100"
          >
            Contact Me
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Nicholas A. Branch. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="https://linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a href="mailto:your-email@example.com" className="hover:underline">
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
