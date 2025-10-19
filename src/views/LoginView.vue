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
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card
          class="pa-6"
          elevation="6"
          rounded="xl"
        >
          <v-card-title class="text-h5 text-center mb-4">
            Login
          </v-card-title>

          <v-card-text>
            <v-form>
              <v-text-field
                v-model="loginForm.sNomeUsuario"
                variant="outlined"
                label="Usuário"
                hint="Insira seu usuário"
                density="comfortable"
                class="mb-3"
              />

              <v-text-field
                v-model="loginForm.sSenha"
                variant="outlined"
                label="Senha"
                hint="Insira sua senha"
                type="password"
                density="comfortable"
                class="mb-4"
              />

              <v-btn
                block
                color="primary"
                @click="btnLogarClick"
                size="large"
              >
                Entrar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
