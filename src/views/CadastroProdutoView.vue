<template>
  <v-container fluid>
    <v-row>
      <!-- COLUNA ESQUERDA -->
      <v-col>
        <!-- Card de Filtro -->
        <v-row>
          <v-col>
            <v-card class="pa-6" elevation="3" rounded="lg">
              <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-medium mb-4">
                Filtro de Itens
              </v-card-title>

              <v-text-field
                v-model="stFiltro.sCodigoItem"
                clearable
                label="Código do Item"
                variant="outlined"
                class="mb-3"
              />

              <v-text-field
                v-model="stFiltro.sDescricaoItem"
                clearable
                label="Descrição do Item"
                variant="outlined"
              />

              <v-row class="mt-4">
                <v-col>
                  <v-btn color="primary" block @click="GetListaItem">
                    Filtrar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="success" block @click="novoItem">
                    Novo
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Card de Registros -->
        <v-row>
          <v-col>
            <v-card class="pa-6 mt-4" elevation="3" rounded="lg">
              <v-card-title class="text-h6 font-weight-medium mb-4">
                Registros
              </v-card-title>

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
                    color="info"
                    size="small"
                    @click="editarItem(item)"
                  >
                    Editar
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- COLUNA DIREITA (EDITAR) -->
      <transition name="slide-fade">
        <v-col v-if="showModalEdit">
          <v-card class="pa-6" elevation="3" rounded="lg">
            <v-card-title class="text-h6 text-md-h5 text-lg-h4 font-weight-medium mb-4">
              {{ isNovo ? 'Novo Item' : 'Editar Item' }}
            </v-card-title>

            <v-text-field
              v-model="stItem.sCodigoItem"
              clearable
              label="Código do Item"
              variant="outlined"
              class="mb-3"
              required
            />

            <v-text-field
              v-model="stItem.sDescricao"
              clearable
              label="Descrição do Item"
              variant="outlined"
              required
            />

            <v-row class="mt-4">
              <v-col>
                <v-btn color="primary" block @click="salvarItem">
                  Salvar
                </v-btn>
              </v-col>
              <v-col>
                <v-btn color="error" block @click="cancelarEdicao">
                  Cancelar
                </v-btn>
              </v-col>
            </v-row>

            <v-row v-if="!isNovo" class="mt-2">
              <v-col>
                <v-btn color="warning" block @click="excluirItem">
                  Excluir
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

interface inStFiltro {
  sDescricaoItem: string
  sCodigoItem: string
}

interface inItem {
  nCodigo?: number
  sCodigoItem: string
  sDescricao: string
}

const jwtToken = localStorage.getItem('jwtToken')
const API_URL = import.meta.env.VITE_DEFAULT_API_LINK

// --- estados
const stFiltro = reactive<inStFiltro>({ sDescricaoItem: '', sCodigoItem: '' })
const refListaItem = ref<inItem[]>([])
const stItem = reactive<inItem>({ sCodigoItem: '', sDescricao: '' })
const showModalEdit = ref(false)
const isNovo = ref(true)

// --- headers da tabela
const headers = [
  { title: 'Código Item', key: 'sCodigoItem', sortable: true },
  { title: 'Descrição', key: 'sDescricao', sortable: false },
  { title: 'Ações', key: 'acao', sortable: false },
]

// --- API: buscar lista
async function GetListaItem() {
  try {
    const response = await axios.post(
      `${API_URL}/item/select`,
      {
        sCodigoItem: stFiltro.sCodigoItem,
        sDescricao: stFiltro.sDescricaoItem,
      },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )
    refListaItem.value = response.data
  } catch (error) {
    console.error('Erro ao carregar lista:', error)
    refListaItem.value = []
  }
}

// --- Novo item
function novoItem() {
  isNovo.value = true
  Object.assign(stItem, { sCodigoItem: '', sDescricao: '' })
  showModalEdit.value = true
}

// --- Editar item
function editarItem(item: inItem) {
  isNovo.value = false
  Object.assign(stItem, item)
  showModalEdit.value = true
}

// --- Salvar item
async function salvarItem() {
  try {
    if (!stItem.sCodigoItem || !stItem.sDescricao) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    if (isNovo.value) {
      await axios.post(`${API_URL}/item/insert`, 
      {sCodigoItem : stItem.sCodigoItem,
       sDescricao : stItem.sDescricao
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    } else {
      await axios.post(`${API_URL}/item/update/`,
      {
       nCodigo : stItem.nCodigo,
       sCodigoItem : stItem.sCodigoItem,
       sDescricao  : stItem.sDescricao
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    }

    showModalEdit.value = false
    GetListaItem()
  } catch (error) {
    console.error('Erro ao salvar item:', error)
    alert('Erro ao salvar item!')
  }
}

// --- Excluir item
async function excluirItem() {
  if (!confirm('Deseja realmente excluir este item?')) return
  try {
    await axios.post(`${API_URL}/item/delete/`,
      {nCodigo : stItem.nCodigo
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    showModalEdit.value = false
    GetListaItem()
  } catch (error) {
    console.error('Erro ao excluir item:', error)
    alert('Erro ao excluir item!')
  }
}

// --- Cancelar edição
function cancelarEdicao() {
  showModalEdit.value = false
}

onMounted(() => {
  GetListaItem()
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
