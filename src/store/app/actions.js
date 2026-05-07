// https://pinia.vuejs.org/core-concepts/actions.html
import { GET_MENU_ROUTES } from '@/stores/actions.type'
import { getMenuFromRoutes } from '@core/utilities'

export default {
  [GET_MENU_ROUTES]() {
    const router = useRouter()
    const filteredRoutes = router.options.routes.filter(r => r.meta?.isPublic)
    const menuRoutes = filteredRoutes.map(r => getMenuFromRoutes(r))
  }
}
