<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import ModalConfirmacao from '@/components/ModalConfirmacao.vue'

const bGatilhoModalCofirmacao = ref<boolean>(false)
const bGatilhoModalCofirmacaoDelete = ref<boolean>(false)

interface stFormInfo {
  sRazaoSocial: string
  sNomeFantasia: string
  nCodigoTipoParceiro: number
  sEmail: string
  sCnpjCpf: string
  sTelefone: string
  sContato: string
  sRua: string
  sBairro: string
  sComplemento: string
  sNrua: string
  sCep: string
  nCodigoPais: number | null
  nCodigoCidade: number | null
  nCodigoEstado: number | null
}

const stFormInfo = reactive<stFormInfo>({
  sRazaoSocial: '',
  sNomeFantasia: '',
  nCodigoTipoParceiro: 0,
  sEmail: '',
  sCnpjCpf: '',
  sTelefone: '',
  sContato: '',
  sRua: '',
  sBairro: '',
  sComplemento: '',
  sNrua: '',
  sCep: '',
  nCodigoPais: null,
  nCodigoCidade: null,
  nCodigoEstado: null,
})

const DadosParceiro = ref<stFormInfo[]>([])

interface stateCboPais {
  nCodigoPais: number
  sNomePais: string
  nUfCidade: number
}
const stCboPais = ref<stateCboPais[]>([])

interface stateComboCidade {
  nCodigoCidade: number
  sNomeCidade: string
}
const stCboCidade = ref<stateComboCidade[]>([])

interface stateComboEstado {
  nCodigoEstado: number
  sNomeEstado: string
  sUF: string
}
const stCboEstado = ref<stateComboEstado[]>([])

const route = useRoute();
const jwtToken = localStorage.getItem('jwtToken')

const urlCodigoParceiro = ref<number | null>(
  route.params.id === undefined || isNaN(Number(route.params.id))
    ? null
    : Number(route.params.id)
);

async function GerenciaModalConfirmacaoEnviar() {
  try {
    bGatilhoModalCofirmacao.value = false

    if (urlCodigoParceiro.value) {
      await axios.post(
        import.meta.env.VITE_DEFAULT_API_LINK + '/parceiro/update',
        {
          nCodigoParceiro: urlCodigoParceiro.value,
          sRazaoSocial: stFormInfo.sRazaoSocial,
          sNomeFantasia: stFormInfo.sNomeFantasia,
          sEmail: stFormInfo.sEmail,
          sDocumento: stFormInfo.sCnpjCpf,
          sTelefone: stFormInfo.sTelefone,
          sContato: stFormInfo.sContato,
          sLogradouro: stFormInfo.sRua,
          sBairro: stFormInfo.sBairro,
          sComplemento: stFormInfo.sComplemento,
          sNumero: stFormInfo.sNrua,
          sCep: stFormInfo.sCep,
          nCodigoPais: stFormInfo.nCodigoPais,
          nCodigoCidade: stFormInfo.nCodigoCidade,
          nCodigoEstado: stFormInfo.nCodigoEstado,
        },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )

      await LoadDadosParceiro(urlCodigoParceiro.value);

    } else {
      const response = await axios.post(
        import.meta.env.VITE_DEFAULT_API_LINK + '/parceiro/insert',
        {
          sRazaoSocial: stFormInfo.sRazaoSocial,
          sNomeFantasia: stFormInfo.sNomeFantasia,
          sEmail: stFormInfo.sEmail,
          sDocumento: stFormInfo.sCnpjCpf,
          sTelefone: stFormInfo.sTelefone,
          sContato: stFormInfo.sContato,
          sLogradouro: stFormInfo.sRua,
          sBairro: stFormInfo.sBairro,
          sComplemento: stFormInfo.sComplemento,
          sNumero: stFormInfo.sNrua,
          sCep: stFormInfo.sCep,
          nCodigoPais: stFormInfo.nCodigoPais,
          nCodigoCidade: stFormInfo.nCodigoCidade,
          nCodigoEstado: stFormInfo.nCodigoEstado,
        },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )

      urlCodigoParceiro.value = response.data.codigo_insert

      redirecionarInsert()
    }

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }
}

async function GerenciaModalConfirmacaoDeleteEnviar() {
  try {
    bGatilhoModalCofirmacaoDelete.value = false

    if (!urlCodigoParceiro.value) {
      alert('Parceiro inválido para exclusão.')
      return
    }

    await axios.post(
      import.meta.env.VITE_DEFAULT_API_LINK + '/parceiro/delete',
      { nCodigoParceiro: urlCodigoParceiro.value },
      { headers: { Authorization: `Bearer ${jwtToken}` } }
    )

    router.push('/lista_parceiro')

  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro ao excluir. Por favor, tente novamente.')
  }
}

function btnEnviarClick() {
  try {
    bGatilhoModalCofirmacao.value = true
  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }
}

function btnExcluirClick() {
  try {
    bGatilhoModalCofirmacaoDelete.value = true
  } catch (error) {
    console.error(error)
    alert('Ocorreu um erro. Por favor, tente novamente.')
  }
}

