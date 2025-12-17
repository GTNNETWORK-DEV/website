import { motion } from "framer-motion";
import {
  Activity,
  Briefcase,
  CheckCircle,
  ClipboardCheck,
  Cpu,
  Database,
  FileSearch,
  Gauge,
  Globe,
  Lightbulb,
  LineChart,
  Map,
  Network,
  Orbit,
  Radar,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { API_BASE } from "@/lib/api";
import { resolveMediaUrl } from "@/lib/media";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Project {
  logo: string | undefined;
  id: string;
  name: string;
  logo_url: string | null;
  link?: string | null;
}

export function GTNOngoingProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const emptyMessages = [
    { text: "Evaluating prospects", icon: Radar },
    { text: "Inspecting variables", icon: ScanLine },
    { text: "Scrutinizing team", icon: Users },
    { text: "Validating partnerships", icon: ShieldCheck },
    { text: "Mapping market signals", icon: Map },
    { text: "Aligning growth targets", icon: Target },
    { text: "Calibrating forecasts", icon: LineChart },
    { text: "Reviewing opportunity stack", icon: Briefcase },
    { text: "Cross-checking milestones", icon: ClipboardCheck },
    { text: "Strengthening network links", icon: Network },
    { text: "Monitoring traction", icon: TrendingUp },
    { text: "Auditing readiness", icon: CheckCircle },
    { text: "Indexing key assets", icon: Database },
    { text: "Benchmarking performance", icon: Gauge },
    { text: "Searching strategic fits", icon: FileSearch },
    { text: "Tracking signals", icon: Activity },
    { text: "Refining roadmaps", icon: Workflow },
    { text: "Scanning global lanes", icon: Globe },
    { text: "Testing system strength", icon: Cpu },
    { text: "Circling new ventures", icon: Orbit },
    { text: "Lighting growth paths", icon: Lightbulb },
    { text: "Elevating innovation", icon: Sparkles },
    { text: "Charging up new builds", icon: Zap },
  ];
  const [emptyIndex, setEmptyIndex] = useState(0);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_BASE}/projects`);
        const data = await res.json();

        // PHP gives logo_url → component needs logo
        const formatted = data.map((p: any) => ({
          ...p,
          logo: p.logo_url,
        }));

        setProjects(formatted);
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [API_BASE]);

  useEffect(() => {
    if (loading || projects.length > 0) return;

    const interval = setInterval(() => {
      setEmptyIndex((prev) => (prev + 1) % emptyMessages.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [loading, projects.length, emptyMessages.length]);

  useEffect(() => {
    if (!carouselApi || projects.length < 2) return;

    const interval = setInterval(() => {
      carouselApi.scrollNext();
    }, 6500);

    return () => clearInterval(interval);
  }, [carouselApi, projects.length]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    };
    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="section-title text-white mb-6">Ongoing Projects</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the exciting initiatives and ventures we're currently building within the GTN ecosystem.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading Projects...</p>
          </div>
        ) : projects.length === 0 ? (
          
          // NO PROJECTS
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <motion.div
              className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {(() => {
                const ActiveIcon = emptyMessages[emptyIndex].icon;
                return <ActiveIcon className="h-6 w-6 text-gray-500" />;
              })()}
            </motion.div>
            <motion.p
              className="text-gray-300 text-lg font-medium"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
            >
              {emptyMessages[emptyIndex].text}...
            </motion.p>
            <div className="mt-6 h-1 w-56 mx-auto rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full w-1/2 bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{ align: "start", loop: projects.length > 1 }}
              setApi={setCarouselApi}
              className="relative"
              style={{ perspective: "1200px" }}
            >
              <CarouselContent
                className="-ml-6 py-6"
                containerClassName="overflow-visible"
              >
                {projects.map((project, index) => (
                  <CarouselItem
                    key={project.id}
                    className="pl-6 md:basis-1/2 lg:basis-1/3"
                  >
                    <motion.div variants={itemVariants} className="h-full">
                      <CarouselDepthItem
                        index={index}
                        total={projects.length}
                        activeIndex={activeIndex}
                      >
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block h-full"
                          >
                            <div className="relative bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all h-full flex flex-col items-center">
                              <img
                                src={resolveMediaUrl(project.logo)}
                                alt={project.name}
                                className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform"
                              />
                              <h3 className="text-lg font-display font-bold text-white text-center mb-2 group-hover:text-primary transition-colors">
                                {project.name}
                              </h3>
                              <div className="flex items-center justify-center gap-2 text-primary text-sm font-semibold mt-auto">
                                Visit <ExternalLink className="w-4 h-4" />
                              </div>
                            </div>
                          </a>
                        ) : (
                          <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-xl p-8 backdrop-blur-lg hover:border-primary/30 transition-all h-full flex flex-col items-center">
                            <img
                              src={resolveMediaUrl(project.logo)}
                              alt={project.name}
                              className="w-32 h-32 object-contain mb-4 mx-auto group-hover:scale-110 transition-transform"
                            />
                            <h3 className="text-lg font-display font-bold text-white text-center">
                              {project.name}
                            </h3>
                          </div>
                        )}
                      </CarouselDepthItem>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function CarouselDepthItem({
  children,
  index,
  total,
  activeIndex,
}: {
  children: ReactNode;
  index: number;
  total: number;
  activeIndex: number;
}) {
  const delta = getCarouselDelta(index, activeIndex, total);
  const depth = Math.min(Math.abs(delta), 3);
  const scale = 1 - depth * 0.06;
  const opacity = depth === 0 ? 1 : depth === 1 ? 0.7 : 0.5;
  const translateY = depth * 10;
  const rotateY = delta * -10;
  const translateZ = depth * -40;

  return (
    <div
      className="h-full transition-[transform,opacity] duration-700 ease-out will-change-transform"
      style={{
        transform: `translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
        opacity,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

function getCarouselDelta(index: number, activeIndex: number, total: number) {
  let delta = index - activeIndex;
  if (total > 0) {
    const half = total / 2;
    if (delta > half) delta -= total;
    if (delta < -half) delta += total;
  }
  return delta;
}
