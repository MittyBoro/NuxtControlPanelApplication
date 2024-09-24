<template>
  <UCard class="max-w-xl">
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar
          :src="user.avatar[0]?.src || user.avatar"
          :alt="user.name"
          size="lg"
          :chip-color="isOnline(user) ? 'green' : undefined"
        />
        <div>
          <h2 class="text-2xl font-bold">
            <span>{{ user.name }}</span>
            <NuxtLink :to="`/users/${user.id}`" class="link text-xl ml-2">
              <UIcon name="i-gg-pen" />
            </NuxtLink>
          </h2>
          <p class="text-gray-500">{{ user.username }}</p>
        </div>
        <div class="grid gap-2 ml-auto">
          <UButton
            label="Добавить премиум"
            size="xs"
            block
            @click="openModal('payments', user, refresh)"
          />

          <UButton
            :label="
              user.ban_expiry_at ? 'Изменить блокировку' : 'Заблокировать'
            "
            size="xs"
            color="red"
            block
            @click="openModal('user_ban', user, refresh)"
          />
        </div>
      </div>
    </template>
    <div class="grid gap-3 p-2">
      <div class="grid-box">
        <!--  -->
        <template v-if="user.ban_expiry_at">
          <div class="font-bold text-red-500">Забанен до:</div>
          <div class="text-red-500">
            <span>{{ formatDate(user.ban_expiry_at) }}</span>
            <span class="text-xs whitespace-nowrap opacity-50">
              ({{ countdownFrom(user.ban_expiry_at, true) }})
            </span>
          </div>
        </template>

        <!--  -->
        <template v-if="user.last_activity_at">
          <div class="font-bold">Online:</div>
          <div>
            {{ formatDate(user.last_activity_at) }}
            <span class="text-xs whitespace-nowrap opacity-50">
              ({{ countdownFrom(user.last_activity_at, true) }})
            </span>
          </div>
        </template>

        <!--  -->
        <template v-if="user">
          <div class="font-bold">Email:</div>
          <div>
            <span>{{ user.email }}</span>
            <UserVerifyEmail :user="user">
              <span class="text-xs text-red-500 link ml-1">
                Не верифицирован!
              </span>
            </UserVerifyEmail>
          </div>
        </template>
        <!--  -->
        <template v-if="user.premium_expiry_at">
          <div class="font-bold">Премиум до:</div>
          <div class="text-primary-600">
            <span>{{ formatDate(user.premium_expiry_at) }}</span>
            <span class="text-xs whitespace-nowrap opacity-50">
              ({{ countdownFrom(user.premium_expiry_at) }})
            </span>
          </div>
        </template>
      </div>

      <div class="grid-box">
        <!--  -->
        <template v-if="user.role">
          <div class="font-bold">Роль:</div>
          <div><UserColoredRole :user="user" /></div>
        </template>

        <!--  -->
        <template v-if="user.gender">
          <div class="font-bold">Пол:</div>
          <div>{{ translateKey(user.gender) }}</div>
        </template>

        <!--  -->
        <template v-if="user.country">
          <div class="font-bold">Страна:</div>
          <div>
            <span class="mr-2">
              {{ country.getName(user.country, 'ru', { select: 'alias' }) }}
            </span>
          </div>
        </template>

        <!--  -->
        <template v-if="user.currency">
          <div class="font-bold">Валюта:</div>
          <div>{{ user.currency }}</div>
        </template>
      </div>

      <div class="grid-box">
        <!--  -->
        <template v-if="user.balance">
          <div class="font-bold">Койнов:</div>
          <div>{{ user.balance }}</div>
        </template>

        <!--  -->
        <template v-if="user.referred_count">
          <div class="font-bold">Рефералы:</div>
          <div>
            <UButton
              :to="`/users?referrer_id=${user.id}`"
              icon="i-fluent-people-community-20-filled"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
              :label="user.referred_count"
            />
          </div>
        </template>

        <!--  -->
        <template v-if="user.payouts_count">
          <div class="font-bold">Выплаты:</div>
          <div>
            <UButton
              :to="`/payouts?id=${user.id}`"
              icon="i-ic-outline-payments"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
              :label="user.payouts_count"
            />
          </div>
        </template>

        <!--  -->
        <template v-if="user.total_paid !== undefined">
          <div class="font-bold">Платежи:</div>
          <div>
            <UButton
              :to="`/payments?user_id=${user.id}`"
              icon="i-solar-wallet-money-bold"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
            >
              <UserPaidCurrencies
                v-if="user.total_paid"
                :user="user"
                class="flex gap-2 mr-2"
              />
              <span v-else>0</span>
            </UButton>
          </div>
        </template>
      </div>

      <div class="grid-box">
        <!--  -->
        <template v-if="user.comments_count">
          <div class="font-bold">Комментарии:</div>
          <div>
            <UButton
              :to="`/comments?user_id=${user.id}`"
              icon="i-icon-park-solid-comments"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
              :label="user.comments_count"
            />
          </div>
        </template>

        <!--  -->
        <template v-if="user.favorites_count">
          <div class="font-bold">Избранное:</div>
          <div>
            <UButton
              :to="`/favorites?user_id=${user.id}`"
              icon="i-solar-heart-bold"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
              :label="user.favorites_count"
            />
          </div>
        </template>

        <!--  -->
        <template v-if="user.chats_count">
          <div class="font-bold">Чаты:</div>
          <div>
            <UButton
              :to="`/chats?user_id=${user.id}`"
              icon="i-gravity-ui-envelope-open"
              color="gray"
              size="xs"
              variant="soft"
              class="-my-2 text-black"
              block
              :label="user.chats_count"
            />
          </div>
        </template>
      </div>
    </div>
  </UCard>
</template>

<script setup>
  import country from 'i18n-iso-countries'
  import countryLocalize from 'i18n-iso-countries/langs/ru.json'
  country.registerLocale(countryLocalize)

  const { data, refresh, pending } = await useApi(
    `/users/${useRoute().params.id}`,
  )
  const user = computed(() => data.value?.data)
</script>

<style lang="scss" scoped>
  .grid-box {
    @apply grid grid-cols-[100px_1fr] md:grid-cols-[200px_1fr] gap-y-1.5 gap-x-5;
  }
</style>
