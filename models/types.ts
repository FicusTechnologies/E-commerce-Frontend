export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type PropWithBreakpoint<T> = Record<Breakpoint, T>
