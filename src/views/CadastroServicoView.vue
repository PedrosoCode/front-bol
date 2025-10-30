<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'

interface inStFiltro {
  sDescricaoServico: string
  sCodigoServico: string
}

interface inServico {
  nCodigo?: number
  sCodigoServico: string
  sDescricao: string
}

const jwtToken = localStorage.getItem('jwtToken')
const API_URL = import.meta.env.VITE_DEFAULT_API_LINK

// --- estados
const stFiltro = reactive<inStFiltro>({ sDescricaoServico: '', sCodigoServico: '' })
const refListaServico = ref<inServico[]>([])
const stServico = reactive<inServico>({ sCodigoServico: '', sDescricao: '' })
const showModalEdit = ref(false)
const isNovo = ref(true)

// --- headers da tabela
const headers = [
  { title: 'Código Servico', key: 'sCodigoServico', sortable: true },
  { title: 'Descrição', key: 'sDescricao', sortable: false },
  { title: 'Ações', key: 'acao', sortable: false },
]

// --- API: buscar lista
async function GetListaServico() {
  try {
    const response = await axios.post(
      `${API_URL}/servico/select`,
      {
        sCodigoServico: stFiltro.sCodigoServico,
        sDescricao: stFiltro.sDescricaoServico,
      },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )
    refListaServico.value = response.data
  } catch (error) {
    console.error('Erro ao carregar lista:', error)
    refListaServico.value = []
  }
}

// --- Novo servico
function novoServico() {
  isNovo.value = true
  Object.assign(stServico, { sCodigoServico: '', sDescricao: '' })
  showModalEdit.value = true
}

// --- Editar servico
function editarServico(servico: inServico) {
  isNovo.value = false
  Object.assign(stServico, servico)
  showModalEdit.value = true
}

// --- Salvar servico
async function salvarServico() {
  try {
    if (!stServico.sCodigoServico || !stServico.sDescricao) {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    if (isNovo.value) {
      await axios.post(`${API_URL}/servico/insert`, 
      {sCodigoServico : stServico.sCodigoServico,
       sDescricao : stServico.sDescricao
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    } else {
      await axios.post(`${API_URL}/servico/update/`,
      {
       nCodigo : stServico.nCodigo,
       sCodigoServico : stServico.sCodigoServico,
       sDescricao  : stServico.sDescricao
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    }

    showModalEdit.value = false
    GetListaServico()
  } catch (error) {
    console.error('Erro ao salvar servico:', error)
    alert('Erro ao salvar servico!')
  }
}

// --- Excluir servico
async function excluirServico() {
  if (!confirm('Deseja realmente excluir este servico?')) return
  try {
    await axios.post(`${API_URL}/servico/delete/`,
      {nCodigo : stServico.nCodigo
      }, 
      {
        headers: { Authorization: `Bearer ${jwtToken}` },
      })
    showModalEdit.value = false
    GetListaServico()
  } catch (error) {
    console.error('Erro ao excluir servico:', error)
    alert('Erro ao excluir servico!')
  }
}

// --- Cancelar edição
function cancelarEdicao() {
  showModalEdit.value = false
}

onMounted(() => {
  GetListaServico()
})
</script>

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
                v-model="stFiltro.sCodigoServico"
                clearable
                label="Código do servico"
                variant="outlined"
                class="mb-3"
              />

              <v-text-field
                v-model="stFiltro.sDescricaoServico"
                clearable
                label="Descrição do servico"
                variant="outlined"
              />

              <v-row class="mt-4">
                <v-col>
                  <v-btn color="primary" block @click="GetListaServico">
                    Filtrar
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn color="success" block @click="novoServico">
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
                :items="refListaServico"
                class="elevation-1"
                density="comfortable"
                no-data-text="Nenhum servico encontrado"
                hide-default-footer
              >
                <template #item.acao="{ item }">
                  <v-btn
                    color="info"
                    size="small"
                    @click="editarServico(item)"
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
              {{ isNovo ? 'Novo servico' : 'Editar servico' }}
            </v-card-title>

            <v-text-field
              v-model="stServico.sCodigoServico"
              clearable
              label="Código do servico"
              variant="outlined"
              class="mb-3"
              required
            />

            <v-text-field
              v-model="stServico.sDescricao"
              clearable
              label="Descrição do servico"
              variant="outlined"
              required
            />

            <v-row class="mt-4">
              <v-col>
                <v-btn color="primary" block @click="salvarServico">
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
                <v-btn color="warning" block @click="excluirServico">
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
