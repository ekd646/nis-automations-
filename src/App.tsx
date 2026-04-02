import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "strategy" | "login" | "signup" | "privacy" | "terms" | "cookie"
  >("strategy");
  const [activeService, setActiveService] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const services = [
    {
      title: "Inbound Voice AI Agents",
      desc: "Hyper-realistic AI voices that answer your company phone 24/7, handle complex customer questions, and book meetings directly into Calendly.",
      icon: "record_voice_over",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Calendly", "OpenAI", "Twilio"],
    },
    {
      title: "Seamless Integrations",
      desc: "Unified routing and control plane across all your existing enterprise SaaS tools to eliminate data silos.",
      icon: "sync_alt",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["n8n", "Zapier", "Make.com"],
    },
    {
      title: "WhatsApp AI Closers",
      desc: "Deploy autonomous sales agents directly on WhatsApp to qualify and close leads instantly.",
      icon: "forum",
      img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["WhatsApp API", "Meta", "LLaMA"],
    },
    {
      title: "Internal Company RAG",
      desc: "Secure, private AI that knows your entire company documentation and answers employee queries in seconds.",
      icon: "lan",
      img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Vector DB", "Pinecone", "LangChain"],
    },
  ];
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          if (
            entry.target.id === "ai-chat-container" ||
            entry.target.contains(document.getElementById("ai-chat-container"))
          ) {
            const messages = document.querySelectorAll(".ai-message");
            messages.forEach((msg) => msg.classList.add("active"));
          }
        }
      });
    }, observerOptions);
    document
      .querySelectorAll(".reveal-on-scroll")
      .forEach((el) => observer.observe(el));
    const chatContainer = document.getElementById("ai-chat-container");
    if (chatContainer) observer.observe(chatContainer);
    setTimeout(() => {
      document
        .querySelectorAll(".ai-message")
        .forEach((msg) => msg.classList.add("active"));
    }, 100);
    return () => observer.disconnect();
  }, []);
  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };
  return (
    <div className="bg-[#0a2e45] text-[#d8d29b] font-body antialiased min-h-screen relative">
      {" "}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a2e45]/60 backdrop-blur-sm p-4 transition-opacity duration-300">
          {" "}
          <div className="bg-[#0a2e45] border border-white/5 rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-transform duration-300 scale-100">
            {" "}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-[#d8d29b] :text-[#0a2e45] transition-colors"
            >
              {" "}
              <span className="material-symbols-outlined" translate="no">
                close
              </span>{" "}
            </button>{" "}
            {modalMode === "strategy" && (
              <div className="animate-fade-in transition-all">
                {" "}
                <h2 className="text-3xl font-extrabold mb-2 text-[#d8d29b] text-center tracking-tight">
                  Let's Build Your AI
                </h2>{" "}
                <p className="text-white mb-8 text-sm leading-relaxed text-center">
                  Drop your work email below. Our automation architects will
                  reach out within 2 hours to map your workflows.
                </p>{" "}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work@company.com"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#0a2e45] border border-white/5 shadow-2xl mb-4 focus:ring-2 focus:ring-[#085f52] outline-none text-[#d8d29b] transition-colors"
                />{" "}
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    if (!email) return;
                    setIsSubmitting(true);
                    const { error } = await supabase
                      .from("leads")
                      .insert([{ email, source: "Strategy Call Modal" }]);
                    setIsSubmitting(false);
                    if (error) {
                      alert(
                        "Connection Error. Please check your network and try again.",
                      );
                      console.error(error);
                      return;
                    }
                    alert(
                      "Request received successfully! We will be in touch shortly.",
                    );
                    setEmail("");
                    setIsModalOpen(false);
                  }}
                  className="w-full bg-[#def525] text-[#0a2e45] py-3.5 rounded-xl font-bold hover:bg-[#0a2e45] transition-colors shadow-lg shadow-[#def525]/10 hover:scale-[1.02] disabled:opacity-50"
                >
                  {" "}
                  {isSubmitting ? "Routing..." : "Request Strategy Call"}{" "}
                </button>{" "}
                <p className="text-center text-xs text-white mt-6 pt-4 border-t border-white/5 ">
                  Need dashboard access?{" "}
                  <span
                    onClick={() => setModalMode("login")}
                    className="text-[#92b844] font-bold cursor-pointer hover:underline"
                  >
                    Login here.
                  </span>
                </p>{" "}
              </div>
            )}{" "}
            {modalMode === "login" && (
              <div className="animate-fade-in transition-all">
                {" "}
                <h2 className="text-3xl font-extrabold mb-2 text-[#d8d29b] text-center tracking-tight">
                  Welcome Back
                </h2>{" "}
                <p className="text-white mb-8 text-sm text-center">
                  Sign in to your Observice Automations Co. dashboard.
                </p>{" "}
                <div className="space-y-4 mb-6">
                  {" "}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#0a2e45] border border-white/5 shadow-2xl text-[#d8d29b] outline-none focus:ring-2 focus:ring-[#085f52] transition-colors"
                  />{" "}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#0a2e45] border border-white/5 shadow-2xl text-[#d8d29b] outline-none focus:ring-2 focus:ring-[#085f52] transition-colors"
                  />{" "}
                </div>{" "}
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    setIsSubmitting(true);
                    const { data, error } =
                      await supabase.auth.signInWithPassword({
                        email,
                        password,
                      });
                    setIsSubmitting(false);
                    if (error) {
                      alert(error.message);
                      return;
                    }
                    setUser(data.user);
                    setIsModalOpen(false);
                    setEmail("");
                    setPassword("");
                  }}
                  className="w-full py-3.5 bg-[#0a2e45] font-semibold tracking-wide text-[#0a2e45] font-extrabold uppercase tracking-widest rounded-xl shadow-lg hover:opacity-80 transition-opacity mb-6 disabled:opacity-50"
                >
                  {" "}
                  {isSubmitting ? "Verifying..." : "Sign In"}{" "}
                </button>{" "}
                <p className="text-center text-xs text-white border-t border-white/5 pt-4">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setModalMode("signup")}
                    className="text-[#92b844] font-bold cursor-pointer hover:underline"
                  >
                    Create one
                  </span>
                </p>{" "}
              </div>
            )}{" "}
            {modalMode === "signup" && (
              <div className="animate-fade-in transition-all">
                {" "}
                <h2 className="text-3xl font-extrabold mb-2 text-[#d8d29b] text-center tracking-tight">
                  Create Account
                </h2>{" "}
                <p className="text-white mb-8 text-sm text-center">
                  Join Observice Automations Co. and scale your workflows.
                </p>{" "}
                <div className="space-y-4 mb-6">
                  {" "}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Work Email"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#0a2e45] border border-white/5 shadow-2xl text-[#d8d29b] outline-none focus:ring-2 focus:ring-[#085f52] transition-colors"
                  />{" "}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-300 bg-[#0a2e45] border border-white/5 shadow-2xl text-[#d8d29b] outline-none focus:ring-2 focus:ring-[#085f52] transition-colors"
                  />{" "}
                </div>{" "}
                <button
                  disabled={isSubmitting}
                  onClick={async () => {
                    if (!email || !password) return;
                    setIsSubmitting(true);
                    const { error } = await supabase.auth.signUp({
                      email,
                      password,
                    });
                    setIsSubmitting(false);
                    if (error) {
                      alert(error.message);
                      return;
                    }
                    alert(
                      "Success! Check your email for the confirmation link.",
                    );
                    setModalMode("login");
                    setPassword("");
                  }}
                  className="w-full py-3.5 bg-[#def525] text-[#0a2e45] font-extrabold uppercase tracking-widest rounded-xl shadow-lg hover:bg-[#0a2e45] transition-colors mb-6 border border-[#085f52]/20 disabled:opacity-50"
                >
                  {" "}
                  {isSubmitting ? "Registering..." : "Create Account"}{" "}
                </button>{" "}
                <p className="text-center text-xs text-white border-t border-white/5 pt-4">
                  Already a member?{" "}
                  <span
                    onClick={() => setModalMode("login")}
                    className="text-[#92b844] font-bold cursor-pointer hover:underline"
                  >
                    Log in
                  </span>
                </p>{" "}
              </div>
            )}{" "}
            {modalMode === "privacy" && (
              <div className="animate-fade-in transition-all max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                {" "}
                <h2 className="text-3xl font-extrabold mb-6 text-[#d8d29b] ">
                  Privacy Policy
                </h2>{" "}
                <div className="space-y-4 text-sm text-white leading-relaxed">
                  {" "}
                  <p>
                    <strong>Last Updated: March 2026</strong>
                  </p>{" "}
                  <p>
                    At Observice Automations Co., we engineer enterprise-grade
                    AI systems, which requires us to handle data with the utmost
                    security and privacy standards globally available.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    1. Information We Collect
                  </h3>{" "}
                  <p>
                    We collect enterprise architecture telemetry, workflow
                    mapping documents, and user profile data to authenticate
                    your dashboard interactions. High-frequency conversation
                    logs processed by our voice agents are heavily encrypted.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    2. How We Use Information
                  </h3>{" "}
                  <p>
                    Your data is strictly utilized to fine-tune your specific
                    internal AI agents and coordinate routing schemas. Observice
                    Automations Co. enforces a zero-retention policy on
                    sensitive customer PII transacted through our conversational
                    nodes.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    3. Data Security
                  </h3>{" "}
                  <p>
                    We deploy end-to-end VNet isolation, SOC-2 verified
                    infrastructure, and military-grade AES-256 parameter
                    encryption. No third-party LLM providers train on your
                    proprietary inputs.
                  </p>{" "}
                </div>{" "}
              </div>
            )}{" "}
            {modalMode === "terms" && (
              <div className="animate-fade-in transition-all max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                {" "}
                <h2 className="text-3xl font-extrabold mb-6 text-[#d8d29b] ">
                  Terms of Service
                </h2>{" "}
                <div className="space-y-4 text-sm text-white leading-relaxed">
                  {" "}
                  <p>
                    <strong>Effective Date: March 2026</strong>
                  </p>{" "}
                  <p>
                    By connecting your organizational data streams to the
                    Observice Automations Co. architecture, you agree to these
                    enterprise terms.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    1. Use of Autonomous Agents
                  </h3>{" "}
                  <p>
                    You assume full responsibility for the operational
                    boundaries set for deployed AI agents (e.g., WhatsApp bots,
                    Voice IVR). Observice Automations Co. provides the
                    structural framework but does not mandate the content of
                    output responses.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    2. SLA and Uptime
                  </h3>{" "}
                  <p>
                    We guarantee a 99.99% uptime for the central routing engine.
                    In the event of underlying LLM provider outages, our
                    built-in failover logic automatically reroutes queries to
                    secondary models.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    3. Intellectual Property
                  </h3>{" "}
                  <p>
                    All custom integration connectors and specialized RAG
                    vectors built by our engineering division remain the
                    intellectual property of Observice Automations Co. unless
                    explicitly open-sourced.
                  </p>{" "}
                </div>{" "}
              </div>
            )}{" "}
            {modalMode === "cookie" && (
              <div className="animate-fade-in transition-all max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
                {" "}
                <h2 className="text-3xl font-extrabold mb-6 text-[#d8d29b] ">
                  Cookie Policy
                </h2>{" "}
                <div className="space-y-4 text-sm text-white leading-relaxed">
                  {" "}
                  <p>
                    <strong>Effective Date: March 2026</strong>
                  </p>{" "}
                  <p>
                    Observice Automations Co. leverages sophisticated local
                    storage mechanisms and cookies to ensure seamless identity
                    management across your multi-app enterprise dashboard.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    1. Authentication Cookies
                  </h3>{" "}
                  <p>
                    Required to maintain your secure JWT session tokens while
                    you rapidly switch between Agent Configs and API Logs.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    2. Performance Telemetry
                  </h3>{" "}
                  <p>
                    We track client-side rendering performance to constantly
                    optimize the DOM load speeds, ensuring our dashboards react
                    instantly.
                  </p>{" "}
                  <h3 className="text-lg text-[#d8d29b] font-bold mt-6 mb-2">
                    3. Managing Permissions
                  </h3>{" "}
                  <p>
                    While you may block performance cookies via browser
                    extensions, doing so to secure authentication cookies will
                    permanently log you out of the automation routing engine.
                  </p>{" "}
                </div>{" "}
              </div>
            )}{" "}
            <div className="mt-4 pt-4 text-center">
              {" "}
              <div className="flex items-center justify-center gap-1.5 text-xs text-white mb-3 font-medium">
                {" "}
                <span className="material-symbols-outlined text-[14px] text-green-500">
                  lock
                </span>{" "}
                Guaranteed Safe & Secure Configuration{" "}
              </div>{" "}
              <div className="flex justify-center items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
                {" "}
                <div className="bg-[#0a2e45] px-2 py-0.5 rounded shadow-sm flex items-center justify-center border border-gray-300 h-6">
                  <span className="text-[#142A7C] font-extrabold text-[11px] tracking-tighter">
                    VISA
                  </span>
                </div>{" "}
                <div className="bg-[#1A1F36] px-2 py-0.5 rounded shadow-sm flex items-center justify-center border border-gray-600 h-6">
                  <span className="text-[#635BFF] font-bold text-[11px]">
                    stripe
                  </span>
                </div>{" "}
                <div className="bg-[#0a2e45] px-2 py-0.5 rounded shadow-sm flex items-center justify-center border border-gray-300 h-6">
                  <div className="flex">
                    <div className="w-3 h-3 rounded-full bg-red-500/90 mix-blend-multiply relative left-1 z-10"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90 mix-blend-multiply relative right-1"></div>
                  </div>
                </div>{" "}
                <div className="bg-[#0a2e45] px-2 py-0.5 rounded shadow-sm flex items-center justify-center border border-gray-700 h-6">
                  <span className="text-[#0a2e45] font-bold text-[11px]">
                     Pay
                  </span>
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}{" "}
      <header className="fixed top-0 w-full z-50 bg-[#0a2e45]/80 backdrop-blur-md border-b border-white/5 shadow-sm">
        {" "}
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {" "}
          <a
            onClick={(e) => scrollToSection("hero", e)}
            href="#hero"
            className="flex items-center gap-2 group cursor-pointer"
          >
            {" "}
            <svg
              width="40"
              height="40"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(8,95,82,0.4)]"
            >
              {" "}
              <defs>
                {" "}
                <linearGradient id="autoCore" x1="0" y1="0" x2="100" y2="100">
                  {" "}
                  <stop offset="0%" stopColor="#60A5FA" />{" "}
                  <stop offset="100%" stopColor="#085f52" />{" "}
                </linearGradient>{" "}
              </defs>{" "}
              <path
                d="M50 5 L10 28 L10 72 L50 95 L90 72 L90 28 Z"
                fill="url(#autoCore)"
                opacity="0.15"
              />{" "}
              <path
                d="M50 15 L18 33 L18 67 L50 85 L82 67 L82 33 Z"
                fill="url(#autoCore)"
              />{" "}
              <path d="M50 50 L18 33 L50 15 Z" fill="#ffffff" opacity="0.3" />{" "}
              <path d="M50 50 L82 33 L82 67 Z" fill="#000000" opacity="0.2" />{" "}
              <circle cx="50" cy="50" r="12" fill="#ffffff" className="" />{" "}
              <circle cx="50" cy="50" r="4" fill="#085f52" className="" />{" "}
            </svg>{" "}
            <div className="flex flex-col ml-3 hidden sm:flex">
              {" "}
              <span className="text-xl md:text-2xl font-black tracking-widest text-[#d8d29b] uppercase font-sans leading-none">
                Observice Automations{" "}
                <span className="text-[#92b844] ">Co.</span>
              </span>{" "}
              <span className="text-[9px] font-bold tracking-[0.4em] text-[#92b844] uppercase leading-none mt-1">
                Enterprise Architecture
              </span>{" "}
            </div>{" "}
          </a>{" "}
          <div className="hidden md:flex items-center gap-8 ml-auto mr-12">
            {" "}
            <a
              onClick={(e) => scrollToSection("solutions", e)}
              className="text-white hover:text-[#92b844] font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              href="#solutions"
            >
              Solutions
            </a>{" "}
            <a
              onClick={(e) => scrollToSection("process", e)}
              className="text-white hover:text-[#92b844] font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              href="#process"
            >
              Process
            </a>{" "}
            <a
              onClick={(e) => scrollToSection("case-studies", e)}
              className="text-white hover:text-[#92b844] font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              href="#case-studies"
            >
              Clients
            </a>{" "}
          </div>{" "}
          <div className="flex items-center gap-6">
            {" "}
            {user ? (
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                }}
                className="text-white font-bold text-sm tracking-wide hover:text-red-500 transition-colors hidden sm:block"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  setModalMode("login");
                  setIsModalOpen(true);
                }}
                className="text-white font-bold text-sm tracking-wide hover:text-[#d8d29b] :text-[#60A5FA] transition-colors hidden sm:block"
              >
                Login
              </button>
            )}{" "}
            <button
              onClick={() => {
                setModalMode("strategy");
                setIsModalOpen(true);
              }}
              className="bg-[#def525] text-[#0a2e45] px-6 py-2.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-[#0a2e45] transition-colors active:scale-95 duration-150 shadow-lg shadow-[#def525]/10"
            >
              {" "}
              Get Started{" "}
            </button>{" "}
          </div>{" "}
        </nav>{" "}
      </header>{" "}
      <main className="pt-24 min-h-screen">
        {" "}
        <section
          id="hero"
          className="relative overflow-hidden py-24 md:py-32 hero-gradient"
        >
          {" "}
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {" "}
            <div className="z-10 animate-hero">
              {" "}
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-[#085f52]/20 text-blue-700 rounded-full border border-[#085f52]/30 ">
                {" "}
                Enterprise AI Architectures{" "}
              </span>{" "}
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter">
                {" "}
                We Build <span className="text-[#92b844] ">
                  Autonomous
                </span>{" "}
                Departments{" "}
              </h1>{" "}
              <p className="text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                {" "}
                Stop losing leads after 5 PM. We build hyper-realistic Voice
                Agents, 24/7 WhatsApp Receptionists, and fully automated SaaS
                workflows that never sleep.{" "}
              </p>{" "}
              <div className="flex flex-wrap gap-4">
                {" "}
                <button
                  onClick={() => {
                    setModalMode("strategy");
                    setIsModalOpen(true);
                  }}
                  className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                >
                  {" "}
                  Launch Project{" "}
                  <span className="material-symbols-outlined" translate="no">
                    arrow_forward
                  </span>{" "}
                </button>{" "}
                <button
                  onClick={() => {
                    setModalMode("signup");
                    setIsModalOpen(true);
                  }}
                  className="glass-card bg-[#0a2e45]/5 border border-white/5 text-on-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#0a2e45]/10 transition-all"
                >
                  {" "}
                  Try Dashboard Free{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
            <div
              className="relative group animate-hero"
              style={{ animationDelay: "0.2s" }}
            >
              {" "}
              <div className="absolute -inset-4 bg-[#def525] opacity-20 blur-3xl rounded-full"></div>{" "}
              <div className="relative glass-card rounded-2xl p-6 blue-glow border-white/5 overflow-hidden shadow-2xl">
                {" "}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  {" "}
                  <div className="flex items-center gap-3">
                    {" "}
                    <div className="w-10 h-10 rounded-full bg-[#def525] flex items-center justify-center shadow-lg">
                      {" "}
                      <span
                        className="material-symbols-outlined text-[#0a2e45]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        bolt
                      </span>{" "}
                    </div>{" "}
                    <div>
                      {" "}
                      <p className="text-sm font-bold">
                        Observice Automations Co. Engine
                      </p>{" "}
                      <p className="text-xs text-green-500 flex items-center gap-1 font-mono tracking-tighter">
                        {" "}
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>{" "}
                        Active Integration Node{" "}
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                  <span className="material-symbols-outlined text-white">
                    more_horiz
                  </span>{" "}
                </div>{" "}
                <div className="space-y-6" id="ai-chat-container">
                  {" "}
                  <div className="flex gap-3 ai-message delay-300">
                    {" "}
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                      {" "}
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>{" "}
                    </div>{" "}
                    <div className="bg-[#0a2e45] border border-white/5 shadow-2xl p-4 rounded-2xl rounded-tl-none text-sm max-w-[80%] font-medium">
                      {" "}
                      Analyze Q3 performance and suggest automation workflows
                      for global supply chain.{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="flex gap-3 flex-row-reverse ai-message delay-500">
                    {" "}
                    <div className="w-8 h-8 rounded-full bg-[#085f52]/20 flex items-center justify-center">
                      {" "}
                      <span className="material-symbols-outlined text-sm text-[#92b844] ">
                        smart_toy
                      </span>{" "}
                    </div>{" "}
                    <div className="bg-[#def525] text-[#0a2e45] p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-lg font-medium leading-relaxed">
                      {" "}
                      Analysis complete. Identified 12% latency in distribution
                      node-4. Generating immediate optimization sequence across
                      43 sub-systems...{" "}
                      <div className="mt-4 h-1.5 bg-[#0a2e45]/20 rounded-full overflow-hidden">
                        {" "}
                        <div className="w-4/5 h-full bg-[#0a2e45] relative">
                          <div className="absolute inset-0 bg-[#0a2e45]/50 animate-pulse"></div>
                        </div>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  <div className="grid grid-cols-2 gap-4 ai-message delay-700">
                    {" "}
                    <div className="bg-[#0a2e45] border border-white/5 p-4 rounded-xl shadow-sm">
                      {" "}
                      <p className="text-xs text-white uppercase tracking-widest font-bold mb-1">
                        Efficiency Gain
                      </p>{" "}
                      <p className="text-2xl font-black text-[#92b844] ">
                        +34.2%
                      </p>{" "}
                    </div>{" "}
                    <div className="bg-[#0a2e45] border border-white/5 p-4 rounded-xl shadow-sm">
                      {" "}
                      <p className="text-xs text-white uppercase tracking-widest font-bold mb-1">
                        Active Bots
                      </p>{" "}
                      <p className="text-2xl font-black text-[#d8d29b]">
                        1,204
                      </p>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="solutions"
          className="py-24 max-w-7xl mx-auto px-6 border-t border-white/5 "
        >
          {" "}
          <div className="mb-16 reveal-on-scroll">
            {" "}
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Our Core AI Services
            </h2>{" "}
            <p className="text-on-surface-variant max-w-2xl text-lg">
              Select an implementation module below to view how Observice
              Automations Co. structures deterministic AI pipelines specifically
              for your sector.
            </p>{" "}
          </div>{" "}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[560px] reveal-on-scroll delay-100">
            {" "}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {" "}
              {services.map((svc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveService(idx)}
                  className={`text-left p-6 rounded-[24px] transition-all duration-300 flex items-center gap-4 group ${activeService === idx ? "bg-[#def525] text-[#0a2e45] shadow-xl scale-[1.02]" : "bg-[#0a2e45] border border-white/5 hover:border-[#085f52]/50 hover:bg-[#085f52]/5 :bg-blue-900/10"}`}
                >
                  {" "}
                  <div
                    className={`min-w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-inner ${activeService === idx ? "bg-[#0a2e45]/20" : "bg-[#085f52]/20 text-[#92b844] group-hover:bg-[#def525] group-hover:text-[#0a2e45]"}`}
                  >
                    {" "}
                    <span className="material-symbols-outlined">
                      {svc.icon}
                    </span>{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <h3
                      className={`font-bold text-lg mb-1 leading-tight ${activeService === idx ? "text-[#0a2e45]" : "text-[#d8d29b] "}`}
                    >
                      {svc.title}
                    </h3>{" "}
                    <p
                      className={`text-sm hidden sm:block ${activeService === idx ? "text-[#0a2e45]/80" : "text-white line-clamp-1"}`}
                    >
                      {svc.desc}
                    </p>{" "}
                  </div>{" "}
                </button>
              ))}{" "}
            </div>{" "}
            <div
              className="lg:col-span-7 bg-[#0a2e45] rounded-[32px] relative flex flex-col justify-end group transition-all duration-500 shadow-2xl overflow-hidden cursor-pointer"
              onClick={() => {
                setModalMode("signup");
                setIsModalOpen(true);
              }}
            >
              {" "}
              <div className="absolute inset-0 bg-[#0a2e45]">
                {" "}
                <img
                  alt={services[activeService].title}
                  className="w-full h-full object-cover opacity-50 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-60"
                  src={services[activeService].img}
                  key={services[activeService].img}
                />{" "}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>{" "}
                <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-[#0a2e45]/10 backdrop-blur-md border border-white/20 text-[#0a2e45] text-xs font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>{" "}
                  System Demo Active
                </div>{" "}
              </div>{" "}
              <div className="relative z-10 p-10 lg:p-12 pb-14 mt-auto">
                {" "}
                <span className="material-symbols-outlined text-5xl mb-6 text-[#0a2e45] bg-[#def525] p-4 rounded-2xl shadow-[0_0_30px_rgba(222,245,37,0.2)] inline-block">
                  {services[activeService].icon}
                </span>{" "}
                <h3 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#0a2e45]">
                  {services[activeService].title}
                </h3>{" "}
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed font-medium">
                  {services[activeService].desc}
                </p>{" "}
                <div className="flex flex-wrap gap-3">
                  {" "}
                  {services[activeService].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2 font-mono text-xs bg-[#0a2e45]/10 backdrop-blur-md rounded-xl text-[#0a2e45] font-bold tracking-widest uppercase border border-white/5 hover:bg-[#def525] hover:border-[#085f52] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="process"
          className="bg-[#0a2e45] border border-white/5 shadow-2xl py-24 border-y border-white/5 "
        >
          {" "}
          <div className="max-w-7xl mx-auto px-6">
            {" "}
            <div className="text-center mb-20 reveal-on-scroll">
              {" "}
              <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
                Our Deployment Process
              </h2>{" "}
              <div className="w-24 h-1.5 bg-[#def525] rounded-full mx-auto"></div>{" "}
            </div>{" "}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {" "}
              <div className="relative reveal-on-scroll">
                {" "}
                <div className="text-[120px] font-extrabold text-[#92b844] /10 absolute -top-16 -left-4 select-none mix-blend-multiply ">
                  01
                </div>{" "}
                <div className="relative z-10 bg-[#0a2e45]/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-[#085f52]/40 transition-colors shadow-sm">
                  {" "}
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#92b844] ">
                      search
                    </span>{" "}
                    Discovery
                  </h3>{" "}
                  <p className="text-on-surface-variant leading-relaxed">
                    We audit your current tech stack to identify bottlenecks and
                    untapped automation potential within your ecosystem.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="relative reveal-on-scroll delay-200">
                {" "}
                <div className="text-[120px] font-extrabold text-[#92b844] /10 absolute -top-16 -left-4 select-none mix-blend-multiply ">
                  02
                </div>{" "}
                <div className="relative z-10 bg-[#0a2e45]/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-[#085f52]/40 transition-colors shadow-sm">
                  {" "}
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#92b844] ">
                      architecture
                    </span>{" "}
                    Architecture
                  </h3>{" "}
                  <p className="text-on-surface-variant leading-relaxed">
                    Our engineers design a bespoke automation roadmap tailored
                    to your specific operational requirements and KPIs.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="relative reveal-on-scroll delay-400">
                {" "}
                <div className="text-[120px] font-extrabold text-[#92b844] /10 absolute -top-16 -left-4 select-none mix-blend-multiply ">
                  03
                </div>{" "}
                <div className="relative z-10 bg-[#0a2e45]/5 backdrop-blur-sm p-6 rounded-2xl border border-white/5 hover:border-[#085f52]/40 transition-colors shadow-sm">
                  {" "}
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#92b844] ">
                      deployed_code
                    </span>{" "}
                    Implementation
                  </h3>{" "}
                  <p className="text-on-surface-variant leading-relaxed">
                    Seamless integration of AI nodes with 24/7 monitoring and
                    iterative optimization protocols for maximum ROI.
                  </p>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section className="py-24 max-w-7xl mx-auto px-6 text-center">
          {" "}
          <div className="bg-[#0B3B7A] border border-transparent text-[#0a2e45] rounded-[40px] p-12 md:p-24 relative overflow-hidden reveal-on-scroll shadow-2xl">
            {" "}
            <div className="absolute inset-0 opacity-20">
              {" "}
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#085f52_0%,_transparent_60%)]"></div>{" "}
            </div>{" "}
            <div className="relative z-10">
              {" "}
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter shadow-sm">
                Ready to automate the future?
              </h2>{" "}
              <p className="text-xl text-[#0a2e45]/80 mb-12 max-w-2xl mx-auto font-medium">
                Join the ranks of high-performance enterprises leveraging
                Observice Automations Co. architectures.
              </p>{" "}
              <div className="flex flex-col md:flex-row justify-center gap-6">
                {" "}
                <button
                  onClick={() => {
                    setModalMode("signup");
                    setIsModalOpen(true);
                  }}
                  className="bg-[#def525] text-[#0a2e45] px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 shadow-[0_10px_40px_rgba(222,245,37,0.2)] transition-all"
                >
                  {" "}
                  Start Your Migration{" "}
                </button>{" "}
                <button
                  onClick={() => {
                    setModalMode("strategy");
                    setIsModalOpen(true);
                  }}
                  className="bg-[#0a2e45]/10 backdrop-blur-md text-[#0a2e45] border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#0a2e45]/20 transition-all"
                >
                  {" "}
                  Talk to an Expert{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
      <footer className="bg-[#0a2e45] border border-white/5 shadow-2xl border-t border-white/5 py-16">
        {" "}
        <div className="flex flex-col justify-center items-center gap-10 max-w-7xl mx-auto px-8">
          {" "}
          <div className="flex flex-wrap items-center justify-center gap-8 border-b border-white/5 pb-8 w-full max-w-2xl">
            {" "}
            <a
              onClick={() => {
                setModalMode("privacy");
                setIsModalOpen(true);
              }}
              className="text-xs font-inter text-white hover:text-[#92b844] :text-[#92b844] font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>{" "}
            <a
              onClick={() => {
                setModalMode("terms");
                setIsModalOpen(true);
              }}
              className="text-xs font-inter text-white hover:text-[#92b844] :text-[#92b844] font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Terms of Service
            </a>{" "}
            <a
              onClick={() => {
                setModalMode("cookie");
                setIsModalOpen(true);
              }}
              className="text-xs font-inter text-white hover:text-[#92b844] :text-[#92b844] font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Cookie Policy
            </a>{" "}
          </div>{" "}
          <div className="flex flex-col items-center justify-center gap-4">
            {" "}
            <span className="text-[10px] text-[#d8d29b]/70 font-extrabold uppercase tracking-[0.2em] flex items-center gap-1.5">
              {" "}
              <span className="material-symbols-outlined text-[14px] text-green-500">
                encrypted
              </span>{" "}
              Global Secure Configurations{" "}
            </span>{" "}
            <div className="flex gap-3 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 items-center justify-center bg-gray-200/50 px-6 py-3 rounded-2xl border border-white/5 ">
              {" "}
              <span className="bg-[#0a2e45] px-3 py-1.5 rounded shadow-sm border border-gray-100 text-[#142A7C] font-extrabold text-[12px] tracking-tighter">
                VISA
              </span>{" "}
              <span className="bg-[#0a2e45] px-3 py-1.5 rounded shadow-sm border border-gray-100 flex items-center justify-center">
                <div className="flex">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EA001B] mix-blend-multiply relative left-1.5 z-10"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] mix-blend-multiply relative right-1"></div>
                </div>
              </span>{" "}
              <span className="bg-[#1A1F36] border border-gray-600 px-3 py-1.5 rounded shadow-sm text-[#635BFF] font-bold text-[12px]">
                stripe
              </span>{" "}
              <span className="bg-[#0a2e45] px-3 py-1.5 rounded shadow-sm border border-white/5 text-black font-extrabold text-[12px]">
                {" "}
                Pay
              </span>{" "}
              <span className="bg-[#003087] px-3 py-1.5 rounded shadow-sm border border-[#003087] flex items-center">
                <span className="text-[#009cde] font-bold text-[11px]">
                  Pay
                </span>
                <span className="text-[#0a2e45] font-bold text-[11px]">
                  Pal
                </span>
              </span>{" "}
            </div>{" "}
          </div>{" "}
          {/* International Legal Compliance */}{" "}
          <div className="w-full max-w-5xl border-t border-white/5 pt-8">
            {" "}
            <h4 className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-[#d8d29b]/70 mb-6">
              International E-Commerce & AI Legal Compliance
            </h4>{" "}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              {" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  EU GDPR
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  General Data Protection Regulation 2016/679
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  PSD2 / SCA
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Strong Customer Authentication for Payments
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  EU Consumer Rights
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Directive 2011/83 — 14-Day Withdrawal
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  DSA / DMA
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Digital Services & Digital Markets Act
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  ePrivacy
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Cookie Consent & Electronic Communications
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  AML / KYC
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Anti-Money Laundering Directive 6 (AMLD6)
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  EU AI Act
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Artificial Intelligence Regulation 2024/1689
                </p>{" "}
              </div>{" "}
              <div className="bg-[#0a2e45] border border-white/5 shadow-2xl .02] border border-white/5 rounded-xl p-3">
                {" "}
                <p className="text-[#92b844] font-bold text-[10px] uppercase tracking-widest mb-1">
                  KVKK (TR)
                </p>{" "}
                <p className="text-[#d8d29b]/70 text-[9px]">
                  Kişisel Verilerin Korunması Kanunu No. 6698
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="text-xs font-inter text-[#d8d29b]/70 text-center font-medium mt-4">
            {" "}
            © 2026 Observice Automations Co. All rights reserved. Architected
            for Tomorrow.{" "}
          </div>{" "}
        </div>{" "}
      </footer>{" "}
    </div>
  );
};
export default App;
