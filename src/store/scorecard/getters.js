// https://pinia.vuejs.org/core-concepts/getters.html

export default {
  isScorecardDataLoaded: state => !!state.scData && state.isLoaded,
  ndx: state => !!state.scData && state.scData,
  dimIqa: state => {
    const allData = state.filteredData
    const filteredData = allData.map(d => {
      return {
        name: d.full_name,
        code: d.techm_eid
      }
    })
    return _.sortBy(_.uniqBy(filteredData, 'name'), ['name'])
  },
  dimManager: state => {
    const outMngr = []
    const uniqData = _.uniq(_.map(state.filteredData, 'reporting_manager'))
    _.forEach(uniqData, d => {
      outMngr.push({
        name: d,
        code: d
      })
    })
    return _.sortBy(outMngr, ['name'])
  },
  dimMonth: state => {
    const monthFormat = d3.timeFormat('%Y %b')
    const monthParser = d3.timeParse('%Y-%m-%d')
    const outMonth = []
    const uniqData = _.uniq(_.map(state.filteredData, 'reporting_month'))
    _.forEach(uniqData, d => {
      outMonth.push({
        name: monthFormat(monthParser(d)),
        code: d
      })
    })
    return _.sortBy(outMonth, [
      d => {
        return monthParser(d.code)
      }
    ])
  },
  dimWf: state => {
    const outWf = []
    const uniqData = _.uniq(_.map(state.filteredData, 'workflow_name'))
    _.forEach(uniqData, d => {
      outWf.push({
        name: d,
        code: d
      })
    })
    return _.sortBy(outWf, ['name'])
  }
}
