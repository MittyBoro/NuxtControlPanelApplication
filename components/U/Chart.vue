<template>
  <div
    class="mb-4"
    :class="{
      'bg-gray-500/5 rounded-xl p-2': isHidden,
      'pb-4 border-b': !isHidden,
    }"
  >
    <template v-if="!isHidden">
      <Line
        :data="data"
        :options="options"
        class="w-full max-h-72 md:max-h-52"
        ref="chartRef"
      />
      <div
        class="mt-1 mb-2 flex justify-center gap-x-4 flex-wrap text-sm text-gray-500 font-semibold"
      >
        <span v-for="(item, i) in title" :key="i">{{ item }}</span>
      </div>
    </template>
    <div class="flex justify-center gap-2 flex-wrap">
      <template v-if="!isHidden">
        <UButton size="xs" color="gray" label="Неделя" @click="zoomIn(7)" />
        <UButton size="xs" color="gray" label="2 недели" @click="zoomIn(14)" />
        <UButton size="xs" color="gray" label="Месяц" @click="zoomIn(30)" />
        <UButton size="xs" color="gray" label="3 месяца" @click="zoomIn(90)" />
        <UButton
          size="xs"
          color="gray"
          label="6 месяцев"
          @click="zoomIn(183)"
        />
        <UButton size="xs" color="gray" label="Год" @click="zoomIn(365)" />
      </template>
      <UButton
        size="xs"
        color="gray"
        :label="isHidden ? 'Показать график' : 'Скрыть график'"
        :block="isHidden"
        @click="isHidden = !isHidden"
      />
    </div>
  </div>
</template>

<script setup>
  import { Line } from 'vue-chartjs'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    TimeScale,
    LogarithmicScale,
  } from 'chart.js'
  import zoomPlugin from 'chartjs-plugin-zoom'
  import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm'

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    TimeScale,
    LogarithmicScale,
    zoomPlugin,
  )

  const chartRef = ref(null)
  const isHidden = useLocalStorage('chart-hidden', false)
  const title = ref(['Загрузка...'])

  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
    length: {
      type: Number,
      default: 0,
    },
    minDate: {
      type: String,
    },
  })

  const onZoomComplete = (chart) => {
    let xAxis = chart.scales['x']
    let minX = xAxis.min
    let maxX = xAxis.max

    let currentTitle = []

    chart.data.datasets.forEach((data) => {
      let sum = 0

      data.data.forEach((item) => {
        if (
          new Date(item.x) >= new Date(minX) &&
          new Date(item.x) <= new Date(maxX)
        ) {
          sum += parseInt(item.y)
        }
      })

      currentTitle.push(`${data.label}: ${formatNumber(sum)}`)
    })

    title.value = currentTitle
  }

  const options = computed(() => ({
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    maintainAspectRatio: false,

    animation: {
      onComplete: ({ chart }) => onZoomComplete(chart),
    },
    scales: {
      x: {
        min: new Date(new Date().setDate(new Date().getDate() - 14)),
        max: new Date(),
        type: 'time',
        time: {
          parser: 'YYYY-MM-DD',
          unit: 'day',
          tooltipFormat: 'D MMMM YYYY',
          displayFormats: {
            day: 'D MMM YYYY',
          },
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        min: 0,
      },
    },
    plugins: {
      zoom: {
        limits: {
          x: {
            min: new Date(props.minDate),
            max: new Date(),
            minRange: 1,
          },
        },
        pan: {
          enabled: true,
          type: 'linear',
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          drag: {
            enabled: true,
            modifierKey: 'ctrl',
          },
          mode: 'x',
        },
      },
    },
  }))

  const zoomIn = (days) => {
    isHidden.value = false
    const chart = chartRef.value.chart
    if (chart) {
      let min = new Date(
        new Date().setDate(new Date().getDate() - days),
      ).getTime()
      min = Math.max(min, new Date(props.minDate).getTime())

      let max = new Date().getTime()

      chart.zoomScale('x', {
        min: min,
        max: max,
      })

      chart.update()
    }
  }
</script>
