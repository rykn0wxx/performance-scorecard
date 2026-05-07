// https://pinia.vuejs.org/core-concepts/actions.html
import { LOAD_DATA } from '@/stores/actions.type'
import { SET_DATA, SET_MONTH, SET_MANAGER, SET_IQA, SET_DIMENSIONS, SET_WORKFLOW } from '@/stores/mutations.type'
// import csvData from '@/assets/output-csv.csv'

export default {
  [SET_MONTH](selMonth) {
    if (selMonth) {
      this.rptMonth = selMonth.code
      this.dimRptMonth.filterExact(selMonth.code)
    } else {
      this.dimRptMonth.filterAll()
    }
    if (this.scData) {
      this.filteredData = this.scData.allFiltered()
    }
  },
  [SET_MANAGER](selManager) {
    if (selManager) {
      this.rptMngr = selManager.code
      this.dimRptManager.filterExact(selManager.code)
    } else {
      this.dimRptManager.filterAll()
    }
    if (this.scData) {
      this.filteredData = this.scData.allFiltered()
    }
  },
  [SET_IQA](selIqa) {
    if (selIqa) {
      this.iqaEid = selIqa.code
      this.dimIqaEid.filterExact(selIqa.code)
    } else {
      this.iqaEid = null
      this.dimIqaEid.filterAll()
    }
    if (this.scData) {
      this.filteredData = this.scData.allFiltered()
    }
  },
  [SET_WORKFLOW](selWf) {
    if (selWf) {
      this.buWorkflow = selWf.code
      this.dimWorkflow.filterExact(selWf.code)
    } else {
      this.dimWorkflow.filterAll()
    }
    if (this.scData) {
      this.filteredData = this.scData.allFiltered()
    }
  },
  [SET_DIMENSIONS]() {
    this.dimMetric = this.scData.dimension(d => d.metric_name)
    this.dimMetricID = this.scData.dimension(d => d.iqa_metric_id)
    this.dimIqaName = this.scData.dimension(d => d.full_name)
    this.dimIqaEid = this.scData.dimension(d => d.techm_eid)
    this.dimRptManager = this.scData.dimension(d => d.reporting_manager)
    this.dimRptMonth = this.scData.dimension(d => d.reporting_month)
    this.dimWorkflow = this.scData.dimension(d => d.workflow_name)
    this.dimMetricID.filter(d => d !== -1)
    this.filteredData = this.scData.allFiltered()
  },
  [SET_DATA](csvData) {
    if (csvData) {
      this.scData = crossfilter(csvData)
      this.filteredData = this.scData.allFiltered()
    }
    this.isLoaded = csvData ? true : false
  },
  // async [GET_DATA]() {
  //   try {
  //     await csvData.forEach(d => {
  //       d.input_score = parseFloat(parseFloat(d.input_score).toFixed(2))
  //       d.scored_value = parseFloat(parseFloat(d.scored_value).toFixed(4))
  //       d.band_id = +d.band_id
  //       d.iqa_metric_id = parseFloat(d.iqa_metric_id)
  //     })
  //     this[SET_DATA](csvData)
  //     this[SET_DIMENSIONS]()
  //   } catch (err) {
  //     console.error('Error', err)
  //   }
  // },
  async [LOAD_DATA]() {
    const dateFormatParser = d3.timeParse(d3.timeFormat('%Y-%m-%d'))
    try {
      const fileURL = new URL('@/assets/output-csv.csv', import.meta.url)
      const csvData = await d3.dsv(',', fileURL.toString(), (d, i) => {
        d.index = i
        d.rpt_month = dateFormatParser(d.reporting_month)
        d.input_score = parseFloat(parseFloat(d.input_score).toFixed(2))
        d.scored_value = parseFloat(parseFloat(d.scored_value).toFixed(4))
        d.band_id = +d.band_id
        d.iqa_metric_id = parseFloat(d.iqa_metric_id)
        return d
      })
      this[SET_DATA](csvData)
      this[SET_DIMENSIONS]()
    } catch (err) {
      console.error('Error', err)
    }
  }
}
