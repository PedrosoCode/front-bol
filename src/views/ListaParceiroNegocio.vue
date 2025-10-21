<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface Filtro {
  sNomeParceiro: string
}

interface Parceiro {
  sNomeFantasia: string
  sRazaoSocial: string
  sCidade: string
  sEstado: string
  nCodigo: number
}

const filtro = reactive<Filtro>({
  sNomeParceiro: '',
})

const dadosParceiros = ref<Parceiro[]>([])
const jwtToken = localStorage.getItem('jwtToken')
const router = useRouter()

function verDetalhes(codigoParceiro: number) {
  router.push({
    name: 'editar_parceiro',
    params: { id: codigoParceiro }
  })
}

async function getListaParceiros() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/parceiro/select',
      { sNomeParceiro: filtro.sNomeParceiro },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )

    dadosParceiros.value = response.data
    console.log('Dados recebidos:', dadosParceiros.value)

  } catch (error) {
    console.error('Erro ao carregar parceiros:', error)
    dadosParceiros.value = []
  }
}

function btnFiltrarClicked() {
  getListaParceiros()
}

function btnNovoClicked() {
  router.push({
    name: 'cadastro_parceiro',
  })
}

const headers = [
  { title: '#', key: 'nCodigo', align: 'start', sortable: true },
  { title: 'Nome Fantasia', key: 'sNomeFantasia', sortable: true },
  { title: 'Razão Social', key: 'sRazaoSocial', sortable: true },
  { title: 'Localização', key: 'sCidade', sortable: false },
  { title: 'Ações', key: 'acao', sortable: false },
]

onMounted(() => {
  getListaParceiros()
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
                v-model="filtro.sNomeParceiro"
                label="Nome do Parceiro"
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
            :items="dadosParceiros"
            class="elevation-1"
            density="comfortable"
            no-data-text="Nenhum parceiro encontrado"
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
