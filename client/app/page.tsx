"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";
import {
    ArrowRight,
    Award,
    BarChart3,
    CheckCircle,
    ChevronDown,
    Github,
    Headphones,
    Linkedin,
    Lock,
    Mail,
    Menu,
    Play,
    Plus,
    Shield,
    Smartphone,
    Star,
    Target,
    TrendingUp,
    Twitter,
    Users,
    X,
    Zap,
} from "lucide-react";
import {Button} from "@/components/ui/button";

const features = [
    {
        icon: <CheckCircle className="w-8 h-8"/>,
        title: "Smart Task Management",
        desc: "Create, organize, and prioritize tasks with AI-powered suggestions and automated workflows.",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: <BarChart3 className="w-8 h-8"/>,
        title: "Advanced Analytics",
        desc: "Get deep insights into your productivity patterns with comprehensive dashboards and reports.",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: <Users className="w-8 h-8"/>,
        title: "Team Collaboration",
        desc: "Seamlessly work together with real-time updates, comments, and shared workspaces.",
        color: "from-green-500 to-green-600"
    },
    {
        icon: <Zap className="w-8 h-8"/>,
        title: "Automation & Integrations",
        desc: "Connect with 50+ tools and automate repetitive tasks to boost your productivity.",
        color: "from-yellow-500 to-orange-500"
    },
    {
        icon: <Shield className="w-8 h-8"/>,
        title: "Enterprise Security",
        desc: "Bank-grade security with end-to-end encryption, SSO, and compliance certifications.",
        color: "from-red-500 to-red-600"
    },
    {
        icon: <Smartphone className="w-8 h-8"/>,
        title: "Mobile & Offline",
        desc: "Access your tasks anywhere with our native mobile apps and offline synchronization.",
        color: "from-indigo-500 to-indigo-600"
    }
];

const stats = [
    {number: "50K+", label: "Active Users"},
    {number: "2M+", label: "Tasks Completed"},
    {number: "99.9%", label: "Uptime"},
    {number: "150+", label: "Countries"}
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Product Manager at TechCorp",
        avatar: "SJ",
        text: "This platform transformed how our team works. The collaboration features are game-changing, and the analytics help us stay on track.",
        rating: 5
    },
    {
        name: "Ahmed Hassan",
        role: "Freelance Designer",
        avatar: "AH",
        text: "As a freelancer managing multiple projects, this tool keeps me organized and productive. The mobile app is fantastic!",
        rating: 5
    },
    {
        name: "Maria Rodriguez",
        role: "Marketing Director",
        avatar: "MR",
        text: "The automation features save us hours every week. Integration with our existing tools was seamless.",
        rating: 5
    },
    {
        name: "David Chen",
        role: "Startup Founder",
        avatar: "DC",
        text: "From day one to scaling our team, this platform grew with us. The enterprise features are incredibly robust.",
        rating: 5
    }
];

const pricing = [
    {
        plan: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for individuals getting started",
        features: [
            "Up to 10 tasks per project",
            "3 projects maximum",
            "Basic task management",
            "Mobile app access",
            "Community support"
        ],
        popular: false,
        cta: "Get Started Free"
    },
    {
        plan: "Professional",
        price: "$12",
        period: "per month",
        description: "Ideal for growing teams and professionals",
        features: [
            "Unlimited tasks and projects",
            "Advanced analytics & reports",
            "Team collaboration tools",
            "Priority email support",
            "Custom integrations",
            "Time tracking",
            "File attachments up to 100MB"
        ],
        popular: true,
        cta: "Start Free Trial"
    },
    {
        plan: "Enterprise",
        price: "$29",
        period: "per user/month",
        description: "For large teams requiring advanced features",
        features: [
            "Everything in Professional",
            "Advanced security & compliance",
            "SSO and user management",
            "Dedicated account manager",
            "Custom workflows",
            "API access",
            "99.9% SLA guarantee",
            "Advanced reporting suite"
        ],
        popular: false,
        cta: "Contact Sales"
    }
];

const faqs = [
    {
        question: "How does the free plan work?",
        answer: "Our free plan includes all core features with limits on projects and storage. You can use it indefinitely and upgrade anytime as your needs grow."
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time. Your account will remain active until the end of your current billing period."
    },
    {
        question: "Do you offer team discounts?",
        answer: "Yes, we offer volume discounts for teams of 10+ users. Contact our sales team for custom pricing."
    },
    {
        question: "Is my data secure?",
        answer: "Absolutely. We use enterprise-grade security with end-to-end encryption, regular security audits, and compliance with SOC 2 and GDPR."
    },
    {
        question: "What integrations do you support?",
        answer: "We integrate with 50+ popular tools including Slack, Google Workspace, Microsoft 365, Trello, GitHub, and many more."
    }
];

const companies = [
    {name: "TechCorp", logo: "TC"},
    {name: "InnovateLab", logo: "IL"},
    {name: "DesignStudio", logo: "DS"},
    {name: "DataFlow", logo: "DF"},
    {name: "CloudSync", logo: "CS"},
    {name: "NextGen", logo: "NG"}
];

