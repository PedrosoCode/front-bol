<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface inStFiltro {
  sDescricaoItem: string,
  sCodigoItem: string
}

interface inItem {
  nCodigo: number
  nCodigoEmpresa: number
  sCodigoItem: string
  sDescricao: string
}

const stFiltro = reactive<inStFiltro>({
  sDescricaoItem: '',
  sCodigoItem: '',
})

const refListaItem = ref<inItem[]>([])
const jwtToken = localStorage.getItem('jwtToken')
const router = useRouter()

function verDetalhes(nCodigoItem: number) {
  router.push({
    name: 'editar_produto/',
    params: { id: nCodigoItem }
  })
}

async function GetListaItem() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/item/select',
      { sCodigoItem : stFiltro.sCodigoItem,
        sDescricao : stFiltro.sDescricaoItem
      },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )

    refListaItem.value = response.data

  } catch (error) {
    console.error('Erro ao carregar item:', error)
    refListaItem.value = []
  }
}

function btnFiltrarClicked() {
  GetListaItem()
}

function btnNovoClicked() {
  router.push({
    name: 'editar_item',
  })
}

const headers = [
  { title: 'Codigo Item', key: 'sCodigoItem', sortable: true },
  { title: 'Descricão', key: 'sDescricao', sortable: false },
  { title: 'Ações', key: 'acao', sortable: false },
]

onMounted(() => {
  GetListaItem()
})
</script>
<template>
  <v-container fluid >

      <v-card class="pa-6" elevation="3" rounded="lg">
        <!-- Formulário de Filtro -->
        <v-form @submit.prevent="btnFiltrarClicked">
          <v-row align="end" dense>
            <v-col>
              <v-text-field
                v-model="stFiltro.sDescricaoItem"
                label="Descricao do item"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
              />
            </v-col>

            <v-col>
              <v-text-field
                v-model="stFiltro.sCodigoItem"
                label="Código do item"
                variant="outlined"
                density="comfortable"
                hide-details="auto"
              />
            </v-col>

            <v-col>
              <v-btn
                color="success"
                block
                @click="btnNovoClicked"
              >
                Novo
              </v-btn>

              <v-btn
                color="primary"
                type="submit"
                block
              >
                Filtrar
              </v-btn>
            </v-col>
          </v-row>
        </v-form>

        <!-- DataTable -->
        <v-card class="mt-6" flat>
          <v-data-table
            :headers="headers"
            :items="refListaItem"
            class="elevation-1"
            density="comfortable"
            no-data-text="Nenhum item encontrado"
            hide-default-footer
          >
            <template #item.acao="{ item }">
              <v-btn
                color="primary"
                size="small"
                @click="verDetalhes(item.nCodigo)"
              >
                Detalhes
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-card>
  </v-container>
</template>
