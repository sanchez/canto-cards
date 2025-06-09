<template>
    <NuxtErrorBoundary>
        <NuxtLayout>
            <NuxtLoadingIndicator />
            <NuxtPage />
        </NuxtLayout>

        <template #error="{ error }">
            <div>
                <img
                    src="/backdrop.jpg"
                    class="grayscale object-cover w-full h-screen fixed top-0 left-0" />
                <div
                    class="fixed w-full h-screen transition bg-slate-700/75 md:bg-slate-700/25 md:bg-gradient-to-r md:from-slate-700"></div>

                <div
                    class="absolute top-0 left-0 p-20 flex flex-col gap-12 text-white">
                    <div
                        class="font-semibold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                        Suite
                    </div>
                    <div class="max-w-md">
                        <p>
                            <b class="text-orange-300">An error occurred: </b>
                            {{ error }}
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </NuxtErrorBoundary>
</template>
