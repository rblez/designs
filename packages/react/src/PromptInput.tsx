import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { promptDefaults, promptPlaceholders, typewriter, type PromptSubmit, type PromptTheme } from "@rblez-ui/tokens";
import { Icon } from "./Icon";

export interface PromptInputProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  plan?: boolean;
  onPlanChange?: (plan: boolean) => void;
  placeholder?: string | readonly string[];
  submitLabel?: string;
  theme?: PromptTheme;
  disabled?: boolean;
  accept?: string;
  onSubmit?: (data: PromptSubmit) => void;
  onDictate?: () => void;
  dictating?: boolean;
}

export function PromptInput({
  value: controlled, defaultValue = "", onValueChange,
  plan: planProp, onPlanChange,
  placeholder = promptPlaceholders, submitLabel = promptDefaults.submitLabel,
  theme = "auto", disabled = false, accept, onSubmit, onDictate, dictating = false,
}: PromptInputProps) {
  const [inner, setInner] = useState(defaultValue);
  const [planInner, setPlanInner] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [typed, setTyped] = useState("");
  const textarea = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const value = controlled ?? inner;
  const plan = planProp ?? planInner;
  const phrases = typeof placeholder === "string" ? [placeholder] : placeholder;
  const phraseKey = phrases.join("|");
  const empty = value.trim().length === 0 && files.length === 0;

  const setValue = (v: string) => { if (controlled === undefined) setInner(v); onValueChange?.(v); };
  const setPlan = (p: boolean) => { if (planProp === undefined) setPlanInner(p); onPlanChange?.(p); };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => typewriter(phrases, setTyped), [phraseKey]);

  useLayoutEffect(() => {
    const el = textarea.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(Math.max(el.scrollHeight, promptDefaults.minHeight), promptDefaults.maxHeight) + "px";
  }, [value]);

  const submit = () => {
    if (empty || disabled) return;
    onSubmit?.({ value: value.trim(), plan, files });
    setValue("");
    setFiles([]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit(); }
  };

  return (
    <div className="d-prompt" data-theme={theme}>
      <div className="d-prompt__box">
        {files.length > 0 && (
          <div className="d-prompt__files">
            {files.map((f, i) => (
              <span className="d-prompt__chip" key={f.name + i}>
                <span>{f.name}</span>
                <button type="button" aria-label={`Quitar ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}>×</button>
              </span>
            ))}
          </div>
        )}
        <div className="d-prompt__field" style={{ minHeight: promptDefaults.minHeight }}>
          {!value && (
            <div className="d-prompt__placeholder" aria-hidden="true">{typed}<span className="d-prompt__caret" /></div>
          )}
          <textarea
            ref={textarea}
            className="d-prompt__textarea"
            rows={1}
            aria-label={phrases[0]}
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div className="d-prompt__bar">
          <button type="button" className="d-prompt__btn d-prompt__add" aria-label="Add context, enhance your prompt, and more"
            disabled={disabled} onClick={() => fileInput.current?.click()}>
            <Icon name="plus" className="d-prompt__icon d-prompt__icon--lg" />
          </button>
          <div className="d-prompt__spacer" />
          <div className="d-prompt__group">
            <button type="button" className="d-prompt__btn d-prompt__plan" aria-pressed={plan} aria-label={promptDefaults.planLabel}
              onClick={() => setPlan(!plan)}>
              <Icon name="lightbulb" className="d-prompt__icon" /><span className="d-prompt__plan-label">{promptDefaults.planLabel}</span>
            </button>
            <button type="button" className="d-prompt__btn d-prompt__mic" aria-label="Start dictation" aria-pressed={dictating}
              disabled={!onDictate || disabled} onClick={() => onDictate?.()}>
              <Icon name="microphone" className="d-prompt__icon" />
            </button>
            <button type="button" className="d-prompt__send" aria-label="Send message" disabled={empty || disabled} onClick={submit}>
              <span className="d-prompt__send-label">{submitLabel}</span><Icon name="send" className="d-prompt__icon" />
            </button>
          </div>
        </div>
        <input ref={fileInput} className="d-prompt__file" type="file" multiple accept={accept} tabIndex={-1} aria-hidden="true"
          onChange={(e) => { const l = e.target.files; if (l) setFiles([...files, ...Array.from(l)]); e.target.value = ""; }} />
      </div>
    </div>
  );
}
