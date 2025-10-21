<template>
  <v-container class="py-8">
    <!-- <v-row class="mb-8" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-btn
          block
          color="primary"
          class="mb-2"
          @click="$router.push('cadparceiro')"
        >
          Cadastro de parceiro de negócio
        </v-btn>
        <v-btn
          block
          color="primary"
          class="mb-2"
          @click="$router.push('listaparceiro')"
        >
          Lista de parceiro de negócio
        </v-btn>
        <v-btn block color="primary">Button</v-btn>
      </v-col>
    </v-row> -->

    <v-row class="px-8" justify="center">
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-btn
          block
          height="180"
          color="red-darken-1"
          variant="elevated"
          class="text-white text-h6"
          @click="$router.push('lista_parceiro')"
        >
          Cadastros gerais
        </v-btn>
      </v-col>

      <v-col cols="12" sm="6" md="4" lg="2">
        <v-btn
          block
          height="180"
          color="cyan-lighten-1"
          variant="elevated"
          class="text-white text-h6"
          @click="$router.push('ordem_servico')"
        >
          Ordem de serviço
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
</script>
