<template>
  <ModalCategory
    :modelValue="true"
    @update:modelValue="closeModal('categories')"
    v-if="'categories' in modalList"
  />
  <ModalCoupon
    :modelValue="true"
    @update:modelValue="closeModal('coupons')"
    v-if="'coupons' in modalList"
  />
  <ModalImageCrop
    :modelValue="true"
    @update:modelValue="closeModal('image_crop')"
    v-if="'image_crop' in modalList"
  />
  <ModalLink
    :modelValue="true"
    @update:modelValue="closeModal('links')"
    v-if="'links' in modalList"
  />
  <ModalLinkStat
    :modelValue="true"
    @update:modelValue="closeModal('link-stats')"
    v-if="'link-stats' in modalList"
  />
  <ModalPayment
    :modelValue="true"
    @update:modelValue="closeModal('payments')"
    v-if="'payments' in modalList"
  />
  <ModalPromotion
    :modelValue="true"
    @update:modelValue="closeModal('promotions')"
    v-if="'promotions' in modalList"
  />
  <ModalProp
    :modelValue="true"
    @update:modelValue="closeModal('props')"
    v-if="'props' in modalList"
  />
  <ModalStudio
    :modelValue="true"
    @update:modelValue="closeModal('studios')"
    v-if="'studios' in modalList"
  />
  <ModalTag
    :modelValue="true"
    @update:modelValue="closeModal('tags')"
    v-if="'tags' in modalList"
  />
  <ModalTagList
    :modelValue="true"
    @update:modelValue="closeModal('tags_list')"
    v-if="'tags_list' in modalList"
  />
  <ModalTariff
    :modelValue="true"
    @update:modelValue="closeModal('tariffs')"
    v-if="'tariffs' in modalList"
  />
  <ModalUserBan
    :modelValue="true"
    @update:modelValue="closeModal('user_ban')"
    v-if="'user_ban' in modalList"
  />
  <ModalKit
    :modelValue="true"
    @update:modelValue="closeModal('kits')"
    v-if="'kits' in modalList"
  />
  <ModalVideoUpload
    :modelValue="true"
    @update:modelValue="closeModal('video_upload')"
    v-if="'video_upload' in modalList"
  />
</template>

<script setup>
  const modalList = useCustomModalList()
</script>
