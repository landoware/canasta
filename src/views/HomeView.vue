<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import FormCard from '@/components/FormCard.vue'

const router = useRouter()

const initialState = ref(true)
const joiningGame = ref(false)

const roomCode = ref('')


const error = ref(null)

const getCode = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_URL}/new`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) throw new Error("Failed to create game")

    const data = await response.json()
    return data.code
  } catch (err) {
    error.value = err
    return null
  }
}

async function createGame() {
  console.log('Beats dealing, doesn\'t it?')
  const code = await getCode()
  if (code) {
    router.push({ name: '', params: { code: code } })
  }
}

function joinLobby() {
  if (!roomCode.value && !playerName.value) {
    return
  }

  if (!playerName.value) {
    return
  }

  if (!roomCode.value) {
    return
  }

  console.log('Don\'t let Amy pick up the pile')
}

function cancel() {
  initialState.value = true
  joiningGame.value = false
}

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center text-center">
    <p class="text-card-white font-quill text-9xl leading-none text-shadow-lg mb-10">
      Canasta
    </p>
    <FormCard class="min-w-96">
      <div v-if="initialState" class="flex flex-col gap-5">
        <Button @click="createGame()" label="New Game" />
        <Button @click="joiningGame = true; initialState = false" label="Join Game" />
      </div>

      <form v-if="joiningGame" @submit.prevent="joinLobby()">
        <div class="flex flex-col gap-5">
          <input v-model.trim="roomCode" type="text" :maxlength="4"
            class="font-rs-bold text-black uppercase bg-white border border-card-blue rounded-md text-center"
            placeholder="CODE">

          <input v-model.trim="playerName" type="text"
            class="font-rs-bold text-black bg-white border border-card-blue rounded-md text-center" placeholder="Name">

          <Button type="submit" label="Join Game" />
          <Button @click="cancel()" label="Back" class="bg-card-red" />
        </div>
      </form>
    </FormCard>
  </div>
</template>
