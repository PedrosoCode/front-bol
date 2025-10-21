<template>
  <v-container fluid class="pa-6" style="min-height:100vh; background:#f1f5f9;">
    <v-row class="mx-auto" style="max-width:1200px;" dense>

      <!-- Dados do Parceiro -->
      <v-col cols="12" class="mb-6">
        <v-card elevation="2" class="pa-6">
          <div class="text-h6 text-center mb-4">Dados do Parceiro</div>

          <v-form @submit.prevent>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-select
                  label="Parceiro de Negócio"
                  variant="outlined"
                  :items="[]"
                  density="comfortable"
                  placeholder="Selecione o Parceiro"
                  clearable
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>

      <!-- Dados do Ativo -->
      <v-col cols="12" class="mb-6">
        <v-card elevation="2" class="pa-6">
          <div class="text-h6 text-center mb-4">Dados do Ativo</div>

          <v-row dense>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Data Início"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Hora Início"
                type="time"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Data Término"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Hora Término"
                type="time"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="mt-4">
              <v-textarea
                label="Informações/Observações"
                rows="3"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- Serviços Realizados -->
      <v-col cols="12" class="mb-6">
        <v-card elevation="2" class="pa-6">
          <div class="text-h6 text-center mb-4">Serviços Realizados</div>

          <v-data-table
            :headers="[
              { title: 'N°', key: 'n', value: 'n' },
              { title: 'Cod. Serviço', key: 'cod', value: 'cod' },
              { title: 'Descrição', key: 'descricao', value: 'descricao' },
              { title: 'Quantidade', key: 'quantidade', value: 'quantidade' },
              { title: 'Valor Unitário', key: 'valor_unitario', value: 'valor_unitario' },
              { title: 'Total', key: 'total', value: 'total' }
            ]"
            :items="[
              { n:'', cod:'', descricao:'', quantidade:'', valor_unitario:'', total:'' }
            ]"
            hide-default-footer
            density="comfortable"
            class="elevation-0"
          >
            <template #item.n="{ item }">
              <div class="text-body-2">{{ item.n }}</div>
            </template>
            <template #item.cod="{ item }">
              <div class="text-body-2">{{ item.cod }}</div>
            </template>
            <template #item.descricao="{ item }">
              <div class="text-body-2">{{ item.descricao }}</div>
            </template>
            <template #item.quantidade="{ item }">
              <div class="text-body-2">{{ item.quantidade }}</div>
            </template>
            <template #item.valor_unitario="{ item }">
              <div class="text-body-2">{{ item.valor_unitario }}</div>
            </template>
            <template #item.total="{ item }">
              <div class="text-body-2">{{ item.total }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

      <!-- Produtos Utilizados -->
      <v-col cols="12" class="mb-6">
        <v-card elevation="2" class="pa-6">
          <div class="text-h6 text-center mb-4">Produtos Utilizados</div>

          <v-data-table
            :headers="[
              { title: 'N°', key: 'n', value: 'n' },
              { title: 'Cod. Item', key: 'cod', value: 'cod' },
              { title: 'Descrição', key: 'descricao', value: 'descricao' },
              { title: 'Quantidade', key: 'quantidade', value: 'quantidade' },
              { title: 'Valor Unitário', key: 'valor_unitario', value: 'valor_unitario' },
              { title: 'Total', key: 'total', value: 'total' }
            ]"
            :items="[
              { n:'', cod:'', descricao:'', quantidade:'', valor_unitario:'', total:'' }
            ]"
            hide-default-footer
            density="comfortable"
            class="elevation-0"
          >
            <template #item.n="{ item }">
              <div class="text-body-2">{{ item.n }}</div>
            </template>
            <template #item.cod="{ item }">
              <div class="text-body-2">{{ item.cod }}</div>
            </template>
            <template #item.descricao="{ item }">
              <div class="text-body-2">{{ item.descricao }}</div>
            </template>
            <template #item.quantidade="{ item }">
              <div class="text-body-2">{{ item.quantidade }}</div>
            </template>
            <template #item.valor_unitario="{ item }">
              <div class="text-body-2">{{ item.valor_unitario }}</div>
            </template>
            <template #item.total="{ item }">
              <div class="text-body-2">{{ item.total }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
