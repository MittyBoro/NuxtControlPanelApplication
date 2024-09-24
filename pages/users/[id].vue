<template>
  <UForm :form="form" class="max-w-2xl">
    <UTabs v-model="currentTab" :items="tabs" class="w-full">
      <template #default="{ item }">
        <UTabsItem :item="item" />
      </template>

      <template #main>
        <UCard>
          <div class="form-item">
            <!--  -->
            <UFormGroup
              label="Аватар"
              :error="objKeysToStr(form.errors, 'avatar')"
            >
              <UFileInput
                icon="i-material-symbols-add-photo-alternate-outline-rounded"
                v-model="state.avatar"
                accept="image/*"
                :crop="[300, 300]"
              />
            </UFormGroup>

            <!--  -->
            <UFormGroup label="Имя" required :error="form.errors.name">
              <UInput
                icon="i-mdi-account"
                v-model="state.name"
                autocomplete="off"
                required
              />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Никнейм (username)"
              required
              :error="form.errors.username"
            >
              <UInput
                icon="i-material-symbols-light-account-box"
                v-model="state.username"
                autocomplete="off"
                required
              />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Новый email"
              :description="'Текущий: ' + state.email"
              :error="form.errors.new_email"
            >
              <UInput
                icon="i-material-symbols-alternate-email-rounded"
                v-model="state.new_email"
                :placeholder="state.email"
                type="email"
                autocomplete="off"
              />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              v-if="user.role == 'admin'"
              label="Роль"
              required
              :error="form.errors.role"
            >
              <USelectMenu
                icon="i-eos-icons-cluster-role"
                v-model="state.role"
                :options="roles"
                required
              >
                <template #label>
                  {{ translateKey(state.role) }}
                </template>
                <template #option="{ option: role }">
                  {{ translateKey(role) }}
                </template>
              </USelectMenu>
            </UFormGroup>

            <!--  -->
            <UFormGroup label="Валюта" required :error="form.errors.currency">
              <USelectMenu
                icon="i-material-symbols-universal-currency-alt-outline-rounded"
                v-model="state.currency"
                :options="Object.keys(currencies)"
                required
              ></USelectMenu>
            </UFormGroup>

            <!--  -->
            <UFormGroup label="Страна" :error="form.errors.country">
              <UCountrySelect
                icon="i-material-symbols-globe"
                v-model="state.country"
              />
            </UFormGroup>

            <!--  -->
            <UFormGroup label="Пол" :error="form.errors.gender">
              <USelectMenu
                icon="i-material-symbols-transgender-rounded"
                v-model="state.gender"
                :options="['', ...genders]"
              >
                <template #label>
                  {{ translateKey(state.gender) }}
                </template>
                <template #option="{ option: gender }">
                  {{ translateKey(gender) }}
                </template>
              </USelectMenu>
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Telegram"
              :error="form.errors.telegram_id"
              v-if="state.telegram_id"
            >
              <UButtonGroup size="md" class="w-full">
                <UInput
                  icon="i-logos-telegram"
                  v-model="state.telegram_id"
                  type="number"
                  readonly
                  class="w-full"
                />
                <UButton
                  label="Отвязать"
                  color="gray"
                  @click="state.telegram_id = ''"
                />
              </UButtonGroup>
            </UFormGroup>
          </div>
        </UCard>
      </template>

      <template #subscriptions>
        <UCard>
          <UFormGroup :error="objKeysToStr(form.errors, 'subscriptions')">
            <table class="table-auto w-full text-sm">
              <tr>
                <th></th>
                <th
                  class="pb-2"
                  v-for="channel in subscriptions.channels"
                  :key="channel"
                >
                  {{ translateChannel(channel) }}
                </th>
              </tr>
              <tr
                v-for="event in Object.keys(subscriptions.events)"
                :key="event"
                class="hover:bg-gray-500/5"
              >
                <td
                  :class="{
                    'text-gray-500': !subscriptions.events[event],
                    'font-medium': subscriptions.events[event],
                  }"
                >
                  {{ translateKey(event) }}
                </td>
                <td
                  v-for="channel in subscriptions.channels"
                  :key="channel"
                  class="text-center py-1"
                >
                  <UToggle
                    :color="subscriptions.events[event] ? 'primary' : 'green'"
                    class="flex mx-auto"
                    :id="`${channel}:${event}`"
                    :name="`${channel}:${event}`"
                    :modelValue="userSubscriptions[`${channel}:${event}`]"
                    @update:modelValue="
                      userSubscriptionUpdate(channel, event, $event)
                    "
                    :disabled="
                      isSubscriptionDisabled(
                        channel,
                        subscriptions.events[event],
                      )
                    "
                  />
                </td>
              </tr>
            </table>
          </UFormGroup>
        </UCard>
      </template>

      <template v-if="user.id == state.id" #password>
        <UCard>
          <div class="form-item">
            <!--  -->
            <UFormGroup
              label="Старый пароль"
              required
              :error="form.errors.current_password"
            >
              <UPassword v-model="state.current_password" autocomplete="off" />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Новый пароль"
              required
              :error="form.errors.password"
            >
              <UPassword v-model="state.password" autocomplete="off" />
            </UFormGroup>

            <!--  -->
            <UFormGroup
              label="Подтверждение пароля"
              required
              :error="form.errors.password_confirmation"
            >
              <UPassword
                v-model="state.password_confirmation"
                autocomplete="off"
              />
            </UFormGroup>
          </div>
        </UCard>
      </template>
    </UTabs>
  </UForm>
