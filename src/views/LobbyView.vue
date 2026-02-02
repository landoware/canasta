<script setup>
defineProps({
  id: String,
})
import { useRouter } from 'vue-router';
import LobbyPlayerCard from '@/components/LobbyPlayerCard.vue';
import Button from '@/components/Button.vue';
import { onMounted, ref } from 'vue';
import FormCard from '@/components/FormCard.vue';

onMounted(() => {
  const conn = new WebSocket(import.meta.env.VITE_WS_URL)
})

const router = useRouter()

const hasName = ref(false)
const playerName = ref('')

function setName() {
  if (playerName.value.length > 0) {
    hasName.value = true
  }
}

function ready() {
}

function leave() {
  router.push('/canasta')
}

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center">
    <div v-if="!hasName">
      <p class="text-card-white font-quill text-9xl leading-none text-shadow-lg mb-10">
        Canasta
      </p>
      <FormCard class="min-w-96">
        <form @submit.prevent="setName()">
          <div class="flex flex-col gap-5">
            <input v-model.trim="playerName" type=" text"
              class="font-rs-bold text-black bg-white border border-card-blue rounded-md text-center"
              placeholder="Name">

            <Button type="submit" label="Join Game" />
            <Button @click="router.push('/canasta')" label=" Back" class="bg-card-red" />
          </div>
        </form>
      </FormCard>
    </div>

    <div v-if="hasName">
      <div class="text-card-white text-[clamp(2.5rem,14vw,6rem)] text-shadow-lg">
        <span class="font-quill">Room </span>
        <span class="font-rs-bold text-rs-yellow">{{ id }}</span>
      </div>
      <div class="text-card-white font-quill text-[clamp(2.5rem,14vw,6rem)] text-shadow-lg">
        Pick your Partner
      </div>
      <div class="grid grid-cols-2 justify-center items-center gap-10">
        <div>
          <!-- <LobbyPlayerCard :playerName="gameStore.lobbyState?.players[0]?.username" -->
          <!--   :ready="gameStore.lobbyState?.players[0]?.ready" :team="true" /> -->
        </div>
        <div>
          <!-- <LobbyPlayerCard :playerName="gameStore.lobbyState?.players[1]?.username" -->
          <!--   :ready="gameStore.lobbyState?.players[1]?.ready" /> -->
        </div>
        <div>
          <!-- <LobbyPlayerCard :playerName="gameStore.lobbyState?.players[2]?.username" -->
          <!--   :ready="gameStore.lobbyState?.players[2]?.ready" :team="true" /> -->
        </div>
        <div>
          <!-- <LobbyPlayerCard :playerName="gameStore.lobbyState?.players[3]?.username" -->
          <!--   :ready="gameStore.lobbyState?.players[3]?.ready" :team="false" /> -->
        </div>
      </div>
      <Button @click="ready()" label="Ready" class="m-5" />
      <Button @click="leave()" label="Leave" />

    </div>
  </div>
</template>
