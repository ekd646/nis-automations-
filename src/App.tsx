import { useEffect, useState } from 'react';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    if (entry.target.id === 'ai-chat-container' || entry.target.contains(document.getElementById('ai-chat-container'))) {
                        const messages = document.querySelectorAll('.ai-message');
                        messages.forEach(msg => msg.classList.add('active'));
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
        const chatContainer = document.getElementById('ai-chat-container');
        if (chatContainer) observer.observe(chatContainer);
        
        setTimeout(() => {
            document.querySelectorAll('.ai-message').forEach(msg => msg.classList.add('active'));
        }, 100);

        return () => observer.disconnect();
    }, []);

    return (
        <div className="bg-background text-on-background font-body antialiased min-h-screen relative">
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 max-w-md w-full relative shadow-2xl transform transition-transform duration-300">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <span className="material-symbols-outlined" translate="no">close</span>
                        </button>
                        <h2 className="text-2xl font-extrabold mb-2 text-gray-900 dark:text-white">Let's Build Your AI</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm leading-relaxed">Drop your work email below. Our automation architects will reach out within 2 hours to map your workflows.</p>
                        <input type="email" placeholder="work@company.com" className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mb-4 focus:ring-2 focus:ring-[#1978e5] outline-none text-gray-900 dark:text-white transition-colors" />
                        <button onClick={() => { alert('Request received successfully! We will be in touch.'); setIsModalOpen(false); }} className="w-full bg-[#1978e5] text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 hover:scale-[1.02]">
                            Request Strategy Call
                        </button>
                    </div>
                </div>
            )}
            <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    <a href="#" className="flex items-center gap-3 group">
                        <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-105 transition-transform shadow-md rounded-[10px]">
                            <rect width="40" height="40" rx="10" fill="#1b1b1b" />
                            <path d="M12 28V12L28 28V12" stroke="#1978e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="28" cy="12" r="3" fill="#1978e5" />
                        </svg>
                        <span className="text-xl md:text-2xl font-extrabold text-on-surface tracking-tight hidden sm:block">Nis Automations</span>
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Solutions</a>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Process</a>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Case Studies</a>
                        <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">Testimonials</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsModalOpen(true)} className="bg-[#1978e5] text-white px-6 py-2.5 rounded-lg font-semibold hover:opacity-80 transition-opacity active:scale-95 duration-150">
                            Get Started
                        </button>
                        <button className="md:hidden p-2">
                            <span className="material-symbols-outlined" translate="no">menu</span>
                        </button>
                    </div>
                </nav>
            </header>

            <main className="pt-24">
                <section className="relative overflow-hidden py-24 md:py-32 hero-gradient">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="z-10 animate-hero">
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-100 text-blue-700 rounded-full">
                            AI Automation Agency
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8 tracking-tighter">
                            We Build <span className="text-[#1978e5]">AI Employees</span> for Your Business
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                            Stop losing leads after 5 PM. We build hyper-realistic Voice Agents, 24/7 WhatsApp Receptionists, and fully automated SaaS workflows that never sleep.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button onClick={() => setIsModalOpen(true)} className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex items-center gap-2">
                                Launch Project <span className="material-symbols-outlined" translate="no">arrow_forward</span>
                            </button>
                            <button onClick={() => setIsModalOpen(true)} className="glass-card text-on-background px-8 py-4 rounded-xl font-bold text-lg hover:bg-surface-container transition-all">
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative group animate-hero" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute -inset-4 bg-[#1978e5] opacity-10 blur-3xl rounded-full"></div>
                        <div className="relative glass-card rounded-2xl p-6 blue-glow border-white/40 overflow-hidden">
                            <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#1978e5] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold">Nis AI Assistant</p>
                                        <p className="text-xs text-green-600 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Active Node
                                        </p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-outline">more_horiz</span>
                            </div>
                            <div className="space-y-6" id="ai-chat-container">
                                <div className="flex gap-3 ai-message delay-300">
                                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center">
                                        <span className="material-symbols-outlined text-sm">person</span>
                                    </div>
                                    <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none text-sm max-w-[80%]">
                                        Analyze Q3 performance and suggest automation workflows for supply chain.
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-row-reverse ai-message delay-500">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-sm text-[#1978e5]">smart_toy</span>
                                    </div>
                                    <div className="bg-[#1978e5] text-white p-4 rounded-2xl rounded-tr-none text-sm max-w-[80%] shadow-lg">
                                        Analysis complete. Identified 12% latency in node-4. Generating optimization sequence...
                                        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                                            <div className="w-2/3 h-full bg-white"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 ai-message delay-700">
                                    <div className="bg-white border border-outline-variant p-4 rounded-xl">
                                        <p className="text-xs text-outline mb-1">Efficiency Gain</p>
                                        <p className="text-xl font-bold text-[#1978e5]">+34.2%</p>
                                    </div>
                                    <div className="bg-white border border-outline-variant p-4 rounded-xl">
                                        <p className="text-xs text-outline mb-1">Active Bots</p>
                                        <p className="text-xl font-bold">1,204</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-24 h-24 glass-card rounded-2xl flex items-center justify-center text-[#1978e5] shadow-xl rotate-12">
                            <span className="material-symbols-outlined scale-150">auto_graph</span>
                        </div>
                    </div>
                </div>
                </section>

                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="mb-16 reveal-on-scroll">
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Our Core AI Services</h2>
                        <p className="text-on-surface-variant max-w-2xl">We transform heavy manual operations into seamless, automated profits using the latest AI models available.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                        <div className="md:col-span-2 md:row-span-2 bg-primary-container text-white p-10 rounded-3xl relative overflow-hidden flex flex-col justify-end group reveal-on-scroll">
                            <img alt="Close up of circuit board" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" />
                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-4xl mb-6">record_voice_over</span>
                                <h3 className="text-3xl font-bold mb-4">Inbound Voice AI Agents</h3>
                                <p className="text-on-primary text-lg max-w-md">Hyper-realistic AI voices that answer your company phone 24/7, handle complex customer questions, and book meetings directly into Calendly.</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 bg-white border border-outline-variant p-8 rounded-3xl flex flex-col justify-between hover:shadow-xl transition-shadow reveal-on-scroll delay-100">
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1978e5] flex items-center justify-center">
                                    <span className="material-symbols-outlined" translate="no">sync_alt</span>
                                </div>
                                <span className="text-xs font-mono text-outline">SECURE LAYER V2.4</span>
                            </div>
                            <div className="pt-6">
                                <h3 className="text-xl font-bold mb-3">Seamless Integrations</h3>
                                <div className="flex gap-2 flex-wrap mb-4">
                                  <span className="px-3 py-1.5 bg-pink-100 text-pink-700 rounded-lg text-xs font-extrabold tracking-wider border border-pink-200">n8n</span>
                                  <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg text-xs font-extrabold tracking-wider border border-orange-200">Zapier</span>
                                  <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-extrabold tracking-wider border border-purple-200">Make.com</span>
                                  <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-extrabold tracking-wider border border-emerald-200">OpenAI API</span>
                                </div>
                                <p className="text-on-surface-variant text-sm">Unified routing and control plane across all your existing enterprise SaaS tools.</p>
                            </div>
                        </div>
                        <div className="bg-surface-container-high p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-secondary transition-colors reveal-on-scroll delay-200">
                            <span className="material-symbols-outlined text-[#1978e5] group-hover:text-white transition-colors mb-4">forum</span>
                            <h3 className="font-bold group-hover:text-white transition-colors">WhatsApp AI Closers</h3>
                        </div>
                        <div className="bg-[#1978e5] text-white p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-blue-700 transition-colors reveal-on-scroll delay-300">
                            <span className="material-symbols-outlined text-white mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>lan</span>
                            <h3 className="font-bold">Internal Company RAG</h3>
                        </div>
                    </div>
                </section>

                <section className="bg-surface-container py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 reveal-on-scroll">
                            <h2 className="text-4xl font-extrabold mb-6">Our Deployment Process</h2>
                            <div className="w-24 h-1 bg-[#1978e5] mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="relative reveal-on-scroll">
                                <div className="text-[120px] font-extrabold text-[#1978e5]/10 absolute -top-16 -left-4 select-none">01</div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Discovery</h3>
                                    <p className="text-on-surface-variant leading-relaxed">We audit your current tech stack to identify bottlenecks and untapped automation potential within your ecosystem.</p>
                                </div>
                            </div>
                            <div className="relative reveal-on-scroll delay-200">
                                <div className="text-[120px] font-extrabold text-[#1978e5]/10 absolute -top-16 -left-4 select-none">02</div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Architecture</h3>
                                    <p className="text-on-surface-variant leading-relaxed">Our engineers design a bespoke automation roadmap tailored to your specific operational requirements and KPIs.</p>
                                </div>
                            </div>
                            <div className="relative reveal-on-scroll delay-400">
                                <div className="text-[120px] font-extrabold text-[#1978e5]/10 absolute -top-16 -left-4 select-none">03</div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Implementation</h3>
                                    <p className="text-on-surface-variant leading-relaxed">Seamless integration of AI nodes with 24/7 monitoring and iterative optimization protocols for maximum ROI.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto glass-card rounded-[40px] p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center border-none shadow-2xl relative reveal-on-scroll">
                        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#1978e5] opacity-5 rounded-full blur-3xl"></div>
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex -space-x-2">
                                    <img alt="Portrait" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
                                    <img alt="Portrait" className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"/>
                                </div>
                                <span className="text-sm font-semibold text-outline">Trusted by industry leaders</span>
                            </div>
                            <h2 className="text-4xl font-extrabold mb-8">Revolutionizing Global Logistics for Fortune 500</h2>
                            <blockquote className="text-2xl font-medium mb-8 leading-tight italic text-on-surface">
                                "Nis Automations transformed our fulfillment cycle from 48 hours to just 4. The impact on our bottom line was immediate and profound."
                            </blockquote>
                            <div>
                                <p className="font-bold">Marcus Thorne</p>
                                <p className="text-on-surface-variant text-sm">CTO, Global Dynamics</p>
                            </div>
                        </div>
                        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant reveal-on-scroll delay-100">
                                    <h4 className="text-3xl font-extrabold text-[#1978e5]">92%</h4>
                                    <p className="text-sm text-outline">Accuracy increase</p>
                                </div>
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant reveal-on-scroll delay-200">
                                    <h4 className="text-3xl font-extrabold text-[#1978e5]">4.2x</h4>
                                    <p className="text-sm text-outline">Throughput speed</p>
                                </div>
                            </div>
                            <div className="space-y-4 mt-8">
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant reveal-on-scroll delay-300">
                                    <h4 className="text-3xl font-extrabold text-[#1978e5]">-$2M</h4>
                                    <p className="text-sm text-outline">Annual waste reduction</p>
                                </div>
                                <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant reveal-on-scroll delay-400">
                                    <h4 className="text-3xl font-extrabold text-[#1978e5]">24/7</h4>
                                    <p className="text-sm text-outline">Uptime reliability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Subscriptions / Pricing Section */}
                <section className="py-24 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16 reveal-on-scroll">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Simple, ROI-Driven Plans</h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto">Choose the automation architecture that fits your current operational volume. Cancel anytime.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                        {/* Tier 1 - Workflow Bridge */}
                        <div className="bg-surface border border-outline-variant p-8 rounded-3xl flex flex-col hover:shadow-xl transition-shadow reveal-on-scroll delay-100">
                            <h3 className="text-2xl font-bold mb-2">Workflow Bridge</h3>
                            <p className="text-on-surface-variant text-sm mb-6 h-10">Connect your existing SaaS tools to eliminate manual data entry.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold">$997</span>
                                <span className="text-on-surface-variant"> setup</span>
                                <div className="text-sm font-semibold text-[#1978e5] mt-1">+ $97 /mo maintenance</div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Zapier / Make.com Setup</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> CRM & Email Sync</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 2 Custom Workflows</li>
                                <li className="flex items-center gap-2 text-sm text-on-surface-variant"><span className="material-symbols-outlined text-outline-variant text-lg">cancel</span> No AI Agents</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-[#1978e5] text-[#1978e5] font-bold hover:bg-[#1978e5] hover:text-white transition-colors">Integrate Now</button>
                        </div>

                        {/* Tier 2 - AI Lead Agent (Popular) */}
                        <div className="bg-primary-container text-white p-8 rounded-3xl flex flex-col relative transform md:-translate-y-4 shadow-2xl reveal-on-scroll delay-200">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1978e5] text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Most Popular</div>
                            <h3 className="text-2xl font-bold mb-2">AI Lead Agent</h3>
                            <p className="text-on-primary text-sm mb-6 h-10">24/7 WhatsApp/Web AI assistant that talks, qualifies, and books meetings.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold">$1,497</span>
                                <span className="text-on-primary/80"> setup</span>
                                <div className="text-sm font-semibold text-[#1978e5] mt-1">+ $297 /mo usage</div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-blue-400 text-lg">check_circle</span> Custom ChatGPT Training</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-blue-400 text-lg">check_circle</span> WhatsApp / Site Deployment</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-blue-400 text-lg">check_circle</span> Calendly Automation</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-blue-400 text-lg">check_circle</span> Handover to Human Agent</li>
                            </ul>
                            <button onClick={() => setIsModalOpen(true)} className="w-full py-3 rounded-xl bg-[#1978e5] text-white font-bold hover:opacity-90 transition-opacity">Deploy Assistant</button>
                        </div>

                        {/* Tier 3 - Enterprise RAG */}
                        <div className="bg-surface border border-outline-variant p-8 rounded-3xl flex flex-col hover:shadow-xl transition-shadow reveal-on-scroll delay-300">
                            <h3 className="text-2xl font-bold mb-2">Omni-Brain</h3>
                            <p className="text-on-surface-variant text-sm mb-6 h-10">Internal RAG Knowledge Base and Voice AI for entire operations.</p>
                            <div className="mb-6">
                                <span className="text-4xl font-extrabold">Custom</span>
                                <span className="text-on-surface-variant"> setup</span>
                                <div className="text-sm font-semibold text-outline-variant mt-1">Starting at $3,500</div>
                            </div>
                            <ul className="space-y-3 mb-8 flex-1">
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Internal Employee AI</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Endless Document Ingestion</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Inbound Voice AI (Phone)</li>
                                <li className="flex items-center gap-2 text-sm"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Dedicated AI Engineer</li>
                            </ul>
                            <button className="w-full py-3 rounded-xl border border-outline-variant font-bold hover:bg-surface-container transition-colors">Book Strategy Call</button>
                        </div>
                    </div>
                </section>

                <section className="py-24 max-w-7xl mx-auto px-6 text-center">
                    <div className="bg-primary text-on-primary rounded-[40px] p-12 md:p-24 relative overflow-hidden reveal-on-scroll">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#1978e5_0%,_transparent_50%)]"></div>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-extrabold mb-8">Ready to automate the future?</h2>
                            <p className="text-xl text-on-primary/80 mb-12 max-w-2xl mx-auto">Join the ranks of high-performance enterprises leveraging Nis AI solutions.</p>
                            <div className="flex flex-col md:flex-row justify-center gap-6">
                                <button onClick={() => setIsModalOpen(true)} className="bg-[#1978e5] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">
                                    Start Your Migration
                                </button>
                                <button onClick={() => setIsModalOpen(true)} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-colors">
                                    Talk to an Expert
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-6 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">Nis Automations Co.</div>
                        <p className="text-sm font-inter text-gray-500 dark:text-gray-400 max-w-xs">Building the intelligent infrastructure of tomorrow, today.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8">
                        <a className="text-sm font-inter text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Privacy Policy</a>
                        <a className="text-sm font-inter text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Terms of Service</a>
                        <a className="text-sm font-inter text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors" href="#">Cookie Policy</a>
                    </div>
                    <div className="text-sm font-inter text-gray-500 dark:text-gray-400 text-center md:text-right">
                        © 2026 Nis Automations Co. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