</template>

<script setup>
  const user = useApiUser()

  const { form, state } = await useApiForm(
    'users',
    {
      avatar: [],
      subscriptions_list: [],
      username: '',
    },
    {
      loadByRoute: true,
      onSuccess: () => {
        state.new_email = ''
        if (state.password) {
          window.location.reload()
        }
        if (state.id == user.value.id) {
          const { refreshIdentity } = useApiAuth()
          refreshIdentity()
        }
      },
    },
  )

  const userSubscriptions = computed({
    get: () => {
      const list = {}

      state.subscriptions_list.map((x) => {
        list[`${x.channel_name}:${x.event_name}`] = true
      })
      return list
    },
  })
  const userSubscriptionUpdate = (channel, event, value) => {
    if (value) {
      state.subscriptions_list.push({
        channel_name: channel,
        event_name: event,
      })
    } else {
      state.subscriptions_list = state.subscriptions_list.filter(
        (x) => `${x.channel_name}:${x.event_name}` != `${channel}:${event}`,
      )
    }
  }

  const isSubscriptionDisabled = (channel, isAdminEvent = false) => {
    if (channel == 'telegram' && !state.telegram_id) {
      return true
    } else if (channel == 'mail' && !state.email) {
      return true
    } else if (state.role == 'user' && isAdminEvent) {
      return true
    }

    return false
  }

  const translateChannel = (channel) => {
    switch (channel) {
      case 'telegram':
        return 'Telegram'
      case 'database':
        return 'Сайт'
      case 'mail':
        return 'Почта'
      default:
        return channel
    }
  }

  const { roles, genders, currencies, subscriptions } = useApiAttributes().value

  const currentTab = useTabs('user-tab')
  const tabs = [
    {
      slot: 'main',
      label: 'Основное',
      icon: 'i-material-symbols-info-outline-rounded',
    },
    {
      slot: 'subscriptions',
      label: 'Уведомления',
      icon: 'i-material-symbols-notifications-active-outline',
    },
    {
      slot: 'password',
      label: 'Пароль',
      icon: 'i-mdi-form-textbox-password',
      disabled: user.value.id != state.id,
    },
    {
      label: 'Профиль',
      icon: 'i-material-symbols-frame-person',
    },
  ]

  watch(
    () => state.username,
    () => {
      state.username = generateSlug(state.username, {
        replacement: '_',
        lower: false,
      })
    },
    { immediate: true },
  )
  watch(
    () => state.new_email,
    (val) => {
      state.verify = !!val
    },
  )
  watch(
    () => currentTab.value,
    (val) => {
      if (val == 3) {
        currentTab.value = 0
        setTimeout(() => {
          navigateTo(`/users/show/${state.id}`)
        }, 42)
      }
    },
  )
</script>
