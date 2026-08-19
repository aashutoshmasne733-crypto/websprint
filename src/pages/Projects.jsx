import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { projectsData } from '../data/mockData';
import { FolderGit2, Plus, ExternalLink, Github, Sparkles, Code, CheckCircle2, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(projectsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleCreateProject = () => {
    if (!newTitle) return;
    const created = {
      id: `p-${Date.now()}`,
      title: newTitle,
      tech: newTech ? newTech.split(',').map(t => t.trim()) : ['React', 'Tailwind'],
      status: 'In Progress',
      statusColor: 'yellow',
      level: 'Custom Mission',
      desc: newDesc || 'Supercharged field mission initialized on Earth-1610.',
      grade: 'In Progress',
      date: new Date().toISOString().split('T')[0]
    };
    setProjects([created, ...projects]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewTech('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner matching Sketch #5 */}
      <Card bg="yellow" shadow="hard-lg" className="border-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="red" size="sm" icon={FolderGit2}>
              MULTIVERSE HUB
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black text-ink uppercase mt-1">
              ADAPTIVE PORTFOLIO MISSIONS
            </h1>
            <p className="text-xs md:text-sm font-mono text-ink/80 mt-1 max-w-xl">
              Hands-on superhero capstone projects designed for portfolio showcase across dimensions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="white" size="md">Beginner to Master</Badge>
            <Button variant="black" size="md" icon={Plus} onClick={() => setIsModalOpen(true)}>
              + New Mission
            </Button>
          </div>
        </div>
      </Card>

      {/* Grid of Project Cards matching Sketch #5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <Card key={p.id} bg="cardWhite" shadow="hard-md" className="border-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant={p.statusColor} size="sm">{p.status}</Badge>
                <span className="text-[10px] font-mono text-ink/60 font-bold">{p.level}</span>
              </div>

              <h3 className="font-heading text-lg font-bold text-ink leading-tight">{p.title}</h3>
              <p className="text-xs font-mono text-ink/80 line-clamp-3 leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-background border border-ink text-[10px] font-mono font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Red "Start Mission" button matching Sketch #5 */}
            <div className="pt-4 mt-4 border-t-2 border-ink/15 flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-violet">{p.grade}</span>
              <Button
                variant="primary"
                size="sm"
                icon={PlayCircle}
                onClick={() => alert(`Starting field mission: ${p.title}`)}
              >
                Start Mission (Red)
              </Button>
            </div>
          </Card>
        ))}

        {/* "+ New Mission" Card (Dashed border placeholder) */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="p-8 border-3 border-dashed border-ink rounded-xl bg-cardWhite/50 hover:bg-white hover:border-solid shadow-hard-sm hover:shadow-hard transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-3 min-h-[260px] group"
        >
          <div className="w-12 h-12 rounded-xl bg-yellow border-2 border-ink flex items-center justify-center text-ink shadow-hard-sm group-hover:scale-110 transition-transform">
            <Plus className="w-6 h-6 stroke-[3]" />
          </div>
          <div className="font-heading text-lg font-bold text-ink">+ Create New Mission</div>
          <p className="text-xs font-mono text-ink/60 max-w-xs">Initialize a new superhero field project capstone</p>
        </div>
      </div>

      {/* New Mission Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Initialize New Field Mission"
        subtitle="Earth-1610 Capstone Registration"
        primaryAction={handleCreateProject}
        primaryActionText="Create Mission"
      >
        <div className="space-y-4">
          <Input
            label="Mission Title"
            placeholder="e.g. Modern Portal Builder"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <Input
            label="Tech Stack (Comma Separated)"
            placeholder="e.g. React, Next.js, Tailwind"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
          />
          <div className="space-y-1 font-mono">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink">
              Mission Description
            </label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe the superhero capstone objective..."
              className="w-full border-2 border-ink rounded-lg bg-white p-3 text-xs md:text-sm font-mono text-ink shadow-hard-sm focus:shadow-hard focus:outline-none"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
