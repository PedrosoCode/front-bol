<!-- ModalConfirmacao.vue -->
<script setup lang="ts">
const props = defineProps({
  titulo: { type: String, default: 'Confirmação' },
  mensagem: { type: String, default: 'Deseja confirmar a operação?' },
  textoBotaoConfirmar: { type: String, default: 'Confirmar' },
  textoBotaoCancelar: { type: String, default: 'Cancelar' },
  corBotaoConfirmar: { type: String, default: 'indigo' },
  corBotaoCancelar: { type: String, default: 'red' },
  modelValue: { type: Boolean, required: true }
});

const emit = defineEmits(['update:modelValue', 'confirmar', 'cancelar']);

function confirmar() {
  emit('confirmar');
  emit('update:modelValue', false);
}

function cancelar() {
  emit('cancelar');
  emit('update:modelValue', false);
}
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="400" persistent>
    <v-card>
      <v-card-title class="text-h6">
        {{ props.titulo }}
      </v-card-title>

      <v-card-text>
        {{ props.mensagem }}
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn
          :color="props.corBotaoCancelar"
          variant="outlined"
          @click="cancelar"
        >
          {{ props.textoBotaoCancelar }}
        </v-btn>

        <v-btn
          :color="props.corBotaoConfirmar"
          variant="outlined"
          @click="confirmar"
        >
          {{ props.textoBotaoConfirmar }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
