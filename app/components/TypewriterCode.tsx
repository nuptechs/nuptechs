"use client";
import { useEffect, useRef, useState } from "react";

const STATUS_CHIPS = [
  { label: "CI", value: "PASS", tone: "green" },
  { label: "OBS", value: "LIVE", tone: "cyan" },
  { label: "AI", value: "94%", tone: "purple" },
];

const METRICS = [
  { label: "systems", value: "14 live" },
  { label: "tests", value: "7,050+" },
  { label: "latency", value: "42ms" },
];

const CODE_LINES = [
  { text: "const", cls: "tk-keyword" },
  { text: " sentinel ", cls: "tk-var" },
  { text: "= ", cls: "tk-op" },
  { text: "await", cls: "tk-keyword" },
  { text: " Sentinel", cls: "tk-type" },
  { text: ".", cls: "tk-op" },
  { text: "init", cls: "tk-fn" },
  { text: "({", cls: "tk-brace" },
  { text: "\n  project", cls: "tk-prop" },
  { text: ": ", cls: "tk-op" },
  { text: '"easynup"', cls: "tk-str" },
  { text: ",", cls: "tk-op" },
  { text: "\n  ai", cls: "tk-prop" },
  { text: ": ", cls: "tk-op" },
  { text: '"claude-4"', cls: "tk-str" },
  { text: ",", cls: "tk-op" },
  { text: "\n  layers", cls: "tk-prop" },
  { text: ": [", cls: "tk-brace" },
  { text: '"browser"', cls: "tk-str" },
  { text: ", ", cls: "tk-op" },
  { text: '"network"', cls: "tk-str" },
  { text: ", ", cls: "tk-op" },
  { text: '"server"', cls: "tk-str" },
  { text: ", ", cls: "tk-op" },
  { text: '"database"', cls: "tk-str" },
  { text: "]", cls: "tk-brace" },
  { text: "\n})", cls: "tk-brace" },
  { text: "\n\n", cls: "" },
  { text: "const", cls: "tk-keyword" },
  { text: " finding ", cls: "tk-var" },
  { text: "= ", cls: "tk-op" },
  { text: "await", cls: "tk-keyword" },
  { text: " sentinel", cls: "tk-var" },
  { text: ".", cls: "tk-op" },
  { text: "diagnose", cls: "tk-fn" },
  { text: "(", cls: "tk-brace" },
  { text: "session", cls: "tk-var" },
  { text: ")", cls: "tk-brace" },
  { text: "\n", cls: "" },
  { text: "// → { rootCause: 'N+1 query in ContractService',", cls: "tk-comment" },
  { text: "\n", cls: "" },
  { text: "//     confidence: 0.94, fix: Diff[3 files] }", cls: "tk-comment" },
];

export default function TypewriterCode() {
  const [visibleChars, setVisibleChars] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  const totalChars = CODE_LINES.reduce((sum, t) => sum + t.text.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          let i = 0;
          const type = () => {
            if (i <= totalChars) {
              setVisibleChars(i);
              i++;
              setTimeout(type, 18 + Math.random() * 22);
            }
          };
          type();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [totalChars]);

  // Build visible text
  let charCount = 0;
  const rendered = CODE_LINES.map((token, idx) => {
    const start = charCount;
    charCount += token.text.length;
    if (start >= visibleChars) return null;
    const visible = token.text.slice(0, Math.max(0, visibleChars - start));
    return (
      <span key={idx} className={token.cls}>
        {visible}
      </span>
    );
  });

  return (
    <div ref={containerRef} className="code-window command-center">
      <div className="code-window__bar">
        <span className="code-window__dot code-window__dot--red" />
        <span className="code-window__dot code-window__dot--yellow" />
        <span className="code-window__dot code-window__dot--green" />
        <span className="code-window__title">sentinel.config.ts</span>
        <div className="command-center__hud" aria-label="system status">
          {STATUS_CHIPS.map((chip) => (
            <span key={chip.label} className={`command-chip command-chip--${chip.tone}`}>
              <span className="command-chip__dot" aria-hidden="true" />
              {chip.label} {chip.value}
            </span>
          ))}
        </div>
      </div>

      <div className="command-center__body">
        <pre className="code-window__body">
          <code>
            {rendered}
            <span className="code-cursor" />
          </code>
        </pre>

        <div className="command-center__metrics" aria-label="live engineering metrics">
          {METRICS.map((metric) => (
            <div key={metric.label} className="command-metric">
              <span className="command-metric__label">{metric.label}</span>
              <span className="command-metric__value">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
