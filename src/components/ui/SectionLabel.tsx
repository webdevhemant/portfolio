interface Props { text: string }
export default function SectionLabel({ text }: Props) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
      {text}
    </span>
  )
}
