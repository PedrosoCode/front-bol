//TODO - integrar ao banco de dados

<template>
  <main class="min-h-screen bg-slate-100 py-6">
    <div class="w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl space-y-6">

      <!-- Dados do Parceiro -->
      <section class="bg-white border border-slate-200 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-medium text-gray-700 text-center mb-4">Dados do Parceiro</h2>
        <form @submit.prevent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="md:col-span-1">
              <label class="block text-sm font-medium text-gray-700">Parceiro de Negócio</label>
              <select
                class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300">
                <option :value="null">Selecione o Parceiro</option>
                <!-- opções... -->
              </select>
            </div>
          </div>
        </form>
      </section>

      <!-- Dados do Ativo -->
      <section class="bg-white border border-slate-200 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-medium text-gray-700 text-center mb-4">Dados do Ativo</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label for="dataEntrada" class="block text-sm font-medium text-gray-700">Data Início</label>
            <input
              id="dataEntrada"
              type="date"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label for="horaEntrada" class="block text-sm font-medium text-gray-700">Hora Início</label>
            <input
              id="horaEntrada"
              type="time"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>
          <div>
            <label for="dataTermino" class="block text-sm font-medium text-gray-700">Data Término</label>
            <input
              id="dataTermino"
              type="date"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>

          <div>
            <label for="horaTermino" class="block text-sm font-medium text-gray-700">Data Término</label>
            <input
              id="horaTermino"
              type="time"
              class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300" />
          </div>
        </div>
        <div class="mt-4">
          <label for="observacoes" class="block text-sm font-medium text-gray-700">Informações/Observações</label>
          <textarea
            id="observacoes"
            rows="3"
            class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-indigo-300">
          </textarea>
        </div>
      </section>

      <!-- Serviços Realizados -->
      <section class="bg-white border border-slate-200 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-medium text-gray-700 text-center mb-4">Serviços Realizados</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">N°</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cod. Serviço</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor Unitário</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Produtos Utilizados -->
      <section class="bg-white border border-slate-200 rounded-lg shadow-md p-6">
        <h2 class="text-lg font-medium text-gray-700 text-center mb-4">Produtos Utilizados</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">N°</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cod. Item</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantidade</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Valor Unitário</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
                <td class="px-4 py-3 text-sm text-gray-700"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  </main>
</template>