async function loadComboPais() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/generico/pais')
    stCboPais.value = response.data
  } catch (error) {
    console.error('Erro ao carregar países:', error)
  }
}

async function loadComboCidade(nCodigoEstado: number | null, manterCidade: boolean = false) {
  try {
    const response = await axios.request({
      method: 'POST',
      url: import.meta.env.VITE_DEFAULT_API_LINK + '/generico/cidade',
      data: { nCodigoEstado },
    })
    stCboCidade.value = response.data
    
    if (!manterCidade) {
      stFormInfo.nCodigoCidade = null
    }
  } catch (error) {
    console.error('Erro ao carregar Cidades:', error)
  }
}

async function loadComboEstado() {
  try {
    const response = await axios.get(import.meta.env.VITE_DEFAULT_API_LINK + '/generico/estado')
    stCboEstado.value = response.data
  } catch (error) {
    console.error('Erro ao carregar estados/uf:', error)
  }
}

async function LoadDadosParceiro(nCodigoParceiro: number | null) {
  if (nCodigoParceiro != null) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_DEFAULT_API_LINK + '/parceiro/select_id',
        { nCodigoParceiro: nCodigoParceiro },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      )

      DadosParceiro.value = response.data
      Object.assign(stFormInfo, response.data[0])

    } catch (error) {
      console.log("erro ao carregar dados do parceiro", error)
    }
  }
}

async function loadCombos() {
  await Promise.all([
    loadComboPais(),
    loadComboEstado(),
  ]);

  await LoadDadosParceiro(urlCodigoParceiro.value);

  if (stFormInfo.nCodigoEstado) {
    await loadComboCidade(stFormInfo.nCodigoEstado, true);
  }
}

function ComboEstadoSelectedChange() {
  const codigoEstado = stFormInfo.nCodigoEstado
  loadComboCidade(codigoEstado, false)
}

function redirecionarInsert() {
  router.push({
    name: 'editar_parceiro',
    params: { id: urlCodigoParceiro.value }
  })
}

onMounted(() => {
  loadCombos()
})
</script>

<template>
  <ModalConfirmacao
    v-model="bGatilhoModalCofirmacao"
    titulo="Atualizar dados"
    mensagem="Deseja confirmar a operação?"
    @confirmar="GerenciaModalConfirmacaoEnviar"
    @cancelar="bGatilhoModalCofirmacao = false"
  />

  <ModalConfirmacao
    v-model="bGatilhoModalCofirmacaoDelete"
    titulo="Deletar dados"
    mensagem="Deseja confirmar a exclusão?"
    textoBotaoConfirmar="Confirmar"
    textoBotaoCancelar="Cancelar"
    corBotaoConfirmar="red"
    corBotaoCancelar="grey"
    @confirmar="GerenciaModalConfirmacaoDeleteEnviar"
    @cancelar="bGatilhoModalCofirmacaoDelete = false"
  />

  <v-container max-width="1200px" class="bg-white rounded-lg elevation-2 pa-6">
    <h1 class="text-center text-h5 font-weight-medium mb-6">Cadastro de Cliente</h1>

    <v-row dense>
      <v-col cols="12" sm="6">
        <v-text-field label="Data do Cadastro" type="date" disabled variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field label="Data Última Alteração" type="date" disabled variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sRazaoSocial" label="Razão Social" required
          placeholder="Insira a razão social" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sNomeFantasia" label="Nome Fantasia" required
          placeholder="Insira o Nome Fantasia" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field v-model="stFormInfo.sEmail" label="E-mail" type="email" placeholder="Insira o e-mail"
          variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field v-model="stFormInfo.sTelefone" label="Telefone" type="tel" placeholder="Insira o telefone"
          variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-text-field v-model="stFormInfo.sContato" label="Contato" placeholder="Insira o contato" variant="outlined" />
      </v-col>

      <v-col cols="12">
        <v-text-field v-model="stFormInfo.sRua" label="Logradouro" placeholder="Insira o logradouro"
          variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sBairro" label="Bairro" placeholder="Insira o bairro" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sComplemento" label="Complemento" placeholder="Complemento (opcional)"
          variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sNrua" label="Número" placeholder="Insira o número" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field v-model="stFormInfo.sCep" label="CEP" placeholder="Insira o CEP" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select v-model="stFormInfo.nCodigoPais" :items="stCboPais" item-title="sNomePais" item-value="nCodigoPais"
          label="País" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select v-model="stFormInfo.nCodigoEstado" :items="stCboEstado" item-title="sNomeEstado"
          item-value="nCodigoEstado" label="Estado" @update:model-value="ComboEstadoSelectedChange" variant="outlined" />
      </v-col>

      <v-col cols="12" sm="4">
        <v-select v-model="stFormInfo.nCodigoCidade" :items="stCboCidade" item-title="sNomeCidade"
          item-value="nCodigoCidade" label="Cidade" variant="outlined" />
      </v-col>

      <v-col cols="12" class="d-flex justify-end ga-3">
        <v-btn v-if="urlCodigoParceiro" color="red" variant="outlined" @click="btnExcluirClick">
          Excluir
        </v-btn>

        <v-btn color="indigo" variant="outlined" @click="btnEnviarClick">
          Enviar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>