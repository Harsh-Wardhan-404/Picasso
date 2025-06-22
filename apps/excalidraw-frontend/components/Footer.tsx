import React from "react";
import Link from "next/link";
import { Sparkles, Github, PenTool, Share2, Users, Laptop, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
    // Footer links organized by section
    const footerSections = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "/#features" },
                { name: "How It Works", href: "/#how-it-works" },
                { name: "Roadmap", href: "/roadmap" },
            ]
        },
        {
            title: "Connect",
            links: [
                { name: "Twitter", href: "https://x.com/harsh_wdym" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "https://x.com/harsh_wdym" },
            ]
        }
    ];

    // Social media links
    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, href: "https://github.com/Harsh-Wardhan-404/Picasso", label: "GitHub" },
        { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/harsh_wdym", label: "Twitter" },
        { icon: <Mail className="w-5 h-5" />, href: "mailto:harshwardhansaindane@gmail.com", label: "Email" }
    ];

    return (
        <footer className="border-t border-gray-800 bg-gray-950 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
                    {/* Brand Section */}
                    <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                            <span className="font-bold text-xl text-white">Picasso</span>
                        </div>

                        <p className="mt-4 text-sm text-gray-400 max-w-md">
                            Picasso is a collaborative drawing application that enables teams to create, share, and collaborate on digital canvases in real-time.
                        </p>

                        <div className="flex items-center mt-6 space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors rounded-full hover:bg-gray-900"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h4 className="text-sm font-semibold text-purple-400 mb-4">
                                    {section.title}
                                </h4>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <span>© 2025 Picasso.</span>
                        <span>All rights reserved.</span>
                    </div>

                    <div className="flex items-center mt-4 sm:mt-0 space-x-6">
                        <a href="/privacy" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="text-sm text-gray-500 hover:text-purple-400 transition-colors">
                            Terms of Service
                        </a>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">Made with</span>
                            <Heart className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;