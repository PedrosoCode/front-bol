<!-- ModalConfirmacao.vue -->
<script setup lang="ts">

const props = defineProps({
  titulo: {
    type: String,
    default: 'Confirmação'
  },
  mensagem: {
    type: String,
    default: 'Deseja confirmar a operação?'
  },
  textoBotaoConfirmar: {
    type: String,
    default: 'Confirmar'
  },
  textoBotaoCancelar: {
    type: String,
    default: 'Cancelar'
  },
  corBotaoConfirmar: {
    type: String,
    default: 'indigo'
  },
  corBotaoCancelar: {
    type: String,
    default: 'red'
  }
});

const emit = defineEmits(['confirmar', 'cancelar']);

function confirmar() {
  emit('confirmar');
}

function cancelar() {
  emit('cancelar');
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Overlay com blur -->
    <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

    <!-- Container do Modal -->
    <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
      <!-- Conteúdo do Modal -->
      <div class="mt-4">
        <h2 class="text-xl font-bold mb-4">{{ titulo }}</h2>
        <p>{{ mensagem }}</p>
        <div class="flex flex-row justify-end space-x-4 pt-2">
          <!-- Botão Cancelar -->
          <button @click="cancelar" class="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-800">
            {{ textoBotaoCancelar }}
          </button>

          <!-- Botão Confirmar -->
          <button @click="confirmar" class="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-800">
            {{ textoBotaoConfirmar }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>