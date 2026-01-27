import React, { useState } from 'react';
import { AptCard, AptCardHeader, AptCardTitle, AptCardContent, AptCardFooter } from '@/components/apt';
import { AptButton } from '@/components/apt';
import { AptTag } from '@/components/apt';

export type Scope = 'all' | 'design-system' | 'design-thinking' | 'design-architecture' | 'tokens' | 'ui';

const scopes: { value: Scope; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'design-system', label: 'Design System' },
  { value: 'design-thinking', label: 'Design Thinking' },
  { value: 'design-architecture', label: 'Design Architecture' },
  { value: 'tokens', label: 'Tokens' },
  { value: 'ui', label: 'UI Components' },
];


export const AssistantChat: React.FC = () => {
  const [scope, setScope] = useState<Scope>('all');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [answer, setAnswer] = useState('');
  const [citations, setCitations] = useState<any[]>([]);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [followups, setFollowups] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issueSubmitted, setIssueSubmitted] = useState(false);
  const [input, setInput] = useState('');

  // Always use /api/chat endpoint for backend requests
  const apiEndpoint = '/api/chat';

  async function sendMessage(content: string) {
    if (!content.trim()) return;
    setMessages((msgs) => [...msgs, { role: 'user', content }]);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      console.log('Sending request', apiEndpoint, { scope, messages: [...messages, { role: 'user', content }] });
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scope, messages: [...messages, { role: 'user', content }] }),
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        setError('Invalid response from server.');
        return;
      }
      if (!res.ok) {
        setError(data?.error || 'API error');
        return;
      }
      setAnswer(data.answer_markdown);
      setCitations(data.citations);
      setConfidence(data.confidence);
      setFollowups(data.followups);
      setMessages((msgs) => [...msgs, { role: 'assistant', content: data.answer_markdown }]);
    } catch (err) {
      setError('Failed to get response from assistant.');
    } finally {
      setLoading(false);
    }
  }

  function handleFollowup(fu: string) {
    sendMessage(fu);
  }


  function handleIssue() {
    setModalContent('');
    setShowModal(true);
    setIssueSubmitted(false);
  }

  const [reportStatus, setReportStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>("idle");
  const [userNote, setUserNote] = useState('');
  const [reportResult, setReportResult] = useState<{ reportId: string; github?: { issueNumber: number; issueUrl: string } } | null>(null);

  async function handleReportSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReportStatus('submitting');
    setReportResult(null);
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: messages[messages.length-1]?.content,
          scope,
          conversationId: undefined,
          lastAnswer: answer,
          topMatches: citations,
          userNote
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'API error');
      setReportResult(data);
      setReportStatus('success');
    } catch (err) {
      setReportStatus('error');
    }
  }

  function handleModalSubmit() {
    setIssueSubmitted(true);
    // Optionally, could trigger analytics or feedback event here
  }

  return (
    <AptCard variant="elevated" padding="compact" className="max-w-xl w-full mx-auto">
      <AptCardHeader>
        <AptCardTitle>APT Design Assistant</AptCardTitle>
        <div className="flex flex-wrap gap-2 mt-2" aria-label="Scope selector">
          {scopes.map((s) => (
            <span
              key={s.value}
              role="button"
              tabIndex={0}
              onClick={() => setScope(s.value)}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setScope(s.value)}
              aria-pressed={scope === s.value}
              className="outline-none focus:ring-2 focus:ring-primary rounded"
            >
              <AptTag
                variant={scope === s.value ? 'primary' : 'muted'}
                className="cursor-pointer"
              >
                {s.label}
              </AptTag>
            </span>
          ))}
        </div>
      </AptCardHeader>
      <AptCardContent className="flex flex-col gap-2 min-h-[220px]">
        {messages.length === 0 && (
          <div className="text-muted-foreground text-center py-8">Ask a question about APT design, systems, or UI.</div>
        )}
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === 'user'
                  ? 'flex items-end justify-end gap-2'
                  : 'flex items-start justify-start gap-2'
              }
            >
              {m.role === 'assistant' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">A</div>
              )}
              <div
                className={
                  'rounded-lg px-3 py-2 max-w-[75%] ' +
                  (m.role === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto shadow'
                    : 'bg-card text-foreground border border-border')
                }
              >
                <span className={m.role === 'user' ? 'font-semibold' : 'font-medium'}>{m.content}</span>
              </div>
              {m.role === 'user' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">U</div>
              )}
            </div>
          ))}
        </div>
        {loading && <div className="text-secondary">Assistant is thinking...</div>}
        {error && <div className="text-error">{error}</div>}
        {confidence !== null && (
          <div className="text-xs text-muted-foreground">{confidence > 0.7 ? 'Grounded' : 'Low confidence'}</div>
        )}
        {answer === 'Not found in APT docs yet.' && !loading && (
          <AptButton onClick={handleIssue} variant="accent" size="sm" className="mt-2">Create doc issue</AptButton>
        )}
        {followups.length > 0 && !loading && (
          <div className="flex flex-col gap-1 mt-2" aria-label="Follow-up suggestions">
            <span className="text-xs text-muted-foreground">Try a follow-up:</span>
            <div className="flex flex-wrap gap-1">
              {followups.map((fu, i) => (
                <AptButton key={i} onClick={() => handleFollowup(fu)} variant="ghost" size="sm">{fu}</AptButton>
              ))}
            </div>
          </div>
        )}
        <div className="bg-muted rounded p-2 mt-2">
          <div className="font-semibold text-xs mb-1">Sources</div>
          {citations.length === 0 ? <div className="text-xs text-muted-foreground">No sources found.</div> : citations.map((c, i) => (
            <details key={i} className="text-xs">
              <summary>{c.path} &gt; {c.headingPath} ({c.score.toFixed(2)})</summary>
              <div>Snippet ID: {c.snippetId}</div>
            </details>
          ))}
        </div>
      </AptCardContent>
      <AptCardFooter className="flex-col gap-2">
        <form
          className="flex gap-2 w-full"
          onSubmit={e => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask a question..."
            disabled={loading}
            aria-label="Chat input"
            className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <AptButton type="submit" disabled={loading || !input.trim()} size="sm">
            Send
          </AptButton>
        </form>
      </AptCardFooter>
      {showModal && (
        <div className="apt-modal" role="dialog" aria-modal="true">
          <div className="apt-modal-content">
            <h3>Report Missing Content</h3>
            <p>If you think this topic should be covered in APT docs, submit a report below. Optionally add a note to help us improve the docs.</p>
            <form onSubmit={handleReportSubmit} className="flex flex-col gap-2">
              <label className="text-xs font-semibold">Your question</label>
              <input type="text" value={messages[messages.length-1]?.content || ''} disabled className="bg-muted px-2 py-1 rounded" />
              <label className="text-xs font-semibold">Suggested section</label>
              <input type="text" value={scope} disabled className="bg-muted px-2 py-1 rounded" />
              <label className="text-xs font-semibold">Add a note (optional)</label>
              <textarea value={userNote} onChange={e => setUserNote(e.target.value)} maxLength={500} className="bg-background border border-border rounded px-2 py-1" placeholder="Describe what you expected or why this is important..." />
              <AptButton type="submit" disabled={reportStatus==='submitting'} size="sm" variant="accent">{reportStatus==='submitting' ? 'Submitting...' : 'Submit Report'}</AptButton>
            </form>
            {reportStatus==='success' && reportResult && (
              <div className="apt-modal-feedback mt-2">
                <div>Thank you! Your report was submitted.</div>
                <div>Report ID: <span className="font-mono">{reportResult.reportId}</span></div>
                {reportResult.github && (
                  <div>
                    GitHub Issue: <a href={reportResult.github.issueUrl} target="_blank" rel="noopener" className="underline">#{reportResult.github.issueNumber}</a>
                  </div>
                )}
              </div>
            )}
            {reportStatus==='error' && <div className="apt-modal-feedback text-error mt-2">Failed to submit report. Please try again later.</div>}
            <AptButton onClick={() => { setShowModal(false); setReportStatus('idle'); setUserNote(''); setReportResult(null); }} autoFocus size="sm" variant="secondary">Close</AptButton>
          </div>
        </div>
      )}
    </AptCard>
  );
}
