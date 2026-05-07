/**
 * PrimeVue
 * @library
 */
// Lib imports
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const DocsBlue = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#DCEFFF',
      100: '#AAD1F9',
      200: '#7BB8F5',
      300: '#4C9EF1',
      400: '#1C85ED',
      500: '#106CC8',
      600: '#0159A2',
      700: '#025EE9',
      800: '#014AB6',
      900: '#013583',
      950: '#1E3A8A'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712'
        }
      }
    }
  },
  components: {
    button: {
      root: {
        borderRadius: '2px',
        paddingX: '8px',
        paddingY: '0',
        gap: '8px',
        transitionDuration: '0.4s',
        raisedShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
        focusRing: {
          width: '0',
          style: 'none',
          offset: '0'
        }
      },
      colorScheme: {
        light: {
          root: {
            secondary: {
              background: '{purple.100}',
              hoverBackground: '{purple.200}',
              activeBackground: '{purple.300}',
              borderColor: '{purple.100}',
              hoverBorderColor: '{purple.200}',
              activeBorderColor: '{purple.300}',
              color: '{purple.600}',
              hoverColor: '{purple.700}',
              activeColor: '{purple.800}',
              focusRing: { color: '{purple.600}', shadow: 'none' }
            }
          }
        },
        dark: {
          root: {
            secondary: {
              background: '{surface.800}',
              hoverBackground: '{surface.700}',
              activeBackground: '{surface.600}',
              borderColor: '{surface.800}',
              hoverBorderColor: '{surface.700}',
              activeBorderColor: '{surface.600}',
              color: '{surface.300}',
              hoverColor: '{surface.200}',
              activeColor: '{surface.100}',
              focusRing: { color: '{surface.300}', shadow: 'none' }
            }
          }
        }
      },
      extend: {
        fontWeight: '500',
        lineHeight: '36px',
        letterSpacing: '0.01em',
        marginX: '8px',
        marginY: '6px',
        minWidth: '88px',
        border: '0'
      },
      css: ({ dt }) => `
.p-button {
  font-weight: ${dt('button.fontWeight')};
  line-height: ${dt('button.lineHeight')};
  letter-spacing: ${dt('button.letterSpacing')};
  margin: ${dt('button.marginY')} ${dt('button.marginX')};
  min-width: ${dt('button.minWidth')};
  min-height: ${dt('button.lineHeight')};
  border: ${dt('button.border')};
}
.p-button:not(:disabled):hover, .p-button:not(:disabled):active {
  border: ${dt('button.border')};
}
`
    }
  }
})

const themeConfig = {
  theme: {
    preset: DocsBlue,
    options: {
      prefix: 'p',
      darkModeSelector: '.app-dark',
      // cssLayer: false
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, kohana, primevue, utilities'
        // order: 'base, kohana, sakai, primevue, utilities'
      }
    }
  },
  ripple: true,
  inputVariant: 'filled'
}

export default function (app) {
  app.use(PrimeVue, { ...themeConfig })
  // app.use(ToastService)
  // app.use(ConfirmationService)
}
