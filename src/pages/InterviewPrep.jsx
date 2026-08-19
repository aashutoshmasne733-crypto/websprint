import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import { Briefcase, Send, Terminal, Play, RotateCcw, Sparkles } from 'lucide-react';

export default function InterviewPrep() {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Welcome to your multiverse AI mock interview! I've analyzed progress in 0 courses, let's test your perception."
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = { sender: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate AI response slinger
    setTimeout(() => {
      const aiReply = {
        sender: 'ai',
        text: `Supercharged response received. Analyzing Earth-1610 telemetry context. Let's proceed to the next system design drill!`
      };
      setMessages(prev => [...prev, aiReply]);
    }, 1000);
  };

  const handleResetSession = () => {
    setMessages([
      {
        sender: 'ai',
        text: "Welcome to your multiverse AI mock interview! I've analyzed progress in 0 courses, let's test your perception."
      }
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-mono select-none">
      {/* Header Banner matching Sketch #4 */}
      <Card bg="violet" shadow="hard-lg" className="border-3 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="yellow" size="sm" icon={Briefcase}>
              AI SIMULATION
            </Badge>
            <h1 className="font-heading text-2xl md:text-4xl font-black uppercase mt-1">
              Multiverse Interview Prep
            </h1>
            <p className="text-xs md:text-sm font-mono text-white/90">
              Interactive chatbot simulator for testing inter-dimensional engineering skills.
            </p>
          </div>

          <Button variant="yellow" size="md" icon={RotateCcw} onClick={handleResetSession}>
            New Session
          </Button>
        </div>
      </Card>

      {/* Main Chat Interface matching Sketch #4 */}
      <Card
        bg="cardWhite"
        shadow="hard-lg"
        badge={<Badge variant="yellow" size="sm">Conceptual Intermediate</Badge>}
        title="AI Interview Chatbot Simulator"
        className="border-3"
      >
        <div className="space-y-4">
          {/* Chat Window */}
          <div className="h-80 overflow-y-auto p-4 rounded-xl bg-background border-2 border-ink space-y-3.5 shadow-hard-sm">
            {messages.map((m, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-xl border-2 border-ink max-w-xl font-mono text-xs md:text-sm shadow-xs leading-relaxed
                  ${m.sender === 'ai'
                    ? 'bg-yellow text-ink mr-auto'
                    : 'bg-white text-ink ml-auto'}
                `}
              >
                <div className="font-bold text-[10px] uppercase opacity-75 mb-1">
                  {m.sender === 'ai' ? '🤖 MULTIVERSE AI INSTRUCTOR' : '🦸‍♂️ MILES MORALES (YOU)'}
                </div>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          {/* Typing Form matching Sketch #4 */}
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="your answer..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="primary" size="md" icon={Send}>
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
