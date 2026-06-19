import React, { useEffect, useMemo, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const STORAGE_KEY = 'siet-chatbot-history';

const resourceLinks = {
  admissions: '/academics/admission-prospectus',
  syllabus: '/academics/syllabus',
  notices: '/all-notices',
  placements: '/training-and-placements',
  facilities: '/facilities/infrastructure',
};

const suggestedQuestions = [
  'How can I apply for admission?',
  'What courses are offered at SIET?',
  'What is the fee structure?',
  'How are placements at SIET?',
  'Where can I see latest notices?'
];

const quickActions = [
  { label: 'Admissions', message: 'Show me admission details' },
  { label: 'Placements', message: 'Tell me about placements' },
  { label: 'Facilities', message: 'What facilities are available?' },
  { label: 'Notices', message: 'Show latest notices' },
];

const botReplies = {
  admission: 'Admissions are open for the 2026-27 session. You can check the notices and prospectus links in Academics.',
  departments: 'SIET offers six B.Tech programs with modern labs and project-based learning.',
  placements: 'The placement cell provides aptitude, technical, and interview preparation with recruiter engagement year-round.',
  fees: 'You can find fee and admission-related PDFs in the academics document section.',
  default: 'Thanks for your message. I can help with admissions, departments, placements, and campus facilities.'
};

const botGreeting = {
  id: 1,
  role: 'bot',
  text: 'Hello! I am SIET assistant. Ask me about admissions, academics, placements, and campus facilities.',
  time: Date.now(),
  links: [
    { label: 'Admission Prospectus', href: resourceLinks.admissions },
    { label: 'All Notices', href: resourceLinks.notices },
  ],
};

const formatTime = (timestamp) => {
  const value = new Date(timestamp || Date.now());
  return value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const normalizeStoredMessages = (storedValue) => {
  if (!Array.isArray(storedValue) || storedValue.length === 0) {
    return [botGreeting];
  }

  return storedValue
    .filter((item) => item && typeof item.text === 'string' && typeof item.role === 'string')
    .map((item, index) => ({
      id: Number.isFinite(item.id) ? item.id : index + 1,
      role: item.role === 'user' ? 'user' : 'bot',
      text: item.text,
      time: Number.isFinite(item.time) ? item.time : Date.now(),
      links: Array.isArray(item.links) ? item.links : [],
    }));
};

const getReply = (message) => {
  const value = message.toLowerCase();
  if (value.includes('admission') || value.includes('apply') || value.includes('form')) {
    return {
      text: `${botReplies.admission} You can open the Query Form page from the Academics menu.`,
      links: [
        { label: 'Admission Prospectus', href: resourceLinks.admissions },
        { label: 'All Notices', href: resourceLinks.notices },
      ],
    };
  }
  if (value.includes('department') || value.includes('course') || value.includes('branch')) {
    return {
      text: `${botReplies.departments} Current B.Tech options include Computer Science & Engineering, CSE (AI & ML), CSE (Cyber Security), Robotics & Automation, Electrical Engineering, and Electronics Engineering (VLSI Design).`,
      links: [{ label: 'Syllabus Hub', href: resourceLinks.syllabus }],
    };
  }
  if (value.includes('placement') || value.includes('job') || value.includes('recruiter')) {
    return {
      text: `${botReplies.placements} For T&P specific updates, use the Training & Placements link in navbar.`,
      links: [{ label: 'Training & Placements', href: resourceLinks.placements }],
    };
  }
  if (value.includes('fee') || value.includes('scholarship') || value.includes('prospectus')) {
    return {
      text: `${botReplies.fees} Check the All Notices page for latest downloadable PDFs.`,
      links: [
        { label: 'Admission Prospectus', href: resourceLinks.admissions },
        { label: 'All Notices', href: resourceLinks.notices },
      ],
    };
  }
  if (value.includes('notice') || value.includes('update') || value.includes('announcement')) {
    return {
      text: 'Latest notices are available on the home notices strip and the All Notices page.',
      links: [{ label: 'Open All Notices', href: resourceLinks.notices }],
    };
  }
  if (value.includes('hostel') || value.includes('library') || value.includes('sports') || value.includes('facility')) {
    return {
      text: 'Campus facilities information is available in the Facilities submenu (Hostels, Library, Sports, Smart Classrooms, Labs, Cafeteria, Healthcare, Security).',
      links: [{ label: 'Facilities Overview', href: resourceLinks.facilities }],
    };
  }
  if (value.includes('contact') || value.includes('phone') || value.includes('email')) {
    return {
      text: 'Use the Contact button in navbar/footer details to reach institute support.',
      links: [],
    };
  }
  return {
    text: botReplies.default,
    links: [
      { label: 'Admission Prospectus', href: resourceLinks.admissions },
      { label: 'All Notices', href: resourceLinks.notices },
    ],
  };
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isCompactMobile = useMediaQuery('(max-width: 560px)');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [input, setInput] = useState('');
  const messagesRef = useRef(null);
  const replyTimerRef = useRef(null);
  const isOpenRef = useRef(false);
  const [messages, setMessages] = useState(() => {
    const storage = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (storage) {
      try {
        return normalizeStoredMessages(JSON.parse(storage));
      } catch {
        return [botGreeting];
      }
    }
    return [botGreeting];
  });
  const messageIdRef = useRef(Math.max(0, ...messages.map((m) => Number(m.id) || 0)) + 1);

  // Only show suggestions when conversation has just the greeting (no user messages yet)
  const hasUserMessages = useMemo(() => messages.some((m) => m.role === 'user'), [messages]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [messages, isOpen]);

  useEffect(() => () => {
    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
    }
  }, []);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const nextId = () => {
    const id = messageIdRef.current;
    messageIdRef.current += 1;
    return id;
  };

  const createMessage = (role, text, links = [], time) => ({
    id: nextId(),
    role,
    text,
    time,
    links,
  });

  const queueBotReply = (text) => {
    const reply = getReply(text);
    setIsTyping(true);

    if (replyTimerRef.current) {
      window.clearTimeout(replyTimerRef.current);
    }

    replyTimerRef.current = window.setTimeout(() => {
      const botTime = Date.now();
      setMessages((prev) => [...prev, createMessage('bot', reply.text, reply.links || [], botTime)]);
      if (!isOpenRef.current) {
        setUnreadCount((count) => count + 1);
      }
      setIsTyping(false);
    }, 520);
  };

  const appendUserAndReply = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, createMessage('user', text, [])]);
    queueBotReply(text);
  };

  const handleSend = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    appendUserAndReply(text);
    setInput('');
  };

  const sendSuggestedQuestion = (question) => {
    appendUserAndReply(question);
  };

  const sendQuickAction = (question) => {
    appendUserAndReply(question);
  };

  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        setUnreadCount(0);
      }
      return next;
    });
  };

  const clearChat = () => {
    const resetTime = Date.now();
    const reset = [
      {
        id: 1,
        role: 'bot',
        text: 'Chat reset. Ask anything about SIET.',
        time: resetTime,
        links: [{ label: 'All Notices', href: resourceLinks.notices }],
      },
    ];
    setMessages(reset);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reset));
    setUnreadCount(0);
    messageIdRef.current = 2;
  };

  return (
    <div className="chatbot-widget" aria-live="polite">
      {isOpen && (
        <section className="chatbot-panel">
          <header className="chatbot-header">
            <div className="chatbot-header-title-wrap">
              <span className="chatbot-avatar" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="presentation">
                  <path d="M7 10a5 5 0 1 1 10 0v3.1A3.9 3.9 0 0 1 13.1 17H11a4 4 0 0 1-4-4V10Zm5-6a6 6 0 0 0-6 6v3a5 5 0 0 0 5 5h2.1a4.9 4.9 0 0 0 4.9-4.9V10a6 6 0 0 0-6-6Zm-6 6H4v4h2v-4Zm14 0h-2v4h2v-4Z" />
                </svg>
              </span>
              <div>
                <h3>SIET Assistant</h3>
                <p className="chatbot-status">Online now</p>
              </div>
            </div>
            <button type="button" onClick={clearChat} className="chatbot-clear-btn">Reset</button>
          </header>

          <div className="chatbot-actions" aria-label="Quick actions">
            {quickActions.map((action) => (
              <button key={action.label} type="button" className="chatbot-action-chip" onClick={() => sendQuickAction(action.message)}>
                {action.label}
              </button>
            ))}
          </div>

          <div className="chatbot-messages" ref={messagesRef}>
            {messages.map((message) => (
              <article key={message.id} className={`chat-message-wrap ${message.role}`}>
                {message.role === 'bot' ? <span className="chat-message-role">SIET</span> : null}
                <p className={`chat-message ${message.role}`}>
                  {message.text}
                </p>
                {Array.isArray(message.links) && message.links.length > 0 ? (
                  <div className="chat-message-links">
                    {message.links.map((link) => (
                      <a key={`${message.id}-${link.href}`} href={link.href} className="chat-inline-link">
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}
                <span className="chat-message-time">{formatTime(message.time)}</span>
              </article>
            ))}

            {isTyping ? (
              <article className="chat-message-wrap bot typing">
                <span className="chat-message-role">SIET</span>
                <p className="chat-message bot chat-typing-indicator" aria-label="Assistant is typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </p>
              </article>
            ) : null}
          </div>

          {/* Only show suggestions when there are no user messages yet */}
          {!hasUserMessages && (
            <div className="chatbot-suggestions" id="chatbot-suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => sendSuggestedQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit" disabled={!canSend}>Send</button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-expanded={isOpen}
        aria-label="Toggle chatbot"
      >
        <span className="chatbot-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation">
            <path d="M12 2a9 9 0 0 0-7.74 13.58L3 21l5.65-1.19A9 9 0 1 0 12 2Zm0 2a7 7 0 0 1 6.07 10.48l-.27.45.79 3.38-3.48-.73-.43.24A7 7 0 1 1 12 4Zm-3.5 6.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm3.5 0a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm3.5 0a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" />
          </svg>
        </span>
        <span>{isOpen ? (isCompactMobile ? 'Close' : 'Close Chat') : (isCompactMobile ? 'Chat' : 'Chat with SIET')}</span>
        {!isOpen && unreadCount > 0 ? <span className="chatbot-unread-badge">{Math.min(unreadCount, 9)}</span> : null}
      </button>
    </div>
  );
};

export default ChatbotWidget;
