

<template>
  <div class="menu">
    <br /><br />
    <div class="container">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button" @click="$router.push('cadparceiro')">
          Cadastro de parceiro de negócio
        </button>
        <button class="btn btn-primary" type="button" @click="$router.push('listaparceiro')">
          Lista de parceiro de negócio
        </button>
        <button class="btn btn-primary" type="button">Button</button>
      </div>          
    </div>
    <!-- <div class="flex flex-row content-center justify-center p-16"> -->
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-16">
      <button @click="$router.push('listaparceiro')" class="bg-red-500 m-1 p-1 h-48 flex items-center justify-center border-2 border-solid rounded-xl border-red-600 text-xl font-sans text-slate-100 
        hover:italic hover:font-semibold hover:outline-2 hover:outline-solid hover:outline-emerald-300">
        Cadastros gerais
      </button>
      <button @click="$router.push('ordem_servico')"
        class="bg-cyan-400 m-1 p-1 h-48 flex items-center justify-center border-2 border-solid rounded-xl border-cyan-300 text-xl font-sans text-slate-100 
        hover:italic hover:font-semibold hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:outline-emerald-300">
        Ordem de serviço
      </button>
    </div>
  </div>
</template> 
