import { Zap, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="Captiongrit Logo" className="w-8 h-8 object-contain rounded-md" />
              <span className="font-display font-bold text-xl tracking-tight text-white">Captiongrit</span>
            </a>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              AI-Powered Captions for Creators. Generate flawless captions in 24 languages directly inside your timeline.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#features" className="hover:text-accent-primary transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-accent-primary transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-accent-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li><a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent-primary hover:text-black transition-all font-bold">
                D
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm text-center md:text-left">
            © 2026 Captiongrit by Flogrit. All rights reserved.
          </p>
          <p className="text-text-secondary text-sm flex items-center gap-2">
            Made for creators, by a creator <Zap className="w-4 h-4 text-accent-primary" />
          </p>
        </div>
      </div>
    </footer>
  );
}
