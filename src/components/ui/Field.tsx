import { type ComponentProps, useId } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

const control =
  'peer w-full rounded-2xl bg-white px-5 text-[15px] text-navy ring-1 ring-sky-200 outline-none transition-[box-shadow,background-color] duration-300 placeholder:text-transparent hover:ring-teal/40 focus:ring-2 focus:ring-teal'
const floating =
  'pointer-events-none absolute left-5 top-4 origin-left text-[15px] text-slate transition-all duration-300 ease-out-expo peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:text-teal peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold'

/** Text input with a floating label. */
export function TextField({ label, className, ...props }: { label: string } & ComponentProps<'input'>) {
  const id = useId()
  return (
    <div className={cn('relative', className)}>
      <input id={id} placeholder={label} className={cn(control, 'h-14 pt-4')} {...props} />
      <label htmlFor={id} className={floating}>
        {label}
        {props.required && <span className="text-teal"> *</span>}
      </label>
    </div>
  )
}

export function TextArea({ label, className, ...props }: { label: string } & ComponentProps<'textarea'>) {
  const id = useId()
  return (
    <div className={cn('relative', className)}>
      <textarea id={id} placeholder={label} rows={5} className={cn(control, 'resize-none pt-7 pb-3')} {...props} />
      <label htmlFor={id} className={floating}>
        {label}
      </label>
    </div>
  )
}

export function SelectField({
  label,
  options,
  className,
  ...props
}: { label: string; options: { value: string; label: string }[] } & ComponentProps<'select'>) {
  const id = useId()
  return (
    <div className={cn('relative', className)}>
      <select id={id} className={cn(control, 'h-14 appearance-none pt-4')} {...props}>
        <option value="" disabled hidden />
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-5 font-semibold transition-all duration-300',
          props.value ? 'top-2 text-[11px] text-teal' : 'top-4 text-[15px] font-normal text-slate',
        )}
      >
        {label}
        {props.required && <span className="text-teal"> *</span>}
      </label>
      <Icon name="chevronDown" size={18} className="pointer-events-none absolute top-1/2 right-5 -translate-y-1/2 text-slate" />
    </div>
  )
}

export function Checkbox({
  label,
  checked,
  onChange,
  className,
}: {
  label: React.ReactNode
  checked: boolean
  onChange: (v: boolean) => void
  className?: string
}) {
  return (
    <label className={cn('group flex cursor-pointer items-start gap-3 text-sm text-slate', className)}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-white ring-1 ring-navy/20 transition-all duration-300 group-hover:ring-teal peer-checked:bg-teal peer-checked:ring-teal peer-focus-visible:ring-2 peer-focus-visible:ring-teal">
        <Icon name="check" size={14} strokeWidth={3} className={cn('text-white transition-transform duration-300', checked ? 'scale-100' : 'scale-0')} />
      </span>
      <span>{label}</span>
    </label>
  )
}