export default function ComprehensiveLanding() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white text-gray-900 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div
                                className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white"/>
                            </div>
                            <span
                                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Task Hive
              </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="/features"
                               className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
                            <a href="/pricing"
                               className="text-gray-600 hover:text-indigo-600 transition-colors">Pricing</a>
                            <a href="/testimonials"
                               className="text-gray-600 hover:text-indigo-600 transition-colors">Reviews</a>
                            <a href="/faq" className="text-gray-600 hover:text-indigo-600 transition-colors">FAQ</a>
                            <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                                Sign In
                            </Button>
                            <Button
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                                Get Started
                            </Button>
                        </div>

                        <button
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <a href="/features" className="block text-gray-600 hover:text-indigo-600">Features</a>
                            <a href="/pricing" className="block text-gray-600 hover:text-indigo-600">Pricing</a>
                            <a href="/testimonials" className="block text-gray-600 hover:text-indigo-600">Reviews</a>
                            <a href="/faq" className="block text-gray-600 hover:text-indigo-600">FAQ</a>
                            <Button variant="outline" className="w-full text-indigo-600 border-indigo-200">
                                Sign In
                            </Button>
                            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-white to-purple-50 opacity-50"></div>
                <div className="relative max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.8}}
                    >
                        <div
                            className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full text-indigo-800 text-sm font-medium mb-6">
                            <Star className="w-4 h-4 mr-2"/>
                            Trusted by 50,000+ users worldwide
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Organize your{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                productivity
              </span>
                            <br/>like never before
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            The most intuitive task management platform that adapts to your workflow.
                            Boost productivity, collaborate seamlessly, and achieve your goals faster.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Button
                                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Start Free Trial
                                <ArrowRight className="ml-2 w-5 h-5"/>
                            </Button>
                            <Button variant="outline"
                                    className="px-8 py-4 text-lg rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 group">
                                <Play className="mr-2 w-5 h-5 group-hover:text-indigo-600"/>
                                Watch Demo
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-16">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2"/>
                                No credit card required
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2"/>
                                14-day free trial
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2"/>
                                Cancel anytime
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image/Dashboard Preview */}
                    <motion.div
                        initial={{opacity: 0, y: 50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.3, duration: 0.8}}
                        className="relative"
                    >
                        <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 shadow-2xl mx-auto max-w-4xl">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="text-sm text-gray-500">TaskFlow Pro Dashboard</div>
                                </div>
                                <div className="space-y-3">
                                    <div
                                        className="h-4 bg-gradient-to-r from-indigo-200 to-purple-200 rounded w-3/4"></div>
                                    <div
                                        className="h-4 bg-gradient-to-r from-green-200 to-blue-200 rounded w-1/2"></div>
                                    <div
                                        className="h-4 bg-gradient-to-r from-yellow-200 to-orange-200 rounded w-5/6"></div>
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div
                                            className="h-20 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg"></div>
                                        <div
                                            className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                                        <div
                                            className="h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                                <div className="text-indigo-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500 mb-8">Trusted by leading companies worldwide</p>
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="grid grid-cols-3 md:grid-cols-6 gap-8"
                    >
                        {companies.map((company, index) => (
                            <div key={index} className="flex items-center justify-center">
                                <div
                                    className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                    {company.logo}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Everything you need to{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                succeed
              </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful features designed to streamline your workflow and boost productivity
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200"
                            >
                                <div
                                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-indigo-600 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Get started in{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                3 simple steps
              </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From setup to success in minutes
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {[
                            {
                                step: "01",
                                title: "Sign up & Setup",
                                desc: "Create your account and customize your workspace in under 2 minutes",
                                icon: <Users className="w-8 h-8"/>
                            },
                            {
                                step: "02",
                                title: "Add your tasks",
                                desc: "Import existing tasks or create new ones with our intuitive interface",
                                icon: <Plus className="w-8 h-8"/>
                            },
                            {
                                step: "03",
                                title: "Track & Achieve",
                                desc: "Monitor progress, collaborate with your team, and achieve your goals",
                                icon: <Target className="w-8 h-8"/>
                            }
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative text-center"
                            >
                                <div
                                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                    <div
                                        className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl font-bold">{step.step}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-gray-600">{step.desc}</p>
                                </div>
                                {index < 2 && (
                                    <div
                                        className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                                        <ArrowRight className="w-6 h-6 text-indigo-300"/>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Loved by{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                thousands
              </span>
                        </h2>
                        <p className="text-xl text-gray-600">See what our users have to say</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current"/>
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.text}&quot;</p>
                                <div className="flex items-center">
                                    <div
                                        className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Simple{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                transparent
              </span>{" "}
                            pricing
                        </h2>
                        <p className="text-xl text-gray-600">Choose the perfect plan for your needs</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {pricing.map((plan, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                                    plan.popular
                                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white transform scale-105'
                                        : 'bg-white border border-gray-200'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div
                                            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                        {plan.plan}
                                    </h3>
                                    <div className="mb-4">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                                        <span
                                            className={`text-lg ${plan.popular ? 'text-indigo-100' : 'text-gray-500'}`}>
                      /{plan.period}
                    </span>
                                    </div>
                                    <p className={`${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                                        {plan.description}
                                    </p>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <CheckCircle
                                                className={`w-5 h-5 mr-3 ${plan.popular ? 'text-indigo-200' : 'text-green-500'}`}/>
                                            <span className={`${plan.popular ? 'text-indigo-100' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className={`w-full ${
                                    plan.popular
                                        ? 'bg-white text-indigo-600 hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                                }`}>
                                    {plan.cta}
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-4">All plans include:</p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 text-green-500 mr-2"/>
                                99.9% uptime SLA
                            </div>
                            <div className="flex items-center">
                                <Lock className="w-4 h-4 text-green-500 mr-2"/>
                                Enterprise security
                            </div>
                            <div className="flex items-center">
                                <Headphones className="w-4 h-4 text-green-500 mr-2"/>
                                24/7 customer support
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Frequently asked{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                questions
              </span>
                        </h2>
                        <p className="text-xl text-gray-600">Everything you need to know about our platform</p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="space-y-6"
                    >
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <button
                                    className="w-full flex items-center justify-between text-left"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                                            openFaq === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: "auto"}}
                                        exit={{opacity: 0, height: 0}}
                                        className="mt-4 text-gray-600 leading-relaxed"
                                    >
                                        {faq.answer}
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <p className="text-gray-600 mb-6">Still have questions?</p>
                        <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                            Contact Support
                        </Button>
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-24 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Integrates with your{" "}
                            <span
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                favorite tools
              </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Connect with 50+ popular tools and streamline your workflow
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
                    >
                        {[
                            {name: "Slack", icon: "💬", color: "from-purple-400 to-purple-600"},
                            {name: "Google Drive", icon: "📁", color: "from-blue-400 to-blue-600"},
                            {name: "Trello", icon: "📋", color: "from-blue-500 to-indigo-600"},
                            {name: "GitHub", icon: "🐙", color: "from-gray-700 to-gray-900"},
                            {name: "Figma", icon: "🎨", color: "from-pink-400 to-red-500"},
                            {name: "Zoom", icon: "📹", color: "from-blue-500 to-blue-700"},
                            {name: "Notion", icon: "📝", color: "from-gray-600 to-gray-800"},
                            {name: "Discord", icon: "🎮", color: "from-indigo-500 to-purple-600"},
                            {name: "Dropbox", icon: "📦", color: "from-blue-600 to-blue-800"},
                            {name: "Asana", icon: "✅", color: "from-pink-500 to-red-600"},
                            {name: "Jira", icon: "🔧", color: "from-blue-600 to-indigo-700"},
                            {name: "Salesforce", icon: "☁️", color: "from-blue-500 to-cyan-600"}
                        ].map((integration, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                            >
                                <div
                                    className={`w-12 h-12 bg-gradient-to-r ${integration.color} rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                    {integration.icon}
                                </div>
                                <div className="text-sm font-semibold text-gray-700">{integration.name}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="text-center mt-12">
                        <Button
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                            View All Integrations
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to transform your productivity?
                        </h2>
                        <p className="text-xl mb-8 text-indigo-100">
                            Join thousands of users who have revolutionized their workflow with TaskFlow Pro
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Button
                                className="px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Start Your Free Trial
                                <ArrowRight className="ml-2 w-5 h-5"/>
                            </Button>
                            <Button variant="outline"
                                    className="px-8 py-4 text-lg rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300">
                                Schedule Demo
                            </Button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-8 text-sm text-indigo-100">
                            <div className="flex items-center">
                                <Award className="w-4 h-4 mr-2"/>
                                30-day money-back guarantee
                            </div>
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2"/>
                                50,000+ happy customers
                            </div>
                            <div className="flex items-center">
                                <TrendingUp className="w-4 h-4 mr-2"/>
                                Average 40% productivity increase
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        {/* Company Info */}
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div
                                    className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 text-white"/>
                                </div>
                                <span className="text-xl font-bold">TaskFlow Pro</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                The most intuitive task management platform designed to boost productivity
                                and streamline collaboration for teams of all sizes.
                            </p>
                            <div className="flex space-x-4">
                                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Twitter className="w-5 h-5"/>
                                </button>
                                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Linkedin className="w-5 h-5"/>
                                </button>
                                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                    <Github className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">System Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="border-t border-gray-800 pt-8 mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="mb-6 md:mb-0">
                                <h4 className="text-lg font-semibold mb-2">Stay updated</h4>
                                <p className="text-gray-400">Get the latest updates and productivity tips</p>
                            </div>
                            <div className="flex gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <Button
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div
                        className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <div>
                            © {new Date().getFullYear()} TaskFlow Pro. All rights reserved.
                        </div>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}