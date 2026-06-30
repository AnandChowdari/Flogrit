import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * TypewriterText — cycles through an array of phrases with a
 * type → pause → delete → pause animation loop.
 *
 * @param {string[]} phrases        — Array of strings to cycle through
 * @param {number}   typingSpeed    — ms per character when typing (default: 80)
 * @param {number}   deletingSpeed  — ms per character when deleting (default: 40)
 * @param {number}   pauseDuration  — ms to pause after full phrase typed (default: 2000)
 * @param {string}   className      — optional extra CSS classes for the text
 */
export default function TypewriterText({
  phrases = [],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
}) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  const currentPhrase = phrases[phraseIndex] || '';

  const tick = useCallback(() => {
    if (isDeleting) {
      // Deleting: remove last character
      setDisplayText((prev) => prev.slice(0, -1));
    } else {
      // Typing: add next character
      setDisplayText((prev) => currentPhrase.slice(0, prev.length + 1));
    }
  }, [isDeleting, currentPhrase]);

  useEffect(() => {
    // Determine delay based on current state
    let delay;

    if (!isDeleting && displayText === currentPhrase) {
      // Full phrase typed — pause before deleting
      delay = pauseDuration;
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeoutRef.current);
    }

    if (isDeleting && displayText === '') {
      // Fully deleted — move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      delay = typingSpeed;
      return;
    }

    // Normal typing or deleting
    delay = isDeleting ? deletingSpeed : typingSpeed;
    timeoutRef.current = setTimeout(tick, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentPhrase, tick, typingSpeed, deletingSpeed, pauseDuration, phrases.length]);

  return (
    <span className={className}>
      {displayText}
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
