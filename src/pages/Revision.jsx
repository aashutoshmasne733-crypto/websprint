import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { initialKanbanCards } from '../data/mockData';
import { RotateCcw, CheckCircle2, ArrowRight, ArrowLeft, Sparkles, CheckSquare, Layers, PlayCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Revision() {
  const navigate = useNavigate();
  const [kanbanCards, setKanbanCards] = useState([]);
  const [clearedMessage, setClearedMessage] = useState('');
  const [activeDeckTab, setActiveDeckTab] = useState('kanban'); // 'spkr' | 'kanban'
  const userId = localStorage.getItem('userId') || 'u1';

  const fetchCards = () => {
    fetch(`http://localhost:3001/api/revision/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setKanbanCards(data);
        }
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    fetchCards();
  }, [userId]);

  const moveCard = async (id, targetColumn) => {
    // Optimistic UI update
    setKanbanCards(prev => prev.map(c => c.id === id ? { ...c, column: targetColumn } : c));
    try {
      await fetch(`http://localhost:3001/api/revision/${userId}/move`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: id, newColumn: targetColumn })
      });
    } catch (err) {}
  };

  const handleQueueClear = async () => {
    const toReviewItems = kanbanCards.filter(c => c.column === 'to-review');
    if (toReviewItems.length > 0) {
      try {
        await fetch(`http://localhost:3001/api/revision/${userId}/clear`, { method: 'POST' });
        setClearedMessage('🎉 Multiverse Revision Queue Cleared! All topics moved to Mastered!');
        fetchCards();
      } catch (err) {}
    } else {
      // Offline / reset trigger
      setClearedMessage('🔄 Queue reset with new revision topics.');
      fetchCards();
    }
    setTimeout(() => setClearedMessage(''), 3000);
  };

  const toReviewList = kanbanCards.filter(c => c.column === 'to-review');
  const inProgressList = kanbanCards.filter(c => c.column === 'in-progress');
  const masteredList = kanbanCards.filter(c => c.column === 'mastered');

  const renderColumn = (title, items, colId, badgeColor) => (
    <Card
      bg="cardWhite"
      shadow="hard-lg"
      badge={<Badge variant={badgeColor} size="sm">{items.length} Items</Badge>}
      title={title}
      className="border-3 flex-1 flex flex-col justify-between"
      bodyClassName="space-y-3 p-4 min-h-[380px]"
    >
      {items.length === 0 ? (
        <div className="p-6 border-2 border-dashed border-ink rounded-xl text-center space-y-2 my-auto">
          <div className="text-3xl">✨</div>
          <div className="font-heading text-sm font-bold text-ink">Nothing here yet, hero.</div>
          <div className="text-[11px] font-mono text-ink/60">Column clear for dimension 1610!</div>
        </div>
      ) : (
        items.map((card) => (
          <div
            key={card.id}
            className="p-3.5 rounded-xl border-2 border-ink bg-white shadow-hard-sm space-y-2 hover:bg-background transition-colors"
          >
            <div className="flex items-center justify-between gap-1">
              <Badge variant={card.difficulty === 'Hard' ? 'red' : (card.difficulty === 'Medium' ? 'yellow' : 'green')} size="sm">
                {card.difficulty}
              </Badge>
              <span className="text-[10px] font-mono font-bold text-ink/60">{card.dueDate}</span>
            </div>

            <h4 className="font-heading text-sm font-bold text-ink leading-tight">{card.topic}</h4>
            <div className="text-[10px] font-mono text-violet font-bold truncate">📚 {card.sourceCourse}</div>

            <div className="pt-2 border-t border-ink/10 flex items-center justify-between">
              {colId !== 'to-review' ? (
                <button
                  onClick={() => moveCard(card.id, colId === 'mastered' ? 'in-progress' : 'to-review')}
                  className="p-1 rounded bg-background border border-ink hover:bg-yellow text-ink transition-colors"
                  title="Move Left"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              ) : <div />}

              {colId !== 'mastered' ? (
                <button
                  onClick={() => moveCard(card.id, colId === 'to-review' ? 'in-progress' : 'mastered')}
                  className="p-1 rounded bg-background border border-ink hover:bg-green text-ink transition-colors flex items-center gap-1 text-[10px] font-bold"
                  title="Move Right"
                >
                  Advance <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : <span className="text-[10px] font-mono text-green font-bold flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Mastered</span>}
            </div>
          </div>
        ))
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Card matching Sketch #1 */}
      <Card bg="red" shadow="hard-lg" className="border-3 text-white relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            {/* Yellow Tag from Sketch 1 */}
            <Badge variant="yellow" size="sm" icon={Sparkles}>
              SPACED REPETITION ENGINE
            </Badge>
            {/* Title from Sketch 1 */}
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase mt-1">
              MULTIVERSE REVISION DECK
            </h1>
            {/* Subtext from Sketch 1 */}
            <p className="text-xs md:text-sm font-mono text-white/90 max-w-2xl leading-relaxed">
              Reinforce neural from completed missions, AI transcripts, breakdown & mastery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="yellow"
              size="md"
              icon={toReviewList.length > 0 ? CheckSquare : RotateCcw}
              onClick={handleQueueClear}
            >
              {toReviewList.length > 0 ? `Queue Clear (${toReviewList.length})` : 'Reset Revision Queue'}
            </Button>
          </div>
        </div>
      </Card>

      {clearedMessage && (
        <div className="p-3 bg-yellow text-ink font-heading font-bold text-sm rounded-xl border-2 border-ink shadow-hard-sm animate-bounce text-center">
          {clearedMessage}
        </div>
      )}

      {/* Completed Missions & Study Deck Section (Sketch #1) */}
      <Card bg="cardWhite" shadow="hard-md" className="border-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b-2 border-ink">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-yellow border-2 border-ink flex items-center justify-center font-heading font-black text-sm">
              4
            </div>
            <div className="font-heading text-base font-bold text-ink">
              Completed Missions & Study Deck
            </div>
          </div>

          <div className="text-xs font-mono font-bold text-violet bg-violet/10 px-3 py-1.5 rounded-lg border border-ink">
            0 Pending Revision Missions
          </div>
        </div>

        {/* Empty State Box matching Sketch #1 */}
        <div className="mt-4 p-8 border-2 border-dashed border-ink rounded-xl bg-background text-center space-y-3 max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-ink">
            <div className="w-10 h-10 rounded-lg bg-white border-2 border-ink flex items-center justify-center shadow-hard-sm">
              📖
            </div>
            <div className="w-10 h-10 rounded-lg bg-yellow border-2 border-ink flex items-center justify-center shadow-hard-sm">
              🎥
            </div>
          </div>
          <div className="font-heading text-base font-bold text-ink">
            Your Multiverse Revision Queue is empty.
          </div>
          <p className="text-xs font-mono text-ink/70">
            Watch video mission or complete a new module to generate spaced repetition cards.
          </p>
          <div className="pt-1">
            <Button variant="primary" size="md" icon={PlayCircle} onClick={() => navigate('/courses')}>
              Start Video Mission
            </Button>
          </div>
        </div>
      </Card>

      {/* 3 Kanban Columns Deck */}
      <div className="space-y-3">
        <div className="font-heading text-lg font-bold text-ink flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet" />
          Multiverse Spaced Repetition Kanban Columns
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {renderColumn('To Review', toReviewList, 'to-review', 'red')}
          {renderColumn('In Progress', inProgressList, 'in-progress', 'yellow')}
          {renderColumn('Mastered', masteredList, 'mastered', 'green')}
        </div>
      </div>
    </div>
  );
}
