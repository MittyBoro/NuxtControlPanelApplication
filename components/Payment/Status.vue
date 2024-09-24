<template>
  <div>
    <UDropdown
      :items="paymentOptions"
      :ui="{ padding: 'p-0.5', item: { size: 'text-xs' } }"
    >
      <UBadge
        :color="
          selected == 'success'
            ? 'green'
            : selected == 'pending'
              ? 'yellow'
              : selected == 'canceled'
                ? 'gray'
                : 'red'
        "
      >
        {{ translateKey(selected) }}
      </UBadge>
    </UDropdown>
  </div>
</template>

<script setup>
  const statuses = useApiAttributes().value.pay_statuses
  const selected = defineModel('modelValue')

  const paymentOptions = Array.from(statuses).map((i) => [
    {
      key: i,
      label: translateKey(i),
      click: () => updateStatus(i),
    },
  ])

  const updateStatus = (status) => {
    selected.value = status
  }
</script>
