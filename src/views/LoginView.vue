<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'

const tabAtual = ref<'login' | 'cadastro'>('login')

interface LoginState {
  sNomeUsuario: string
  sSenha: string
  nCodigoEmpresa: number
}

const initLogin: LoginState = {
  sNomeUsuario: '',
  sSenha: '',
  nCodigoEmpresa: 0,
}

interface cboEmpresaState {
  nome_fantasia: string
  razao_social: string
  codigo: number
}

const cboEmpresaValues = ref<cboEmpresaState[]>([])

const loginForm = reactive<LoginState>({ ...initLogin })

function btnLogarClick() {
  axios
    .post(import.meta.env.VITE_DEFAULT_API_LINK + '/login/login', {
      sNomeUsuario: loginForm.sNomeUsuario,
      sSenha: loginForm.sSenha,
      nCodigoEmpresa: 1,
    })
    .then((response) => {
      localStorage.setItem('jwtToken', response.data.token)

      window.location.href = '/'
    })
    .catch((error) => {
      console.log(error)
      alert('Login falhou: ' + (error.response?.data?.message || 'Erro desconhecido'))
    })
}


async function loadComboEmpresa() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_DEFAULT_API_LINK + '/login/empresa',
    )
    cboEmpresaValues.value = response.data
  } catch (error) {
    console.error('Erro ao carregar empresas:', error)
  }
}

onMounted(() => {
  loadComboEmpresa()
})
</script>

<template>
    <div>
        <!-- card login -->
        <div class="mx-4 sm:mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-8 mb-6">
            <!-- inputs -->
            <div class="bg-blue-200 border border-t-0 rounded-t-3xl border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
                <div>
                    <label class="block text-sm sm:text-base font-medium text-gray-700">Usuário</label>
                    <input type="text" v-model="loginForm.sNomeUsuario"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" /></input>
                </div>
                <div>
                    <label class="block text-sm sm:text-base font-medium text-gray-700">Senha</label>
                    <input type="password" v-model="loginForm.sSenha"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" /></input>
                </div>
            </div>
            <!-- btn -->
            <div class="bg-blue-200 p-3 rounded-b-lg">
                <button @click="btnLogarClick()" class="w-full py-1 font-medium text-gray-700 bg-teal-100 rounded-md transition-all
         hover:bg-teal-300 hover:outline hover:outline-2 hover:outline-indigo-600">
                    Entrar
                </button>
            </div>
        </div>
    </div>
</template>
