<template>
  <div class="container mt-4">
    <div
      class="header d-flex justify-content-between align-items-center mb-3 p-3"
    >
      <h2 class="title">Liste des Modules</h2>
      <router-link class="btn btn-add" :to="{ name: 'module-add' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light border-top">
        <tr>
          <th>Nom</th>
          <th>Durée</th>
          <th>Montant</th>
          <th>Statut</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="module in store.modules" :key="module.id">
          <td>{{ module.name }}</td>
          <td>{{ module.duration }} Jours</td>
          <td>{{ module.price }} MRU</td>
          <td>
            <span v-if="module.status">Disponible</span
            ><span v-else>Non Disponible</span>
          </td>

          <td class="text-center">
            <router-link
              class="action-icon"
              :to="{ name: 'module-show', params: { id: module.id } }"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              class="action-icon"
              :to="{ name: 'module-eddit', params: { id: module.id } }"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              class="action-icon btn-delete"
              @click="store.destroy(module.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { storeModule } from "@/stores/storeModule";
import { onMounted, ref } from "vue";
const store = storeModule();
onMounted(async () => {
  try {
    const result = await store.loadData();
  } catch (error) {
    console.log("Erreur lors de chargement des modules: ", error);
  }
});
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.header {
  background-color: #f5f5dc;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title {
  font-size: 1.2rem;
  margin: 0;
  color: #218838;
}

.search-input {
  max-width: 200px;
}

.btn-add {
  font-size: 1rem;
  padding: 5px 15px;
  background-color: white;
  color: #218838;
  border: 1px solid #218838;
  border-radius: 5px;
}

.btn-add:hover {
  background-color: #218838;
  color: white;
}

.table {
  width: 100%;
}

.table thead {
  border-top: 2px solid #218838;
}

.action-icon {
  color: #218838;
  margin-right: 8px;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.action-icon:hover {
  color: #1e7e34;
}

.btn-delete {
  color: #dc3545;
}

.btn-delete:hover {
  color: #c82333;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>

