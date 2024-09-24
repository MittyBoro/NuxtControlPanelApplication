<template>
  <UCard class="bg-gray-50 dark:bg-gray-950 shadow">
    <template #header>
      <NuxtLink
        to="/"
        class="flex items-center justify-center gap-4 font-black text-2xl lg:text-4xl select-none"
      >
        <UButton
          class="md:w-16 md:h-16 flex relative rounded-2xl md:rounded-3xl cursor-pointer"
          square
        >
          <UIcon
            class="text-4xl m-auto"
            name="i-material-symbols-settings-video-camera"
          />
        </UButton>
        <span class="opacity-90">
          <span>Panel</span>
          <span class="opacity-70">Ka</span>
        </span>
      </NuxtLink>
    </template>

    <template #default>
      <!--  -->
      <form @submit.prevent="submit" class="form-item">
        <!--  -->
        <UFormGroup :error="form.errors.username">
          <UInput
            v-model="state.username"
            icon="i-material-symbols-alternate-email-rounded"
            name="username"
            placeholder="Email"
            required
            size="lg"
          />
        </UFormGroup>

        <!--  -->
        <UFormGroup :error="form.errors.password">
          <UPassword
            v-model="state.password"
            name="password"
            :attrs="{ placeholder: 'Пароль', name: 'password' }"
            required
            size="lg"
          />
        </UFormGroup>
        <label class="flex items-center gap-2 cursor-pointer">
          <UToggle v-model="state.remember" />
          <span>Запомнить меня</span>
        </label>
        <div class="grid md:grid-cols-2 gap-3">
          <UButton
            icon="i-material-symbols-login-rounded"
            label="Войти"
            :loading="form.pending"
            type="submit"
            block
          />
          <UButton
            color="gray"
            icon="i-gg-external"
            label="На сайт"
            :to="externalUrl()"
            target="_blank"
            block
          />
        </div>
      </form>
    </template>
  </UCard>
</template>

<script setup>
  const { login } = useApiAuth()

  definePageMeta({
    layout: 'auth',
  })

  const { form, state } = await useApiForm(
    null,
    {
      username: '',
      password: '',
      remember: true,
    },
    {
      onSuccess: () => {
        reloadNuxtApp({ path: '/' })
      },
    },
  )

  const submit = async () => {
    await form.customSubmit(login)
  }
</script>
