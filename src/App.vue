<template>
    <v-app>
        <v-main>
            <v-container>
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/reg">Registation</router-link>
                <v-spacer></v-spacer>
                <router-view/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',

    data: () => ({
        //
    }),
};
</script>
