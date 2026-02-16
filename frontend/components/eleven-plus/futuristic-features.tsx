"use client"

import { motion } from "framer-motion"
import { 
  Brain, 
  Zap, 
  Target, 
  Sparkles, 
  BookOpen, 
  Trophy,
  Cpu,
  Lightbulb,
  Rocket
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Neural Learning",
    description: "Advanced cognitive training that strengthens mental pathways for faster problem-solving",
    color: "from-violet-500 to-purple-600",
    glowColor: "violet-500",
    delay: 0,
  },
  {
    icon: Zap,
    title: "Speed Mastery",
    description: "Lightning-fast calculation techniques to ace time-pressured examinations",
    color: "from-amber-400 to-orange-500",
    glowColor: "amber-400",
    delay: 0.1,
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "Laser-targeted preparation for grammar school entry requirements",
    color: "from-cyan-400 to-blue-500",
    glowColor: "cyan-400",
    delay: 0.2,
  },
  {
    icon: Lightbulb,
    title: "Creative Logic",
    description: "Unlock innovative thinking patterns for verbal & non-verbal reasoning",
    color: "from-emerald-400 to-teal-500",
    glowColor: "emerald-400",
    delay: 0.3,
  },
  {
    icon: BookOpen,
    title: "Adaptive Learning",
    description: "Personalized curriculum that evolves with your child's progress",
    color: "from-pink-400 to-rose-500",
    glowColor: "pink-400",
    delay: 0.4,
  },
  {
    icon: Trophy,
    title: "Success Track",
    description: "Proven methodology with 95% grammar school placement rate",
    color: "from-yellow-400 to-amber-500",
    glowColor: "yellow-400",
    delay: 0.5,
  },
]

const stats = [
  { value: "95%", label: "Success Rate", icon: Trophy },
  { value: "500+", label: "Students", icon: Sparkles },
  { value: "50+", label: "Schools", icon: Target },
  { value: "10+", label: "Years", icon: Rocket },
]

export function FuturisticFeatures() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-20 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-[10%] w-80 h-80 bg-accent/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-full px-5 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-wide">Next-Gen Learning</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            The Future of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              11+ Preparation
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Revolutionary techniques combined with proven methodologies to unlock your child's full potential
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: feature.delay, duration: 0.6 }}
            >
              <motion.div
                className="group relative h-full"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500`} />
                
                {/* Card */}
                <div className="relative h-full bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-0.5 mb-5`}>
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Indicator */}
                  <div className="mt-5 flex items-center gap-2 text-slate-500 group-hover:text-primary transition-colors">
                    <span className="text-xs font-semibold tracking-wide">LEARN MORE</span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-[100px] rounded-tr-2xl`} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient-shift_3s_ease-in-out_infinite]" />
            
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-50 blur-xl group-hover:blur-2xl transition-all" />
            
            {/* Button Content */}
            <span className="relative z-10">Start Your Journey</span>
            <Rocket className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>

          <p className="mt-4 text-slate-500 text-sm">
            Join 500+ students on the path to grammar school success
          </p>
        </motion.div>
      </div>

      {/* Custom Animation Keyframe */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}
