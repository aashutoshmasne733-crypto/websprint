import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Toggle from '../components/ui/Toggle';
import { Settings as SettingsIcon, Save, Bell, Shield, Key, Palette, Download, Trash2 } from 'lucide-react';

export default function Settings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [revisionReminders, setRevisionReminders] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(false);
  const [accentColor, setAccentColor] = useState('violet');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Banner */}
      <Card bg="yellow" shadow="hard-lg" className="border-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="red" size="sm" icon={SettingsIcon}>HQ Configurations</Badge>
            <h1 className="font-heading text-2xl md:text-3xl font-black uppercase text-ink mt-1">
              Portal Settings
            </h1>
            <p className="text-xs font-mono text-ink/80">Configure your multiverse notification alerts, appearance tokens, & security.</p>
          </div>
          {savedSuccess && (
            <Badge variant="green" size="md">Settings Saved ✓</Badge>
          )}
        </div>
      </Card>

      {/* Account Settings */}
      <Card bg="cardWhite" shadow="hard-md" badge={<Badge variant="violet" size="sm">Security</Badge>} title="Account Security" className="border-3">
        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Email Address"
              type="email"
              defaultValue="miles.morales@earth1610.hq"
            />
            <Input
              label="Current Password"
              type="password"
              placeholder="••••••••••••"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="New Access Code"
              type="password"
              placeholder="Leave blank to keep current"
            />
            <Input
              label="Confirm New Access Code"
              type="password"
              placeholder="Confirm new password"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="primary" size="sm" icon={Save}>
              Save Security Changes
            </Button>
          </div>
        </form>
      </Card>

      {/* Notifications Section with Neubrutalist Toggles */}
      <Card bg="cardWhite" shadow="hard-md" badge={<Badge variant="yellow" size="sm">Alerts</Badge>} title="Notification Preferences" className="border-3">
        <div className="space-y-4">
          <Toggle
            label="Email Alerts for New Quests"
            description="Receive multiverse notifications when new training modules open."
            enabled={emailAlerts}
            onChange={setEmailAlerts}
            color="violet"
          />
          <div className="border-t border-ink/10" />

          <Toggle
            label="Revision Queue Reminders"
            description="Daily alert when spaced repetition flashcards are ready for review."
            enabled={revisionReminders}
            onChange={setRevisionReminders}
            color="green"
          />
          <div className="border-t border-ink/10" />

          <Toggle
            label="Daily Streak Danger Warnings"
            description="Push notifications if your streak is about to reset."
            enabled={streakAlerts}
            onChange={setStreakAlerts}
            color="red"
          />
        </div>
      </Card>

      {/* Appearance Accent Color Picker */}
      <Card bg="cardWhite" shadow="hard-md" badge={<Badge variant="green" size="sm">Theme</Badge>} title="Appearance Accent Color" className="border-3">
        <div className="space-y-3 font-mono">
          <p className="text-xs text-ink/80">Choose your primary superhero accent token for buttons and highlights:</p>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: 'violet', label: 'Violet (#7C3AED)', bg: 'bg-violet' },
              { id: 'red', label: 'Red (#E63946)', bg: 'bg-red' },
              { id: 'yellow', label: 'Yellow (#F4B400)', bg: 'bg-yellow' },
              { id: 'green', label: 'Green (#8BC34A)', bg: 'bg-green' },
              { id: 'blue', label: 'Blue (#3B82F6)', bg: 'bg-blue' }
            ].map((token) => (
              <button
                key={token.id}
                onClick={() => setAccentColor(token.id)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-ink text-xs font-bold font-heading transition-all
                  ${accentColor === token.id ? 'shadow-hard translate-x-0 -translate-y-0.5 border-ink bg-white' : 'bg-background hover:bg-white'}
                `}
              >
                <span className={`w-4 h-4 rounded-full border border-ink ${token.bg}`} />
                {token.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Privacy Section */}
      <Card bg="cardWhite" shadow="hard-md" badge={<Badge variant="outline" size="sm">Privacy</Badge>} title="Privacy & Telemetry Data" className="border-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-ink/80">
            Export your complete Earth-1610 learning history, quiz scores, and telemetry data.
          </div>
          <Button variant="secondary" size="md" icon={Download} onClick={() => alert('Exporting AdaptLearn telemetry data JSON...')}>
            Export Telemetry Data
          </Button>
        </div>
      </Card>
    </div>
  );
}
