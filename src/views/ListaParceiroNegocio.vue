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

onMounted(() => {
  getListaParceiros()
})
</script>
<template>
  <main class="min-h-screen bg-slate-100 py-4">
    <div class="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl">
      <div class="bg-white rounded-lg shadow p-6">
        <!-- Formulário de Filtro -->
        <form @submit.prevent="btnFiltrarClicked" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div class="md:col-span-2">
            <label for="txtNomeParceiro" class="block text-sm font-medium text-gray-700">
              Nome do Parceiro
            </label>
            <input id="txtNomeParceiro" type="text" v-model="filtro.sNomeParceiro"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>

          <div class="flex gap-2">
            <button type="button" @click="btnNovoClicked"
              class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
              Novo
            </button>
            <button type="submit"
              class="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
              Filtrar
            </button>
          </div>
        </form>

        <!-- Tabela de Parceiros -->
        <div class="mt-6 overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nome Fantasia</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Razão Social</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Localização</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(parceiro, index) in dadosParceiros" :key="index">
                <td class="px-4 py-3 text-sm text-gray-700">{{ parceiro.nCodigo }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ parceiro.sNomeFantasia }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ parceiro.sRazaoSocial }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">{{ parceiro.sCidade }} - {{ parceiro.sEstado }}</td>
                <td class="px-4 py-3 text-sm text-gray-700">
                  <button type="button" @click="verDetalhes(parceiro.nCodigo)"
                    class="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Detalhes
                  </button>
                </td>
              </tr>
              <tr v-if="dadosParceiros.length === 0">
                <td colspan="5" class="px-4 py-4 text-center text-gray-500">Nenhum parceiro encontrado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>