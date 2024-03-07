<script setup lang="ts">
interface TypographyProps {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'body5'
    | 'body6'
    | 'body7'
    | 'body8'
  bold?: boolean
  italic?: boolean
  uppercase?: boolean
  underline?: boolean
  color?: string
}

const props = withDefaults(defineProps<TypographyProps>(), {
  variant: 'body4',
  color: 'primary',
})

const tag = computed(() => {
  if (props.variant.startsWith('h')) {
    return props.variant
  }

  return 'p'
})

const fontWeight = computed(() => {
  if (tag.value !== 'p') {
    return props.bold ? 'font-semibold' : 'font-medium'
  }

  return props.bold ? 'font-medium' : 'font-normal'
})

const typographyClass = computed(() => {
  return [
    fontWeight.value,
    props.italic && 'italic',
    props.uppercase && 'uppercase',
    props.underline && 'underline underline-offset-2',
    props.color && `text-${props.color}`,
    props.variant,
  ].filter(Boolean)
})
</script>

<template>
  <component :is="tag" :class="typographyClass">
    <slot></slot>
  </component>
</template>

<style scoped>
.h1 {
  font-size: 5.625rem;
  line-height: 7.875rem; /* 140% */
}
.h2 {
  font-size: 4.375rem;
  line-height: 6.125rem; /* 140% */
}
.h3 {
  font-size: 3.125rem;
  line-height: 4.375rem; /* 140% */
}
.h4 {
  font-size: 2.5rem;
  line-height: 3.5rem; /* 140% */
}
.h5 {
  font-size: 1.875rem;
  line-height: 2.625rem; /* 140% */
}
.h6 {
  font-size: 1.25rem;
  line-height: 1.75rem; /* 140% */
}
.h7 {
  font-size: 1rem;
  line-height: 1.375rem; /* 137.5% */
}

.body1 {
  font-size: 2.125rem;
  line-height: 2.9375rem; /* 138.235% */
  letter-spacing: 0.01063rem;
}
.body2 {
  font-size: 1.875rem;
  line-height: 2.625rem; /* 140% */
  letter-spacing: 0.00938rem;
}
.body3 {
  font-size: 1.625rem;
  line-height: 2.25rem; /* 138.462% */
  letter-spacing: 0.00813rem;
}
.body4 {
  font-size: 1.4375rem;
  line-height: 2rem; /* 139.13% */
  letter-spacing: 0.00719rem;
}
.body5 {
  font-size: 1.125rem;
  line-height: 1.5625rem; /* 138.889% */
  letter-spacing: 0.00563rem;
}
.body6 {
  font-size: 1rem;
  line-height: 1.375rem; /* 137.5% */
  letter-spacing: 0.005rem;
}
.body7 {
  font-size: 0.875rem;
  line-height: 1.1875rem; /* 135.714% */
  letter-spacing: 0.00438rem;
}
.body8 {
  font-size: 0.75rem;
  line-height: 1rem; /* 133.333% */
  letter-spacing: 0.00375rem;
}
</style>
