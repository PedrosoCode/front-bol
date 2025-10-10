<template>
    <div>
        <!-- card login -->
        <div class="mx-4 sm:mx-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mt-8 mb-6">
            <!-- inputs -->
            <div class="bg-blue-200 border border-t-0 rounded-t-3xl border-gray-300 shadow-lg p-4 sm:p-6 md:p-8 space-y-6">
                <div>
                    <label class="block text-sm sm:text-base font-medium text-gray-700">Usuário</label>
                    <input type="text"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" /></input>
                </div>
                <div>
                    <label class="block text-sm sm:text-base font-medium text-gray-700">Senha</label>
                    <input type="password"
                        class="w-full rounded-md border border-slate-300 px-3 py-2 sm:px-4 sm:py-3 focus:outline-none focus:ring-1 focus:ring-indigo-300 bg-slate-50" /></input>
                </div>
            </div>
            <!-- btn -->
            <div class="bg-blue-200 p-3 rounded-b-lg">
                <button class="w-full py-1 font-medium text-gray-700 bg-teal-100 rounded-md transition-all
         hover:bg-teal-300 hover:outline hover:outline-2 hover:outline-indigo-600">
                    Entrar
                </button>
            </div>
        </div>
    </div>
</template>
